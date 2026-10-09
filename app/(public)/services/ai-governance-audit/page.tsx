import { getService } from '@/lib/services';
import { ServiceDetail } from '@/components/marketing/services/ServiceDetail';
import { serviceMetadata, ServiceJsonLd } from '@/components/marketing/services/serviceSeo';

// Content lives in lib/services.ts; layout in ServiceDetail (design system v3.1).
const service = getService('ai-governance-audit');

export const metadata = serviceMetadata(service);

export default function AIGovernanceAuditPage() {
  return (
    <>
      <ServiceJsonLd service={service} />
      <ServiceDetail service={service} />
    </>
  );
}