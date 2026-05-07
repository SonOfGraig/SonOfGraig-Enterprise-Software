'use client';

import { useEffect, useRef } from 'react';
import './_legacy.css';

const TAB_SECTION_IDS = [
  'ai-dev-platform',
  'cloud-devops',
  'data-analytics',
  'creative-xr',
  'dev-platform',
];
const TAB_COLORS = [
  'var(--blue)',
  'var(--amber)',
  'var(--green)',
  'var(--purple)',
  'var(--slate)',
];

export function Body({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            reveal.unobserve(e.target);
          }
        }
      },
      { threshold: 0.07, rootMargin: '0px 0px -28px 0px' },
    );
    root.querySelectorAll('.rv').forEach((el) => reveal.observe(el));

    // Cluster tab strip — active state driven by which section is in view.
    const tabs = Array.from(root.querySelectorAll<HTMLElement>('.cs-tab'));
    const setTab = (n: number) => {
      tabs.forEach((t, i) => {
        const active = i === n;
        t.classList.toggle('active', active);
        t.style.color = active ? TAB_COLORS[i] : '';
        t.style.borderBottomColor = active ? TAB_COLORS[i] : '';
      });
    };
    if (tabs.length) setTab(0);

    const sections = TAB_SECTION_IDS.map((id) => root.querySelector<HTMLElement>(`#${id}`));
    const tabSpy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = sections.findIndex((s) => s === e.target);
          if (idx >= 0) setTab(idx);
        }
      },
      { threshold: 0.3, rootMargin: '-115px 0px 0px 0px' },
    );
    sections.forEach((s) => s && tabSpy.observe(s));

    // Click on a tab → smooth scroll to its section.
    const tabClick = (event: MouseEvent) => {
      const tab = (event.target as HTMLElement).closest('.cs-tab') as HTMLElement | null;
      if (!tab || !root.contains(tab)) return;
      const idx = tabs.indexOf(tab);
      const targetId = TAB_SECTION_IDS[idx];
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 114;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    const anchorHandler = (event: MouseEvent) => {
      const a = (event.target as HTMLElement).closest('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 114;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    };

    root.addEventListener('click', tabClick);
    root.addEventListener('click', anchorHandler);

    return () => {
      reveal.disconnect();
      tabSpy.disconnect();
      root.removeEventListener('click', tabClick);
      root.removeEventListener('click', anchorHandler);
    };
  }, [html]);

  return (
    <div
      ref={rootRef}
      className="lp-platform-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
