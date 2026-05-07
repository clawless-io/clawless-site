# Agents and Overview

`[Live]`

Agents are the heart of Clawless. Instead of one general AI you have to keep re-instructing, you keep several specialized agents on hand and switch between them based on the task. This chapter introduces the six default agents, explains how to switch between them, and walks through creating and editing your own.

## What is an agent

An agent is a named, persistent persona with its own:

- **System prompt**, the standing instructions that shape how it behaves.
- **Default model**, the AI model it prefers to use.
- **Tool scope**, the set of tools it is allowed to use.
- **Conversation history**, separate from every other agent.
- **Memory**, the things the agent remembers about you (covered in [memory-system.md](memory-system.md)).

Think of an agent the way you would think of a colleague. You go to your editor with a draft email, your researcher with a question about a topic, your planner with a fuzzy goal. Same idea here: pick the right agent for the job and your responses get sharper.

## The agent rail

The vertical strip on the left of the chat surface is the agent rail. It lists every agent you have, with the active one highlighted. Click an agent to switch to it.

You can collapse the rail to icons-only by clicking the small chevron at the top. Click again to expand.

At the bottom of the rail is the New Agent button (sometimes shown as a + icon), which opens the agent creation modal.

## The six default agents

When you first launch Clawless, six agents are created for you. You can use them, customize them, or delete the ones you do not need. They are designed to cover most everyday situations.

### Assistant

Your friendly default. Use this when you do not know which agent fits or when the task is general.

- Tone: plain language, brief by default, expands on request.
- Tools: full default toolset.
- Best for: quick questions, casual chat, anything that does not clearly belong to a specialist.

### Writer

Drafts emails, replies, posts, summaries, announcements, briefs.

- Tone: matches your voice, cuts filler, asks about audience and tone when unclear.
- Tools: WebFetch for looking up references. Cannot write or edit files on disk; pastes content into chat instead.
- Best for: anything you have to send to another human.

### Researcher

Finds and synthesizes information from the web.

- Tone: skeptical, cites sources inline, distinguishes facts from opinion.
- Tools: WebSearch and WebFetch. No file or shell access.
- Best for: "what is the current state of X", "summarize the latest on Y", "find me three sources for Z".

### Local Helper

Reads files in folders you point it at: notes, docs, configs, code.

- Tone: precise, quotes file paths and line numbers.
- Tools: read-only access to your filesystem (best-effort, instructed by its system prompt). It will not write, delete, or modify files. If you ask it to change a file, it will draft the change in chat for you to apply manually.
- Best for: "what does this config do", "find every place we use this term in my notes", "summarize this folder of meeting notes".

A note on the read-only label: Clawless's current engine version does not enforce a hard read-only sandbox; the restriction is in the agent's system prompt and the agent honors it by following its instructions. We treat this as a strong soft guard, not an unbreakable one. We are working on engine-level enforcement; until then, do not point Local Helper at folders you absolutely cannot afford to risk.

### Planner

Breaks goals into steps, builds todo lists, plans your week.

- Tone: numbered steps, surface dependencies, asks about deadlines and constraints.
- Tools: full default toolset.
- Best for: "I have a big project, where do I start", "plan my week", "build me a checklist for X".

### Tutor

Explains concepts patiently. Teaches. Answers "what does this actually mean".

- Tone: analogies before abstractions, checks understanding, names misconceptions kindly.
- Tools: WebFetch for pulling examples. No file or shell access.
- Best for: learning something new, getting unstuck on a topic, "explain this like I am five" type questions.

## How to switch between agents

Click any agent on the rail. The chat column updates to show that agent's last conversation. Your previous agent's conversation is preserved exactly where you left it.

The model picker, the dock controls, and the chat header all update to reflect the new agent. You do not lose anything by switching.

## Conversation history is per-agent

Each agent keeps its own history. If you ask Writer to draft an email and then switch to Researcher, you can switch back to Writer later and pick up the draft right where you left it.

If you want to start a fresh conversation with the agent you are on, click the New button on the dock row (sometimes shown as a + icon). The old conversation moves into history; you start with a blank chat.

## Pointing an agent at a project folder

Each agent has its own workspace folder. By default, every agent works in its own private workspace inside the Clawless app data directory, which is fine for general questions and casual writing.

When you want an agent to work on a specific project (a website you are building, a research paper, your meeting notes), point that agent at your project folder. The workspace pill sits just above the chat input box. Click it, choose **Choose folder…**, and pick the folder you want the agent to use.

Each agent can have its own folder. Main can be working on your website while Writer is drafting from your blog folder and Researcher is reading your notes. Three agents, three projects, simultaneous. Switch agents in the rail and the workspace pill updates to show that agent's folder. The same folder can be assigned to more than one agent if you want two agents collaborating on the same project.

### What Clawless creates in a folder you assign

