import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { siteMetadata, organizationJsonLd, CF_BEACON_TOKEN } from '@/lib/metadata';
import '@/components/oss/oss.css';
import { ThemeProvider } from '@/components/oss/Theme';
import { THEME_BOOT } from '@/components/oss/themeBoot';
import { Shell } from '@/components/oss/Shell';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = localFont({
  src: [
    { path: '../public/fonts/SpaceGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/SpaceGrotesk-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Sets the light/dark theme before first paint so it never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
        {/* Cloudflare Web Analytics: cookieless, aggregate visit counter,
            disclosed in the privacy notice. Renders only when the public
            beacon token is set. */}
        {CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
