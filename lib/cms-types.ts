/**
 * Content types for the marketing site.
 * Phase 1 has no real CMS — everything is inlined in constants.ts and
 * cms.ts is just a thin synchronous getter that returns the same shape
 * the components already expect.
 */

export interface HeroContent {
  badgeText: string;
  headline: string[];
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
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

export interface WebsiteContentMap {
  hero: HeroContent;
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
