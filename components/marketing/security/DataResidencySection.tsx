import { Check } from 'lucide-react';

export function DataResidencySection() {
  const infraSpecs = [
    'Primary compute: AWS af-south-1 (Cape Town)',
    'All customer data encrypted at rest (AES-256)',
    'All data in transit encrypted (TLS 1.3)',
    'Data residency contractually guaranteed',
    'BYOK encryption available on Enterprise tier',
    'No cross-border transfer without explicit consent'
  ];

  return (
    <section className="w-full bg-[var(--sg-surface)] py-[var(--sp-16)] border-y border-[var(--sg-border)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <h2 className="text-h2 text-[var(--sg-text-1)] mb-[var(--sp-10)]">Your data never leaves South Africa.</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--sp-12)] items-start">
          
          {/* LEFT: Prose */}
          <div className="flex flex-col gap-6">
            <p className="text-body-lg text-[var(--sg-text-2)] leading-relaxed">
              For South African enterprises, data residency isn&apos;t a nice-to-have; it&apos;s a regulatory requirement. We built SonOfGraig&apos;s infrastructure entirely within the AWS af-south-1 (Cape Town) region to ensure absolute compliance with the Protection of Personal Information Act (POPIA).
            </p>
            <p className="text-body text-[var(--sg-text-3)] leading-relaxed">
              When you use our platform or engage us for a service, your documents, vector embeddings, and model weights remain physically located within South Africa. We do not route data through international regions for processing, eliminating cross-border data transfer risks.
            </p>
            <p className="text-body text-[var(--sg-text-3)] leading-relaxed">
              For organizations with extreme security postures, our Enterprise tier offers Bring Your Own Key (BYOK) encryption, VPC peering, and even fully air-gapped on-premises deployments of our RAG and Agent infrastructure.
            </p>
          </div>

          {/* RIGHT: Infra Spec Card */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
            <h3 className="font-sans text-[16px] font-semibold text-[var(--sg-text-1)] mb-6">Infrastructure Specifications</h3>
            <ul className="space-y-4">
              {infraSpecs.map((spec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={18} strokeWidth={2} className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                  <span className="font-sans text-[14px] text-[var(--sg-text-2)]">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
