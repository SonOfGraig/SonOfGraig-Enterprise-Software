import { SecurityHero } from '@/components/marketing/security/SecurityHero';
import { CertificationsGrid } from '@/components/marketing/security/CertificationsGrid';
import { DataResidencySection } from '@/components/marketing/security/DataResidencySection';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function SecurityPage() {
  return (
    <>
      <SecurityHero />
      <CertificationsGrid />
      <DataResidencySection />
      <CTASection />
    </>
  );
}
