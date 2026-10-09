import { getService } from '@/lib/services';
import { ServiceDetail } from '@/components/marketing/services/ServiceDetail';
import { serviceMetadata, ServiceJsonLd } from '@/components/marketing/services/serviceSeo';

// Content lives in lib/services.ts; layout in ServiceDetail (design system v3.1).
const service = getService('rag-knowledge-base-setup');

export const metadata = serviceMetadata(service);

export default function RagKnowledgeBasePage() {
  return (
    <>
      <ServiceJsonLd service={service} />
      <ServiceDetail service={service} />
    </>
  );
}