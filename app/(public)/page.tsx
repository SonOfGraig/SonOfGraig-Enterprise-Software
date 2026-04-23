import { HeroSection } from '@/components/marketing/home/HeroSection';
import { DashboardPreview } from '@/components/marketing/home/DashboardPreview';
import { LogosBar } from '@/components/marketing/home/LogosBar';
import { TransitionExplainer } from '@/components/marketing/home/TransitionExplainer';
import { ClusterStrip } from '@/components/marketing/home/ClusterStrip';
import { ServicesGrid } from '@/components/marketing/home/ServicesGrid';
import { PricingPreview } from '@/components/marketing/home/PricingPreview';
import { ComplianceStrip } from '@/components/marketing/home/ComplianceStrip';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DashboardPreview />
      <LogosBar />
      <TransitionExplainer />
      <ClusterStrip />
      <ServicesGrid />
      <PricingPreview />
      <ComplianceStrip />
      <CTASection />
    </>
  );
}
