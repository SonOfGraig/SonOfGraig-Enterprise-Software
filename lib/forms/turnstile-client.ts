// Client-side Turnstile script loader — shared between the React widget
// component and the legacy-form binders that manipulate DOM directly.

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          appearance?: 'always' | 'execute' | 'interaction-only';
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = 'cf-turnstile-script';
const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';

let scriptPromise: Promise<void> | null = null;

export function ensureTurnstileScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();
    if (window.turnstile) return resolve();
    if (document.getElementById(SCRIPT_ID)) {
      const prev = window.onTurnstileLoad;
      window.onTurnstileLoad = () => {
        prev?.();
        resolve();
      };
      return;
    }
    window.onTurnstileLoad = () => resolve();
    const s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });
  return scriptPromise;
}
