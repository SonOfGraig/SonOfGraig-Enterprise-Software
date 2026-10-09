import { createFormHandler } from '@/lib/forms/handler';
import { waitlistSchema } from '@/lib/forms/schemas';
import { sendWaitlistEmails } from '@/lib/forms/email';

export const POST = createFormHandler(waitlistSchema, sendWaitlistEmails);
export const runtime = 'nodejs';
