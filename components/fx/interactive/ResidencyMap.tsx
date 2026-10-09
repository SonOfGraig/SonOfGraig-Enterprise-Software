'use client';

import { useMemo, useRef, useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { useCanvasScene, type Scene } from '@/components/fx/canvas/useCanvasScene';
import { cn } from '@/lib/utils';

// Ported from the 2026 agency site's CloudArchSections → SovereigntyLockdownMap.
// Click a region to lock it: data packets bounce off its hexagonal wall and
// ripple — residency enforced at the boundary. The original's remote world
// photo is replaced by a dot grid (no third-party image).

const REGIONS = [
  { id: 'za', name: 'South Africa', code: 'af-south-1', x: 0.54, y: 0.74 },
  { id: 'eu', name: 'European Union', code: 'eu-west-1', x: 0.5, y: 0.3 },
  { id: 'us', name: 'United States', code: 'us-east-1', x: 0.2, y: 0.38 },
];

type Pk = { x: number; y: number; vx: number; vy: number };
type Rp = { x: number; y: number; r: number; a: number };

export function ResidencyMap() {
  const [locked, setLocked] = useState<Set<string>>(() => new Set(['za']));
  const lockedRef = useRef(locked);
  lockedRef.current = locked;

  const scene = useMemo<Scene<{ pk: Pk[]; rp: Rp[] }>>(
    () => ({
      init: ({ width, height }) => ({
        pk: Array.from({ length: 46 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 2.4, vy: (Math.random() - 0.5) * 2.4 })),
        rp: [],
      }),
      frame: ({ ctx, width, height, rgb, dark }, st) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.07)' : 'rgba(13,17,23,0.07)';
        for (let x = 12; x < width; x += 22) for (let y = 12; y < height; y += 22) ctx.fillRect(x, y, 1.2, 1.2);
        const hex = Math.min(width, height) * 0.17;
        for (const r of REGIONS) {
          if (!lockedRef.current.has(r.id)) continue;
          const rx = r.x * width;
          const ry = r.y * height;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const ang = (Math.PI / 3) * i + Math.PI / 6;
            const hx = rx + hex * Math.cos(ang);
            const hy = ry + hex * Math.sin(ang);
            if (i) ctx.lineTo(hx, hy);
            else ctx.moveTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${rgb}, ${dark ? 0.1 : 0.07})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${rgb}, 0.85)`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
        for (const p of st.pk) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          for (const r of REGIONS) {
            if (!lockedRef.current.has(r.id)) continue;
            const rx = r.x * width;
            const ry = r.y * height;
            const d = Math.hypot(p.x - rx, p.y - ry);
            if (d < hex && d > hex * 0.75) {
              const ang = Math.atan2(p.y - ry, p.x - rx);
              const sp = Math.hypot(p.vx, p.vy);
              p.vx = Math.cos(ang) * sp;
              p.vy = Math.sin(ang) * sp;
              p.x = rx + Math.cos(ang) * (hex + 1);
              p.y = ry + Math.sin(ang) * (hex + 1);
              if (st.rp.length < 40) st.rp.push({ x: p.x, y: p.y, r: 0, a: 0.8 });
            }
          }
          ctx.fillStyle = `rgba(${rgb}, 0.9)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        st.rp = st.rp.filter((r) => {
          r.r += 1.6;
          r.a -= 0.04;
          if (r.a <= 0) return false;
          ctx.strokeStyle = `rgba(${rgb}, ${r.a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          ctx.stroke();
          return true;
        });
      },
    }),
    [],
  );
  const ref = useCanvasScene(scene);

  const toggle = (id: string) =>
    setLocked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="grid items-center gap-[var(--sp-10)] lg:grid-cols-[1.2fr_1fr]">
      <div className="relative aspect-video overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] shadow-[var(--shadow-lift-md)]">
        <canvas ref={ref} className="absolute inset-0" aria-hidden="true" />
        {REGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => toggle(r.id)}
            aria-pressed={locked.has(r.id)}
            aria-label={`${locked.has(r.id) ? 'Unlock' : 'Lock'} ${r.name}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%` }}
          >
            <span
              className={cn(
                'block size-5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125',
                locked.has(r.id) ? 'border-white bg-[var(--sg-blue)] shadow-[0_0_0_6px_var(--sg-blue-glow)]' : 'border-[var(--sg-border-str)] bg-[var(--sg-surface-2)]',
              )}
            />
            <span className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-[var(--r-sm)] border border-[var(--sg-border)] bg-[var(--sg-bg)] px-2 py-0.5 font-mono text-[10px] text-[var(--sg-text-2)]">
              {r.code}
            </span>
          </button>
        ))}
      </div>
      <div>
        <p className="text-label text-[var(--sg-blue)]">Data residency</p>
        <h3 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Walls you can see.</h3>
        <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
          Click a region to lock it. Data that tries to cross the boundary bounces off — which is how residency should be
          enforced: in IAM and network policy, not in a document.
        </p>
        <ul className="mt-[var(--sp-6)] space-y-[var(--sp-2)]">
          {REGIONS.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => toggle(r.id)}
                className="flex w-full items-center justify-between rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-surface)] px-[var(--sp-4)] py-[var(--sp-3)] text-left transition-colors hover:border-[var(--sg-border-md)]"
              >
                <span className="font-sans text-[14px] text-[var(--sg-text-1)]">
                  {r.name} <span className="font-mono text-[11px] text-[var(--sg-text-4)]">{r.code}</span>
                </span>
                <span className={cn('inline-flex items-center gap-1.5 text-label', locked.has(r.id) ? 'text-[var(--sg-blue)]' : 'text-[var(--sg-text-4)]')}>
                  {locked.has(r.id) ? <Lock size={12} aria-hidden="true" /> : <LockOpen size={12} aria-hidden="true" />}
                  {locked.has(r.id) ? 'Locked' : 'Open'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
