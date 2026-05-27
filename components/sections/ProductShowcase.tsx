import ScrollReveal from '@/components/effects/ScrollReveal';
import type { ProductShowcaseContent } from '@/lib/cms-types';

interface Props {
  content: ProductShowcaseContent;
}

/**
 * Marquee product-screenshot block sitting beneath the hero. Lands the
 * visual "wow" by answering the visitor's "what does this app actually
 * look like?" question in one image.
 *
 * If `imageSrc` is empty the component renders a neutral 16:10 placeholder
 * with the caption text inside, so the page layout stays intact while the
 * asset is being captured. Drop the real PNG into `/public/screenshots/`
 * and set `imageSrc` to the path to swap in.
 */
export default function ProductShowcase({ content }: Props) {
  const { caption, imageSrc, imageAlt } = content;
  const hasImage = !!imageSrc;

  return (
    <section className="border-b border-border-default px-8 pb-20 pt-4">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal>
          <p className="mb-5 text-center text-[13px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {caption}
          </p>

          <div
            className="relative overflow-hidden rounded-[14px] border border-border-light bg-bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            style={{ aspectRatio: '16 / 10' }}
          >
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={imageAlt}
                width={1600}
                height={1000}
                loading="eager"
                className="block h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                role="img"
                aria-label={imageAlt}
                style={{
                  background:
                    'radial-gradient(ellipse at top left, rgba(0,212,255,0.10) 0%, rgba(34,255,170,0.06) 35%, rgba(0,0,0,0.6) 100%)',
                }}
              >
                <p className="px-6 text-center text-sm text-text-muted">
                  Product screenshot lands here.
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
