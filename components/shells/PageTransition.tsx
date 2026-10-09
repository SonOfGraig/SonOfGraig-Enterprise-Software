'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  
  // Determine if this is a legal page
  const isLegalPage = pathname === '/popia' || pathname === '/terms' || pathname === '/privacy' || pathname === '/security';
  
  // Determine if this is a blog article
  const isBlogArticle = pathname?.startsWith('/blog/');
  
  // Determine if this is an auth page
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const pageVariants = {
    initial: (reduced: boolean) => {
      if (isLegalPage) return { opacity: 0, y: 0 };
      if (isAuthPage) return { opacity: 0, scale: 0.95 };
      return {
        opacity: 0,
        y: reduced ? 0 : 12,
      };
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: isBlogArticle ? 0.3 : (isAuthPage || isLegalPage ? 0.2 : 0.25), 
        ease: (isAuthPage ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1]) as [number, number, number, number]
      } 
    },
    exit: (reduced: boolean) => {
      if (isLegalPage) return { opacity: 0, y: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number, number, number, number] } };
      if (isAuthPage) return { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number, number, number, number] } };
      return {
        opacity: 0,
        y: reduced ? 0 : -8,
        transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
      };
    },
  };

  return (
    // initial={false}: the first page load renders fully visible from the
    // server HTML (no opacity:0 waiting on hydration); transitions still run
    // on client-side navigation.
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        className="flex-1"
        variants={pageVariants}
        custom={reduced ?? false}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
