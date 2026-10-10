import type { ReactNode } from 'react';

// Shared layout for legal documents (Terms, DPA): eyebrow, title, intro,
// version chips, a sticky "On this page" list and sg-prose body — the same
// anatomy as the privacy policy and PAIA manual.

export type LegalSection = { id: string; label: string };

export function LegalDoc({
  kind,
  title,
  intro,
  chips,
  draft,
  sections,
  children,
}: {
  kind: string;
  title: string;
  intro: ReactNode;
  chips: string[];
  /** Shows an amber "Draft for review" chip until the founder approves the document. */
  draft?: boolean;
  sections: LegalSection[];
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--sg-bg)' }}>
      <section className="border-b border-[var(--sg-border)]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-16)] pb-[var(--sp-12)]">
          <div className="flex items-center gap-2 mb-[var(--sp-6)]">
            <span className="text-label text-[var(--sg-blue)]">Legal</span>
            <span className="text-[var(--sg-text-4)]" aria-hidden>·</span>
            <span className="text-label text-[var(--sg-text-3)]">{kind}</span>
          </div>
          <h1 className="text-h1 text-[var(--sg-text-1)] mb-[var(--sp-5)]">{title}</h1>
          <div className="text-body-lg text-[var(--sg-text-2)] max-w-[680px] mb-[var(--sp-8)]">{intro}</div>
          <div className="flex flex-wrap items-center gap-[var(--sp-3)]">
            {draft && (
              <span className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] text-[var(--sg-amber)] border border-[var(--sg-amber)] text-code">Draft for review</span>
            )}
            {chips.map((c) => (
              <span key={c} className="px-[var(--sp-3)] py-[var(--sp-1)] rounded-[var(--r-full)] bg-[var(--sg-surface-2)] text-[var(--sg-text-3)] border border-[var(--sg-border)] text-code">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-4 sm:px-8 pt-[var(--sp-12)] pb-[var(--sp-20)]">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-[var(--sp-12)]">
          <aside aria-label="On this page" className="lg:sticky lg:top-[88px] lg:self-start">
            <div className="text-label text-[var(--sg-text-4)] mb-[var(--sp-4)]">On this page</div>
            <nav>
              <ul className="flex flex-col gap-[var(--sp-2)]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block text-[13px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] py-[var(--sp-1)] transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="sg-prose max-w-[760px]">{children}</article>
        </div>
      </section>
    </main>
  );
}
