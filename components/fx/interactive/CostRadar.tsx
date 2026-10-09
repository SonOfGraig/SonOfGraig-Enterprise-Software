'use client';

import { useMemo, useRef, useState } from 'react';
import { BadgeCheck, CircleAlert } from 'lucide-react';
import { useCanvasScene, type Scene } from '@/components/fx/canvas/useCanvasScene';
import { cn } from '@/lib/utils';

// Ported from the 2026 agency site's CloudArchSections → FinOpsRadar.
// Drag the target-performance slider: inside the sweet spot (60–80%) the core
// reads Optimised; outside it, rand signs leak out of the core — capital
// spent on capacity you do not need, or lost to throttling.

type P = { x: number; y: number; vx: number; vy: number; life: number };

export function CostRadar() {
  const [perf, setPerf] = useState(65);
  const perfRef = useRef(perf);
  perfRef.current = perf;
  const optimal = perf >= 60 && perf <= 80;

  const scene = useMemo<Scene<{ ps: P[] }>>(
    () => ({
      init: () => ({ ps: [] }),
      frame: ({ ctx, width, height, rgb, dark }, st) => {
        ctx.clearRect(0, 0, width, height);
        const cx = width / 2;
        const cy = height / 2;
        const p = perfRef.current;
        const ok = p >= 60 && p <= 80;
        // radar rings + sweep
        const R = Math.min(width, height) * 0.46;
        ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.18 : 0.12})`;
        ctx.lineWidth = 1;
        for (let k = 1; k <= 4; k++) {
          ctx.beginPath();
          ctx.arc(cx, cy, (R * k) / 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        const a = (performance.now() / 1600) % (Math.PI * 2);
        const g = ctx.createConicGradient ? ctx.createConicGradient(a, cx, cy) : null;
        if (g) {
          g.addColorStop(0, `rgba(${rgb}, ${dark ? 0.28 : 0.18})`);
          g.addColorStop(0.12, `rgba(${rgb}, 0)`);
          g.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, Math.PI * 2);
          ctx.fill();
        }
        if (!ok) {
          const n = Math.ceil(Math.abs(70 - p) / 8);
          for (let i = 0; i < n; i++) st.ps.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 3.2, vy: Math.random() * 3 + 1.2, life: 1 });
        }
        ctx.font = '600 11px ui-monospace, "JetBrains Mono", monospace'; // canvas can't read CSS vars
        st.ps = st.ps.filter((q) => {
          q.x += q.vx;
          q.y += q.vy;
          q.life -= 0.018;
          if (q.life <= 0) return false;
          ctx.fillStyle = `rgba(239, 68, 68, ${q.life})`;
          ctx.fillText('R', q.x, q.y);
          return true;
        });
      },
    }),
    [],
  );
  const ref = useCanvasScene(scene);

  return (
    <div className="grid items-center gap-[var(--sp-10)] lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <canvas ref={ref} className="absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className={cn(
              'flex size-40 flex-col items-center justify-center gap-2 rounded-full border-2 transition-colors duration-500',
              optimal ? 'border-[var(--sg-blue)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]' : 'border-[var(--sg-danger-bd)] bg-[var(--sg-danger-bg)] text-[var(--sg-danger)]',
            )}
          >
            {optimal ? <BadgeCheck size={34} aria-hidden="true" /> : <CircleAlert size={34} aria-hidden="true" />}
            <span className="text-label">{optimal ? 'Optimised' : 'Capital leak'}</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-label text-[var(--sg-blue)]">Cloud economics</p>
        <h3 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-3)]">Performance should not bleed capital.</h3>
        <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
          Drag the target. Inside the sweet spot your spend matches demand; outside it, rand leaks to idle capacity or lost
          throughput. We build the budgets and anomaly alerts that keep you in the band.
        </p>
        <label className="mt-[var(--sp-8)] block rounded-[var(--r-xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] p-[var(--sp-6)]">
          <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--sg-text-3)]">
            Target performance
            <span className={optimal ? 'text-[var(--sg-blue)]' : 'text-[var(--sg-danger)]'}>{perf}%</span>
          </span>
          <input
            type="range"
            min={20}
            max={100}
            value={perf}
            onChange={(e) => setPerf(Number(e.target.value))}
            className="mt-[var(--sp-4)] w-full cursor-pointer accent-[var(--sg-blue)]"
            aria-label="Target performance percentage"
          />
          <span className="mt-[var(--sp-2)] flex justify-between font-mono text-[10px] text-[var(--sg-text-4)]">
            <span>Under-provisioned</span>
            <span>Sweet spot 60–80%</span>
            <span>Over-provisioned</span>
          </span>
        </label>
      </div>
    </div>
  );
}
