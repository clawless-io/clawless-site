import type { Metadata } from 'next';

export const SITE_URL = 'https://clawless.ai';
export const SITE_NAME = 'Clawless Computer';
export const SITE_DESCRIPTION =
  'An operating system for AI. Run agents, models, and tools on your Mac or Ubuntu desktop. Built on top of OpenClaw.';

const DEFAULT_TITLE = 'Clawless Computer: run AI agents locally on your Mac.';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Clawless Computer',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Clawless',
    'Clawless Computer',
    'AI computer',
    'AI operating system',
    'OpenClaw',
    'AI agent',
    'desktop AI',
    'local-first AI',
    'privacy-first AI',
    'OpenClaw GUI',
    'AI on your machine',
  ],
  authors: [{ name: 'Clawless Computer' }],
  creator: 'Clawless Computer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Per-page metadata. Pass a trailing-slash path ('/features/', or '/' for
 * the homepage) so the canonical matches the URL Next actually emits under
 * `trailingSlash: true` and never self-references a 308.
 *
 * Next.js REPLACES the `openGraph` and `twitter` objects when a child route
 * defines them (it does not deep-merge), so this helper reconstructs both in
 * full, including the og:image — otherwise child routes drop the
 * file-convention `app/opengraph-image.png` and ship no share card.
 */
const OG_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export function pageMetadata(
  path: string,
  meta: { title?: string; description?: string } = {},
): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogTitle = meta.title ? `${meta.title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = meta.description ?? SITE_DESCRIPTION;
  return {
    ...(meta.title ? { title: meta.title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Sitewide publisher identity, injected once in the root layout. Per-page
 * JSON-LD (SoftwareApplication on the homepage, TechArticle on docs) is
 * emitted by those pages and references this Organization as publisher.
 */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.png`,
  parentOrganization: {
    '@type': 'Organization',
    name: 'RBJ Global LLC',
    url: 'https://rbjglobal.com/',
  },
};

/** Homepage-only. operatingSystem reflects the live site's current claim. */
export const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Linux (Ubuntu)',
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#organization` },
};
