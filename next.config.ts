import type { NextConfig } from 'next';

/**
 * Static export config for Cloudflare Pages.
 *
 * `output: 'export'` produces a fully static `out/` directory at build time
 * with no server runtime, which Cloudflare Pages serves directly via CDN.
 *
 * `trailingSlash: true` is required for static hosts that serve index.html
 * by default at directory paths (Cloudflare Pages, S3, GitHub Pages, etc.).
 *
 * `images.unoptimized: true` is required because Next.js's image optimizer
 * needs a server runtime — incompatible with static export. We are not using
 * any next/image components yet, but this future-proofs the config.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
