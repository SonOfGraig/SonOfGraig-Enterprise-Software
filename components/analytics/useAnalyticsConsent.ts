'use client';

import { useEffect, useState } from 'react';

// True only once the visitor has accepted "Analytics" in the cookie banner
// (POPIA consent, localStorage `popia_consent_v3`). The banner dispatches
// `sg-consent` when the choice changes, so accepting takes effect at once.
// Withdrawing consent reloads the page so already-loaded trackers stop.

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

export function useAnalyticsConsent() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let current = analyticsAllowed();
    setAllowed(current);
    const update = () => {
      const next = analyticsAllowed();
      if (current && !next) window.location.reload();
      current = next;
      setAllowed(next);
    };
    window.addEventListener(CONSENT_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(CONSENT_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return allowed;
}
