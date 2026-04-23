'use client';

import * as React from 'react';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

export function ChangelogHero() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="pt-[var(--sp-20)] pb-[var(--sp-16)]">
      <div className="max-w-[1080px] mx-auto px-8 text-center">
        <div className="text-label text-[var(--sg-blue)] mb-2">PUBLIC BUILD LOG</div>
        <h1 className="text-h1 text-[var(--sg-text-1)] mb-6">What we shipped, every week.</h1>
        <p className="font-sans text-[16px] text-[var(--sg-text-3)] max-w-[600px] mx-auto mb-[var(--sp-10)]">
          We build in public. Every engineering decision, every shipped feature, every pivot documented here. Subscribe to follow the build.
        </p>

        <div className="max-w-[400px] mx-auto">
          {subscribed ? (
            <div className="bg-[var(--sg-success-bg)] border border-[var(--sg-success-bd)] text-[var(--sg-success)] rounded-[var(--r-md)] p-3 font-sans text-[14px]">
              Thanks for subscribing! We&apos;ll keep you updated.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 text-left">
                <Field 
                  type="email" 
                  placeholder="Email address" 
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="primary" loading={loading}>
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
