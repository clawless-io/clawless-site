import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { LegalPage, Para } from '@/components/oss/LegalPage';
import { PRELAUNCH } from '@/components/oss/content';
import { PUBLICATION_DATE } from '@/components/oss/legal-dates';

export const metadata: Metadata = {
  ...pageMetadata('/legal/', {
    title: 'Legal',
    description: PRELAUNCH
      ? 'Website privacy, security and trust, and the publisher of Clawless Computer. The license, contributor agreement, app privacy notice and security policy are published with the source at launch.'
      : 'The license, contributor agreement, privacy notices and security policy for Clawless Computer and clawless.ai.',
  }),
  robots: { index: false, follow: true },
};

const DOCS: [string, string, string][] = [
  ['License', `/license/`, 'GNU Affero General Public License v3. Covers use, modification and distribution, and disclaims warranty.'],
  ['Contributor License Agreement', `/cla/`, 'Signed once by every contributor before a first pull request can be merged.'],
  ['App privacy', `/privacy/app/`, 'What the app stores on your computer and every network connection it makes.'],
  ['Website privacy', `/privacy/`, 'What this website collects: one cookieless visit counter.'],
  ['Security policy', `/security/`, 'How to report a vulnerability privately, and which versions receive fixes.'],
  ['Security and trust', `/trust/`, 'How the app is built to be checked.'],
];

/** Pages that exist before launch. The license, CLA, app privacy notice and
 *  security policy are rendered from the repository, which is not public until
 *  launch, so they are not linked while PRELAUNCH is true. */
const PRELAUNCH_DOCS = new Set([`/privacy/`, `/trust/`]);

/** The legal hub that replaces the retired /terms and /acceptable-use
 *  (both 301 here). No acceptable-use policy: further restrictions on
 *  the use of AGPL software are not permitted by the licence itself (section 10). */
export default function Legal() {
  const docs = PRELAUNCH ? DOCS.filter(([, h]) => PRELAUNCH_DOCS.has(h)) : DOCS;
  return (
    <LegalPage title="Legal" updated={PUBLICATION_DATE}>
      <div className="grid gap-3 sm:grid-cols-2">
        {docs.map(([t, h, d]) => (
          <Link key={h} href={h} className="oss-card block p-5 transition-transform hover:-translate-y-0.5">
            <p className="font-semibold text-[var(--oss-ink)]">{t}</p>
            <p className="oss-small mt-1">{d}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        {PRELAUNCH && (
          <Para>
            The license (AGPL-3.0), the Contributor License Agreement, the app privacy notice and the security policy are published with the
            source at launch.
          </Para>
        )}
        <Para>
          The Clawless Computer name and logo are used by RBJ Global LLC to identify the official project. If you distribute a modified build,
          please give it a different name.
        </Para>
        <Para>
          {PRELAUNCH
            ? 'Clawless Computer is made by RBJ Global LLC, a Texas limited liability company, which also operates this website.'
            : 'Clawless Computer is published by RBJ Global LLC, a Texas limited liability company.'}
        </Para>
      </div>
    </LegalPage>
  );
}
