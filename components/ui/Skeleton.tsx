import * as React from 'react';
import { cn } from '@/lib/utils';

export function SkeletonText({ width = '100%', lines = 1, className }: { width?: string | number, lines?: number, className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-[12px] rounded-[var(--r-xs)] skeleton-shimmer"
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : width }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)]", className)}>
      <div className="h-5 w-1/3 rounded-[var(--r-xs)] skeleton-shimmer mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded-[var(--r-xs)] skeleton-shimmer" />
        <div className="h-3 w-5/6 rounded-[var(--r-xs)] skeleton-shimmer" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, className }: { rows?: number, className?: string }) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-[var(--r-lg)] border border-[var(--sg-border)] bg-[var(--sg-bg)]", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--sg-border)] bg-[var(--sg-surface)]">
            <th className="p-4 w-[30%]"><div className="h-3 w-20 rounded-[var(--r-xs)] skeleton-shimmer" /></th>
            <th className="p-4 w-[25%]"><div className="h-3 w-16 rounded-[var(--r-xs)] skeleton-shimmer" /></th>
            <th className="p-4 w-[25%]"><div className="h-3 w-24 rounded-[var(--r-xs)] skeleton-shimmer" /></th>
            <th className="p-4 w-[20%]"><div className="h-3 w-12 rounded-[var(--r-xs)] skeleton-shimmer" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--sg-border)]">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td className="p-4 h-[48px]"><div className="h-3 w-3/4 rounded-[var(--r-xs)] skeleton-shimmer" /></td>
              <td className="p-4 h-[48px]"><div className="h-3 w-1/2 rounded-[var(--r-xs)] skeleton-shimmer" /></td>
              <td className="p-4 h-[48px]"><div className="h-3 w-2/3 rounded-[var(--r-xs)] skeleton-shimmer" /></td>
              <td className="p-4 h-[48px]"><div className="h-3 w-1/3 rounded-[var(--r-xs)] skeleton-shimmer" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonMetricCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[var(--sg-bg)] border border-[var(--sg-border)] border-t-2 border-t-[var(--sg-surface-3)] rounded-[var(--r-xl)] p-[var(--sp-5)]", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 w-24 rounded-[var(--r-xs)] skeleton-shimmer" />
        <div className="w-4 h-4 rounded-full skeleton-shimmer" />
      </div>
      <div className="h-8 w-32 rounded-[var(--r-xs)] skeleton-shimmer mb-2" />
      <div className="h-3 w-20 rounded-[var(--r-xs)] skeleton-shimmer" />
    </div>
  );
}
