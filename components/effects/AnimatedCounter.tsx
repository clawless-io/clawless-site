'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ target, prefix = '', suffix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (target === 0) {
      setCount(0);
      return;
    }

    // Reset to 0 then animate up
    setCount(0);

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted = count.toLocaleString('en-US');

  return (
    <span
      ref={ref}
      className={`text-5xl font-extrabold ${className}`}
      style={{
        background: 'linear-gradient(135deg, #00D4FF, #22FFAA)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.5))',
      }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
