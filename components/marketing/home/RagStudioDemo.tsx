'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FileText, Search, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';

// An illustrative session in RAG Studio, one module of the AI Dev Platform
// (the window chrome shows the platform with its module tabs). A question is asked, the answer streams
// in with numbered citations, and the cited passage lights up in the source
// panel. The scenarios are examples, labelled "Product preview" in the frame —
// no invented usage numbers.

type Source = { id: number; file: string; where: string; quote: string };
type Scenario = { question: string; answer: (string | number)[]; sources: Source[] };

const SCENARIOS: Scenario[] = [
  {
    question: 'How many days of family responsibility leave do we give?',
    answer: [
      'Permanent employees get three days of paid family responsibility leave per annual cycle',
      1,
      ', matching section 27 of the Basic Conditions of Employment Act',
      2,
      '. A supporting document is due within 7 days of returning',
      1,
      '.',
    ],
    sources: [
      { id: 1, file: 'Leave Policy v4.pdf', where: 'p. 6, §3.2', quote: '…three (3) days paid family responsibility leave per annual leave cycle, subject to proof submitted within seven (7) days…' },
      { id: 2, file: 'BCEA Summary.pdf', where: 's. 27', quote: '…an employer must grant an employee, during each annual leave cycle, at the request of the employee, three days’ paid leave…' },
    ],
  },
  {
    question: 'Can we move customer records to our CRM vendor overseas?',
    answer: [
      'Only if a POPIA section 72 condition is met, such as a binding agreement that gives adequate protection',
      1,
      '. Your processing register lists the CRM transfer as covered by a signed data processing agreement',
      2,
      '.',
    ],
    sources: [
      { id: 1, file: 'POPIA Act 4 of 2013.pdf', where: 's. 72(1)(a)', quote: '…the third party who is the recipient of the information is subject to a law, binding corporate rules or binding agreement which provide an adequate level of protection…' },
      { id: 2, file: 'Processing Register.xlsx', where: 'row 41', quote: 'CRM — customer contact data — cross-border — DPA signed, reviewed annually by Information Officer.' },
    ],
  },
];

const DOCS = ['Leave Policy v4.pdf', 'BCEA Summary.pdf', 'POPIA Act 4 of 2013.pdf', 'Processing Register.xlsx', 'Supplier Agreement.docx'];

