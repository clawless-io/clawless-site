# What is Under the Hood

`[Live]`

You do not need to know any of this to use Clawless. But if you are the kind of person who likes to understand what is actually happening when you click Send, this chapter is for you. It is also where we are honest about where your data goes and what you are trusting to whom.

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

- **OpenClaw is open source.** Its source code is on GitHub. You can read every line.
- **Clawless is closed source.** The desktop app is a commercial product. The user interface, the polish, the brand, the bundled experience are ours.

Why we made that choice: the engine benefits from being open (lots of contributors, fast iteration, transparent behavior). The product benefits from being a tight, supported, paid experience (we can fund continuous improvement, customer support, polish). Both can coexist.

## Where your data lives

Three places matter.

### Your computer

Most of your data stays here:

- Your API keys, encrypted using your operating system's secure storage.
- Your conversations.
- Your memories.
- Your agent definitions.
- Your settings.

### The AI provider

When you send a message, the message and any context (memories, prior turns, attachments) go to the provider's servers. They process it on their side and stream back a reply.

What the provider does with your message after that depends on their terms. Most providers default to "do not train on API customer data". You should still read their terms, especially if your messages contain sensitive information.

### The license server

For license validation only. We keep a small piece of state about your license (active, expired, trial) on a server we run. No conversation data, no memories, no message contents ever go there.

## What we are responsible for

We are responsible for:

- The desktop app behaving correctly.
- Your local data being protected to the standards your operating system supports.
- The license system working.
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

Clawless is built by a small team. Our founder is Jay Siddiqi. Our website is clawless.ai.

There is a sister project, clawless.org, planned post-launch as a free AI literacy site. Different mission, different audience, same goal of demystifying AI.

## Common questions

**Are my conversations sent to your servers?** No. Your conversations go directly between your computer and the AI provider you have chosen.

**If Clawless went out of business tomorrow, would my data still be there?** Yes. Your conversations, memories, and settings are on your computer. The app would continue to work for as long as your local install runs and the AI providers you use stay online. The license check has a grace period, so a brief server outage will not lock you out.

**Can I run Clawless completely offline using local models?** With a local model, you can chat without any cloud provider. The app itself launches and runs offline. License validation does occasional online checks but has offline grace.

**Why bundle the engine instead of letting me install OpenClaw separately?** Two reasons. First, most users do not want to manage a separate install. Second, we test specific OpenClaw versions against the desktop app before shipping; bundling is how we keep the version pairing reliable. Advanced users who want to run their own gateway can do that, but it is not the default path.

**Is OpenClaw really "the engine" or just a label?** It is real. It is a multi-channel AI gateway with extensible messaging integrations. It does the work of talking to providers, running tools, managing sessions. The Clawless desktop app would not exist without it.

**Do you have a privacy policy?** Yes. It is shown in the onboarding (Transparency step) and is also accessible from Settings, About. The short version is: your data does not pass through us; you control your local data; we hold the minimum license state needed to run the business.
