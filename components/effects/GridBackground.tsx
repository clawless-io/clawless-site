'use client';

import { usePathname } from 'next/navigation';

export default function GridBackground() {
  // The open-source redesign under /preview/ has its own light/dark surfaces;
  // this dark command-center overlay must not bleed into it.
  if (usePathname()?.startsWith('/preview')) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Top glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 212, 255, 0.08), transparent)',
        }}
      />
    </div>
  );
}
