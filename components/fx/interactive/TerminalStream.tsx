'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Ported from the 2026 agency site's CloudArchSections → IaCLiveStream +
// DecryptedLine. Lines resolve out of scrambled glyphs one after another.
// Changes: starts on its own when scrolled into view (the original needed a
// click), a Replay control, theme tokens, and an honest "Example output" label.

const GLYPHS = '0123456789ABCDEF!@#$%^&*_+<>/';

function DecryptedLine({ text, reduced }: { text: string; reduced: boolean }) {
  const [shown, setShown] = useState(reduced ? text : '');
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      setShown(text.split('').map((c, k) => (k < i || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''));
      if (i >= text.length) clearInterval(id);
      i += 1 / 2;
    }, 22);
    return () => clearInterval(id);
  }, [text, reduced]);
  return <div className="whitespace-pre-wrap break-words">{shown}</div>;
}

export function TerminalStream({ title, lines, interval = 1400 }: { title: string; lines: string[]; interval?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px' });
  const reduced = !!useReducedMotion();
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(lines.length);
      return;
    }
    setCount(1);
    const id = setInterval(() => setCount((c) => (c < lines.length ? c + 1 : c)), interval);
    return () => clearInterval(id);
  }, [inView, run, reduced, lines.length, interval]);

  const done = count >= lines.length;

  return (
    <div ref={ref} className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border-md)] bg-[var(--sg-ink)] shadow-[var(--shadow-lift-md)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--sg-border)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[var(--sg-danger)] opacity-50" />
          <span className="size-2.5 rounded-full bg-[var(--sg-warn)] opacity-50" />
          <span className="size-2.5 rounded-full bg-[var(--sg-success)] opacity-50" />
          <span className="ml-3 font-mono text-[11px] text-[var(--sg-text-3)]">{title}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-4)]">Example output</span>
      </div>
      <div className="min-h-[260px] space-y-1.5 p-5 font-mono text-[12.5px] leading-relaxed text-[var(--sg-text-2)]" aria-live="polite">
        {lines.slice(0, count).map((l, i) => (
          <div key={`${run}-${i}`} className="flex gap-3">
            <span className="select-none text-[var(--sg-blue)]">{i === lines.length - 1 ? '✓' : '›'}</span>
            <DecryptedLine text={l} reduced={reduced} />
          </div>
        ))}
        {!done && <span className="ml-6 inline-block h-4 w-2 animate-pulse bg-[var(--sg-blue)] align-middle" />}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--sg-border)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className={cn('size-2 rounded-full', done ? 'bg-[var(--sg-success)]' : 'animate-pulse bg-[var(--sg-blue)]')} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-3)]">{done ? 'Complete' : 'Running'}</span>
        </div>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] text-[var(--sg-text-3)] transition-colors hover:bg-[var(--sg-surface-2)] hover:text-[var(--sg-text-1)]"
        >
          <RotateCcw size={12} aria-hidden="true" /> Replay
        </button>
      </div>
    </div>
  );
}
