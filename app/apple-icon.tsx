import { ImageResponse } from 'next/og';

// Apple touch icon — 180x180 PNG rendered from the brand SVG. Used on iOS
// home-screen pins and as a Google-Search favicon fallback for clients that
// can't use SVG. White background + enlarged cube to match the search-result
// favicon (app/icon.svg). Next.js auto-registers this at /apple-icon.

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const SG_BLUE = '#0B9EDE';
const SG_BLUE_DEEP_2 = '#044E73';
const SG_BLUE_DEEP = '#0773A8';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '40px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 180"
          width="150"
          height="135"
        >
          <polygon points="100,20 148,48 100,76 52,48" fill={SG_BLUE} />
          <polygon points="52,48 100,76 100,148 52,120" fill={SG_BLUE_DEEP_2} />
          <polygon points="100,76 148,48 148,120 100,148" fill={SG_BLUE_DEEP} />
          <polygon
            points="100,20 148,48 100,76 52,48"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.2"
          />
          <line x1="52" y1="48" x2="52" y2="120" stroke="rgba(255,255,255,0.30)" strokeWidth="1.2" />
          <line x1="148" y1="48" x2="148" y2="120" stroke="rgba(255,255,255,0.30)" strokeWidth="1.2" />
          <line x1="52" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.30)" strokeWidth="1.2" />
          <line x1="148" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.30)" strokeWidth="1.2" />
          <line x1="100" y1="76" x2="100" y2="148" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
