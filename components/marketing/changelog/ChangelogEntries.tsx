import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ChangelogType = 'feature' | 'fix' | 'infra' | 'design' | 'milestone';

export interface ChangelogEntry {
  date: string;
  version?: string;
  title: string;
  type: ChangelogType;
  items: string[];
}

const typeColors: Record<ChangelogType, string> = {
  feature: 'var(--sg-blue)',
  fix: 'var(--sg-success)',
  infra: 'var(--sg-text-4)',
  design: '#7C3AED',
  milestone: 'var(--sg-amber)'
};

const typeBgColors: Record<ChangelogType, string> = {
  feature: 'var(--sg-blue-glow)',
  fix: 'var(--sg-success-bg)',
  infra: 'var(--sg-surface-3)',
  design: 'rgba(124, 58, 237, 0.1)',
  milestone: 'rgba(249, 115, 22, 0.1)'
};

export function ChangelogEntries({ entries }: { entries: ChangelogEntry[] }) {
  // Group by month (assuming date format like "Oct 12, 2025" or similar)
  const groupedEntries = entries.reduce((acc, entry) => {
    const dateObj = new Date(entry.date);
    const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(entry);
    return acc;
  }, {} as Record<string, ChangelogEntry[]>);

  return (
    <section className="w-full pb-[var(--sp-20)]">
      <div className="max-w-[800px] mx-auto px-8">
        {Object.entries(groupedEntries).map(([monthYear, monthEntries]) => (
          <div key={monthYear} className="mb-[var(--sp-12)]">
            <div className="text-label text-[var(--sg-text-4)] uppercase border-b border-[var(--sg-border)] pb-[var(--sp-3)] mb-[var(--sp-6)]">
              {monthYear}
            </div>
            
            <div className="flex flex-col gap-8">
              {monthEntries.map((entry, i) => (
                <div key={i} className="flex relative">
                  
                  {/* DATE COLUMN */}
                  <div className="w-[140px] shrink-0 pt-4 pr-6 text-right flex flex-col items-end gap-2">
                    <div className="font-mono text-[12px] text-[var(--sg-text-4)]">
                      {entry.date}
                    </div>
                    {entry.version && (
                      <div className="inline-flex px-2 py-0.5 rounded bg-[var(--sg-surface-2)] border border-[var(--sg-border)] font-mono text-[11px] text-[var(--sg-text-2)]">
                        {entry.version}
                      </div>
                    )}
                  </div>

                  {/* CONNECTOR */}
                  <div className="relative flex flex-col items-center mr-6">
                    <div 
                      className="w-3 h-3 rounded-full mt-[22px] z-10 shadow-[0_0_0_4px_var(--sg-bg)]"
                      style={{ backgroundColor: typeColors[entry.type] }}
                    />
                    <div className="absolute top-[34px] bottom-[-32px] w-[2px] bg-[var(--sg-border)]" />
                  </div>

                  {/* CONTENT CARD */}
                  <div className="flex-1 bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-5)] shadow-sm">
                    <div className="mb-3">
                      <span 
                        className="inline-block px-2 py-1 rounded font-sans text-[11px] font-semibold uppercase tracking-wider"
                        style={{ 
                          backgroundColor: typeBgColors[entry.type],
                          color: typeColors[entry.type]
                        }}
                      >
                        {entry.type}
                      </span>
                    </div>
                    <h3 className="text-h3 text-[var(--sg-text-1)] mb-4">{entry.title}</h3>
                    <ul className="space-y-2">
                      {entry.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 font-sans text-[13px] text-[var(--sg-text-3)] leading-relaxed">
                          <ChevronRight size={14} className="shrink-0 mt-[3px] text-[var(--sg-text-4)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
