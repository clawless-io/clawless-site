# Channels and Integrations

`[Live]`

Channels are how you let other people (or just yourself, on your phone) chat with your Clawless agents without opening the desktop app. This chapter covers what channels are for, how to connect one, what platforms are supported, and how to manage who can talk to your bot.

## What channels are for

A channel turns one of your agents into a chat bot on a messaging platform.

A few example shapes:

- **A research bot in your team Slack.** Anyone on the team can mention the bot, and your Researcher agent answers with cited sources.
- **A personal assistant in your Telegram.** You text it from your phone while you are out, and your Assistant agent responds with the same context it has on your laptop.
- **A customer-support bot.** You wire your Writer agent to Discord or to your support inbox, and it triages questions when you are away.
- **A weekly briefing on a private channel.** Combined with [automations.md](automations.md), a scheduled prompt sends the briefing on a schedule.

The unifying idea: instead of having to open the desktop app to talk to an agent, you reach the agent from wherever you already are.

## The Channels panel

Open the Channels panel from the navigation rail (the small chat-bubble icon).

You see a grid of platform tiles, each showing:

- **Platform name and icon.**
- **Connection status.** A small dot: green (connected and listening), yellow (configured but not running), gray (not connected), red (configured and erroring).
- **Add or Edit button.** Add opens the setup wizard for a new connection; Edit opens the existing config for changes.

A status bar at the top shows the overall channel health and the count of currently active channels.

## The Channel Setup Wizard

Click Add on any platform tile. A multi-step wizard walks you through:

1. **Platform-specific token or credentials.** Each platform asks for what it needs: Telegram a bot token, Discord a bot token plus a server pick, Slack an app token, etc. The wizard explains where to get each token, with deep links to the right page on the provider's site.
2. **Which agent will reply.** Pick from your list of agents. Each channel binds to exactly one agent at launch.
3. **Direct-message policy.** Choose Open (anyone can DM the bot) or Pairing-required (DMs are blocked unless you explicitly pair the user). Defaults to Pairing-required because anyone-can-DM is a spam vector for public bots.
4. **Confirm and connect.** A test message goes through to verify the connection. If it succeeds, the tile flips to green.

If a step fails (wrong token, server permissions, network issue), the wizard explains what went wrong and what to fix. You do not get cryptic error codes.

## Currently supported platforms

22 platforms ship in the launch set. Telegram is the most thoroughly tested; the others are wired and pass smoke tests, with full pre-launch verification in progress.

**Mainstream messaging:**

- Telegram (verified end-to-end)
- Discord
- Slack
- Microsoft Teams
- Google Chat
- WhatsApp Business

**Asia-Pacific platforms:**

- Feishu
- Lark
- Line
- KakaoTalk
- Viber

**Open-source and team platforms:**

- Mattermost
- Rocket.Chat
- Zulip
- IRC
- Matrix

**Generic and developer platforms:**

- Webhooks (generic HTTP receive)
- Email (IMAP/SMTP)
- SMS via Twilio
- Voice via Twilio
- GitHub (issues and PR comments)
- Linear (issue comments)

Each platform has its own Setup Wizard step explaining what credential you need and where to find it.

## Who can talk to your agent

The single most important channel decision is who is allowed to message the bot.

**Open** means anyone with the bot's handle can send it a direct message and the agent will respond. This is appropriate for:

- A public bot you want anyone to use (a customer-support bot, a community helper).
- Internal channels where everyone in the workspace is trusted.

**Pairing-required (default)** means DMs from unknown users are silently dropped. To enable a user, you pair them: send them a small code through a side channel ("here is the code: ABCD-1234"), they message that code to the bot, and the bot recognizes them from then on. Appropriate for:

- A personal assistant bot you want only you and a few people to reach.
- Bots in semi-public servers where you do not want randoms spamming.

You can change the policy at any time by editing the channel.

## Editing, disabling, removing a channel

Each channel row has three actions:

- **Edit.** Reopen the setup wizard for that channel. Change the token, swap which agent answers, change the direct-message policy.
- **Disable.** Stop the channel from receiving and sending. The connection is preserved; you can re-enable later. Useful for vacations and debugging.
- **Remove.** Permanently delete the channel. The token and config are wiped. Re-adding the same platform later requires going through the wizard again.

## The Config Editor (advanced)

For power users, every channel's config is a JSON file you can edit directly. Open Settings, Integrations, scroll to Channel Config Editor.

This is the right place for:

