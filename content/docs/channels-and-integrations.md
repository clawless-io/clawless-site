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
3. **Direct-message policy.** Pick one of four modes that control who can chat with the bot:
   - **Pairing** (default). Anyone who knows a one-time pairing code can chat. Good middle ground for casual sharing.
   - **Locked.** Only the specific users you list can chat. Most secure. If you pick this, a second field appears for the allowed user IDs (see "How to lock a Telegram bot to just you" below).
   - **Open.** Anyone who finds the bot's username can chat. Use only when you want public access.
   - **DMs off.** Direct messages are blocked. The channel stays connected so the bot can still respond in group conversations.
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

The single most important channel decision is who is allowed to message the bot. Four modes are available, all selectable from the DM Policy dropdown in the wizard:

**Pairing (default).** Anyone who completes a one-time pairing code can chat. To enable a user, you share a small code through a side channel ("here is the code: ABCD-1234"), they message that code to the bot, and the bot recognizes them from then on. Good middle ground when you want a small group of trusted people to use the bot but do not want to look up everyone's user ID by hand.

**Locked.** Only the specific user IDs you list can DM the bot. Everyone else is silently rejected before the agent ever sees the message. This is the most secure option, and it is the right starting point for any personal assistant bot you want to keep just to yourself. The next section walks through it step by step.

**Open.** Anyone who finds the bot's username on the platform can chat. Use this only when you want public access (a community helper, a customer-support bot). If you turn Open on, expect bot-spam attempts.

**DMs off.** Direct messages are blocked completely. The channel stays connected so the bot can still respond in groups. Useful if you set up a bot to live in a Discord server or Telegram group but do not want any private side conversations.

You can change the policy at any time by editing the channel.

## How to lock a Telegram bot to just you (step by step)

The most common setup for a personal assistant: only **you** can chat with the bot, no one else can even reach it. Here is the exact path through the wizard.

**Step 1. Find your Telegram numeric user ID.**

Telegram users have both a `@username` and a numeric user ID. The bot identifies you by the numeric ID, which never changes (your username can). To find yours, do one of:

