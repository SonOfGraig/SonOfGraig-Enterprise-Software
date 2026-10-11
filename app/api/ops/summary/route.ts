import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { summary } from '@/lib/ops/telemetry';

// GRAIG's read of the site's operational telemetry (lib/ops/telemetry.ts).
// Token in the X-Ops-Token header, compared in constant time. With OPS_TOKEN
// unset the route does not exist (404), so a missing secret fails closed.

function authorised(given: string | null) {
  const want = process.env.OPS_TOKEN;
  if (!want || want.length < 32 || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function GET(req: NextRequest) {
  if (!process.env.OPS_TOKEN) return new NextResponse(null, { status: 404 });
  if (!authorised(req.headers.get('x-ops-token'))) {
    return NextResponse.json({ ok: false }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  return NextResponse.json({ ok: true, ...summary() }, { headers: { 'Cache-Control': 'no-store' } });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
