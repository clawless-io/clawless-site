import type { Metadata } from 'next';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = { title: 'Contributor License Agreement', description: 'The Clawless Computer Contributor License Agreement, signed once by every contributor before a first pull request can be merged.', robots: { index: false, follow: true } };

export default function Page() {
  return <ProjectDocPage slug="cla" />;
}
