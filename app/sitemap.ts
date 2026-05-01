import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

// Required for `output: 'export'` static export — Next.js otherwise treats
// metadata routes as dynamic and refuses to prerender them.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // /privacy and /terms intentionally excluded while they hold
    // pre-launch placeholder copy. Their pages also carry the
    // robots meta noindex directive and robots.txt disallow them.
    // Add them back once the entity-of-record paragraph lands per
    // project-privacy-terms-llc-backlog.md.
  ];
}
