/**
 * Site content — inlined for phase 1.
 * No external CMS, no API fetch. Edit this file to update the site,
 * push to GitHub, Cloudflare Pages rebuilds.
 */

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
] as const;

export const FEATURES = [
  {
    title: 'Run it anywhere',
    description:
      'Mac desktop app, headless server, VPS, or thin client to your own AI machine. Whatever you point Clawless Computer at becomes your AI computer.',
    icon: 'desktop' as const,
    color: 'indigo',
  },
  {
    title: 'Every model in one place',
    description:
      'Claude, GPT, Gemini, OpenAI Codex, plus 800+ models through OpenRouter. Switch with one click. Curated shortlist by default, full catalog when you want it.',
    icon: 'openrouter' as const,
    color: 'electricCyan',
  },
  {
    title: 'Visual everything',
    description:
      'Skills, agents, channels, cron jobs, memory — all clickable. Connect a Telegram bot through a wizard, not a YAML file. Toggle a skill in a panel, not a CLI flag.',
    icon: 'skills' as const,
    color: 'amber',
  },
  {
    title: 'Local-first, always yours',
    description:
      'Your API keys stay on your machine. Your conversations stay on your machine. No accounts, no telemetry, no cloud roundtrip for anything that does not have to leave your computer.',
    icon: 'vault' as const,
    color: 'sky',
  },
] as const;
