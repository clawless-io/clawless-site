import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';
import { getCategories } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Reference documentation for Clawless Computer. Sixteen chapters covering chat, agents, memory, tools, browser automation, channels, automations, cost control, and security.',
};

export default function DocsIndexPage() {
  const cms = getContent();
  const categories = getCategories();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-12 pt-32 text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Reference
            </p>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[52px]">
              Documentation
            </h1>
            <p className="mx-auto mt-4 max-w-[640px] text-base leading-relaxed text-text-secondary">
              Plain-language reference for everything Clawless Computer does.
              Sixteen chapters, organized by where they live in the app. Pick
              the section you need.
            </p>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-[920px] space-y-16 pb-24 sm:space-y-20">
          {categories.map((category) => (
            <ScrollReveal key={category.title}>
              <section>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  {category.title}
                </p>
                <p className="mb-6 max-w-[680px] text-[15px] leading-[1.7] text-text-muted sm:text-[16px]">
                  {category.description}
                </p>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {category.chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={`/docs/${chapter.slug}`}
                        className="group block h-full rounded-xl border border-border-light bg-bg-surface p-5 transition-colors duration-150 hover:border-border-default"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-serif text-[18px] font-medium leading-snug text-text-primary group-hover:text-accent sm:text-[19px]">
                            {chapter.title}
                          </h2>
                          {chapter.status === 'shipping-with-launch' ? (
                            <span className="shrink-0 rounded-md border border-border-default px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">
                              Shipping with launch
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-[14px] leading-[1.65] text-text-secondary">
                          {chapter.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          ))}
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
