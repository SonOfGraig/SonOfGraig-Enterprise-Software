import { AboutHero } from '@/components/marketing/about/AboutHero';
import { TransitionStory } from '@/components/marketing/about/TransitionStory';
import { TeamSection } from '@/components/marketing/about/TeamSection';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TransitionStory />
      <TeamSection />
      <CTASection />
    </>
  );
}
