'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { RevealSection, revealVariants } from '@/components/ui/RevealSection';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const services = [
  {
    category: 'AI & Intelligence',
    title: 'AI Agent Implementation',
    slug: 'ai-agent-implementation',
    desc: 'Design, build, and deploy autonomous AI agents using LangGraph and Composio — the same stack powering our future Agent Builder product.',
    features: [
      'Agent workflow design',
      '200+ tool integrations',
      'Full execution trace + audit',
      'Human-in-the-loop gates'
    ],
    price: 'from R95,000',
    meta: '6-8 weeks · Fixed scope'
  },
  {
    category: 'AI & Intelligence',
    title: 'RAG Knowledge Base Setup',
    slug: 'rag-knowledge-base-setup',
    desc: 'Connect your company documents to AI. Ingestion pipeline, hybrid retrieval, evaluation framework, and chat interface.',
    features: [
      'Google Drive, SharePoint, Notion connectors',
      'Hybrid semantic + keyword retrieval',
      'Source citation in every answer',
      'Ragas quality evaluation'
    ],
    price: 'from R65,000',
    meta: '4-6 weeks · Fixed scope'
  },
  {
    category: 'Infrastructure',
    title: 'Cloud Architecture & DevOps',
    slug: 'cloud-architecture',
    desc: 'Zero-trust cloud setup, Kubernetes, CI/CD pipelines, and observability stacks. POPIA-compliant from day one.',
    features: [
      'Terraform IaC',
      'Kubernetes + Helm',
      'GitHub Actions CI/CD',
      'Prometheus + Grafana'
    ],
    price: 'from R120,000',
    meta: '6-10 weeks · Fixed scope'
  },
  {
    category: 'Compliance',
    title: 'AI Governance & Ethics Audit',
    slug: 'ai-governance-audit',
    desc: 'Bias detection, SHAP explainability reports, POPIA compliance documentation, and EU AI Act risk classification.',
    features: [
      'Algorithmic bias audit (Fairlearn)',
      'Plain-language XAI reports',
      'POPIA Article compliance checklist',
      'Board-ready governance PDF'
    ],
    price: 'from R45,000',
    meta: '3-4 weeks · Fixed scope'
  }
];

export function ServicesGrid() {
  return (
    <section className="w-full bg-[var(--sg-surface)] py-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        
        <div className="mb-[var(--sp-8)]">
          <div className="text-label text-[var(--sg-text-4)] mb-2">AVAILABLE NOW</div>
          <h2 className="text-h2 text-[var(--sg-text-1)] mb-3">Expert delivery while the platform is built</h2>
          <p className="font-sans text-[14px] text-[var(--sg-text-3)] max-w-[600px]">
            Every project follows the same architecture as the future platform. Fixed scope. Fixed price. Defined outcome.
          </p>
        </div>

        <RevealSection className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-4)]">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              variants={revealVariants.child}
              className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col"
            >
              <div className="text-label text-[var(--sg-text-4)] mb-2">{service.category}</div>
              <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">{service.title}</h3>
              <p className="font-sans text-[13px] text-[var(--sg-text-3)] leading-[1.65] mb-6">
                {service.desc}
              </p>
              
              <ul className="space-y-3 mb-6 flex-1">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 font-sans text-[13px] text-[var(--sg-text-2)]">
                    <div className="w-[4px] h-[4px] rounded-full bg-[var(--sg-blue)] mt-[7px] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-[var(--sg-border)] pt-[var(--sp-4)] mt-[var(--sp-5)] flex items-center justify-between">
                <div>
                  <div className="font-mono text-[13px] font-medium text-[var(--sg-text-2)] mb-1">{service.price}</div>
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
            </motion.div>
          ))}
        </RevealSection>

        {/* CALLOUT */}
        <motion.div 
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="status" 
          className="bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] rounded-[var(--r-lg)] p-[var(--sp-5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-[var(--sp-8)]"
        >
          <div>
            <div className="font-sans text-[14px] font-semibold text-[var(--sg-blue)] mb-1">Platform founding credit</div>
            <p className="font-sans text-[13px] text-[var(--sg-text-2)] max-w-[600px] leading-relaxed">
              Every project client receives free early access when the platform ships. Your implementation becomes a platform template.
            </p>
          </div>
          <Button variant="primary" size="md" className="shrink-0" asChild>
            <Link href="/contact">Start a project</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
