'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './DashboardPreview.module.css';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const AGENTS = [
  { id:1, name:'Customer support agent', type:'Single agent', model:'GPT-4o', status:'live', lastRun:'2 min ago', runs:1204, color:'#0B9EDE', icon:'CS', p50:210, tokens:'1.2M' },
  { id:2, name:'Research pipeline',       type:'Multi-agent', model:'Claude 3.5', status:'live', lastRun:'1 hr ago', runs:842, color:'#16A34A', icon:'RP', p50:890, tokens:'0.8M' },
  { id:3, name:'Document onboarding',     type:'Single agent', model:'GPT-4o mini', status:'draft', lastRun:'—', runs:0, color:'#F97316', icon:'DO', p50:0, tokens:'0.4M' },
  { id:4, name:'Lead qualification bot',  type:'Single agent', model:'Claude Haiku', status:'live', lastRun:'5 hr ago', runs:3021, color:'#7C3AED', icon:'LQ', p50:135, tokens:'0.2M' },
  { id:5, name:'Invoice extractor',       type:'Single agent', model:'GPT-4o', status:'live', lastRun:'Yesterday', runs:456, color:'#0F6E56', icon:'IE', p50:440, tokens:'0.1M' },
  { id:6, name:'Competitor monitor',      type:'Multi-agent', model:'Gemini 1.5', status:'draft', lastRun:'—', runs:0, color:'#B45309', icon:'CM', p50:0, tokens:'—' },
];

