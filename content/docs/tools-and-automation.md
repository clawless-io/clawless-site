# Tools and Automation

`[Live]`

Tools are how Clawless agents do things in the world instead of just talking about them. This chapter explains what tools are, what tools your agents have by default, how to control which tools each agent is allowed to use, and how to add new tools through MCP servers.

## What is a tool

A tool is a verb. It is one specific capability the agent can use to accomplish part of a task.

Without tools, an agent can only generate text. With tools, an agent can:

- **Read a file** to summarize a document on your computer.
- **Write a file** to save a draft to disk.
- **Search the web** to find current information.
- **Fetch a web page** to read its content.
- **Run a shell command** to execute code, query a database, or run a script.
- **Open a browser** to interact with websites that need clicking and typing (see [browser-automation.md](browser-automation.md)).

When you give an agent a task, the agent decides which tools to use. You see this in the chat: as the agent works, the activity indicator shows which tool is running ("Reading file", "Searching the web", "Calling tool").

## The Tools panel

Open the Tools panel from the navigation rail (the small wrench icon).

You see a categorized list of every tool Clawless has installed. Each tool shows:

- **Name and description.** What it does.
- **Category.** Filesystem, Web, Code, Channels, MCP, etc.
- **Status.** Enabled, disabled, or requires-setup.
- **Required permissions.** What the tool needs to work (filesystem access, network, etc.).

A search bar at the top lets you filter by name or category. You can disable a tool you do not want any agent to use. Disabling is a global switch; for per-agent control, see Per-agent tool scope below.

## The default tool set

Every fresh install of Clawless ships with a sensible default set of tools.

- **Filesystem tools.** Read, Write, Edit, Glob (find files by pattern), Grep (search for text inside files).
- **Web tools.** WebSearch (Brave Search by default), WebFetch (download a single page).
- **Code tools.** Bash (run a shell command).
- **Notebook tools.** NotebookEdit (work with Jupyter notebooks).

This default set covers most everyday tasks. You do not have to configure anything for your agents to start being useful.

## Security profiles

Different people want different levels of caution about what their agents do. Clawless ships with three preset security profiles you can switch between in Settings.

### Strict

Every potentially destructive action prompts you for approval. Reading a file is silent. Writing or editing a file, running a shell command, or making a network request triggers a popup asking "do you want to allow this?"

This is the right setting if you are new to AI agents, or if you are pointing the agent at content you cannot afford to lose. Slow but safe.

### Standard (default)

Reads are silent. Writes, edits, and shell commands prompt for approval the first time per session. Once you allow a particular tool, the agent can use it again in the same session without re-prompting.

This is the right setting for most people. It strikes a balance between trust and friction.

### Permissive

Everything is silent. The agent can read, write, edit, run commands, and make network requests without ever interrupting you.

Use this only when you trust the agent and the task. It is appropriate for power users running specific scripted workflows; it is the wrong default for general use.

You change profiles in Settings, Tools, Security profile.

## Per-tool approval prompts

When a tool needs your approval (under Strict or Standard), a popup appears in the chat with three options:

- **Allow once.** This single tool call, this time. The agent moves on; the next tool call (even the same tool) prompts again.
- **Allow always.** Save the decision. The same tool against the same target (same file, same domain, same shell command pattern) is silent for the rest of the session. The decision does not survive across sessions; closing the app resets to the default.
- **Deny.** The agent cannot run this tool call. It will work around or stop.

The "always" decisions live in memory only, by design. We do not save them to disk because a tool call's safety often depends on context: "edit this file" is fine for the current task, not necessarily for the next one. Starting fresh each session is safer than trying to remember preferences perfectly.

## Per-agent tool scope

Each agent has its own tool scope, which is the set of tools that agent is allowed to use. This is independent of the global Tools panel state.

You can see and change an agent's tool scope by editing the agent (hover, click pencil). The tool-scope label is the chip you see in the rail under the agent's name. The default agents have meaningful scopes:

- **Assistant.** Full default toolset.
- **Writer.** Web tools only. No file writes; the agent drafts in chat instead.
- **Researcher.** Web tools only. No file or shell access at all.
- **Local Helper.** Read-only filesystem access. Best-effort, instructed by the system prompt; not an enforced sandbox.
- **Planner.** Full default toolset.
- **Tutor.** WebFetch only, for pulling examples. No file or shell access.

The "best-effort read-only" caveat is important. The current engine version honors read-only as a system-prompt instruction, not as a hard sandbox. We are working on engine-level enforcement; until that lands, treat read-only as a strong soft guard, not an unbreakable one.

## MCP servers

MCP, short for Model Context Protocol, is the standard for adding new tools to AI agents. An MCP server is a small program that exposes one or more tools through this standard interface.

MCP is an OpenClaw engine capability, which means once a server is configured, your agents can call its tools the same way they call the built-ins. The Clawless desktop UI for adding and managing MCP servers in one place is a post-launch addition. Until that ships, advanced users can configure MCP servers manually. Contact support@clawless.ai for guidance.

Common reasons to add an MCP server:

- **Connect to a service Clawless does not bundle.** Linear, Notion, Google Calendar, GitHub, Slack as a tool (not a channel), Stripe, your own internal API.
- **Add a tool category Clawless does not have.** Image generation, audio transcription, vector search.
- **Build your own tool.** If you can write a small program, you can write an MCP server. Clawless will pick it up.

## Logs and what the agent has done

Every tool call your agent makes is logged. Open the Logs panel from the navigation rail to see a chronological list:

- What tool was called.
- With what arguments.
- What the result was.
- Which agent and which conversation it belonged to.

This is the audit trail. If you ever wonder "why did the agent do that", the logs are the source of truth.

The Logs panel has two views:

- **Activity feed.** A friendly, curated stream of high-signal events.
- **Raw logs.** A terminal-style view with everything, filterable by level (info, warn, error) and subsystem.

## Common questions

**Why is the agent asking permission for every tiny thing?** Your security profile is set to Strict. Switch to Standard in Settings, Tools.

**Why did the agent refuse to write a file?** Either the agent is read-only (its tool scope excludes Write), or you denied the tool earlier in the session, or the path is outside an allowed location. The reply will say which.

**Can I add my own tool?** Yes, through an MCP server. The smallest MCP server is a few dozen lines of code; we have starter templates. See clawless.ai/mcp for the guide.

**Can the agent install software on my computer?** Only via the Bash tool, which is gated by the security profile and per-call approval. The agent cannot install or modify system software without your explicit allow on each command.

**What happens when a tool fails?** The agent sees the error, decides whether to retry, work around it, or stop. The activity indicator shows the failure. If the agent gets stuck in a retry loop, you can press Stop.

**Is there a way to see all the tool calls in a conversation at once?** Yes. Open the Logs panel and filter by session or agent. You see the full call sequence with results.

**What about agents calling agents?** Sub-agent orchestration is on the post-launch roadmap. For now, agents can use tools and skills, not other agents.

**Is the WebSearch tool free?** It uses Brave Search. The free tier covers personal use comfortably. If you need higher volume, Brave's paid tiers are configurable in Settings, API Keys, Brave Search.

**Why are some tool calls slower than others?** Local file reads are nearly instant. Web requests depend on the destination's response time. Shell commands depend on what they do. Browser automation is the slowest (a real browser engine). The activity indicator shows you which tool is running.
