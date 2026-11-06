import type { Metadata } from 'next';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = { title: 'License', description: 'Clawless Computer is free software under the GNU Affero General Public License, version 3.', robots: { index: false, follow: true } };

export default function Page() {
  return <ProjectDocPage slug="license" />;
}
