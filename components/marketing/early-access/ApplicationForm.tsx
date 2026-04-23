'use client';

import { useState } from 'react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
    challenge: '',
    success: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name' || field === 'company') {
      if (value.trim().length < 2) error = 'Minimum 2 characters required';
    } else if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Valid email required';
    } else if (field === 'role' || field === 'industry') {
      if (!value) error = 'Please select an option';
    } else if (field === 'challenge') {
      if (value.trim().length < 50) error = 'Minimum 50 characters required';
    } else if (field === 'success') {
      if (value.trim().length < 10) error = 'Please provide more detail';
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field: keyof typeof formData) => {
    validateField(field, formData[field]);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = Object.keys(formData).every(field => 
      validateField(field, formData[field as keyof typeof formData])
    );

    if (!isValid) return;

    setStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-[1080px] mx-auto px-8 py-[var(--sp-16)]">
        <Callout 
          variant="success" 
          label="Application received" 
          body="We will contact you within 2 business days. No commitment required." 
        />
      </div>
    );
  }

  return (
    <section id="application-form" className="w-full py-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[var(--sp-8)]">
          
          {/* FORM (left) */}
          <div className="bg-[var(--sg-surface)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-8)]">
            <h2 className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-6)]">Apply for early access</h2>
            
            {status === 'error' && (
              <div className="mb-6">
                <Callout 
                  variant="danger" 
                  label="Submission failed" 
                  body="Please try again or email us directly." 
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Full name"
                  type="text"
                  aria-required="true"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                />
                <Field
                  label="Work email"
                  type="email"
                  aria-required="true"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                />
              </div>

              <Field
                label="Company name"
                type="text"
                aria-required="true"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                onBlur={() => handleBlur('company')}
                error={errors.company}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  as="select"
                  label="Role/title"
                  aria-required="true"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  onBlur={() => handleBlur('role')}
                  error={errors.role}
                  options={[
                    { label: 'CTO', value: 'CTO' },
                    { label: 'Head of Engineering', value: 'Head of Engineering' },
                    { label: 'VP Product', value: 'VP Product' },
                    { label: 'Data Lead', value: 'Data Lead' },
                    { label: 'Other', value: 'Other' }
                  ]}
                />
                <Field
                  as="select"
                  label="Industry"
                  aria-required="true"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  onBlur={() => handleBlur('industry')}
                  error={errors.industry}
                  options={[
                    { label: 'Financial services', value: 'Financial services' },
                    { label: 'Healthcare', value: 'Healthcare' },
                    { label: 'Government', value: 'Government' },
                    { label: 'Legal', value: 'Legal' },
                    { label: 'Retail', value: 'Retail' },
                    { label: 'Other', value: 'Other' }
                  ]}
                />
              </div>

              <Field
                as="textarea"
                label="What is the primary AI challenge you want to solve?"
                description="Minimum 50 characters. This helps us assess fit."
                aria-required="true"
                value={formData.challenge}
                onChange={(e) => handleChange('challenge', e.target.value)}
                onBlur={() => handleBlur('challenge')}
                error={errors.challenge}
              />

              <Field
                as="textarea"
                label="What does success look like in 12 months?"
                aria-required="true"
                value={formData.success}
                onChange={(e) => handleChange('success', e.target.value)}
                onBlur={() => handleBlur('success')}
                error={errors.success}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  fullWidth 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit application'}
                </Button>
              </div>
            </form>
          </div>

          {/* DETAILS PANEL (right) */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] h-fit relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[var(--sg-blue)]" />
            <h3 className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-6)] mt-2">What to expect</h3>
            
            <ol className="space-y-6 mb-[var(--sp-8)]">
              {[
                { title: 'Application review', desc: 'Within 2 business days' },
                { title: 'Discovery call', desc: '30 minute technical fit assessment' },
                { title: 'Co-development agreement', desc: 'Scope and commitments defined' },
                { title: 'Platform access', desc: 'Onboarding to the early access environment' }
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--sg-surface-2)] text-[var(--sg-text-2)] font-mono text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-sans text-[14px] font-semibold text-[var(--sg-text-1)]">{step.title}</div>
                    <div className="font-sans text-[13px] text-[var(--sg-text-3)]">{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>

            <Callout 
              variant="info" 
              label="No commitment required" 
              body="until the co-development agreement is signed." 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
