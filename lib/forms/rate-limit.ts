// Simple in-memory rate limit. Per-IP buckets — 5 submissions per 10 minutes.
// In-memory means each Cloud Run instance has its own counters; horizontal
// scale could mean a determined attacker bypasses by hitting different
// instances. Acceptable for marketing-form abuse mitigation. Upgrade to
// Upstash Redis if abuse is observed.

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

export function rateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const existing = buckets.get(ip);

  // Periodic cleanup so the map doesn't grow forever.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }

  if (!existing || existing.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export function getClientIp(headers: Headers): string {
  // Production runs behind a Cloudflare Tunnel and listens on 127.0.0.1 only,
  // so every request arrives through Cloudflare, which overwrites any
  // client-supplied CF-Connecting-IP with the real address.
  const cf = headers.get('cf-connecting-ip')?.trim();
  if (cf) return cf;
  // Fallback: the LAST X-Forwarded-For hop is the one our nearest proxy
  // appended. The first entry is whatever the client chose to send, so
  // trusting it would let anyone mint a fresh rate-limit bucket per request.
  const hops = headers.get('x-forwarded-for')?.split(',').map((h) => h.trim()).filter(Boolean);
  return hops?.at(-1) ?? 'unknown';
}
