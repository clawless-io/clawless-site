import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

// Required for `output: 'export'` static export, same as sitemap.
export const dynamic = 'force-static';

/**
 * Allow all crawlers, with AI/answer-engine bots listed explicitly so
 * the intent is unambiguous to future WAF or Cloudflare-bot-management
 * defaults that may start blocking unknown UAs. Legal pages
 * (/privacy, /terms, /refunds, /acceptable-use, /subprocessors,
 * /trust) carry noindex meta in their route metadata, so they stay
 * crawlable but out of search results. We do NOT robots.txt Disallow
 * them; doing so blocks crawlers from seeing the noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // OpenAI: training, search, on-demand fetch
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Anthropic: training, on-demand fetch, search
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      // Perplexity: index, on-demand fetch
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      // Google Gemini / AI Overviews training control
      { userAgent: 'Google-Extended', allow: '/' },
      // Apple Intelligence
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
