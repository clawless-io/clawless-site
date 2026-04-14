import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { siteMetadata, jsonLd } from '@/lib/metadata';
import NoiseOverlay from '@/components/effects/NoiseOverlay';
import GridBackground from '@/components/effects/GridBackground';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

const exo2 = localFont({
  src: [
    { path: '../public/fonts/Exo2-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Exo2-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Exo2-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-exo2',
  display: 'swap',
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
    <html lang="en" className={`${inter.variable} ${exo2.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <GridBackground />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
