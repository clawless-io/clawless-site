# Skills Marketplace

`[Live]`

Skills are the way Clawless agents go from "good at chatting" to "good at specific jobs you do over and over." This chapter explains what a skill is, how it differs from a tool, how to install one from the ClawHub catalog, and how to build your own.

## What is a skill

A skill is a small, named recipe that tells an agent how to do a specific job well. Each skill bundles three things: a clear set of instructions, the right tools to do the job, and a trigger so the agent knows when to use it.

A useful way to think about it: tools are verbs (read, write, search, click). Skills are jobs (summarize a meeting transcript, draft a weekly review, check if a domain is taken, plan a product launch). When you give your agent a skill, you are giving it a colleague who already knows how that job should be done.

The classic agent-without-skills experience is "explain the same workflow every conversation." Skills are how you stop doing that.

## How skills differ from tools and from agents

These three concepts are easy to confuse at first.

- **A tool is a verb.** It does one specific thing in the world: read a file, search the web, run a command. Tools are low-level. The agent picks them as it works.
- **A skill is a job.** It combines instructions and the right tools for a recurring task. Skills are higher-level. They bundle a whole approach into something the agent can invoke as a unit.
- **An agent is a person.** It has a personality, a default model, and a set of tools and skills available to it. Agents use skills.

So: agents have skills, skills have tools.

## The Skills panel

Open the Skills panel from the navigation rail (the small lightbulb icon).

You see three lists:

- **Installed.** Skills already available to your agents. Each row shows the skill's name, description, and the agents that have it enabled.
- **Available updates.** When the catalog has a newer version of a skill you have installed.
- **Marketplace.** The ClawHub catalog of community-built skills you can install.

A search bar at the top filters across all three.

## Using a skill in chat

Two ways:

1. **The agent picks automatically.** When you ask something that matches an installed skill's trigger, the agent runs the skill's instructions instead of improvising. You see a small chip in the reply showing which skill was used.
2. **You ask for it explicitly.** Type `/` in the chat input to bring up the slash menu. Available skills appear there. Pick one and your message is sent with that skill applied.

If a skill is available to multiple agents, switching agents does not change the skill behavior. The skill is the same recipe; only the agent's other instructions wrap around it differently.

## The ClawHub catalog

ClawHub is the community marketplace for skills. We curate it, but most skills are built by other Clawless users who wanted to share what worked for them.

Browsing ClawHub is like browsing a recipe site. Each skill has:

- A name and a short description.
- A category (writing, research, planning, code, ops, learning).
- A star rating from people who installed it.
- A description of what tools it uses.
- The author's name (if they chose to be public).

To install, click the skill, review the description, and click Install. The skill appears in your Installed list. You can enable or disable it per agent from there.

When the author updates a skill, you see it in the Available updates list. Updates are opt-in; we do not auto-update skills, because you should always know what your agents have.

## Building your own skill

Click New Skill in the Skills panel to open the Skill Builder.

The Builder is a small form with these fields:

- **Name.** The label that shows up in the Skills panel and in the slash menu.
- **Description.** One sentence on what the skill does. This is what the agent reads when deciding whether to use it.
- **Trigger.** Optional. A short hint to the agent about when to invoke it (for example "when the user asks for a meeting summary" or "any time the user mentions invoicing").
- **Instructions.** The recipe itself. Write it as if you were teaching a colleague to do the job. Be specific about steps, formats, edge cases.
- **Tools used.** Which tools the agent should use when running this skill. Pulled from the available tool list.

Click Save and your skill is available to your agents immediately. You can test it in chat right away and iterate on the instructions until the output is what you want.

### Tips for writing a good skill

A good skill is short, concrete, and reusable.

1. **Write the instructions like a recipe.** Numbered steps. Specific outputs. Format expectations.
2. **Avoid moving targets.** Do not put dates, names, or one-off context into the skill itself. Those go in your message or in memory.
3. **Test before sharing.** Run the skill on three or four different inputs to make sure it produces the result you want.
4. **Keep the trigger specific.** A vague trigger like "when the user asks a question" will fire on everything and frustrate you. A specific trigger like "when the user shares a meeting transcript and asks for a summary" hits its target.

## Where skills live

Installed skills live on your computer in the Clawless data folder, alongside your agents and conversations. They are not uploaded anywhere unless you explicitly publish a skill back to the catalog.

If you delete a skill, it is removed from your Installed list immediately. You can reinstall from the catalog at any time.

## Sharing your skill

The launch version of Clawless lets you keep skills on your computer and use them across your agents. Publishing your own skill back to the ClawHub catalog for others to install is on the post-launch list.

In the meantime, if you have built a useful skill, you can export it as a file and send it to someone who can import it manually. The Skill Builder has an Export button that produces a single file with the whole recipe.

## Common questions

**What is the difference between a skill and an agent?** A skill is the job description; an agent is the colleague. Many agents can use the same skill. One agent can have many skills.

**Can two agents share a skill?** Yes. Skills are not bound to a single agent. Enable the skill on whichever agents should have it.

**How do I see what tools a skill uses?** Click the skill in the Installed list. The detail view shows the tools, the instructions, and which agents currently have it enabled.

**Are catalog skills safe to install?** ClawHub skills are vetted before they appear in the catalog, but treat them like any third-party recipe: read the description, look at the tools used, and start cautious. A skill that needs file write access can do more than a skill that only reads.

**Can a skill use a tool the agent does not have?** No. The agent runs the skill, which means the skill is constrained by whatever tools that agent has access to. If a skill needs WebSearch and your agent has read-only file access, the skill will not work for that agent.

**Can the same skill behave differently on two different agents?** Yes, in a soft way. The agent's personality and other instructions wrap around every skill it runs. A skill called "Summarize" will produce a more formal summary on a Writer agent and a more bullet-pointed one on a Planner agent, even though the recipe is identical.

**Can I version-control my custom skills?** Skill files are plain text. Power users can keep them in git or any other tool. We do not do that for you, but the format is friendly to it.

**What happens to skills if I uninstall Clawless?** Installed skill files live in the Clawless data folder. Uninstalling the app does not wipe the data folder by default, so the skills are still there if you reinstall. If you wipe the data folder manually, you would need to reinstall your skills from the catalog.

**What is the difference between a skill and a sub-agent?** A sub-agent is a separate agent that the main agent can spawn for a sub-task. A skill is a recipe that one agent runs as part of its own work. Sub-agent orchestration is on the post-launch roadmap; skills are available today.
