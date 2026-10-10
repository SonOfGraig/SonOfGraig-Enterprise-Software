// Official sonofgraig profiles (confirmed by the founder, 2026-10-10). One list
// feeds the Organization JSON-LD `sameAs`, the footer and email signatures, so
// search engines see the same entity everywhere.
export const SOCIAL_PROFILES = [
  { label: 'LinkedIn', url: 'https://za.linkedin.com/company/sonofgraig' },
  { label: 'Instagram', url: 'https://www.instagram.com/sonofgraig/' },
  { label: 'Facebook', url: 'https://www.facebook.com/p/Sonofgraig-61574732796723/' },
  { label: 'GitHub', url: 'https://github.com/sonofgraig' },
  { label: 'Crunchbase', url: 'https://www.crunchbase.com/organization/sonofgraig-digital-solutions' },
  { label: 'StartupBlink', url: 'https://www.startupblink.com/startup/sonofgraig-digital-solutions' },
] as const;

/** Google Business Profile / Knowledge Graph entity for the company. */
export const GOOGLE_BUSINESS_KG = 'https://www.google.com/search?kgmid=/g/11lcymk9jb';

/** CIPC enterprise registration number. */
export const CIPC_REG_NO = 'K2025188095';
