'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Search, ArrowRight,
  Blocks, Database, Cpu, ShieldCheck,
  Cloud, PieChart, Share2, Palette, Circle,
  Grid, FileText, MessageSquare
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

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
            { href: '/platform/ai-dev-platform#rag-studio', label: 'RAG Studio', icon: <Database size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform#agent-builder', label: 'Agent Builder', icon: <Blocks size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform#governance-hub', label: 'Governance Hub', icon: <ShieldCheck size={16} strokeWidth={1.5} /> },
            { href: '/platform/ai-dev-platform#ml-ops', label: 'ML Ops', icon: <Cpu size={16} strokeWidth={1.5} /> },
          ]
        },
        {
          // One product first (founder, 2026-10-09). Planned clusters, no dates.
          title: 'Planned',
          links: [
            { href: '/platform/cloud-devops', label: 'Cloud & DevOps', icon: <Cloud size={16} strokeWidth={1.5} /> },
            { href: '/platform/data-analytics', label: 'Data & Analytics', icon: <PieChart size={16} strokeWidth={1.5} /> },
            { href: '/platform/creative-xr', label: 'Creative & XR', icon: <Palette size={16} strokeWidth={1.5} /> },
            { href: '/platform/dev-platform', label: 'Dev Platform', icon: <Share2 size={16} strokeWidth={1.5} /> },
          ]
        },
      ],
      featured: {
        title: 'AI Dev Platform',
        badge: 'Early access',
        cards: [
          { title: 'RAG Studio', sub: 'Connect company documents to AI. Every answer cites its source.', cta: 'Join early access', href: '/early-access' },
          { title: 'Agent Builder', sub: 'Multi-agent workflows with a full execution trace. In development.', cta: 'Learn more', href: '/platform/ai-dev-platform#agent-builder' }
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
      { href: '/platform/ai-dev-platform', label: 'AI Dev Platform' },
      { href: '/early-access', label: 'Early access' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/lab', label: 'Interface Lab' },
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

// 2026-site nav hover: one liquid-glass pill (layoutId) slides to whichever
// item is hovered — or rests on the current section — and the label leans
// a little toward the cursor.
function useMagnet() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 30 });
  const sy = useSpring(y, { stiffness: 500, damping: 30 });
  return {
    style: { x: sx, y: sy },
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * 0.1);
      y.set((e.clientY - r.top - r.height / 2) * 0.1);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

function Pill({ active }: { active: boolean }) {
  return <motion.span layoutId="nav-pill" data-active={active} className="nav-pill" transition={{ type: 'spring', bounce: 0.1, stiffness: 400, damping: 30 }} />;
}

function PillLabel({ children, magnet }: { children: React.ReactNode; magnet: ReturnType<typeof useMagnet> }) {
  return (
    <motion.span style={magnet.style} className="relative z-[1] flex items-center gap-1 pointer-events-none">
      {children}
    </motion.span>
  );
}

function DesktopLink({ href, label, active, showPill, onHover }: { href: string; label: string; active: boolean; showPill: boolean; onHover: () => void }) {
  const magnet = useMagnet();
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative isolate flex h-9 items-center rounded-full px-3.5 text-[13px] font-sans transition-colors duration-300',
        active || showPill ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]',
      )}
    >
      {showPill && <Pill active={active} />}
      <PillLabel magnet={magnet}>{label}</PillLabel>
    </Link>
  );
}

function DesktopTrigger({ label, active, open, showPill, onHover, onClick }: { label: string; active: boolean; open: boolean; showPill: boolean; onHover: () => void; onClick: () => void }) {
  const magnet = useMagnet();
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      aria-expanded={open}
      className={cn(
        'relative isolate flex h-9 items-center rounded-full px-3.5 text-[13px] font-sans transition-colors duration-300',
        active || open || showPill ? 'text-[var(--sg-text-1)] font-medium' : 'text-[var(--sg-text-3)]',
      )}
    >
      {showPill && <Pill active={active} />}
      <PillLabel magnet={magnet}>
        {label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </PillLabel>
    </button>
  );
}

export function NavLinks({ mobile = false, onClose }: { mobile?: boolean, onClose?: () => void }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
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

  const under = (href?: string) => !!href && (pathname === href.split('#')[0] || !!pathname?.startsWith(`${href.split('#')[0]}/`));
  const activeLabel = links.find((l) =>
    l.href ? under(l.href) : l.dropdown?.some((i) => under(i.href)) || l.megaMenu?.columns.some((col: any) => col.links.some((i: any) => under(i.href))),
  )?.label;

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
    <div className="hidden sm:flex items-center gap-4" ref={dropdownRef}>
      <nav className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {links.map((link) => {
          // The pill rests on the open menu, else the hovered item, else the current section.
          const pillOn = (openDropdown ?? hovered ?? activeLabel) === link.label;
          if (link.megaMenu || link.dropdown) {
            const isActive = link.dropdown?.some(item => pathname === item.href || pathname?.startsWith(`${item.href}/`)) || 
                             link.megaMenu?.columns.some((col: any) => col.links.some((item: any) => pathname === item.href));
            const isOpen = openDropdown === link.label;
            
            return (
              <div key={link.label} className="relative">
                <DesktopTrigger
                  label={link.label}
                  active={!!isActive}
                  open={isOpen}
                  showPill={pillOn}
                  onHover={() => setHovered(link.label)}
                  onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                />
                
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
            <DesktopLink
              key={link.href}
              href={link.href!}
              label={link.label}
              active={!!isActive}
              showPill={pillOn}
              onHover={() => setHovered(link.label)}
            />
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
