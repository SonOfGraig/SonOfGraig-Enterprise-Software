'use client';

import Script from 'next/script';
import { useAnalyticsConsent } from './useAnalyticsConsent';

// Microsoft Clarity (heatmaps + session replay) — loads ONLY after the visitor
// accepts analytics in the cookie banner. Clarity masks typed text by default;
// configure "Strict" masking in the Clarity project settings.

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function MicrosoftClarity() {
  const allowed = useAnalyticsConsent();
  if (!CLARITY_ID || !/^[a-z0-9]+$/i.test(CLARITY_ID) || !allowed) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
        window.clarity('consent');
      `}
    </Script>
  );
}
