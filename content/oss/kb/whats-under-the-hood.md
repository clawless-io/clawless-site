# What is Under the Hood

`[Live]`

You do not need to know any of this to use Clawless Computer. But if you are the kind of person who likes to understand what is actually happening when you click Send, this chapter is for you. It is also where we are honest about where your data goes and what you are trusting to whom.

## The big picture

Clawless is a desktop app. It runs on your computer. When you send a message, here is what happens:

1. Your message goes from the chat input to the Clawless app.
2. The app passes it to a piece of software called OpenClaw, which is the engine that knows how to talk to AI providers.
3. OpenClaw sends the message to the AI provider you have selected (OpenAI, Anthropic, Google, etc.) over the internet.
4. The provider's model thinks, generates a reply, and streams it back.
5. OpenClaw passes the reply to Clawless.
6. Clawless renders it in the chat.

Your data does not pass through any Clawless servers. There is no Clawless cloud holding your conversations. The path is: your computer, the AI provider, your computer.

## What OpenClaw is

OpenClaw is an open-source project that does the heavy lifting of multi-provider AI. It knows how to connect to a dozen different AI providers, manage tools, run skills, route messages, and a lot more. Anyone can read its source code; anyone can fork it.

Clawless is the polished desktop experience built on top of OpenClaw. We focus on the parts users see and feel: the interface, the agents, the panels, the onboarding, the way every setting is named, how errors are explained, the day-to-day behavior. Engineering-wise, we use OpenClaw the way many products use a strong open-source foundation.

We bundle OpenClaw with the Clawless installer, so you do not have to install or maintain it separately. You just install Clawless, and it works.

## What is open source and what is not

Both are.

- **OpenClaw is open source** under the MIT license. Its source code is on GitHub. You can read every line.
- **Clawless is open source** under the GNU Affero General Public License v3.0 (AGPL-3.0). Its source code is on GitHub too. You can read every line, build it yourself, and propose changes.

Because both are open, you do not have to take our word for anything in this chapter. The code that decides where your data goes is public.

## Where your data lives

Two places matter.

### Your computer

Most of your data stays here, in the Clawless data folder on your computer:

- Your API keys. These are stored in a local file in your data folder, protected by your user account's file permissions (the OpenClaw engine reads them from there). For stronger at-rest protection, turn on your operating system's disk encryption (FileVault on Mac, BitLocker on Windows). If you delete the data folder, the keys go with it.
- Your conversations.
- Your memories.
- Your agent definitions.
- Your settings.

### The AI provider

When you send a message, the message and any context (memories, prior turns, attachments) go to the provider's servers. They process it on their side and stream back a reply.

What the provider does with your message after that depends on their terms. Most providers default to "do not train on API customer data". You should still read their terms, especially if your messages contain sensitive information.

### Other connections the app makes

None of these carry your conversations, memories, or API keys:

- **The ClawHub skill catalog** (clawhub.ai). The list of community skills is downloaded automatically the first time you use the Skills catalog and refreshed every few hours while the app is open. If you search the catalog, your search words are sent so ClawHub can find matching skills.
- **Update checks** (GitHub). When you check for updates, or if you turn on automatic checks, Clawless asks GitHub whether a newer release exists. That request includes your current Clawless version and platform.
- **VirusTotal** (optional, off by default). If you add your own VirusTotal key in Settings, Security, skills you install are checked there before installing.
- **Messaging channels and tools you set up.** If you connect Telegram or another channel, or your agent uses web search or the browser, those services are contacted on your behalf.

Clawless itself adds no telemetry, analytics, or crash reporting.

## What we are responsible for

We are responsible for:

- The desktop app behaving correctly.
- Your local data being protected to the standards your operating system supports.
- The bundled engine version being safe to run.

We are not responsible for:

- What an AI provider does with your messages on their servers.
- The policies of an AI provider you have given your key to.
- Tools and skills you install that we did not write, like third-party MCP servers.

## What you are trusting to whom

When you use Clawless:

- You trust **us** to ship a desktop app that does what it claims and protects your local data.
- You trust **the AI provider** with the contents of your messages.
- You trust **OpenClaw** to be a faithful engine. Since it is open source, you can audit it; if you do not, you are trusting the maintainers and our review of their code.
- You trust **any tool or skill you install** with whatever permissions it asks for.

This is roughly the same trust model as any software that uses a third-party AI API. The short version: pick providers you trust with your data, and be cautious about what tools you let an agent run.

## Who is behind Clawless

Clawless is an open source project stewarded by RBJ Global LLC. Anyone can contribute on GitHub. Our website is clawless.ai.

## Common questions

**Are my conversations sent to your servers?** No. Your conversations go directly between your computer and the AI provider you have chosen.

**If Clawless went out of business tomorrow, would my data still be there?** Yes. Your conversations, memories, and settings are on your computer. The app would continue to work for as long as your local install runs and the AI providers you use stay online. There is no license server and no account, so there is nothing to lock you out.

**Can I run Clawless completely offline using local models?** With a local model, you can chat without any cloud provider. The app itself launches and runs offline.

**Why bundle the engine instead of letting me install OpenClaw separately?** Two reasons. First, most users do not want to manage a separate install. Second, we test specific OpenClaw versions against the desktop app before shipping; bundling is how we keep the version pairing reliable. Advanced users who want to run their own gateway can do that, but it is not the default path.

**Is OpenClaw really "the engine" or just a label?** It is real. It is a multi-channel AI gateway with extensible messaging integrations. It does the work of talking to providers, running tools, managing sessions. The Clawless desktop app would not exist without it.

**Where can I check these claims?** In the source code. Clawless is open source, so anyone can verify where data goes. The onboarding Transparency step and Settings, About summarize it. The short version is: your data does not pass through us, and you control your local data.
