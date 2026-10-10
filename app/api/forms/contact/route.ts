import { createFormHandler } from '@/lib/forms/handler';
import { contactSchema } from '@/lib/forms/schemas';
import { sendContactEmails } from '@/lib/forms/email';
import { subscribeToNewsletter } from '@/lib/newsletter';

// The enquiry is the priority: if the newsletter tick-box was checked, the
// subscription (double opt-in) is attempted afterwards and never fails the
// enquiry.
export const POST = createFormHandler(contactSchema, async (s) => {
  const ids = await sendContactEmails(s);
  if (s.newsletter) {
    try {
      await subscribeToNewsletter({ email: s.email, name: s.name, topics: ['insights'], source: 'contact-form' });
    } catch (err) {
      console.error('[newsletter] contact-form subscription failed', err instanceof Error ? err.message : err);
    }
  }
  return ids;
});
export const runtime = 'nodejs';
