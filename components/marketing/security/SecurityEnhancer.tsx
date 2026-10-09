'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SceneBackground, type SceneName } from '@/components/fx/SceneBackground';
import { PiiScrubDemo } from '@/components/fx/interactive/PiiScrubDemo';
import { ResidencyMap } from '@/components/fx/interactive/ResidencyMap';
import { smoothScrollTo } from '@/lib/scroll';

// The original /security page is server-rendered static markup (see
// securityHtml.ts). This enhancer brings it to life without re-rendering it:
// scroll reveals, tab scroll-spy, a unique scene behind every section, and
// the two live demos mounted into placeholders in the markup.

const SCENES: Record<string, SceneName> = {
  hero: 'tacticalCommand',
  pillars: 'hexField',
  architecture: 'assemblyLine',
  compliance: 'acousticWaves',
  controls: 'matrixRain',
  incident: 'collisionBeams',
  responsibility: 'spatialDisplacement',
  subprocessors: 'modularLattice',
  documentation: 'dotMatrix',
  faq: 'nebula',
  cta: 'sonarEcho',
};

type Mount = { el: HTMLElement; node: React.ReactNode };

export function SecurityEnhancer({ rootId }: { rootId: string }) {
  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    // ── reveals: show what is already on screen, then arm the rest ──
    const rvs = Array.from(root.querySelectorAll<HTMLElement>('.rv'));
    rvs.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
    root.classList.add('armed');
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
    rvs.forEach((el) => !el.classList.contains('in') && reveal.observe(el));

    // ── section tabs: scroll-spy + smooth scroll (Lenis-aware) ──
    const tabs = Array.from(root.querySelectorAll<HTMLElement>('.toc-tab[data-target]'));
    const setActive = (id: string) => tabs.forEach((t) => t.classList.toggle('active', t.dataset.target === id));
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).id)),
      { threshold: 0.18, rootMargin: '-140px 0px -55% 0px' },
    );
    tabs.forEach((t) => {
      const sec = root.querySelector<HTMLElement>(`#${t.dataset.target}`);
      if (sec) spy.observe(sec);
    });
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !root.contains(a)) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      ev.preventDefault();
      // header (64) + sticky tab strip (~52) + breathing room
      smoothScrollTo(el, { offset: -128 });
      if (a.dataset.target) setActive(id);
      history.replaceState(null, '', `#${id}`);
    };
    root.addEventListener('click', onClick);

    // ── portals: a scene per section, demos into their placeholders ──
    const next: Mount[] = [];
    root.querySelectorAll<HTMLElement>('section.hero, section.section').forEach((sec) => {
      const key = sec.classList.contains('hero') ? 'hero' : sec.id || 'cta';
      const scene = SCENES[key];
      if (!scene) return;
      const host = document.createElement('div');
      host.className = 'sec-scene';
      host.setAttribute('aria-hidden', 'true');
      // Fade the scene into this section's own surface at the edges.
      host.style.setProperty('--scene-fade', sec.classList.contains('hero') || sec.classList.contains('section-alt') ? 'var(--s1)' : 'var(--bg)');
      sec.prepend(host);
      next.push({ el: host, node: <SceneBackground scene={scene} /> });
    });
    const pii = root.querySelector<HTMLElement>('[data-mount="pii-demo"]');
    if (pii) next.push({ el: pii, node: <PiiScrubDemo /> });
    const map = root.querySelector<HTMLElement>('[data-mount="residency-map"]');
    if (map) next.push({ el: map, node: <ResidencyMap /> });
    setMounts(next);

    return () => {
      reveal.disconnect();
      spy.disconnect();
      root.removeEventListener('click', onClick);
      root.querySelectorAll('.sec-scene').forEach((n) => n.remove());
      setMounts([]);
    };
  }, [rootId]);

  return <>{mounts.map((m, i) => createPortal(m.node, m.el, String(i)))}</>;
}
