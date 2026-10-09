import { HeroSection } from '@/components/marketing/home/HeroSection';
import { PlatformModules } from '@/components/marketing/home/PlatformModules';
import { HowItWorks } from '@/components/marketing/home/HowItWorks';
import { PlatformInMotion } from '@/components/marketing/home/PlatformInMotion';
import { ServicesGrid } from '@/components/marketing/home/ServicesGrid';
import { CTASection } from '@/components/marketing/home/CTASection';
import { faqPageJsonLd, speakableJsonLd } from '@/lib/seo';
import { homeFaqs } from '@/lib/seo/faqs';

// AEO surfaces — FAQPage feeds featured snippets / People-Also-Ask /
// voice-assistant answers; Speakable flags hero copy for voice read-aloud.
const homeFaqJsonLd = faqPageJsonLd('/', homeFaqs);
const homeSpeakableJsonLd = speakableJsonLd('/', [
  '[data-speakable="hero-headline"]',
  '[data-speakable="hero-body"]',
]);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSpeakableJsonLd) }}
      />
      {/* v4: one product — the AI Dev Platform, with RAG Studio et al. as its
          modules. No client logos, no ship dates. */}
      <HeroSection />
      <PlatformModules />
      <PlatformInMotion />
      <HowItWorks />
      <ServicesGrid />
      <CTASection />
    </>
  );
}
