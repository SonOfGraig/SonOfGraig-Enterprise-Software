import { Shield, FileCheck, Globe, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function CertificationsGrid() {
  const certifications = [
    {
      icon: Shield,
      title: 'SOC 2 Type II',
      status: 'In Progress',
      statusVariant: 'warn' as const,
      desc: 'Continuous third-party security audit. Evidence collection started Q1 2026.',
      timeline: 'Targeting Q1 2027'
    },
    {
      icon: FileCheck,
      title: 'POPIA Compliance',
      status: 'Achieved',
      statusVariant: 'success' as const,
      desc: 'South African Protection of Personal Information Act. Full compliance posture.',
      timeline: 'Completed Q3 2025'
    },
    {
      icon: Globe,
      title: 'ISO 27001',
      status: 'Planned',
      statusVariant: 'default' as const,
      desc: 'International information security management standard. Targeting Q2 2027.',
      timeline: 'Targeting Q2 2027'
    },
    {
      icon: Cpu,
      title: 'EU AI Act',
      status: 'Achieved',
      statusVariant: 'success' as const,
      desc: 'Risk classification and documentation per EU AI Act taxonomy for all platform components.',
      timeline: 'Completed Q4 2025'
    }
  ];

  return (
    <section className="w-full pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--sp-4)]">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div key={i} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col items-center text-center shadow-sm">
                <div className="w-[80px] h-[80px] rounded-[var(--r-xl)] bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] flex items-center justify-center mb-6">
                  <Icon size={48} strokeWidth={1.5} className="text-[var(--sg-blue)]" />
                </div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">{cert.title}</h3>
                <div className="mb-4">
                  <Badge variant={cert.statusVariant}>{cert.status}</Badge>
                </div>
                <p className="text-caption text-[var(--sg-text-3)] mb-6 flex-1">
                  {cert.desc}
                </p>
                <div className="text-caption text-[var(--sg-text-4)] pt-4 border-t border-[var(--sg-border)] w-full">
                  {cert.timeline}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