- Custom message formatting that the wizard does not expose.
- Webhook URLs and signing secrets.
- Tweaking rate limits or retry policies.
- Setting up channel-specific quirks (Telegram's allowFrom array, Slack's user-vs-bot scopes, etc.).

A red warning sits at the top of the editor: changes here can break the channel. The editor validates JSON before saving, but it cannot validate that what you wrote is what the platform expects. Test after every change.

## Channels and agents

Every channel is bound to exactly one agent at launch. If you want one agent to answer in three different platforms, you create three channels, all pointed at the same agent. Each one runs independently, so a slow Discord response does not block the Telegram channel.

A useful pattern: have a dedicated agent per channel, even if they share most behavior. Same default model, same memory, but a different system prompt that mentions "you are responding in Telegram" or "you are responding to a public Discord". The agent can subtly tune its voice for the platform.

## Memory and channels

By default, an agent reachable through a channel can use the same memories you have built up by chatting with it on the desktop. That is usually what you want.

If you would prefer to isolate channel conversations from desktop ones, see Settings, Memory, Sharing rules. You can configure which memory tiers are available in channel responses.

## Cost and channels

Every reply an agent sends through a channel is a real AI call against your API key. If you turn on a public bot in a busy server, the cost can rise quickly.

Two safeguards we recommend:

- **CostGuard cap.** Set a monthly budget so a runaway public bot cannot drain your card (see [costguard.md](costguard.md)).
- **Pairing-required policy.** Limit who can DM. Stops bot-spam attacks.

If your bot is in a high-traffic public server, also consider using a smaller model for that channel's agent. The cost difference between a heavyweight and lightweight model is significant in the long run.

## Channel-specific notes

Each platform has its own quirks. Common ones:

- **Telegram.** Bot tokens come from BotFather. Bots cannot read group messages by default unless you turn off privacy mode in BotFather. Channels with high traffic may need to be configured for webhook delivery instead of long polling for reliability.
- **Discord.** The bot needs to be invited to your server with the right permissions. Some channels (slash commands) require additional setup.
- **Slack.** Slack apps require both a workspace install and (often) admin approval. The Setup Wizard walks you through both.
- **Webhooks (generic).** This is the universal escape hatch. If a platform we do not have a native integration for can post to a URL when a message arrives, you can wire it up through Webhooks.

## Common questions

**Can one agent answer messages in three different platforms at the same time?** Yes. Create one channel per platform, all pointed at the same agent. Each channel runs independently.

**What happens to messages that arrive while my computer is asleep?** It depends on the platform. Telegram queues messages and delivers them when your bot reconnects. Some other platforms may drop messages that arrive during downtime. The Channels panel surfaces this in each platform's connection notes.

**Can I make a paid customer-support bot?** Yes. Combine a channel for the bot with a CostGuard budget and a security profile that fits the level of access you want. For higher-volume use, the API Gateway is a separate path that lets external apps reach Clawless agents over HTTP; that is a different shape from a channel-bot.

**How do I stop the agent from leaking my pinned memories into a channel response?** Settings, Memory, Sharing rules. You can configure exactly which memory tiers are available in channel responses. Pinned memories are global by default; you can lock them to desktop-only if needed.

**Can two people pair with the same bot?** Yes. A pairing-required channel keeps a list of paired users. You can pair any number of people; each one is independent.

**Can I see what the bot has been replying?** Yes. Open the agent in the desktop app and look at its conversation history. Channel conversations show up there alongside your own desktop conversations, with a small platform icon to show which channel they came from.

**Can I block a specific user from talking to my open-policy bot?** Yes. Edit the channel and add the user's ID to the block list. The block-list editor is in the Config Editor for now; a friendlier UI is on the post-launch list.

**What is the difference between a channel and a webhook?** A channel is a managed integration with a specific platform (Telegram, Slack, etc.) that handles auth, message format, rate limits, and replies. A webhook is a generic HTTP endpoint where any system can post a message; you handle auth and format on your side. Channels are easier; webhooks are more flexible.

**Why is one platform marked "verified" and others are not?** Telegram is the platform we have tested most thoroughly end-to-end as of this writing. The other 21 platforms are wired and pass smoke tests, but full verification is in progress as part of the pre-launch checklist. We will update the marking on each platform as it clears verification.

**Can a channel reply to itself or to other bots?** No, by default. Most platforms treat bot-to-bot messages with caution to prevent loops. If you have a specific need (for example, two bots in a workflow), there is a per-channel toggle in the Config Editor; use it carefully.
