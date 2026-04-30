import ScrollReveal from '@/components/effects/ScrollReveal';
import type { FeatureGroup } from '@/lib/cms-types';

interface Props {
  groups: FeatureGroup[];
}

export default function FeatureGroups({ groups }: Props) {
  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1080px] space-y-20 sm:space-y-24">
        {groups.map((group, i) => (
          <ScrollReveal key={group.title} delay={i === 0 ? 0 : 0.05}>
            <article>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {group.eyebrow}
              </p>
              <h2
                className="mb-5 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[36px]"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {group.title}
              </h2>
              <p className="mb-8 max-w-[760px] text-base leading-[1.75] text-text-secondary sm:text-lg">
                {group.lead}
              </p>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {group.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 rounded-xl border border-border-light bg-bg-surface px-5 py-4"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--color-success)', marginTop: 2, flexShrink: 0 }}
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
