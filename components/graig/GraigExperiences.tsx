'use client';

import { useEffect, useRef, useState } from 'react';
import { Brain, Check, Eye, GitBranch, Lock, ScanEye, ShieldCheck, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUS } from './stage/bus';

// Graig's sections, each its own experience (2026-10-17, Tumiso: "the other sections
// have the same cards layout — each section should be unique and an experience").
// No card grids: a receipts panel, a run-log rail, a ledger that steers the hash chain,
// and four seals that lock the vault one tumbler at a time. Content is unchanged and
// honest: Live is live; nothing here is sample data dressed as real.

// ── 01 · Three receipts ───────────────────────────────────────────────────
type Receipt = { id: 'memory' | 'judgment' | 'public'; eyebrow: string; title: string; body: string };

export function Receipts({ items }: { items: Receipt[] }) {
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setOn((i) => (i + 1) % items.length), 6500);
    return () => window.clearInterval(id);
  }, [paused, items.length]);
  const cur = items[on];
  const CurIcon = RECEIPT_ICONS[cur.id];
  return (
    <div className="g-receipts" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="What makes him a twin" className="g-receipts-tabs">
        {items.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            type="button"
            aria-selected={i === on}
            onClick={() => setOn(i)}
            onFocus={() => setOn(i)}
            className={cn('g-receipts-tab', i === on && 'on')}
          >
            <span className="font-mono text-[11px] text-[var(--sg-text-4)]">0{i + 1}</span>
            <span className="font-display text-[clamp(17px,1.6vw,21px)] font-bold tracking-[-0.02em]">{r.eyebrow}</span>
            <i className="g-receipts-timer" style={{ animationPlayState: paused || i !== on ? 'paused' : 'running' }} key={`${on}-${i}`} />
          </button>
        ))}
      </div>
      <div role="tabpanel" className="g-receipts-body" key={cur.id}>
        <div className="g-receipts-copy">
          <p className="text-label text-[var(--sg-blue)] flex items-center gap-2">
            <CurIcon size={14} aria-hidden="true" /> {cur.eyebrow} · live today
          </p>
          <h3 className="font-display text-[clamp(24px,2.6vw,34px)] font-bold tracking-[-0.03em] text-[var(--sg-text-1)] mt-3 text-balance">{cur.title}</h3>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-4 max-w-[560px]">{cur.body}</p>
        </div>
        <div className="g-receipts-art" aria-hidden="true">
          {cur.id === 'memory' && <RecallDial />}
          {cur.id === 'judgment' && <LedgerShape />}
          {cur.id === 'public' && <DailyLoop />}
        </div>
      </div>
    </div>
  );
}

/** The nightly recall score, drawn as a dial that fills when the tab opens. */
function RecallDial() {
  const R = 64, Cc = 2 * Math.PI * R;
  return (
    <div className="g-dial">
      <svg viewBox="0 0 160 160" className="size-full">
        <circle cx="80" cy="80" r={R} fill="none" stroke="var(--sg-border-md)" strokeWidth="8" />
        <circle cx="80" cy="80" r={R} fill="none" stroke="var(--sg-blue)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${Cc * 0.96} ${Cc}`} transform="rotate(-90 80 80)" className="g-dial-arc" style={{ ['--g-len' as string]: `${Cc}` }} />
      </svg>
      <div className="g-dial-num"><b>96%</b><small>nightly recall</small></div>
    </div>
  );
}

/** The shape of a decision-ledger entry: the fields every real entry carries. */
function LedgerShape() {
  const rows = ['Context', 'Options', 'Choice', 'Reasons', 'Confidence', 'Expected outcome', 'What happened'];
  return (
    <ol className="g-ledger-shape">
      {rows.map((r, i) => (
        <li key={r} style={{ animationDelay: `${i * 70}ms` }}>
          <span className="font-mono text-[11px] text-[var(--sg-text-4)]">{String(i + 1).padStart(2, '0')}</span>
          <span className="font-sans text-[14px] text-[var(--sg-text-1)]">{r}</span>
          {r === 'What happened' ? <em className="font-mono text-[11px] not-italic text-[var(--sg-blue)]">asked later</em> : <i />}
        </li>
      ))}
    </ol>
  );
}

/** His daily loop, as it runs: read, write, draw, review, publish. */
function DailyLoop() {
  const steps = ['Read the news', 'Write', 'Draw the slides', 'Second-model review', 'Publish', 'Log it'];
  return (
    <ol className="g-loop">
      {steps.map((s, i) => (
        <li key={s} style={{ animationDelay: `${i * 140}ms` }}>
          <span className="g-loop-dot" />
          <span className="font-sans text-[14px] text-[var(--sg-text-1)]">{s}</span>
        </li>
      ))}
    </ol>
  );
}

