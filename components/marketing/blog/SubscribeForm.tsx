'use client';

// Client-Component shell for the build-updates subscribe form on the article
// page footer. The parent page is a Server Component (`app/(public)/blog/[slug]/page.tsx`)
// and Next 15 forbids passing function props (onSubmit, etc.) across the
// server→client boundary. Extracting the form here keeps the page server-rendered
// while letting the form retain client-side interactivity.

import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

export function SubscribeForm() {
  return (
    <form
      className="flex gap-2 mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to /api/forms when the build-updates list is provisioned.
      }}
    >
      <div className="flex-1">
        <Field type="email" placeholder="Email address" aria-label="Email address" />
      </div>
      <Button variant="primary">Subscribe</Button>
    </form>
  );
}
