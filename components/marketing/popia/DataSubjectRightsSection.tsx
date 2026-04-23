import { Eye, Edit, Trash2, XCircle, FileText, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function DataSubjectRightsSection() {
  const rights = [
    {
      icon: Eye,
      title: 'Right to access',
      desc: 'Request a copy of all personal data we hold about you.',
      action: 'Request access'
    },
    {
      icon: Edit,
      title: 'Right to correction',
      desc: 'Request correction of inaccurate personal information.',
      action: 'Request correction'
    },
    {
      icon: Trash2,
      title: 'Right to deletion',
      desc: 'Request deletion of your personal data (subject to legal obligations).',
      action: 'Request deletion'
    },
    {
      icon: XCircle,
      title: 'Right to object',
      desc: 'Object to processing of your personal data for specific purposes.',
      action: 'Submit objection'
    },
    {
      icon: FileText,
      title: 'Right to data portability',
      desc: 'Receive your data in a structured, machine-readable format.',
      action: 'Request export'
    },
    {
      icon: Bell,
      title: 'Right to breach notification',
      desc: 'Be notified within 72 hours of any breach affecting your data.',
      action: 'View policy'
    }
  ];

  return (
    <section className="w-full pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <h2 className="text-h2 text-[var(--sg-text-1)] mb-[var(--sp-8)]">Your rights as a data subject</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--sp-4)]">
          {rights.map((right, i) => {
            const Icon = right.icon;
            return (
              <div key={i} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col items-start shadow-sm">
                <div className="mb-4">
                  <Icon size={20} strokeWidth={1.5} className="text-[var(--sg-blue)]" />
                </div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-2">{right.title}</h3>
                <p className="text-body text-[var(--sg-text-3)] mb-6 flex-1">
                  {right.desc}
                </p>
                <Button variant="ghost" size="sm" className="text-[var(--sg-blue)] hover:text-[var(--sg-blue-dim)] px-0" asChild>
                  <Link href="#information-officer">{right.action}</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
