/**
 * Content types for the marketing site.
 * Phase 1 has no real CMS — everything is inlined in constants.ts and
 * cms.ts is just a thin synchronous getter that returns the same shape
 * the components already expect.
 */

/**
 * Shared CTA button shape. comingSoon=true renders the CTA as a
 * non-clickable gray span with a "Coming Q3 2026" suffix. When the
 * destination route exists at launch, flip comingSoon to false (or
 * remove it) for the active link rendering.
 */
export interface CtaButtonContent {
  label: string;
  href: string;
  comingSoon?: boolean;
}

export interface HeroContent {
  badgeText: string;
  headline: string[];
  /**
   * Founder-locked positioning hook. Rendered as a punchy sub-headline
   * directly below the main headline. Empty string disables it.
   */
  valueProps: string;
  tagline: string;
  primaryCta: CtaButtonContent;
  secondaryCta: CtaButtonContent;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FeaturesContent {
  sectionLabel: string;
  sectionTitle: string;
  items: FeatureItem[];
}

export interface CtaContent {
  headline: string;
  description: string;
  button?: CtaButtonContent;
}

export interface NavContent {
  links: { label: string; href: string }[];
}

export interface FooterContent {
  tagline: string;
  openClawUrl: string;
}

export interface FeatureGroup {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
}

export interface FeaturesPageContent {
  pageTitle: string;
  pageLead: string;
  privacyHook: string;
  groups: FeatureGroup[];
  closingHeadline: string;
  closingDescription: string;
  closingButton?: CtaButtonContent;
}

/**
 * One pricing tier card on /pricing. priceLabel is the prominent
 * headline price (e.g. "$4.95/mo", "$50/yr", "$199"). priceNote is a
 * smaller line under it for savings or launch-window context.
 * `highlighted` adds the founding-member styling to the lifetime card.
 */
export interface PricingTier {
  name: string;
  priceLabel: string;
  priceNote?: string;
  badge?: string;
  highlighted?: boolean;
  cta: CtaButtonContent;
}

export interface PricingComparisonRow {
  product: string;
  details: string;
}

export interface PricingFaqItem {
  question: string;
  answer: string;
}

/**
 * One OS card on /download. `versionLabel` reads under the OS name (e.g.
 * "macOS 13 Ventura or later"). `architectures` is one or more strings
 * shown as small chips (e.g. ["Apple Silicon", "Intel x64"]). `formats`
 * is for Linux's three-format card; macOS/Windows leave it empty.
 */
export interface DownloadOsCard {
  os: string;
  iconKey: 'macos' | 'windows' | 'linux';
  versionLabel: string;
  architectures: string[];
  formats?: string[];
  cta: CtaButtonContent;
}

export interface DownloadPageContent {
  pageTitle: string;
  pageSubhead: string;
  privacyHook: string;
  preLaunchBanner: string;
  installFlow: {
    headline: string;
    steps: string[];
  };
  osCards: DownloadOsCard[];
  systemRequirements: {
    headline: string;
    items: string[];
  };
  installFootprint: {
    headline: string;
    body: string;
  };
  trustStrip: string;
}

export interface PricingPageContent {
  pageTitle: string;
  pageSubhead: string;
  privacyHook: string;
  preLaunchBanner: string;
  tiers: PricingTier[];
  clawdemyCallout?: {
    headline: string;
    body: string;
  };
  includesHeadline: string;
  includes: string[];
  comparison?: {
    headline: string;
    rows: PricingComparisonRow[];
  };
  faq?: PricingFaqItem[];
}

export interface WhoItsForColumn {
  title: string;
  description: string;
}

export interface WhoItsForContent {
  sectionLabel: string;
  sectionTitle: string;
  columns: WhoItsForColumn[];
}

export interface DemoVideoContent {
  caption: string;
  videoSrc?: string;
}

export interface CompanionContent {
  headline: string;
  paragraphs: string[];
}

/**
 * The zero-data positioning section. Standalone because the founder rule
 * (feedback-zero-data-collection.md) names this the main marketing point;
 * it is not a footnote in another section.
 */
export interface ZeroDataContent {
  eyebrow: string;
  headline: string;
  lead: string;
  chips: string[];
  paragraphs: string[];
}

export interface WebsiteContentMap {
  hero: HeroContent;
  zeroData: ZeroDataContent;
  features: FeaturesContent;
  featuresPage: FeaturesPageContent;
  pricingPage: PricingPageContent;
  downloadPage: DownloadPageContent;
  whoItsFor: WhoItsForContent;
  demoVideo: DemoVideoContent;
  companion: CompanionContent;
  cta: CtaContent;
  nav: NavContent;
  footer: FooterContent;
}

export interface CmsData {
  content: WebsiteContentMap;
}
