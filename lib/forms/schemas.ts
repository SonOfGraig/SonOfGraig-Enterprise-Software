import { z } from 'zod';

// Validation schemas mirror the legacy HTML form fields exactly.
// Server validation is the authoritative gate — the legacy HTML has only
// HTML5 `required` attributes, no client-side validator.
//
// SECURITY: every free-text field is run through `safeText` which strips
// control characters (CR/LF/NUL etc) before validation. This neutralises
// email-header-injection attempts (e.g. a name like "Tumiso\r\nBcc: ev@l")
// even though Resend's API would also reject them server-side.

const CONTROL_CHARS = /[\x00-\x08\x0B-\x1F\x7F]/g;
const safeText = (s: unknown) =>
  typeof s === 'string' ? s.replace(CONTROL_CHARS, '').trim() : s;

const emailField = z
  .preprocess(safeText, z.string())
  .pipe(z.string().min(1, 'Email is required').email('Invalid email address').max(254));

const nameField = z
  .preprocess(safeText, z.string())
  .pipe(z.string().min(2, 'Minimum 2 characters').max(120));

const companyField = z
  .preprocess(safeText, z.string())
  .pipe(z.string().min(2, 'Minimum 2 characters').max(200));

const phoneField = z
  .preprocess(safeText, z.string())
  .pipe(z.string().max(40))
  .optional()
  .default('');

const shortText = (max = 120) =>
  z.preprocess(safeText, z.string()).pipe(z.string().max(max));

const longText = (min: number, max: number, label: string) =>
  z
    .preprocess(safeText, z.string())
    .pipe(z.string().min(min, `${label} must be at least ${min} characters`).max(max));

const honeypotField = z.string().max(0, 'Honeypot triggered').optional().default('');
const turnstileField = z.string().min(1).max(2048).optional();

// ───────────────────────────────────────────────────────────────────────
// Early-access form (legacy id="applyForm")
// ───────────────────────────────────────────────────────────────────────
export const earlyAccessSchema = z.object({
  name: nameField,
  role: z
    .preprocess(safeText, z.string())
    .pipe(z.string().min(2, 'Role is required').max(120)),
  email: emailField,
  phone: phoneField,
  company: companyField,
  sector: shortText(120).pipe(z.string().min(1, 'Sector is required')),
  size: shortText(120).pipe(z.string().min(1, 'Organisation size is required')),
  idp: shortText(120).optional().default(''),
  clusters: z
    .array(shortText(40))
    .min(1, 'Pick at least one cluster of interest')
    .max(6),
  usecase: longText(30, 5000, 'Use case description'),
  timeline: shortText(120).optional().default(''),
  consent: z.literal(true, { message: 'POPIA consent is required' }),
  nda: z.boolean().optional().default(false),
  hp: honeypotField,
  turnstileToken: turnstileField,
});

// ───────────────────────────────────────────────────────────────────────
// Contact form (legacy id="contactForm")
// ───────────────────────────────────────────────────────────────────────
export const TOPIC_VALUES = [
  'sales',
  'service-rag',
  'service-agent',
  'service-cloud',
  'service-popia',
  'service-data',
  'support',
  'popia',
  'security',
  'partner',
  'press',
  'careers',
  'other',
] as const;

export const contactSchema = z.object({
  name: nameField,
  company: companyField,
  email: emailField,
  phone: phoneField,
  topic: z.enum(TOPIC_VALUES, { message: 'Please pick a topic' }),
  tier: shortText(120).optional().default(''),
  message: longText(30, 5000, 'Message'),
  consent: z.literal(true, { message: 'POPIA consent is required' }),
  newsletter: z.boolean().optional().default(false),
  hp: honeypotField,
  turnstileToken: turnstileField,
});

// ───────────────────────────────────────────────────────────────────────
// Waitlist (kept for future use on cluster pages)
// ───────────────────────────────────────────────────────────────────────
export const waitlistSchema = z.object({
  name: nameField,
  email: emailField,
  company: companyField,
  cluster: z.string().min(1).max(80).optional(),
  consent: z.literal(true, { message: 'POPIA consent is required' }),
  hp: honeypotField,
  turnstileToken: turnstileField,
});

export type EarlyAccessSubmission = z.infer<typeof earlyAccessSchema>;
export type ContactSubmission = z.infer<typeof contactSchema>;
export type WaitlistSubmission = z.infer<typeof waitlistSchema>;
export type ContactTopic = (typeof TOPIC_VALUES)[number];
