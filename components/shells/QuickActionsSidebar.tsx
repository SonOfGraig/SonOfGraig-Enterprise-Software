'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, FileText, Brain, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuickActionsSidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'copilot' | 'support' | 'docs' | 'contact'>('copilot');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-set active tab based on path if needed
  const isCopilotPath = pathname === '/copilot';

  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[var(--z-fixed, 50)] bg-[var(--sg-surface)] border border-[var(--sg-border-md)] border-r-0 rounded-l-xl p-2.5 text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] shadow-lg transition-colors"
        aria-label="Expand quick actions"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
    )
  }

  return (
    <div 
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[var(--z-fixed, 50)] flex flex-col items-center py-6 px-3 bg-[var(--sg-surface)]/95 backdrop-blur-md border border-[var(--sg-border-md)] border-r-0 rounded-l-[32px] shadow-2xl"
      role="navigation" 
      aria-label="Quick actions"
    >
      {/* Panel label */}
      <div className="text-[10px] font-black tracking-[0.1em] text-[var(--sg-text-4)] uppercase mb-5 select-none font-display text-center whitespace-nowrap">
        Quick Actions
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {/* Tab 1: AI Copilot */}
        <Link 
          href="/copilot"
          onClick={() => setActiveTab('copilot')}
          className={cn(
            "relative group flex items-center justify-center w-[52px] h-[52px] rounded-[18px] transition-all duration-200",
            (activeTab === 'copilot' || isCopilotPath)
              ? "bg-[var(--sg-blue)] text-white shadow-lg ring-2 ring-[var(--sg-blue-deep)]/40 ring-offset-2 ring-offset-[var(--sg-surface)]" 
              : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] hover:bg-[var(--sg-surface-2)] border border-[var(--sg-border-str)]"
          )}
          aria-label="Open AI Copilot"
        >
          <Brain size={24} strokeWidth={1.6} />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[var(--sg-amber)] border-2 border-[var(--sg-blue)] box-content"></div> 
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            <div className="text-[13px] font-semibold text-[var(--sg-text-1)]">AI Copilot</div>
            <div className="text-[11px] text-[var(--sg-text-3)]">Open assistant</div>
            {/* Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] border-[5px] border-transparent border-l-[var(--sg-border-md)]"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] border-[5px] border-transparent border-l-[var(--sg-surface)]"></div>
          </div>
        </Link>

        <div className="w-8 h-[1px] bg-[var(--sg-border-str)] my-1"></div>

        {/* Tab 2: Customer Support */}
        <button 
          onClick={() => setActiveTab('support')}
          className={cn(
            "relative group flex items-center justify-center w-[52px] h-[52px] rounded-[18px] transition-all duration-200",
            activeTab === 'support' 
              ? "bg-[var(--sg-blue)] text-white shadow-lg ring-2 ring-[var(--sg-blue-deep)]/40 ring-offset-2 ring-offset-[var(--sg-surface)]" 
              : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] hover:bg-[var(--sg-surface-2)] border border-[var(--sg-border-str)]"
          )}
          aria-label="Customer support"
        >
          <MessageSquare size={22} strokeWidth={1.6} />
          <div className="absolute right-full mr-4 px-3 py-2 bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            <div className="text-[13px] font-semibold text-[var(--sg-text-1)]">Support</div>
            <div className="text-[11px] text-[var(--sg-text-3)]">Get help</div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] border-[5px] border-transparent border-l-[var(--sg-border-md)]"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] border-[5px] border-transparent border-l-[var(--sg-surface)]"></div>
          </div>
        </button>

        {/* Tab 3: Documentation */}
        <button 
          onClick={() => setActiveTab('docs')}
          className={cn(
            "relative group flex items-center justify-center w-[52px] h-[52px] rounded-[18px] transition-all duration-200",
            activeTab === 'docs' 
              ? "bg-[var(--sg-blue)] text-white shadow-lg ring-2 ring-[var(--sg-blue-deep)]/40 ring-offset-2 ring-offset-[var(--sg-surface)]" 
              : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] hover:bg-[var(--sg-surface-2)] border border-[var(--sg-border-str)]"
          )}
          aria-label="Documentation"
        >
          <FileText size={22} strokeWidth={1.6} />
          <div className="absolute right-full mr-4 px-3 py-2 bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            <div className="text-[13px] font-semibold text-[var(--sg-text-1)]">Documentation</div>
            <div className="text-[11px] text-[var(--sg-text-3)]">API & Guides</div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] border-[5px] border-transparent border-l-[var(--sg-border-md)]"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] border-[5px] border-transparent border-l-[var(--sg-surface)]"></div>
          </div>
        </button>

        <div className="w-8 h-[1px] bg-[var(--sg-border-str)] my-1"></div>

        {/* Tab 4: Contact */}
        <button 
          onClick={() => setActiveTab('contact')}
          className={cn(
            "relative group flex items-center justify-center w-[52px] h-[52px] rounded-[18px] transition-all duration-200",
            activeTab === 'contact' 
              ? "bg-[var(--sg-blue)] text-white shadow-lg ring-2 ring-[var(--sg-blue-deep)]/40 ring-offset-2 ring-offset-[var(--sg-surface)]" 
              : "text-[var(--sg-text-3)] hover:text-[var(--sg-text-1)] hover:bg-[var(--sg-surface-2)] border border-[var(--sg-border-str)]"
          )}
          aria-label="Contact sales"
        >
          <Phone size={22} strokeWidth={1.6} />
          <div className="absolute right-full mr-4 px-3 py-2 bg-[var(--sg-surface)] border border-[var(--sg-border-md)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            <div className="text-[13px] font-semibold text-[var(--sg-text-1)]">Contact</div>
            <div className="text-[11px] text-[var(--sg-text-3)]">Sales & Inquiries</div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[5px] border-[5px] border-transparent border-l-[var(--sg-border-md)]"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] border-[5px] border-transparent border-l-[var(--sg-surface)]"></div>
          </div>
        </button>
        
        <button 
          onClick={() => setIsCollapsed(true)}
          className="mt-3 w-12 h-8 rounded-full border border-[var(--sg-border-str)] flex items-center justify-center bg-[var(--sg-surface-2)] text-[var(--sg-text-4)] hover:text-[var(--sg-text-2)] hover:border-[var(--sg-border-md)] transition-colors"
          aria-label="Collapse quick actions"
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
