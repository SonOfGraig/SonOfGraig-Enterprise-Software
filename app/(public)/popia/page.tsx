'use client';

import React, { useState, useEffect } from 'react';
import './popia.css';
import Link from 'next/link';

export default function POPIAPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({
    'encryption': true,
    'ai-training': true
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    
    document.querySelectorAll('.rv').forEach(el => observer.observe(el));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
    
    document.querySelectorAll('.c-section').forEach(s => sectionObserver.observe(s));
    
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const toggleBlock = (id: string) => {
    setOpenBlocks(prev => ({...prev, [id]: !prev[id]}));
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if(el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="popia-container">
      <section className="popia-hero" aria-labelledby="hero-h">
        <div className="popia-hero-bg" aria-hidden="true"></div>
        <div className="popia-wrap">
          <div className="popia-hero-inner">
            <div>
              <nav className="popia-crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="popia-crumb-sep" aria-hidden="true">/</span>
                <Link href="/legal">Legal</Link>
                <span className="popia-crumb-sep" aria-hidden="true">/</span>
                <span aria-current="page">POPIA</span>
              </nav>
              <div className="popia-eyebrow"><i />Compliance statement · Last reviewed 28 April 2026</div>
              <h1 className="popia-h1" id="hero-h">POPIA Compliance<br /><span>Statement</span></h1>
              <p className="popia-desc">How SonOfGraig collects, processes, stores, and protects your personal information under the <strong style={{color:'var(--t1)'}}>Protection of Personal Information Act 4 of 2013</strong>. This statement applies to sonofgraig.com and all SonOfGraig platform products.</p>
              <div className="popia-meta">
                <span className="popia-meta-pill"><i style={{background:'var(--green)'}} />Version 3.0 · April 2026</span>
                <span className="popia-meta-pill"><i style={{background:'var(--green)'}} />POPIA Act 4 of 2013</span>
                <span className="popia-meta-pill"><i style={{background:'var(--blue)'}} />AWS af-south-1</span>
                <span className="popia-meta-pill"><i style={{background:'var(--amber)'}} />Information Regulator registered</span>
              </div>
              <div className="popia-ctas">
                <a href="#section-11" className="popia-btn popia-btn-p" onClick={e => scrollTo(e, 'section-11')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Read compliance sections
                </a>
                <a href="#contact" className="popia-btn popia-btn-s" onClick={e => scrollTo(e, 'contact')}>Submit a data subject request</a>
              </div>
            </div>
            
            <aside className="act-card rv" aria-label="About the Act">
              <div className="act-card-top">
                <div className="act-card-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <div className="act-card-title">Protection of Personal Information Act 4 of 2013</div>
                  <div className="act-card-sub">Republic of South Africa · Commencement: 1 July 2021</div>
                </div>
              </div>
              <div className="act-facts">
                <div className="act-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span><strong>Regulator:</strong> Information Regulator of South Africa</span></div>
                <div className="act-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span><strong>Commencement:</strong> 1 July 2021 (enforcement)</span></div>
                <div className="act-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span><strong>Max penalty:</strong> R10 million fine or 10 years imprisonment</span></div>
                <div className="act-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span><strong>Scope:</strong> Any entity processing personal information in South Africa</span></div>
                <div className="act-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span><strong>Equivalent to:</strong> EU GDPR (structurally comparable)</span></div>
              </div>
              <div className="act-cta">
                <a href="https://www.gov.za/sites/default/files/gcis_document/201409/3706726-11act4of2013popi.pdf" target="_blank" rel="noopener noreferrer">
                  View full Act (Government Gazette)
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="popia-section">
        <div className="popia-wrap">
          <div className="page-body">
            <aside className="popia-sidebar rv" aria-label="Page navigation">
              <div className="sidebar-section">
                <div className="sidebar-label">Compliance sections</div>
                <div className="sidebar-links">
                  <a href="#overview" onClick={e => scrollTo(e, 'overview')} className={`sidebar-link ${activeSection === 'overview' ? 'active' : ''}`}><span className="sidebar-link-dot" />Overview &amp; applicability</a>
                  <a href="#conditions" onClick={e => scrollTo(e, 'conditions')} className={`sidebar-link ${activeSection === 'conditions' ? 'active' : ''}`}><span className="sidebar-link-dot" />8 conditions for lawful processing</a>
                  <a href="#section-11" onClick={e => scrollTo(e, 'section-11')} className={`sidebar-link ${activeSection === 'section-11' ? 'active' : ''}`}><span className="sidebar-link-dot" />Section 11 — Consent</a>
                  <a href="#section-14" onClick={e => scrollTo(e, 'section-14')} className={`sidebar-link ${activeSection === 'section-14' ? 'active' : ''}`}><span className="sidebar-link-dot" />Section 14 — Collection limitation</a>
                  <a href="#section-19" onClick={e => scrollTo(e, 'section-19')} className={`sidebar-link ${activeSection === 'section-19' ? 'active' : ''}`}><span className="sidebar-link-dot" />Section 19 — Security safeguards</a>
                  <a href="#section-22" onClick={e => scrollTo(e, 'section-22')} className={`sidebar-link ${activeSection === 'section-22' ? 'active' : ''}`}><span className="sidebar-link-dot" />Section 22 — Breach notification</a>
                  <a href="#section-72" onClick={e => scrollTo(e, 'section-72')} className={`sidebar-link ${activeSection === 'section-72' ? 'active' : ''}`}><span className="sidebar-link-dot" />Section 72 — Data residency</a>
                  <a href="#what-we-collect" onClick={e => scrollTo(e, 'what-we-collect')} className={`sidebar-link ${activeSection === 'what-we-collect' ? 'active' : ''}`}><span className="sidebar-link-dot" />What we collect</a>
                  <a href="#cookies" onClick={e => scrollTo(e, 'cookies')} className={`sidebar-link ${activeSection === 'cookies' ? 'active' : ''}`}><span className="sidebar-link-dot" />Cookies &amp; tracking</a>
                  <a href="#rights" onClick={e => scrollTo(e, 'rights')} className={`sidebar-link ${activeSection === 'rights' ? 'active' : ''}`}><span className="sidebar-link-dot" />Your rights</a>
                  <a href="#ai-processing" onClick={e => scrollTo(e, 'ai-processing')} className={`sidebar-link ${activeSection === 'ai-processing' ? 'active' : ''}`}><span className="sidebar-link-dot" />AI &amp; LLM processing</a>
                  <a href="#contact" onClick={e => scrollTo(e, 'contact')} className={`sidebar-link ${activeSection === 'contact' ? 'active' : ''}`}><span className="sidebar-link-dot" />Contact &amp; requests</a>
                </div>
              </div>
              <div className="sidebar-divider"></div>
              <div className="sidebar-contact">
                <div className="sidebar-contact-label">Information Officer</div>
                <div className="sidebar-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Tumiso Graig Ramaboya</div>
                <div className="sidebar-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:popia@sonofgraig.com">popia@sonofgraig.com</a></div>
                <div className="sidebar-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Response: 10 business days</div>
              </div>
            </aside>

            <div className="popia-content">
              <div className="version-bar rv">
                <div className="vb-left">
                  <span className="vb-item"><strong>Version:</strong> 3.0</span><div className="vb-sep" />
                  <span className="vb-item"><strong>Effective:</strong> 1 January 2024</span><div className="vb-sep" />
                  <span className="vb-item"><strong>Reviewed:</strong> 28 April 2026</span><div className="vb-sep" />
                  <span className="vb-item"><strong>Act:</strong> POPIA Act 4 of 2013</span>
                </div>
                <div className="vb-right">
                  <span className="vb-badge" style={{background:'rgba(34,197,94,.1)',borderColor:'rgba(34,197,94,.2)',color:'var(--green)'}}>Compliant</span>
                  <span className="vb-badge" style={{background:'var(--blue-g)',borderColor:'var(--blue-b)',color:'var(--blue)'}}>SOC 2 in progress</span>
                </div>
              </div>

              <div className="summary-strip rv">
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />Section 11 — Consent ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />Section 14 — Collection ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />Section 19 — Security ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />Section 22 — Breach ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />Section 72 — Residency ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--green)'}} />IR Registered ✓</div><div className="ss-sep" />
                <div className="ss-item"><span className="ss-dot" style={{background:'var(--blue)'}} />SOC 2 in progress</div>
              </div>

              <div className="c-section rv" id="overview">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 1</div>
                  <h2 className="c-h2">Overview &amp; applicability</h2>
                  <p className="c-desc">Who this statement applies to, what it covers, and the legal basis for our processing activities.</p>
                </div>
                <div className="callout callout-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>SonOfGraig Digital Solutions (Pty) Ltd is registered with the <strong>Information Regulator of South Africa</strong> as required under POPIA. Our processing activities are conducted in accordance with the Act and the eight conditions for lawful processing set out in Chapter 3. <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" style={{color:'var(--green)'}}>Information Regulator →</a></span>
                </div>
                <p className="c-text">This POPIA Compliance Statement applies to all personal information processed by <strong style={{color:'var(--t1)'}}>SonOfGraig Digital Solutions (Pty) Ltd</strong> ("SonOfGraig", "we", "us", "our") in the operation of <strong style={{color:'var(--t1)'}}>sonofgraig.com</strong> and all associated platform products including RAG Studio, Agent Builder, ML Ops, Governance Hub, Cloud Console, Analytics Studio, and all other services offered under the SonOfGraig brand.</p>
                <p className="c-text">The <strong style={{color:'var(--t1)'}}>Protection of Personal Information Act 4 of 2013</strong> <a href="https://www.gov.za/sites/default/files/gcis_document/201409/3706726-11act4of2013popi.pdf" target="_blank" rel="noopener noreferrer" className="citation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'9px',height:'9px'}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>Act 4 of 2013</a> came into full effect for enforcement purposes on <strong style={{color:'var(--t1)'}}>1 July 2021</strong>. It establishes the lawful and reasonable collection, processing, storage, and transfer of personal information. It grants individuals rights over their personal information and imposes obligations on entities — called <em>responsible parties</em> — that process that information.</p>
                <p className="c-text">SonOfGraig is the <strong style={{color:'var(--t1)'}}>responsible party</strong> for all personal information processed through our website and platform. Our appointed <strong style={{color:'var(--t1)'}}>Information Officer</strong> is Tumiso Graig Ramaboya, who can be reached at <a href="mailto:popia@sonofgraig.com">popia@sonofgraig.com</a>. The Information Officer is responsible for ensuring that SonOfGraig complies with POPIA in all respects.</p>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="conditions">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 2</div>
                  <h2 className="c-h2">Eight conditions for lawful processing</h2>
                  <p className="c-desc">POPIA Chapter 3 sets out eight conditions that all responsible parties must satisfy. <a href="https://www.gov.za/sites/default/files/gcis_document/201409/3706726-11act4of2013popi.pdf" target="_blank" rel="noopener noreferrer" className="citation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:'9px',height:'9px'}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>POPIA Chapter 3, ss. 8–25</a></p>
                </div>
                <div className="cond-pills">
                  <div className="cond-pill"><span className="cond-pill-num">1</span><div><strong>Accountability</strong> — SonOfGraig is responsible for ensuring compliance with POPIA conditions. Our Information Officer holds this accountability. <a href="https://www.gov.za/sites/default/files/gcis_document/201409/3706726-11act4of2013popi.pdf" target="_blank" rel="noopener noreferrer" className="citation citation-blue" style={{fontSize:'10px'}}>s.8</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">2</span><div><strong>Processing limitation</strong> — We collect personal information only for a specific, lawful purpose and only to the extent necessary. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>ss.9–12</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">3</span><div><strong>Purpose specification</strong> — Personal information is collected only for a specific, explicitly defined purpose communicated to the data subject. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>ss.13–14</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">4</span><div><strong>Further processing limitation</strong> — Further processing is only permitted if compatible with the original collection purpose. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>s.15</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">5</span><div><strong>Information quality</strong> — We take reasonable steps to ensure personal information is accurate, complete, and up to date. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>s.16</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">6</span><div><strong>Openness</strong> — We maintain a publicly accessible PAIA Manual and notify data subjects of our processing activities. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>ss.17–18</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">7</span><div><strong>Security safeguards</strong> — We implement appropriate, reasonable technical and organisational measures to secure personal information. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>ss.19–22</a></div></div>
                  <div className="cond-pill"><span className="cond-pill-num">8</span><div><strong>Data subject participation</strong> — Data subjects have rights to access, correct, and delete their personal information, and to object to processing. <a href="#" className="citation citation-blue" style={{fontSize:'10px'}}>ss.23–25</a></div></div>
                </div>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="section-11">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 3 · POPIA Section 11</div>
                  <h2 className="c-h2">Consent &amp; grounds for processing</h2>
                  <p className="c-desc">SonOfGraig relies on the following lawful grounds for processing personal information, as permitted under Section 11 of POPIA.</p>
                </div>
                <div className="conditions-table">
                  <div className="ct-row header">
                    <div className="ct-cell label header-c">Ground (s.11(1))</div>
                    <div className="ct-cell header-c">How SonOfGraig applies it</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Consent (s.11(1)(a))</div>
                    <div className="ct-cell value">Obtained via our cookie consent banner for analytics, marketing, and AI personalisation cookies. Specific, informed, and voluntary. Withdrawal available at any time.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Contract (s.11(1)(b))</div>
                    <div className="ct-cell value">Processing required to perform our services agreement — account creation, service delivery, billing, support communication.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Legitimate interest (s.11(1)(f))</div>
                    <div className="ct-cell value">Security monitoring, fraud prevention, system performance, and internal analytics used to improve platform features.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Legal obligation (s.11(1)(c))</div>
                    <div className="ct-cell value">Tax records, financial reporting, and responding to lawful requests from authorities or the Information Regulator.</div>
                  </div>
                </div>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="section-14">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 4 · POPIA Section 14</div>
                  <h2 className="c-h2">Collection limitation</h2>
                  <p className="c-desc">We collect only the minimum personal information necessary for the specific purpose for which it is collected.</p>
                </div>
                <div className="conditions-table">
                  <div className="ct-row header">
                    <div className="ct-cell label header-c">Collection point</div>
                    <div className="ct-cell header-c">What we collect and why</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Website visitors</div>
                    <div className="ct-cell value">IP address (anonymised), page views, browser type, referrer. Purpose: security, analytics (with consent). Retained: 90 days.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Waitlist &amp; contact forms</div>
                    <div className="ct-cell value">Name, email address, company name, role. Purpose: respond to enquiry and manage programme. Retained: duration plus 3 years.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Platform accounts</div>
                    <div className="ct-cell value">Name, email address, company, role, billing info. Purpose: account management, service delivery, billing. Retained: account duration.</div>
                  </div>
                  <div className="ct-row">
                    <div className="ct-cell label">Document uploads</div>
                    <div className="ct-cell value">Content uploaded. PII is scrubbed before embedding. Retained: as configured by customer retention policy.</div>
                  </div>
                </div>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="section-19">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 5 · POPIA Section 19</div>
                  <h2 className="c-h2">Security safeguards</h2>
                  <p className="c-desc">Technical and organisational measures we have implemented to protect personal information against loss, disclosure, or interference.</p>
                </div>
                <div className="comp-block">
                  <div className="comp-block-header" onClick={() => toggleBlock('encryption')}>
                    <div className="comp-block-ico" style={{background:'var(--green-g)',border:'1px solid var(--green-b)'}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div className="comp-block-meta">
                      <div className="comp-block-title">Encryption — data in transit and at rest</div>
                      <div className="comp-block-ref">POPIA s.19(1) · Technical safeguard</div>
                    </div>
                    <div className="comp-block-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></div>
                  </div>
                  <div className={`comp-block-body ${openBlocks['encryption'] ? 'open' : ''}`}>
                    <p className="comp-block-text">All data transmitted between the user&apos;s browser and SonOfGraig servers is encrypted using <strong>TLS 1.3</strong>. Data stored in our databases is encrypted at rest using <strong>AES-256</strong> encryption, enforced by AWS at the storage layer within af-south-1.</p>
               		  <div className="comp-block-tags">
                      <span className="comp-tag">TLS 1.3</span><span className="comp-tag">AES-256 at rest</span><span className="comp-tag">AWS Secrets Manager</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="ai-processing">
                 <div className="c-section-header">
                    <div className="c-eyebrow">Section 11</div>
                    <h2 className="c-h2">AI &amp; large language model processing</h2>
                 </div>
                 <div className="comp-block">
                  <div className="comp-block-header" onClick={() => toggleBlock('ai-training')}>
                    <div className="comp-block-ico" style={{background:'var(--purple-g)',border:'1px solid var(--purple-b)'}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                    </div>
                    <div className="comp-block-meta">
                      <div className="comp-block-title">AI model training disclosure</div>
                      <div className="comp-block-ref">Transparency principle · POPIA s.18(1)</div>
                    </div>
                    <div className="comp-block-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></div>
                  </div>
                  <div className={`comp-block-body ${openBlocks['ai-training'] ? 'open' : ''}`}>
                    <p className="comp-block-text"><strong>SonOfGraig does not use customer data — including documents uploaded to RAG Studio, Agent Builder configurations, or any query content — to train shared foundation models.</strong></p>
                    <p className="comp-block-text">If in the future SonOfGraig develops any programme that uses customer data to improve shared models, it will only proceed with explicit consent.</p>
                  </div>
                 </div>
              </div>

              <div className="popia-divider" />

              <div className="c-section rv" id="contact">
                <div className="c-section-header">
                  <div className="c-eyebrow">Section 12</div>
                  <h2 className="c-h2">Contact the Information Officer</h2>
                  <p className="c-desc">How to submit data subject requests, raise compliance concerns, or contact us for any POPIA-related matter.</p>
                </div>
                <div className="contact-grid">
                  <div className="contact-card rv d1">
                    <div className="cc-ico" style={{background:'var(--green-g)',border:'1px solid var(--green-b)'}}><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                    <div className="cc-title">Data subject access request (DSAR)</div>
                    <div className="cc-text">To access, correct, or delete your personal information. Include your full name, email address, and a description of your request.</div>
                    <a href="mailto:popia@sonofgraig.com" className="cc-link" style={{color:'var(--green)'}}>popia@sonofgraig.com<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
                  </div>
                   <div className="contact-card rv d2">
                    <div className="cc-ico" style={{background:'var(--blue-g)',border:'1px solid var(--blue-b)'}}><svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                    <div className="cc-title">Data Processing Agreement (DPA)</div>
                    <div className="cc-text">Enterprise legal teams require a formal DPA before contract execution. Our DPA is available for download.</div>
                    <a href="/dpa" className="cc-link" style={{color:'var(--blue)'}}>Download DPA<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
                  </div>
                </div>
              </div>
              
              <div className="cta-bottom rv mt-12">
                <div>
                  <div className="popia-eyebrow" style={{marginBottom:'10px'}}><i />Enterprise procurement team?</div>
                  <h2 style={{fontFamily:'var(--font-sora)',fontSize:'clamp(22px,3vw,30px)',fontWeight:700,letterSpacing:'-.025em',color:'var(--t1)',marginBottom:'10px'}}>Need compliance documentation?</h2>
                  <p style={{fontSize:'14px',color:'var(--t3)',lineHeight:1.7,maxWidth:'500px'}}>Contact our Information Officer for any documentation package.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
