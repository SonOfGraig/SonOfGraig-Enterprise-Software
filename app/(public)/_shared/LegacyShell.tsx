'use client';

/**
 * Renders a static legacy HTML mock inside a scoped wrapper, then re-attaches
 * every interaction the source HTML used to wire via inline `on*` attributes
 * (which the porter strips). Behaviours wired here, in order of frequency:
 *
 *  - reveal-on-scroll     — `.rv` gains `.in` once intersected (used everywhere)
 *  - TOC scroll-spy       — `.toc-tab[data-target=ID]` ↔ `#ID` section
 *  - in-page anchor scroll — any `a[href^="#"]` smooth-scrolls past sticky header
 *  - comp-block accordion — `.comp-block-header` toggles `.open` on next sibling
 *  - FAQ accordion        — `.faq-q` toggles `.open` on next sibling, single-open
 *  - changelog filters    — `.fpill[data-cat]` + `#searchInput` filter `.cl-entry`
 *  - demo form submit     — `form` with `[data-success="<id>"]` swaps to success card
 *
 * Selectors are deliberately generic — adding a new page that uses the same
 * markup conventions costs nothing. Pages that need bespoke wiring (pricing
 * billing toggle, platform cluster tabs) keep their own dedicated Body.tsx.
 */

import { useEffect, useRef } from 'react';

const HEADER_OFFSET = 88; // PublicShell sticky header is 64px + breathing room

