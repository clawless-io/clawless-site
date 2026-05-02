import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

// Required for `output: 'export'` static export — same as sitemap.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
