import type { Metadata } from 'next';

export const SITE_URL = 'https://clawless.ai';
export const SITE_NAME = 'Clawless Computer';
export const SITE_DESCRIPTION =
  'An operating system for AI. Run agents, models, and tools on your desktop or laptop, Mac, Windows, or Linux. Built on top of OpenClaw.';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Clawless Computer, an operating system for AI.',
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
    title: 'Clawless Computer, an operating system for AI.',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clawless Computer, an operating system for AI.',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Clawless Computer',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
};
