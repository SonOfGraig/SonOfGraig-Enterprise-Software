'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { BUS } from './stage/bus';

// The small interactive pieces of Graig's page: his top bar (it takes the colour of
// the section under it), the orb's state switch, and the pinned stage list.

/** His mark: the core, its tilted orbit and the satellite. */
export function GraigMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="16" rx="14" ry="6" transform="rotate(-24 16 16)" fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.3" />
      <circle cx="16" cy="16" r="7.5" fill="currentColor" />
      <circle cx="28.2" cy="10.4" r="2" fill="currentColor" />
    </svg>
  );
}

const LINKS = [
  { href: '#twin', label: 'Twin' },
  { href: '#merge', label: 'How it works' },
  { href: '#work', label: 'Work' },
  { href: '#changelog', label: 'Log' },
  { href: '#private', label: 'Privacy' },
  { href: '#original', label: 'Tumiso' },
];

// The main site's nav, made Graig's: the same glass header bar (lg-fill-strong, rim,
// blur), the same liquid-glass pill that slides to the hovered link (layoutId) and
// rests on the section you're in, the same labels leaning toward the cursor.
function useMagnet() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 30 });
  const sy = useSpring(y, { stiffness: 500, damping: 30 });
  return {
    style: { x: sx, y: sy },
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * 0.1);
      y.set((e.clientY - r.top - r.height / 2) * 0.1);
    },
    onMouseLeave: () => { x.set(0); y.set(0); },
  };
}

function BarLink({ href, label, active, pill, onHover }: { href: string; label: string; active: boolean; pill: boolean; onHover: () => void }) {
  const magnet = useMagnet();
  return (
    <a
      href={href}
      onMouseEnter={onHover}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'relative isolate flex h-9 items-center rounded-full px-3.5 text-[13px] font-sans transition-colors duration-300',
        active || pill ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]',
      )}
    >
      {pill && <motion.span layoutId="g-nav-pill" data-active={active} className="nav-pill" transition={{ type: 'spring', bounce: 0.1, stiffness: 400, damping: 30 }} />}
      <motion.span style={magnet.style} className="relative z-[1] pointer-events-none">{label}</motion.span>
    </a>
  );
}

export function GraigBar({ follow, second }: { follow?: { label: string; href: string }; second?: { label: string; href: string } }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  // only link the sections this build actually has (unapproved drafts are left out)
  const [links, setLinks] = useState(LINKS);
  useEffect(() => { setLinks(LINKS.filter((l) => document.getElementById(l.href.slice(1)))); }, []);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      let t: 'dark' | 'light' = 'light';
      let id = '';
      for (const s of document.querySelectorAll<HTMLElement>('.g-page [data-ground]')) {
        const r = s.getBoundingClientRect();
        if (r.top <= 32 && r.bottom > 32) t = s.dataset.theme === 'dark' ? 'dark' : 'light';
        if (r.top <= window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.45) id = s.id;
      }
      setTheme(t);
      setActive(id);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  const pillOn = hovered ?? active;
  return (
    <header data-theme={theme} className="g-bar">
      <a href="#top" className="flex gap-2 items-start shrink-0">
        <GraigMark className="size-8 text-[var(--sg-blue)]" />
        <span className="flex flex-col pt-1">
          <span className="font-display font-bold text-[18px] text-[var(--sg-text-1)] tracking-tight leading-none">Graig</span>
          <span className="hidden sm:block font-sans text-[10px] text-[var(--sg-blue)] uppercase tracking-wider mt-1">AI digital twin</span>
        </span>
      </a>
      <nav aria-label="Graig" className="hidden md:flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {links.map((l) => {
          const id = l.href.slice(1);
          return <BarLink key={l.href} href={l.href} label={l.label} active={active === id} pill={pillOn === id} onHover={() => setHovered(id)} />;
        })}
      </nav>
      <div className="flex items-center gap-3">
        {second && (
          <Button variant="secondary" size="sm" className="hidden sm:inline-flex" asChild>
            <a href={second.href}>{second.label}</a>
          </Button>
        )}
        {follow && (
          <Button variant="primary" size="sm" asChild>
            <a href={follow.href} target="_blank" rel="me noopener noreferrer">{follow.label}</a>
          </Button>
        )}
      </div>
    </header>
  );
}

