'use client';

import { useEffect, useRef } from 'react';
import './_legacy.css';

export function Body({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reveal-on-scroll for elements with .rv
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            reveal.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );
    root.querySelectorAll('.rv').forEach((el) => reveal.observe(el));

    // Sidebar scroll-spy
    const sidebarLinks = root.querySelectorAll<HTMLAnchorElement>('.sidebar-link');
    const sectionEls = root.querySelectorAll<HTMLElement>('.c-section');
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          sidebarLinks.forEach((l) => l.classList.remove('active'));
          const id = (e.target as HTMLElement).id;
          const active = root.querySelector<HTMLAnchorElement>(
            `.sidebar-link[href="#${id}"]`,
          );
          if (active) active.classList.add('active');
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' },
    );
    sectionEls.forEach((s) => spy.observe(s));

    // Compliance accordion: any .comp-block-header click toggles its body + chevron.
    const accordionHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const header = target.closest('.comp-block-header') as HTMLElement | null;
      if (!header || !root.contains(header)) return;
      const body = header.nextElementSibling as HTMLElement | null;
      const chev = header.querySelector('.comp-block-chevron');
      if (!body) return;
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      if (chev) chev.classList.toggle('open', !isOpen);
    };
    root.addEventListener('click', accordionHandler);

    // Smooth-scroll for in-page anchors so the PublicShell sticky header doesn't cover targets.
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
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    };
    root.addEventListener('click', anchorHandler);

    return () => {
      reveal.disconnect();
      spy.disconnect();
      root.removeEventListener('click', accordionHandler);
      root.removeEventListener('click', anchorHandler);
    };
  }, [html]);

  return (
    <div
      ref={rootRef}
      className="lp-popia-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
