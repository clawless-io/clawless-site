/**
 * Single source of truth for every factual claim on the open-source redesign.
 *
 * RULE: every claim carries the path in the PUBLIC open-source tree that backs
 * it (RBJGlobal/clawless-computer, renamed from RBJGlobal/clawless; claims checked against 4e02af4, docs synced from ca20b05, "Clawless 6.0.0: open
 * source release"). Never source from the private repo, its CLAUDE.md,
 * architecture notes, or advisor documents. If a claim cannot point at a public
 * path, it does not ship.
 *
 * Copy voice: plain and checkable. Enthusiasm comes from depth and craft, not
 * adjectives. No "amazing", "production-ready", "99% complete", no superlatives,
 * no em-dashes in rendered strings.
 */

export const REPO = 'https://github.com/RBJGlobal/clawless-computer';
export const blob = (path: string) => `${REPO}/blob/main/${path}`;
export const tree = (path: string) => `${REPO}/tree/main/${path}`;
export const RELEASES = `${REPO}/releases`;

/** Pinned in package.json. RE-VERIFY against the public tree immediately before
 *  the deploy go; a moved pin makes the site wrong the moment it goes live. */
export const ENGINE_VERSION = '2026.9.33';
export const APP_VERSION = '6.0.0';

/** PRE-LAUNCH MODE (Advisor brief 2026-11-06). While true the site announces
 *  Clawless Computer as coming: no links into the repository (it is not public
 *  yet), no download, no docs, future tense where the repo is described.
 *  Launch day = flip to false + re-run scripts/sync-oss-docs.sh <release-tag>. */
export const PRELAUNCH = true;

/** /about stays (restyled) unless the founder rules otherwise; footer link flips here. */
export const SHOW_ABOUT = true;

/** RBJ Global company Page on LinkedIn (the pre-launch "follow for the date" line). */
export const RBJ_LINKEDIN = 'https://www.linkedin.com/company/116324588/';

/**
 * Deliberately NOT claimed (Advisor rulings, 2026-10-21):
 *  - No "independent security audit". There is no public source, and the
 *    review was commissioned in-house, so "independent" would mislead.
 *  - No unit-test count until the release tag. Use the passing count printed by
 *    a real `bun run test:unit` run at that tag; a static grep is not authoritative.
 */

/** The checkable facts strip. Each item has a public source. */
export const FACTS = [
  { label: 'AGPL-3.0', detail: 'Free software, source on GitHub', source: 'LICENSE' },
  { label: 'Runs on your Mac', detail: 'macOS on Apple silicon', source: 'README.md' },
  { label: 'Your own keys', detail: 'Anthropic, OpenAI, Google, Groq and more', source: 'README.md' },
  { label: 'No account', detail: 'No email, no sign-up, no card', source: 'PRIVACY.md' },
  { label: 'No telemetry in the app', detail: 'Engine included, no crash reporting', source: 'PRIVACY.md' },
  { label: 'AI-built, human-reviewed', detail: 'Agents comment; a person merges', source: 'CONTRIBUTING.md' },
] as const;

/** "What happens when you click Send", verbatim structure from the KB. */
export const SEND_PATH = [
  { who: 'You', text: 'Your message goes from the chat input to the Clawless app.' },
  { who: 'Clawless', text: 'The app passes it to OpenClaw, the engine that knows how to talk to AI providers.' },
  { who: 'OpenClaw', text: 'OpenClaw sends it to the provider you selected, over the internet.' },
  { who: 'Provider', text: 'The model generates a reply and streams it back.' },
  { who: 'OpenClaw', text: 'OpenClaw passes the reply to Clawless.' },
  { who: 'Clawless', text: 'Clawless renders it in the chat.' },
] as const;
export const SEND_PATH_SOURCE = 'docs/knowledge-base/whats-under-the-hood.md';

/** Feature tour. One line each, taken from the opening of the matching
 *  knowledge-base chapter. All chapters are tagged [Live] at 4e02af4. */
