import ScrollReveal from '@/components/effects/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { WHO_ITS_FOR } from '@/lib/constants';
import type { WhoItsForContent } from '@/lib/cms-types';

interface Props {
  content?: WhoItsForContent;
}

export default function WhoItsFor({ content }: Props) {
  const label = content?.sectionLabel ?? 'Who it is for';
  const title =
    content?.sectionTitle ?? 'Built for the people OpenClaw cannot reach yet.';
  const columns = content?.columns ?? WHO_ITS_FOR;

  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <SectionHeader label={label} title={title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border-light bg-bg-surface p-7">
                <h3
                  className="mb-3 text-[17px] font-semibold tracking-[-0.02em]"
                  style={{
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {col.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {col.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
