'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[140px] h-[36px]" />; // Placeholder
  }

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-full p-1 shadow-sm">
      <button suppressHydrationWarning
        onClick={() => setTheme('dark')}
        className={cn(
          "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all duration-200",
          isDark 
            ? "bg-[var(--sg-blue)] text-white shadow-sm" 
            : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-2)]"
        )}
        aria-label="Switch to dark theme"
      >
        <Moon size={14} strokeWidth={isDark ? 2 : 1.5} />
        <span className="hidden sm:inline">Dark</span>
      </button>
      <button suppressHydrationWarning
        onClick={() => setTheme('light')}
        className={cn(
          "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all duration-200",
          !isDark 
            ? "bg-[var(--sg-blue)] text-white shadow-sm" 
            : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-2)]"
        )}
        aria-label="Switch to light theme"
      >
        <Sun size={14} strokeWidth={!isDark ? 2 : 1.5} />
        <span className="hidden sm:inline">Light</span>
      </button>
    </div>
  );
}