export function RagStudioDemo() {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(0); // characters of the question shown
  const [parts, setParts] = useState(0); // answer parts revealed
  const [active, setActive] = useState<number | null>(null);

  const s = SCENARIOS[scene];

  useEffect(() => {
    if (reduced) {
      setTyped(s.question.length);
      setParts(s.answer.length);
      return;
    }
    setTyped(0);
    setParts(0);
    setActive(null);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 500;
    for (let i = 1; i <= s.question.length; i++) {
      timers.push(setTimeout(() => setTyped(i), t));
      t += 28;
    }
    t += 700; // "retrieving"
    s.answer.forEach((part, i) => {
      timers.push(setTimeout(() => {
        setParts(i + 1);
        if (typeof part === 'number') setActive(part);
      }, t));
      t += typeof part === 'number' ? 450 : 650;
    });
    timers.push(setTimeout(() => setScene((n) => (n + 1) % SCENARIOS.length), t + 4200));
    return () => timers.forEach(clearTimeout);
  }, [scene, reduced, s]);

  const answering = typed >= s.question.length;
  const retrieving = answering && parts === 0;

  return (
    // Glass is legitimate here: the frame sits over the hero rays (08-cards glass rule).
    <Card variant="glass" padding="none" className="rounded-[var(--r-2xl)] overflow-hidden text-left">
      {/* window chrome */}
      <div className="relative z-[2] flex items-center justify-between px-4 h-11 border-b border-[var(--sg-border)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--sg-border-str)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--sg-border-str)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--sg-border-str)]" />
          <span className="ml-3 font-sans text-[12px] font-semibold text-[var(--sg-text-1)]">AI Dev Platform</span>
          <nav aria-label="Platform modules (preview)" className="hidden sm:flex items-center gap-1 ml-3">
            {['RAG Studio', 'Agent Builder', 'Governance Hub'].map((m, i) => (
              <span
                key={m}
                className={`px-2.5 py-1 rounded-[var(--r-sm)] font-sans text-[12px] ${i === 0 ? 'bg-[var(--sg-blue-glow)] text-[var(--sg-blue)] font-medium' : 'text-[var(--sg-text-4)]'}`}
              >
                {m}
              </span>
            ))}
          </nav>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-4)]">Product preview</span>
      </div>

      <div className="relative z-[2] grid md:grid-cols-[200px_1fr_280px] min-h-[380px]">
        {/* library */}
        <aside className="hidden md:block border-r border-[var(--sg-border)] p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-4)] mb-3">Sources</p>
          <ul className="space-y-1.5">
            {DOCS.map((d) => {
              const cited = s.sources.some((src) => src.file === d) && parts > 0;
              return (
                <li key={d} className={`flex items-center gap-2 rounded-[var(--r-sm)] px-2 py-1.5 font-sans text-[12px] transition-colors duration-500 ${cited ? 'bg-[var(--sg-blue-glow)] text-[var(--sg-text-1)]' : 'text-[var(--sg-text-3)]'}`}>
                  <FileText size={13} aria-hidden="true" className={cited ? 'text-[var(--sg-blue)]' : ''} />
                  <span className="truncate">{d}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* conversation */}
        <div className="p-5 md:p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 rounded-[var(--r-lg)] border border-[var(--sg-border-md)] bg-[var(--sg-bg)]/60 px-3 h-11">
            <Search size={15} aria-hidden="true" className="text-[var(--sg-text-4)] shrink-0" />
            <span className="font-sans text-[14px] text-[var(--sg-text-1)] truncate">
              {s.question.slice(0, typed)}
              {!answering && <span className="inline-block w-[1.5px] h-4 -mb-0.5 ml-0.5 bg-[var(--sg-blue)] animate-pulse" />}
            </span>
          </div>

          <div className="min-h-[150px]" aria-live="polite">
            {retrieving && (
              <p className="font-mono text-[12px] text-[var(--sg-text-3)] animate-pulse">Searching 5 sources…</p>
            )}
            <p className="font-sans text-[15px] leading-[1.75] text-[var(--sg-text-2)]">
              {s.answer.slice(0, parts).map((part, i) =>
                typeof part === 'number' ? (
                  <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setActive(part)}
                    onFocus={() => setActive(part)}
                    className={`mx-0.5 inline-flex items-center justify-center min-w-[20px] h-[18px] px-1 rounded-[var(--r-xs)] align-[2px] font-mono text-[10px] font-medium transition-colors ${active === part ? 'bg-[var(--sg-blue)] text-white' : 'bg-[var(--sg-blue-glow)] text-[var(--sg-blue)]'}`}
                    aria-label={`Source ${part}`}
                  >
                    {part}
                  </button>
                ) : (
                  <motion.span key={i} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {part}
                  </motion.span>
                ),
              )}
            </p>
          </div>

          {parts === s.answer.length && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[12px] text-[var(--sg-text-3)]"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} aria-hidden="true" className="text-[var(--sg-success)]" />
                Every claim cited
              </span>
              <span>{s.sources.length} sources used</span>
            </motion.div>
          )}
        </div>

        {/* citation panel */}
        <aside className="border-t md:border-t-0 md:border-l border-[var(--sg-border)] p-4 md:p-5 bg-[var(--sg-surface)]/40">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--sg-text-4)] mb-3">Cited passages</p>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {parts > 0 &&
                s.sources.map((src) => (
                  <motion.figure
                    key={`${scene}-${src.id}`}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onMouseEnter={() => setActive(src.id)}
                    className={`rounded-[var(--r-lg)] border p-3 transition-colors duration-300 ${active === src.id ? 'border-[var(--sg-blue-border)] bg-[var(--sg-blue-glow)]' : 'border-[var(--sg-border)] bg-[var(--sg-bg)]/50'}`}
                  >
                    <figcaption className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-sans text-[12px] font-medium text-[var(--sg-text-1)] truncate">
                        <span className="font-mono text-[var(--sg-blue)] mr-1.5">{src.id}</span>
                        {src.file}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--sg-text-4)] shrink-0">{src.where}</span>
                    </figcaption>
                    <blockquote className="font-sans text-[12px] leading-relaxed text-[var(--sg-text-3)]">{src.quote}</blockquote>
                  </motion.figure>
                ))}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </Card>
  );
}
