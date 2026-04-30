import ScrollReveal from '@/components/effects/ScrollReveal';
import CtaButton from '@/components/ui/CtaButton';
import type { CtaContent } from '@/lib/cms-types';

interface Props {
  content: CtaContent;
}

export default function CtaSection({ content }: Props) {
  const { headline, description, button } = content;

  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1200px] text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto mb-10 max-w-[580px] text-base text-text-secondary sm:text-lg">
            {description}
          </p>
          {button && <CtaButton cta={button} />}
        </ScrollReveal>
      </div>
    </section>
  );
}
