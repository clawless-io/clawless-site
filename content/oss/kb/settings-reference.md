# Settings Reference

`[Live]`

This chapter walks through every Settings category, explains what each setting does, what the defaults are, and when you would change them. Settings is reached from the gear icon on the bottom rail or the keyboard shortcut shown in the menu.

## How Settings is laid out

Settings is a single long page split into categories. A sticky sidebar on the left lists the categories; clicking one jumps the page to that section. As you scroll, the sidebar highlights which section is currently in view (scroll-spy).

Every setting has a label, a short description, and (for non-obvious ones) a "what does this do" hint. We try to make Settings explain itself; if a setting in the app is unclear, that is a documentation bug worth flagging.

## General

App-wide preferences.

- **Theme.** Pick from five built-in themes. Command Deck (the default) is dark with a cyan accent. Alternates: Calm Slate, Solar Flare, Forest Lab, Paper. Theme switches are immediate; no restart needed.
- **Language.** English only for now. Other languages are planned.
- **Start at login.** Found under Settings then System. Turn this on and Clawless opens automatically when you sign in to your computer, so your agents and scheduled tasks are ready without launching it by hand. Off by default. The toggle reflects your operating system's own login-items setting, so it always shows what your computer will actually do, even if you change it from System Settings. Available on macOS today; Windows and Linux are coming in a later update. On macOS you may be asked to approve Clawless in System Settings then General then Login Items the first time.
- **Window behavior.** Minimize to tray vs. close to dock, on supported platforms.

## Models

How models are picked, prioritized, and defaulted.

- **Default model for new agents.** When you create a new agent, this is the model it starts with. Defaulted to whichever provider you set up first during onboarding.
- **Provider priority.** When more than one provider can serve a request, this list orders them. Useful if you have OpenAI and Anthropic both available and prefer one as the default.
- **Auto-detection rules.** Whether Clawless should automatically pick the best available model on launch (based on which API keys are present and which models are usable). On by default; turn off if you want full manual control.
- **Model curation.** The model picker in chat shows a curated short list, not every model the provider offers. The full catalog is several hundred models, most of which are not useful in a chat surface. The curated list is updated as providers ship meaningful new models.

## API Keys

Where you connect AI providers.

- **Provider list.** Every supported provider appears as a row in one of the collapsible categories (Recommended, Cloud Providers, Gateways, Self-hosted, etc.). Each shows whether a key is configured and whether the key is currently working. Recommended is open by default; the rest are one click away.
- **Cloud Providers** is the long list: Anthropic, OpenAI, Google, Groq, Mistral, DeepSeek, xAI, Together, Cerebras, Hugging Face, Cohere, Fireworks, Perplexity, Moonshot (Kimi), Qwen (Alibaba), NVIDIA NIM, Microsoft Azure AI Foundry, GitHub Copilot, and others. If you already have an account with the provider, you can use it here. Clawless does not lock you into a specific model family.
- **Gateways** covers aggregation layers: OpenRouter, LiteLLM, Kilo Gateway, OpenCode Zen, and Vercel AI Gateway. Useful if you want to route many model providers through a single key.
- **Add key.** Click a provider, paste the key, click Save. Clawless verifies the key in the background. Green check means it works; a red message means it does not.
- **Get API Key link.** Each provider row has a link that takes you straight to that provider's API key creation page. No hunting through their dashboards.
- **Sign in with ChatGPT.** OpenAI offers a special path: instead of an API key, you sign in with your ChatGPT account. Clawless uses your subscription via OAuth. Your costs show as $0 in the Usage dashboard because billing is handled by your subscription, not by per-API-call charges.
- **Connection health.** Each provider row shows a small health indicator so you know its state before you try to use it, not after a message fails. For sign-in (OAuth) providers like ChatGPT it tells you whether the connection is healthy, expiring soon (within a day, with a countdown), expired and needing reconnection, or not connected yet. Providers connected with a plain API key show as connected with no countdown, because API keys do not expire on a schedule. A provider that has never been connected reads as "Not connected" rather than as an error.
- **Brave Search.** A separate row, because web search is a tool capability rather than a chat provider. Free tier is plenty for personal use.
- **Remove key.** Click the small trash icon on the row. The key is removed from your data folder and the provider is no longer available until you add a key back.

## Memory

Controls for what Clawless remembers and how it uses memory.

- **Auto-extraction on/off.** Whether the classifier scans conversations for things worth remembering. On by default. If off, Clawless still uses memories you have manually added but does not add new ones automatically.
- **Mid-conversation re-injection interval.** How often Insights are re-fed into a long conversation, in messages. Default is 10. Lower means the agent stays grounded but you pay more tokens; higher saves cost at the risk of context drift.
- **Capacity-pruning notification.** Whether to show a notification when General-tier memories are pruned to keep the database tidy. Off by default; turn on if you want visibility into what gets dropped.
- **Decay rules.** How long an unused memory takes to move from Insights to General to Decayed. Defaults are reasonable; advanced users can shorten or lengthen them.
- **Sharing rules.** Per-tier control over which memories travel with messages sent through channels. Pinned memories travel by default; you can restrict.