export function DashboardPreview() {
  const reduced = useReducedMotion();
  const { theme, setTheme } = useTheme();
  const mainAreaRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Initialising agent runtime…');
  const [overlayDone, setOverlayDone] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', dir: 1 });
  
  const [activeSidebar, setActiveSidebar] = useState('sbAgents');
  
  const [toasts, setToasts] = useState<any[]>([]);
  
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  // Loading sequence
  const triggerLoad = useRef(() => {
    const msgs = [
      'Initialising agent runtime…',
      'Connecting to model registry…',
      'Loading execution traces…',
      'Fetching usage telemetry…',
      'Ready.'
    ];
    let i = 0;
    const cycle = setInterval(() => {
      i++;
      if (i < msgs.length) {
        setLoadingMsg(msgs[i]);
      } else {
        clearInterval(cycle);
        setTimeout(() => {
          setOverlayDone(true);
          setTimeout(() => {
            setOverlayHidden(true);
            setLoaded(true);
          }, 500);
        }, 300);
      }
    }, 380);
  });

  useEffect(() => {
    let active = true;
    if (!loaded && active) {
      triggerLoad.current();
    }
    return () => { active = false; };
  }, []); // Only run once on mount

  const showToast = (title: string, msg: string, type: 'ok' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const startTour = () => {
    if (!loaded) {
      showToast('Loading...', 'Wait for the dashboard to finish loading.', 'info');
      return;
    }
    setTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setTourActive(false);
    setCurrentStep(-1);
    showToast('Tour complete', 'You can restart the tour anytime from the ? button.', 'ok');
  };

  const filteredAgents = AGENTS.filter(a => {
    const matchFilter = activeFilter === 'all' || a.status === activeFilter;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  }).sort((a, b) => {
    const { key, dir } = sortConfig;
    if (key === 'name') return dir * a.name.localeCompare(b.name);
    if (key === 'runs') return dir * (a.runs - b.runs);
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      dir: prev.key === key ? prev.dir * -1 : 1
    }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const genSparkline = (seed: number) => {
    const pts = [];
    let y = 14;
    for(let x = 0; x <= 60; x += 10){
      const pseudoRandom = Math.abs(Math.sin(seed * 100 + x)) * 2 - 1;
      y = Math.max(4, Math.min(24, y + pseudoRandom * 4));
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const metrics = [
    { id: 'mc1', val: '14', label: 'ACTIVE AGENTS', change: '+3 this week', up: true },
    { id: 'mc2', val: '2.4M', label: 'TOKENS USED', change: '↑ 18%', up: true },
    { id: 'mc3', val: 'R1,240', label: 'SPEND MTD', change: 'of R5,000 limit', up: false },
    { id: 'mc4', val: '99.9%', label: 'UPTIME (30D)', change: 'All systems up', up: true },
  ];

  return (
    <div className={cn("w-full relative", styles.varsWrapper)}>
          
      {/* LOADING OVERLAY */}
      {!overlayHidden && (
        <div className={cn(styles.loadingOverlay, overlayDone && styles.done)} id="loadingOverlay">
          <div className={styles.loadingLogo}>Son<span>Of</span>Graig</div>
          <div className={styles.loadingBarWrap}><div className={styles.loadingBar}></div></div>
          <div className={styles.loadingMsg} id="loadMsg">{loadingMsg}</div>
        </div>
      )}

      {/* APP FRAME */}
      <div className={styles.appFrame} id="appFrame">
        
        {/* CHROME BAR */}
        <div className={styles.chrome} id="chromeBar">
              <div className={styles.chromeDots}>
                <div className={cn(styles.chDot, styles.r)}></div>
                <div className={cn(styles.chDot, styles.y)}></div>
                <div className={cn(styles.chDot, styles.g)}></div>
              </div>
              <div className={styles.chromeUrl}>app.sonofgraig.com/agents — Agent Builder</div>
              <div className={styles.chromeActions}>
                <button suppressHydrationWarning className={styles.chromeBtn} onClick={startTour} title="Take a tour">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                </button>
                <button suppressHydrationWarning className={styles.chromeBtn} onClick={toggleTheme} title="Theme">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></svg>
                </button>
              </div>
            </div>

            {/* APP BODY */}
            <div className={styles.appBody}>
              
              {/* SIDEBAR */}
              <nav className={styles.sidebar} id="sidebar">
                <div className={styles.sbBrand}>
                  <svg className={styles.sbLogoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" width="200" height="180">
                    <title>AI Dev Platform — sonofgraig</title>
                    {/* Top face: primary blue */}
                    <polygon points="100,20 148,48 100,76 52,48"    fill="#0B9EDE"/>
                    {/* Left face: deep blue */}
                    <polygon points="52,48 100,76 100,148 52,120"   fill="#044E73"/>
                    {/* Right face: mid blue */}
                    <polygon points="100,76 148,48 148,120 100,148" fill="#0773A8"/>
                    {/* Open intelligence chamber */}
                    <polygon points="100,34 128,50 100,66 72,50"    fill="#044E73"/>
                    <polygon points="100,40 118,50 100,60 82,50"    fill="#0B9EDE" opacity="0.9"/>
                    <polygon points="82,50 100,60 100,78 82,68"     fill="#033A58"/>
                    <polygon points="100,60 118,50 118,68 100,78"   fill="#055A80"/>
                    {/* Edge lines */}
                    <polygon points="100,20 148,48 100,76 52,48" fill="none"
                      stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
                    <line x1="52"  y1="48"  x2="52"  y2="120"
                      stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
                    <line x1="148" y1="48"  x2="148" y2="120"
                      stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
                    <line x1="52"  y1="120" x2="100" y2="148"
                      stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
                    <line x1="148" y1="120" x2="100" y2="148"
                      stroke="rgba(255,255,255,0.16)" strokeWidth="1"/>
                    <line x1="100" y1="76"  x2="100" y2="148"
                      stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>
                    <polygon points="100,34 128,50 100,66 72,50" fill="none"
                      stroke="rgba(255,255,255,0.30)" strokeWidth="0.8"/>
                  </svg>
                  <div className={styles.sbLogoText}>
                    <div className={styles.sbLogo}>AI Dev Platform</div>
                    <div className={styles.sbSub}>BY SONOFGRAIG</div>
                  </div>
                </div>

                <div className={styles.sbSection}>
                  <div className={styles.sbSectionLabel}>Build</div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbAgents' && styles.active)} onClick={() => setActiveSidebar('sbAgents')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 17h7M17.5 14v7"/></svg>
                    <span className={styles.sbItemName}>Agents</span>
                    <span className={styles.sbBadge}>14</span>
                  </div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbRag' && styles.active)} onClick={() => setActiveSidebar('sbRag')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                    <span className={styles.sbItemName}>RAG Studio</span>
                  </div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbFine' && styles.active)} onClick={() => setActiveSidebar('sbFine')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    <span className={styles.sbItemName}>Fine-Tuning</span>
                  </div>
                </div>

                <div className={styles.sbSection}>
                  <div className={styles.sbSectionLabel}>Govern</div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbGov' && styles.active)} onClick={() => setActiveSidebar('sbGov')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span className={styles.sbItemName}>Governance Hub</span>
                  </div>
                </div>

                <div className={styles.sbSection}>
                  <div className={styles.sbSectionLabel}>Platform</div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbObs' && styles.active)} onClick={() => setActiveSidebar('sbObs')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    <span className={styles.sbItemName}>Observability</span>
                  </div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbModels' && styles.active)} onClick={() => setActiveSidebar('sbModels')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 17 22 12"/></svg>
                    <span className={styles.sbItemName}>Models</span>
                  </div>
                  <div className={cn(styles.sbItem, activeSidebar === 'sbPrompts' && styles.active)} onClick={() => setActiveSidebar('sbPrompts')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    <span className={styles.sbItemName}>Prompt Library</span>
                  </div>
                </div>

                <div className={styles.sbBottom}>
                  <div className={styles.sbUser}>
                    <div className={styles.sbAvatar}>TM</div>
                    <div className={styles.sbUserInfo}>
                      <div className={styles.name}>Thabo Mokoena</div>
                      <div className={styles.plan}>Growth plan</div>
                    </div>
                  </div>
                </div>
              </nav>

              {/* MAIN */}
               <div className={styles.main} id="mainArea" ref={mainAreaRef}>
                
                {/* Quick status bar */}
                <div className={styles.quickBar}>
                  <div className={styles.qbItem}><div className={styles.qbDot}></div><span className={styles.qbVal}>14</span>&nbsp;agents active</div>
                  <div className={styles.qbSep}></div>
                  <div className={styles.qbItem}><span className={styles.qbVal}>99.9%</span>&nbsp;uptime (30d)</div>
                  <div className={styles.qbSep}></div>
                  <div className={styles.qbItem}><span className={styles.qbVal}>2.4M</span>&nbsp;tokens this month</div>
                  <div className={styles.qbSep}></div>
                  <div className={styles.qbItem} style={{marginLeft: 'auto', color: 'var(--t4)', fontSize: '10px'}}>Last refreshed 2 min ago</div>
                </div>

                {/* Page header */}
                 <div className={styles.mainHeader} id="mainHeader">
                  <div>
                    <div className={styles.pageTitle}>Agent dashboard</div>
                    <div className={styles.pageTitleSub}>AI Dev Platform · Agents module</div>
                  </div>
                  <div className={styles.headerActions}>
                    <button suppressHydrationWarning className={cn(styles.btn, styles.btnSm, styles.btnGhost)} id="tourTrigger" onClick={startTour}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
                      Take tour
                    </button>
                    <button suppressHydrationWarning className={cn(styles.btn, styles.btnSm, styles.btnSecondary)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                      Refresh
                    </button>
                    <button suppressHydrationWarning className={cn(styles.btn, styles.btnSm, styles.btnPrimary)} id="newAgentBtn" onClick={() => showToast('Agent canvas opened', 'Opening the visual agent designer…', 'ok')}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      New agent
                    </button>
                  </div>
                </div>

                {/* METRIC CARDS */}
                <div className={styles.metricsRow} id="metricsRow">
                  {metrics.map((m, i) => (
                    <div key={m.id} className={styles.metricCard} id={m.id}>
                      {!loaded ? (
                        <>
                          <div className={cn(styles.sk, styles.skMetricVal)}></div>
                          <div className={cn(styles.sk, styles.skMetricLabel)} style={{marginTop: '6px'}}></div>
                          <div className={cn(styles.sk, styles.skMetricChange)}></div>
                        </>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                          <div className={styles.metricVal}>{m.val}</div>
                          <div className={styles.metricLabel}>{m.label}</div>
                          <div className={cn(styles.metricChange, m.up ? styles.up : styles.neutral)}>{m.change}</div>
                          <svg className={styles.metricSparkline} width="60" height="28" viewBox="0 0 60 28" fill="none">
                            <polyline points={genSparkline(i)} stroke="var(--blue)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* AGENTS SECTION */}
                <div className={styles.sectionHdr}>
                  <span className={styles.sectionTitle}>Your agents</span>
                  <span className={styles.sectionCount} id="agentCount">{loaded ? filteredAgents.length : '—'}</span>
                  <div className={styles.sectionActions}>
                    <div className={styles.searchBox}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--t4)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      <input suppressHydrationWarning type="text" placeholder="Search agents…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className={styles.filterPills}>
                      <button suppressHydrationWarning className={cn(styles.pill, activeFilter === 'all' && styles.active)} onClick={() => setActiveFilter('all')}>All</button>
                      <button suppressHydrationWarning className={cn(styles.pill, activeFilter === 'live' && styles.active)} onClick={() => setActiveFilter('live')}>Live</button>
                      <button suppressHydrationWarning className={cn(styles.pill, activeFilter === 'draft' && styles.active)} onClick={() => setActiveFilter('draft')}>Draft</button>
                    </div>
                  </div>
                </div>

                {/* TABLE */}
                <div className={styles.agentsTable} id="agentsTableWrap">
                  <div className={styles.tableWrap}>
                    <div className={styles.tHead}>
                      <div className={styles.tHeadCell} onClick={() => handleSort('name')}>Agent<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                      <div className={cn(styles.tHeadCell, styles.modelCol)}>Model</div>
                      <div className={cn(styles.tHeadCell, styles.center)}>Status</div>
                      <div className={cn(styles.tHeadCell, styles.right, styles.timeCol)} onClick={() => handleSort('last')}>Last run</div>
                      <div className={cn(styles.tHeadCell, styles.right)} onClick={() => handleSort('runs')}>Runs<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></div>
                      <div className={styles.tHeadCell}></div>
                    </div>
                    
                    {!loaded ? (
                      <div id="skeletonRows">
                        {[1,2,3].map(i => (
                          <div key={i} className={styles.skRow}>
                            <div className={styles.sk} style={{width: '24px', height: '24px', borderRadius: 'var(--r-md)'}}></div>
                            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '5px'}}>
                              <div className={styles.sk} style={{width: `${50 + (i * 7) % 20}%`, height: '12px'}}></div>
                              <div className={styles.sk} style={{width: `${25 + (i * 5) % 15}%`, height: '9px'}}></div>
                            </div>
                            <div className={styles.sk} style={{width: '50px', height: '20px', marginLeft: 'auto', borderRadius: '9999px'}}></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div id="agentRows">
                          {filteredAgents.map((a, i) => (
                            <React.Fragment key={a.id}>
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: i * 0.06 }}
                                className={cn(styles.tRow, expandedRow === a.id && styles.expanded)}
                                onClick={() => setExpandedRow(expandedRow === a.id ? null : a.id)}
                              >
                                <div className={cn(styles.tCell, styles.agentNameCell)}>
                                  <div className={styles.agentIcon} style={{background: a.color}}>{a.icon}</div>
                                  <div><div className={styles.agentName}>{a.name}</div><div className={styles.agentType}>{a.type}</div></div>
                                </div>
                                <div className={cn(styles.tCell, styles.modelCol)} style={{fontSize: '11px', color: 'var(--t4)', fontFamily: 'var(--font-mono)'}}>{a.model}</div>
                                <div className={cn(styles.tCell, styles.center)}>
                                  <span className={cn(styles.statusBadge, a.status === 'live' ? styles.statusLive : styles.statusDraft)}>
                                    <span className={styles.statusDot}></span>{a.status === 'live' ? 'Live' : 'Draft'}
                                  </span>
                                </div>
                                <div className={cn(styles.tCell, styles.right, styles.timeCol, styles.mono)}>{a.lastRun}</div>
                                <div className={cn(styles.tCell, styles.right, styles.mono)}>{a.runs.toLocaleString()}</div>
                                <div className={styles.tCell} style={{justifyContent: 'center'}}>
                                  <button suppressHydrationWarning className={cn(styles.btn, styles.btnIcon, styles.btnGhost)} onClick={(e) => { e.stopPropagation(); showToast(a.name, 'Context menu: Edit, Clone, Deploy, Delete…', 'info'); }} style={{width: '28px', height: '28px'}}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                  </button>
                                </div>
                              </motion.div>
                              <div className={cn(styles.rowDetails, expandedRow === a.id && styles.open)}>
                                <div className={styles.rowDetailsInner}>
                                  <div className={styles.detailStat}><div className={styles.detailStatVal}>{a.p50 > 0 ? a.p50+'ms' : '—'}</div><div className={styles.detailStatLabel}>Avg latency</div></div>
                                  <div className={styles.detailStat}><div className={styles.detailStatVal}>{a.tokens}</div><div className={styles.detailStatLabel}>Tokens used</div></div>
                                  <div className={styles.detailStat}><div className={styles.detailStatVal}>{a.model}</div><div className={styles.detailStatLabel}>Foundation model</div></div>
                                  <div className={styles.detailActions}>
                                    <button suppressHydrationWarning className={cn(styles.btn, styles.btnXs, styles.btnSecondary)} onClick={(e) => { e.stopPropagation(); showToast('Opening trace viewer', `Loading execution history for ${a.name}…`, 'info'); }}>View traces</button>
                                    <button suppressHydrationWarning className={cn(styles.btn, styles.btnXs, styles.btnPrimary)} onClick={(e) => { e.stopPropagation(); showToast('Opening canvas', `Loading ${a.name} in Agent Builder…`, 'ok'); }}>Edit agent</button>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        {filteredAgents.length === 0 && (
                          <div className={cn(styles.emptyState, styles.show)}>
                            <div className={styles.emptyIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--t4)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
                            <div className={styles.emptyTitle}>No agents found</div>
                            <div className={styles.emptyDesc}>Try a different search term or filter.</div>
                            <button suppressHydrationWarning className={cn(styles.btn, styles.btnSm, styles.btnGhost)} onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>Clear filters</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div style={{height: '32px'}}></div>

              </div>
            </div>
          </div>
          
      {/* TOUR ELEMENTS */}
      <div className={cn(styles.tourBackdrop, tourActive && styles.active)}></div>
      <div className={cn(styles.tourSpotlight, tourActive && styles.visible)}></div>
      <div className={cn(styles.tourCard, tourActive && styles.visible)}>
        <div className={styles.tourStepIndicator}>
          {/* Tour dots would go here, simplified for React conversion */}
        </div>
        <div className={styles.tourTitle}>Welcome to Agent Builder</div>
        <div className={styles.tourBody}>This dashboard gives you a real-time view of all your AI agents — their status, runs, token consumption, and execution details.</div>
        <div className={styles.tourActions}>
          <span className={styles.tourSkip} onClick={endTour}>Skip tour</span>
          <div className={styles.tourNav}>
            <button suppressHydrationWarning className={cn(styles.btn, styles.btnXs, styles.btnPrimary)} onClick={endTour}>Done</button>
          </div>
        </div>
      </div>

      {/* TOAST STACK */}
      <div className={styles.toastStack}>
        {toasts.map(t => (
          <div key={t.id} className={cn(styles.toast, styles.show)}>
            <div className={cn(styles.toastIcon, styles[t.type])}>
              {t.type === 'ok' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              )}
            </div>
            <div className={styles.toastBody}>
              <div className={styles.toastTitle}>{t.title}</div>
              <div className={styles.toastMsg}>{t.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
