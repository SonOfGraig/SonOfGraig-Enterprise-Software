import { Bot, BookOpenCheck, Cloud, Scale, type LucideIcon } from 'lucide-react';

// Icon per service slug (lib/services.ts). Kept out of the data module so the
// data stays plain and serialisable.
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  'ai-agent-implementation': Bot,
  'rag-knowledge-base-setup': BookOpenCheck,
  'cloud-architecture': Cloud,
  'ai-governance-audit': Scale,
};
