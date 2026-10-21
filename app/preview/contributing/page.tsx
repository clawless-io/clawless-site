import type { Metadata } from 'next';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = { title: 'Contributing', description: 'How to contribute to Clawless Computer: development setup, review by risk tier, AI-assisted review, and the Contributor License Agreement.' };

export default function Page() {
  return <ProjectDocPage slug="contributing" />;
}
