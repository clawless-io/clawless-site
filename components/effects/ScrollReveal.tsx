'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // initial={false} below means SSR HTML has no opacity:0 / transform style
  // applied by framer-motion. The page is readable without JavaScript, which
  // matters most for legal pages (compliance + archival tools) and for any
  // slow-network or content-blocked load. For below-the-fold content we set
  // the hidden state on mount and animate when it scrolls into view; for
  // above-the-fold content we leave it visible. Reduced-motion users skip
  // the animation entirely and read the static page.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isInView) return;
    controls.set({ opacity: 0, y: 32 });
  }, [controls, isInView, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      });
    }
  }, [controls, isInView, prefersReducedMotion, delay]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