See [memory-system.md](memory-system.md) for the full picture of how memory works.

## Voice

Speech input and output.

- **Speech-to-text provider.** Which provider transcribes your voice to text. OpenAI Whisper is the default; alternatives include local Whisper models if you have them installed.
- **Speech-to-text language.** What language to expect when you speak. Default English; pick a different language if you primarily speak another.
- **Microphone device.** Which mic Clawless listens to. Defaults to your system default.
- **Voice availability.** The voice path is partial for now. Recording works; high-quality transcription works for English. Other languages and voice output (text-to-speech reading replies aloud) are partial; check the in-app indicator for current status.

## Updates

Auto-update behavior.

- **Check for updates automatically.** When on, Clawless checks for a new version when it starts and every six hours. Off by default. Clawless never downloads or installs an update on its own: when a new version is available, you choose when to download it and when to restart.
- **Current version.** The version you are running.
- **Check for updates.** Manual button. Click to check for updates immediately, useful if you have heard about a release and want it now.
- **Receive beta updates.** Opt-in toggle. When on, Clawless follows our pre-release feed instead of the stable one, so you get release candidates as soon as they are cut. Pre-release builds may have rough edges and ship more often than stable ones. Off by default; useful if you want to help test before public release. Toggling it off returns you to the stable feed at the next check.
- **Mock mode (advanced).** For testing. Lets you simulate update states (no-update, available, downloading, downloaded, error) without an actual update. Off by default; ignore unless you are debugging.

## Integrations

Where outside systems connect to Clawless.

- **Gateway connection.** The local URL and auth token for the OpenClaw gateway, used by external API consumers (the Clawless API gateway exposes your agents over HTTP). Most users do not need to look at this. Power users wiring their own scripts to Clawless will copy the URL and token from here.
- **Channel config editor.** A JSON editor for channel configuration. See [channels-and-integrations.md](channels-and-integrations.md).
- **ClawHub catalog sync.** A button that refreshes the catalog of community-built skills. Rarely needed; the catalog auto-syncs on a schedule.

### MCP servers

Model Context Protocol servers are an OpenClaw engine capability that lets you connect external tools and data sources to your agents. The desktop UI for adding and managing MCP servers in Clawless is a planned addition. Until that ships, advanced users can configure MCP servers manually. Contact support@clawless.ai for guidance.

## Security

The App Lock PIN settings.

- **Set PIN / Change PIN / Disable PIN.** Manage the PIN that gates access to the app's UI when locked. See [app-lock.md](app-lock.md) for the full lock-screen behavior.
- **Lock now.** Manual button to lock the app immediately.
- **Privacy-gate disclosure.** A reminder in this section that App Lock is a privacy gate, not a security vault. For full at-rest protection, use your operating system's disk encryption.
- **Auto-lock on idle.** Coming in a follow-up release. Will offer Off / 5 / 15 / 30 / 60 minute thresholds.

### Ask before Clawless runs an action

Off by default. When you turn this on, Clawless pauses and asks for your approval before an agent runs a tool that changes something (running a command, writing a file, fetching a web page) or before a skill uses a sensitive permission. It is an extra checkpoint for shared or sensitive machines.

- **What you see.** A prompt with a short description of what the agent wants to do, a risk label, and an optional "Technical details" section you can expand. You choose:
  - **Allow once.** Permit just this action.
  - **Always allow.** Permit this kind of action from now on without asking again. Shown only when that choice is offered for the request.
  - **Deny.** Refuse the action.
- **If you do not respond.** The prompt counts down and automatically denies the action after about four minutes, so nothing runs without your say-so while you are away.
- **You can always change your mind.** Turn the setting off any time and Clawless returns to its normal behavior. Turning it off restores whatever approval settings you had before you turned it on.
- **Why it is off by default.** With it on, Clawless asks before every tool action, which can be a lot of prompts while you are getting started. Turn it on when you want the extra checkpoint.

## Browser

Browser automation settings.

