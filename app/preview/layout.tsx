import type { Metadata } from 'next';
import '@/components/oss/oss.css';
import { ThemeProvider } from '@/components/oss/Theme';
import { THEME_BOOT } from '@/components/oss/themeBoot';
import { Shell } from '@/components/oss/Shell';

/**
 * Open-source redesign: REVIEW BUILD. Local only, never deployed from this
 * branch. noindex is a belt-and-braces guard in case it is ever served.
 */
export const metadata: Metadata = {
  title: { default: 'Clawless Computer: open source AI agents on your Mac', template: '%s | Clawless Computer' },
  description:
    'Clawless Computer is a free, open source desktop app for OpenClaw. Run AI agents on your own Mac with your own keys. AGPL-3.0, source on GitHub.',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      <ThemeProvider>
        <Shell>{children}</Shell>
      </ThemeProvider>
    </>
  );
}
