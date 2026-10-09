import { AbsoluteFill } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';

export type BlogHeroPillarProps = { theme: ThemeName };

// Hero still for the pillar post:
// "Why Africa Needs Its Own Enterprise AI Platform"
//
// Composition: stylised Africa silhouette with the af-south-1 pin glowing
// at Cape Town, five SaaS-cluster nodes arrayed around it, headline + eyebrow
// per the brand Header pattern but tuned for the OG 1200x630 export.
//
// Rendered as a still (no animation) — referenced from app/(public)/blog/[slug]
// via /blog/og/{slug}.png and produced by `npm run render:blog-pillar-og`.

const AFRICA_PATH =
  // Hand-tuned approximation of the African continent silhouette, scaled to a
  // 600x520 viewBox. Simplified for OG clarity — not geographically precise,
  // and that is the point: the brand mark first, the geography second.
  'M 300 20 L 360 30 L 410 55 L 450 95 L 470 140 L 495 175 ' +
  'L 510 220 L 525 270 L 530 320 L 520 365 L 495 405 L 460 440 ' +
  'L 425 470 L 395 495 L 365 505 L 335 500 L 310 480 L 295 450 ' +
  'L 285 415 L 270 380 L 250 350 L 225 325 L 200 295 L 180 260 ' +
  'L 170 220 L 165 175 L 175 130 L 200 90 L 235 55 L 270 30 Z';

const CLUSTERS: Array<{
  label: string;
  short: string;
  angle: number; // degrees from 12 o'clock around the af-south-1 anchor
  radius: number;
}> = [
  { label: 'AI Dev Platform',     short: 'AI',     angle: -90, radius: 240 },
  { label: 'Cloud + DevOps',      short: 'Cloud',  angle: -30, radius: 240 },
  { label: 'Data + Analytics',    short: 'Data',   angle:  30, radius: 240 },
  { label: 'Creative + XR',       short: 'XR',     angle:  90, radius: 240 },
  { label: 'Workflow Automation', short: 'Flow',   angle: 150, radius: 240 },
];

export const BlogHeroPillar: React.FC<BlogHeroPillarProps> = ({ theme }) => {
  const t = themes[theme];
  const W = 1280;
  const H = 720;
  const anchorX = W * 0.72; // af-south-1 pin position (Cape Town is far south, on the right of the canvas where the silhouette sits)
  const anchorY = H * 0.62;

  return (
    <AbsoluteFill>
      <Surface theme={theme} frame={0} duration={1} grid />

      {/* Eyebrow */}
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 72,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: radius.xs,
            background: t.blue,
            boxShadow: `0 0 0 4px ${t.blueGlow}`,
          }}
        />
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.5,
            color: t.text3,
            textTransform: 'uppercase',
          }}
        >
          Insights · Strategy
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 120, left: 72, maxWidth: 640 }}>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: -1.4,
            lineHeight: 1.05,
            color: t.text1,
            margin: 0,
          }}
        >
          Why Africa needs
          <br />
          its own enterprise
          <br />
          AI platform.
        </h1>
        <p
          style={{
            marginTop: 28,
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 500,
            color: t.text3,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          POPIA. Residency. Currency. Built into the architecture, not bolted onto the contract.
        </p>

        {/* Byline */}
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: radius.full,
              background: t.surface2,
              border: `1px solid ${t.borderMd}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 700,
              color: t.text2,
            }}
          >
            TR
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, color: t.text3 }}>
            Tumiso Graig Ramaboya · Founder
          </div>
        </div>
      </div>

      {/* Africa silhouette + af-south-1 pin + cluster nodes */}
      <svg
        width={620}
        height={540}
        viewBox="0 0 620 540"
        style={{
          position: 'absolute',
          right: 40,
          top: H / 2 - 270,
        }}
      >
        {/* Outer glow ring around af-south-1 */}
        <circle
          cx={460}
          cy={420}
          r={32}
          fill={t.blueGlow}
        />
        <circle
          cx={460}
          cy={420}
          r={20}
          fill={t.blueGlow}
        />

        {/* Africa silhouette */}
        <path
          d={AFRICA_PATH}
          fill={t.surface2}
          stroke={t.borderStr}
          strokeWidth={1.5}
          transform="translate(40, 0)"
        />

        {/* af-south-1 pin */}
        <circle
          cx={460}
          cy={420}
          r={10}
          fill={t.blue}
          stroke={t.bg}
          strokeWidth={3}
        />

        {/* Cluster nodes */}
        {CLUSTERS.map((c, i) => {
          const rad = (c.angle * Math.PI) / 180;
          const cx = 460 + Math.cos(rad) * c.radius * 0.5;
          const cy = 420 + Math.sin(rad) * c.radius * 0.5;

          // Connection line
          return (
            <g key={i}>
              <line
                x1={460}
                y1={420}
                x2={cx}
                y2={cy}
                stroke={t.blue}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.55}
              />
              <circle
                cx={cx}
                cy={cy}
                r={28}
                fill={t.bg}
                stroke={t.blue}
                strokeWidth={1.5}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontFamily={fonts.sans}
                fontSize={11}
                fontWeight={600}
                fill={t.text1}
              >
                {c.short}
              </text>
            </g>
          );
        })}

        {/* af-south-1 label */}
        <text
          x={460}
          y={470}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontSize={11}
          fontWeight={600}
          fill={t.text3}
          letterSpacing={0.6}
        >
          af-south-1
        </text>
      </svg>

      {/* Footer brand strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 72,
          right: 72,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 18,
            fontWeight: 700,
            color: t.text1,
            letterSpacing: -0.4,
          }}
        >
          sonofgraig
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: t.text4,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
          }}
        >
          sonofgraig.com/blog
        </div>
      </div>
    </AbsoluteFill>
  );
};
