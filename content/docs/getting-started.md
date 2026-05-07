# Getting Started with Clawless

`[Live]`

Welcome to Clawless. This chapter walks you through your first launch, from the moment you open the app to sending your first message and switching to the right agent for your task.

## What is Clawless

Clawless is a desktop AI app. You bring your own AI provider keys (OpenAI, Anthropic, Google, Groq, and others), and Clawless gives you a clean, fast, private place to chat, run agents, plug in tools, and connect messaging channels. Everything runs on your computer. Your conversations are not relayed through our servers.

If you have used ChatGPT or Claude.ai, the chat surface will feel familiar. The difference is that Clawless is local-first, multi-provider, and built around the idea that you should have several specialized agents on hand instead of one general one.

## What you will need before you start

1. A computer running macOS, Windows, or Linux.
2. At least one API key from a supported provider. Free tiers work; you do not need a paid plan.
3. About ten minutes for the first-run setup.

If you do not have an API key yet, do not worry. The onboarding wizard explains how to get one and links you to the right place to create it.

## Your first launch

The first time you open Clawless, the onboarding wizard appears. There are four steps.

### Step 1: Welcome

A short hello and a brief tour of what is coming. Click Get Started to move on.

### Step 2: Transparency and Acknowledgement

This is the page that explains how Clawless works under the hood, in plain language. It covers:

- **What powers Clawless.** Clawless uses OpenClaw, an open-source AI engine, to talk to the AI providers and run tools. Clawless is the polished desktop experience on top of that engine.
- **Where your data goes.** When you send a message, it goes from your computer directly to the AI provider you picked (for example OpenAI). It does not pass through our servers. Your API keys are stored on your computer, not ours.
- **What is open source and what is not.** OpenClaw, the engine, is open source. Clawless, the desktop app, is closed source.
- **What we are responsible for.** We make sure the desktop app behaves correctly and protects your information. The AI provider you pick (OpenAI, Anthropic, etc.) is responsible for what their models do with your messages.

You read it, you click Acknowledge, and you move on.

### Step 3: API Keys

This is where you tell Clawless how to reach an AI provider. You will see a list of supported providers, each with a Get API Key link that takes you straight to the right page on that provider's website.

You only need one provider to get started. You can add more later from Settings.

The most common first choice is one of:

- **Anthropic** for Claude models. Strong all-rounder, especially good for writing and reasoning.
- **OpenAI** for GPT and Codex models. Strong for code and general chat. If you have a ChatGPT Plus or Pro subscription, you can sign in with your ChatGPT account instead of pasting an API key.
- **Google** for Gemini models. Free tier is generous and fast.
- **Groq** for fast inference on open models. Often free, very quick.

Paste the key into the matching field and click Save. Clawless verifies the key in the background. A green check means the key works.

If a key fails, the most common cause is a typo or trailing whitespace. Copy it again and try once more.

### Step 4: Ready

A confirmation that you are set up. Click Done and you land on the main app.

## What you see when you land

The main Clawless window has three areas.

- **The left rail** is your Agents list. By default you have six agents already created for you (more on those in [agents-and-overview.md](agents-and-overview.md)).
- **The middle column** is the chat with your currently selected agent.
- **The far left strip** is the navigation rail with icons for the side panels: Tools, Skills, Memory, Channels, Cron, Logs, Usage, Settings.

You can collapse the agent rail by clicking the small chevron at the top to give chat more room.

## Sending your first message

Pick the agent on the rail that fits what you want to do. If you are not sure, start with Assistant; it is the friendly default for anything.

Type into the message box at the bottom and press Enter. Press Shift+Enter for a new line.

While the agent is thinking, a small status indicator appears below your message. You can press Stop at any time to interrupt the response.

When the agent replies, the response streams in word by word. Code blocks have a Copy button on the top right. Tables and lists render naturally.

## Switching to a different agent

Click any agent on the left rail. Each agent keeps its own conversation history, so switching back and forth does not lose your place.

If you want to start a fresh conversation with the agent you are on, click the New button at the bottom of the rail (sometimes shown as a + icon) or use the keyboard shortcut shown in the menu.

## Picking the right model