const STATES = [
  { id: 'idle', label: 'Idle', note: 'Sapphire. Sealed: the tumblers rest in line and turn slowly.' },
  { id: 'listening', label: 'Listening', note: 'Cyan. The rings lean in toward you; the core swells.' },
  { id: 'thinking', label: 'Thinking', note: 'Sky blue. The seal opens and the rings spin hard over his memory.' },
  { id: 'speaking', label: 'Speaking', note: 'Electric blue. Sealed again; the core goes white-hot on each syllable.' },
] as const;

/** Graig's states. Hovering a state shows it on his orb; clicking keeps it. */
export function OrbStates() {
  const [shown, setShown] = useState<string>(BUS.shown);
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    const off = BUS.on((k: string, v: string) => { if (k === 'shown') setShown(v); });
    return () => { off(); };
  }, []);
  const cur = STATES.find((s) => s.id === shown) ?? STATES[0];
  return (
    <div className="g-orb-states">
      <div role="group" aria-label="Graig's states: hover to preview, click to keep" className="liquid-glass grid grid-cols-4 gap-0.5 rounded-full p-1" onMouseLeave={() => BUS.set('preview', null)}>
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={picked === s.id}
            onMouseEnter={() => BUS.set('preview', s.id)}
            onFocus={() => BUS.set('preview', s.id)}
            onBlur={() => BUS.set('preview', null)}
            onClick={() => { BUS.set('auto', false); BUS.set('orb', s.id); setPicked(s.id); }}
            className={cn(
              'relative isolate z-[2] h-9 rounded-full px-3 sm:px-4 font-sans text-[12px] sm:text-[13px] transition-colors duration-300',
              shown === s.id ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]',
            )}
          >
            {shown === s.id && <motion.span layoutId="g-orb-pill" data-active="true" className="nav-pill" transition={{ type: 'spring', bounce: 0.1, stiffness: 400, damping: 30 }} />}
            <span className="relative z-[1]">{s.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-sans text-[12px] text-[var(--sg-text-3)]" aria-live="polite">
        <span className="g-live-dot" aria-hidden="true" />{cur.note}
      </p>
    </div>
  );
}

/** Highlights the stage the pinned scene is showing (same mapping as stage/scenes/merge.js). */
export function useMergeStage(sectionId: string) {
  const [stage, setStage] = useState(0);
  const [pin, setPin] = useState(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = document.getElementById(sectionId);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      const q = p * 4, k = Math.min(3, Math.floor(q)), f = q - k;
      setStage(Math.min(3, Math.round(k + Math.min(1, Math.max(0, (f - 0.62) / 0.38)))));
      setPin(p);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener('scroll', on, { passive: true });
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, [sectionId]);
  return { stage, pin };
}

type Stage = { n: string; name: string; note: string; status: 'Live' | 'Building' | 'Next' };
export function MergeSteps({ stages }: { stages: Stage[] }) {
  const { stage, pin } = useMergeStage('merge');
  return (
    <div className="g-steps">
      <ol>
        {stages.map((s, i) => (
          <li key={s.n} className={cn('g-step', i === stage && 'on', i < stage && 'past')}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] text-[var(--sg-text-4)]">{s.n}</span>
              <h3 className="font-display text-[clamp(20px,2.2vw,26px)] font-bold tracking-[-0.02em] text-[var(--sg-text-1)]">{s.name}</h3>
              <span className={cn('g-status', `g-status-${s.status.toLowerCase()}`)}>{s.status}</span>
            </div>
            <p className="g-step-note text-body text-[var(--sg-text-2)]">{s.note}</p>
          </li>
        ))}
      </ol>
      <div className="g-steps-bar" aria-hidden="true"><i style={{ width: `${(pin * 100).toFixed(1)}%` }} /></div>
    </div>
  );
}
