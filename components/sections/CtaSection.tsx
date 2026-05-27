import ScrollReveal from '@/components/effects/ScrollReveal';
import CtaButton from '@/components/ui/CtaButton';
import FollowLinkedIn from '@/components/FollowLinkedIn';
import { PRE_LAUNCH } from '@/config/site';
import type { CtaContent } from '@/lib/cms-types';

interface Props {
  content: CtaContent;
}

export default function CtaSection({ content }: Props) {
  const { headline, description, button, linkedInBlock } = content;
  const showLinkedInBlock = PRE_LAUNCH && !!linkedInBlock;

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

        {/* Pre-launch LinkedIn fold-in. Gated on NEXT_PUBLIC_PRE_LAUNCH;
            removed on launch day by flipping the env var to "false" and
            redeploying. Wording is founder-approved: no "join early access"
            or waitlist framing, because the privacy posture rules out
            us-initiated outreach. */}
        {showLinkedInBlock && linkedInBlock && (
          <ScrollReveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-[520px] border-t border-border-light pt-10">
              <p className="mb-5 text-[15px] leading-[1.6] text-text-secondary sm:text-base">
                {linkedInBlock.lead}
              </p>
              <FollowLinkedIn
                companyId={linkedInBlock.companyId}
                variant="primary"
              />
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
