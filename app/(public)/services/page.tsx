import { ServicesHero } from '@/components/marketing/services/ServicesHero';
import { FullServicesGrid } from '@/components/marketing/services/FullServicesGrid';
import { ProcessSection } from '@/components/marketing/services/ProcessSection';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <FullServicesGrid />
      <ProcessSection />
      <CTASection />
    </>
  );
}
