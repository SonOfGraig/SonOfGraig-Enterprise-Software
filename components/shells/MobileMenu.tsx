'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NavLinks } from './NavLinks';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button suppressHydrationWarning 
        className="sm:hidden p-2 -mr-2 text-[var(--sg-text-1)]" 
        aria-label="Menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[var(--sg-bg)] z-[9999] sm:hidden flex flex-col h-[100dvh]"
          >
            <div className="flex items-center justify-between px-4 h-[64px] border-b border-[var(--sg-border)] shrink-0">
              <Link href="/" className="flex gap-2 items-center" onClick={() => setIsOpen(false)}>
                <Logo className="w-8 h-8" />
                <span className="font-display font-bold text-[18px] text-[var(--sg-text-1)] tracking-tight leading-none">
                  SonOfGraig
                </span>
              </Link>
              <button suppressHydrationWarning 
                className="p-2 -mr-2 text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] bg-[var(--sg-surface-2)] rounded-full transition-colors" 
                aria-label="Close Menu"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <NavLinks mobile onClose={() => setIsOpen(false)} />
            </div>
            
            <div className="p-6 border-t border-[var(--sg-border)] bg-[var(--sg-surface)] flex flex-col gap-3 shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <Button variant="secondary" size="lg" className="w-full justify-center" asChild onClick={() => setIsOpen(false)}>
                <Link href="/waitlist">Join waitlist</Link>
              </Button>
              <Button variant="primary" size="lg" className="w-full justify-center" asChild onClick={() => setIsOpen(false)}>
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
