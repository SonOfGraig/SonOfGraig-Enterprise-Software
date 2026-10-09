import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/fx/Reveal';
import { Magnetic } from '@/components/fx/Magnetic';
import type { SceneName } from '@/components/fx/SceneBackground';

// Closing band for every page. data-theme="dark" scopes the dark tokens to
// this section so it reads as a dark band in both site themes; the lattice
// tunnel (2026 site, DigitalLatticeBackground) is the default scene; pages pass
// their own so each closing band is distinct. Use this band once per page, last.
export type CTABandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  scene?: SceneName;
};

export function CTABand({
  eyebrow = 'AI Dev Platform · Early access',
  title,
  body,
  primary = { label: 'Join early access', href: '/early-access' },
  secondary = { label: 'Start a project', href: '/contact' },
  scene = 'latticeTunnel',
}: CTABandProps) {
  return (
    <Section data-theme="dark" tone="base" spacing="lg" background={scene} className="text-center">
      <Reveal blur>
        {eyebrow && <p className="text-label text-[var(--sg-blue)]">{eyebrow}</p>}
        <h2 className="text-h1 text-[var(--sg-text-1)] max-w-[720px] mx-auto mt-[var(--sp-4)] text-balance">{title}</h2>
        {body && <p className="text-body-lg text-[var(--sg-text-3)] max-w-[520px] mx-auto mt-[var(--sp-4)] text-balance">{body}</p>}
        <div className="flex flex-col sm:flex-row justify-center gap-[var(--sp-3)] mt-[var(--sp-8)]">
          <Magnetic>
            <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
          </Magnetic>
          {secondary && (
            <Magnetic>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </Magnetic>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
