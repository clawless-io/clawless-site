/**
 * Content types for the marketing site.
 * Phase 1 has no real CMS — everything is inlined in constants.ts and
 * cms.ts is just a thin synchronous getter that returns the same shape
 * the components already expect.
 */

export interface HeroContent {
  badgeText: string;
  headline: string[];
  /**
   * Founder-locked positioning hook. Rendered as a punchy sub-headline
   * directly below the main headline. Empty string disables it.
   */
  valueProps: string;
  tagline: string;
  /**
   * comingSoon=true renders the CTA as a non-clickable gray span with a
   * "Coming Q3 2026" suffix. When the destination route exists at launch,
   * flip comingSoon to false (or remove it) for the active link rendering.
   */
  primaryCta: { label: string; href: string; comingSoon?: boolean };
  secondaryCta: { label: string; href: string; comingSoon?: boolean };
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
  buttonLabel: string;
  buttonHref: string;
  /**
   * When true, the CTA renders as a non-clickable gray span with a
   * "Coming Q3 2026" suffix. Used while /download is unbuilt.
   */
  buttonComingSoon?: boolean;
}

export interface NavContent {
  links: { label: string; href: string }[];
  ctaLabel: string;
}

export interface FooterContent {
  tagline: string;
  madeWith: string;
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
  closingButtonLabel: string;
  closingButtonHref: string;
  /**
   * When true, the closing CTA renders as a non-clickable gray span with a
   * "Coming Q3 2026" suffix. Used while /download is unbuilt.
   */
  closingButtonComingSoon?: boolean;
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
