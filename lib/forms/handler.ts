import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyTurnstile } from './turnstile';
import { rateLimit, getClientIp } from './rate-limit';

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

    const rl = rateLimit(ip);
    if (!rl.allowed) {
      console.log(`[forms ${requestId}] rate-limited (retry in ${rl.retryAfterSec}s)`);
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfterSec) },
        },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'invalid_json' },
        { status: 400 },
      );
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      console.log(`[forms ${requestId}] validation failed`, fieldErrors);
      return NextResponse.json(
        { ok: false, error: 'validation', issues: fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data as {
      hp?: string;
      turnstileToken?: string;
    } & Record<string, unknown>;

    // Honeypot — silently accept so bots don't learn we filter.
    if (data.hp && data.hp.length > 0) {
      console.warn('[forms] honeypot triggered', { ip });
      return NextResponse.json({ ok: true });
    }

    const tv = await verifyTurnstile(data.turnstileToken, ip);
    if (!tv.ok) {
      console.log(`[forms ${requestId}] turnstile failed: ${tv.reason}`);
      return NextResponse.json(
        { ok: false, error: `turnstile:${tv.reason}` },
        { status: 403 },
      );
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
      return NextResponse.json(
        { ok: false, error: 'send_failed', detail: errMsg },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  };
}
