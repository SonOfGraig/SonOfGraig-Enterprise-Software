'use client';

import * as React from 'react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export function TwoPathSection() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const earlyAccessBenefits = [
    'First year 70% discounted',
    'Direct access to the founding team',
    'Your use case shapes the product features',
    'Dedicated Slack channel for support'
  ];

  return (
    <section className="w-full pb-[var(--sp-20)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--sp-6)] items-start">
          
          {/* LEFT: Project Inquiry Form */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] border-t-4 border-t-[var(--sg-blue)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
            <h2 className="text-h2 text-[var(--sg-text-1)] mb-3">Start a project</h2>
            <p className="text-body text-[var(--sg-text-3)] mb-[var(--sp-8)]">
              Tell us your challenge. We scope, price, and deliver it as a fixed-scope project. Most engagements start within two weeks.
            </p>

            {submitted ? (
              <div className="bg-[var(--sg-success-bg)] border border-[var(--sg-success-bd)] text-[var(--sg-success)] rounded-[var(--r-md)] p-6 text-center">
                <h3 className="font-sans font-semibold mb-2">Enquiry Sent</h3>
                <p className="text-[14px]">We&apos;ll review your challenge and get back to you within 24 hours to schedule a scoping call.</p>
                <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>Send another enquiry</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full name" required placeholder="Jane Doe" />
                  <Field label="Work email" type="email" required placeholder="jane@company.com" />
                </div>
                
                <Field label="Company" required placeholder="Acme Corp" />
                
                <Field label="Service needed" type="select" required>
                  <option value="">Select a service</option>
                  <option value="ai-agents">AI agents</option>
                  <option value="rag">RAG knowledge base</option>
                  <option value="cloud">Cloud architecture</option>
                  <option value="governance">AI governance</option>
                  <option value="analytics">Data analytics</option>
                  <option value="other">Other</option>
                </Field>

                <Field label="Budget range" type="select" required>
                  <option value="">Select a budget range</option>
                  <option value="50k-100k">R50K - R100K</option>
                  <option value="100k-250k">R100K - R250K</option>
                  <option value="250k+">R250K+</option>
                  <option value="not-sure">Not sure yet</option>
                </Field>

                <Field 
                  label="Brief description of challenge" 
                  type="textarea" 
                  required 
                  placeholder="What are you trying to solve?"
                  rows={4}
                />

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Send enquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Stacked Cards */}
          <div className="flex flex-col gap-[var(--sp-6)]">
            
            {/* TOP: Early Access */}
            <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] border-t-4 border-t-[var(--sg-amber)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
              <h2 className="text-h2 text-[var(--sg-text-1)] mb-6">Apply for early access</h2>
              <ul className="space-y-3 mb-8">
                {earlyAccessBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} strokeWidth={2} className="text-[var(--sg-success)] shrink-0 mt-[2px]" />
                    <span className="font-sans text-[14px] text-[var(--sg-text-2)]">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="cta" size="lg" fullWidth asChild>
                <Link href="/early-access">Apply now</Link>
              </Button>
            </div>

            {/* BOTTOM: Office Info */}
            <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
              <h2 className="text-h3 text-[var(--sg-text-1)] mb-6">Office & Contact</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-label text-[var(--sg-text-4)] mb-2">PRETORIA</div>
                  <address className="font-sans text-[14px] text-[var(--sg-text-2)] not-italic leading-relaxed">
                    Menlyn Corporate Park<br />
                    Block C, 1st Floor<br />
                    Pretoria, 0081
                  </address>
                </div>
                <div>
                  <div className="text-label text-[var(--sg-text-4)] mb-2">JOHANNESBURG</div>
                  <address className="font-sans text-[14px] text-[var(--sg-text-2)] not-italic leading-relaxed">
                    The Firs, Rosebank<br />
                    Biermann Avenue<br />
                    Johannesburg, 2196
                  </address>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-[var(--sg-border)]">
                <div>
                  <div className="text-label text-[var(--sg-text-4)] mb-1">GENERAL ENQUIRIES</div>
                  <a href="mailto:hello@sonofgraig.com" className="font-mono text-[14px] text-[var(--sg-blue)] hover:underline">hello@sonofgraig.com</a>
                </div>
                <div>
                  <div className="text-label text-[var(--sg-text-4)] mb-1">SUPPORT</div>
                  <a href="mailto:support@sonofgraig.com" className="font-mono text-[14px] text-[var(--sg-blue)] hover:underline">support@sonofgraig.com</a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--sg-border)]">
                <div className="text-label text-[var(--sg-text-4)] mb-1">RESPONSE TIME COMMITMENT</div>
                <div className="font-mono text-[13px] text-[var(--sg-success)]">Within 24 hours for all enquiries</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
