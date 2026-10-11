import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyTurnstile } from './turnstile';
import { rateLimit, getClientIp } from './rate-limit';
import { recordForm } from '@/lib/ops/telemetry';

const MAX_BODY_BYTES = 32 * 1024;

/** Reads the request body as text, or returns null once it exceeds `limit` bytes. */
async function readLimited(req: NextRequest, limit: number): Promise<string | null> {
  if (!req.body) return '';
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

/**
 * Factory that builds a Next.js POST route handler from a Zod schema and a
 * sender function. Wraps the standard checks: rate limit → JSON parse →
 * validation → honeypot → Turnstile → send.
 */
export function createFormHandler<T extends z.ZodTypeAny>(
  schema: T,
  sender: (data: z.infer<T>) => Promise<unknown>,
) {
  return async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const requestId = Math.random().toString(36).slice(2, 10);
    console.log(`[forms ${requestId}] POST ${req.nextUrl.pathname} from ip=${ip}`);
    // Ops telemetry name: "contact", "early-access", "newsletter" (+ ":footer" etc. once parsed).
    let form = req.nextUrl.pathname.split('/').filter(Boolean).at(-1) ?? 'unknown';

    const rl = rateLimit(ip);
    if (!rl.allowed) {
      console.log(`[forms ${requestId}] rate-limited (retry in ${rl.retryAfterSec}s)`);
      recordForm(form, 'rate_limited');
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfterSec) },
        },
      );
    }

    // Cap the body before reading it: the largest legitimate submission (a
    // 5,000-character use case plus fields) is well under 32 KB.
    const declared = Number(req.headers.get('content-length') ?? 0);
    if (declared > MAX_BODY_BYTES) {
      recordForm(form, 'too_large');
      return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
    }

    let body: unknown;
    try {
      // content-length can be absent (chunked) or wrong, so the stream itself
      // is cut off at the limit rather than buffered whole.
      const raw = await readLimited(req, MAX_BODY_BYTES);
      if (raw === null) {
        recordForm(form, 'too_large');
        return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
      }
      body = JSON.parse(raw);
    } catch {
      recordForm(form, 'invalid_json');
      return NextResponse.json(
        { ok: false, error: 'invalid_json' },
        { status: 400 },
      );
    }

    const source = (body as { source?: unknown } | null)?.source;
    if (typeof source === 'string' && /^[a-z-]{1,20}$/.test(source)) form += `:${source}`;

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      console.log(`[forms ${requestId}] validation failed`, fieldErrors);
      recordForm(form, 'validation');
      return NextResponse.json(
        { ok: false, error: 'validation', issues: fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data as {
      hp?: string;
      turnstileToken?: string;
    } & Record<string, unknown>;

    const tv = await verifyTurnstile(data.turnstileToken, ip);

    // Honeypot: only a signal when Turnstile also failed. Autofill can fill
    // the hidden field for real people, and a verified human must get through.
    if (data.hp && data.hp.length > 0) {
      if (!tv.ok) {
        console.warn(`[forms ${requestId}] honeypot + failed turnstile — dropped`, { ip });
        recordForm(form, 'honeypot_dropped');
        return NextResponse.json({ ok: true }); // silent, so bots learn nothing
      }
      console.log(`[forms ${requestId}] honeypot filled but turnstile passed — accepting (likely autofill)`);
    }

    if (!tv.ok) {
      // The reason (missing secret, network error, Cloudflare error codes)
      // stays in the server log; the client only learns that the check failed.
      console.log(`[forms ${requestId}] turnstile failed: ${tv.reason}`);
      recordForm(form, 'turnstile', tv.reason);
      return NextResponse.json({ ok: false, error: 'turnstile' }, { status: 403 });
    }

    try {
      console.log(`[forms ${requestId}] turnstile OK — calling sender`);
      const result = await sender(parsed.data);
      console.log(`[forms ${requestId}] sender success`, {
        ids: Array.isArray(result) ? result : undefined,
      });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[forms ${requestId}] send failed: ${errMsg}`, err);
      recordForm(form, 'send_failed', errMsg);
      // No error detail to the client — provider messages can reveal config.
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 });
    }

    recordForm(form, 'ok');
    return NextResponse.json({ ok: true });
  };
}
