'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Boxes, Database, GitBranch, Layers, LineChart, Network, Scale, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Ported from the 2026 agency site's TechRadar.tsx: a radar with a rotating
// sweep and clickable blips; the active blip's detail card animates in.
// Items are the AI Dev Platform's actual stack (no "Gemini 3 / WebGL" filler).

const STACK = [
  { id: 'langgraph', name: 'LangGraph', cat: 'Agent orchestration', body: 'Stateful agent graphs with checkpoints, so a run can pause for a human and resume exactly where it stopped.', icon: Network, x: 50, y: 16 },
  { id: 'qdrant', name: 'Qdrant', cat: 'Vector search', body: 'Self-hosted vector database for hybrid retrieval. It runs in your region, next to your data.', icon: Database, x: 80, y: 32 },
  { id: 'postgres', name: 'Postgres + pgvector', cat: 'System of record', body: 'Relational data, audit tables and embeddings in one database your team already knows how to run.', icon: Layers, x: 84, y: 66 },
  { id: 'langfuse', name: 'Langfuse', cat: 'Tracing', body: 'Every prompt, tool call and model response recorded — the backbone of the execution trace.', icon: GitBranch, x: 58, y: 84 },
  { id: 'ragas', name: 'Ragas', cat: 'Evaluation', body: 'Faithfulness and relevance scoring on golden question sets, run before every release.', icon: LineChart, x: 28, y: 80 },
  { id: 'fairlearn', name: 'Fairlearn + SHAP', cat: 'Governance', body: 'Bias metrics across protected groups and per-decision explanations for audits.', icon: Scale, x: 14, y: 52 },
  { id: 'k8s', name: 'Kubernetes', cat: 'Runtime', body: 'Containerised services with autoscaling and rolling, canary-safe deploys.', icon: Boxes, x: 22, y: 24 },
  { id: 'opa', name: 'Policy engine', cat: 'Access control', body: 'Who may read which collection, run which tool, approve which action — enforced, not documented.', icon: ShieldCheck, x: 50, y: 50 },
];

export function TechRadar() {
  const [active, setActive] = useState(STACK[0]);
  const idx = STACK.indexOf(active);

  return (
    <div className="flex flex-col items-center gap-[var(--sp-12)] lg:flex-row lg:gap-[var(--sp-16)]">
      <div className="relative aspect-square w-full max-w-[460px] shrink-0 rounded-full border border-[var(--sg-border)] bg-[var(--sg-surface)] shadow-[inset_0_2px_12px_rgba(13,17,23,.06)]">
        {[15, 30, 45].map((m) => (
          <div key={m} className="absolute rounded-full border border-[var(--sg-border)]" style={{ inset: `${m}%` }} />
        ))}
        <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--sg-border)]" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--sg-border)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden">
          <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,var(--sg-blue-glow),transparent_25%)]" />
        </div>
        {STACK.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t)}
            onMouseEnter={() => setActive(t)}
            aria-pressed={active.id === t.id}
            aria-label={t.name}
            className={cn(
              'absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sg-blue)]',
              active.id === t.id ? 'btn-raised-primary scale-110' : 'border border-[var(--sg-border-md)] bg-[var(--sg-bg)] text-[var(--sg-text-3)] hover:scale-110 hover:text-[var(--sg-blue)]',
            )}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <t.icon size={18} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="relative min-h-[260px] w-full max-w-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border)] bg-[var(--sg-surface)] p-[var(--sp-8)] shadow-[var(--shadow-lift-md)]"
          >
            <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-[110px] font-bold text-[var(--sg-text-1)] opacity-[0.04]">
              0{idx + 1}
            </span>
            <div className="relative flex items-center gap-[var(--sp-4)]">
              <span className="grid size-14 place-items-center rounded-[var(--r-lg)] border border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]">
                <active.icon size={26} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-h3 text-[var(--sg-text-1)]">{active.name}</h3>
                <p className="text-label text-[var(--sg-blue)] mt-1">{active.cat}</p>
              </div>
            </div>
            <p className="relative text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">{active.body}</p>
            <div className="relative mt-[var(--sp-8)] h-1 overflow-hidden rounded-full bg-[var(--sg-surface-3)]">
              <motion.div className="h-full bg-[var(--sg-blue)]" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.9, delay: 0.15 }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