- Message [@userinfobot](https://t.me/userinfobot) on Telegram. It replies immediately with your numeric ID (a 9 or 10 digit number, for example `123456789`).
- Or, after setting up the bot once in Open mode (or temporarily picking Pairing), send any message to your bot from your phone. Then open Clawless, go to the Logs panel, and look for a line containing your message; the numeric ID is recorded there.

Write the number down. You will paste it into the wizard next.

**Step 2. Open the Channel setup or edit screen.**

If this is a new channel: Channels panel, click the Plus icon, pick Telegram. Paste your bot token from BotFather as usual.

If the channel is already configured: Channels panel, expand the Telegram row, click Edit.

**Step 3. Change the DM Policy dropdown to "Locked".**

Scroll to the DM Policy field. Click the dropdown, pick the option labeled **"Locked (only specific users I list)"**. A short helper line appears below the dropdown explaining the implication.

**Step 4. Type your user ID into "Allowed senders".**

A new text field appears called "Allowed senders". Type your numeric ID into it (no quotes, just the digits, for example `123456789`). To allow more than one person, separate IDs with commas (`123456789, 987654321`).

If you leave the field empty, an amber warning appears reminding you that an empty list locks everyone out (including yourself). The Save button stays disabled until you add at least one ID. This is intentional, to prevent you from accidentally locking yourself out of your own bot.

**Step 5. Save.**

Click Review, confirm the summary screen shows your new policy and the user IDs you entered, then click Save Changes. The channel restarts automatically within a second, and the new policy is live.

**Step 6. Verify.**

Send any message to your bot from your own Telegram account. You should get the normal AI reply. Then, if you have a second Telegram account or know someone who does, have them send a message to the same bot. They will get no reply. Their message is rejected at the engine level, before the agent ever sees it. You can also confirm this by looking at the Logs panel: rejected messages show a line like `Blocked unauthorized telegram sender 999999999 (dmPolicy=allowlist)`.

To add or remove allowed users later, edit the channel again and update the comma-separated list. The same Lock-and-allowlist flow works for Discord DMs, WhatsApp, Signal, and the other DM-capable channels; each platform uses its own native numeric ID format.

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
- Setting up channel-specific quirks (Slack's user-vs-bot scopes, custom retry policies, advanced streaming options, etc.). Note that the common case of restricting DMs to specific users is now fully handled in the wizard itself, so you no longer need to touch the Config Editor for that.

A red warning sits at the top of the editor: changes here can break the channel. The editor validates JSON before saving, but it cannot validate that what you wrote is what the platform expects. Test after every change.

## Channels and agents

Every channel inbound is routed to one of your agents to answer. By default, every DM-capable channel (Telegram, Discord, WhatsApp, Signal, iMessage, Matrix, LINE, Zalo, Microsoft Teams, Google Chat, Mattermost, Synology Chat, Feishu/Lark, Nextcloud Talk, Nostr, WebChat) routes to a dedicated agent called **Channels**. That agent ships with Clawless out of the box, alongside Assistant, Writer, Researcher, Local Helper, Planner, and Tutor in your agent rail.

Why a separate Channels agent rather than dropping conversations into the agent you happen to be using on the desktop:

- **One predictable home for everything from your phone.** When you message your Telegram bot from outside, the conversation always shows up under Channels in the desktop agent rail. No guessing which agent it landed on.
- **Phone-aware behavior.** The Channels agent is briefed to keep replies short by default (you're often on a small screen), name the platform context when relevant ("Yes Jay, from Telegram..."), and defer heavy tools until you're back at the desktop.
- **Clean separation from your task chats.** Your desktop Researcher session stays focused on the research you're doing there. Your Telegram chitchat doesn't bleed into it.

You can see the routing for yourself in the agent rail: open the Channels agent and you'll find one session per channel-and-peer combination, auto-titled with the first real message you (or whoever messaged your bot) sent. Session labels strip the channel envelope automatically, so a session shows up as "Are you there Yes/No" instead of "[Telegram Jay Sidd id:6491763775 +27m Wed 2026-05-13 13:57 CDT] Are you there Yes/No".

Want a specific channel to use a different agent? The per-channel routing override is on the post-launch list. For now, the Channels agent is the right home for every connected channel.

## Memory and channels

By default, an agent reachable through a channel can use the same memories you have built up by chatting with it on the desktop. That is usually what you want.

If you would prefer to isolate channel conversations from desktop ones, see Settings, Memory, Sharing rules. You can configure which memory tiers are available in channel responses.

## Cost and channels

Every reply an agent sends through a channel is a real AI call against your API key. If you turn on a public bot in a busy server, the cost can rise quickly.

Two safeguards we recommend:

- **CostGuard cap.** Set a monthly budget so a runaway public bot cannot drain your card (see [costguard.md](costguard.md)).
- **Locked or Pairing DM policy.** Limit who can DM. Stops bot-spam attacks. For a personal bot, Locked is the right default. For a small trusted group, Pairing.

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

**Where do my Telegram (or other channel) conversations show up on the desktop?** Under the **Channels** agent in the agent rail. The Channels agent ships out of the box for exactly this purpose: every direct-message channel you connect routes here automatically. Open the Channels agent and you'll find one session per channel-and-peer combination, auto-titled with the first real message in that thread.

**Can I see what the bot has been replying?** Yes. Open the **Channels** agent in the desktop app and look at its conversation history. Each conversation is a separate session, labeled with the opening message text. The session also notes which platform it came in from (Telegram, Discord, WhatsApp, and so on).

**Why is the agent in my agent rail called "Channels"?** The Channels agent is the default home for all your phone-side and channel-side conversations. It ships pre-configured with a system prompt that keeps replies short (you're often on a small screen) and names the platform when relevant. You can edit its system prompt the same way you edit any other agent if you want different behavior.

**What is the Telegram allowlist?** The Telegram allowlist is the comma-separated list of user IDs you put into the "Allowed senders" field when DM Policy is set to "Locked". Only those user IDs can send direct messages to your Telegram bot; everyone else is rejected before the AI ever sees the message. Also called the whitelist, the Locked list, or the allowed-users list. The full step-by-step is in the "How to lock a Telegram bot to just you" section above.

**How do I restrict my Telegram bot so only I can use it?** Edit the channel, change the DM Policy dropdown to "Locked (only specific users I list)", paste your numeric Telegram user ID into the "Allowed senders" field that appears, save. Step-by-step instructions are in the "How to lock a Telegram bot to just you" section above. The same flow works for Discord DMs, WhatsApp, and Signal.

**How do I find my Telegram user ID?** Message [@userinfobot](https://t.me/userinfobot) on Telegram. It replies immediately with your numeric ID. Or, after sending any message to your own bot, look in the Logs panel for the inbound message; your numeric ID is recorded there.

**Can I allow more than one person?** Yes. In the Allowed senders field, separate user IDs with commas: `123456789, 987654321, 111222333`. You can list as many as you need.

**What happens if I leave the Allowed senders field empty when DM Policy is Locked?** The wizard will not let you save. An amber warning appears reminding you that an empty list locks everyone out, including yourself, and the Save button stays disabled until you add at least one ID.

**Can I block a specific user without locking down the whole bot?** A friendlier block-list UI is on the post-launch list. For now, the cleanest way is to switch to Locked mode and add everyone you DO want to allow; everyone else is automatically blocked.

**What is the difference between a channel and a webhook?** A channel is a managed integration with a specific platform (Telegram, Slack, etc.) that handles auth, message format, rate limits, and replies. A webhook is a generic HTTP endpoint where any system can post a message; you handle auth and format on your side. Channels are easier; webhooks are more flexible.

**Why is one platform marked "verified" and others are not?** Telegram is the platform we have tested most thoroughly end-to-end as of this writing. The other 21 platforms are wired and pass smoke tests, but full verification is in progress as part of the pre-launch checklist. We will update the marking on each platform as it clears verification.

**Can a channel reply to itself or to other bots?** No, by default. Most platforms treat bot-to-bot messages with caution to prevent loops. If you have a specific need (for example, two bots in a workflow), there is a per-channel toggle in the Config Editor; use it carefully.
