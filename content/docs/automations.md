# Automations

`[Live]`

Automations are scheduled prompts. Instead of typing the same question every Monday morning, you tell Clawless "every Monday at 8 AM, ask Researcher for the top three news stories in my industry and post the summary to my Slack." This chapter covers the Cron panel, how to create and manage scheduled jobs, and what to expect.

## What an automation is

An automation is a chat message Clawless sends on your behalf, on a schedule you set.

It is exactly like a message you would have typed yourself. The agent receives it, thinks, calls tools, replies. The only difference is that the trigger is a clock instead of you pressing Enter.

Use cases people reach for:

- A daily briefing: every weekday at 8 AM, ask Researcher for the top three things happening in your field today.
- A weekly review: every Friday at 5 PM, ask Planner to look back at the week and draft a summary.
- A maintenance task: every night at midnight, ask Local Helper to clean up old files in a specific folder.
- A monitor: every 15 minutes, check whether a specific page on your supplier's site has changed.
- A reminder: every Tuesday at 4:30 PM, send yourself a Slack note about your weekly 5 PM call.

If it is something you would otherwise set a recurring task for, an automation can probably do it.

## The Cron panel

Open the Cron panel from the navigation rail (the small clock icon).

You see a list of every scheduled job, each row showing:

- **Name.** What you called it.
- **Schedule.** When it runs ("Every weekday at 8:00", "Every 15 minutes", or a raw cron expression for power users).
- **Agent.** Which agent runs the job.
- **Next run.** The exact time the next firing is scheduled.
- **Last run.** When it last fired and whether it succeeded.
- **Status toggle.** On/off switch.

Filter, search, and sort all work the way you would expect.

## Creating an automation

Click New job. The form has these fields:

- **Name.** A short label so you can find it later in the list.
- **Schedule.** Either a friendly preset or a cron expression.
- **Agent.** Which agent should receive the prompt. Different agents have different system prompts, models, and tool scopes; pick the one that fits.
- **Prompt.** The message the agent will receive. Write it like you would write any other chat message. The agent reads context, calls tools, replies.
- **What to do with the result.** In-chat, channel, or file (more below).

Click Save and the job is live. The next firing will be at the time shown in the Next run column.

## Friendly schedule presets

You do not need to know cron syntax. The presets cover what most people want:

- **Hourly.** Every hour, on the hour.
- **Daily morning** (default 8 AM, configurable).
- **Daily evening** (default 6 PM, configurable).
- **Weekday morning.** Monday to Friday at the daily-morning time.
- **Weekday evening.** Monday to Friday at the daily-evening time.
- **Weekly Monday.** Once a week, Monday at a time you set.
- **Weekly Friday.** Once a week, Friday at a time you set.
- **Custom.** Pick weekdays and times manually.

Behind the scenes, presets translate to standard cron expressions. Power users can switch to the raw cron field if they need something specific (like "every 15 minutes between 9 AM and 5 PM, weekdays only") that the presets do not cover.

The schedule field is read-only by default. Click the small pencil to unlock the raw cron expression. This is intentional, because it is too easy to accidentally configure a job that fires every minute when you meant every hour.

## Result destinations

When the job runs, the agent produces a reply. Where that reply goes depends on the destination you picked:

- **In-chat (default).** The reply appears in the agent's chat history, like any other conversation. You see it the next time you open the agent. This is the right default if you want to read the result casually whenever you check in.
- **Channel.** The reply is sent through one of your connected channels (Telegram, Discord, Slack, etc.). Useful for "send the daily briefing to my morning channel where I will see it on my phone."
- **File.** The reply is written to a file path you specify. Useful for archiving, for piping into another tool, or for letting an agent build up a long-form document over many runs.

A future post-launch addition: email destinations. For now, if you want email, route through a channel that has email integration (or set up a small skill that uses an email-sending tool).

## Pausing and resuming

The on/off toggle on each row is non-destructive. Toggling off pauses the schedule; the job is still in your list, just not firing. Toggling on resumes from the next scheduled time, not from the last paused fire.

Use pauses for:

