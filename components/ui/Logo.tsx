import * as React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" className={cn("w-auto h-full", className)} {...props}>
      <title>sonofgraig</title>
      <desc>sonofgraig isometric mark. Primary. Three-face hexagonal prism. Flat colour.</desc>
      <polygon points="100,20 148,48 100,76 52,48" fill="#0B9EDE"/>
      <polygon points="52,48 100,76 100,148 52,120" fill="#044E73"/>
      <polygon points="100,76 148,48 148,120 100,148" fill="#0773A8"/>
      <polygon points="100,20 148,48 100,76 52,48" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="52" y1="48" x2="52" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="148" y1="48" x2="148" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="52" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="148" y1="120" x2="100" y2="148" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="100" y1="76" x2="100" y2="148" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    </svg>
  );
}