export const FEATURES = [
  {
    key: 'chat',
    title: 'Chat with any major provider',
    body: 'Pick a model, stream replies, stop mid-answer, and keep full history. Bring keys for Anthropic, OpenAI, Google, Groq and more.',
    doc: 'docs/knowledge-base/chat-and-models.md',
  },
  {
    key: 'agents',
    title: 'A team of agents',
    body: 'Six default agents ready on day one. Switch between them by task, or create and edit your own.',
    doc: 'docs/knowledge-base/agents-and-overview.md',
  },
  {
    key: 'memory',
    title: 'Memory that decays on purpose',
    body: 'Agents remember what matters about you across four tiers. Pin what should stay; untouched memories age into a Decayed tier instead of being deleted.',
    doc: 'docs/knowledge-base/memory-system.md',
  },
  {
    key: 'tools',
    title: 'Tools and MCP servers',
    body: 'Agents act, not just talk. Control which tools each agent may use, and add new ones through MCP servers.',
    doc: 'docs/knowledge-base/tools-and-automation.md',
  },
  {
    key: 'skills',
    title: 'Skills from the ClawHub catalog',
    body: 'Install community skills for jobs you repeat, or build your own. Optional VirusTotal checks before install.',
    doc: 'docs/knowledge-base/skills-marketplace.md',
  },
  {
    key: 'channels',
    title: 'Channels',
    body: 'Reach your agents from Telegram, Discord, Slack and many other messaging platforms, with control over who can talk to them.',
    doc: 'docs/knowledge-base/channels-and-integrations.md',
  },
  {
    key: 'automations',
    title: 'Scheduled automations',
    body: 'Cron jobs and recurring prompts: "every Monday at 8 AM, summarize the news and post it to Slack."',
    doc: 'docs/knowledge-base/automations.md',
  },
  {
    key: 'browser',
    title: 'Browser automation',
    body: 'An agent can open a real browser, navigate, click, type, read pages and take screenshots on your behalf.',
    doc: 'docs/knowledge-base/browser-automation.md',
  },
  {
    key: 'attachments',
    title: 'Attachments',
    body: 'Share screenshots, PDFs, Word documents and Markdown files with an agent by dropping them on the chat.',
    doc: 'docs/knowledge-base/attachments.md',
  },
  {
    key: 'images',
    title: 'Image generation',
    body: 'Ask for a picture and it appears in the chat below the reply, with no separate tool.',
    doc: 'docs/knowledge-base/image-generation.md',
  },
  {
    key: 'cost',
    title: 'Usage dashboard and CostGuard',
    body: 'See spend per model, then set a monthly cap. Warnings as you approach it; new messages stop when you hit it.',
    doc: 'docs/knowledge-base/costguard.md',
  },
  {
    key: 'lock',
    title: 'App lock',
    body: 'A PIN lock screen with a recovery code. Lock the window while channels and scheduled jobs keep working.',
    doc: 'docs/knowledge-base/app-lock.md',
  },
] as const;

/** Every outbound connection, per PRIVACY.md (authoritative). */
export const CONNECTIONS = [
  { name: 'Your AI provider', when: 'When you send a message, using your own key', carries: 'The message and its context', source: 'PRIVACY.md' },
  { name: 'ClawHub catalog', when: 'First use of the Skills catalog, then every few hours while open', carries: 'Plain downloads; your search words if you search', source: 'PRIVACY.md' },
  { name: 'GitHub update checks', when: 'When you check, or if you turn automatic checks on', carries: 'Your Clawless version and platform', source: 'PRIVACY.md' },
  { name: 'VirusTotal', when: 'Optional, off by default, with your own key', carries: 'Skills you install, checked first', source: 'PRIVACY.md' },
  { name: 'npm registry', when: 'Connecting some channels', carries: 'Installs the matching OpenClaw plugin', source: 'PRIVACY.md' },
  { name: 'Services you connect', when: 'Channels, web search, the browser', carries: 'Contacted on your behalf', source: 'PRIVACY.md' },
] as const;

/** "What you are trusting to whom", from the KB. */
export const TRUST = [
  { party: 'RBJ Global', trust: 'to ship a desktop app that does what it claims and protects your local data.' },
  { party: 'Your AI provider', trust: 'with the contents of your messages.' },
  { party: 'OpenClaw', trust: 'to be a faithful engine. It is open source, so you can audit it.' },
  { party: 'Tools and skills you install', trust: 'with whatever permissions they ask for.' },
] as const;

