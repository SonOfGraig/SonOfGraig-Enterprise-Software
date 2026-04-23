'use client';

import { useState } from 'react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function WaitlistForm() {
  const reduced = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = '';
    if (field === 'name' || field === 'company') {
      if (value.trim().length < 2) {
        error = 'Minimum 2 characters required';
      }
    } else if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Valid email required';
      }
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
    
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isCompanyValid = validateField('company', formData.company);

    if (!isNameValid || !isEmailValid || !isCompanyValid) {
      return;
    }

    setStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[520px] mx-auto bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] rounded-[var(--r-2xl)] p-[var(--sp-8)]"
      >
        <Callout 
          variant="success" 
          label="Application received" 
          body="We will contact you within 2 business days. No commitment required." 
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98, boxShadow: '0 0 0 0 rgba(11, 158, 222, 0)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, boxShadow: ['0 0 0 0 rgba(11, 158, 222, 0)', '0 0 20px 2px rgba(11, 158, 222, 0.3)', '0 0 0 0 rgba(11, 158, 222, 0)'] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], boxShadow: { duration: 1, delay: 0.2, ease: "easeInOut" } }}
      className="max-w-[520px] mx-auto bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] rounded-[var(--r-2xl)] p-[var(--sp-8)]"
    >
      <h2 className="font-display font-semibold text-[22px] text-[var(--sg-blue)] mb-2">
        Join the early access list
      </h2>
      <p className="font-sans text-[14px] text-[var(--sg-text-3)] mb-[var(--sp-5)]">
        We are accepting a limited number of early access customers who will co-shape the platform and receive the first year at a significantly reduced rate.
      </p>

      {status === 'error' && (
        <div className="mb-4">
          <Callout 
            variant="danger" 
            label="Submission failed" 
            body="Please try again or email us directly." 
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Your name"
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
        <Field
          label="Company name"
          type="text"
          aria-required="true"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          onBlur={() => handleBlur('company')}
          error={errors.company}
        />

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth 
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Request early access'}
          </Button>
        </div>
      </form>

      <p className="font-sans text-[11px] text-[var(--sg-text-4)] text-center mt-6">
        We will contact you within 2 business days. No commitment required.
      </p>
    </motion.div>
  );
}
