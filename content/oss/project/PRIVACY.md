# Privacy

Clawless Computer is a desktop app that runs on your computer. This page lists, in plain language, what stays on your machine and every network connection the app makes. Because Clawless is open source, you can check each of these claims in the code.

## What stays on your computer

Your conversations, memories, agents, skills, settings, and API keys are stored in the Clawless data folder on your computer. API keys are kept in a local file in that folder, protected by your user account's file permissions. For stronger protection at rest, turn on your operating system's disk encryption (FileVault on Mac, BitLocker on Windows).

RBJ Global LLC does not run any server that receives your conversations, memories, or keys. There is no Clawless account.

## Network connections

**Your AI provider.** When you send a message, the message and its context (memories, earlier turns in the conversation, attachments) go to the AI provider you chose, such as Anthropic, OpenAI, or Google, using your own API key. What they do with it is governed by their terms.

**ClawHub skill catalog (clawhub.ai).** The list of community skills is downloaded automatically the first time you use the Skills catalog, and refreshed every few hours while the app is open. These are plain download requests. If you search the catalog, your search words are sent so ClawHub can find matching skills. Nothing else about you is sent.

**Update checks (GitHub).** When you check for updates, or if you turn on automatic checks, Clawless asks this project's GitHub Releases page whether a newer version exists. The request includes your current Clawless version and platform.

**VirusTotal (optional, off by default).** If you add your own VirusTotal API key in Settings, Security, skills you install are checked with VirusTotal first.

**Things you connect.** If you connect a messaging channel such as Telegram, or your agent uses web search or the browser, those services are contacted on your behalf. Connecting some channels installs the matching OpenClaw plugin from the public npm registry.

**Reporting a problem.** The Report button opens a draft email in your own email client. Nothing is sent unless you send that email yourself.

## Telemetry

Clawless adds no telemetry, analytics, or crash reporting. The bundled OpenClaw engine includes no analytics or crash-reporting service either. Its optional OpenTelemetry diagnostics exporter is a separate plugin that is not installed by default and only sends data to a server you configure yourself.

## The OpenClaw engine

Clawless is built on OpenClaw, a separate open source project (MIT license) that Clawless bundles. The connections above include the ones the engine makes in a default Clawless setup. If you change the engine's configuration or install additional engine plugins, those may make other connections.

## Questions

Email support@clawless.ai, or open an issue on GitHub. To report a security problem privately, see [SECURITY.md](SECURITY.md).

Copyright © 2026 RBJ Global LLC.