export function LegacyShell({
  html,
  scope,
  className,
}: {
  html: string;
  scope: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* ── reveal-on-scroll ─────────────────────────────────────── */
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

    /* ── TOC scroll-spy ───────────────────────────────────────── */
    const tocTabs = Array.from(
      root.querySelectorAll<HTMLElement>('.toc-tab[data-target]'),
    );
    const tocSections = tocTabs
      .map((t) => root.querySelector<HTMLElement>(`#${t.dataset.target}`))
      .filter((s): s is HTMLElement => !!s);

    const setActiveTab = (id: string) => {
      tocTabs.forEach((t) => t.classList.toggle('active', t.dataset.target === id));
    };

    const tocSpy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveTab((e.target as HTMLElement).id);
        }
      },
      { threshold: 0.18, rootMargin: '-130px 0px -55% 0px' },
    );
    tocSections.forEach((s) => tocSpy.observe(s));

    /* ── changelog filters (no-op when not on changelog) ──────── */
    let activeCat = 'all';
    let activeQuery = '';
    const fpills = root.querySelectorAll<HTMLElement>('.fpill[data-cat]');
    const entries = root.querySelectorAll<HTMLElement>('.cl-entry');
    const searchInput = root.querySelector<HTMLInputElement>('#searchInput');
    const emptyState = root.querySelector<HTMLElement>('#changelogEmpty');

    const applyFilters = () => {
      let visible = 0;
      entries.forEach((e) => {
        const cat = e.dataset.cat;
        const text = (e.textContent || '').toLowerCase();
        const ok =
          (activeCat === 'all' || cat === activeCat) &&
          (!activeQuery || text.includes(activeQuery));
        e.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? '' : 'none';
    };
    if (fpills.length || entries.length) applyFilters();

    const onSearchInput = () => {
      activeQuery = (searchInput?.value || '').toLowerCase().trim();
      applyFilters();
    };
    searchInput?.addEventListener('input', onSearchInput);

    /* ── click delegation: anchors, accordions, filter pills, tabs ─ */
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Filter pill?
      const pill = target.closest<HTMLElement>('.fpill[data-cat]');
      if (pill && root.contains(pill)) {
        activeCat = pill.dataset.cat || 'all';
        fpills.forEach((p) =>
          p.classList.toggle('active', p.dataset.cat === activeCat),
        );
        applyFilters();
        return;
      }

      // Clear-all button (changelog)
      const clearBtn = target.closest<HTMLElement>('[data-clear-filters]');
      if (clearBtn && root.contains(clearBtn)) {
        activeCat = 'all';
        activeQuery = '';
        fpills.forEach((p) => p.classList.toggle('active', p.dataset.cat === 'all'));
        if (searchInput) searchInput.value = '';
        applyFilters();
        return;
      }

      // Comp-block accordion (POPIA-style)
      const compHeader = target.closest<HTMLElement>('.comp-block-header');
      if (compHeader && root.contains(compHeader)) {
        const body = compHeader.nextElementSibling as HTMLElement | null;
        const chev = compHeader.querySelector('.comp-block-chevron');
        if (body) {
          const open = body.classList.contains('open');
          body.classList.toggle('open', !open);
          chev?.classList.toggle('open', !open);
        }
        return;
      }

      // FAQ accordion (single-open)
      const faqQ = target.closest<HTMLElement>('.faq-q');
      if (faqQ && root.contains(faqQ)) {
        const a = faqQ.nextElementSibling as HTMLElement | null;
        const chev = faqQ.querySelector('.faq-chv');
        const wasOpen = a?.classList.contains('open');
        root.querySelectorAll('.faq-a.open').forEach((el) => {
          el.classList.remove('open');
          el.previousElementSibling?.querySelector('.faq-chv')?.classList.remove('open');
        });
        if (!wasOpen && a) {
          a.classList.add('open');
          chev?.classList.add('open');
        }
        return;
      }

      // TOC tab click → smooth scroll
      const tocTab = target.closest<HTMLElement>('.toc-tab[data-target]');
      if (tocTab && root.contains(tocTab)) {
        const id = tocTab.dataset.target!;
        const el = root.querySelector<HTMLElement>(`#${id}`);
        if (el) {
          event.preventDefault();
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 110,
            behavior: 'smooth',
          });
          setActiveTab(id);
        }
        return;
      }

      // Generic in-page anchor
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (anchor && root.contains(anchor)) {
        const id = anchor.getAttribute('href')!.slice(1);
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;
        event.preventDefault();
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
          behavior: 'smooth',
        });
        history.replaceState(null, '', `#${id}`);
      }
    };
    root.addEventListener('click', onClick);

    /* ── demo form submit (contact, early-access) ─────────────── */
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form || !root.contains(form)) return;
      // Honour HTML5 validation first
      if (!form.checkValidity()) {
        // Let the browser show its native messages
        return;
      }
      event.preventDefault();
      // Resolve success/card targets in this order:
      //   1. explicit data-card / data-success on the form
      //   2. derived from the form id (contactForm → contactCard / contactSuccess)
      //   3. the convention used in the source mocks (#formCard / #formSuccess)
      const stem = form.id?.replace(/Form$/, '') || '';
      const cardCandidates = [
        form.dataset.card,
        stem ? `${stem}Card` : null,
        'formCard',
      ].filter(Boolean) as string[];
      const successCandidates = [
        form.dataset.success,
        stem ? `${stem}Success` : null,
        'formSuccess',
      ].filter(Boolean) as string[];
      const find = (ids: string[]) =>
        ids.map((id) => root.querySelector<HTMLElement>(`#${id}`)).find(Boolean) || null;
      const card = find(cardCandidates);
      const success = find(successCandidates);
      if (card) card.classList.add('hidden');
      if (success) {
        success.classList.add('shown');
        const top = success.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        // No success card configured — fall back to a console hint, no alert.
        // eslint-disable-next-line no-console
        console.info('[LegacyShell] form submitted — no success card mapped');
      }
    };
    root.addEventListener('submit', onSubmit);

    return () => {
      reveal.disconnect();
      tocSpy.disconnect();
      searchInput?.removeEventListener('input', onSearchInput);
      root.removeEventListener('click', onClick);
      root.removeEventListener('submit', onSubmit);
    };
  }, [html]);

  return (
    <div
      ref={rootRef}
      className={[`${scope}-root`, className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
