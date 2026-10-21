import type { Metadata } from 'next';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = { title: 'Security', description: 'How to report a security vulnerability in Clawless Computer privately, what is in scope, and which versions receive fixes.', robots: { index: false, follow: true } };

export default function Page() {
  return <ProjectDocPage slug="security" />;
}
