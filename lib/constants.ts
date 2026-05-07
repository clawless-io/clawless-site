/**
 * Site content, inlined for phase 1.
 * No external CMS, no API fetch. Edit this file to update the site,
 * push to GitHub, Cloudflare Pages rebuilds.
 */

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Download', href: '/download' },
  { label: 'About', href: '/about' },
] as const;

/**
 * The seven feature groups rendered on /features. Categories are locked
 * by the founder brief and each maps to a `[Live]` chapter in the
 * clawless-v1 knowledge base. Sub-bullets are kept honest (no model
 * counts that change, no enumeration of the default agent lineup
 * because B67 may rework it).
 */
export const FEATURE_GROUPS = [
  {
    eyebrow: 'Group 01',
    title: 'Chat with any AI model',
    lead: 'The chat surface is fast, streamable, and works the same with every provider you connect. Switch models mid-conversation. Drop in a slash command. Read replies as rich Markdown with code blocks, tables, and inline images.',
    bullets: [
      'Major providers out of the box: OpenAI, Anthropic, Google, Groq, plus 800+ models through OpenRouter.',
      'Switch models mid-conversation. The new model picks up where the previous one left off.',
      'Slash commands for new conversations, model switching, engine status, and more.',
      'Conversation history grouped by agent, searchable across every agent at once.',
      'Streaming replies with code-block syntax highlighting, real tables, and inline links.',
    ],
  },
  {
    eyebrow: 'Group 02',
    title: 'Specialized agents you can build',
    lead: 'Instead of one general AI you keep re-instructing, Clawless gives you several specialized agents and a builder for your own. Each agent has its own system prompt, default model, tool scope, conversation history, and memory.',
    bullets: [
      'A default lineup of agents is ready to use the moment you launch the app.',
      'Build a custom agent in a small form: name, system prompt, model, tool scope.',
      'Each agent keeps its own conversations and switches without losing context.',
      'Per-agent tool scopes so an agent only uses the tools you trust it with.',
    ],
  },
  {
    eyebrow: 'Group 03',
    title: 'Memory that learns the way you work',
    lead: 'Clawless captures the things you tell it once, sorts them by importance, and feeds the most useful ones back into future conversations. You stay in control: you can see the whole list, edit anything, pin things you want pinned, and delete anything you do not want kept.',
    bullets: [
      'Tiered memory (pinned, insights, general, decayed) so important things stay close and stale things fade.',
      'Auto-extracted from your conversations, plus you can ask explicitly or add manually.',
      'Memories live on your computer in your Clawless folder. Nothing uploaded to a Clawless server.',
      'Cross-agent recall: switching agents mid-task carries a brief context handoff so the new agent catches up.',
    ],
  },
  {
    eyebrow: 'Group 04',
    title: 'Tools your agents can use to do real work',
    lead: 'Tools are how agents do things in the world instead of just talking about them. Read files, write files, search the web, run shell commands, call MCP servers. Clawless ships a sensible default set and lets you add your own.',
    bullets: [
      'Default tools for filesystem, web, and shell out of the box, no setup.',
      'Three security profiles (Strict, Standard, Permissive) so you choose how much the agent can do without asking.',
      'Per-tool approval prompts under Strict and Standard: allow once, allow always for the session, or deny.',
      'Add new tools by connecting an MCP server. Per-agent tool scope so each agent only sees what you assigned.',
    ],
  },
  {
    eyebrow: 'Group 05',
    title: 'Agents that drive a real browser',
    lead: 'Browser Automation is how agents move beyond reading the web to using it. The agent can open a page, click through a flow, fill a form, and read what it finds. The browser ships with Clawless, runs on your computer, and asks before visiting any new site for the first time.',
    bullets: [
      'Bundled Chromium engine, no separate download. Headed by default so you see the window do its work, with a headless toggle for runs you want to keep silent.',
      'First-time per-hostname prompt before navigating to any new site in a session, with three buttons: Allow once, Always allow, Deny. Approved sites live in Settings under Browser with a Remove button to revoke at any time.',
      'Hard refusal at the navigation layer for local addresses, file URLs, and browser-internal URLs. Not a configurable setting; it is a security floor.',
      "No saved logins, cookies, or extensions carry over from your everyday browser. The agent's browser starts fresh in every conversation. Sites that require login or solve CAPTCHA need user help.",
    ],
  },
  {
    eyebrow: 'Group 06',
    title: 'Skills that turn your agents into specialists',
    lead: 'Skills are recipes that tell an agent how to do a specific job well. Bundle instructions, the right tools, and a trigger into a reusable unit. Install from ClawHub, or build your own in the Skill Builder.',
    bullets: [
      'ClawHub catalog of community-built skills. Browse by category, install in one click.',
      'Build custom skills in a small form: name, description, trigger, instructions, tool selection.',
      'Skills are local: stored on your computer alongside agents and conversations, not uploaded.',
      'Updates are opt-in. You always know what your agents are running.',
    ],
  },
  {
    eyebrow: 'Group 07',
    title: 'Reach your agents from anywhere',
    lead: 'Connect an agent to the messaging platforms you already use, so you can talk to it from your phone, your team Slack, or wherever you are. Setup is a wizard, not a config file.',
    bullets: [
      '20+ platforms supported including Telegram, Discord, Slack, Microsoft Teams, Google Chat, Mattermost, Matrix, Email, SMS, Webhooks, GitHub, Linear.',
      'Setup wizard guides you through tokens with deep links to the right page on each provider.',
      'Pick the agent that handles each channel; one agent per channel at launch.',
      'Direct-message policy lets you choose whether anyone can DM the bot or only paired users.',
    ],
  },
  {
    eyebrow: 'Group 08',
    title: 'Schedule recurring prompts',
    lead: 'Automations are scheduled chat messages. Tell Clawless what to ask and when, and it sends the prompt on schedule. Send the result to chat, to a connected channel, or to a file.',
    bullets: [
      'Friendly presets (hourly, weekday morning, weekly Friday, and more) plus raw cron for power users.',
      'Pick which agent handles each job, so different schedules can use different specialists.',
      'Send the result in-chat, to a connected channel like Slack or Telegram, or to a file.',
      'Pause and resume non-destructively. Job history shows every previous fire.',
    ],
  },
] as const;

