'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import './copilot.css';
import { 
  Plus, Search, Info, RotateCcw, Copy, Brain, CircleAlert, 
  MessageSquare, User, FileText, Send, Paperclip, ChevronLeft, ChevronRight, X, 
  ThumbsUp, ThumbsDown, UserPlus, Server, Check, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

function escapeHtml(t: string) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

function formatMarkdown(text: string) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/```(\w*)\n?([\s\S]*?)```/g,(_,lang,code)=>`<pre><code>${code.trim()}</code></pre>`)
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,'<em>$1</em>')
    .replace(/^#{3}\s+(.+)$/gm,'<strong style="font-size:13px;color:var(--t1);display:block;margin:10px 0 4px">$1</strong>')
    .replace(/^#{2}\s+(.+)$/gm,'<strong style="font-size:14px;color:var(--t1);display:block;margin:12px 0 6px">$1</strong>')
    .replace(/^#{1}\s+(.+)$/gm,'<strong style="font-size:15px;color:var(--t1);display:block;margin:14px 0 8px">$1</strong>')
    .replace(/^[-*]\s+(.+)$/gm,'<li style="margin:2px 0;padding-left:4px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g,match=>`<ul style="padding-left:16px;margin:6px 0">${match}</ul>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:var(--blue);text-decoration:underline">$1</a>')
    .replace(/^---$/gm,'<hr style="border:none;border-top:1px solid var(--bd);margin:10px 0">')
    .replace(/\|(.+)\|/g, (_, row) => {
      const cells = row.split('|').map((c: string) => c.trim());
      if(cells.every((c: string) => /^[-:]+$/.test(c))) return '';
      return `<tr>${cells.map((c: string)=>`<td style="padding:4px 8px;border:1px solid var(--bd)">${c}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, match => `<table style="border-collapse:collapse;width:100%;margin:8px 0;font-size:11px">${match}</table>`)
    .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
}

const HISTORY_DATA = [
  { id:'h1', title:'RAG Studio pricing & early access', preview:'R4,999/month Starter plan…', time:'2m ago', icon:'R' },
  { id:'h2', title:'POPIA compliance for AI systems', preview:'Under Section 19, you must…', time:'1h ago', icon:'P' },
  { id:'h3', title:'Agent Builder architecture question', preview:'LangGraph handles stateful…', time:'3h ago', icon:'A' },
  { id:'h4', title:'API key reset and rotation', preview:'To rotate your API key…', time:'Yesterday', icon:'K' },
  { id:'h5', title:'Billing and invoice clarification', preview:'Your Growth plan invoice…', time:'2 days ago', icon:'B' },
  { id:'h6', title:'GoLang vs Next.js API routes', preview:'For multi-tenant SaaS…', time:'3 days ago', icon:'G' },
];

export default function CopilotPage() {
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionMsgCount, setSessionMsgCount] = useState(0);
  const [sessionTokenCount, setSessionTokenCount] = useState(0);
  const [responseTime, setResponseTime] = useState('—');
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredHistory = HISTORY_DATA.filter(h => 
    h.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => { scrollBottom(); }, [messages, isStreaming]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setAttachments([]);
    setActiveHistoryId(null);
    setSessionMsgCount(0);
    setSessionTokenCount(0);
    setResponseTime('—');
    setInputValue('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setMobileSidebarOpen(false);
  };

  const clearChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setSessionMsgCount(0);
    setSessionTokenCount(0);
    setResponseTime('—');
  };
  
  const getFallbackResponse = (q: string) => {
    const ql = q.toLowerCase();
    if(ql.includes('growth') || ql.includes('pricing') || ql.includes('plan')){
      return `## Growth Plan — R19,999/month\n\nThe **Growth plan** is our most popular tier and includes:\n\n- **All 4 AI Dev Platform products** — Agent Builder, RAG Studio, Fine-Tuning Ops, and Governance Hub\n- **10M tokens/month** included (R0.02 per additional 1,000 tokens)\n- **25 team seats**\n- Priority support with **8-hour SLA**\n- **99.9% uptime SLA**\n- SOC 2 Type II + POPIA compliance documentation\n- AWS af-south-1 data residency (Cape Town)\n\n### Compared to Starter (R4,999/month)\n\nStarter includes only Agent Builder and RAG Studio, limited to 5 users and 1M tokens/month.\n\n### Enterprise\n\nFor unlimited users, custom SLAs, BYOK encryption, and on-premises deployment, contact our sales team for a custom quote.\n\n**Ready to start?** Join the waitlist at [sonofgraig.com/early-access](#) — early access customers receive the first year at a significantly reduced rate.`;
    }
    if(ql.includes('rag') || ql.includes('knowledge base') || ql.includes('launch')){
      return `## RAG Studio — Launching Q3 2026\n\n**RAG Studio** (Retrieval-Augmented Generation) enables you to build AI chat systems grounded in your company's private knowledge base.\n\n### How it works\n\n1. **Connect documents** — Google Drive, SharePoint, Confluence, Notion, S3, direct upload\n2. **Automatic indexing** — chunking, embedding, and vector storage handled automatically\n3. **Hybrid retrieval** — semantic + keyword search for higher accuracy\n4. **Cited answers** — every response links to the exact document and page used\n\n### What makes it production-ready\n\n- **Access control** — users only see answers from documents they have permission to access\n- **Freshness management** — auto-reindex when source documents update\n- **Ragas evaluation** — precision, recall, and faithfulness metrics tracked per query\n- **POPIA-safe** — no data leaves AWS af-south-1\n\n### Early Access\n\nWe're currently accepting 5 founding customers for the early access programme.\n\nApply at [sonofgraig.com/early-access](#).`;
    }
    if(ql.includes('popia') || ql.includes('compliance') || ql.includes('privacy')){
      return `## POPIA Compliance at SonOfGraig\n\nAs a South African enterprise platform, POPIA compliance is built into our architecture from day one.\n\n**Data residency**\n- All customer data stored in AWS af-south-1 (Cape Town)\n- Contractually guaranteed in our Data Processing Agreement\n\n**Technical safeguards**\n- AES-256 encryption at rest, TLS 1.3 in transit\n- PII scrubbing in AI pipelines (automated detection + removal)\n- Immutable audit trail for all model decisions\n- Role-based access with least-privilege enforcement\n\nDownload our **Data Processing Agreement** at [sonofgraig.com/dpa](#).`;
    }
    if(ql.includes('agent') || ql.includes('copilot') || ql.includes('difference') || ql.includes('vs')){
      return `## Agent Builder vs RAG Studio\n\nThese are two distinct products that solve different problems.\n\n### RAG Studio\n**What it does:** Builds AI that *knows* your company documents and answers questions from them.\n\n### Agent Builder\n**What it does:** Builds autonomous AI agents that *act* — using tools, calling APIs, executing multi-step workflows.\n\n### Used together\nA common pattern: Agent Builder for the workflow logic + RAG Studio as a tool the agent calls to retrieve grounded context before responding.`;
    }
    if(ql.includes('early access') || ql.includes('waitlist') || ql.includes('join')){
      return `## Joining the Early Access Programme\n\nSonOfGraig is currently accepting **5 founding customers** who will co-shape the platform.\n\n### What founding customers get\n- **70% discount** first year\n- **Founding team access** & direct Slack channel\n- **Feature co-development** (your use case is built first)\n\n### How to apply\n1. Visit [sonofgraig.com/early-access](#)\n2. Complete the application\n3. We'll contact you within **2 business days**`;
    }
    return `Thank you for your question. I'm the SonOfGraig AI Copilot — here to help with anything related to the platform, pricing, compliance, or technical questions.\n\nCould you tell me more specifically what you're looking to understand? I can help with:\n- **Pricing and plans**\n- **Platform products**\n- **Compliance**\n- **Early access**\n\nWhat would be most helpful for you right now?`;
  };

  const getFollowups = (q: string) => {
    const ql = q.toLowerCase();
    if(ql.includes('growth') || ql.includes('pricing')) return ['How does Enterprise pricing work?','Compare Starter vs Growth'];
    if(ql.includes('rag') || ql.includes('studio')) return ['How does Agent Builder differ?','What document types are supported?'];
    if(ql.includes('popia') || ql.includes('compliance')) return ['Download the DPA','How does PII scrubbing work?'];
    if(ql.includes('agent') || ql.includes('difference')) return ['Show me Agent Builder architecture','What tools can agents use?'];
    return ['Tell me about pricing','How do I get early access?','What is the tech stack?'];
  };

  const sendMessage = async (textOveride?: string) => {
    if (isStreaming) return;
    const text = (textOveride || inputValue).trim();
    if (!text && attachments.length === 0) return;

    const fileMeta = attachments.length > 0 ? `\n\n[Attached files: ${attachments.map(a=>a.name).join(', ')}]` : '';
    const fullText = text + fileMeta;

    setInputValue('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setIsStreaming(true);

    const newUserMsg = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      attachments: attachments.map(a => a.name),
      time: new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'})
    };

    setMessages(prev => [...prev, newUserMsg]);
    setConversationHistory(prev => [...prev, { role: 'user', content: fullText }]);
    setAttachments([]);
    
    // Simulate API delay and streaming
    const start = performance.now();
    await new Promise(r => setTimeout(r, 600));
    
    const fallbackResponse = getFallbackResponse(fullText);
    const followupsArr = getFollowups(fullText);

    const newAiMsg = {
      id: 'msg-ai-' + Date.now(),
      role: 'assistant',
      content: fallbackResponse,
      time: new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'}),
      followups: followupsArr
    };

    setMessages(prev => [...prev, newAiMsg]);
    setConversationHistory(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
    
    const elapsed = ((performance.now() - start) / 1000).toFixed(1) + 's';
    setResponseTime(elapsed);
    setSessionMsgCount(prev => prev + 2);
    setSessionTokenCount(prev => prev + Math.round(fallbackResponse.length / 3.5));
    setIsStreaming(false);
  };

  const insertQuickAction = (text: string) => {
    setInputValue(text);
    if (inputRef.current) inputRef.current.focus();
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="copilot-container">
      {mobileSidebarOpen && <div className="sb-backdrop show" onClick={() => setMobileSidebarOpen(false)}></div>}

      <aside className={`cp-sidebar ${!sidebarOpen ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sb-head">
          <div>
            <Link href="/" className="sb-logo">Son<span>Of</span>Graig</Link>
            <div className="sb-logo-sub">AI Copilot</div>
          </div>
          <div className="sb-head-actions">
            <button className="icon-btn hidden md:flex" onClick={startNewChat} title="New chat"><Plus size={16} strokeWidth={1.5} /></button>
            <button className="icon-btn flex md:hidden" onClick={() => setMobileSidebarOpen(false)} title="Close"><X size={16} strokeWidth={1.5} /></button>
          </div>
        </div>

        <button className="new-chat-btn" onClick={startNewChat}>
          <Plus size={15} strokeWidth={1.5} />
          New conversation
        </button>

        <div className="sb-search">
          <Search size={14} strokeWidth={1.5} />
          <input type="text" placeholder="Search conversations…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>

        <div className="sb-section-label">Recent</div>

        <div className="sb-history">
          {filteredHistory.map(h => (
            <div key={h.id} className={`history-item ${activeHistoryId === h.id ? 'active' : ''}`} onClick={() => setActiveHistoryId(h.id)}>
              <div className="history-item-icon">{h.icon}</div>
              <div className="history-meta">
                <div className="history-title">{h.title}</div>
                <div className="history-preview">{h.preview}</div>
              </div>
              <div className="history-time">{h.time}</div>
            </div>
          ))}
        </div>

        <div className="sb-footer">
          <div className="sb-status">
            <div className="status-dot"></div>
            <div className="sb-status-info">
              <div className="title">AI Copilot online</div>
              <div className="sub">gpt-4o · claude-3-5-sonnet</div>
            </div>
          </div>
          <div className="sb-user">
            <div className="user-avatar">TG</div>
            <div>
              <div className="name">Tumiso Graig</div>
              <div className="plan">Growth plan</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="cp-main">
        <div className="topbar">
          <button className="icon-btn topbar-toggle" onClick={() => {
            if (window.innerWidth <= 768) setMobileSidebarOpen(true);
            else setSidebarOpen(!sidebarOpen);
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div className="flex-1">
            <div className="topbar-title">AI Copilot</div>
            <div className="topbar-sub hidden sm:block">Customer support & assistance</div>
          </div>
          <div className="topbar-pills">
            <span className="topbar-pill pill-live"><span className="pill-dot"></span>Live</span>
            <span className="topbar-pill pill-blue hidden sm:inline-flex">POPIA compliant</span>
            <span className="topbar-pill pill-blue hidden md:inline-flex">RAG-grounded</span>
          </div>
          <div className="topbar-end">
            <button className={`tb-btn ${infoPanelOpen ? 'active' : ''} hidden md:flex`} onClick={() => setInfoPanelOpen(!infoPanelOpen)}>
              <Info size={14} strokeWidth={1.5} />
              Context
            </button>
            <button className="tb-btn" onClick={clearChat}>
              <RotateCcw size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button className="theme-switch" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
               {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
               ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
               )}
            </button>
          </div>
        </div>

        <div className={`context-banner ${!showBanner ? 'hidden' : ''}`}>
          <Server size={14} className="text-[var(--blue)] shrink-0" strokeWidth={1.5} />
          <span className="cb-tag">POPIA</span>
          <span className="truncate">Responses are grounded in your company knowledge base. No hallucination. All sources cited.</span>
          <button className="cb-close" onClick={() => setShowBanner(false)}><X size={14} strokeWidth={1.5} /></button>
        </div>

        <div className="chat-area" ref={chatAreaRef}>
          {messages.length === 0 && (
            <div className="welcome">
              <div className="welcome-orb">
                <Brain size={28} strokeWidth={1.5} />
              </div>
              <div className="welcome-title">SonOfGraig AI Copilot</div>
              <div className="welcome-sub">Enterprise-grade support grounded in your knowledge base. Ask about pricing, platform features, POPIA compliance, or API usage.</div>
              <div className="welcome-chips">
                <button className="chip" onClick={() => sendMessage('What is included in the Growth plan?')}>Growth plan details</button>
                <button className="chip" onClick={() => sendMessage('Explain how RAG Studio works and when it launches')}>RAG Studio launch</button>
                <button className="chip" onClick={() => sendMessage('How does SonOfGraig ensure POPIA compliance?')}>POPIA compliance</button>
                <button className="chip" onClick={() => sendMessage('How do I get early access to the AI Dev Platform?')}>Early access</button>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={msg.id} className="msg-group animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className={`msg-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`msg-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>{msg.role === 'user' ? 'TG' : 'AI'}</div>
                <div className="msg-content">
                  <div className={`bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    {msg.role === 'user' ? (
                      <>
                        {msg.content}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/20 text-xs">
                            Attachments: {msg.attachments.join(', ')}
                          </div>
                        )}
                      </>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                    )}
                  </div>
                  <div className="msg-meta">
                    <div className="msg-actions">
                      <button className={`msg-act-btn ${copiedMsgId === msg.id ? 'copied' : ''}`} onClick={() => copyText(msg.content, msg.id)}>
                        {copiedMsgId === msg.id ? <Check size={12} strokeWidth={2} className="text-[var(--sg-success)]" /> : <Copy size={12} strokeWidth={1.5} />}
                      </button>
                      {msg.role === 'assistant' && (
                        <button className="msg-act-btn" onClick={() => sendMessage(conversationHistory[conversationHistory.length-2]?.content)}>
                          <RotateCcw size={12} strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              </div>
              {msg.role === 'assistant' && msg.followups && msg.followups.length > 0 && (
                <div className="followups pb-2">
                  {msg.followups.map((f: string, j: number) => (
                    <button key={j} className="followup-chip" onClick={() => sendMessage(f)}>{f}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isStreaming && (
            <div className="typing-row">
              <div className="msg-avatar ai">AI</div>
              <div className="typing-bubble">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
        </div>

        {attachments.length > 0 && (
          <div className="attachment-bar">
            {attachments.map((f, i) => (
              <div key={i} className="attachment-chip">
                <Paperclip size={12} strokeWidth={1.5} />
                {f.name}
                <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))}><X size={12} strokeWidth={1.5} /></button>
              </div>
            ))}
          </div>
        )}

        <div className="input-area">
          <div className="quick-actions-bar hidden sm:flex">
            <button className="qa-chip" onClick={() => insertQuickAction('Explain my billing statement')}>Billing</button>
            <button className="qa-chip" onClick={() => insertQuickAction('How do I reset my API key?')}>API Keys</button>
            <button className="qa-chip" onClick={() => insertQuickAction('I need help with POPIA compliance for my AI project')}>Compliance</button>
            <button className="qa-chip" onClick={() => insertQuickAction('How do I deploy my Next.js app to production?')}>Deploy</button>
          </div>

          <div className="input-box" id="inputBox">
            <div className="input-inner">
              <textarea
                className="input-textarea"
                ref={inputRef}
                value={inputValue}
                placeholder="Ask the SonOfGraig AI Copilot anything…"
                rows={1}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              ></textarea>
              <div className="input-actions pr-1">
                <button className="input-act" onClick={() => document.getElementById('fileInput')?.click()} title="Attach file">
                  <Paperclip size={16} strokeWidth={1.5} />
                </button>
                <input 
                  type="file" 
                  id="fileInput" 
                  className="hidden" 
                  onChange={e => {
                    if (e.target.files) {
                      setAttachments(prev => [...prev, ...Array.from(e.target.files as FileList)]);
                    }
                  }} 
                  multiple 
                  accept=".pdf,.docx,.txt,.csv,.png,.jpg" 
                />
                <button 
                  className="send-btn ml-1" 
                  onClick={() => sendMessage()} 
                  disabled={!inputValue.trim() && attachments.length === 0}
                >
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <div className="input-footer">
            <span className="input-hint hidden sm:inline">Enter to send · Shift+Enter for new line · Powered by Claude 3.5 Sonnet</span>
            <span className="input-hint sm:hidden">Powered by Claude</span>
            <span className={`char-count ${inputValue.length > 3800 ? 'over' : inputValue.length > 3200 ? 'warn' : ''}`}>
              {inputValue.length} / 4000
            </span>
          </div>
        </div>
      </main>

      <aside className={`info-panel ${!infoPanelOpen ? 'collapsed' : ''} hidden md:flex`}>
        <div className="ip-head">
          <div className="ip-title">Session context</div>
          <button className="icon-btn" onClick={() => setInfoPanelOpen(false)}>
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <div className="ip-body">
          <div className="ip-section">
            <div className="ip-section-title">Session metrics</div>
            <div className="ip-stats">
              <div className="ip-stat">
                <div className="ip-stat-val">{sessionMsgCount}</div>
                <div className="ip-stat-label">Messages</div>
              </div>
              <div className="ip-stat">
                <div className="ip-stat-val">{sessionTokenCount}</div>
                <div className="ip-stat-label">Tokens est.</div>
              </div>
              <div className="ip-stat">
                <div className="ip-stat-val">{responseTime}</div>
                <div className="ip-stat-label">Last response</div>
              </div>
              <div className="ip-stat">
                <div className="ip-stat-val">100%</div>
                <div className="ip-stat-label">Uptime</div>
              </div>
            </div>
          </div>

          <div className="ip-section">
            <div className="ip-section-title">Active knowledge bases</div>
            <div className="kb-item">
              <div className="kb-icon"><FileText size={14} strokeWidth={1.5} className="text-[var(--blue)]" /></div>
              <div><div className="kb-title">Platform docs</div><div className="kb-sub">4,201 chunks · synced 2h ago</div></div>
            </div>
            <div className="kb-item">
              <div className="kb-icon"><Server size={14} strokeWidth={1.5} className="text-[var(--blue)]" /></div>
              <div><div className="kb-title">POPIA compliance</div><div className="kb-sub">892 chunks · live</div></div>
            </div>
          </div>

          <div className="ip-section">
            <div className="ip-section-title">Session tags</div>
            <div className="ip-tags">
              <span className="ip-tag">support</span>
              <span className="ip-tag">Growth plan</span>
              <span className="ip-tag">ZA</span>
              <span className="ip-tag">web</span>
            </div>
          </div>
          
          <div className="ip-section pb-8">
            <div className="ip-section-title">Model config</div>
            <div className="text-[10px] text-[var(--t3)] font-mono leading-relaxed">
              Model: claude-3-5-sonnet<br/>
              Max tokens: 4096<br/>
              Temperature: 0.3<br/>
              RAG: enabled<br/>
              Citation: required<br/>
              Guardrails: POPIA<br/>
              PII scrubbing: on
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
