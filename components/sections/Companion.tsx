'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import type { CompanionContent } from '@/lib/cms-types';

interface Props {
  content?: CompanionContent;
}

export default function Companion({ content }: Props) {
  const headline = content?.headline ?? 'A companion to OpenClaw, not a competitor.';
  const paragraphs = content?.paragraphs ?? [
    'OpenClaw is one of the most impressive open-source AI projects in the world, a community big enough to ship new releases almost every week. Clawless Computer is built on top of it, 100% compatible, and exists to bring OpenClaw to people who cannot live in a terminal all day.',
    "We do not fork OpenClaw. We do not compete with it. We track every release, test it, and ship the upgrades so you do not have to. Our success is OpenClaw's success.",
  ];

  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[760px] text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
            {headline}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-base leading-[1.8] text-text-secondary sm:text-lg ${
                i < paragraphs.length - 1 ? 'mb-4' : ''
              }`}
            >
              {p}
            </p>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
