'use client';

import { useEffect, useRef, useState } from 'react';
import './_legacy.css';

type Billing = 'monthly' | 'annual';

const BASE = { starter: 4999, growth: 19999 } as const;
function annualPrice(monthly: number) {
  return Math.round((monthly * 12 * 0.8) / 12);
}
function fmt(n: number) {
  return n.toLocaleString('en-ZA');
}

export function Body({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [billing, setBilling] = useState<Billing>('monthly');

  // Reveal-on-scroll, FAQ accordion, and smooth-scroll wiring (one effect, runs once).
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
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );
    root.querySelectorAll('.rv').forEach((el) => reveal.observe(el));

    const faqHandler = (event: MouseEvent) => {
      const q = (event.target as HTMLElement).closest('.faq-q') as HTMLElement | null;
      if (!q || !root.contains(q)) return;
      const a = q.nextElementSibling as HTMLElement | null;
      const chev = q.querySelector('.faq-chv');
      if (!a) return;
      const isOpen = a.classList.contains('open');
      // Close any open siblings to keep one item open at a time.
      root.querySelectorAll('.faq-a.open').forEach((el) => {
        el.classList.remove('open');
        const prev = el.previousElementSibling;
        prev?.querySelector('.faq-chv')?.classList.remove('open');
      });
      if (!isOpen) {
        a.classList.add('open');
        chev?.classList.add('open');
      }
    };

    const togglePill = (event: MouseEvent) => {
      const opt = (event.target as HTMLElement).closest('.toggle-opt') as
        | HTMLElement
        | null;
      if (!opt || !root.contains(opt)) return;
      if (opt.id === 'tog-monthly') setBilling('monthly');
      else if (opt.id === 'tog-annual') setBilling('annual');
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
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    };

    root.addEventListener('click', faqHandler);
    root.addEventListener('click', togglePill);
    root.addEventListener('click', anchorHandler);

    return () => {
      reveal.disconnect();
      root.removeEventListener('click', faqHandler);
      root.removeEventListener('click', togglePill);
      root.removeEventListener('click', anchorHandler);
    };
  }, [html]);

  // Sync the billing toggle UI + price labels every time `billing` changes.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const m = root.querySelector<HTMLElement>('#tog-monthly');
    const y = root.querySelector<HTMLElement>('#tog-annual');
    m?.classList.toggle('active', billing === 'monthly');
    y?.classList.toggle('active', billing === 'annual');
    m?.setAttribute('aria-pressed', String(billing === 'monthly'));
    y?.setAttribute('aria-pressed', String(billing === 'annual'));

    const sp = billing === 'annual' ? annualPrice(BASE.starter) : BASE.starter;
    const gp = billing === 'annual' ? annualPrice(BASE.growth) : BASE.growth;
    const set = (id: string, v: string) => {
      const el = root.querySelector<HTMLElement>(`#${id}`);
      if (el) el.textContent = v;
    };
    set('starter-price', fmt(sp));
    set('growth-price', fmt(gp));
    set('starter-billing', billing === 'annual' ? 'annually (20% off)' : 'monthly');
    set('growth-billing', billing === 'annual' ? 'annually (20% off)' : 'monthly');
    set(
      'starter-annual',
      billing === 'annual' ? `Save R${fmt((BASE.starter - sp) * 12)} per year` : ' ',
    );
    set(
      'growth-annual',
      billing === 'annual' ? `Save R${fmt((BASE.growth - gp) * 12)} per year` : ' ',
    );
  }, [billing, html]);

  return (
    <div
      ref={rootRef}
      className="lp-pricing-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
