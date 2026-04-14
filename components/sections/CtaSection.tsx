'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import type { CtaContent } from '@/lib/cms-types';

interface Props {
  content?: CtaContent;
}

export default function CtaSection({ content }: Props) {
  const headline = content?.headline ?? 'Coming Q3 2026.';
  const description =
    content?.description ??
    'Currently in active development. The first public release is targeted for Q3 2026.';

  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1200px] text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto max-w-[580px] text-base text-text-secondary sm:text-lg">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
