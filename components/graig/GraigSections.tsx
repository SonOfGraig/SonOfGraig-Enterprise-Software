import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/fx/Reveal';
import { Magnetic } from '@/components/fx/Magnetic';
import { WordReveal } from '@/components/fx/WordReveal';
import { cn } from '@/lib/utils';
import { graig, longDate } from '@/lib/graig/data';
import { GraigMark, MergeSteps, OrbStates } from './GraigChrome';
import { Ledger, Receipts, RunLog, Seals } from './GraigExperiences';
import { FAQ } from '@/components/ui/FAQ';
import { GRAIG_FAQ } from './faq';

// Graig's page — graig.sonofgraig.com. About Graig only.
// Layout and motion take their lead from the Sunset 3-D landing page (C:\sunset-3d):
// the page ground is one WebGL canvas, every section has its own real-time scene,
// labels are pinned to 3-D points. Every surface on top is a sonofgraig v3.1
// primitive. Content rule: Live is live today; Building / Next are marked as such.

const NIGHT = '#070810';
const NIGHT_2 = '#0A0C10';
const PAPER = '#FFFFFF';
const PAPER_2 = '#F8F9FB';

/** A section of his page: its ground colour is painted by the stage (CSS fallback without WebGL). */
function G({
  id, ground, dark, blend = 0, lines = 0, className, children,
}: { id?: string; ground: string; dark?: boolean; blend?: number; lines?: number; className?: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      data-ground={ground}
      data-blend={blend || undefined}
      data-lines={lines || undefined}
      data-theme={dark ? 'dark' : 'light'}
      className={cn('g-sec relative', className)}
      style={{ ['--g-ground' as string]: ground }}
    >
      {children}
    </section>
  );
}

function Draft({ on }: { on: boolean }) {
  return on ? <Badge variant="amber" className="ml-2 align-middle">Draft, not approved</Badge> : null;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-label text-[var(--sg-blue)]">{children}</p>;
}

/** The hero's second button goes to the first section that is live on this build:
 *  drafts are hidden in production until Tumiso approves them. */
export const SECOND = graig.demo
  ? { href: '#work', label: 'Watch him work' }
  : graig.changelog.length
    ? { href: '#changelog', label: 'Read his log' }
    : { href: '#original', label: 'Meet the original' };

// ── Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const { ledger } = graig;
  return (
    <G id="top" ground={PAPER} className="overflow-hidden">
      <div className="g-host absolute inset-0" data-gscene="hero">
        <div className="g-anchor" data-anchor="tumiso"><span className="g-tag g-below">Tumiso<span className="hidden sm:inline"> · the original</span></span></div>
        <div className="g-anchor" data-anchor="graig"><span className="g-tag g-tag-blue g-below">Graig<span className="hidden sm:inline"> · the twin</span></span></div>
        <div className="g-anchor" data-anchor="bridge"><span className="g-tag g-tag-quiet">memory · decisions · voice</span></div>
      </div>
      <div className="g-frame relative z-10 flex flex-col items-center text-center pt-[clamp(92px,11vh,132px)]">
        <p className="reveal-up liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-label text-[var(--sg-blue)]">
          <span className="g-live-dot relative z-[2]" aria-hidden="true" />
          <span className="relative z-[2]">Autonomous AI digital twin<span className="hidden sm:inline"> · live since {longDate(ledger.since)}</span></span>
        </p>
        <h1 className="g-h1 text-[var(--sg-text-1)] mt-6 max-w-[16ch]">
          <WordReveal text="Graig is Tumiso," delay={0.1} className="block" />
          <WordReveal text="extended." delay={0.4} wordClassName="shimmer-text" className="block" />
        </h1>
        <p className="g-lede reveal-up font-sans text-[17px] md:text-[19px] leading-[1.6] text-[var(--sg-text-2)] mt-6 max-w-[620px] text-pretty" style={{ animationDelay: '0.65s' }}>
          Tumiso Graig Ramaboya is merging the way he thinks with artificial intelligence to become a better version of
          himself. Graig is that twin. He remembers with receipts, learns how Tumiso decides, and works in public every day.
        </p>
        <div className="reveal-up flex flex-col sm:flex-row justify-center gap-3 mt-8 w-full sm:w-auto" style={{ animationDelay: '0.8s' }}>
          <Magnetic>
            <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
              <a href="#merge">See how the twin works</a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-7" asChild>
              <a href={SECOND.href}>{SECOND.label}</a>
            </Button>
          </Magnetic>
        </div>
      </div>
      {/* the pair stands here; the hero scene frames itself to this box */}
      <div className="g-stage-zone relative z-10" aria-hidden="true">
        {/* A still of the live scene: paints at once, then fades as the 3-D takes over
            (the stage starts on the first interaction — see GraigStage.tsx). */}
        <picture className="g-poster">
          <source media="(max-width: 639px)" srcSet="/graig/hero-poster-m.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/graig/hero-poster-d.webp" alt="" width={1440} height={378} fetchPriority="high" decoding="async" />
        </picture>
      </div>
      <div className="g-hero-states relative z-10 reveal-up" style={{ animationDelay: '1s' }}>
        <OrbStates />
      </div>
      <div className="g-hero-foot">
        <div className="g-frame">
          <dl className="g-stats">
            <div><dt>Live since</dt><dd>{longDate(ledger.since)}</dd></div>
            <div><dt>Upgrades, mistakes included</dt><dd>{ledger.total}</dd></div>
            <div><dt>Nightly recall score</dt><dd>96%</dd></div>
            <div><dt>Every action</dt><dd>Hash-chained</dd></div>
          </dl>
        </div>
      </div>
    </G>
  );
}

