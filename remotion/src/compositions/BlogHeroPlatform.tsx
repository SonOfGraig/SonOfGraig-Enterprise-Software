import { AbsoluteFill } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';

export type BlogHeroPlatformProps = { theme: ThemeName };

// Hero still for "RAG, Agents, Fine-Tuning, Governance: The Four Pillars".
// Four-column pillar diagram on top of a shared base layer (Identity /
// Observability / Audit). OG 1200x630 export.

const PILLARS = [
  { name: 'RAG Studio',      tagline: 'Ground in your docs' },
  { name: 'Agent Builder',   tagline: 'Orchestrate work' },
  { name: 'Fine-Tuning Ops', tagline: 'Specialise the model' },
  { name: 'Governance Hub',  tagline: 'Prove what happened' },
];

const BASE_LAYERS = ['Identity', 'Observability', 'POPIA Audit'];

export const BlogHeroPlatform: React.FC<BlogHeroPlatformProps> = ({ theme }) => {
  const t = themes[theme];

  return (
    <AbsoluteFill>
      <Surface theme={theme} frame={0} duration={1} grid />

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
          Insights · Product
        </span>
      </div>

      <div style={{ position: 'absolute', top: 116, left: 72, right: 72 }}>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1.2,
            lineHeight: 1.05,
            color: t.text1,
            margin: 0,
            maxWidth: 980,
          }}
        >
          RAG. Agents. Fine-tuning. Governance.
        </h1>
        <p
          style={{
            marginTop: 18,
            fontFamily: fonts.sans,
            fontSize: 17,
            fontWeight: 500,
            color: t.text3,
            lineHeight: 1.5,
            maxWidth: 820,
          }}
        >
          The four pillars of an enterprise AI Dev Platform — and why all four belong on one shared base layer.
        </p>
      </div>

      {/* Pillars row */}
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 290,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {PILLARS.map((p) => (
          <div
            key={p.name}
            style={{
              padding: '24px 18px',
              background: t.bg,
              border: `1.5px solid ${t.blue}`,
              borderRadius: radius.lg,
              boxShadow: `0 6px 18px ${t.nodeShadow}`,
              height: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: radius.sm,
                  background: t.blueGlow,
                  border: `1px solid ${t.blue}`,
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: t.text1,
                  letterSpacing: -0.3,
                  lineHeight: 1.15,
                }}
              >
                {p.name}
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 500,
                color: t.text3,
              }}
            >
              {p.tagline}
            </div>
          </div>
        ))}
      </div>

      {/* Shared base layer */}
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 538,
          padding: '18px 22px',
          background: t.surface2,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: t.text4,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          Shared base layer
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {BASE_LAYERS.map((l) => (
            <span
              key={l}
              style={{
                padding: '6px 14px',
                background: t.bg,
                border: `1px solid ${t.borderMd}`,
                borderRadius: radius.full,
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: 600,
                color: t.text2,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

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
