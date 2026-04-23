'use client';

import * as React from 'react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

export function InformationOfficerSection() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="information-officer" className="w-full bg-[var(--sg-surface)] py-[var(--sp-12)] border-y border-[var(--sg-border)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--sp-8)]">
          
          {/* LEFT: Info Officer Details */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm flex flex-col">
            <h2 className="text-h2 text-[var(--sg-text-1)] mb-[var(--sp-6)]">Information Officer</h2>
            <p className="text-body text-[var(--sg-text-3)] mb-[var(--sp-8)]">
              For any questions regarding this POPIA statement or to exercise your rights as a data subject, please contact our designated Information Officer.
            </p>
            
            <div className="space-y-6 flex-1">
              <div>
                <div className="text-label text-[var(--sg-text-4)] mb-1">NAME</div>
                <div className="font-mono text-[14px] text-[var(--sg-text-1)]">Graig Son</div>
              </div>
              <div>
                <div className="text-label text-[var(--sg-text-4)] mb-1">TITLE</div>
                <div className="font-mono text-[14px] text-[var(--sg-text-1)]">Chief Executive Officer & Information Officer</div>
              </div>
              <div>
                <div className="text-label text-[var(--sg-text-4)] mb-1">EMAIL</div>
                <a href="mailto:privacy@sonofgraig.com" className="font-mono text-[14px] text-[var(--sg-blue)] hover:underline">privacy@sonofgraig.com</a>
              </div>
              <div>
                <div className="text-label text-[var(--sg-text-4)] mb-1">PHONE</div>
                <div className="font-mono text-[14px] text-[var(--sg-text-1)]">+27 (0) 21 000 0000</div>
              </div>
            </div>

            <div className="mt-[var(--sp-8)] pt-[var(--sp-6)] border-t border-[var(--sg-border)]">
              <div className="text-label text-[var(--sg-text-4)] mb-1">RESPONSE TIME COMMITMENT</div>
              <div className="font-mono text-[13px] text-[var(--sg-success)]">10 business days for all POPIA requests</div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
            <h2 className="text-h2 text-[var(--sg-text-1)] mb-[var(--sp-6)]">Submit a POPIA request</h2>
            
            {submitted ? (
              <div className="bg-[var(--sg-success-bg)] border border-[var(--sg-success-bd)] text-[var(--sg-success)] rounded-[var(--r-md)] p-6 text-center">
                <h3 className="font-sans font-semibold mb-2">Request Submitted</h3>
                <p className="text-[14px]">We have received your POPIA request. Our Information Officer will respond within 10 business days.</p>
                <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>Submit another request</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" required placeholder="Jane Doe" />
                  <Field label="Email address" type="email" required placeholder="jane@example.com" />
                </div>
                
                <Field label="Request type" type="select" required>
                  <option value="">Select a request type</option>
                  <option value="access">Right to access</option>
                  <option value="correction">Right to correction</option>
                  <option value="deletion">Right to deletion</option>
                  <option value="objection">Right to object</option>
                  <option value="portability">Right to data portability</option>
                  <option value="other">Other POPIA inquiry</option>
                </Field>

                <Field 
                  label="Description" 
                  type="textarea" 
                  required 
                  placeholder="Please provide details about your request..."
                  rows={4}
                />

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                    Submit request
                  </Button>
                </div>
                <p className="text-caption text-[var(--sg-text-4)] text-center mt-4">
                  By submitting this form, you consent to us processing your data to fulfill this request.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