- **Enable Browser Automation.** On by default. Toggle off if you do not want agents opening websites. See [browser-automation.md](browser-automation.md).
- **Headed vs. headless.** Whether you see the browser window. Headed is the default; recommended until you trust your agents.
- **Per-domain permissions.** A list of domains your agents have permanent allow for. Add and remove individually.
- **Block list.** Categories of URLs that are always denied (localhost, file://, browser-internal). Read-only; cannot be relaxed.

## Budget (CostGuard)

Monthly spending caps. See [costguard.md](costguard.md).

- **Monthly cap.** Pick from $0 (unlimited), $5, $10, $25, $50, $100, or a custom amount.
- **Warn threshold.** When to notify you that you are approaching the cap. 50%, 80% (default), 90%, or off.
- **Hard-stop behavior.** Block new messages (default) or Warn-and-allow.
- **Period reset.** Rolling 30 days (default) or calendar month.
- **Provider rules.** OAuth (Codex via ChatGPT subscription) and local models always show as $0 and do not count toward the cap. Pay-as-you-go API keys count.

## Notifications (the bell, top right of the window)

Just to the left of the system controls is a bell icon. It is the Notification Center: a single place that collects things that happened while you were looking somewhere else, so nothing important slips past you.

- **The badge.** A small number on the bell tells you how many unread notifications are waiting. It clears the moment you open the panel.
- **Opening it.** Click the bell to open a panel listing recent notifications, newest first. Click anywhere outside the panel to close it.
- **What shows up here.**
  - **Approvals.** When the app is set to ask before running an action (Settings, Security), and an agent wants to do something that needs your go-ahead, a notification appears here. The actual approve or deny choice happens in the approval dialog that pops up; the bell is a record that the request came in, and it updates to show once a request has been answered.
  - **Engine updates.** When a newer version of the underlying engine becomes available, a notification lets you know.
- **Clearing items.** Hover an item and click the small x to dismiss it, or use Clear all to empty the list. Dismissing a notification does not undo anything; it just tidies the list.
- **What it is not.** The bell never takes an action on your behalf. It only tells you something needs your attention and points you to where you can act on it.

## System controls (top right of the window)

Outside the Settings page itself, but worth flagging here because they are often where people look for "how do I close this thing properly."

The top right corner of every Clawless window has a small cluster of system controls. From left to right:

- **Padlock icon (Lock).** Locks the app behind your PIN. Everything in the background keeps running. Greyed out until you set a PIN; click the greyed icon and Clawless takes you to Settings, Security so you can set one. See [app-lock.md](app-lock.md) for the full chapter.
- **Power icon (menu with Restart and Shut down).**
  - **Restart.** Stops everything and starts it back up fresh. Use when something feels stuck. About thirty seconds cold start.
  - **Shut down.** Stops everything for real. Chat engine, browser tools, scheduled tasks. Use when you are done for the day or about to close the laptop. About thirty seconds the next time you open the app, while the engine starts back up fresh.

The standard window close button (red traffic-light dot on macOS, X on Windows / Linux) is a different action: it closes the window but leaves the underlying engine warm so the next launch is fast (about five seconds). That is the right choice for a short break. Shut down is the right choice when you really want everything off.

## About

Bottom section, mostly informational.

- **Version, build, OS.** What you are running.
- **Logs folder.** A button that opens the Clawless data folder so you can inspect logs (useful for support tickets).
- **License.** Clawless is open source under the AGPL-3.0 license. The OpenClaw engine is open source under the MIT license.
- **Source code.** Opens the Clawless source code on GitHub, where you can read it, report a problem, or contribute.
- **Documentation.** Opens this user guide on GitHub.
- **Reset all settings.** A nuclear button. Confirms before running. Resets every setting in this page back to defaults; does not touch your conversations, memories, or agents.

## Common pitfalls

A few settings that surprise people:

- **Changing the default model after creating agents.** Existing agents keep their per-agent model; only new agents pick up the new default. If you want existing agents to switch, edit each one.
- **Removing an API key.** Any agent currently using that provider will fail on its next message until you add a key back. The provider list in API Keys shows you who is at risk before you click Remove.
- **Leaving automatic update checks off.** Means you will not hear about fixes and security patches unless you check for updates yourself. Turning the checks on is the easiest way to stay current.
- **Switching themes.** Pure cosmetic; does not affect any functionality. If you change theme and the app looks wrong, restart it; some custom CSS in skills or panels may take a refresh to recolor.

## Common questions

**Where do I change the theme?** General, Theme.

**How do I add another AI provider?** API Keys, click the provider row, paste the key.

**Why is the model picker showing a different default than what I picked?** Each agent has its own preferred model. The picker reflects the active agent's preference, not the global default. Edit the agent to change its preferred model.

**Can I export my settings?** A built-in Export button is not built yet. The settings are stored in the Clawless data folder; advanced users can copy and paste the file directly to migrate to a new machine.

**What if I forget my PIN?** See [app-lock.md](app-lock.md), which explains the recovery-code flow.

**How do I reset everything to factory defaults?** About, Reset all settings. Confirms before running. Resets settings; does not touch your conversations, memories, or agents.

**Where are my logs if I need to send them to support?** About, Logs folder. The button opens the folder in your file manager. Logs are plain text; you can read or send them as needed.

**What is the difference between Settings and the Tools panel?** Settings is for app-wide preferences. The Tools panel (navigation rail, wrench icon) is specifically for managing the tools your agents can use. Some preferences (like the global security profile) live in both places for convenience.

**Why is the Voice section partial?** The voice path is in active development. Recording and English transcription work today; other languages and voice output are coming. The section in Settings reflects the current state.
