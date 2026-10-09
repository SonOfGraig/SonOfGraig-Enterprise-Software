import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'sonofgraig — enterprise AI software, built in South Africa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Brand tokens sourced from app/globals.css (--sg-blue, --sg-text-1). next/og
// uses Satori, which cannot resolve CSS variables, so hex values are inlined.
const SG_BLUE = '#0B9EDE';
const SG_BLUE_DEEP = '#065A82';
const SG_INK = '#0D1117';
const SG_TEXT_INV = '#FFFFFF';
const SG_TEXT_MUTED = '#9CA3AF';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: SG_INK,
          backgroundImage: `radial-gradient(circle at 85% 15%, ${SG_BLUE}33 0%, transparent 55%), radial-gradient(circle at 15% 90%, ${SG_BLUE_DEEP}40 0%, transparent 50%)`,
          color: SG_TEXT_INV,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: SG_BLUE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 800,
              color: SG_INK,
            }}
          >
            S
          </div>
          <div style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            sonofgraig
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            Enterprise AI, built in South Africa.
          </div>
          <div
            style={{
              fontSize: '28px',
              color: SG_TEXT_MUTED,
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Build agents, ground AI in your data, fine-tune models, and prove compliance
            from one platform.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '20px',
            color: SG_TEXT_MUTED,
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>POPIA-native</span>
            <span style={{ color: SG_BLUE }}>•</span>
            <span>ZAR-priced</span>
            <span style={{ color: SG_BLUE }}>•</span>
            <span>AI Dev Platform</span>
          </div>
          <div style={{ color: SG_BLUE, fontWeight: 600 }}>sonofgraig.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
