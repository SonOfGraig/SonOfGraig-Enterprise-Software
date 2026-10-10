import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Dynamic email banner — 600x200 PNG referenced from notification + auto-reply
// emails. Renders the real sonofgraig SVG logo (a 3D-cube polygon mark from
// app/icon.svg) plus a per-topic accent stripe and headline so each inquiry
// type gets a visually distinct hero. Cached 24h at the edge.
//
// Query: ?topic=<topic-key>  — see TOPIC_CONFIG below for the full set.

export const runtime = 'edge';

// Brand palette — mirrors app/globals.css `--sg-*` tokens.
const SG_BLUE = '#0B9EDE';
const SG_BLUE_DEEP_2 = '#044E73';
const SG_BLUE_DEEP = '#0773A8';
const SG_INK = '#0D1117';
const SG_TEXT_INV = '#FFFFFF';
const SG_TEXT_MUTED = '#9CA3AF';

// Per-topic configuration. Each entry sets the accent colour, eyebrow label
// (the small uppercase chip), and the headline. The mark colour comes from
// the brand SVG and stays constant for recognition.
const TOPIC_CONFIG: Record<
  string,
  { eyebrow: string; headline: string; accent: string }
> = {
  // Early-access programme
  'early-access': {
    eyebrow: 'AI Dev Platform · Early access',
    headline: 'Your application is in.',
    accent: '#F97316', // brand amber
  },

  // Contact-form topic variants
  'sales': {
    eyebrow: 'Talk to sales',
    headline: 'Enterprise subscription enquiry.',
    accent: SG_BLUE,
  },
  'service-rag': {
    eyebrow: 'Service · RAG Knowledge Base',
    headline: 'Document-grounded AI enquiry.',
    accent: SG_BLUE,
  },
  'service-agent': {
    eyebrow: 'Service · AI Agent Implementation',
    headline: 'Autonomous agents on your data.',
    accent: SG_BLUE,
  },
  'service-cloud': {
    eyebrow: 'Service · Cloud Architecture',
    headline: 'Zero-trust cloud, built in SA.',
    accent: SG_BLUE,
  },
  'service-popia': {
    eyebrow: 'Service · POPIA Audit',
    headline: 'Compliance gap analysis.',
    accent: '#6366F1', // indigo
  },
  'service-data': {
    eyebrow: 'Service · Data Analytics',
    headline: 'POPIA-aware data platforms.',
    accent: SG_BLUE,
  },
  'support': {
    eyebrow: 'Customer support',
    headline: 'Existing-customer enquiry.',
    accent: '#16A34A', // green
  },
  'popia': {
    eyebrow: 'POPIA enquiry',
    headline: 'Data-subject or compliance request.',
    accent: '#6366F1', // indigo
  },
  'security': {
    eyebrow: 'Security disclosure',
    headline: 'Sensitive disclosure intake.',
    accent: '#DC2626', // red
  },
  'partner': {
    eyebrow: 'Partnership enquiry',
    headline: 'Reseller or alliance.',
    accent: '#8B5CF6', // purple
  },
  'press': {
    eyebrow: 'Press & analyst',
    headline: 'Editorial or research enquiry.',
    accent: '#F97316', // amber
  },
  'other': {
    eyebrow: 'General enquiry',
    headline: 'Triage routing in progress.',
    accent: SG_BLUE,
  },
  'waitlist': {
    eyebrow: 'Cluster waitlist',
    headline: 'You’re on the list.',
    accent: SG_BLUE,
  },

  // Default fallback when no topic is supplied or the topic is unknown.
  'default': {
    eyebrow: 'sonofgraig',
    headline: 'Enterprise software. African-engineered.',
    accent: SG_BLUE,
  },
};

// The brand mark from app/icon.svg, inlined as JSX so Satori can rasterise
// it. Satori supports polygon and line primitives, so the file is reproduced
// here verbatim.
function BrandMark({ size = 76 }: { size?: number }) {
  // viewBox 0 0 200 180 — we scale uniformly via the SVG element's width/height.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 180"
      width={size}
      height={(size * 180) / 200}
    >
      <polygon points="100,20 148,48 100,76 52,48" fill={SG_BLUE} />
      <polygon points="52,48 100,76 100,148 52,120" fill={SG_BLUE_DEEP_2} />
      <polygon points="100,76 148,48 148,120 100,148" fill={SG_BLUE_DEEP} />
      <polygon
        points="100,20 148,48 100,76 52,48"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />
      <line x1="52" y1="48" x2="52" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1="148" y1="48" x2="148" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1="52" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1="148" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <line x1="100" y1="76" x2="100" y2="148" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  );
}

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic') ?? 'default';
  const cfg = TOPIC_CONFIG[topic] ?? TOPIC_CONFIG.default;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: SG_INK,
          backgroundImage: `radial-gradient(circle at 80% 30%, ${cfg.accent}33 0%, transparent 55%), radial-gradient(circle at 15% 90%, ${SG_BLUE_DEEP_2}50 0%, transparent 50%)`,
          color: SG_TEXT_INV,
          fontFamily: 'sans-serif',
          padding: '28px 36px',
          position: 'relative',
        }}
      >
        {/* Accent stripe on the far left for at-a-glance topic identification */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: cfg.accent,
          }}
        />

        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '28px' }}>
          <BrandMark size={84} />
        </div>

        {/* Text column */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: cfg.accent,
              marginBottom: '8px',
            }}
          >
            {cfg.eyebrow}
          </div>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '10px',
              maxWidth: '420px',
            }}
          >
            {cfg.headline}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: SG_TEXT_MUTED,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            sonofgraig &middot; KwaMhlanga, South Africa
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 200,
      headers: {
        // 24h public cache so each email client only fetches once per recipient.
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
      },
    },
  );
}
