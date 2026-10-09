import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'services-to-saas-agency-to-platform',
  title: 'From Services to SaaS: How an Agency Becomes a Platform Company',
  excerpt:
    'Productising a services business is the hardest transition in software. Here is the model we are executing — using client delivery as the R&D pipeline for the platform, not a distraction from it.',
  category: 'Transition',
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  readingTime: 7,
  author: TUMISO,
  primaryKeyword: 'services to SaaS transition',
  keywords: [
    'agency to product company',
    'productizing services',
    'services-led SaaS',
    'platform company transition',
    'consulting to software',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover on the transition from a services agency to a SaaS platform company, over a blue node-lattice motif.',
  bodyHtml: `
    <p class="lede">The transition from a services business to a product company is the one most agencies talk about and few complete. The gravity of billable hours is strong, the product never feels finished, and the two business models reward opposite behaviours. This is the model we are using to make the jump — and the specific way client delivery feeds the platform rather than competing with it.</p>

    <h2 id="why-hard">Why the transition usually fails</h2>
    <p class="answer-block">Services and products reward opposite instincts. Services optimise for billable utilisation and bespoke delivery; products optimise for repeatability and saying no to one-off requests. Most agencies fail the transition because they try to run both with the same incentives, and the high-margin, urgent services work always wins the calendar over the slow, uncertain product work. The product becomes a side project that never ships.</p>

    <h2 id="the-pipeline">Delivery as the R&D pipeline</h2>
    <p>Our resolution is to treat client delivery as the product's research pipeline, not a distraction from it. Every services engagement is scoped so that what we build becomes a template in the platform. A RAG knowledge base we ship for a client becomes a pattern in <a href="/platform/ai-dev-platform">RAG Studio</a>. An agent we build becomes a template in Agent Builder. A governance audit becomes a check in the Governance Hub. The client gets production software now; the platform gets a battle-tested pattern.</p>
    <p>This only works if the delivery work is deliberately generalised. A one-off integration that solves one client's problem teaches the platform nothing. The discipline is to build each engagement as the specific instance of a general capability — and to charge for the instance while keeping the generalisation.</p>

    <h2 id="three-phases">The three-phase shape</h2>
    <p>The transition runs in three overlapping phases. <strong>Phase 1 — services-funded:</strong> delivery pays the bills and generates the patterns. <strong>Phase 2 — hybrid:</strong> the platform ships in clusters, early customers adopt, services clients become the first platform users with free early access. <strong>Phase 3 — platform-led:</strong> recurring software revenue compounds while services becomes the high-touch enterprise on-ramp rather than the core business. The cluster build schedule lives on the public <a href="/roadmap">roadmap</a>.</p>

    <h2 id="compounding">Why the platform model compounds and services does not</h2>
    <p class="answer-block">Services revenue is linear: it scales with headcount, and every rand of revenue costs roughly the same amount of human time to produce. Platform revenue compounds: once a capability ships, each new customer costs almost nothing to serve, and improvements made for one customer benefit all of them. The whole point of the transition is to move from a business whose growth is capped by hours to one whose growth is not.</p>

    <h2 id="honesty">The honest tradeoff</h2>
    <p>This model is slower than a pure-product raise-and-build approach, because services delivery competes for the same engineering time that builds the platform. We accept that tradeoff deliberately: the patterns the platform ships are ones that have already survived a paying client and a compliance review, which is a different quality bar from features built against a roadmap in isolation. Slower, but grounded.</p>

    <h2 id="read-more">Where this goes</h2>
    <p>The full strategic frame — why this is being built from inside South Africa, for South African conditions — is in <a href="/blog/why-africa-needs-its-own-enterprise-ai-platform">the pillar essay</a>, and the thesis, founder background, and operating principles are on <a href="/about">the about page</a>.</p>
  `,
};

export default post;
