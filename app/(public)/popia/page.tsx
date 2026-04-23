import { POPIAHero } from '@/components/marketing/popia/POPIAHero';
import { POPIAArticleMapping } from '@/components/marketing/popia/POPIAArticleMapping';
import { DataSubjectRightsSection } from '@/components/marketing/popia/DataSubjectRightsSection';
import { InformationOfficerSection } from '@/components/marketing/popia/InformationOfficerSection';
import { CTASection } from '@/components/marketing/home/CTASection';

export default function POPIAPage() {
  return (
    <>
      <POPIAHero />
      <POPIAArticleMapping />
      <DataSubjectRightsSection />
      <InformationOfficerSection />
      <CTASection />
    </>
  );
}