When you point an agent at a folder, Clawless creates a single hidden subdirectory inside it called `.clawless/`. All of the agent's continuity files live in there: who they are, what they remember, what tools they have access to. The continuity files always live inside `.clawless/`, never at the root of your project.

This is the same idea as the `.git/` folder Git creates in every repository, or the `.vscode/` folder VS Code creates when you open a project. They are agent infrastructure, not your project files. Your project root stays clean. Only the dotfile subdirectory belongs to Clawless. Leave it alone and the agent stays continuous between conversations. Edit a file inside it by hand and the agent picks up your edits next time it reads them.

If your project is a Git repository, Clawless automatically adds `.clawless/` to your `.gitignore` so the agent's continuity files do not show up in your commits. If you already had a `.gitignore`, the entry is appended without disturbing your existing rules. If your folder is not a Git repository, Clawless does not create a `.gitignore` from scratch (there is nothing to commit, so nothing to ignore).

If you previously assigned a folder to an agent in an earlier version of Clawless and ended up with the identity files at the folder root, the next launch will move them into `.clawless/` for you. Your project files are not touched.

## Creating a new agent

Click New Agent at the bottom of the rail. The agent creation modal opens with these fields:

- **Name.** Required. Used in the rail and in references.
- **Emoji.** Pick one. This is the small icon shown in the rail.
- **One-liner.** A short description shown under the name. Helps future-you remember what this agent is for.
- **Tool scope label.** A free-form badge shown in the rail (for example "Default toolset" or "Read-only").
- **Read-only toggle.** Marks the agent as a read-only agent. This is a label and a system-prompt instruction, not an enforced sandbox. See the Local Helper note above.
- **Default model.** Which AI model this agent prefers.
- **System prompt.** The standing instructions that shape behavior. This is where you describe the agent's tone, style, allowed and disallowed actions, and any context it should always have.

Click Save and your new agent appears in the rail.

### Tips for writing a good system prompt

A good system prompt is short and concrete. Aim for half a page or less of plain instruction.

Cover, in order:

1. **Identity.** Who is this agent? What is its job?
2. **Style.** How should it talk? Brief or detailed? Formal or casual? With or without citations?
3. **Allowed and disallowed actions.** What tools should it use? What should it never do?
4. **Examples (optional).** One or two short examples of the kind of output you want.

Avoid telling the agent things that change often (current dates, project status). Put those in your prompt or in memory instead.

Look at the system prompts of the six default agents for shape and length. Your custom agents can be simpler than those if you want.

## Editing an existing agent

Hover over an agent in the rail and click the pencil icon. The edit modal looks just like the create modal, with the agent's current values prefilled.

Save your changes and they take effect immediately. The next message you send uses the new system prompt and model.

You cannot edit the conversation history this way. To wipe an agent's memory, edit it in the Memory panel (see [memory-system.md](memory-system.md)). To wipe its conversation, start a new conversation and delete the old ones from the History sidebar.

## Deleting an agent

In the agent edit modal, click Delete. You will be asked to confirm.

Deleting an agent removes its conversations and its workspace. It does not affect your other agents.

The Main agent (the one shown with the crown icon) cannot be deleted. It is the "always there" agent that any orphaned content gets attached to.

## Making one of the default agents your own

If a default agent is close to what you want but not quite right, just edit it. You do not have to leave it the way it shipped. The seeder will not undo your changes; it only seeds the defaults the very first time.

If you delete a default agent, it stays deleted. The app does not silently re-add it.

## When to create a new agent vs. edit an existing one

Create a new agent when:

- You have a recurring task that is meaningfully different from any default (for example: a daily standup writer, a weekly review coach, a cooking assistant).
- You want to lock in a particular model and tool scope for that task.

Edit an existing agent when:

- The agent is mostly right but the tone is off.
- You want to add a piece of standing context (for example, your company name, your role, a glossary).

A good rule of thumb: if you are about to write the same instruction at the start of every conversation, that instruction belongs in the agent's system prompt instead.

## Common questions

**How many agents can I have?** No hard limit. Practically, more than ten gets unwieldy on the rail. If you find yourself with twenty agents, consider whether some of them should be merged.

**Do agents share memory with each other?** They share the pinned tier of memory by default (the things you explicitly told Clawless to always remember). Conversation-level details stay with the agent that produced them. See [memory-system.md](memory-system.md) for the full rules.

**Can two agents talk to each other?** Multi-agent orchestration is on the roadmap but not in your hands today. For now, you are the orchestrator: you carry context between agents by switching between them.

**What does the crown icon on the Main agent mean?** It marks the Main agent as the engine's default fallback. It is always there, cannot be deleted, and is what the engine falls back to if anything refers to a deleted agent.

**Can I make an agent that only talks in a specific language?** Yes, just put the instruction in the system prompt: "Always reply in French."
