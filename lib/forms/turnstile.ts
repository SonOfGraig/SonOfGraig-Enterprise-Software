// Cloudflare Turnstile server-side verification.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

export async function verifyTurnstile(
  token: string | undefined,
  remoteip?: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // In development without a secret configured, allow submission so devs
  // can test the rest of the flow. Production deploys MUST have the key set.
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return { ok: false, reason: 'turnstile not configured' };
    }
    return { ok: true };
  }

  if (!token) {
    return { ok: false, reason: 'missing token' };
  }

  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteip) body.append('remoteip', remoteip);

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body },
    );
    const data = (await res.json()) as TurnstileResponse;
    if (data.success) return { ok: true };
    return {
      ok: false,
      reason: (data['error-codes'] ?? ['unknown']).join(','),
    };
  } catch (err) {
    return { ok: false, reason: `verify failed: ${(err as Error).message}` };
  }
}
