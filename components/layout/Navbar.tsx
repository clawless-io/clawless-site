'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import type { NavContent } from '@/lib/cms-types';

interface Props {
  content?: NavContent;
}

export default function Navbar({ content }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = content?.links ?? NAV_LINKS;

  return (
    <div className="sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl border border-border-default px-6 py-4"
        style={{
          background: 'rgba(10, 15, 28, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo / wordmark */}
        <a
          href="/"
          className="flex items-baseline gap-1.5 text-[20px] font-extrabold tracking-[-0.02em] transition-[filter] duration-300 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        >
          <span className="text-text-primary">Clawless</span>
          <span
            className="text-[14px] font-semibold uppercase tracking-[0.12em]"
            style={{
              background: 'linear-gradient(135deg, #00D4FF, #22FFAA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Computer
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex cursor-pointer flex-col gap-1.5 border-none bg-transparent p-1 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-2xl border border-border-default md:hidden"
            style={{
              background: 'rgba(10, 15, 28, 0.95)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex flex-col gap-2 p-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-bg-surface-hover hover:text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
