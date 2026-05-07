# CostGuard

`[Shipping with launch]`

> This feature is being built right now and will be in your hands at production launch. Pre-release builds show usage but do not yet enforce a cap.

## What this is

CostGuard is your spending safety net. You set a monthly budget (for example $5, $10, or $25), and Clawless makes sure your AI usage does not go past it. If you get close to your cap, you get a warning. If you hit it, new messages are blocked until you raise the cap or the next month begins.

You bring your own AI provider keys to Clawless, which means you pay your provider directly for usage. Without a cap, a runaway agent loop or an unusually long conversation could rack up real money on your card. CostGuard prevents the surprise.

## Setting your budget

1. Open Settings.
2. Go to the Budget section.
3. Pick a monthly cap from the dropdown: $0 (unlimited), $5, $10, $25, $50, $100, or a custom amount.
4. Pick a warn threshold: 50%, 80% (default), 90%, or off.
5. Pick a hard-stop behavior: Block new messages (default) or Warn and allow.

Save and you are protected.

## How the cap works

Every time you send a message, Clawless checks how much you have spent this period. If you are over the cap and Block is on, the message does not get sent. You see a friendly banner: "Monthly budget reached. Bump your cap in Settings to keep going."

Raising the cap unblocks immediately. Sends do not need to "save up" toward the new cap.

## What counts toward the cap

Cost is tracked by AI provider invoice rules.

- **Pay-as-you-go API keys** (Anthropic, Google AI, Groq, OpenAI standard API). The dollar cost of every message counts.
- **OAuth providers** (signing in with your ChatGPT account for Codex). Cost shows as $0 because billing is handled by your subscription, not by per-message charges. These do not count toward your cap.
- **Local models** (running on your computer with no cloud provider). Cost shows as $0; do not count.

You can mix providers freely; only the paid ones count.

## Warnings

When you cross your warn threshold (80% by default), a notification appears once. The dock row indicator turns yellow as a quiet visual signal that you are getting close.

If you are at 100%:

- With Block on: the next send is rejected with the banner message above. The dock row indicator goes red.
- With Warn-and-allow on: every send shows a "you are over budget" warning, but the message still goes through. Use this if you would rather be informed than stopped.

## How the period resets

Default is rolling 30 days. The day a message is sent, the system looks back 30 days and sums up the cost. If the total is under your cap, the message goes through.

You can change to calendar-month resets in Settings, Budget, if you prefer the budget to refresh on the 1st of each month.

## Per-agent caps

Per-agent caps are on the post-launch list. At launch, the cap is one number that applies to all of your agents combined. We will add per-agent budgets later, especially useful for unattended agents (like a channel listener) where you want a tighter limit.

## How to keep costs down

A few small habits make a big difference:

- **Pick the right model for the task.** A quick question to a $30-per-million-tokens model is the same answer for a fraction of the cost on a smaller model. The Tutor agent is a great everyday default; reserve heavyweight models for tasks that need them.
- **Start a fresh conversation when the topic changes.** Long conversations carry every prior message in the context, and that grows linearly with cost.
- **Use OAuth where you can.** If you have a ChatGPT subscription, signing in with that account makes those calls $0 against your CostGuard budget.
- **Use the Usage dashboard.** It shows where your money is going by model, by session, and by day. Sometimes the answer is "one specific session ate everything", which tells you what to change.

## Common questions

**Does CostGuard talk to my provider's billing?** No. CostGuard reads the cost numbers Clawless tracks for each message. It does not call OpenAI's billing API or anything like it. The two should match, but if they do not, your provider's number is the legal truth; ours is just a tracking signal.

**What happens if my provider's prices change?** Clawless updates pricing whenever providers publish new rates. Old messages keep their original cost; new messages use new rates. Your dashboard reflects whichever rate was in effect at the time of each message.

**Will CostGuard stop a runaway loop in real time?** Mostly. If a single agent run accidentally fires hundreds of tool calls and racks up cost in seconds, the cap will catch it on the next message attempt. Sub-second runaway protection (per-step cost checks) is on the post-launch list.

**Can I see what my next message will cost before sending?** No exact preview, because cost depends on how the model responds. The Usage dashboard gives you a feel for typical costs per agent and model.

**What if I want no cap?** Set the cap to $0 (unlimited) in Settings, Budget. CostGuard becomes purely informational; the warn threshold is also disabled.
