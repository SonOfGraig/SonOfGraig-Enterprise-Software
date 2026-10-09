'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { labItem, LAB_ITEMS, type LabItem } from './registry';

// A live preview window for one ported component. Mounts only while on
// screen (several of these run canvases), sized by container queries so the
// component lays itself out for the frame it is in.
function Live({ item, className, height }: { item: LabItem; className?: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const C = item.Component;
  return (
    <div ref={ref} className={cn('@container relative overflow-hidden', className)} style={height ? { height } : undefined}>
      {on ? <C /> : <div className="size-full bg-[var(--sg-surface-2)]" />}
    </div>
  );
}

function Chrome({ title, onExpand, children }: { title: string; onExpand?: () => void; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--sg-border-md)] bg-[var(--sg-surface)] shadow-[var(--shadow-lift-md)]">
      <div className="flex h-9 items-center gap-2 border-b border-[var(--sg-border)] px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-[var(--sg-text-4)]">{title}</span>
        {onExpand && (
          <button type="button" onClick={onExpand} aria-label={`Open ${title} full size`} className="ml-auto grid size-6 place-items-center rounded-md text-[var(--sg-text-3)] transition-colors hover:bg-[var(--sg-surface-2)] hover:text-[var(--sg-text-1)]">
            <Maximize2 size={13} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/** One component in a window frame, for embedding inside a page section. */
export function LabEmbed({ slug, height = 560, caption }: { slug: string; height?: number; caption?: string }) {
  const item = labItem(slug);
  return (
    <figure>
      <Chrome title={`${item.title} — interactive`}>
        <Live item={item} className="w-full" height={height} />
      </Chrome>
      {caption && <figcaption className="mt-3 text-center text-[13px] text-[var(--sg-text-4)]">{caption}</figcaption>}
    </figure>
  );
}

/** The gallery: Marketplace-style grid, each card a live window; click to open full size. */
export function LabGallery() {
  const [open, setOpen] = useState<LabItem | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop?.();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      window.__lenis?.start?.();
    };
  }, [open]);

  return (
    <>
      <div className="grid gap-x-[var(--sp-8)] gap-y-[var(--sp-12)] md:grid-cols-2 lg:grid-cols-3">
        {LAB_ITEMS.map((item) => (
          <article key={item.slug} className="group">
            <Chrome title={item.title} onExpand={() => setOpen(item)}>
              <Live item={item} className="h-[300px]" />
            </Chrome>
            <div className="mt-[var(--sp-4)] flex items-start justify-between gap-[var(--sp-4)] px-1">
              <div>
                <h3 className="text-h3 text-[var(--sg-text-1)] transition-colors group-hover:text-[var(--sg-blue)]">{item.title}</h3>
                <p className="mt-1 text-body text-[var(--sg-text-3)]">{item.blurb}</p>
              </div>
              <span className="shrink-0 pt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--sg-blue)]">{item.category}</span>
            </div>
          </article>
        ))}
      </div>

      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={open.title} className="fixed inset-0 z-[var(--z-modal,1000)] flex items-center justify-center bg-[rgba(5,8,14,0.6)] p-3 backdrop-blur-md sm:p-8" onClick={() => setOpen(null)}>
            <div className="relative h-full max-h-[880px] w-full max-w-[1280px]" onClick={(e) => e.stopPropagation()}>
              <Chrome title={`${open.title} · ${open.category}`}>
                <Live item={open} className="h-[calc(min(880px,100vh-4rem)-36px)]" />
              </Chrome>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close preview" className="btn-raised-neutral absolute -top-3 -right-3 grid size-9 place-items-center rounded-full">
                <X size={16} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
