'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Database, Workflow, ShieldCheck, FlaskConical, Map, Activity, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIDevIcon } from '@/components/ui/PlatformIcons';
import styles from './AIDevHeroCard.module.css';

// The original AI Dev Platform cluster card (ClusterStrip, card 01 + panel 0),
// restored verbatim for the home hero (Tumiso, 2026-10-09). CSS is the
// original module, unchanged. Edits are content only: ship dates became
// statuses, the af-south-1 residency row and "Ships Q4 2026" were removed,
// and ML Ops was added so all four modules appear.
const MODULES = [
  { name: 'RAG Studio', status: 'Early access', tone: styles.badgeGreen, icon: Database, desc: 'Connect documents. Get cited AI answers. POPIA-native.', progress: 65 },
  { name: 'Agent Builder', status: 'In development', tone: styles.badgeBlue, icon: Workflow, desc: 'Visual canvas. Multi-agent orchestration. Execution trace.', progress: 30 },
  { name: 'Governance Hub', status: 'Planned', tone: styles.badgeGray, icon: ShieldCheck, desc: 'POPIA reports. Bias detection. SHAP explainability.', progress: 10 },
  { name: 'ML Ops', status: 'Planned', tone: styles.badgeGray, icon: FlaskConical, desc: 'Evaluate, fine-tune and version models.', progress: 5 },
];

export function AIDevHeroCard() {
  // Starts collapsed, then opens itself once the hero has painted — the
  // original's hover/expand choreography plays as the entrance.
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t1 = setTimeout(() => setMounted(true), reduced ? 0 : 200);
    const t2 = setTimeout(() => setOpen(true), reduced ? 0 : 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const toggle = () => setOpen((o) => !o);

  return (
    <div className={cn(styles.page, styles.heroLayout, 'text-left')}>
      <div
        className={cn(styles.card, styles.c1, open && styles.active)}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-controls="ai-dev-hero-panel"
      >
        <div className={styles.cardTooltip}>Phase 1 — Building now</div>
        <div className={styles.statusChip}>
          <div className={styles.statusChipDot} />
          Active build
        </div>

        <span className={styles.cardNum}>01</span>

        <div className={styles.cardIconWrap}>
          <AIDevIcon width={22} height={22} />
        </div>

        <div className={styles.cardName}>AI Dev Platform</div>
        <div className={styles.cardTags}>Agents · RAG · Fine-Tuning · Governance</div>

        <div className={styles.cardDivider} />

        <div className={styles.cardProducts}>
          {MODULES.map((m) => (
            <div key={m.name} className={styles.cardProduct}>
              <div className={styles.cardProductDot} />
              <span>{m.name}</span>
              <span className={cn(styles.cardProductStatus, m.tone)}>{m.status}</span>
            </div>
          ))}
        </div>

        <div className={styles.cardBottom}>
          <span className={styles.phaseBadge}>
            <span className={styles.phaseDot} />
            Phase 1
          </span>
          <span className={styles.scoreBadge}>
            <span className={styles.scorePips}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={cn(styles.pip, styles.on)} />
              ))}
            </span>
            5/5
          </span>
        </div>
        <div className={styles.cardProgress}>
          <div className={styles.cardProgressFill} style={{ width: mounted ? '35%' : '0%' }} />
        </div>
      </div>

      <div id="ai-dev-hero-panel" className={cn(styles.expandPanel, open && styles.open)}>
        <div className={styles.expandInner}>
          <div className={styles.expandSection}>
            <div className={styles.expandSectionLabel}>Modules in the platform</div>
            <div className={styles.expandProducts}>
              {MODULES.map((m) => (
                <div key={m.name} className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, m.tone)}>
                    <m.icon strokeWidth={1.5} size={14} />
                  </div>
                  <div className={styles.expandProductInfo}>
                    <div className={styles.expandProductName}>{m.name}</div>
                    <div className={styles.expandProductDesc}>{m.desc}</div>
                  </div>
                  <span className={cn(styles.expandProductBadge, m.tone)}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.expandSection}>
            <div className={styles.expandSectionLabel}>Build progress</div>
            <div className={styles.expandStats}>
              {MODULES.map((m) => (
                <div key={m.name} className={styles.expandStat}>
                  <div className={styles.expandStatLabel}>{m.name}</div>
                  <div className={styles.expandStatTrack}>
                    <div
                      className={styles.expandStatFill}
                      style={{ width: open ? `${m.progress}%` : '0%', background: 'var(--sg-blue)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.expandSection}>
            <div className={styles.expandSectionLabel}>Platform details</div>
            <div className={styles.expandMeta}>
              <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Status: <strong>RAG Studio first, early access open</strong></span></div>
              <div className={styles.expandMetaRow}><ShieldCheck strokeWidth={1.5} /><span>POPIA: <strong>designed around s11 &amp; s19</strong></span></div>
              <div className={styles.expandMetaRow}><MapPin strokeWidth={1.5} /><span>Built in: <strong>South Africa</strong></span></div>
              <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Pricing: <strong>quoted in rand, no FX</strong></span></div>
            </div>
            <Link
              href="/early-access"
              className={cn(styles.expandCta, styles.c1)}
              style={{ background: 'var(--sg-blue-glow)', borderColor: 'var(--sg-blue-border)', color: 'var(--sg-blue)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Workflow strokeWidth={1.5} size={14} />
              Apply for early access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
