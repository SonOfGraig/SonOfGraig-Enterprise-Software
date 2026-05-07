import { Button } from '@/components/ui/Button';
import { Check, Code2, Database, Shield, Cloud, Network, Workflow, TerminalSquare, FileText, Lock, Activity, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    category: 'AI & Intelligence',
    title: 'AI Agent Implementation',
    slug: 'ai-agent-implementation',
    desc: 'Design, build, and deploy autonomous AI agents using LangGraph and Composio — the same stack powering our future Agent Builder product.',
    deliverables: [
      'Agent workflow design',
      '200+ tool integrations',
      'Full execution trace + audit',
      'Human-in-the-loop gates'
    ],
    techStack: [
      { icon: Network, label: 'LangGraph' },
      { icon: Workflow, label: 'Composio' },
      { icon: TerminalSquare, label: 'Python' }
    ],
    platformConnection: 'Feeds into Agent Builder (Q4 2026)',
    price: 'from R95,000',
    meta: '6-8 weeks · Fixed scope'
  },
  {
    category: 'AI & Intelligence',
    title: 'RAG Knowledge Base Setup',
    slug: 'rag-knowledge-base-setup',
    desc: 'Connect your company documents to AI. Ingestion pipeline, hybrid retrieval, evaluation framework, and chat interface.',
    deliverables: [
      'Google Drive, SharePoint, Notion connectors',
      'Hybrid semantic + keyword retrieval',
      'Source citation in every answer',
      'Ragas quality evaluation'
    ],
    techStack: [
      { icon: Database, label: 'Vector DB' },
      { icon: FileText, label: 'LlamaIndex' },
      { icon: Code2, label: 'Next.js' }
    ],
    platformConnection: 'Feeds into RAG Studio (Q3 2026)',
    price: 'from R65,000',
    meta: '4-6 weeks · Fixed scope'
  },
  {
    category: 'Infrastructure',
    title: 'Cloud Architecture & DevOps',
    slug: 'cloud-architecture',
    desc: 'Zero-trust cloud setup, Kubernetes, CI/CD pipelines, and observability stacks. POPIA-compliant from day one.',
    deliverables: [
      'Terraform IaC',
      'Kubernetes + Helm',
      'GitHub Actions CI/CD',
      'Prometheus + Grafana'
    ],
    techStack: [
      { icon: Cloud, label: 'AWS/Azure' },
      { icon: TerminalSquare, label: 'Terraform' },
      { icon: Activity, label: 'Kubernetes' }
    ],
    platformConnection: 'Feeds into Cloud & DevOps Suite (2027+)',
    price: 'from R120,000',
    meta: '6-10 weeks · Fixed scope'
  },
  {
    category: 'Compliance',
    title: 'AI Governance & Ethics Audit',
    slug: 'ai-governance-audit',
    desc: 'Bias detection, SHAP explainability reports, POPIA compliance documentation, and EU AI Act risk classification.',
    deliverables: [
      'Algorithmic bias audit (Fairlearn)',
      'Plain-language XAI reports',
      'POPIA Article compliance checklist',
      'Board-ready governance PDF'
    ],
    techStack: [
      { icon: Shield, label: 'Fairlearn' },
      { icon: Lock, label: 'SHAP' },
      { icon: FileText, label: 'Compliance Docs' }
    ],
    platformConnection: 'Feeds into Governance Hub (Q1 2027)',
    price: 'from R45,000',
    meta: '3-4 weeks · Fixed scope'
  }
];

export function FullServicesGrid() {
  return (
    <section className="w-full bg-[var(--sg-surface)] py-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-6)]">
          {services.map((service, i) => (
            <div 
              key={i}
              className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)] flex flex-col"
            >
              <div className="text-label text-[var(--sg-text-4)] mb-2">{service.category}</div>
              <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">{service.title}</h3>
              <p className="font-sans text-[14px] text-[var(--sg-text-3)] leading-[1.65] mb-6">
                {service.desc}
              </p>
              
              <div className="mb-6 flex-1">
                <div className="font-sans text-[12px] font-semibold text-[var(--sg-text-1)] uppercase tracking-wider mb-3">What you get</div>
                <ul className="space-y-3">
                  {service.deliverables.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 font-sans text-[13px] text-[var(--sg-text-2)]">
                      <Check size={14} strokeWidth={1.5} aria-hidden="true" className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="font-sans text-[12px] font-semibold text-[var(--sg-text-1)] uppercase tracking-wider mb-3">Tech stack</div>
                <div className="flex flex-wrap gap-4">
                  {service.techStack.map((tech, k) => {
                    const Icon = tech.icon;
                    return (
                      <div key={k} className="flex items-center gap-2 font-sans text-[12px] text-[var(--sg-text-3)]">
                        <Icon size={14} strokeWidth={1.5} className="text-[var(--sg-text-4)]" />
                        {tech.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] rounded-[var(--r-md)] p-3 mb-6">
                <div className="font-sans text-[12px] font-semibold text-[var(--sg-blue)] mb-1">Platform connection</div>
                <div className="font-sans text-[12px] text-[var(--sg-text-2)]">{service.platformConnection}</div>
              </div>

              <div className="border-t border-[var(--sg-border)] pt-[var(--sp-5)] flex items-center justify-between mt-auto">
                <div>
                  <div className="font-mono text-[14px] font-medium text-[var(--sg-text-2)] mb-1">{service.price}</div>
                  <div className="font-sans text-[12px] text-[var(--sg-text-4)]">{service.meta}</div>
                </div>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[var(--sg-blue-border)] bg-transparent text-[var(--sg-blue)] hover:bg-[var(--sg-blue-glow)] hover:border-[var(--sg-blue)] transition-colors font-sans text-[13px] font-medium"
                >
                  <ExternalLink size={14} strokeWidth={1.8} />
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
