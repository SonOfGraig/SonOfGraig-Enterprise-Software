'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X as XIcon, ShieldCheck, Database, Activity, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(2); // Default to POPIA tab as requested

  const [prefs, setPrefs] = useState({
    functional: true,
    analytics: false,
    marketing: false,
    personalise: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('popia_consent_v3');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (newPrefs: typeof prefs) => {
    localStorage.setItem('popia_consent_v3', JSON.stringify({ ...newPrefs, timestamp: new Date().toISOString() }));
    // GoogleAnalytics listens for this and only loads once analytics is accepted.
    window.dispatchEvent(new Event('sg-consent'));
    setIsVisible(false);
  };

  const handleAcceptAll = () => saveConsent({ functional: true, analytics: true, marketing: true, personalise: true });
  const handleRejectAll = () => saveConsent({ functional: false, analytics: false, marketing: false, personalise: false });
  const handleSave = () => saveConsent(prefs);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="b2ttl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="bg-[var(--sg-surface)] w-full sm:max-w-[800px] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[var(--sg-border-md)] flex flex-col h-[90dvh] sm:h-auto sm:max-h-[95vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[var(--sg-border)] relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[var(--sg-surface-2)] border border-[var(--sg-border)] flex items-center justify-center shrink-0 text-[var(--sg-text-1)] hidden sm:flex">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 pr-8">
                <div id="b2ttl" className="text-xl sm:text-xl font-display font-bold text-[var(--sg-text-1)] leading-tight">Privacy &amp; Cookie Preferences</div>
                <div className="text-xs text-[var(--sg-text-3)] font-mono mt-1.5 leading-relaxed">sonofgraig · POPIA consent · your choice is stored on this device</div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] bg-[var(--sg-surface-2)] sm:bg-transparent rounded-full transition-colors p-1.5"
                aria-label="Close"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Status Summary */}
            <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[var(--sg-surface-2)] shadow-inner border-b border-[var(--sg-border)] shrink-0 touch-pan-x">
              <div className="flex-1 min-w-[85px] sm:min-w-[100px] py-2.5 sm:py-3 px-2 sm:px-4 flex flex-col items-center justify-center border-r border-[var(--sg-border)] last:border-0 border-dashed">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: 'var(--sg-success)' }}><Check size={12} strokeWidth={3}/> ON</div>
                <div className="text-[11px] sm:text-xs text-[var(--sg-text-2)] font-medium text-center leading-tight">Necessary</div>
              </div>
              <div className="flex-1 min-w-[85px] sm:min-w-[100px] py-2.5 sm:py-3 px-2 sm:px-4 flex flex-col items-center justify-center border-r border-[var(--sg-border)] last:border-0 border-dashed">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: prefs.functional ? 'var(--sg-success)' : 'var(--sg-danger)' }}>
                  {prefs.functional ? <><Check size={12} strokeWidth={3}/> ON</> : <><XIcon size={12} strokeWidth={3}/> OFF</>}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--sg-text-2)] font-medium text-center leading-tight">Functional</div>
              </div>
              <div className="flex-1 min-w-[85px] sm:min-w-[100px] py-2.5 sm:py-3 px-2 sm:px-4 flex flex-col items-center justify-center border-r border-[var(--sg-border)] last:border-0 border-dashed">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: prefs.analytics ? 'var(--sg-success)' : 'var(--sg-danger)' }}>
                  {prefs.analytics ? <><Check size={12} strokeWidth={3}/> ON</> : <><XIcon size={12} strokeWidth={3}/> OFF</>}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--sg-text-2)] font-medium text-center leading-tight">Analytics</div>
              </div>
              <div className="flex-1 min-w-[85px] sm:min-w-[100px] py-2.5 sm:py-3 px-2 sm:px-4 flex flex-col items-center justify-center border-r border-[var(--sg-border)] last:border-0 border-dashed">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: prefs.marketing ? 'var(--sg-success)' : 'var(--sg-danger)' }}>
                  {prefs.marketing ? <><Check size={12} strokeWidth={3}/> ON</> : <><XIcon size={12} strokeWidth={3}/> OFF</>}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--sg-text-2)] font-medium text-center leading-tight">Marketing</div>
              </div>
              <div className="flex-1 min-w-[85px] sm:min-w-[100px] py-2.5 sm:py-3 px-2 sm:px-4 flex flex-col items-center justify-center border-r border-[var(--sg-border)] last:border-0 border-dashed">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-wider mb-1 flex items-center gap-1" style={{ color: prefs.personalise ? 'var(--sg-success)' : 'var(--sg-danger)' }}>
                  {prefs.personalise ? <><Check size={12} strokeWidth={3}/> ON</> : <><XIcon size={12} strokeWidth={3}/> OFF</>}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--sg-text-2)] font-medium text-center leading-tight">Personalise</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-[var(--sg-border)] bg-[var(--sg-surface)] px-2 sm:px-6 shrink-0 touch-pan-x" role="tablist">
              {['Overview', 'Preferences', 'POPIA & Legal'].map((tab, idx) => (
                <button 
                  key={idx}
                  role="tab"
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap",
                    activeTab === idx 
                      ? "border-[var(--sg-blue)] text-[var(--sg-blue)]"
                      : "border-transparent text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-5 sm:p-6 min-h-[300px]" style={{ scrollbarWidth: 'thin' }}>
              
              {/* Overview Tab */}
              {activeTab === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--sg-text-1)] mb-2">
                        <Database size={16} color="var(--sg-blue)" /> What we collect
                      </div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed">
                        Session data, usage patterns, platform feature interactions, and (with consent) AI personalisation context across our 5 platform clusters.
                      </div>
                    </div>
                    <div className="bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--sg-text-1)] mb-2">
                        <ShieldCheck size={16} color="var(--sg-success)" /> Where it is stored
                      </div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed">
                        We do not use personalisation cookies on this website today. If that changes, we will ask for separate consent first.
                      </div>
                    </div>
                    <div className="bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--sg-text-1)] mb-2">
                        <Activity size={16} color="var(--sg-warn)" /> How we use it
                      </div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed">
                        To operate the platform, improve features, measure marketing effectiveness, and personalise your AI experience. Never sold to third parties.
                      </div>
                    </div>
                    <div className="bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--sg-text-1)] mb-2">
                        <Sliders size={16} color="var(--sg-danger)" /> Your control
                      </div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed">
                        Five independently controllable categories. Change preferences at any time. Withdrawal does not affect services or prior lawful processing under POPIA.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start sm:items-center gap-3 p-4 bg-[var(--sg-surface-2)] border border-[var(--sg-border-md)] rounded-xl text-xs sm:text-sm text-[var(--sg-text-3)]">
                    <ShieldCheck size={20} className="shrink-0" />
                    <span>Under <strong className="text-[var(--sg-text-1)] font-medium">POPIA Section 11</strong>, consent must be specific, informed, and voluntary. Withdraw anytime by visiting Privacy Settings or emailing <a href="mailto:tumiso@sonofgraig.com" className="text-[var(--sg-blue)] hover:underline">tumiso@sonofgraig.com</a>.</span>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0">
                  
                  {/* Category: Necessary */}
                  <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-[var(--sg-border)] last:border-0 border-dashed">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)' }}>
                      <ShieldCheck size={20} color="var(--sg-success)" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-[var(--sg-text-1)] mb-1">Strictly Necessary</div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed mb-2">Authentication, CSRF, session management, theme preference, and POPIA consent record. Platform cannot function without these.</div>
                      <div className="text-[10px] sm:text-xs font-mono text-[var(--sg-text-4)] bg-[var(--sg-surface-2)] px-2 py-1 rounded inline-block">session_token · csrf_token · sg_theme · popia_consent_v3 · __Host-next-auth.csrf-token</div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 shrink-0">
                      <span className="text-xs font-medium text-[var(--sg-success)] uppercase tracking-wider font-mono">Always on</span>
                      <ToggleSwitch checked disabled />
                    </div>
                  </div>

                  {/* Category: Functional */}
                  <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-[var(--sg-border)] last:border-0 border-dashed">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(14,165,233,.1)', border: '1px solid rgba(14,165,233,.2)' }}>
                      <Sliders size={20} color="var(--sg-blue)" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-[var(--sg-text-1)] mb-1">Functional</div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed mb-2">Sidebar state, language, UI density, demo progress, and onboarding step. Non-critical but significantly enhances your experience.</div>
                      <div className="text-[10px] sm:text-xs font-mono text-[var(--sg-text-4)] bg-[var(--sg-surface-2)] px-2 py-1 rounded inline-block whitespace-normal break-all">sg_sidebar_state · sg_locale · sg_ui_density · sg_demo_step · sg_onboarding</div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 shrink-0">
                      <ToggleSwitch checked={prefs.functional} onChange={(v) => setPrefs(p => ({...p, functional: v}))} />
                    </div>
                  </div>

                  {/* Category: Analytics */}
                  <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-[var(--sg-border)] last:border-0 border-dashed">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(234,179,8,.1)', border: '1px solid rgba(234,179,8,.2)' }}>
                      <Activity size={20} color="var(--sg-warn)" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-[var(--sg-text-1)] mb-1">Analytics</div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed mb-2">Google Analytics 4 (IP anonymised) and Microsoft Clarity (heatmaps and session replays, with typed text masked). Shows us which pages help visitors and where they get stuck. Loaded only if you switch this on.</div>
                      <div className="text-[10px] sm:text-xs font-mono text-[var(--sg-text-4)] bg-[var(--sg-surface-2)] px-2 py-1 rounded inline-block whitespace-normal break-all">_ga · _ga_* · _clck · _clsk · CLID</div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 shrink-0">
                      <ToggleSwitch checked={prefs.analytics} onChange={(v) => setPrefs(p => ({...p, analytics: v}))} />
                    </div>
                  </div>

                  {/* Category: Marketing */}
                  <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-[var(--sg-border)] last:border-0 border-dashed">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.2)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--sg-amber)" strokeWidth="1.5" className="w-5 h-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-[var(--sg-text-1)] mb-1">Marketing</div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed mb-2">We do not use advertising or retargeting cookies on this website today. If that changes, we will ask for this consent first.</div>
                      <div className="text-[10px] sm:text-xs font-mono text-[var(--sg-text-4)] bg-[var(--sg-surface-2)] px-2 py-1 rounded inline-block whitespace-normal break-all">none in use</div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 shrink-0">
                      <ToggleSwitch checked={prefs.marketing} onChange={(v) => setPrefs(p => ({...p, marketing: v}))} />
                    </div>
                  </div>

                  {/* Category: AI */}
                  <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-[var(--sg-border)] last:border-0 border-dashed">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)' }}>
                      <Database size={20} color="var(--sg-danger)" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-[var(--sg-text-1)] mb-1">AI Personalisation</div>
                      <div className="text-sm text-[var(--sg-text-3)] leading-relaxed mb-2">Remembers preferences such as recently viewed pages. Not used on this website today; never used to train models.</div>
                      <div className="text-[10px] sm:text-xs font-mono text-[var(--sg-text-4)] bg-[var(--sg-surface-2)] px-2 py-1 rounded inline-block whitespace-normal break-all">sg_ai_ctx · sg_rag_session · sg_agent_prefs · sg_cluster_hist · sg_gov_audit_ref</div>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0 shrink-0">
                      <ToggleSwitch checked={prefs.personalise} onChange={(v) => setPrefs(p => ({...p, personalise: v}))} />
                    </div>
                  </div>

                </motion.div>
              )}

              {/* POPIA Tab */}
              {activeTab === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-[15px] font-semibold text-[var(--sg-text-1)] font-display mb-2">POPIA Section 11 — Consent basis</h3>
                    <p className="text-xs sm:text-sm text-[var(--sg-text-3)] leading-relaxed">
                      The Protection of Personal Information Act 4 of 2013 requires sonofgraig to obtain specific, informed, and voluntary consent before processing non-essential personal information. This banner fulfils that obligation. A timestamped consent record is maintained per POPIA Section 11(3).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-[15px] font-semibold text-[var(--sg-text-1)] font-display mb-3">Your data subject rights</h3>
                    <div className="space-y-2">
                      {[
                        ['Right to access', 'request all personal information we hold about you'],
                        ['Right to correction', 'request correction of inaccurate personal information'],
                        ['Right to deletion', 'request deletion subject to legal retention obligations'],
                        ['Right to withdraw', 'withdraw consent at any time without consequence to services'],
                        ['Right to breach notification', 'as soon as reasonably possible, per POPIA Section 22'],
                      ].map(([title, desc], i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={16} className="mt-[2px] shrink-0 text-[var(--sg-text-4)]" />
                          <span className="text-xs sm:text-sm text-[var(--sg-text-3)]"><strong className="text-[var(--sg-text-1)] font-medium">{title}</strong> — {desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-[15px] font-semibold text-[var(--sg-text-1)] font-display mb-2">Contact our Information Officer</h3>
                    <div className="text-xs sm:text-sm text-[var(--sg-text-3)] leading-relaxed bg-[var(--sg-surface-2)] p-4 rounded-xl border border-[var(--sg-border)]">
                      <strong className="text-[var(--sg-text-1)] font-medium">Organisation:</strong> sonofgraig<br />
                      <strong className="text-[var(--sg-text-1)] font-medium">Email:</strong> <a href="mailto:tumiso@sonofgraig.com" className="text-[var(--sg-blue)] hover:underline">tumiso@sonofgraig.com</a><br />
                      <strong className="text-[var(--sg-text-1)] font-medium">Response time:</strong> 10 business days<br />
                      <strong className="text-[var(--sg-text-1)] font-medium">Data residency:</strong> agreed per customer in the Data Processing Agreement
                    </div>
                  </div>
                  <div className="flex items-start sm:items-center gap-3 p-4 bg-[var(--sg-surface-2)] border border-[var(--sg-border-md)] rounded-xl text-xs sm:text-sm text-[var(--sg-text-3)]">
                    <ShieldCheck size={20} className="shrink-0" />
                    <span>Consent records are logged with timestamp and version. Records retained for account duration plus 3 years per our data retention policy. <Link href="/popia" className="text-[var(--sg-blue)] hover:underline">Full POPIA statement</Link> · <Link href="/dpa" className="text-[var(--sg-blue)] hover:underline">Data Processing Agreement</Link></span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 border-t border-[var(--sg-border)] bg-[var(--sg-surface-2)] shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 text-xs font-medium text-[var(--sg-text-3)] sm:order-1 order-2 mt-2 sm:mt-0">
                <Link href="/privacy-policy" className="hover:text-[var(--sg-text-1)] underline decoration-[var(--sg-border-md)] underline-offset-4">Privacy</Link>
                <Link href="/popia" className="hover:text-[var(--sg-text-1)] underline decoration-[var(--sg-border-md)] underline-offset-4">POPIA</Link>
                <Link href="/dpa" className="hover:text-[var(--sg-text-1)] underline decoration-[var(--sg-border-md)] underline-offset-4">DPA</Link>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto sm:order-2 order-1">
                <button 
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium border border-[var(--sg-border)] text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] hover:bg-[var(--sg-surface-3)] transition-colors w-full sm:w-auto"
                >
                  Reject non-essential
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium border border-[var(--sg-border)] text-[var(--sg-text-1)] bg-[var(--sg-surface)] hover:bg-[var(--sg-surface-3)] shadow-[var(--shadow-sm)] transition-colors w-full sm:w-auto"
                >
                  Save preferences
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium border border-[var(--sg-blue)] text-[var(--sg-blue)] sm:text-white sm:bg-[var(--sg-blue)] sm:hover:bg-[var(--sg-blue-dim)] bg-[var(--sg-blue-glow)] hover:bg-[var(--sg-blue-border)] transition-colors w-full sm:w-auto"
                >
                  Accept all
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleSwitch({ checked, onChange, disabled }: { checked?: boolean, onChange?: (c: boolean) => void, disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        checked ? "bg-[var(--sg-blue)]" : "bg-[var(--sg-surface-3)]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