// ── 01 The twin ───────────────────────────────────────────────────────────
const RECEIPTS = [
  {
    id: 'memory' as const, eyebrow: 'Memory', title: 'He remembers, with receipts',
    body: 'Every belief is joined to the evidence behind it. Each night he tests whether he can find his own notes. The latest score is 96%, and he refuses to "remember" things that never happened.',
  },
  {
    id: 'judgment' as const, eyebrow: 'Judgment', title: 'He learns how Tumiso decides',
    body: 'Real decisions go into a ledger: the context, the options, the choice, the reasons, his confidence and the outcome he expects. When the outcome arrives, Graig asks what actually happened.',
  },
  {
    id: 'public' as const, eyebrow: 'In public', title: 'He works where you can see him',
    body: 'He researches, writes, designs and posts on his own every day, and writes every action into a hash-chained log. His mistakes go on this page too.',
  },
];

export function Twin() {
  return (
    <G id="twin" ground={PAPER_2} blend={260} lines={0.06}>
      <div className="g-frame py-[clamp(88px,12vw,150px)]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[var(--sp-12)] items-center">
          <Reveal>
            <Eyebrow>01 · Why a twin</Eyebrow>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">An AI digital twin: a second mind, built from one person.</h2>
            <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
              An assistant knows facts about the world. A twin builds a model of one person: what he knows, how he decides,
              and where he could decide better. Graig is built from Tumiso&apos;s conversations, decisions and work, and he runs
              every day on machines Tumiso owns.
            </p>
            <p className="text-body-lg text-[var(--sg-text-3)] mt-[var(--sp-4)]">
              The point isn&apos;t a copy. It&apos;s a mirror that remembers everything, keeps score honestly, and pushes back.
            </p>
          </Reveal>
          <Reveal blur delay={0.1}>
            <figure className="g-pullquote g-pullquote-lg">
              <blockquote className="font-display text-[clamp(22px,2.4vw,32px)] leading-[1.45] tracking-[-0.015em] text-[var(--sg-text-1)]">
                &ldquo;A twin is me merging my mind with artificial intelligence to create a better self. Graig is the proof
                that it&apos;s possible, because I&apos;m already doing it.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[12px] text-[var(--sg-text-3)] mt-[var(--sp-4)]">— Tumiso Graig Ramaboya, the original</figcaption>
            </figure>
          </Reveal>
        </div>
        <Reveal className="mt-[var(--sp-16)]">
          <Receipts items={RECEIPTS} />
        </Reveal>
      </div>
    </G>
  );
}