The default model is set during onboarding (whichever provider's key you saved first). You can switch models at any time from the dropdown above the message box.

Each model has its own strengths and costs. The dropdown shows a short list of recommended models grouped by provider. For most people, sticking with the default works.

If you want to change the default model permanently, open Settings (gear icon on the bottom rail) and look in the Models section.

## Locking, shutting down, and restarting

Clawless is built around the idea of a personal AI computer that lives quietly in the background. A small cluster of system controls sits in the top right corner of the window, just like the system controls on a real computer.

- **Lock** (padlock icon). Locks the app behind your PIN. Everything keeps running in the background. This is the right choice when you step away from your computer for a few minutes and want a privacy gate. Until you set a PIN the icon shows in a faded state; clicking it takes you to Settings, Security to set one. Read the [App Lock chapter](app-lock.md) for the full picture.
- **Shut down** (power icon menu). Stops everything. The chat engine, the browser tools, any scheduled tasks. Goodnight. Use this when you are done for the day or before traveling. Your next launch takes about thirty seconds longer because the engine has to start fresh.
- **Restart** (power icon menu). Stops everything and starts it back up fresh. Useful when something feels stuck. Same thirty-second cold start.

There is also the standard window close button at the top left of the window (the red dot on macOS). That is a quick close: the window goes away but the underlying engine stays warm so the next launch is fast (about five seconds). Use it when you are closing for a short break and will reopen soon.

Quick guide to which to pick:

- Stepping away for a few minutes? Use **Lock**.
- Closing for an hour or two and you want to come back fast? Use the **window close button**.
- Done for the day, traveling, or troubleshooting? Use **Shut down**.
- Something feels stuck? Use **Restart**.

## Where to go next

- [chat-and-models.md](chat-and-models.md) for more on conversations, history, model switching, and stopping.
- [agents-and-overview.md](agents-and-overview.md) to meet the six default agents and learn when to use which.
- [memory-system.md](memory-system.md) once you want Clawless to remember things across sessions.

## Common first-day questions

**Do I have to enter a credit card to try Clawless?** No. Clawless itself has a free trial period; the AI providers you connect have their own free tiers. You only pay your AI provider for usage, and you control that by switching off any provider you do not want to use.

**Is my data sent to Clawless servers?** No. Your messages go from your computer to the AI provider you picked. Your API keys live on your computer.

**What happens if I lose internet?** The chat needs internet because the AI provider lives on the internet. The app itself still launches fine; you just cannot send messages until you are back online.

**Can I use Clawless without any API keys?** Not for chat. You can browse the panels and Settings, but sending a message requires a working provider key.

**Can I share Clawless across multiple machines?** A single license covers a single user across their machines (subject to the license terms shown in Settings, License).

## Where to find each thing

A quick map for the first time, organized around questions a new user might ask.

**How do I start a new conversation?** Bottom of the dock row at the bottom of the chat area. Look for the New button (sometimes shown as a + icon).

**Where is the model picker?** Top of the chat area, just above the message box. Shows the current model name as a chip. Click to choose a different model for the current conversation.

**Where do I switch agents?** Left side of the chat area, the vertical list with avatars. Each agent has its own personality and conversation history. Click any agent to switch.

**Where is the agent's workspace folder?** Just above the message box, the small pill with a folder icon. Click it to point the agent at a project folder on your computer (or to choose a different recent folder).

**Where are my settings?** Bottom-left corner of the navigation rail, the gear icon. Settings is organized into eight categories (General, Models, Memory, Security, and so on); the sidebar within the page lets you jump between them.

**Where do I find Skills, Tools, Memory, Channels?** Each has its own panel on the navigation rail (left side of the app). Click the icon to open the panel.

**Where do I create a new agent?** New Agent button at the bottom of the agents rail (sometimes shown as a + icon). Opens the create-agent form.

**Where is my chat history?** Top-right of the chat area, the chat-bubble icon. Opens the History modal showing every conversation across every agent.

**How do I get help inside the app?** The Help button on the right side of the toolbar above the message box. Click it to turn on Help mode. While Help mode is on, the message box becomes a question box for the docs, the input border turns cyan, and a banner reminds you the question goes to our knowledge base, not your agent. Type a question (for example, "how do I add a model?") and press Enter. You get an answer with citations from the public docs. Click the button again, press Esc, or click the X on the banner to come back to your normal chat. Your task chat is held in memory while Help mode is on, so toggling back drops you exactly where you were.

**How do I close or minimize the app?** Top-left, the standard macOS traffic-light buttons (red, yellow, green). Standard macOS app behavior.
