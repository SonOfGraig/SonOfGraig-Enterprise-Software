import { AbsoluteFill } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';

export type BlogHeroGenericProps = {
  theme: ThemeName;
  /** Eyebrow line, e.g. "Insights · Engineering". */
  eyebrow: string;
  /** Headline — wraps automatically; keep under ~80 chars for clean layout. */
  title: string;
  /** Supporting line under the headline. */
  subtitle: string;
};

// Parameterised blog hero still. One composition serves every post that does
// not have a bespoke hero (BlogHeroPillar/Compliance/Platform). Rendered to
// /blog/og/{slug}.png by passing --props at render time:
//   remotion still BlogHeroGenericLight out.png --props='{"title":"…", …}'
//
// Right-hand motif is a deterministic node lattice in the brand blue so every
// hero reads as part of the same system without per-post art.

const NODES: Array<{ x: number; y: number; r: number }> = [
  { x: 0.5, y: 0.5, r: 13 },
  { x: 0.22, y: 0.26, r: 8 },
  { x: 0.8, y: 0.2, r: 9 },
  { x: 0.85, y: 0.66, r: 8 },
  { x: 0.3, y: 0.78, r: 9 },
  { x: 0.62, y: 0.84, r: 7 },
  { x: 0.14, y: 0.56, r: 7 },
  { x: 0.7, y: 0.44, r: 7 },
];

export const BlogHeroGeneric: React.FC<BlogHeroGenericProps> = ({
  theme,
  eyebrow,
  title,
  subtitle,
}) => {
  const t = themes[theme];
  const W = 1280;
  const H = 720;

  // Motif geometry (right third of the canvas).
  const boxX = W * 0.6;
  const boxY = H * 0.18;
  const boxW = W * 0.32;
  const boxH = H * 0.6;
  const px = (n: number) => boxX + n * boxW;
  const py = (n: number) => boxY + n * boxH;

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
          {eyebrow}
        </span>
      </div>

      {/* Headline + subtitle + byline */}
      <div style={{ position: 'absolute', top: 132, left: 72, maxWidth: 660 }}>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -1.3,
            lineHeight: 1.06,
            color: t.text1,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            marginTop: 26,
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 500,
            color: t.text3,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          {subtitle}
        </p>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 12 }}>
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

      {/* Node-lattice motif */}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        {NODES.slice(1).map((n, i) => (
          <line
            key={`l-${i}`}
            x1={px(NODES[0].x)}
            y1={py(NODES[0].y)}
            x2={px(n.x)}
            y2={py(n.y)}
            stroke={t.blue}
            strokeWidth={1}
            strokeDasharray="3 5"
            opacity={0.4}
          />
        ))}
        {NODES.map((n, i) => (
          <g key={`n-${i}`}>
            {i === 0 ? (
              <circle cx={px(n.x)} cy={py(n.y)} r={n.r + 12} fill={t.blueGlow} />
            ) : null}
            <circle
              cx={px(n.x)}
              cy={py(n.y)}
              r={n.r}
              fill={i === 0 ? t.blue : t.bg}
              stroke={t.blue}
              strokeWidth={i === 0 ? 0 : 1.5}
            />
          </g>
        ))}
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
