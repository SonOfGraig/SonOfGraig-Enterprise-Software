'use client';

import { useEffect, useRef } from 'react';
import { ensureTurnstileScript } from '@/lib/forms/turnstile-client';

/**
 * Cloudflare Turnstile widget. Loads the Cloudflare script once globally,
 * then renders the widget into a div on mount. Calls onToken(token | null)
 * — null means the user hasn't completed the challenge yet (or it expired).
 *
 * Renders nothing visible if NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset, which
 * lets local dev work without configuring Turnstile.
 */

export interface TurnstileProps {
  onToken: (token: string | null) => void;
  theme?: 'light' | 'dark' | 'auto';
}

export function Turnstile({ onToken, theme = 'auto' }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;

    ensureTurnstileScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          callback: (token) => onToken(token),
          'expired-callback': () => onToken(null),
          'error-callback': () => onToken(null),
        });
      } catch (err) {
        console.error('[turnstile] render failed', err);
      }
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget already removed */
        }
      }
    };
  }, [siteKey, theme, onToken]);

  if (!siteKey) {
    return null; // dev mode without configured key
  }
  return <div ref={containerRef} className="cf-turnstile" />;
}
