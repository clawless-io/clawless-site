# Settings Reference

`[Live]`

This chapter walks through every Settings category, explains what each setting does, what the defaults are, and when you would change them. Settings is reached from the gear icon on the bottom rail or the keyboard shortcut shown in the menu.

## How Settings is laid out

Settings is a single long page split into categories. A sticky sidebar on the left lists the categories; clicking one jumps the page to that section. As you scroll, the sidebar highlights which section is currently in view (scroll-spy).

Every setting has a label, a short description, and (for non-obvious ones) a "what does this do" hint. We try to make Settings explain itself; if a setting in the app is unclear, that is a documentation bug worth flagging.

## General

App-wide preferences.

- **Theme.** Pick from five built-in themes. Command Deck (the default) is dark with a cyan accent. Alternates: Calm Slate, Solar Flare, Forest Lab, Paper. Theme switches are immediate; no restart needed.
- **Language.** English at launch. Other languages are post-launch.
- **Start at login.** Whether Clawless launches automatically when you sign into your computer. Off by default; turn on if you use scheduled jobs and want to be sure the app is always running.
- **Window behavior.** Minimize to tray vs. close to dock, on supported platforms.

## Models

How models are picked, prioritized, and defaulted.

- **Default model for new agents.** When you create a new agent, this is the model it starts with. Defaulted to whichever provider you set up first during onboarding.
- **Provider priority.** When more than one provider can serve a request, this list orders them. Useful if you have OpenAI and Anthropic both available and prefer one as the default.
- **Auto-detection rules.** Whether Clawless should automatically pick the best available model on launch (based on which API keys are present and which models are usable). On by default; turn off if you want full manual control.
- **Model curation.** The model picker in chat shows a curated short list, not every model the provider offers. The full catalog is several hundred models, most of which are not useful in a chat surface. The curated list is updated as providers ship meaningful new models.

## API Keys

Where you connect AI providers.

- **Provider list.** Every supported provider appears as a row: Anthropic, OpenAI, Google, Groq, Mistral, Cohere, Together, Fireworks, OpenRouter, and others. Each shows whether a key is configured and whether the key is currently working.
- **Add key.** Click a provider, paste the key, click Save. Clawless verifies the key in the background. Green check means it works; a red message means it does not.
- **Get API Key link.** Each provider row has a link that takes you straight to that provider's API key creation page. No hunting through their dashboards.
- **Sign in with ChatGPT.** OpenAI offers a special path: instead of an API key, you sign in with your ChatGPT account. Clawless uses your subscription via OAuth. Your costs show as $0 in the Usage dashboard because billing is handled by your subscription, not by per-API-call charges.
- **Brave Search.** A separate row, because web search is a tool capability rather than a chat provider. Free tier is plenty for personal use.
- **Remove key.** Click the small trash icon on the row. The key is wiped from the keychain and the provider is no longer available until you add a key back.

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
- **Voice availability.** The voice path is partial at launch. Recording works; high-quality transcription works for English. Other languages and voice output (text-to-speech reading replies aloud) are partial; check the in-app indicator for current status.

## Updates

Auto-update behavior.

- **Auto-update toggle.** Whether Clawless checks for and installs updates automatically. On by default. When a new version is available, the app downloads it in the background and asks you to restart at a convenient moment.
- **Current version.** The version you are running.
- **Check for updates.** Manual button. Click to check for updates immediately, useful if you have heard about a release and want it now.
- **Mock mode (advanced).** For testing. Lets you simulate update states (no-update, available, downloading, downloaded, error) without an actual update. Off by default; ignore unless you are debugging.

## Integrations

Where outside systems connect to Clawless.

- **Gateway connection.** The local URL and auth token for the OpenClaw gateway, used by external API consumers (the Clawless API gateway exposes your agents over HTTP). Most users do not need to look at this. Power users wiring their own scripts to Clawless will copy the URL and token from here.
- **Channel config editor.** A JSON editor for channel configuration. See [channels-and-integrations.md](channels-and-integrations.md).
- **ClawHub catalog sync.** A button that refreshes the catalog of community-built skills. Rarely needed; the catalog auto-syncs on a schedule.

### MCP servers

Model Context Protocol servers are an OpenClaw engine capability that lets you connect external tools and data sources to your agents. The desktop UI for adding and managing MCP servers in Clawless is a post-launch addition. Until that ships, advanced users can configure MCP servers manually. Contact support@clawless.ai for guidance.

