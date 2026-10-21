# Clawless Computer Knowledge Base

This is the user-facing reference for Clawless Computer. Each chapter answers the questions a real person asks while learning the app, in plain language. No file paths, no class names, no engineering jargon. If something below sounds technical, that is a bug; please flag it.

## How this knowledge base is organized

Chapters are grouped by what you can do with Clawless. Each chapter is self-contained, so you can jump straight to the topic you need.

## Status legend

Every chapter is tagged at the top so you know what you can rely on right now.

- `[Live]` shipped, working, in your hands today
- `[Planned]` scoped but not built yet

## Chapter index

### First hour with Clawless

| Chapter | Status | What it covers |
|---|---|---|
| [getting-started.md](getting-started.md) | Live | First launch, onboarding, picking your first agent, sending your first message |
| [chat-and-models.md](chat-and-models.md) | Live | The chat surface, picking a model, conversations and history, streaming and stopping |
| [agents-and-overview.md](agents-and-overview.md) | Live | The six default agents, how to switch between them, creating and editing your own |

### Daily-use features

| Chapter | Status | What it covers |
|---|---|---|
| [memory-system.md](memory-system.md) | Live | What Clawless remembers about you, the four memory tiers, pinning, decay, settings |
| [tools-and-automation.md](tools-and-automation.md) | Live | Tools panel, MCP servers, tool permissions, security profiles |
| [skills-marketplace.md](skills-marketplace.md) | Live | Skills panel, the ClawHub catalog, installing and building skills |
| [channels-and-integrations.md](channels-and-integrations.md) | Live | Connecting Telegram, Discord, Slack, and 19 other messaging channels |
| [automations.md](automations.md) | Live | Cron jobs, scheduled prompts, recurring tasks |
| [settings-reference.md](settings-reference.md) | Live | Every setting, what it does, when to change it |

### Cost and safety

| Chapter | Status | What it covers |
|---|---|---|
| [usage-and-cost.md](usage-and-cost.md) | Live | Usage dashboard, per-model costs, OAuth-zero handling |
| [costguard.md](costguard.md) | Live | Monthly budget caps, warnings, hard-stop behavior |
| [app-lock.md](app-lock.md) | Live | The PIN lock screen, recovery code, locking while agents keep running |

### Working with content

| Chapter | Status | What it covers |
|---|---|---|
| [attachments.md](attachments.md) | Live | Sharing screenshots, PDFs, Word docs, Markdown files with the agent |
| [browser-automation.md](browser-automation.md) | Live | Letting agents click and type on real websites on your behalf |

### Behind the scenes

| Chapter | Status | What it covers |
|---|---|---|
| [whats-under-the-hood.md](whats-under-the-hood.md) | Live | What OpenClaw is, why it matters, where your data goes, what stays local |

## Reading order suggestion

If you have never used Clawless before, read in this order:

1. `getting-started.md`
2. `chat-and-models.md`
3. `agents-and-overview.md`
4. `memory-system.md`
5. `usage-and-cost.md` and `costguard.md`

Everything else is pick-and-choose.

## Contributing to these docs

These chapters live in the Clawless repository, so improvements are welcome as pull requests. A few house rules:

- End-user language only. No file paths, no class names, no architecture details.
- Keep status badges current. When a `[Planned]` feature ships, flip it to `[Live]` and remove any "coming soon" copy in the body.
- No em-dashes in body copy. Use commas, periods, or rephrase. Hyphens in compound words are fine.