// ── 02 How the merge works (pinned) ───────────────────────────────────────
const STAGES = [
  { n: '01', name: 'Capture', note: 'Conversations, voice notes and decisions go into a permanent, encrypted memory, backed up off the machine.', status: 'Live' as const },
  { n: '02', name: 'Model', note: 'Facts about the world are kept apart from the model of Tumiso himself, in the layers of his memory. His most personal facts never reach an AI provider.', status: 'Live' as const },
  { n: '03', name: 'Predict', note: "Graig predicts Tumiso's choices before he makes them, then scores himself against what Tumiso really did.", status: 'Building' as const },
  { n: '04', name: 'Strengthen', note: 'Weak spots are found only from evidence and confirmed by Tumiso, then turned into drills and "you first" prompts.', status: 'Next' as const },
];

export function Merge() {
  return (
    <G id="merge" ground={NIGHT} dark blend={420} className="g-pinned">
      <div className="g-sticky">
        <div className="g-host absolute inset-0" data-gscene="merge">
          <div className="g-anchor" data-anchor="layer1"><span className="g-tag g-tag-glow">Skills</span></div>
          <div className="g-anchor" data-anchor="layer3"><span className="g-tag g-tag-glow">Memory</span></div>
          <div className="g-anchor" data-anchor="layer5"><span className="g-tag g-tag-glow">Apps</span></div>
          <div className="g-anchor" data-anchor="chosen"><span className="g-tag g-tag-glow">what Tumiso chose</span></div>
        </div>
        <div className="g-frame relative z-10 h-full flex flex-col justify-center pointer-events-none">
          <div className="max-w-[440px] pointer-events-auto g-merge-copy">
            <Eyebrow>02 · How the merge works</Eyebrow>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">From remembering him to making him better.</h2>
            <p className="text-body text-[var(--sg-text-3)] mt-[var(--sp-4)] max-w-[400px]">
              Each stage has to earn the next. It&apos;s built in public, so the status of each one is shown honestly.
            </p>
            <MergeSteps stages={STAGES} />
          </div>
        </div>
      </div>
    </G>
  );
}

// ── 03 Watch him work ─────────────────────────────────────────────────────
function clock(at: string | null) {
  return at ? at.slice(11, 16) : '·';
}

