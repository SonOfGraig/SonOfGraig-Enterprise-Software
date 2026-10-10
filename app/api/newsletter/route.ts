import { createFormHandler } from '@/lib/forms/handler';
import { newsletterSchema } from '@/lib/forms/schemas';
import { subscribeToNewsletter } from '@/lib/newsletter';

// Same protections as the other forms: body cap, rate limit, validation,
// honeypot and Turnstile (lib/forms/handler.ts). listmonk then sends the
// double opt-in confirmation email.
export const POST = createFormHandler(newsletterSchema, (s) =>
  subscribeToNewsletter({ email: s.email, name: s.name, topics: s.topics, source: s.source }),
);
export const runtime = 'nodejs';
