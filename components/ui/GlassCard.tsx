'use client';

import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl p-8 text-center min-w-[240px] transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: 'rgba(0, 212, 255, 0.08)',
        border: '1px solid rgba(0, 212, 255, 0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(0, 212, 255, 0.4)';
        el.style.background = 'rgba(0, 212, 255, 0.12)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(0, 212, 255, 0.25)';
        el.style.background = 'rgba(0, 212, 255, 0.08)';
      }}
    >
      {children}
    </div>
  );
}
