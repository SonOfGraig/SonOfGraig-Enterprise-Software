'use client';

import { useMemo, useRef, useState } from 'react';
import { useCanvasScene, type Scene } from '@/components/fx/canvas/useCanvasScene';

// Ported from the 2026 agency site's CloudArchSections → CanaryTrafficRouter.
// Slide the weight to bleed traffic from the stable release to a canary;
// hover the stream to inspect the nearest request. The original pushed React
// state from inside the RAF loop every frame; here the HUD updates only when
// the inspected request changes.

type Req = { t: number; canary: boolean; id: number; ms: number };

export function CanaryRouter({ stableLabel = 'Stable · v1.8', canaryLabel = 'Canary · v1.9' }: { stableLabel?: string; canaryLabel?: string }) {
  const [weight, setWeight] = useState(10);
  const weightRef = useRef(weight);
  weightRef.current = weight;
  const [hud, setHud] = useState<Req | null>(null);
  const hudId = useRef<number | null>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const seq = useRef(1000);

  const scene = useMemo<Scene<{ reqs: Req[]; acc: number }>>(
    () => ({
      init: () => ({ reqs: [], acc: 0 }),
      frame: ({ ctx, width, height, rgb, dark }, st) => {
        ctx.clearRect(0, 0, width, height);
        const sx = 56;
        const sy = height / 2;
        const ex = width - 56;
        const top = height * 0.28;
        const bot = height * 0.72;
        // lanes
        ctx.strokeStyle = dark ? 'rgba(255,255,255,0.08)' : 'rgba(13,17,23,0.08)';
        ctx.setLineDash([4, 6]);
        for (const ty of [top, bot]) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(width / 2, ty === top ? ty - 50 : ty + 50, ex, ty);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        st.acc += 1;
        if (st.acc % 6 === 0) st.reqs.push({ t: 0, canary: Math.random() * 100 < weightRef.current, id: seq.current++, ms: Math.round(8 + Math.random() * 30) });
        let near: Req | null = null;
        let best = 28;
        st.reqs = st.reqs.filter((r) => {
          r.t += 0.011;
          if (r.t >= 1) return false;
          const ty = r.canary ? top : bot;
          const cy = ty === top ? ty - 50 : ty + 50;
          const u = 1 - r.t;
          const x = u * u * sx + 2 * u * r.t * (width / 2) + r.t * r.t * ex;
          const y = u * u * sy + 2 * u * r.t * cy + r.t * r.t * ty;
          const d = Math.hypot(x - mouse.current.x, y - mouse.current.y);
          if (d < best) {
            best = d;
            near = r;
          }
          ctx.fillStyle = r.canary ? 'rgb(22,163,74)' : `rgb(${rgb})`;
          ctx.beginPath();
          ctx.arc(x, y, near === r ? 4 : 2.2, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        const n = near as Req | null;
        if ((n?.id ?? null) !== hudId.current) {
          hudId.current = n?.id ?? null;
          setHud(n ? { ...n } : null);
        }
      },
    }),
    [],
  );
  const ref = useCanvasScene(scene);

  return (
    <div className="grid items-center gap-[var(--sp-10)] lg:grid-cols-2">
      <div>
        <p className="text-label text-[var(--sg-blue)]">Release safety</p>
        <h3 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Ship to a few before you ship to all.</h3>
        <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
          Slide the weight to send a share of real traffic to the new version. Hover the stream to inspect a request. If the
          canary misbehaves, traffic swings back automatically.
        </p>
        <label className="mt-[var(--sp-8)] block rounded-[var(--r-xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] p-[var(--sp-6)]">
          <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--sg-text-3)]">
            Canary weight <span className="text-[var(--sg-success)]">{weight}%</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-[var(--sp-4)] w-full cursor-pointer accent-[var(--sg-blue)]"
            aria-label="Canary traffic weight percentage"
          />
          <div className="mt-[var(--sp-4)] min-h-[52px] rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)] px-[var(--sp-4)] py-[var(--sp-3)] font-mono text-[11px] text-[var(--sg-text-2)]">
            {hud ? (
              <span>
                req #{hud.id} → {hud.canary ? canaryLabel : stableLabel} · {hud.ms} ms
              </span>
            ) : (
              <span className="text-[var(--sg-text-4)]">Hover the stream to inspect a request</span>
            )}
          </div>
        </label>
      </div>
      <div
        className="relative aspect-video overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] shadow-[var(--shadow-lift-md)] cursor-crosshair"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        }}
        onPointerLeave={() => (mouse.current = { x: -1, y: -1 })}
      >
        <canvas ref={ref} className="absolute inset-0" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full border border-[var(--sg-success-bd)] bg-[var(--sg-success-bg)] px-2.5 py-0.5 text-label text-[var(--sg-success)]">{canaryLabel}</span>
        <span className="absolute left-4 bottom-4 rounded-full border border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] px-2.5 py-0.5 text-label text-[var(--sg-blue)]">{stableLabel}</span>
      </div>
    </div>
  );
}
