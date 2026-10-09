import { createFormHandler } from '@/lib/forms/handler';
import { contactSchema } from '@/lib/forms/schemas';
import { sendContactEmails } from '@/lib/forms/email';

export const POST = createFormHandler(contactSchema, sendContactEmails);
export const runtime = 'nodejs';
