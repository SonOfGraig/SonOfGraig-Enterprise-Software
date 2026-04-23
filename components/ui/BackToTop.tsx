'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold for the "third section" - using 1.5x viewport height as a reliable metric
      // across different screen sizes.
      setIsVisible(window.scrollY > window.innerHeight * 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button suppressHydrationWarning
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        // Base positioning and box model
        "fixed bottom-8 right-8 z-[100] h-11 px-[18px] flex items-center gap-2",
        "rounded-full cursor-pointer border",
        // Theming & Colors (mapped strictly to global variables)
        "bg-[var(--glass-bg)] backdrop-blur-[20px] border-[var(--sg-border-md)]",
        "shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
        // Transitions
        "transition-[opacity,transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-spring)]",
        // Hover state
        "hover:bg-[var(--sg-surface-2)] hover:border-[var(--sg-blue-border)]",
        "hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_0_3px_var(--sg-blue-glow)]",
        "dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_0_3px_var(--sg-blue-glow)]",
        // Active state
        "active:translate-y-0 active:transition-none",
        // Visibility state
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-6 pointer-events-none"
      )}
    >
      <ChevronUp size={14} strokeWidth={2} className="text-[var(--sg-blue)]" />
      <span className="text-[12px] font-semibold font-sans text-[var(--sg-text-1)] whitespace-nowrap">
        Back to top
      </span>
    </button>
  );
}
