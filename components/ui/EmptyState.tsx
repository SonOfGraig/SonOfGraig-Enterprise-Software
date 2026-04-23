import * as React from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  heading: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, heading, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-[var(--sp-16)] px-[var(--sp-8)]">
      <div className="w-12 h-12 bg-[var(--sg-surface-2)] border border-[var(--sg-border)] rounded-[var(--r-lg)] flex items-center justify-center mb-[var(--sp-4)]">
        <Icon size={22} strokeWidth={1.5} className="text-[var(--sg-text-4)]" aria-hidden="true" />
      </div>
      
      <h3 className="text-h3 text-[var(--sg-text-1)] mb-[var(--sp-2)]">
        {heading}
      </h3>
      
      <p className="text-body text-[var(--sg-text-3)] max-w-[320px] leading-[1.65]">
        {description}
      </p>

      {action && (
        <div className="mt-[var(--sp-6)]">
          <Button variant="primary" onClick={action.onClick}>
            <span className="flex items-center gap-2">
              <Plus size={16} strokeWidth={1.5} />
              {action.label}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
