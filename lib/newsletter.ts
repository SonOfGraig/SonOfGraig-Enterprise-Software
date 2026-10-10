// sonofgraig Insights newsletter — server-side client for listmonk on the
// T110 (127.0.0.1:9000; never exposed). Every list is double opt-in: listmonk
// emails a confirmation link and only confirmed subscribers receive issues,
// which is the POPIA s69 evidence of consent for electronic direct marketing.
//
// Env (server only, in .env.production.local): LISTMONK_URL,
// LISTMONK_API_USER, LISTMONK_API_TOKEN.

import { NEWSLETTER_TOPIC_VALUES } from './forms/schemas';

export const NEWSLETTER_TOPICS = NEWSLETTER_TOPIC_VALUES;
export type NewsletterTopic = (typeof NEWSLETTER_TOPICS)[number];

/** Bump when the consent wording in NewsletterSignup changes. */
export const CONSENT_VERSION = 'newsletter-consent-v1 (2026-10-10)';

type Subscriber = { id: number; email: string; lists: { id: number; subscription_status: string }[] };

function config() {
  const url = process.env.LISTMONK_URL;
  const user = process.env.LISTMONK_API_USER;
  const token = process.env.LISTMONK_API_TOKEN;
  if (!url || !user || !token) throw new Error('newsletter not configured');
  return { url, auth: `token ${user}:${token}` };
}

async function lm<T>(method: string, path: string, body?: unknown): Promise<{ status: number; data?: T; message?: string }> {
  const { url, auth } = config();
  const res = await fetch(url + path, {
    method,
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  const json = (await res.json().catch(() => ({}))) as { data?: T; message?: string };
  return { status: res.status, data: json.data, message: json.message };
}

// Lists are found by tag (insights / platform / governance) so ids can change
// without a deploy. Cached for the life of the server process.
let listIds: Partial<Record<NewsletterTopic, number>> | null = null;
async function topicListIds(): Promise<Partial<Record<NewsletterTopic, number>>> {
  if (listIds) return listIds;
  const r = await lm<{ results: { id: number; tags: string[] }[] }>('GET', '/api/lists?per_page=all');
  if (!r.data) throw new Error(`listmonk lists: ${r.status} ${r.message ?? ''}`);
  const map: Partial<Record<NewsletterTopic, number>> = {};
  for (const l of r.data.results) for (const t of NEWSLETTER_TOPICS) if (l.tags.includes(t)) map[t] = l.id;
  listIds = map;
  return map;
}

async function findByEmail(email: string): Promise<Subscriber | undefined> {
  // listmonk's query is a SQL expression; the email is already validated, and
  // single quotes are doubled for safety.
  const q = encodeURIComponent(`subscribers.email = '${email.toLowerCase().replace(/'/g, "''")}'`);
  const r = await lm<{ results: Subscriber[] }>('GET', `/api/subscribers?per_page=1&query=${q}`);
  return r.data?.results[0];
}

export async function subscribeToNewsletter(input: {
  email: string;
  name?: string;
  topics: readonly NewsletterTopic[];
  source: string;
}): Promise<'created' | 'updated' | 'already-subscribed'> {
  const ids = await topicListIds();
  const target = input.topics.map((t) => ids[t]).filter((x): x is number => typeof x === 'number');
  if (target.length === 0) throw new Error('no matching newsletter lists');

  const email = input.email.trim().toLowerCase();
  const consent = { source: input.source, wording: CONSENT_VERSION, requested_at: new Date().toISOString(), topics: input.topics };

  const created = await lm<{ id: number }>('POST', '/api/subscribers', {
    email,
    name: input.name?.trim() || email.split('@')[0],
    status: 'enabled',
    lists: target,
    attribs: { consent },
    preconfirm_subscriptions: false, // listmonk sends the double opt-in email
  });
  if (created.status < 300) return 'created';
  if (created.status !== 409) throw new Error(`listmonk create: ${created.status} ${created.message ?? ''}`);

  // Already known: add only the lists they are not yet confirmed on, then
  // (re)send the opt-in email for those.
  const sub = await findByEmail(email);
  if (!sub) throw new Error('listmonk: existing subscriber not found');
  const confirmed = new Set(sub.lists.filter((l) => l.subscription_status === 'confirmed').map((l) => l.id));
  const missing = target.filter((id) => !confirmed.has(id));
  if (missing.length === 0) return 'already-subscribed';
  const add = await lm('PUT', '/api/subscribers/lists', { ids: [sub.id], action: 'add', target_list_ids: missing, status: 'unconfirmed' });
  if (add.status >= 300) throw new Error(`listmonk add lists: ${add.status} ${add.message ?? ''}`);
  const optin = await lm('POST', `/api/subscribers/${sub.id}/optin`);
  if (optin.status >= 300) throw new Error(`listmonk optin: ${optin.status} ${optin.message ?? ''}`);
  return 'updated';
}
