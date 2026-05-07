import fs from 'node:fs';
import path from 'node:path';

export type ChapterStatus = 'live' | 'shipping-with-launch';

export interface ChapterMeta {
  slug: string;
  title: string;
  description: string;
  status: ChapterStatus;
}

export interface DocsCategory {
  title: string;
  description: string;
  chapters: ChapterMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

// Single source of truth for /docs taxonomy. Order here is the order the
// index page renders. Slugs match the filenames in clawless-v1/clawless/
// docs/knowledge-base/ (without `.md`) — that match is load-bearing because
// the kb.clawless.ai RAG worker bakes citation URLs as
// `clawless.ai/docs/<slug>#<anchor>`. Do not rename a slug without
// re-indexing the worker corpus.
const CHAPTER_TAXONOMY: DocsCategory[] = [
  {
    title: 'Getting started',
    description: 'First-launch walkthrough and the architecture in plain language.',
    chapters: [
      {
        slug: 'getting-started',
        title: 'Getting started',
        description:
          'First launch, onboarding wizard, sending your first message, picking the right agent for your task.',
        status: 'live',
      },
      {
        slug: 'whats-under-the-hood',
        title: "What's under the hood",
        description:
          'How Clawless and OpenClaw fit together, where data goes, and what runs locally.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Chat, agents, and memory',
    description: 'The day-to-day surfaces you spend the most time inside.',
    chapters: [
      {
        slug: 'chat-and-models',
        title: 'Chat and models',
        description:
          'Chatting with any provider, switching models mid-conversation, slash commands, conversation history.',
        status: 'live',
      },
      {
        slug: 'agents-and-overview',
        title: 'Agents and overview',
        description:
          'The default agent lineup, building custom agents, per-agent tool scope, the agent overview panel.',
        status: 'live',
      },
      {
        slug: 'memory-system',
        title: 'Memory system',
        description:
          'Tiered memory (pinned, insights, general, decayed), how memories are captured, how to edit them.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Tools and skills',
    description: 'How agents do real work in the world.',
    chapters: [
      {
        slug: 'tools-and-automation',
        title: 'Tools and automation',
        description:
          'Default tools, three security profiles, per-tool approval prompts, MCP server integration.',
        status: 'live',
      },
      {
        slug: 'skills-marketplace',
        title: 'Skills marketplace',
        description:
          'ClawHub catalog, installing community skills, building your own skill in the Skill Builder.',
        status: 'live',
      },
      {
        slug: 'browser-automation',
        title: 'Browser automation',
        description:
          'Letting an agent drive a real browser on your behalf. Default-on, headed-by-default, per-hostname permission prompt.',
        status: 'live',
      },
      {
        slug: 'attachments',
        title: 'Attachments',
        description:
          'Sending files to your agents — images, PDFs, text — and how each model handles them.',
        status: 'shipping-with-launch',
      },
    ],
  },
  {
    title: 'Channels and automations',
    description: 'Reach your agents from outside Clawless and on a schedule.',
    chapters: [
      {
        slug: 'channels-and-integrations',
        title: 'Channels and integrations',
        description:
          'Talking to your agents through Telegram, Discord, Slack, Email, and the rest. Setup wizard, per-channel agent assignment.',
        status: 'live',
      },
      {
        slug: 'automations',
        title: 'Automations',
        description:
          'Scheduled prompts. Friendly presets plus raw cron, output to chat or to a connected channel.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Cost, account, and reference',
    description: 'Spending control, account state, and the long-form settings reference.',
    chapters: [
      {
        slug: 'costguard',
        title: 'CostGuard',
        description:
          'Set a monthly cap, get warned at a threshold, hard-stop or soft-stop when you reach it.',
        status: 'shipping-with-launch',
      },
      {
        slug: 'usage-and-cost',
        title: 'Usage and cost',
        description:
          'How Clawless tracks your provider spend, where to see it, what counts toward CostGuard.',
        status: 'live',
      },
      {
        slug: 'licensing-and-trial',
        title: 'Licensing and trial',
        description:
          'How the 7-day trial works, how the license validates, what happens when the trial ends.',
        status: 'live',
      },
      {
        slug: 'app-lock',
        title: 'App lock',
        description:
          'Lock Clawless behind a passphrase or your system biometric so a stolen laptop is not a stolen workspace.',
        status: 'live',
      },
      {
        slug: 'settings-reference',
        title: 'Settings reference',
        description:
          'Every panel in Settings, what each option does, and what the defaults are.',
        status: 'live',
      },
    ],
  },
];

export function getCategories(): DocsCategory[] {
  return CHAPTER_TAXONOMY;
}

export function getAllChapterSlugs(): string[] {
  return CHAPTER_TAXONOMY.flatMap((c) => c.chapters.map((ch) => ch.slug));
}

export function getChapterMeta(slug: string): ChapterMeta | undefined {
  for (const category of CHAPTER_TAXONOMY) {
    for (const chapter of category.chapters) {
      if (chapter.slug === slug) return chapter;
    }
  }
  return undefined;
}

export function getChapterMarkdown(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.readFileSync(filePath, 'utf8');
}

export function getCategoryForSlug(slug: string): DocsCategory | undefined {
  return CHAPTER_TAXONOMY.find((c) =>
    c.chapters.some((ch) => ch.slug === slug),
  );
}