// Three-card row for the home page. Categories are locked; refine wording here.
export const FEATURES = [
  {
    title: 'Chat with any AI model, no terminal needed',
    description:
      'Claude, GPT, Gemini, plus 800+ models through OpenRouter. Switch with one click. Bring your own provider keys; conversations stay on your computer.',
    icon: 'openrouter' as const,
    color: 'indigo',
  },
  {
    title: 'Agents that do real work for you',
    description:
      'A default lineup of specialized agents ships with the app, ready the moment you launch. Build your own with a system prompt and a toolset, and each agent remembers the way you like to work.',
    icon: 'swarm' as const,
    color: 'electricCyan',
  },
  {
    title: 'Memory and skills that grow with you',
    description:
      'Tiered memory captures the things you tell Clawless once, so you do not have to repeat yourself. Skills are reusable instructions you install or build, the way you would install an app.',
    icon: 'skills' as const,
    color: 'amber',
  },
] as const;

// Three columns for the "Who it is for" section on the home page.
export const WHO_ITS_FOR = [
  {
    title: 'If you bounced off the command line',
    description:
      'You heard about OpenClaw, you wanted to use it, and the YAML stopped you. Clawless Computer is the desktop on-ramp. Same engine, no terminal.',
  },
  {
    title: 'If you want AI to do real work',
    description:
      'Agents, automations, and tools, all clickable. Connect a Telegram bot through a wizard. Schedule a recurring prompt without writing cron. Install a skill the way you would install an app.',
  },
  {
    title: 'If you already use OpenClaw',
    description:
      'A real GUI for the times you do not want to type. 100% compatible with the engine you already know, on Mac or Ubuntu.',
  },
] as const;
