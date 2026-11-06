import type { Metadata } from 'next';

export const SITE_URL = 'https://clawless.ai';
export const SITE_NAME = 'Clawless Computer';
export const SITE_DESCRIPTION =
  'Clawless Computer is a desktop app for running open source AI agents on your Mac with your own keys. Coming soon, and free under the AGPL-3.0 at launch.';

// Cloudflare Web Analytics: the cookieless, aggregate visit counter disclosed
// in the privacy notice. This token is PUBLIC by design (it ships in the page
// HTML); it is NOT a secret. An empty string disables the beacon.
export const CF_BEACON_TOKEN = '158ab1942af24008a379002a1739f428';

const DEFAULT_TITLE = 'Clawless Computer: open source AI agents on your Mac';

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
    'open source AI agents',
    'AGPL-3.0',
    'OpenClaw',
    'OpenClaw desktop app',
    'AI agent',
    'desktop AI',
    'local-first AI',
    'bring your own keys',
    'AI on your Mac',
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
 * Per-page metadata. Pass a trailing-slash path ('/what-it-does/', or '/' for
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
 * Sitewide publisher identity, injected once in the root layout. The homepage
 * adds the WebSite node below. No SoftwareApplication before launch: the app is
 * not released yet, and no node on this site carries an Offer or a price.
 */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.png`,
  // Reference the parent by @id, not by name+url. An @id reference lets a
  // crawler merge this node with RBJ Global's own Organization node into one
  // entity; an inline {name, url} object only restates a name and leaves the
  // two unlinked. app/family/page.tsx already used the @id form, so the
  // homepage was the weaker of our two emissions.
  parentOrganization: { '@id': 'https://rbjglobal.com/#organization' },
  // Numeric LinkedIn company ID (stable; vanity slugs can be reassigned).
  sameAs: ['https://www.linkedin.com/company/114564073'],
};

/** Homepage-only WebSite node for entity clarity. No SearchAction: the
 * marketing site has no on-site search endpoint, so a sitelinks-searchbox
 * target would be invalid. Publisher references the org by @id (acyclic). */
export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

