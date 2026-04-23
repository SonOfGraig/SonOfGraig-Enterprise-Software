'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DismissButton() {
  const [dismissed, setDismissed] = useState(true); // Default true to prevent hydration mismatch, or false and hide if true

  useEffect(() => {
    const isDismissed = localStorage.getItem('sg-announce-dismissed') === 'true';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(isDismissed);
  }, []);

  if (dismissed) return null;

  return (
    <button suppressHydrationWarning
      onClick={() => {
        localStorage.setItem('sg-announce-dismissed', 'true');
        document.getElementById('announcement-bar')?.classList.add('hidden');
      }}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sg-text-4)] hover:text-white transition-colors p-1"
      aria-label="Dismiss announcement"
    >
      <X size={14} strokeWidth={1.5} />
    </button>
  );
}
