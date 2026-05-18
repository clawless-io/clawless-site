import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'The family',
  description:
    'Clawless is one of several products from RBJ Global LLC. Meet the parent company plus iLoveMD, WhisprDesk, Trading Agents Lab, and Clawdemy. Privacy-first products, written from one operator, kept distinct on their own domains.',
  alternates: { canonical: 'https://clawless.ai/family/' },
};

interface FamilyLink {
  label: string;
  href: string;
}

interface FamilyMember {
  name: string;
  tagline: string;
  description: string;
  glyph: 'building' | 'document' | 'mic' | 'trending' | 'book';
  links: FamilyLink[];
}

const MEMBERS: FamilyMember[] = [
  {
    name: 'RBJ Global',
    tagline: 'The independent operator behind Clawless.',
    glyph: 'building',
    description:
      "The Texas-registered company that owns Clawless and ships the rest of the family. Independently funded, no outside investors, no exit pressure to dilute the local-first posture. If you are wondering who is actually behind this product and how to verify the privacy claims, rbjglobal.com is the page where that question gets answered, with names, an entity number, and a published responsible-disclosure policy.",
    links: [
      { label: 'Visit rbjglobal.com', href: 'https://rbjglobal.com/' },
      { label: 'Responsible disclosure policy', href: 'https://rbjglobal.com/legal/security/' },
    ],
  },
  {
    name: 'iLoveMD',
    tagline: 'Document conversion that never uploads.',
    glyph: 'document',
    description:
      'A browser-only converter for Markdown, PDF, DOCX, and the usual suspects. Same posture as Clawless, scoped down to a single static page: nothing is uploaded, nothing is logged, nothing leaves your tab. Useful as the throwaway tool when you want to prep a document for a Clawless prompt without involving any server you do not control.',
    links: [
      { label: 'Visit iluvmd.com', href: 'https://iluvmd.com/' },
      { label: 'See the conversion modes', href: 'https://iluvmd.com/#modes' },
    ],
  },
  {
    name: 'WhisprDesk',
    tagline: 'Local speech-to-text for Mac.',
    glyph: 'mic',
    description:
      'Dictation on macOS with Whisper and Parakeet models running on your own laptop. The Clawless posture applied to audio: nothing goes to a vendor cloud, the product is sold once instead of rented. Useful upstream of Clawless when you want to talk into your computer instead of typing the prompt.',
    links: [
      { label: 'Visit whisprdesk.com', href: 'https://whisprdesk.com/' },
      { label: 'See WhisprDesk features', href: 'https://whisprdesk.com/#features' },
      { label: 'Compare WhisprDesk', href: 'https://whisprdesk.com/#compare' },
      { label: 'See WhisprDesk pricing', href: 'https://whisprdesk.com/pricing/' },
    ],
  },
  {
    name: 'Trading Agents Lab',
    tagline: 'Open-source multi-agent trading research.',
    glyph: 'trending',
    description:
      'An AGPL-3.0 framework for studying how multi-agent LLM systems reason about markets. Open-source by design, so the code can be read before it runs anywhere near a brokerage. The sibling product most likely to interest a Clawless user who wants to see how the family approaches a serious agent system in a regulated domain.',
    links: [
      { label: 'Visit tradingagentslab.ai', href: 'https://tradingagentslab.ai/' },
    ],
  },
  {
    name: 'Clawdemy',
    tagline: 'Free AI literacy library.',
    glyph: 'book',
    description:
      'A free, public-facing learning library that explains how AI actually works, written for the non-technical reader. The track on local-first AI maps cleanly onto why a tool like Clawless exists. Useful link to share with a friend or family member who has been asking what the privacy fuss is about.',
    links: [
      { label: 'Visit clawdemy.org', href: 'https://clawdemy.org/' },
      { label: 'Browse all tracks', href: 'https://clawdemy.org/tracks/' },
    ],
  },
];

const FAMILY_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Clawless',
  url: 'https://clawless.ai/',
  parentOrganization: {
    '@type': 'Organization',
    name: 'RBJ Global LLC',
    url: 'https://rbjglobal.com/',
    subOrganization: [
      { '@type': 'Organization', name: 'Clawless', url: 'https://clawless.ai/' },
      { '@type': 'Organization', name: 'iLoveMD', url: 'https://iluvmd.com/' },
      { '@type': 'Organization', name: 'WhisprDesk', url: 'https://whisprdesk.com/' },
      { '@type': 'Organization', name: 'Trading Agents Lab', url: 'https://tradingagentslab.ai/' },
      { '@type': 'Organization', name: 'Clawdemy', url: 'https://clawdemy.org/' },
    ],
  },
};

function Glyph({ kind }: { kind: FamilyMember['glyph'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (kind) {
    case 'building':
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <line x1="8" y1="6" x2="8" y2="6" />
          <line x1="12" y1="6" x2="12" y2="6" />
          <line x1="16" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="8" y2="10" />
          <line x1="12" y1="10" x2="12" y2="10" />
          <line x1="16" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="8" y2="14" />
          <line x1="12" y1="14" x2="12" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
        </svg>
      );
    case 'document':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );
    case 'mic':
      return (
        <svg {...common}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      );
    case 'trending':
      return (
        <svg {...common}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
  }
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function FamilyPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAMILY_JSONLD) }}
      />
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-[120px] text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-[-180px] h-[700px] w-[700px] rounded-full"
            style={{
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0.06) 35%, rgba(34,255,170,0.04) 55%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'orbBreathe 8s ease-in-out infinite',
            }}
          />

          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              The family
            </p>
            <h1
              className="relative mb-6 text-[42px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[56px] md:text-[64px]"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Clawless is one of{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent) 0%, var(--color-success) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                several
              </span>
              .
            </h1>
            <p className="mx-auto max-w-[640px] text-base leading-[1.7] text-text-secondary sm:text-lg">
              Clawless is a product of RBJ Global LLC. The same operator
              ships a small portfolio of independent, privacy-first software.
              Each product is its own brand on its own domain, with its own
              pricing and roadmap, joined by a single posture: keep the
              user&apos;s data on the user&apos;s device.
            </p>
          </ScrollReveal>
        </section>

        {/* Family grid */}
        <section className="pb-24 sm:pb-32">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {MEMBERS.map((m) => (
              <ScrollReveal key={m.name}>
                <article
                  className="flex h-full flex-col rounded-xl p-7 sm:p-8 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(0, 212, 255, 0.06)',
                    border: '1px solid rgba(0, 212, 255, 0.22)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-accent"
                      style={{ background: 'rgba(0, 212, 255, 0.10)' }}
                    >
                      <Glyph kind={m.glyph} />
                    </span>
                    <div>
                      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.01em] text-text-primary sm:text-[24px]">
                        {m.name}
                      </h2>
                      <p className="mt-0.5 text-[13px] leading-tight text-text-muted">
                        {m.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-[1.7] text-text-secondary">
                    {m.description}
                  </p>
                  <ul
                    className="mt-6 flex flex-col gap-2 pt-5 text-[14px]"
                    style={{ borderTop: '1px solid rgba(0, 212, 255, 0.16)' }}
                  >
                    {m.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-2 text-accent transition-colors duration-150 hover:text-text-primary"
                        >
                          <ArrowRight />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
