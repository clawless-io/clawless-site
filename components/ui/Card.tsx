'use client';

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  highlighted?: boolean;
  className?: string;
}

export default function Card({ children, highlighted = false, className = '' }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-surface-hover ${
        highlighted
          ? 'border-2 border-accent overflow-visible'
          : 'border border-border-light'
      } ${className}`}
      style={
        highlighted
          ? { boxShadow: '0 0 32px rgba(0, 212, 255, 0.15)' }
          : undefined
      }
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (!highlighted) {
          el.style.borderColor = 'rgba(0, 212, 255, 0.3)';
          el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        }
        const bar = el.querySelector<HTMLElement>('[data-glow-bar]');
        if (bar) bar.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (!highlighted) {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }
        const bar = el.querySelector<HTMLElement>('[data-glow-bar]');
        if (bar) bar.style.opacity = '0';
      }}
    >
      {/* Glow bar */}
      <div
        data-glow-bar
        className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #00D4FF, #22FFAA, transparent)',
          opacity: 0,
        }}
      />
      {children}
    </div>
  );
}