- Vacations, when you do not want a daily briefing piling up.
- Debugging, when you are iterating on the prompt or schedule and do not want test fires going to a real channel.
- Temporary holds when a connected service is down.

## Job history

Click any job row to see its history. You get a chronological list of every previous fire:

- When it ran.
- How long it took.
- Whether it succeeded.
- The full transcript.

History gives you a record of what the agent has been doing on your behalf and a way to spot patterns. If a daily briefing has been progressively useless for two weeks, the history shows you the slow drift.

## Run now

Sometimes you want a job to fire right now, outside its schedule. Click the Run now button on the row. The job runs immediately; the schedule is unaffected. Useful for testing a new job without waiting for the next firing.

## What runs the schedule

Cron jobs run inside the Clawless app. That has two practical implications:

- **The app has to be running.** If Clawless is closed, jobs do not fire. They do not "queue up" and run later when you launch.
- **Your computer has to be on.** Same reason. Jobs need the app, and the app needs the computer.

For most users this is fine. You leave Clawless running on your work computer or on a small box at home, and the schedule fires reliably. If you need a 24/7 always-on automation that survives your laptop closing, you would want a separate always-on machine running Clawless (not currently a managed product, but possible with technical setup).

## When jobs fail

If an agent run errors, the job is marked failed in history. The next scheduled firing still happens; we do not stop the schedule because of one bad run.

Common reasons for a failed run:

- Provider API outage.
- Out of API credits.
- Network failure for tool calls.
- The prompt itself produced something the agent could not act on (rare).

If a job fails three times in a row, the row in the Cron panel surfaces a small warning. You can click in to see the errors and decide whether to fix the prompt, the schedule, or just disable the job.

## Combining automations with other features

A few patterns worth knowing:

- **Cron + Channels.** A scheduled prompt can post to a channel, which is the easiest way to get an automation result on your phone without checking the app.
- **Cron + Memory.** A daily prompt can update a memory ("It is now $DATE; the project status is $STATUS"), keeping the agent's context fresh without you doing it manually.
- **Cron + Skills.** A scheduled prompt can invoke a skill explicitly, ensuring the same recipe runs the same way every time.
- **Cron + Browser.** A nightly browser-automation job can check a website for changes and post a summary.

## Common questions

**Does my computer have to be on for cron jobs to run?** Yes. Cron jobs run inside the Clawless app, which runs on your computer. If the app is not running, the schedule does not fire.

**What if I am asleep when a job runs?** It runs as scheduled. You see the result whenever you next check in (in chat, on your channel, or in your output file, depending on the destination).

**Can I have a job that runs every minute?** Yes, but be careful about cost. Even a cheap model run every minute adds up over a month. The Cron panel shows the schedule, but it does not stop you from picking aggressive intervals.

**Can a job trigger another job?** Yes, in a soft way. The agent's reply can include "schedule a follow-up" if the agent has access to the cron tool. More commonly, you would just create two scheduled jobs, one for the trigger and one for the follow-up at a slightly later time.

**Can I run a job once at a future time and never again?** Yes. Pick the Custom schedule and set a single date and time. After it fires, the job is marked done; you can leave it in the list as a record or delete it.

**What happens if my computer was off when a job was supposed to fire?** It does not fire retroactively. Cron jobs run live; missed firings are not replayed. If you need "make sure this happens at least once today even if I missed the morning trigger", set up two firings (morning and lunch, for example) and the agent can recognize the second one as a no-op.

**Can the agent know it is running on a schedule vs. you typing?** Not in the prompt itself, unless you put it there. A useful pattern is to start scheduled prompts with "It is now $TIME, this is the daily briefing run" so the agent knows the context.

**Where do scheduled jobs run if I have multiple devices?** Each Clawless install is its own world. A job created on your laptop only fires when the laptop's Clawless is running. We do not synchronize jobs across machines today.

**Is there a limit on how many jobs I can have?** No hard limit. Practically, more than fifty starts to feel cluttered in the panel. The system is fine with hundreds.

**Can I export my job list?** Not from a built-in button at launch. The job list is stored in the Clawless data folder; advanced users can read it directly. We will add a real Export option in a future release.
