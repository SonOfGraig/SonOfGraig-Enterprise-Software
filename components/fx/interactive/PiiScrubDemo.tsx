'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw, ScanSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

// Illustrates the platform's designed PII-scrubbing step: identifiers in a
// sample sentence are detected one by one and replaced with typed tokens
// before anything would reach a model. Sample data is fictitious and the
// panel is labelled as an illustration.

type Part = string | { pii: string; token: string; kind: string };

const SAMPLE: Part[] = [
  'Client ',
  { pii: 'Thandi Mokoena', token: '[PERSON_1]', kind: 'Name' },
  ' (ID ',
  { pii: '8001015009087', token: '[SA_ID]', kind: 'SA ID number' },
  ') asked to move her debit order. Call her on ',
  { pii: '082 555 0134', token: '[PHONE]', kind: 'Mobile number' },
  ' or email ',
  { pii: 'thandi.m@example.co.za', token: '[EMAIL]', kind: 'Email' },
  '.',
];

const PII = SAMPLE.filter((p): p is Exclude<Part, string> => typeof p !== 'string');

export function PiiScrubDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px' });
  const reduced = !!useReducedMotion();
  const [step, setStep] = useState(0); // 0..PII.length*2  (scan, then redact, per item)
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return setStep(PII.length * 2);
    setStep(0);
    const id = setInterval(() => setStep((s) => (s < PII.length * 2 ? s + 1 : s)), 650);
    return () => clearInterval(id);
  }, [inView, run, reduced]);

  let k = -1;
  return (
    <div ref={ref} className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border-md)] bg-[var(--sg-surface)] shadow-[var(--shadow-lift-md)]">
      <div className="flex items-center justify-between border-b border-[var(--sg-border)] px-5 py-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--sg-text-3)]">
          <ScanSearch size={14} aria-hidden="true" className="text-[var(--sg-blue)]" /> pii-scrubber · before embedding
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-4)]">Illustration · fictitious data</span>
      </div>
      <p className="p-6 font-mono text-[14px] leading-[2] text-[var(--sg-text-2)]">
        {SAMPLE.map((part, i) => {
          if (typeof part === 'string') return <span key={i}>{part}</span>;
          k += 1;
          const scanning = step === k * 2 + 1;
          const redacted = step >= k * 2 + 2;
          return (
            <span
              key={i}
              title={part.kind}
              className={cn(
                'rounded-[var(--r-xs)] px-1 transition-all duration-300',
                redacted ? 'bg-[var(--sg-blue-glow)] font-semibold text-[var(--sg-blue)]' : scanning ? 'bg-[var(--sg-warn-bg)] text-[var(--sg-text-1)] ring-1 ring-[var(--sg-warn)]' : '',
              )}
            >
              {redacted ? part.token : part.pii}
            </span>
          );
        })}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--sg-border)] px-5 py-3">
        <div className="flex flex-wrap gap-2">
          {PII.map((p, i) => (
            <span
              key={p.kind}
              className={cn(
                'rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-colors duration-300',
                step >= i * 2 + 2 ? 'border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]' : 'border-[var(--sg-border)] text-[var(--sg-text-4)]',
              )}
            >
              {p.kind}
            </span>
          ))}
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
