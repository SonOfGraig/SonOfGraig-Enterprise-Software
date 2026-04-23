'use client';

import * as React from 'react';
import { Field } from '@/components/ui/Field';
import { Badge } from '@/components/ui/Badge';
import { Search } from 'lucide-react';

const complianceData = [
  {
    section: 'Section 4 (Lawfulness)',
    requirement: 'Processing must be lawful and reasonable.',
    implementation: 'All data processing is mapped to specific, documented legal bases. We do not process data without explicit justification.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 5 (Minimality)',
    requirement: 'Personal information may only be processed if adequate, relevant, and not excessive.',
    implementation: 'Our ingestion pipelines automatically strip PII from vector embeddings unless explicitly required and consented to.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 6 (Purpose)',
    requirement: 'Data must be collected for a specific, explicitly defined and lawful purpose.',
    implementation: 'Purpose specification is hardcoded into our data contracts. Data collected for RAG cannot be used for agent training.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 7 (Further processing)',
    requirement: 'Further processing must be compatible with the original purpose of collection.',
    implementation: 'Automated checks prevent cross-tenant or cross-purpose data leakage in our multi-agent orchestration layer.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 11 (Consent)',
    requirement: 'Consent must be voluntary, specific and informed.',
    implementation: 'Granular consent management API implemented. Users can revoke consent per-feature (e.g., analytics vs core function).',
    status: 'In Progress',
    statusVariant: 'warn' as const
  },
  {
    section: 'Section 18 (Notification)',
    requirement: 'Data subjects must be made aware of the collection of their data.',
    implementation: 'Transparent privacy notices embedded in all UI components that collect data. Audit logs track notification delivery.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 19 (Security safeguards)',
    requirement: 'Integrity and confidentiality of personal information must be secured.',
    implementation: 'AES-256 encryption at rest, TLS 1.3 in transit. SOC 2 Type II audit underway. AWS af-south-1 residency.',
    status: 'Compliant',
    statusVariant: 'success' as const
  },
  {
    section: 'Section 23 (Data subject access)',
    requirement: 'Data subjects have the right to request access to their personal information.',
    implementation: 'Automated Data Subject Access Request (DSAR) portal in development for self-service data exports.',
    status: 'Planned',
    statusVariant: 'blue' as const
  },
  {
    section: 'Section 26 (Breach notification)',
    requirement: 'Regulator and data subjects must be notified of security compromises.',
    implementation: 'Automated 72-hour breach notification protocol established. Incident response team on 24/7 standby.',
    status: 'Compliant',
    statusVariant: 'success' as const
  }
];

export function POPIAArticleMapping() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredData = complianceData.filter(row => 
    row.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.implementation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-[var(--sp-6)]">
          <h2 className="text-h3 text-[var(--sg-text-1)]">POPIA compliance mapping</h2>
          <div className="w-full sm:w-[320px]">
            <Field 
              leadingIcon={<Search size={16} strokeWidth={1.5} />}
              placeholder="Search compliance mapping"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-bg)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--sg-border)] bg-[var(--sg-surface)]">
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[20%]">POPIA Section</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[30%]">Requirement</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[35%]">Our Implementation</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[15%]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sg-border)]">
              {filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--sg-surface-2)] transition-colors">
                    <td className="p-4 font-sans text-[14px] font-medium text-[var(--sg-text-1)] align-top">{row.section}</td>
                    <td className="p-4 font-sans text-[13px] text-[var(--sg-text-3)] align-top leading-relaxed">{row.requirement}</td>
                    <td className="p-4 font-sans text-[13px] text-[var(--sg-text-2)] align-top leading-relaxed">{row.implementation}</td>
                    <td className="p-4 align-top">
                      <Badge variant={row.statusVariant}>{row.status}</Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center font-sans text-[14px] text-[var(--sg-text-4)]">
                    No matching compliance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
