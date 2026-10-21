import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, Para } from '@/components/oss/LegalPage';

export const metadata: Metadata = {
  title: 'Legal',
  description: 'The license, contributor agreement, privacy notices and security policy for Clawless Computer and clawless.ai.',
  robots: { index: false, follow: true },
};

const P = '/preview';
const DOCS: [string, string, string][] = [
  ['License', `${P}/license/`, 'GNU Affero General Public License v3. Covers use, modification and distribution, and disclaims warranty.'],
  ['Contributor License Agreement', `${P}/cla/`, 'Signed once by every contributor before a first pull request can be merged.'],
  ['App privacy', `${P}/privacy/app/`, 'What the app stores on your computer and every network connection it makes.'],
  ['Website privacy', `${P}/privacy/`, 'What this website collects: one cookieless visit counter.'],
  ['Security policy', `${P}/security/`, 'How to report a vulnerability privately, and which versions receive fixes.'],
  ['Security and trust', `${P}/trust/`, 'How the app is built to be checked.'],
];

/** DRAFT: the legal hub that replaces the retired /terms and /acceptable-use
 *  (both 301 here at launch). No acceptable-use policy: further restrictions on
 *  the use of AGPL software are not permitted by the licence itself (section 10). */
export default function Legal() {
  return (
    <LegalPage title="Legal" updated="[set on launch day]">
      <div className="grid gap-3 sm:grid-cols-2">
        {DOCS.map(([t, h, d]) => (
          <Link key={h} href={h} className="oss-card block p-5 transition-transform hover:-translate-y-0.5">
            <p className="font-semibold text-[var(--oss-ink)]">{t}</p>
            <p className="oss-small mt-1">{d}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Para>
          The Clawless Computer name and logo are used by RBJ Global LLC to identify the official project. If you distribute a modified build,
          please give it a different name.
        </Para>
        <Para>Clawless Computer is published by RBJ Global LLC, a Texas limited liability company.</Para>
      </div>
    </LegalPage>
  );
}
