import { createFormHandler } from '@/lib/forms/handler';
import { earlyAccessSchema } from '@/lib/forms/schemas';
import { sendEarlyAccessEmails } from '@/lib/forms/email';

export const POST = createFormHandler(earlyAccessSchema, sendEarlyAccessEmails);
export const runtime = 'nodejs';
