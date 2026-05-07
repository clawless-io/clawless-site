# Memory System

`[Live]`

Clawless remembers things about you so your agents do not have to be reminded every conversation. This chapter explains what gets stored, how the four tiers of memory work, how to pin or unpin a memory, and how to control what Clawless keeps.

## Why memory matters

A useful assistant remembers context. Your name, what you do for work, which projects you are juggling, that you prefer concise answers, that your daughter is allergic to peanuts. Without memory, every conversation starts from scratch and you re-explain yourself constantly.

Clawless captures these signals automatically as you talk, sorts them by how important they seem, and feeds the most useful ones back into future conversations. You stay in control: you can see the whole list, edit anything, pin the things you never want forgotten, and delete anything you do not want kept.

## The four memory tiers

Clawless sorts memories into four tiers, from most important to least.

### Pinned

Memories you have explicitly told Clawless to always remember. These are the facts that should follow you across every conversation, every agent.

Examples:

- "My name is Jay."
- "I run a software company called Clawless Computer."
- "I prefer answers under 200 words unless I ask for more."

Pinned memories have a hard size budget (about 2,200 characters total). When you try to pin more than fits, Clawless asks you to consolidate or remove existing pins. The size limit exists because pinned content goes into every prompt; too much would slow conversations down and waste tokens.

### Insights

The high-confidence things Clawless inferred from your conversations. These are not as load-bearing as pinned facts, but they are still useful enough to surface routinely.

Examples:

- "User is preparing for a v5 launch."
- "User dislikes em-dashes in writing."
- "User asked Tutor for help understanding embeddings."

Insights are auto-promoted from your conversations. You can review and pin the ones that matter most to bump them to the Pinned tier.

### General

Everything else Clawless has noticed but is not sure is important. These get included in conversations only when they look relevant to what you are currently asking about.

### Decayed

Memories that have not been touched in a long time. They still exist but Clawless does not surface them unless they look very relevant. This tier is the path to "forgetting" without actually deleting.

Memories age into Decayed automatically. The Memory panel shows the last-seen date for each entry.

## The Memory panel

Open Memory from the left navigation rail. You see a searchable list of every memory Clawless has, grouped by tier.

For each memory you can:

- **Pin or unpin.** Move a memory into or out of the Pinned tier.
- **Edit.** Rewrite the text. Useful when you spot a mistake or want to clarify.
- **Delete.** Remove it permanently.
- **See where it came from.** Each memory carries a small badge showing which conversation it was extracted from.

The search box at the top filters all tiers by keyword.

## How memories get into the system

Three pathways:

1. **Automatic extraction.** As you converse, Clawless's classifier scans each turn for things worth remembering: names, preferences, ongoing projects, decisions, important dates. The classifier runs server-side on the AI provider you have chosen, so its quality depends on the model.
2. **Asking explicitly.** Tell any agent "remember that I prefer X" and the agent will surface it as a memory candidate. You confirm before it is saved.
3. **Manual entry.** In the Memory panel, click Add Memory to type something in directly.

## How memories get used

Pinned memories are included in every conversation. Insights and General memories are included when they look relevant to the current message.

Insights get re-injected periodically inside long conversations (about every 10 messages). This keeps the agent grounded in your context even on a very long thread, without paying the cost of repeating everything every turn.

## Memory and agents

By default, all of your agents share the same memory. That means: if you tell Writer your name, Researcher knows it too.

If you would rather isolate an agent (say, you have a "Work Agent" and a "Personal Agent" you want kept separate), see the Agent Settings section in [settings-reference.md](settings-reference.md).

## Cross-agent recall

When you switch agents mid-task, the new agent gets a small briefing of "what was happening just now in the other agent's conversation". This is automatic and brief. It is the difference between switching apps and switching colleagues: the new colleague has not been in the room, but you give them a one-line summary so they catch up.

## Privacy and memory

Memories live on your computer in the Clawless data folder. They are not uploaded to any Clawless server.

When a message goes to your AI provider, the relevant memories travel with it as part of the prompt. So your provider does see them. If you do not want a particular fact ever leaving your computer, do not save it as a memory.

## Settings you control

Open Settings, Memory section, and you can adjust:

- **Auto-extraction on/off.** If off, the classifier stops looking for things to remember. You can still add memories manually.
- **Mid-conversation re-injection interval.** How often Insights are re-fed into a long conversation. Default is every 10 messages.
- **Capacity-pruning notification.** Whether to notify you when General-tier memories are pruned to keep the database tidy.
- **Decay rules.** How long before an unused memory moves to the Decayed tier.

## Common questions

**Does memory cost extra?** Memory increases the size of each prompt, which costs a few extra tokens per message. The Pinned tier has a hard cap so the cost stays bounded. Insights and General memories are only injected when relevant, so they cost less on average.

**Can I export my memories?** Not from a built-in button yet. Memory entries are stored in the Clawless data folder; advanced users can read them directly. We will add a real Export option.

**What if Clawless remembers something wrong?** Open the Memory panel, find the entry, and edit or delete it. Wrong memories propagate, so it is worth fixing.

**Will starting a new conversation wipe my memories?** No. Memories survive across conversations and agents. They only go away if you delete them or they decay over time.

**Can I have one agent forget while another remembers?** Per-agent memory isolation is on the roadmap. Today, all agents on a single Clawless install share the same memory pool.

**What is the difference between memory and conversation history?** Conversation history is the literal back-and-forth of a single chat. Memory is the distilled facts pulled out of those chats over time. History is bulky and tied to a single conversation; memory is compact and travels with you.
