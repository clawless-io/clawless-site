/**
 * Build-time loader for docs synced from the PUBLIC open-source tree by
 * scripts/sync-oss-docs.sh into content/oss/. Read at build time only (static
 * export); nothing here runs in the browser.
 *
 * The site renders these files verbatim rather than rewriting them, so the
 * website and the repository can never disagree about privacy, security, the
 * CLA or the licence. A site that paraphrases its own policy page drifts from
 * it; rendering the source cannot.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'content', 'oss');

export type DocFile = { slug: string; title: string; description: string; body: string };

export const PROJECT_DOCS = {
  contributing: { file: 'CONTRIBUTING.md', label: 'Contributing' },
  cla: { file: 'CLA.md', label: 'Contributor License Agreement' },
  privacy: { file: 'PRIVACY.md', label: 'Privacy' },
  security: { file: 'SECURITY.md', label: 'Security' },
  license: { file: 'LICENSE', label: 'License' },
} as const;
export type ProjectSlug = keyof typeof PROJECT_DOCS;

export function source(): { repo: string; commit: string; syncedAt: string } {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'SOURCE.json'), 'utf8'));
}

/** First "# " heading, and the first plain paragraph after it (for the meta description). */
function parse(slug: string, raw: string): DocFile {
  const title = raw.match(/^# (.+)$/m)?.[1]?.trim() ?? slug;
  const paras = raw
    .replace(/^# .+$/m, '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(#|\||-|\*|>|```|`\[)/.test(p));
  const first = (paras[0] ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ');
  const description = first.length > 158 ? first.slice(0, 155).replace(/\s+\S*$/, '') + '…' : first;
  return { slug, title, description, body: raw };
}

export function kbSlugs(): string[] {
  return fs
    .readdirSync(path.join(ROOT, 'kb'))
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => f.replace(/\.md$/, ''))
    .sort();
}

export function getKb(slug: string): DocFile {
  return parse(slug, fs.readFileSync(path.join(ROOT, 'kb', `${slug}.md`), 'utf8'));
}

export function getProject(slug: ProjectSlug): DocFile & { plain: boolean } {
  const { file, label } = PROJECT_DOCS[slug];
  const raw = fs.readFileSync(path.join(ROOT, 'project', file), 'utf8');
  if (file === 'LICENSE') return { slug, title: label, description: '', body: raw, plain: true };
  return { ...parse(slug, raw), plain: false };
}
