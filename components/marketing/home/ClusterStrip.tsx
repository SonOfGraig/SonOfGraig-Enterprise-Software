'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, BarChart2, Glasses, Terminal, 
  Map, Database, Workflow, ShieldCheck, 
  Layout, Fingerprint, Layers, Rocket, Monitor, Activity, Settings, Maximize2, Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './ClusterStrip.module.css';
import {
  AIDevIcon,
  CloudDevOpsIcon,
  DataAnalyticsIcon,
  CreativeXRIcon,
  DevPlatformIcon,
} from '@/components/ui/PlatformIcons';

const clusters = [
  {
    id: 0,
    name: 'AI Dev Platform',
    accentClass: styles.c1,
    icon: AIDevIcon,
    tags: 'Agents · RAG · Fine-Tuning · Governance',
    phase: 'Phase 1',
    viability: '5/5',
    tooltip: 'Phase 1 — Building now',
    status: 'Active build',
    progress: 35,
    pips: 5,
  },
  {
    id: 1,
    name: 'Cloud & DevOps',
    accentClass: styles.c2,
    icon: CloudDevOpsIcon,
    tags: 'IaC · CI/CD · Security · FinOps',
    phase: 'Phase 2',
    viability: '4/5',
    tooltip: 'Phase 2 — Roadmap confirmed',
    status: 'On roadmap',
    progress: 0,
    pips: 4,
  },
  {
    id: 2,
    name: 'Data & Analytics',
    accentClass: styles.c3,
    icon: DataAnalyticsIcon,
    tags: 'Pipelines · BI · Automation',
    phase: 'Phase 2',
    viability: '4/5',
    tooltip: 'Phase 2 — Roadmap confirmed',
    status: 'On roadmap',
    progress: 0,
    pips: 4,
  },
  {
    id: 3,
    name: 'Creative & XR',
    accentClass: styles.c4,
    icon: CreativeXRIcon,
    tags: 'Design · AR/VR · Brand AI',
    phase: 'Phase 3',
    viability: '3/5',
    tooltip: 'Phase 3 — Planning stage',
    status: 'Planning',
    progress: 0,
    pips: 3,
  },
  {
    id: 4,
    name: 'Dev Platform',
    accentClass: styles.c5,
    icon: DevPlatformIcon,
    tags: 'Low-code · IoT · Web3 · Mobile',
    phase: 'Phase 3',
    viability: '3/5',
    tooltip: 'Phase 3 — Planning stage',
    status: 'Planning',
    progress: 0,
    pips: 3,
  }
];

