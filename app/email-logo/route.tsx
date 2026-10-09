import { ImageResponse } from 'next/og';

// 96x86 PNG of the brand mark, optimised for the email header strip. Email
// clients render this <img> reliably across Outlook, Gmail, Apple Mail.
// Cached 30 days at the edge — the mark never changes.

export const runtime = 'edge';

const SG_BLUE = '#0B9EDE';
const SG_BLUE_DEEP_2 = '#044E73';
const SG_BLUE_DEEP = '#0773A8';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 180"
          width="96"
          height="86"
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
      </div>
    ),
    {
      width: 96,
      height: 86,
      headers: {
        'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, immutable',
      },
    },
  );
}
