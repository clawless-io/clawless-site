import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/effects/ScrollReveal';
import type { FeaturesContent } from '@/lib/cms-types';

interface Props {
  content: FeaturesContent;
}

const icons: Record<string, React.ReactNode> = {
  vault: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="m7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  desktop: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  swarm: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  openrouter: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  documents: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  skills: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  costguard: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  channels: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  mobile: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  api: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
};

// Three brand colors used on the home FEATURES cards. Add new entries
// intentionally, do not let aliases for the same hex creep back in.
const iconColors: Record<string, { bg: string; fg: string }> = {
  indigo: { bg: 'rgba(0, 212, 255, 0.12)', fg: '#00D4FF' },
  electricCyan: { bg: 'rgba(34, 255, 170, 0.12)', fg: '#22FFAA' },
  amber: { bg: 'rgba(255, 184, 0, 0.12)', fg: '#FFB800' },
};

export default function FeatureCards({ content }: Props) {
  const { sectionLabel: label, sectionTitle: title, items } = content;

  return (
    <section id="features" className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <SectionHeader label={label} title={title} />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((feature, i) => {
            const colorKey = feature.color || 'indigo';
            const colors = iconColors[colorKey] || iconColors.indigo;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.15}>
                <Card className="h-full">
                  <div
                    className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl transition-shadow duration-300"
                    style={{ background: colors.bg, color: colors.fg }}
                  >
                    {icons[feature.icon] || icons.vault}
                  </div>
                  <h3 className="mb-2 text-[17px] font-semibold tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
