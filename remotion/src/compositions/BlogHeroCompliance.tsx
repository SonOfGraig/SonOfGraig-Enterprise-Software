import { AbsoluteFill } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';

export type BlogHeroComplianceProps = { theme: ThemeName };

// Hero still for the POPIA Sections 11/19/72 supporting post.
// Layered architecture diagram — each architecture layer (Ingest, Store, Embed,
// Retrieve, Infer, Audit) carries a badge indicating which POPIA section
// governs it. Designed for OG 1200x630 export.

const LAYERS: Array<{
  name: string;
  sections: string[];
}> = [
  { name: 'Audit',    sections: ['§19'] },
  { name: 'Infer',    sections: ['§72', '§19'] },
  { name: 'Retrieve', sections: ['§19'] },
  { name: 'Embed',    sections: ['§72', '§11'] },
  { name: 'Store',    sections: ['§19', '§72'] },
  { name: 'Ingest',   sections: ['§11'] },
];

export const BlogHeroCompliance: React.FC<BlogHeroComplianceProps> = ({ theme }) => {
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
            background: t.amber,
            boxShadow: `0 0 0 4px rgba(249,115,22,0.18)`,
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
          Insights · Compliance
        </span>
      </div>

      <div style={{ position: 'absolute', top: 120, left: 72, maxWidth: 620 }}>
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: -1.3,
            lineHeight: 1.05,
            color: t.text1,
            margin: 0,
          }}
        >
          POPIA Sections
          <br />
          11, 19 &amp; 72.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 500,
            color: t.text3,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          What the three sections most likely to bite an enterprise AI project actually require, layer by layer.
        </p>

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
            Tumiso Graig Ramaboya · POPIA Information Officer
          </div>
        </div>
      </div>

      {/* Layered architecture stack — right column */}
      <div
        style={{
          position: 'absolute',
          right: 72,
          top: 100,
          width: 460,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {LAYERS.map((layer, i) => (
          <div
            key={layer.name}
            style={{
              padding: '18px 22px',
              background: t.bg,
              border: `1px solid ${t.borderMd}`,
              borderRadius: radius.lg,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: i === 1 ? `0 6px 16px ${t.nodeShadow}` : undefined,
            }}
          >
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                fontWeight: 600,
                color: t.text1,
              }}
            >
              {layer.name}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {layer.sections.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: '4px 10px',
                    borderRadius: radius.full,
                    background: t.blueGlow,
                    color: t.blue,
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    border: `1px solid ${t.blue}`,
                  }}
                >
                  POPIA {s}
                </span>
              ))}
            </div>
          </div>
        ))}
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
