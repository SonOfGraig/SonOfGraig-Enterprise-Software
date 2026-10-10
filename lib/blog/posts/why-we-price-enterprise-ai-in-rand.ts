import type { Post } from '../types';
import { TUMISO } from '../types';

const post: Post = {
  slug: 'why-we-price-enterprise-ai-in-rand',
  title: 'Why We Price Enterprise AI in Rand, Not Dollars',
  seoDescription: 'Why sonofgraig prices enterprise AI in rand instead of dollars: what FX risk does to software budgets, and why local pricing is a design decision.',
  excerpt:
    'USD-denominated SaaS quietly transfers currency risk onto South African buyers. Pricing in rand is not a marketing gimmick — it is a structural decision about who carries the FX exposure.',
  category: 'Strategy',
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  readingTime: 6,
  author: TUMISO,
  primaryKeyword: 'ZAR-priced enterprise software',
  keywords: [
    'ZAR pricing SaaS',
    'FX risk enterprise software',
    'rand-denominated SaaS',
    'South African software procurement',
    'no FX exposure',
  ],
  heroComposition: 'BlogHeroGeneric',
  heroAlt:
    'sonofgraig Insights cover on pricing enterprise AI in rand rather than dollars, over a blue node-lattice motif.',
  bodyHtml: `
    <p class="lede">Most enterprise software sold in South Africa is priced in US dollars. The invoice may arrive in rand, but the number is pegged to a dollar figure and re-converted every cycle. That arrangement looks neutral and is not: it silently moves currency risk from the vendor — who could hedge it — onto the customer, who usually cannot. Pricing in rand reverses that. This is why we do it.</p>

    <h2 id="who-carries-fx">The hidden question in every USD invoice: who carries the FX risk?</h2>
    <p class="answer-block">When software is priced in dollars, the South African buyer absorbs every movement in the ZAR/USD exchange rate. A budget signed in January can be 10–15% more expensive by June without a single line item changing, purely on currency. Rand-denominated pricing moves that exposure to the vendor, who is far better placed to manage it. The buyer gets a number they can put in a budget and trust for the year.</p>
    <p>This matters most for the people who approve software, not the people who use it. A CFO cannot forecast a cost that floats with the currency. An unpredictable line item is a reason to delay or decline adoption — which is why FX-indexed pricing quietly suppresses enterprise software adoption across the continent.</p>

    <h2 id="margin-leak">A 5% rand move is a margin event</h2>
    <p>For a business buying USD-priced tooling, every adverse 5% move in the rand is an unbudgeted increase that lands straight on the operating line. Over a year of normal currency volatility, that can swing a software budget by double digits. The vendor experiences none of this; the customer experiences all of it. Calling the price "global" does not make the risk disappear — it just assigns it to whoever is weakest at managing it.</p>

    <h2 id="not-a-discount">Rand pricing is not a discount — it is a risk transfer</h2>
    <p>It is worth being precise: pricing in rand does not necessarily make software cheaper in absolute terms. What it does is remove variance. The customer trades the possibility of a favourable currency swing for the certainty of a fixed cost. For enterprise procurement, certainty is worth more than the lottery ticket — budgets are annual, and a predictable cost is one you can actually approve.</p>

    <h2 id="local-everything">Why this fits the rest of our architecture</h2>
    <p>Rand pricing is one expression of a broader thesis: software built for South African conditions should remove South African frictions rather than import foreign ones. The same logic drives designing for in-region hosting, such as AWS af-south-1 (covered in <a href="/blog/aws-af-south-1-data-residency">the residency explainer</a>) and POPIA-native compliance (in <a href="/blog/popia-sections-11-19-72-and-ai-architecture">the POPIA deep-dive</a>). Currency, residency, and compliance are the three frictions foreign SaaS imposes by default; addressing all three is the point of building locally.</p>

    <h2 id="how-we-price">How our pricing works</h2>
    <p>Our subscriptions are quoted and billed in rand, with no dollar peg and no FX surcharge. During early access each plan is quoted on a call; what each tier includes, and our published fixed-scope service prices, are on <a href="/pricing">the pricing page</a>. The strategic frame behind the whole platform is in <a href="/blog/why-africa-needs-its-own-enterprise-ai-platform">the pillar essay</a>.</p>
  `,
};

export default post;