export function ClusterStrip() {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (idx: number) => {
    setActiveIndices(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    if (activeIndices.length === clusters.length) {
      setActiveIndices([]);
    } else {
      setActiveIndices(clusters.map((_, i) => i));
    }
  };

  return (
    <section className={cn("w-full py-[var(--sp-12)] sm:py-[var(--sp-20)]", styles.page)}>
      <div className={styles.pageBg} />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10 w-full mb-[var(--sp-10)]">
        <div className="text-center relative">
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--sg-text-4)] mb-[10px]">
            5 Platform Clusters — One Unified Subscription
          </div>
          <h2 className="font-display text-[28px] font-bold tracking-[-0.03em] text-[var(--sg-text-1)] mb-2">
            The SonOfGraig Platform
          </h2>
          <p className="text-[14px] text-[var(--sg-text-3)] max-w-[480px] mx-auto leading-[1.65]">
            18 service capabilities converted into 5 focused SaaS product clusters. Hover to explore. Click to expand.
          </p>

          <div className="flex justify-center mt-6 sm:absolute sm:right-0 sm:top-2 sm:mt-0">
            <button 
              onClick={toggleAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[var(--sg-surface)] border border-[var(--sg-border-md)] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] hover:border-[var(--sg-border-str)] transition-colors shadow-sm"
            >
              {activeIndices.length === clusters.length ? (
                <><Minimize2 size={13} strokeWidth={2} /> Collapse all</>
              ) : (
                <><Maximize2 size={13} strokeWidth={2} /> Expand all</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 relative z-10">
        <div className={styles.clusterGrid}>
          {clusters.map((cluster, idx) => {
            const Icon = cluster.icon;
            const isActive = activeIndices.includes(idx);
            
            return (
              <div 
                key={cluster.id}
                className={cn(styles.card, cluster.accentClass, isActive && styles.active)}
                onClick={() => toggleExpand(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(idx);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
              >
                <div className={styles.cardTooltip}>{cluster.tooltip}</div>
                <div className={styles.statusChip}>
                  <div className={styles.statusChipDot} style={{ animationName: cluster.progress === 0 && cluster.phase === 'Phase 3' ? 'none' : 'sdot', opacity: cluster.progress === 0 && cluster.phase === 'Phase 3' ? 0.5 : 1 }}></div>
                  {cluster.status}
                </div>

                <span className={styles.cardNum}>0{idx + 1}</span>

                <div className={styles.cardIconWrap}>
                  <Icon width={22} height={22} />
                </div>

                <div className={styles.cardName}>{cluster.name}</div>
                <div className={styles.cardTags}>{cluster.tags}</div>

                <div className={styles.cardDivider}></div>

                <div className={styles.cardProducts}>
                  {idx === 0 && (
                    <>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Agent Builder</span><span className={cn(styles.cardProductStatus, styles.badgeBlue)}>Beta Q1</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>RAG Studio</span><span className={cn(styles.cardProductStatus, styles.badgeGreen)}>Early access</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>ML Ops</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q1 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Governance Hub</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q1 2027</span></div>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Cloud Console</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q2 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Pipeline Builder</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q2 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Security Posture</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q3 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>FinOps Dashboard</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q3 2027</span></div>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Analytics Studio</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q2 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Data Pipelines</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q2 2027</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Workflow Engine</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>Q3 2027</span></div>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Design System Gen</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2027+</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Brand Studio</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2027+</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>XR Builder</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2028</span></div>
                    </>
                  )}
                  {idx === 4 && (
                    <>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>App Builder</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2027+</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>IoT Platform</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2028</span></div>
                      <div className={styles.cardProduct}><div className={styles.cardProductDot}></div><span>Smart Contract IDE</span><span className={cn(styles.cardProductStatus, styles.badgeGray)}>2028</span></div>
                    </>
                  )}
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.phaseBadge}>
                    {cluster.phase === 'Phase 1' && <span className={styles.phaseDot}></span>}
                    {cluster.phase}
                  </span>
                  <span className={styles.scoreBadge}>
                    <span className={styles.scorePips}>
                      {[...Array(5)].map((_, pIdx) => (
                        <span key={pIdx} className={cn(styles.pip, pIdx < cluster.pips && styles.on)}></span>
                      ))}
                    </span>
                    {cluster.viability}
                  </span>
                </div>
                <div className={styles.cardProgress}><div className={styles.cardProgressFill} style={{ width: mounted ? `${cluster.progress}%` : '0%' }}></div></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Panels */}
      <div className="px-4 sm:px-6 relative z-10 max-w-[1180px] mx-auto w-full">
        {/* Panel 0: AI Dev Platform */}
        <div className={cn(styles.expandPanel, activeIndices.includes(0) && styles.open)}>
          <div className={styles.expandInner}>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Products in this cluster</div>
              <div className={styles.expandProducts}>
                <div className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, styles.badgeBlue)}><Database strokeWidth={1.5} size={14} /></div>
                  <div className={styles.expandProductInfo}>
                    <div className={styles.expandProductName}>RAG Studio</div>
                    <div className={styles.expandProductDesc}>Connect documents. Get cited AI answers. POPIA-native.</div>
                  </div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGreen)}>Early access</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, styles.badgeBlue)}><Workflow strokeWidth={1.5} size={14} /></div>
                  <div className={styles.expandProductInfo}>
                    <div className={styles.expandProductName}>Agent Builder</div>
                    <div className={styles.expandProductDesc}>Visual canvas. Multi-agent orchestration. Execution trace.</div>
                  </div>
                  <span className={cn(styles.expandProductBadge, styles.badgeBlue)}>Beta Q1 2027</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, styles.badgeGray)}><ShieldCheck strokeWidth={1.5} size={14} /></div>
                  <div className={styles.expandProductInfo}>
                    <div className={styles.expandProductName}>Governance Hub</div>
                    <div className={styles.expandProductDesc}>Automated POPIA reports. Bias detection. SHAP explainability.</div>
                  </div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q1 2027</span>
                </div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Build progress</div>
              <div className={styles.expandStats}>
                <div className={styles.expandStat}>
                  <div className={styles.expandStatLabel}>RAG Studio completion</div>
                  <div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '65%' : '0%', background: 'var(--sg-blue)' }}></div></div>
                </div>
                <div className={styles.expandStat}>
                  <div className={styles.expandStatLabel}>Agent Builder completion</div>
                  <div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '30%' : '0%', background: 'var(--sg-blue)' }}></div></div>
                </div>
                <div className={styles.expandStat}>
                  <div className={styles.expandStatLabel}>Governance Hub</div>
                  <div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '10%' : '0%', background: 'var(--sg-blue)' }}></div></div>
                </div>
                <div className={styles.expandStat}>
                  <div className={styles.expandStatLabel}>ML Ops</div>
                  <div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '5%' : '0%', background: 'var(--sg-blue)' }}></div></div>
                </div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Cluster details</div>
              <div className={styles.expandMeta}>
                <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Ships: <strong>Q4 2026</strong> (RAG Studio first)</span></div>
                <div className={styles.expandMetaRow}><ShieldCheck strokeWidth={1.5} /><span>POPIA: <strong>Section 11, 19, 26 compliant</strong></span></div>
                <div className={styles.expandMetaRow}><Database strokeWidth={1.5} /><span>Data residency: <strong>AWS af-south-1</strong></span></div>
                <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Pricing: <strong>from R4,999/month ZAR</strong></span></div>
              </div>
              <Link href="/early-access" className={cn(styles.expandCta, styles.c1)} style={{ background: 'var(--sg-blue-glow)', borderColor: 'border-color:var(--sg-blue-border)', color: 'var(--sg-blue)' }}>
                <Workflow strokeWidth={1.5} size={14} />
                Apply for early access
              </Link>
            </div>
          </div>
        </div>

        {/* Panel 1: Cloud & DevOps */}
        <div className={cn(styles.expandPanel, activeIndices.includes(1) && styles.open)}>
          <div className={styles.expandInner}>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Products in this cluster</div>
              <div className={styles.expandProducts}>
                <div className={styles.expandProduct}>
                  <div className={styles.expandProductIco} style={{ background: 'var(--sg-amber-glow, rgba(249,115,22,.08))', borderColor: 'rgba(249,115,22,.18)' }}><Cloud strokeWidth={1.5} size={14} style={{ color: 'var(--sg-amber)' }} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Cloud Console</div><div className={styles.expandProductDesc}>Unified multi-cloud view. Cost allocation. POPIA residency controls.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q2 2027</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={styles.expandProductIco} style={{ background: 'var(--sg-amber-glow, rgba(249,115,22,.08))', borderColor: 'rgba(249,115,22,.18)' }}><Terminal strokeWidth={1.5} size={14} style={{ color: 'var(--sg-amber)' }} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Pipeline Builder</div><div className={styles.expandProductDesc}>Visual CI/CD. GitHub Actions + Terraform IaC. Helm charts.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q2 2027</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, styles.badgeGray)}><ShieldCheck strokeWidth={1.5} size={14} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Security Posture</div><div className={styles.expandProductDesc}>Zero-trust posture management. Prometheus + Grafana.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q3 2027</span>
                </div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Build progress</div>
              <div className={styles.expandStats}>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Architecture design</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '40%' : '0%', background: 'var(--sg-amber)' }}></div></div></div>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Cloud Console</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: '0%', background: 'var(--sg-amber)' }}></div></div></div>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Pipeline Builder</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: '0%', background: 'var(--sg-amber)' }}></div></div></div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Cluster details</div>
              <div className={styles.expandMeta}>
                <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Target: <strong>Q2 2027</strong></span></div>
                <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Viability: <strong>4/5 — High</strong></span></div>
                <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Funded by: <strong>Phase 1 services revenue</strong></span></div>
              </div>
              <Link href="/early-access" className={styles.expandCta} style={{ background: 'var(--sg-amber-glow, rgba(249,115,22,.08))', border: '1px solid rgba(249,115,22,.18)', color: 'var(--sg-amber)' }}>
                <Cloud strokeWidth={1.5} size={14} />
                Join early interest list
              </Link>
            </div>
          </div>
        </div>

        {/* Panel 2: Data & Analytics */}
        <div className={cn(styles.expandPanel, activeIndices.includes(2) && styles.open)}>
          <div className={styles.expandInner}>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Products in this cluster</div>
              <div className={styles.expandProducts}>
                <div className={styles.expandProduct}>
                  <div className={styles.expandProductIco} style={{ background: 'rgba(22,163,74,.08)', borderColor: 'rgba(22,163,74,.18)' }}><BarChart2 strokeWidth={1.5} size={14} style={{ color: 'var(--sg-success)' }} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Analytics Studio</div><div className={styles.expandProductDesc}>Embedded BI dashboards. No SQL required. Live data connectors.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q2 2027</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={styles.expandProductIco} style={{ background: 'rgba(22,163,74,.08)', borderColor: 'rgba(22,163,74,.18)' }}><Database strokeWidth={1.5} size={14} style={{ color: 'var(--sg-success)' }} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Data Pipelines</div><div className={styles.expandProductDesc}>Visual ETL/ELT builder. 200+ source connectors. POPIA lineage.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q2 2027</span>
                </div>
                <div className={styles.expandProduct}>
                  <div className={cn(styles.expandProductIco, styles.badgeGray)}><Workflow strokeWidth={1.5} size={14} /></div>
                  <div className={styles.expandProductInfo}><div className={styles.expandProductName}>Workflow Engine</div><div className={styles.expandProductDesc}>500+ app integrations. Automation flows. Schedule + trigger.</div></div>
                  <span className={cn(styles.expandProductBadge, styles.badgeGray)}>Q3 2027</span>
                </div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Build progress</div>
              <div className={styles.expandStats}>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Architecture design</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: mounted ? '30%' : '0%', background: 'var(--sg-success)' }}></div></div></div>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Analytics Studio</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: '0%', background: 'var(--sg-success)' }}></div></div></div>
                <div className={styles.expandStat}><div className={styles.expandStatLabel}>Data Pipelines</div><div className={styles.expandStatTrack}><div className={styles.expandStatFill} style={{ width: '0%', background: 'var(--sg-success)' }}></div></div></div>
              </div>
            </div>
            <div className={styles.expandSection}>
              <div className={styles.expandSectionLabel}>Cluster details</div>
              <div className={styles.expandMeta}>
                <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Target: <strong>Q2 2027</strong></span></div>
                <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Viability: <strong>4/5 — High</strong></span></div>
                <div className={styles.expandMetaRow}><ShieldCheck strokeWidth={1.5} /><span>Compliance: <strong>POPIA data lineage built-in</strong></span></div>
              </div>
              <Link href="/early-access" className={styles.expandCta} style={{ background: 'rgba(22,163,74,.08)', border: '1px solid rgba(22,163,74,.18)', color: 'var(--sg-success)' }}>
                <Cloud strokeWidth={1.5} size={14} />
                Join early interest list
              </Link>
            </div>
          </div>
        </div>

        {/* Panel 3: Creative & XR */}
        <div className={cn(styles.expandPanel, activeIndices.includes(3) && styles.open)}>
          <div className={styles.expandInner}>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Products</div><div className={styles.expandProducts}>
              <div className={styles.expandProduct}><div className={styles.expandProductIco} style={{ background: 'rgba(124,58,237,.08)', borderColor: 'rgba(124,58,237,.18)' }}><Layout strokeWidth={1.5} size={14} style={{ color: 'var(--cc)' }} /></div><div className={styles.expandProductInfo}><div className={styles.expandProductName}>Design System Gen</div><div className={styles.expandProductDesc}>Auto-generate component libraries from brand tokens.</div></div><span className={cn(styles.expandProductBadge, styles.badgeGray)}>2027+</span></div>
              <div className={styles.expandProduct}><div className={styles.expandProductIco} style={{ background: 'rgba(124,58,237,.08)', borderColor: 'rgba(124,58,237,.18)' }}><Glasses strokeWidth={1.5} size={14} style={{ color: 'var(--cc)' }} /></div><div className={styles.expandProductInfo}><div className={styles.expandProductName}>XR Builder</div><div className={styles.expandProductDesc}>No-code AR/VR experience creator for enterprise training.</div></div><span className={cn(styles.expandProductBadge, styles.badgeGray)}>2028</span></div>
            </div></div>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Details</div><div className={styles.expandMeta}>
              <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Phase 3 — Target <strong>2027+</strong></span></div>
              <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Viability: <strong>3/5</strong> — Dependent on Phase 1+2 revenue</span></div>
            </div></div>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Status</div><div className="text-[12px] text-[var(--sg-text-3)] leading-[1.65]">This cluster is in early planning. Scope is defined but build has not started. Revenue from Phase 1 and Phase 2 clusters will fund this build. <br/><br/>Service delivery in Creative &amp; XR continues during the platform build.</div></div>
          </div>
        </div>

        {/* Panel 4: Dev Platform */}
        <div className={cn(styles.expandPanel, activeIndices.includes(4) && styles.open)}>
          <div className={styles.expandInner}>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Products</div><div className={styles.expandProducts}>
              <div className={styles.expandProduct}><div className={styles.expandProductIco} style={{ background: 'rgba(71,85,105,.07)', borderColor: 'rgba(71,85,105,.16)' }}><Terminal strokeWidth={1.5} size={14} style={{ color: 'var(--cc)' }} /></div><div className={styles.expandProductInfo}><div className={styles.expandProductName}>App Builder</div><div className={styles.expandProductDesc}>Low-code platform for enterprise application creation.</div></div><span className={cn(styles.expandProductBadge, styles.badgeGray)}>2027+</span></div>
              <div className={styles.expandProduct}><div className={styles.expandProductIco} style={{ background: 'rgba(71,85,105,.07)', borderColor: 'rgba(71,85,105,.16)' }}><Settings strokeWidth={1.5} size={14} style={{ color: 'var(--cc)' }} /></div><div className={styles.expandProductInfo}><div className={styles.expandProductName}>IoT Platform</div><div className={styles.expandProductDesc}>Device management and data ingestion at enterprise scale.</div></div><span className={cn(styles.expandProductBadge, styles.badgeGray)}>2028</span></div>
            </div></div>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Details</div><div className={styles.expandMeta}>
              <div className={styles.expandMetaRow}><Map strokeWidth={1.5} /><span>Phase 3 — Target <strong>2027+</strong></span></div>
              <div className={styles.expandMetaRow}><Activity strokeWidth={1.5} /><span>Viability: <strong>3/5</strong> — Dependent on Phase 1+2</span></div>
            </div></div>
            <div className={styles.expandSection}><div className={styles.expandSectionLabel}>Status</div><div className="text-[12px] text-[var(--sg-text-3)] leading-[1.65]">In early planning. IoT and low-code are high-demand in South African enterprise but require significant infrastructure investment. Service delivery continues in this space while the platform is built.</div></div>
          </div>
        </div>

      </div>

      <div className={styles.summaryRow}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryDot} style={{ background: 'var(--sg-success)' }}></div>
          1 cluster shipping Q4 2026
        </div>
        <div className={styles.summarySep}></div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryDot} style={{ background: 'var(--sg-warn)' }}></div>
          2 clusters on 2027 roadmap
        </div>
        <div className={styles.summarySep}></div>
        <div className={styles.summaryItem}>
          <div className={styles.summaryDot} style={{ background: 'var(--sg-text-4)' }}></div>
          2 clusters in planning
        </div>
        <div className={styles.summarySep}></div>
        <div className={styles.summaryItem} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--sg-text-4)' }}>
          from R4,999 / month ZAR
        </div>
      </div>

    </section>
  );
}