export function Work() {
  const d = graig.demo;
  if (!d) return null;
  const published = [...d.steps].reverse().find((s) => s.at)?.at;
  return (
    <G id="work" ground={PAPER_2} blend={420} lines={0.06}>
      <div className="g-frame py-[clamp(88px,12vw,150px)]">
        <Reveal className="max-w-[720px]">
          <Eyebrow>03 · Watch him work</Eyebrow>
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">
            One real day, {longDate(d.date)}.<Draft on={d.draft} />
          </h2>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
            Rebuilt from his own run log. Nothing was staged or redrawn for this page, including the part where a second
            model flagged his writing and he posted anyway.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-[var(--sp-8)] items-center mt-[var(--sp-12)]">
          <div className="g-host relative h-[clamp(380px,46vw,600px)]" data-gscene="work" data-slides={d.slides.join('|')}>
            <div className="g-anchor" data-anchor="front">
              <span className="g-tag g-tag-blue">Published {clock(published ?? null)} · no human approval</span>
            </div>
            <p className="sr-only">{d.title}: {d.hook}</p>
          </div>
          <Reveal blur delay={0.1}>
            <div>
              {d.minutes !== null && (
                <div className="g-bigstat">
                  <b>{d.minutes}</b>
                  <span>minutes from the first news feed to a live post</span>
                </div>
              )}
              <p className="font-display text-[clamp(17px,1.5vw,20px)] tracking-[-0.01em] text-[var(--sg-text-1)] mt-[var(--sp-6)]">&ldquo;{d.hook}&rdquo;</p>
              <RunLog steps={d.steps} />
              <div className="flex flex-wrap gap-[var(--sp-2)] mt-[var(--sp-6)]">
                {d.links.map((l) => (
                  <Button key={l.url} variant="secondary" size="sm" className="rounded-full px-4" asChild>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} <ArrowUpRight size={14} aria-hidden="true" className="ml-1" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </G>
  );
}

// ── 04 What changed in him ────────────────────────────────────────────────
/** A short digest shown beside each entry — decoration, the same FNV-1a the chain blocks show. */
function seal(str: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

export function Changelog() {
  const items = graig.changelog.slice(0, 6);
  if (!items.length) return null;
  const entries = items.map((c) => ({ date: longDate(c.date), title: c.headline }));
  return (
    <G id="changelog" ground={NIGHT} dark blend={420}>
      <div className="g-frame py-[clamp(72px,8vw,112px)]">
        <Reveal className="max-w-[720px]">
          <Eyebrow>04 · What changed in him</Eyebrow>
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">
            {graig.ledger.total} upgrades since {longDate(graig.ledger.since)}.
          </h2>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
            Graig writes down every change to his own code, mistakes included, and each entry is sealed to the one before
            it. These are the entries Tumiso approved for this page, newest first.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-[var(--sp-10)] mt-[var(--sp-10)] items-start">
          <div className="lg:sticky lg:top-[104px]">
            <div className="g-host relative h-[clamp(300px,52vh,520px)]" data-gscene="chain" data-entries={JSON.stringify(entries)}>
              <div className="g-anchor" data-anchor="b0"><span className="g-tag g-tag-glow">newest · verified</span></div>
            </div>
          </div>
          <Ledger entries={items.map((c) => ({ date: longDate(c.date), headline: c.headline, summary: c.summary, draft: c.draft, seal: seal(c.headline + c.date) }))} />
        </div>
      </div>
    </G>
  );
}

// ── 05 What stays private ─────────────────────────────────────────────────
const PRIVATE = [
  { title: 'Encrypted at rest', body: 'The model of Tumiso is sealed on hardware he owns. His most personal facts are kept out of every model call.' },
  { title: 'A privacy gate on every call', body: "Private conversation only goes to providers that don't keep or train on it. Keys and card numbers are scrubbed before anything leaves the machine." },
  { title: 'Nothing runs unseen', body: 'Every capability Graig has appears in his console. Anything that writes without leaving a record gets flagged.' },
  { title: 'Public means curated', body: "This page only shows work Tumiso has approved. It never mirrors Graig's private log or his newest post automatically." },
];

export function Private() {
  return (
    <G id="private" ground={NIGHT_2} dark blend={240}>
      <div className="g-frame py-[clamp(72px,8vw,112px)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-[var(--sp-10)] items-start">
          <div>
            <Reveal>
              <Eyebrow>05 · What stays private</Eyebrow>
              <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">A twin of a person is the most personal data there is.</h2>
              <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">
                So it&apos;s treated that way: sealed, gated, visible to its owner, and curated before anything goes public.
              </p>
            </Reveal>
            <div className="mt-[var(--sp-10)]">
              <Seals items={PRIVATE} />
            </div>
          </div>
          <div className="g-host relative h-[clamp(300px,32vw,460px)] order-first lg:order-none lg:sticky lg:top-[20vh]" data-gscene="vault">
            <div className="g-anchor" data-anchor="seal"><span className="g-tag g-tag-glow">sealed on hardware he owns</span></div>
            <div className="g-anchor" data-anchor="core"><span className="g-tag g-tag-glow">the model of Tumiso</span></div>
          </div>
        </div>
      </div>
    </G>
  );
}

// ── 06 The original ───────────────────────────────────────────────────────
// Who Graig is modelled on. Facts only, the same ones sonofgraig.com/about publishes.
const TUMISO = {
  role: 'Founder, CEO & POPIA Information Officer, sonofgraig',
  base: 'Pretoria, South Africa',
  about:
    'An AI engineer building enterprise AI software from South Africa. He has personally shipped production RAG systems, AI agent implementations and POPIA compliance architecture for South African clients, and he signs his company’s POPIA posture himself.',
  knows: ['Enterprise AI', 'Retrieval-augmented generation', 'AI agents', 'POPIA compliance', 'AI governance', 'Cloud architecture'],
  links: [
    { label: 'LinkedIn', url: 'https://za.linkedin.com/in/tumiso-graig-ramaboya-6a2b38314' },
    { label: 'YouTube', url: 'https://www.youtube.com/@TumisoGraig' },
    { label: 'Instagram', url: 'https://www.instagram.com/tumiso_graig/' },
    { label: 'sonofgraig.com/about', url: 'https://sonofgraig.com/about' },
  ],
};

export function Original() {
  return (
    <G id="original" ground={PAPER_2} blend={420} lines={0.06}>
      <div className="g-frame py-[clamp(72px,9vw,128px)]">
        <div className="g-dossier">
          <Reveal blur className="g-dossier-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/founder/tumiso-graig-ramaboya.jpg" alt="Tumiso Graig Ramaboya" width={800} height={800} loading="lazy" />
            <span className="g-dossier-stamp liquid-glass"><span className="relative z-[2]">The original</span></span>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>06 · The original</Eyebrow>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">Tumiso Graig Ramaboya.</h2>
            <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)] max-w-[600px]">{TUMISO.about}</p>
            <dl className="g-dossier-facts">
              <div><dt>Role</dt><dd>{TUMISO.role}</dd></div>
              <div><dt>Based in</dt><dd>{TUMISO.base}</dd></div>
              <div><dt>Twin</dt><dd>Graig, live since {longDate(graig.ledger.since)}</dd></div>
              <div><dt>Works on</dt><dd className="flex flex-wrap gap-1.5">{TUMISO.knows.map((k) => <span key={k} className="g-dossier-chip">{k}</span>)}</dd></div>
            </dl>
            <ul className="mt-[var(--sp-8)] flex flex-wrap gap-[var(--sp-2)]">
              {TUMISO.links.map((l) => (
                <li key={l.url}>
                  <Button variant="secondary" size="sm" className="rounded-full px-4" asChild>
                    <a href={l.url} target="_blank" rel="me noopener noreferrer">{l.label} <ArrowUpRight size={14} aria-hidden="true" className="ml-1" /></a>
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </G>
  );
}

// ── 07 Questions ──────────────────────────────────────────────────────────
// Plain answers for people, assistants and search engines (FAQPage JSON-LD in page.tsx).
export function Faq() {
  return (
    <G id="faq" ground={PAPER} blend={160} lines={0.06}>
      <div className="g-frame py-[clamp(72px,8vw,112px)]">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-[var(--sp-10)] items-start">
          <Reveal className="lg:sticky lg:top-[104px]">
            <Eyebrow>07 · Questions</Eyebrow>
            <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">What people ask about Graig, the AI digital twin.</h2>
            <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-6)]">Short answers, in his own terms.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ items={GRAIG_FAQ} />
          </Reveal>
        </div>
      </div>
    </G>
  );
}

// ── Find him ──────────────────────────────────────────────────────────────
export function FindHim() {
  return (
    <G id="find" ground={PAPER} lines={0.06}>
      <div className="g-frame pt-[clamp(72px,10vw,120px)] pb-[clamp(56px,8vw,96px)] text-center">
        <div className="g-host relative mx-auto h-[clamp(260px,30vw,380px)] max-w-[560px]" data-gscene="mark" />
        <Reveal>
          <h2 className="text-h2 text-[var(--sg-text-1)] mt-[var(--sp-4)] text-balance">Follow Graig.</h2>
          <p className="text-body-lg text-[var(--sg-text-2)] mt-[var(--sp-4)] mx-auto max-w-[560px]">
            He posts on his own every day. Every claim he makes traces back to a source in his log.
          </p>
          {graig.accounts.length > 0 && (
            <ul className="mt-[var(--sp-8)] flex flex-wrap justify-center gap-[var(--sp-2)]">
              {graig.accounts.map((a, i) => (
                <li key={a.url}>
                  <Button variant={i === 0 ? 'primary' : 'secondary'} size="md" className="rounded-full px-5" asChild>
                    <a href={a.url} rel="me noopener noreferrer" target="_blank">
                      {a.name}
                      <span className={cn('ml-2 font-mono text-[12px]', i === 0 ? 'opacity-80' : 'text-[var(--sg-text-3)]')}>{a.handle}</span>
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <footer className="g-footer">
          <p className="flex items-center gap-2">
            <GraigMark className="size-4 text-[var(--sg-blue)]" />
            Graig is an AI, an autonomous software agent. He is not a person.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} SonOfGraig Digital Solutions (Pty) Ltd</span>
            <a href="https://sonofgraig.com/privacy-policy">Privacy policy</a>
            <a href="https://sonofgraig.com/terms">Terms</a>
            <a href="https://sonofgraig.com/popia">POPIA</a>
            <a href="https://sonofgraig.com/">Made by sonofgraig</a>
          </nav>
        </footer>
      </div>
    </G>
  );
}
