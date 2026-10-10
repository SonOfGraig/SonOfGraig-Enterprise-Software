// African data-protection laws, summarised for AI projects. Source for the
// /data-protection-africa hub and its country pages.
//
// DRAFT 2026-10-10 — summaries for planning, not legal advice. Before these
// pages are indexed, Tumiso (and ideally local counsel) must review them.
// Set REVIEWED = true once approved; that switches on indexing + sitemap.

export const REVIEWED = true; // approved by Tumiso 2026-10-10
export const LAST_CHECKED = 'October 2026';

export type CountryLaw = {
  slug: string;
  country: string;
  flag: string;
  law: string;
  shortName: string;
  regulator: string;
  inForce: string;
  summary: string;
  facts: { label: string; value: string }[];
  ai: string[];
  faqs: { q: string; a: string }[];
};

export const LAWS: CountryLaw[] = [
  {
    slug: 'south-africa',
    country: 'South Africa',
    flag: '🇿🇦',
    law: 'Protection of Personal Information Act 4 of 2013',
    shortName: 'POPIA',
    regulator: 'Information Regulator',
    inForce: 'Fully in force since 1 July 2021',
    summary:
      'POPIA sets eight conditions for lawful processing and applies to anyone processing personal information in South Africa, including information about juristic persons such as companies.',
    facts: [
      { label: 'Registration', value: 'Every responsible party’s Information Officer must be registered with the Information Regulator.' },
      { label: 'Accountable person', value: 'The Information Officer — by default the head of the organisation — with optional deputies (ss 55–56).' },
      { label: 'Breach notification', value: 'Notify the Regulator and affected data subjects as soon as reasonably possible after discovering a compromise (s 22).' },
      { label: 'Cross-border transfers', value: 'Allowed to countries with adequate protection, under binding agreements or rules, with consent, or where needed for a contract (s 72).' },
      { label: 'Automated decisions', value: 'No decisions with legal or substantial effect based solely on automated processing, except in limited cases with safeguards (s 71).' },
      { label: 'Penalties', value: 'Administrative fines of up to R10 million; some offences carry imprisonment of up to 10 years.' },
    ],
    ai: [
      'Sending prompts that contain personal information to an offshore model API is a cross-border transfer — document your section 72 basis.',
      'Sign an operator agreement (s 21) with every AI vendor that processes personal information for you.',
      'Credit, hiring and claims decisions made by a model alone fall under section 71 — keep a human in the loop and explain the logic on request.',
      'Strip or mask personal information before it reaches a model when the task does not need it (minimality, s 10).',
    ],
    faqs: [
      { q: 'Does POPIA apply to AI models hosted outside South Africa?', a: 'Yes, if you are a responsible party in South Africa. Sending personal information to an offshore model is a transborder flow under section 72, so you need an adequate-protection basis, a binding agreement, consent or another section 72 ground.' },
      { q: 'Who is the Information Officer under POPIA?', a: 'By default the head of the organisation. They must be registered with the Information Regulator and can delegate to deputy information officers.' },
    ],
  },
  {
    slug: 'nigeria',
    country: 'Nigeria',
    flag: '🇳🇬',
    law: 'Nigeria Data Protection Act, 2023',
    shortName: 'NDPA',
    regulator: 'Nigeria Data Protection Commission (NDPC)',
    inForce: 'Signed into law in June 2023; the NDPC’s General Application and Implementation Directive (GAID) 2025 adds detailed rules',
    summary:
      'The NDPA replaced the 2019 NDPR as Nigeria’s primary data-protection law and created the NDPC. It applies to processing in Nigeria and to controllers outside Nigeria that process data of people in Nigeria.',
    facts: [
      { label: 'Registration', value: 'Data controllers and processors “of major importance” must register with the NDPC.' },
      { label: 'Data protection officer', value: 'Required for controllers of major importance (s 32).' },
      { label: 'Impact assessments', value: 'Required before processing likely to result in high risk to data subjects (s 28).' },
      { label: 'Breach notification', value: 'Notify the NDPC within 72 hours of becoming aware of a breach likely to risk people’s rights; tell affected people without undue delay where the risk is high (s 40).' },
      { label: 'Cross-border transfers', value: 'Only where the recipient country or arrangement gives an adequate level of protection, or another basis in ss 41–43 applies.' },
      { label: 'Automated decisions', value: 'People may object to decisions based solely on automated processing, including profiling, that have legal or similarly significant effects (s 37).' },
      { label: 'Penalties', value: 'For controllers of major importance, the higher of ₦10 million or 2% of annual gross revenue; for others, the higher of ₦2 million or 2%.' },
    ],
    ai: [
      'Check early whether you are a controller of major importance — it decides registration, DPO and penalty level.',
      'Run a data protection impact assessment before deploying AI that profiles customers or makes eligibility decisions.',
      'Document the adequacy or safeguard basis for any model API hosted outside Nigeria.',
      'Plan for a 72-hour breach clock: logging and alerting must make breaches visible fast.',
    ],
    faqs: [
      { q: 'Does the NDPA apply to companies outside Nigeria?', a: 'It can. The Act applies to controllers and processors outside Nigeria that process personal data of data subjects in Nigeria.' },
      { q: 'What is a data controller of major importance?', a: 'A controller or processor the NDPC designates by reference to the volume and sensitivity of the data it processes. They must register with the NDPC, appoint a DPO and face higher penalties.' },
    ],
  },
  {
    slug: 'kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    law: 'Data Protection Act, 2019 (No. 24 of 2019)',
    shortName: 'Kenya DPA',
    regulator: 'Office of the Data Protection Commissioner (ODPC)',
    inForce: 'In force since November 2019, with implementing regulations issued in 2021',
    summary:
      'Kenya’s Act follows GDPR closely: lawful bases, data-subject rights, impact assessments and an active regulator that issues penalty notices.',
    facts: [
      { label: 'Registration', value: 'Data controllers and processors must register with the ODPC, subject to thresholds and exemptions in the 2021 registration regulations.' },
      { label: 'Data protection officer', value: 'Required where core activities involve large-scale regular monitoring or sensitive personal data (s 24).' },
      { label: 'Impact assessments', value: 'Required where processing is likely to result in high risk (s 31).' },
      { label: 'Breach notification', value: 'Notify the ODPC within 72 hours of becoming aware of a breach that risks data subjects (s 43).' },
      { label: 'Cross-border transfers', value: 'Allowed with proof of appropriate safeguards or adequate protection; sensitive personal data needs consent and safeguards (ss 48–50). Some processing for strategic public interests must stay in Kenya.' },
      { label: 'Automated decisions', value: 'People have the right not to be subject to decisions based solely on automated processing, including profiling, with significant effects (s 35).' },
      { label: 'Penalties', value: 'Administrative fines of up to KES 5 million or 1% of the previous year’s annual turnover, whichever is lower (s 63).' },
    ],
    ai: [
      'Register with the ODPC before you process — the regulator checks registration in enforcement.',
      'Do an impact assessment for any AI that profiles people or touches health, financial or biometric data.',
      'Keep evidence of safeguards for every offshore model or vector database.',
      'Offer a human review route for automated decisions about customers.',
    ],
    faqs: [
      { q: 'Do I need to register with Kenya’s ODPC?', a: 'Most data controllers and processors do. The 2021 registration regulations set thresholds and list sectors where registration is mandatory regardless of size.' },
      { q: 'Can personal data from Kenya be processed by an AI model abroad?', a: 'Yes, if you can show appropriate safeguards or adequate protection in the destination, with extra conditions for sensitive data. Some public-interest processing must stay in Kenya.' },
    ],
  },
  {
    slug: 'ghana',
    country: 'Ghana',
    flag: '🇬🇭',
    law: 'Data Protection Act, 2012 (Act 843)',
    shortName: 'Act 843',
    regulator: 'Data Protection Commission (DPC)',
    inForce: 'In force since 2012',
    summary:
      'One of Africa’s earliest comprehensive data-protection laws. Its practical centre of gravity is registration with the Data Protection Commission and the eight data-protection principles.',
    facts: [
      { label: 'Registration', value: 'Data controllers must register with the Data Protection Commission and renew the registration periodically.' },
      { label: 'Principles', value: 'Accountability, lawfulness, specification of purpose, compatibility of further processing, quality, openness, security safeguards and data-subject participation.' },
      { label: 'Breach notification', value: 'Notify the Commission and the data subject as soon as reasonably practicable after discovering unauthorised access (s 31).' },
      { label: 'Automated decisions', value: 'People can require that decisions significantly affecting them are not based solely on automated processing.' },
      { label: 'Cross-border transfers', value: 'The Act has no detailed transfer regime like POPIA’s s 72; controllers stay responsible for security and should use contracts and DPC guidance.' },
      { label: 'Penalties', value: 'Offences carry fines set in penalty units and, for some, imprisonment.' },
    ],
    ai: [
      'Confirm your registration with the DPC is current before launching an AI service in Ghana.',
      'Use contracts with model and hosting providers that bind them to Act 843’s security safeguards.',
      'Be open about AI use in your privacy notice — openness is one of the Act’s principles.',
    ],
    faqs: [
      { q: 'Do companies have to register with Ghana’s Data Protection Commission?', a: 'Yes. Data controllers processing personal data in Ghana must register with the Commission and renew the registration periodically.' },
    ],
  },
  {
    slug: 'egypt',
    country: 'Egypt',
    flag: '🇪🇬',
    law: 'Personal Data Protection Law No. 151 of 2020',
    shortName: 'PDPL',
    regulator: 'Personal Data Protection Center (PDPC)',
    inForce: 'Law issued in 2020; its Executive Regulations set the detailed licensing and compliance rules',
    summary:
      'Egypt’s law is licence-based: controllers and processors need permission from the Personal Data Protection Center, and cross-border transfers need their own licence.',
    facts: [
      { label: 'Licensing', value: 'Controllers and processors need a licence or permit from the Personal Data Protection Center.' },
      { label: 'Data protection officer', value: 'Controllers and processors must appoint a DPO registered with the Center.' },
      { label: 'Breach notification', value: 'Notify the Center within 72 hours of becoming aware of a breach, and inform affected data subjects.' },
      { label: 'Cross-border transfers', value: 'Transfers abroad need a licence from the Center, and the destination must offer protection no lower than Egypt’s.' },
      { label: 'Penalties', value: 'Fines of up to several million Egyptian pounds and, for some offences, imprisonment.' },
    ],
    ai: [
      'Budget time for licensing — it comes before processing, not after.',
      'Treat any offshore model API as a cross-border transfer that needs its own licence.',
      'Appoint and register a DPO before go-live.',
    ],
    faqs: [
      { q: 'Can Egyptian personal data be sent to an AI model outside Egypt?', a: 'Only with a licence from the Personal Data Protection Center and where the destination provides protection at least equal to Egyptian law.' },
    ],
  },
];

export const OTHER_LAWS: [string, string][] = [
  ['Rwanda', 'Law No. 058/2021 relating to the protection of personal data and privacy'],
  ['Uganda', 'Data Protection and Privacy Act, 2019'],
  ['Mauritius', 'Data Protection Act 2017'],
  ['Zambia', 'Data Protection Act, 2021'],
  ['Tanzania', 'Personal Data Protection Act, 2022'],
  ['Botswana', 'Data Protection Act, 2024'],
];

export function getLaw(slug: string) {
  return LAWS.find((l) => l.slug === slug);
}
