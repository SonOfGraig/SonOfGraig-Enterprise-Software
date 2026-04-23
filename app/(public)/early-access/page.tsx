import { EarlyAccessHero } from '@/components/marketing/early-access/EarlyAccessHero';
import { BenefitsGrid } from '@/components/marketing/early-access/BenefitsGrid';
import { ApplicationForm } from '@/components/marketing/early-access/ApplicationForm';

export default function EarlyAccessPage() {
  return (
    <>
      <EarlyAccessHero />
      <BenefitsGrid />
      <ApplicationForm />
    </>
  );
}
