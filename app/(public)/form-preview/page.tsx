import { notFound } from 'next/navigation';
import { FormSuccess } from '@/components/marketing/forms/FormSuccess';

// Development-only: every form's success state side by side. 404 in production.
export const metadata = { robots: { index: false } };

export default function FormPreview() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <main className="mx-auto grid max-w-[1100px] gap-[var(--sp-10)] px-4 py-[var(--sp-16)]">
      <FormSuccess
        status="Application received"
        title="Thanks, Naledi. You're on Tumiso's desk."
        body="Your early-access application goes to our founder personally — not a queue or a CRM bot."
        steps={[
          { title: 'Read personally', body: 'Tumiso reviews your use case and the clusters you picked.' },
          { title: 'A reply within 2 business days', body: "A discovery-call slot, or honest feedback if it isn't the right fit." },
          { title: "Straight talk on what's live", body: "If a cluster you chose is still planned, we'll say exactly what exists today." },
        ]}
        email="naledi@example.co.za"
        actions={[
          { label: 'Read Insights while you wait', href: '/blog' },
          { label: 'Explore the platform', href: '/platform' },
        ]}
      />
      <div className="max-w-[520px]">
        <FormSuccess
          compact
          status="Check your inbox"
          title="One step left — confirm by email."
          body="We've sent you a confirmation link. You're only subscribed once you tap it."
          email="sipho@example.co.za"
        />
      </div>
    </main>
  );
}
