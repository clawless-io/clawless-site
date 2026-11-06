/**
 * Voice and posture guards for the rendered site.
 *
 * Scans the page and component source (comments stripped, since code comments
 * may use any punctuation), lib/metadata.ts and public/llms.txt for the family
 * voice rules and the pre-launch posture: no em-dashes, no superlatives, no
 * pricing or trial language, no payment or licensing vendors, no anchored
 * launch quarter. Also checks the sitemap and the retired-URL redirects.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';

const ROOT = path.resolve(__dirname, '..');

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(tsx?|md)$/.test(e.name) ? [p] : [];
  });
}

const stripComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');

// Served pages only: app/_at-launch is not routed until launch.
const SOURCES = [
  ...walk(path.join(ROOT, 'app')).filter((f) => !f.includes(`${path.sep}_at-launch${path.sep}`) && f.endsWith('.tsx')),
  ...walk(path.join(ROOT, 'components')).filter((f) => /\.tsx?$/.test(f)),
  path.join(ROOT, 'lib', 'metadata.ts'),
  path.join(ROOT, 'app', 'sitemap.ts'),
].map((f) => ({ file: path.relative(ROOT, f), text: stripComments(fs.readFileSync(f, 'utf8')) }));

const LLMS = fs.readFileSync(path.join(ROOT, 'public', 'llms.txt'), 'utf8');
const ALL = [...SOURCES, { file: 'public/llms.txt', text: LLMS }];

const BANNED: [string, RegExp][] = [
  ['em-dash', /—/],
  ['Lemon Squeezy', /lemon\s*squeezy/i],
  ['Stripe', /\bstripe\b/i],
  ['Keygen', /\bkeygen\b/i],
  ['license key', /license[- ]key/i],
  ['license server', /licen[cs]e[- ]server/i],
  ['trial', /\btrials?\b/i],
  ['price', /\$\s?\d/],
  ['priceCurrency or Offer schema', /priceCurrency|"offers"|'Offer'|SoftwareApplication/],
  ['anchored quarter', /\bQ[1-4]\s?20\d\d\b|\bQ[1-4]\b/],
  ['Ubuntu', /ubuntu/i],
  ['superlative', /world-class|best-in-class|industry-leading|revolutionary|cutting-edge|state-of-the-art/i],
];

describe('site copy voice rules', () => {
  for (const [name, re] of BANNED) {
    it(`has no ${name}`, () => {
      const hits = ALL.filter((s) => re.test(s.text)).map((s) => s.file);
      expect(hits).toEqual([]);
    });
  }

  it('llms.txt links no retired, hidden or preview pages', () => {
    expect(LLMS).not.toMatch(/clawless\.ai\/(features|pricing|refunds|terms|acceptable-use|subprocessors|license|cla|security|contributing|preview|docs)\b/);
    expect(LLMS).not.toMatch(/github\.com/);
  });
});

describe('sitemap', () => {
  const urls = sitemap().map((e) => e.url);
  it('lists only indexable routes, all with a trailing slash', () => {
    for (const u of urls) expect(u).toMatch(/^https:\/\/clawless\.ai\/([a-z-]+\/)?$/);
    for (const p of ['what-it-does', 'architecture', 'build', 'download', 'learn', 'family', 'support']) {
      expect(urls).toContain(`https://clawless.ai/${p}/`);
    }
  });
  it('omits legal, docs, project-document and retired routes', () => {
    const banned = /\/(privacy|legal|trust|docs|license|cla|security|contributing|features|pricing|refunds|terms|acceptable-use|subprocessors|preview)\//;
    expect(urls.filter((u) => banned.test(u))).toEqual([]);
  });
});

describe('_redirects', () => {
  const lines = fs
    .readFileSync(path.join(ROOT, 'public', '_redirects'), 'utf8')
    .split('\n')
    .map((l) => l.trim().split(/\s+/).join(' '));
  const required = [
    ['/refunds', '/download/'],
    ['/terms', '/legal/'],
    ['/acceptable-use', '/legal/'],
    ['/subprocessors', '/privacy/'],
    ['/pricing', '/download/'],
    ['/features', '/what-it-does/'],
  ];
  for (const [from, to] of required) {
    it(`301s ${from} and ${from}/ to ${to}`, () => {
      expect(lines).toContain(`${from}/ ${to} 301`);
      expect(lines).toContain(`${from} ${to} 301`);
    });
  }
  it('301s the old /preview/ tree to the root', () => {
    expect(lines).toContain('/preview/* /:splat 301');
  });
});
