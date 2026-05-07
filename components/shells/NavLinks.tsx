'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Search, ArrowRight,
  Blocks, Database, Cpu, ShieldCheck,
  Cloud, GitMerge, LineChart, ShieldAlert,
  PieChart, GitPullRequest, Share2,
  Palette, Glasses, Sparkles, Circle,
  Grid, FileText, MessageSquare
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type LinkItem = {
  href?: string;
  label?: string;
  icon?: React.ReactNode;
  divider?: boolean;
  isAction?: boolean;
};

type NavLink = {
  href?: string;
  label: string;
  dropdown?: LinkItem[];
  megaMenu?: any;
};

const links: NavLink[] = [
  { 
    label: 'Products',
    megaMenu: {
      columns: [
        {
          title: 'AI Dev Platform',
          links: [
            { href: '/platform/ai-dev-platform', label: 'Agent Builder', icon: <Blocks size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform', label: 'RAG Studio', icon: <Database size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform', label: 'ML Ops', icon: <Cpu size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform', label: 'Governance Hub', icon: <ShieldCheck size={16} strokeWidth={1.5} /> },
          ]
        },
        {
          title: 'Cloud & DevOps',
          links: [
            { href: '/platform/cloud-devops', label: 'Cloud Console', icon: <Cloud size={16} strokeWidth={1.5} /> },
            { href: '/platform/cloud-devops', label: 'Pipeline Builder', icon: <GitMerge size={16} strokeWidth={1.5} /> },
            { href: '/platform/cloud-devops', label: 'FinOps Dashboard', icon: <LineChart size={16} strokeWidth={1.5} /> },
            { href: '/platform/cloud-devops', label: 'Security Posture', icon: <ShieldAlert size={16} strokeWidth={1.5} /> },
          ]
        },
        {
          title: 'Data & Analytics',
          links: [
            { href: '/platform/data-analytics', label: 'Analytics Studio', icon: <PieChart size={16} strokeWidth={1.5} /> },
            { href: '/platform/data-analytics', label: 'Workflow Engine', icon: <GitPullRequest size={16} strokeWidth={1.5} /> },
            { href: '/platform/data-analytics', label: 'Data Pipelines', icon: <Share2 size={16} strokeWidth={1.5} /> },
          ]
        },
        {
          title: 'Creative & XR',
          links: [
            { href: '/platform/creative-xr', label: 'Design System Gen', icon: <Palette size={16} strokeWidth={1.5} /> },
            { href: '/platform/creative-xr', label: 'XR Builder', icon: <Glasses size={16} strokeWidth={1.5} /> },
            { href: '/platform/creative-xr', label: 'Brand Studio', icon: <Sparkles size={16} strokeWidth={1.5} /> },
          ]
        }
      ],
      featured: {
        title: 'New in v3.0',
        badge: 'Phase 1 Live',
        cards: [
          { title: 'RAG Studio', sub: 'Connect your company documents to AI. Hybrid retrieval, source citation, enterprise-grade.', cta: 'Join early access', href: '/platform/ai-dev-platform' },
          { title: 'Agent Builder', sub: 'Visual canvas for autonomous AI agents. Beta Q4 2026.', cta: 'Learn more', href: '/platform/ai-dev-platform' }
        ]
      },
      footer: [
        { href: '/platform', label: 'View all products', icon: <Grid size={12} strokeWidth={1.5} /> },
        { href: '/api-reference', label: 'Developer docs', icon: <FileText size={12} strokeWidth={1.5} /> },
        { href: '/contact', label: 'Talk to sales', icon: <MessageSquare size={12} strokeWidth={1.5} /> },
      ]
    }
  },
  { 
    label: 'Platform',
    dropdown: [
      { href: '/platform', label: 'Platform overview' },
      { href: '/platform/timeline', label: 'Build timeline' },
      { href: '/early-access', label: 'Early access' },
      { href: '/pricing', label: 'Pricing' },
    ]
  },
  { 
    label: 'Services',
    dropdown: [
      { href: '/services/ai-agent-implementation', label: 'AI Agent Implementation', icon: <Blocks size={16} strokeWidth={1.5} /> },
      { href: '/services/rag-knowledge-base-setup', label: 'RAG Knowledge Base', icon: <Database size={16} strokeWidth={1.5} /> },
      { href: '/services/cloud-architecture', label: 'Cloud Architecture', icon: <Cloud size={16} strokeWidth={1.5} /> },
      { href: '/services/ai-governance-audit', label: 'AI Governance Audit', icon: <ShieldCheck size={16} strokeWidth={1.5} /> },
      { divider: true },
      { href: '/services', label: 'View all services', icon: <ArrowRight size={14} strokeWidth={1.5} />, isAction: true },
    ]
  },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
];

export function NavLinks({ mobile = false, onClose }: { mobile?: boolean, onClose?: () => void }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (mobile) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            if (link.megaMenu || link.dropdown) {
              const isActive = link.dropdown?.some(item => pathname === item.href || pathname?.startsWith(`${item.href}/`)) || 
                               link.megaMenu?.columns.some((col: any) => col.links.some((item: any) => pathname === item.href));
              const isOpen = openDropdown === link.label;
              
              return (
                <div key={link.label} className="flex flex-col gap-2">
                  <button suppressHydrationWarning
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                    className={cn(
                      "flex items-center justify-between text-[15px] font-sans transition-colors w-full text-left",
                      isActive || isOpen ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]'
                    )}
                  >
                    {link.label}
                    <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
                  </button>
                  
                  {isOpen && link.dropdown && (
                    <div className="flex flex-col gap-2 pl-4 border-l border-[var(--sg-border)] ml-1">
                      {link.dropdown.map((item, idx) => {
                        if (item.divider) {
                          return <div key={idx} className="h-px bg-[var(--sg-border)] my-1" />;
                        }
                        return (
                          <Link
                            key={item.href || idx}
                            href={item.href!}
                            onClick={() => {
                              setOpenDropdown(null);
                              onClose?.();
                            }}
                            className={cn(
                              "flex items-center gap-2 py-1 text-[14px] font-sans transition-colors",
                              pathname === item.href ? "text-[var(--sg-blue)] font-medium" : "text-[var(--sg-text-2)]",
                              item.isAction && "text-[var(--sg-blue)]"
                            )}
                          >
                            {item.icon && (
                              <span className={cn("text-[var(--sg-text-4)]", item.isAction && "text-[var(--sg-blue)]")}>
                                {item.icon}
                              </span>
                            )}
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {isOpen && link.megaMenu && (
                    <div className="flex flex-col gap-4 pl-4 border-l border-[var(--sg-border)] ml-1 mt-2">
                      {link.megaMenu.columns.map((col: any, i: number) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="text-[11px] font-semibold text-[var(--sg-text-1)] uppercase tracking-wider">{col.title}</div>
                          {col.links.map((item: any, j: number) => (
                            <Link
                              key={j}
                              href={item.href}
                              onClick={() => {
                                setOpenDropdown(null);
                                onClose?.();
                              }}
                              className="flex items-center gap-2 py-1 text-[14px] font-sans transition-colors text-[var(--sg-text-2)]"
                            >
                              <span className="text-[var(--sg-text-4)]">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => onClose?.()}
                className={cn(
                  "text-[15px] font-sans transition-colors",
                  isActive ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Search Bar */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-[var(--sg-text-4)]" />
          </div>
          <input suppressHydrationWarning
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-3 rounded-[var(--r-md)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)] text-[14px] text-[var(--sg-text-1)] placeholder:text-[var(--sg-text-4)] focus:outline-none focus:ring-1 focus:ring-[var(--sg-blue)] focus:border-[var(--sg-blue)] transition-all"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-6" ref={dropdownRef}>
      <nav className="flex items-center gap-6">
        {links.map((link) => {
          if (link.megaMenu || link.dropdown) {
            const isActive = link.dropdown?.some(item => pathname === item.href || pathname?.startsWith(`${item.href}/`)) || 
                             link.megaMenu?.columns.some((col: any) => col.links.some((item: any) => pathname === item.href));
            const isOpen = openDropdown === link.label;
            
            return (
              <div key={link.label} className="relative">
                <button suppressHydrationWarning
                  onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                  className={cn(
                    "flex items-center gap-1 text-[13px] font-sans transition-colors",
                    isActive || isOpen ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]'
                  )}
                >
                  {link.label}
                  <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isOpen && link.dropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.1, ease: [0.4, 0, 1, 1] } }}
                      className="absolute top-full left-0 mt-4 min-w-[220px] bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-md)] shadow-lg py-1 z-[var(--z-dropdown)] origin-top-left"
                    >
                      {link.dropdown.map((item, idx) => {
                        if (item.divider) {
                          return <div key={idx} className="h-px bg-[var(--sg-border)] my-1" />;
                        }
                        return (
                          <Link
                            key={item.href || idx}
                            href={item.href!}
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2 text-[13px] font-sans transition-colors hover:bg-[var(--sg-surface-2)] group",
                              pathname === item.href ? "text-[var(--sg-blue)] font-medium" : "text-[var(--sg-text-2)]",
                              item.isAction && "text-[var(--sg-blue)]"
                            )}
                          >
                            {item.icon && (
                              <span className={cn("text-[var(--sg-text-4)] transition-colors group-hover:text-[var(--sg-blue)]", item.isAction && "text-[var(--sg-blue)]")}>
                                {item.icon}
                              </span>
                            )}
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}

                  {isOpen && link.megaMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.1, ease: [0.4, 0, 1, 1] } }}
                      className="absolute top-[calc(100%+22px)] left-[-32px] w-[1080px] max-w-[calc(100vw-2rem)] bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-b-[var(--r-xl)] shadow-xl pt-8 px-8 pb-20 z-[var(--z-dropdown)] flex gap-8 cursor-default origin-top-left"
                    >
                      <div className="flex-1 grid grid-cols-4 gap-6">
                        {link.megaMenu.columns.map((col: any, i: number) => (
                          <div key={i} className="flex flex-col gap-4">
                            <h4 className="text-[11px] font-semibold text-[var(--sg-text-1)] uppercase tracking-wider">{col.title}</h4>
                            <div className="flex flex-col gap-1 mt-1">
                              {col.links.map((item: any, j: number) => (
                                <Link key={j} href={item.href} onClick={() => setOpenDropdown(null)} className="flex items-center gap-2.5 px-3 py-2 -mx-3 rounded-[var(--r-md)] text-[13px] text-[var(--sg-text-2)] hover:bg-[var(--sg-surface-2)] transition-colors group">
                                  <span className="text-[var(--sg-text-4)] group-hover:text-[var(--sg-blue)] transition-colors">
                                    {item.icon}
                                  </span>
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-[320px] bg-[var(--sg-surface-2)] rounded-[var(--r-lg)] p-5 border border-[var(--sg-border)]">
                        <div className="flex items-center justify-between mb-5">
                          <h4 className="text-[13px] font-semibold text-[var(--sg-text-1)]">{link.megaMenu.featured.title}</h4>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--sg-blue-glow)] border border-[var(--sg-blue-border)] text-[var(--sg-blue)] text-[10px] font-medium">
                            <Circle size={6} fill="currentColor" />
                            {link.megaMenu.featured.badge}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          {link.megaMenu.featured.cards.map((card: any, i: number) => (
                            <Link key={i} href={card.href} onClick={() => setOpenDropdown(null)} className="block bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-md)] p-4 hover:border-[var(--sg-blue-border)] transition-colors group">
                              <div className="text-[13px] font-semibold text-[var(--sg-text-1)] mb-1">{card.title}</div>
                              <div className="text-[12px] text-[var(--sg-text-3)] mb-3 leading-relaxed">{card.sub}</div>
                              <div className="flex items-center gap-1 text-[12px] font-medium text-[var(--sg-text-2)] group-hover:text-[var(--sg-blue)] transition-colors">
                                {card.cta}
                                <ArrowRight size={12} strokeWidth={2} />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {link.megaMenu.footer && (
                        <div className="absolute bottom-0 left-0 w-full bg-[var(--sg-surface)] border-t border-[var(--sg-border)] rounded-b-[var(--r-xl)] px-8 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {link.megaMenu.footer.map((item: any, idx: number) => (
                              <Link key={idx} href={item.href} onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 text-[12px] text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] transition-colors">
                                <span className="text-[var(--sg-text-4)]">{item.icon}</span>
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <Link href="/sitemap" onClick={() => setOpenDropdown(null)} className="flex items-center gap-1 text-[11px] font-semibold text-[var(--sg-text-2)] hover:text-[var(--sg-text-1)] tracking-wider uppercase transition-colors">
                            VIEW SITEMAP
                            <ArrowRight size={12} strokeWidth={2} />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href!}
              className={cn(
                "text-[13px] font-sans transition-colors",
                isActive ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)]'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      {/* Search Bar */}
      <div className="relative ml-2">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
          <Search size={14} className="text-[var(--sg-text-4)]" />
        </div>
        <input suppressHydrationWarning
          type="text"
          placeholder="Search..."
          className="w-48 h-8 pl-8 pr-3 rounded-[var(--r-md)] border border-[var(--sg-border)] bg-[var(--sg-surface-2)] text-[13px] text-[var(--sg-text-1)] placeholder:text-[var(--sg-text-4)] focus:outline-none focus:ring-1 focus:ring-[var(--sg-blue)] focus:border-[var(--sg-blue)] transition-all"
        />
      </div>
    </div>
  );
}
