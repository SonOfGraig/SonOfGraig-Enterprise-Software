import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SceneBackground, type SceneName } from '@/components/fx/SceneBackground';
import { WordReveal } from '@/components/fx/WordReveal';
import { Magnetic } from '@/components/fx/Magnetic';
import { cn } from '@/lib/utils';

// Design system v3.1 — the hero for every inner page. One ported scene behind,
// eyebrow → headline (word reveal, optional shimmer phrase) → lead → actions.
// Entrance is CSS (.reveal-up / .reveal-word) so it paints before hydration.

type Action = { label: string; href: string };

export type PageHeroProps = {
  scene: SceneName;
  eyebrow: string;
  title: string;
  /** Second headline line in the brand shimmer. */
  accent?: string;
  lead: string;
  primary?: Action;
  secondary?: Action;
  align?: 'center' | 'left';
  children?: React.ReactNode;
};

export function PageHero({ scene, eyebrow, title, accent, lead, primary, secondary, align = 'center', children }: PageHeroProps) {
  const centered = align === 'center';
  return (
    <section className="relative overflow-hidden grain" style={{ background: 'var(--sg-bg)' }}>
      <SceneBackground scene={scene} />
      <div
        className={cn(
          'relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 pt-[clamp(64px,12vh,128px)] pb-[clamp(64px,10vh,112px)] flex flex-col',
          centered ? 'items-center text-center' : 'items-start text-left',
        )}
      >
        <p className="reveal-up liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-label text-[var(--sg-blue)]">
          <span className="relative z-[2]">{eyebrow}</span>
        </p>
        <h1 className={cn('text-hero text-[var(--sg-text-1)] mt-7 text-balance', centered ? 'max-w-[18ch]' : 'max-w-[16ch]')}>
          <WordReveal text={title} delay={0.1} className="block" />
          {/* the space keeps "title accent" as two words for crawlers/screen readers */}
          {accent && <>{' '}<WordReveal text={accent} delay={0.4} wordClassName="shimmer-text" className="block" /></>}
        </h1>
        <p
          className="reveal-up font-sans text-[17px] md:text-[19px] leading-[1.6] text-[var(--sg-text-3)] mt-6 max-w-[640px] text-balance"
          style={{ animationDelay: '0.65s' }}
        >
          {lead}
        </p>
        {(primary || secondary) && (
          <div className="reveal-up flex flex-col sm:flex-row gap-3 mt-9 w-full sm:w-auto" style={{ animationDelay: '0.8s' }}>
            {primary && (
              <Magnetic>
                <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
                  <Link href={primary.href}>{primary.label}</Link>
                </Button>
              </Magnetic>
            )}
            {secondary && (
              <Magnetic>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              </Magnetic>
            )}
          </div>
        )}
        {children && (
          <div className="reveal-up w-full mt-14" style={{ animationDelay: '0.95s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
