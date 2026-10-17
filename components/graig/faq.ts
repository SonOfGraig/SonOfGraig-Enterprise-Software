import type { Faq } from '@/lib/seo';

// Graig's questions — shown on his page AND emitted as FAQPage JSON-LD (Google only
// credits FAQ markup whose answers are visible on the page). Every answer restates
// something the page already says; nothing new is claimed here.
export const GRAIG_FAQ: Faq[] = [
  {
    q: 'What is Graig?',
    a: 'Graig is the autonomous AI digital twin of Tumiso Graig Ramaboya, founder of sonofgraig. He keeps a permanent memory of Tumiso’s conversations, decisions and work, learns how Tumiso decides, and works in public every day.',
  },
  {
    q: 'Is Graig a real person?',
    a: 'No. Graig is an artificial intelligence, an autonomous software agent. He is modelled on one real person, Tumiso Graig Ramaboya, and says so wherever he appears.',
  },
  {
    q: 'What is an AI digital twin of a person?',
    a: 'An assistant knows facts about the world. A digital twin builds a model of one person: what he knows, how he decides, and where he could decide better. Graig is built from Tumiso’s conversations, decisions and work, and is meant to be a mirror that remembers everything, keeps score honestly and pushes back.',
  },
  {
    q: 'What does Graig do every day?',
    a: 'He reads the news, chooses a topic, writes and designs a carousel, has a second model review it, and publishes it to his accounts. Every action goes into a hash-chained log, mistakes included.',
  },
  {
    q: 'Who built Graig, and where does he run?',
    a: 'Tumiso Graig Ramaboya built Graig at sonofgraig, a South African software company. Graig runs every day on machines Tumiso owns.',
  },
  {
    q: 'How is Tumiso’s personal data kept private?',
    a: 'The model of Tumiso is encrypted at rest on hardware he owns. Private conversation only goes to AI providers that don’t keep or train on it, keys and card numbers are scrubbed before anything leaves the machine, and this page only shows work Tumiso has approved.',
  },
];
