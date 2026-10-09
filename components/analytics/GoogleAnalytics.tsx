'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// Google Analytics 4 — loads ONLY after the visitor accepts analytics in the
// cookie banner (POPIA consent, localStorage `popia_consent_v3`). Previously
// it loaded for everyone regardless of the banner's "Analytics: OFF", which
// contradicted the consent the banner asked for. The banner dispatches
// `sg-consent` when the choice changes, so accepting takes effect at once.

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const CONSENT_KEY = 'popia_consent_v3';
export const CONSENT_EVENT = 'sg-consent';

function analyticsAllowed() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return !!raw && JSON.parse(raw).analytics === true;
  } catch {
    return false;
  }
}

export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(analyticsAllowed());
    const update = () => setAllowed(analyticsAllowed());
    window.addEventListener(CONSENT_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(CONSENT_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
