import { PricingHero } from '@/components/marketing/pricing/PricingHero';
import { PricingGrid } from '@/components/marketing/pricing/PricingGrid';
import { FeatureMatrix } from '@/components/marketing/pricing/FeatureMatrix';
import { PricingFAQ } from '@/components/marketing/pricing/PricingFAQ';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingGrid />
      <FeatureMatrix />
      <PricingFAQ />
      <CTASection />
    </>
  );
}
