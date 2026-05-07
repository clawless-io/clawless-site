# Chat and Models

`[Live]`

The chat surface is where you spend most of your time in Clawless. This chapter covers everything about the conversation: sending messages, picking models, history, sessions, streaming, and stopping.

## The chat surface, top to bottom

When you have an agent selected, the chat column has four parts.

- **The header**, at the very top, shows the agent's avatar, the conversation title, and the current model. You can click the title to rename the conversation.
- **The message area**, in the middle, scrolls through the conversation. Your messages appear on the right; the agent's appear on the left.
- **The input area**, at the bottom, is where you type. Press Enter to send, Shift+Enter for a new line.
- **The dock row**, just below the input, holds quick controls: New conversation, online status, model picker, Skills shortcut, Tools shortcut, Commands shortcut.

## Sending a message

Type into the input box and press Enter. The agent starts thinking immediately.

While it thinks, you see a small status line below your message that describes what is happening: "Thinking", "Reading file", "Calling tool", "Searching the web". This is the activity indicator and it updates in real time.

When the agent starts producing a reply, the reply streams in word by word. You do not have to wait for the full response before starting to read.

## Stopping a response

If the agent is heading in the wrong direction, or just talking too long, press the Stop button (the square icon where Send used to be). The agent stops streaming.

If for any reason the engine takes a few seconds to acknowledge the stop, you will see a small "Stopping..." line. If it still has not stopped after about ten seconds, a red banner appears with a Force Stop button. Use that as a last resort; the model may still be billing tokens server-side until the provider catches up.

## Conversations and history

Every back-and-forth is a single conversation. The agent remembers everything in the current conversation.

You can have several conversations going with the same agent, and several agents going at once. To see all your conversations across every agent in one place, click the small History icon in the chat header. A modal opens showing every past conversation grouped by which agent owns it, with the agent's emoji and name as the group header and a small count next to each group. The History button itself shows a count chip when you have any saved conversations, so you always know at a glance how much history is there.

The modal has a search box at the top. Type any part of a title and the list filters in real time, across every agent at once. If a group has more than ten conversations, the most recent ten show by default and there is a "Show all" link to expand the rest.

Click any conversation to jump straight to it. If it belongs to a different agent than the one you are currently chatting with, Clawless switches to that agent and loads the conversation in the chat surface in one motion. The modal closes after you pick.

To start fresh in your current agent, click the New button on the dock row (sometimes shown as a + icon).

Conversations are saved automatically. There is no Save button. If you close the app and come back, your conversations are still there.

## Renaming a conversation

By default, conversations get an auto-generated title based on what you talked about. To rename, click the title in the chat header and type a new name. Press Enter to save, Escape to cancel.

## Picking a model

The model picker is the dropdown labeled with a chip name (for example "Claude Opus 4.6") just above the input. Click it and you see a curated list of models grouped by provider.

The list shows what we recommend, not the entire provider catalog. The list is shorter on purpose: most providers ship dozens of models, and the differences between many of them are not worth the cognitive load. The default short list is enough.

If you want a model that is not on the short list, you can type its provider-prefixed name into the picker (for example `openai/gpt-5.1-mini`).

### Switching models mid-conversation

You can switch models at any time. The new model picks up the conversation where the previous one left off. There is no "this conversation is locked to one model" rule.

Costs follow the model you are using when you send each message. Switching to a cheaper model partway through is a good way to handle long, low-stakes follow-ups after one heavyweight question.

### What happens to the model picker when you change agents

Each agent has its own preferred model. When you switch agents, the picker updates to that agent's preferred model. To change an agent's preferred model permanently, edit the agent (see [agents-and-overview.md](agents-and-overview.md)).

## Codex (the OpenAI ChatGPT plan path)

If you sign in with your ChatGPT account during onboarding, OpenAI's Codex provider becomes available. It is not a separate model in the dropdown; it is a way to access OpenAI's models without paying per-token, using your ChatGPT subscription.

When you use Codex, the model picker shows an OAuth indicator. Costs for Codex sessions show as $0 (OAuth) on the Usage dashboard, because billing is handled by your ChatGPT plan, not by per-API-call charges on a key.

If you do not have a ChatGPT subscription, ignore Codex. Use a regular API key instead.

## Slash commands

Type `/` at the start of the input to bring up the slash command menu. Slash commands are shortcuts for things like:

- `/new` start a new conversation
- `/model` switch model without leaving the keyboard
- `/clear` clear the screen (does not delete the conversation, just the on-screen rendering)
- `/help` see all available commands
- `/status` show engine status

The full list shows up when you type `/` and you can arrow-key through it.

## Suggested questions

When you start a fresh conversation with no messages yet, you see a small grid of suggested prompts (for example "Build me a simple website", "Plan my week"). These are starter ideas designed to give you a tangible first result. Click one to send it as your message; you can edit it first by holding shift while clicking.

These are not the limit of what you can ask. They are training wheels for the first session.

## Streaming, code blocks, tables, links

The agent's replies render as rich Markdown. That means:

- **Code blocks** get syntax highlighting and a Copy button.
- **Tables** render as real HTML tables, not as text grids.
- **Links** render as clickable links and open in your default browser.
- **Images** referenced by URL render inline.
- **Lists, headings, quotes, bold, italics, strikethrough, task list checkboxes** all work.

If a reply has a very long code block, the chat scrolls vertically and the code block scrolls horizontally inside its own container. The whole conversation does not get pushed off-screen.

## When the agent is wrong, or you want a different answer

You have three options.

1. **Reply telling it what to fix.** This is the normal feedback loop. The agent will try again with your guidance.
2. **Click Regenerate** at the bottom of the agent's last reply. It will redo the response from scratch.
3. **Edit your last message and resend.** Hover over your last message and click Edit. The conversation rewinds to that point and the agent answers the new version. Useful when you realize you asked the wrong question.

## Conversation length, tokens, and cost

Long conversations cost more than short ones, because every message you send includes the entire prior conversation as context. The cost grows roughly linearly with conversation length.

If a conversation gets long enough to slow things down, start a new one. The agent keeps the high-priority memories from the old conversation if your Memory settings allow it (see [memory-system.md](memory-system.md)).

The Usage panel (bottom of the nav rail) shows token counts and costs broken down by provider, model, and session.

## Common questions

**Why is the agent so slow on the first message of a session?** The engine warms up on the first message and the AI provider sometimes has cold-start latency on its end. Subsequent messages are faster.

**Can I run a conversation in the background while I do other things in the app?** Yes. Switch agents or open other panels; the conversation keeps streaming. You will hear (or see) a notification when it finishes if you have notifications enabled.

**What is the difference between a "conversation" and a "session"?** Same thing. The app sometimes shows "session" in technical labels (the Usage panel uses that word) and "conversation" everywhere else.

**Can I export a conversation?** Not yet from a built-in button. You can copy the text and paste it into a doc; we will add a real Export option in a future release.

**Why do some replies start with text that looks like it was edited out?** That is internal book-keeping content from the engine that we filter out before showing it to you. If you ever see raw markers or JSON-looking blocks in a reply, please file a bug; we have a content filter that should be catching it.