## Security

The App Lock PIN settings.

- **Set PIN / Change PIN / Disable PIN.** Manage the PIN that gates access to the app's UI when locked. See [app-lock.md](app-lock.md) for the full lock-screen behavior.
- **Lock now.** Manual button to lock the app immediately.
- **Privacy-gate disclosure.** A reminder in this section that App Lock is a privacy gate, not a security vault. For full at-rest protection, use your operating system's disk encryption.
- **Auto-lock on idle.** Coming in a follow-up release. Will offer Off / 5 / 15 / 30 / 60 minute thresholds.

## Browser

Browser automation settings.

- **Enable Browser Automation.** On by default. Toggle off if you do not want agents opening websites. See [browser-automation.md](browser-automation.md).
- **Headed vs. headless.** Whether you see the browser window. Headed is the default; recommended until you trust your agents.
- **Per-domain permissions.** A list of domains your agents have permanent allow for. Add and remove individually.
- **Block list.** Categories of URLs that are always denied (localhost, file://, browser-internal). Read-only at launch; cannot be relaxed.

## Budget (CostGuard)

Monthly spending caps. See [costguard.md](costguard.md).

- **Monthly cap.** Pick from $0 (unlimited), $5, $10, $25, $50, $100, or a custom amount.
- **Warn threshold.** When to notify you that you are approaching the cap. 50%, 80% (default), 90%, or off.
- **Hard-stop behavior.** Block new messages (default) or Warn-and-allow.
- **Period reset.** Rolling 30 days (default) or calendar month.
- **Provider rules.** OAuth (Codex via ChatGPT subscription) and local models always show as $0 and do not count toward the cap. Pay-as-you-go API keys count.

## License

Subscription and license management.

- **Plan and status.** What plan you are on (Monthly, Yearly, Lifetime), whether it is active, and the expiration date.
- **Open customer portal.** Opens our website in your default browser, where you can update payment, change plans, or cancel. We do not handle payments inside the desktop app.
- **Deactivate this machine.** Frees up the seat so you can activate the same license on a different machine. Useful when migrating to a new computer.

See [licensing-and-trial.md](licensing-and-trial.md) for the full licensing picture.

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
- **Privacy policy.** Opens the policy in your browser.
- **Acknowledgements.** Open-source licenses for components Clawless ships with.
- **Reset all settings.** A nuclear button. Confirms before running. Resets every setting in this page back to defaults; does not touch your conversations, memories, or agents.

## Common pitfalls

A few settings that surprise people:

- **Changing the default model after creating agents.** Existing agents keep their per-agent model; only new agents pick up the new default. If you want existing agents to switch, edit each one.
- **Removing an API key.** Any agent currently using that provider will fail on its next message until you add a key back. The provider list in API Keys shows you who is at risk before you click Remove.
- **Disabling auto-update.** Means you will not automatically get pre-launch fixes and security patches. We recommend leaving this on unless you have a specific reason to lock to a known version.
- **Switching themes.** Pure cosmetic; does not affect any functionality. If you change theme and the app looks wrong, restart it; some custom CSS in skills or panels may take a refresh to recolor.

## Common questions

**Where do I change the theme?** General, Theme.

**How do I add another AI provider?** API Keys, click the provider row, paste the key.

**Why is the model picker showing a different default than what I picked?** Each agent has its own preferred model. The picker reflects the active agent's preference, not the global default. Edit the agent to change its preferred model.

**Can I export my settings?** A built-in Export button is on the post-launch list. The settings are stored in the Clawless data folder; advanced users can copy and paste the file directly to migrate to a new machine.

**What if I forget my PIN?** See [app-lock.md](app-lock.md), which explains the recovery-code flow.

**How do I reset everything to factory defaults?** About, Reset all settings. Confirms before running. Resets settings; does not touch your conversations, memories, or agents.

**Where are my logs if I need to send them to support?** About, Logs folder. The button opens the folder in your file manager. Logs are plain text; you can read or send them as needed.

**What is the difference between Settings and the Tools panel?** Settings is for app-wide preferences. The Tools panel (navigation rail, wrench icon) is specifically for managing the tools your agents can use. Some preferences (like the global security profile) live in both places for convenience.

**Why is the Voice section partial?** The voice path is in active development. Recording and English transcription work today; other languages and voice output are coming. The section in Settings reflects the current state.
