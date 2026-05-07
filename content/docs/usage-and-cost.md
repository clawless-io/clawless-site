# Usage and Cost

`[Live]`

The Usage panel is your view into where your time and money are going across Clawless. This chapter explains how to read the numbers, what counts and what does not, and how to make sense of unexpected costs.

## Why this exists

You bring your own AI provider key. That means you pay your provider for the messages you send, not Clawless. The Usage panel makes that spending visible: which models are running up the bill, which conversations were expensive, how the daily total is trending.

If you also want a hard cap so the spend never goes past a number you set, see [costguard.md](costguard.md).

## Opening the Usage panel

Click the Usage icon on the left navigation rail (the small bar-chart icon, near the bottom). The panel slides open with a summary view.

## What the panel shows

The panel has three sections.

### Summary cards (top)

Three big numbers:

- **Total cost** for the period you have selected.
- **Tokens in.** How much text you have sent (in tokens, the unit AI providers bill by).
- **Tokens out.** How much the agents have sent back to you.

Tokens are roughly four characters each on average. A 200-word reply is about 250 tokens.

### Cost trend chart

A bar chart showing daily cost across the selected period. Useful for spotting "Tuesday was an outlier" patterns.

### Two tabs: Models and Sessions

The Models tab breaks down cost by AI model: how much you spent on Claude Opus, on GPT-5.1, on Gemini, and so on. If one model dominates, this tells you.

The Sessions tab breaks down by conversation. The most expensive sessions float to the top. Click a session to jump to that conversation in the chat.

## Date range

Top right of the panel is a date range picker. Three options:

- **Today** for live monitoring.
- **Last 7 days** for the weekly view.
- **Last 30 days** for the monthly view.

The dashboard updates immediately when you change ranges.

## OAuth and local model handling

Two situations show as $0 cost:

- **OAuth providers.** If you signed in with a ChatGPT account during onboarding, Codex usage shows as $0.00 (OAuth) because billing happens through your subscription, not per-API-call. The "(OAuth)" label tells you why.
- **Local models.** If you run a model locally (for example via Ollama), there is no per-token charge. Cost shows as $0.00 (Local).

In both cases, token counts are still tracked and displayed. You see how much you are using even when you are not paying per token.

## How costs are calculated

For paid providers, every message has a cost based on:

1. The model you used.
2. The number of input tokens (your message plus the prior conversation context).
3. The number of output tokens (the reply).
4. The provider's published per-token rate at the time of the message.

Clawless updates pricing whenever providers publish new rates. The cost on a five-month-old message is whatever it was that day, not what the same message would cost today.

## What runs up the bill

Common reasons for unexpectedly high cost:

- **Long conversations.** Every message you send carries the entire conversation back to the provider. A 50-message conversation is paying for 50 copies of the early messages over time.
- **Heavy models.** Claude Opus, GPT-5.1, and similar are 5 to 30 times more expensive per token than smaller models. If your default model is a heavy one, every chat costs more than it has to.
- **Tool calls with a lot of output.** Web searches, file reads, browser navigations all add their results to the conversation as tokens.
- **Memory.** Pinned memories add to every prompt. The Pinned tier is hard-capped specifically to keep this from growing without limit.

If you want to keep costs down, the biggest levers are: pick a smaller model when you can, start fresh conversations when topics change, and tighten the Pinned memory tier.

## Common questions

**Why does my Usage panel show a different number from my OpenAI dashboard?** The numbers should be very close. Differences usually come from rounding or from the provider counting tokens slightly differently than we do. If they are wildly different, your provider's number is the legal truth; ours is a tracking signal. Please report any large gap as a bug.

**Why is my cost so much higher one day than the others?** Click on the high day in the chart, then look at the Sessions tab. One specific conversation is usually the culprit. From there you can decide whether to keep going or switch to a cheaper model.

**Does Clawless take a cut of my AI spend?** No. Every dollar you spend on AI goes directly to the provider you are using.

**Can I see costs per agent?** Per-agent breakdown is on the post-launch list. Today the breakdown is per-model and per-session. Since each agent has its own preferred model, the model breakdown is a rough proxy.

**What if I want to stop spending entirely?** Sign out of any paid providers in Settings, API Keys. Without keys, no message can be sent. You can also use only OAuth or local models, both of which are $0 in Clawless.

**How do I pay less?** See [costguard.md](costguard.md) for a hard cap. See "What runs up the bill" above for the levers that reduce spend even without a cap.
