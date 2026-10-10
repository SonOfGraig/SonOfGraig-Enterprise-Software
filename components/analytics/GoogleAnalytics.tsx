'use client';

import Script from 'next/script';
import { useAnalyticsConsent } from './useAnalyticsConsent';

// Google Analytics 4 — loads ONLY after the visitor accepts analytics in the
// cookie banner (see useAnalyticsConsent).

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const allowed = useAnalyticsConsent();
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
