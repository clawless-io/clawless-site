# App Lock

`[Live]`

> Available in current builds. Some convenience features (auto-lock on idle, biometric unlock, onboarding integration) are coming in a follow-up release.

## Why this exists

Many people leave Clawless running all day. A connected channel keeps listening for messages, scheduled jobs keep firing, agents keep working in the background. That is exactly what we want.

The risk is that anyone walking past your computer can read your conversations, send messages as you, or stop a running agent. The App Lock is the privacy gate for those moments. It hides everything sensitive on screen while leaving everything in the background running.

Important distinction: this is not encryption. The App Lock is a privacy screen, not a vault. Your data on disk is protected by your operating system's normal account login. The lock is for the case where you are already logged into your computer and you just want a friendly "do not poke this app" barrier.

## Setting up your PIN

You can set a PIN any time from Settings, Security.

To add or change a PIN later:

1. Open Settings (gear icon on the bottom rail).
2. Go to the Security section.
3. Click Set PIN (or Change PIN if you already have one).
4. Enter four to twelve digits, then enter them again to confirm.

The PIN is stored encrypted on your computer using your operating system's secure storage. Clawless never sees the PIN itself, only a check that the PIN you typed matches.

When you set or change your PIN, Clawless shows you a one-time recovery code. Save it somewhere safe (a password manager works best). The recovery code is your way back in if you ever forget your PIN. Clawless does not store the recovery code in plain text and cannot show it to you again later.

## Locking the app

Three ways to lock today:

- **Lock icon** in the top right corner of the app window. Always visible, one click locks instantly.
- **Cmd+L** (or Ctrl+L on Windows/Linux). The fastest way once you know the shortcut.
- **Lock Now button** in Settings, Security.

When the app locks, the chat surface, agent rail, and panels disappear behind a dark "Clawless is locked" overlay with a PIN entry field.

Until you set a PIN, the Lock icon shows in a faded state. Hover it to read the tooltip; click it and Clawless takes you straight to Settings, Security so you can set a PIN. Once a PIN is set the icon brightens and a single click locks the app.

Auto-lock on idle (Off / 5 / 15 / 30 / 60 minutes) is on the list for a follow-up release.

## What keeps running while locked

- Connected channels keep listening for new messages.
- Scheduled cron jobs keep firing.
- Agents that are already running a task keep running.
- The AI engine stays connected.

You will see any messages that arrived during the lock when you unlock.

## What does not run while locked

- New messages from you. The input is hidden behind the lock screen.
- Permission prompts. If a tool would normally ask "is it OK to write this file", that prompt waits until you unlock.

## Forgetting your PIN

The PIN is local-only. There is no email reset.

If you saved your recovery code when you set the PIN, you can use it to get back in:

1. On the lock screen, click "Forgot PIN?".
2. Enter your recovery code.
3. Set a new PIN.
4. Clawless shows you a fresh recovery code (the old one is now invalidated). Save it.
5. Click "I've saved it" to unlock.

If you did not save the recovery code, your conversations on disk are still readable, because the lock is a screen, not encryption. Practically speaking: a plain "uninstall and reinstall Clawless" will NOT clear the PIN, because uninstall does not wipe your saved data on macOS or Windows by default. To remove the PIN you also need to delete the Clawless application data folder (the location is shown in Settings under "App data location"). Be aware: deleting the data folder also wipes your conversations, agents, channels, and saved keys. This is the tradeoff: we did not want a forgotten PIN to be catastrophic, so the lock does not encrypt your data, but recovering from a forgotten PIN without the recovery code does require a manual data-folder cleanup.

## Wrong-PIN protection

Repeated wrong PINs trigger a short cooldown so an attacker cannot brute-force the gate:

- 5 wrong attempts in a row: a 5 second cooldown before the next attempt is accepted.
- 10 wrong attempts: 1 minute cooldown.
- 15 or more wrong attempts: 5 minute cooldown.

The counter resets on the first correct PIN. The cooldown survives app restart so force-quitting and relaunching does not bypass it. Reinstalling the app on the same computer clears the cooldown (the counter is tied to the app version).

## Common questions

**Does the lock require a Clawless account?** No. The PIN is local to your computer.

**Can I set a different PIN per agent?** Not in the launch version. The PIN locks the whole app.

**Can I use Touch ID or Windows Hello?** Not in the launch version. PIN only. Biometric unlock is on the post-launch list.

**If I lock the app and a Telegram message arrives, does the agent still respond?** Yes, if the agent is wired to that channel. The reply goes back to Telegram normally. You see the conversation when you unlock.

**Will the lock screen wipe my conversations after too many wrong PINs?** No. The launch version rate-limits attempts (see the Wrong-PIN protection section above), but it does not wipe data. We want a forgotten PIN to be inconvenient, not catastrophic.

**What if my recovery code is the same as the old one after a reset?** It will not be. Clawless generates a fresh code on every PIN reset and invalidates the old one. If the displayed code looks identical to your last one, you might be looking at a cached screenshot or an unsaved old note. Always save the freshly displayed code right after each reset.