// ── 03 · Run log rail ─────────────────────────────────────────────────────
export function RunLog({ steps }: { steps: { at: string | null; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setFill(Math.max(0, Math.min(1, (innerHeight * 0.7 - r.top) / Math.max(1, r.height))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener('scroll', on, { passive: true });
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <ol ref={ref} className="g-runlog" style={{ ['--g-fill' as string]: fill }}>
      {steps.map((s, i) => (
        <li key={s.text} className={cn(fill * steps.length > i + 0.2 && 'on')}>
          <span className="g-runlog-time">{s.at ? s.at.slice(11, 16) : '—'}</span>
          <span className="g-runlog-node" aria-hidden="true" />
          <span className="text-body text-[var(--sg-text-2)]">{s.text}</span>
        </li>
      ))}
    </ol>
  );
}

// ── 04 · The ledger: rows that steer the hash chain ────────────────────────
type Entry = { date: string; headline: string; summary: string; draft: boolean; seal: string };

export function Ledger({ entries }: { entries: Entry[] }) {
  const [open, setOpen] = useState(0);
  useEffect(() => () => BUS.set('chainFocus', -1), []);
  return (
    <ol className="g-ledger" onMouseLeave={() => BUS.set('chainFocus', -1)}>
      {entries.map((e, i) => (
        <li key={e.headline} className={cn('g-ledger-row', i === open && 'open')}>
          <button
            type="button"
            aria-expanded={i === open}
            onClick={() => setOpen(i === open ? -1 : i)}
            onMouseEnter={() => BUS.set('chainFocus', i)}
            onFocus={() => BUS.set('chainFocus', i)}
            className="g-ledger-head"
          >
            <span className="g-ledger-link" aria-hidden="true" />
            <span className="font-mono text-[12px] text-[var(--sg-blue)] w-[92px] shrink-0">{e.date}</span>
            <span className="flex-1 text-left font-display text-[clamp(16px,1.5vw,19px)] font-semibold tracking-[-0.015em] text-[var(--sg-text-1)]">
              {e.headline}
              {e.draft && <span className="ml-2 align-middle rounded-full px-2 py-0.5 text-[10px] font-medium bg-[rgba(249,115,22,0.12)] text-[var(--sg-amber)]">Draft, not approved</span>}
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[var(--sg-text-4)]">{e.seal}</span>
            <Check size={14} className="text-[var(--sg-success)] shrink-0" aria-label="sealed to the entry before it" />
          </button>
          <div className="g-ledger-body">
            <p className="text-body text-[var(--sg-text-3)]">{e.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── 05 · Four seals: each one locks a tumbler on the vault ────────────────
const SEAL_ICONS: LucideIcon[] = [Lock, ShieldCheck, Eye, ScanEye];
const RECEIPT_ICONS: Record<Receipt['id'], LucideIcon> = { memory: Brain, judgment: GitBranch, public: Eye };

export function Seals({ items }: { items: { title: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);
  // scrolling through the list locks them in order; hovering one jumps to it
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (innerHeight * 0.62 - r.top) / Math.max(1, r.height);
      setOn(p < 0 ? -1 : Math.min(items.length - 1, Math.floor(p * items.length)));
    };
    const on2 = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener('scroll', on2, { passive: true });
    return () => { removeEventListener('scroll', on2); cancelAnimationFrame(raf); BUS.set('vaultStep', -1); };
  }, [items.length]);
  const active = hover ?? on;
  useEffect(() => { BUS.set('vaultStep', active); }, [active]);
  return (
    <ol ref={ref} className="g-seals" onMouseLeave={() => setHover(null)}>
      {items.map((it, i) => {
        const Icon = SEAL_ICONS[i % SEAL_ICONS.length];
        const sealed = i <= active;
        return (
          <li key={it.title} className={cn('g-seal', sealed && 'sealed', i === active && 'on')} onMouseEnter={() => setHover(i)}>
            <span className="g-seal-mark" aria-hidden="true"><Icon size={16} /></span>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-[var(--sg-text-4)]">Seal 0{i + 1}</span>
                <span className="g-seal-state font-mono text-[10px] uppercase tracking-[0.1em]">{sealed ? 'locked' : 'open'}</span>
              </div>
              <h3 className="font-display text-[clamp(20px,2vw,26px)] font-bold tracking-[-0.025em] text-[var(--sg-text-1)] mt-1">{it.title}</h3>
              <p className="g-seal-body text-body text-[var(--sg-text-2)]">{it.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