/** Knowledge-base chapters, grouped as the KB README groups them. */
export const DOCS = [
  {
    group: 'First hour',
    items: [
      ['getting-started', 'Getting started', 'First launch, onboarding, your first agent and message'],
      ['chat-and-models', 'Chat and models', 'Picking a model, history, streaming and stopping'],
      ['agents-and-overview', 'Agents', 'The six default agents, switching, creating your own'],
    ],
  },
  {
    group: 'Daily use',
    items: [
      ['memory-system', 'Memory', 'The four memory tiers, pinning, decay, settings'],
      ['tools-and-automation', 'Tools', 'The tools panel, MCP servers, tool permissions'],
      ['skills-marketplace', 'Skills', 'The ClawHub catalog, installing and building skills'],
      ['channels-and-integrations', 'Channels', 'Telegram, Discord, Slack and other platforms'],
      ['automations', 'Automations', 'Cron jobs, scheduled prompts, recurring tasks'],
      ['settings-reference', 'Settings', 'Every setting, its default, when to change it'],
    ],
  },
  {
    group: 'Cost and safety',
    items: [
      ['usage-and-cost', 'Usage and cost', 'The usage dashboard and per-model costs'],
      ['costguard', 'CostGuard', 'Monthly budget caps, warnings, hard stop'],
      ['app-lock', 'App lock', 'The PIN lock, recovery code, background agents'],
    ],
  },
  {
    group: 'Working with content',
    items: [
      ['attachments', 'Attachments', 'Screenshots, PDFs, Word documents, Markdown'],
      ['browser-automation', 'Browser automation', 'Agents clicking and typing on real websites'],
      ['image-generation', 'Image generation', 'Pictures generated inside the chat'],
    ],
  },
  {
    group: 'Behind the scenes',
    items: [['whats-under-the-hood', 'Under the hood', 'What OpenClaw is, where your data goes, what stays local']],
  },
] as const;

/** Contribution risk tiers, verbatim structure from CONTRIBUTING.md. */
export const RISK_TIERS = [
  { tier: '0', touches: 'Docs, knowledge base, README, copy', review: 'Light review' },
  { tier: '1', touches: 'Renderer UI (src/renderer/)', review: 'Standard review plus CI' },
  { tier: '2', touches: 'Main process, preload, IPC handlers, the CSP, any new network endpoint', review: 'Deep review plus a security pass' },
  { tier: '3', touches: 'package.json, lockfile, build scripts, workflows, publish config', review: 'Highest scrutiny; new dependencies need a written justification' },
] as const;

/** Code map, from CONTRIBUTING.md "How the code is organized". */
export const CODE_MAP = [
  { path: 'src/main/', role: 'Electron main process: the engine lifecycle, IPC handlers, and local services. Services never import electron directly; dependencies are injected so they stay testable.' },
  { path: 'src/preload/', role: 'The bridge exposed to the renderer as window.clawless.' },
  { path: 'src/renderer/', role: 'The React UI.' },
  { path: 'docs/knowledge-base/', role: 'End-user documentation. User-visible changes update the matching chapter in the same pull request.' },
] as const;

/** Places to build on Clawless. Each is grounded in the public tree. */
export const EXTENSION_POINTS = [
  { title: 'Port it to Windows or Linux', body: 'Clawless targets macOS on Apple silicon today. The README names Windows and Linux builds as a natural first community contribution.', source: 'README.md' },
  { title: 'Write a skill', body: 'Skills turn an agent into a specialist for a job you repeat. Build your own and use it across any of your agents.', source: 'docs/knowledge-base/skills-marketplace.md' },
  { title: 'Connect an MCP server', body: 'Give agents new tools by adding MCP servers, with per-agent permission control.', source: 'docs/knowledge-base/tools-and-automation.md' },
  { title: 'Design your own agents', body: 'Beyond the six defaults, create and edit agents of your own, each with its own tools and skills.', source: 'docs/knowledge-base/agents-and-overview.md' },
  { title: 'Improve the docs', body: 'The knowledge base lives in the repo. Tier 0 changes get a light review, so this is the gentlest first pull request.', source: 'CONTRIBUTING.md' },
  { title: 'Bring your own gateway', body: 'Advanced users can run their own OpenClaw gateway instead of the bundled one.', source: 'docs/knowledge-base/whats-under-the-hood.md' },
] as const;
