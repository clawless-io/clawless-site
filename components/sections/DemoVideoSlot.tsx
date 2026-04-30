import ScrollReveal from '@/components/effects/ScrollReveal';
import type { DemoVideoContent } from '@/lib/cms-types';

interface Props {
  content: DemoVideoContent;
}

export default function DemoVideoSlot({ content }: Props) {
  const { caption, videoSrc } = content;

  return (
    <section id="demo" className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1080px]">
        <ScrollReveal>
          <div
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border-light bg-bg-surface"
            style={{
              boxShadow: '0 0 48px rgba(0, 212, 255, 0.08)',
            }}
          >
            {videoSrc ? (
              <video
                src={videoSrc}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(0,212,255,0.10) 0%, rgba(34,255,170,0.05) 40%, transparent 70%)',
                }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-border-light"
                  style={{ background: 'rgba(10,15,28,0.7)' }}
                  aria-hidden
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: '#22FFAA', marginLeft: 4 }}
                  >
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>
                <p className="px-4 text-center text-sm text-text-muted">{caption}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
