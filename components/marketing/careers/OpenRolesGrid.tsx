import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import Link from 'next/link';

export interface Role {
  title: string;
  team: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  skills: string[];
}

const openRoles: Role[] = [
  {
    title: 'Senior Full Stack Engineer',
    team: 'Platform',
    location: 'Pretoria / Hybrid',
    type: 'Full-time',
    description: 'Lead the development of our core Agent Builder interface and multi-tenant architecture.',
    skills: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    title: 'AI/ML Engineer',
    team: 'Intelligence',
    location: 'Remote (SA)',
    type: 'Full-time',
    description: 'Design and optimize our RAG pipelines, embedding strategies, and prompt orchestration layer.',
    skills: ['Python', 'PyTorch', 'LangChain', 'Vector DBs']
  },
  {
    title: 'Product Designer',
    team: 'Design',
    location: 'Johannesburg / Hybrid',
    type: 'Full-time',
    description: 'Translate complex enterprise workflows into intuitive, consumer-grade interfaces.',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'UX Research']
  },
  {
    title: 'Cloud Security Architect',
    team: 'Infrastructure',
    location: 'Remote (SA)',
    type: 'Contract',
    description: 'Ensure our AWS af-south-1 infrastructure meets strict POPIA and SOC 2 Type II requirements.',
    skills: ['AWS', 'Terraform', 'Compliance', 'IAM']
  }
];

export function OpenRolesGrid() {
  return (
    <section className="w-full pb-[var(--sp-20)]">
      <div className="max-w-[1080px] mx-auto px-8">
        
        <div className="w-full overflow-x-auto rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-bg)] mb-[var(--sp-8)]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--sg-border)] bg-[var(--sg-surface)]">
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[35%]">Role</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[20%]">Team</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[20%]">Location</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[15%]">Type</th>
                <th className="p-4 font-sans text-[12px] font-semibold text-[var(--sg-text-2)] uppercase tracking-wider w-[10%] text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sg-border)]">
              {openRoles.map((role, i) => (
                <tr key={i} className="hover:bg-[var(--sg-surface-2)] transition-colors group">
                  <td className="p-4 align-middle">
                    <div className="font-sans text-[14px] font-medium text-[var(--sg-text-1)]">{role.title}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="font-sans text-[13px] text-[var(--sg-text-3)]">{role.team}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="font-sans text-[13px] text-[var(--sg-text-3)]">{role.location}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="font-sans text-[13px] text-[var(--sg-text-3)]">{role.type}</div>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <Link href={`/careers/${role.title.toLowerCase().replace(/\s+/g, '-')}`}>View role</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="info" label="Don't see your role?" className="mb-[var(--sp-8)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <p className="font-sans text-[14px] text-[var(--sg-text-2)]">
              We always want to meet exceptional engineers, designers, and AI specialists.
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href="mailto:careers@sonofgraig.com?subject=Open%20Application">Send open application</Link>
            </Button>
          </div>
        </Callout>

      </div>
    </section>
  );
}
