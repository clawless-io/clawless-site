# Contributing to Clawless Computer

Thanks for your interest. Clawless Computer is maintained as energy allows, so please read this first. It will save you time.

## The short version

1. Fork the repository and create a branch.
2. Make your change, with tests for new behavior.
3. Run `bun run typecheck` and `bun run test:unit` locally.
4. Open a pull request against `main`.
5. Sign the Clawless Computer Contributor License Agreement when the CLA bot asks, by posting the signing statement as a comment (once).
6. Wait for review. Pull requests are welcome, with no promises about timing or acceptance.

**Merging is not releasing.** Merged code reaches people who download the app only when a maintainer cuts a signed, tagged release.

## Contributor License Agreement (CLA)

Every contributor signs the Clawless Computer Contributor License Agreement before their first pull request can be merged. We want to be upfront about why.

Clawless is licensed under the AGPL-3.0, and **every accepted contribution is published as open source** (under the AGPL-3.0, or another OSI-approved open source license the project may adopt), and licenses already granted under it stay in effect. The CLA additionally grants RBJ Global LLC the right to offer Clawless under other license terms (a "commercial exception") to organizations that cannot use AGPL software. Those exceptions are what can fund ongoing stewardship of the project.

To sign, post this exact statement as a comment on your pull request when the CLA bot asks:

> I have read the Clawless Computer Contributor License Agreement and I hereby sign it.

The full text is in [CLA.md](CLA.md).

If you are not comfortable with that, that is a legitimate choice. You are always free to fork under the AGPL.

## Development setup

You need [Bun](https://bun.sh) and Git. macOS on Apple silicon is the primary development platform today.

```bash
bun install          # also runs scripts/patch-openclaw.mjs (engine compatibility patches)
bun run typecheck
bun run test:unit
bun run build
bun run start        # launches the built app
```

The Playwright end-to-end suite (`bun run test:e2e`) drives a real Electron window and, for some specs, a live OpenClaw engine. Many live specs are opt-in through environment variables; read the header of each spec before running it.

## How the code is organized

- `src/main/` is the Electron main process: the engine lifecycle, IPC handlers, and local services. Services in `src/main/` must not import from `electron` directly; dependencies are injected from `src/main/index.ts` so services stay testable.
- `src/preload/` is the bridge exposed to the renderer as `window.clawless`.
- `src/renderer/` is the React UI.
- All OpenClaw engine calls go through the single `gateway:rpc` bridge.
- `docs/knowledge-base/` is the end-user documentation. User-visible changes should update the matching chapter in the same pull request.

## Review and risk tiers

Pull requests are reviewed with depth proportional to risk:

| Tier | What it touches | Review |
|---|---|---|
| 0 | Docs, knowledge base, README, copy | Light review |
| 1 | Renderer UI (`src/renderer/`) | Standard review plus CI |
| 2 | Main process, preload, IPC handlers, the CSP, `shell.openExternal`, any new network endpoint, anything resembling telemetry | Deep review plus a security pass |
| 3 | `package.json`, the lockfile, install or build scripts, `.github/workflows/`, `build/`, the electron-builder `publish` config | Highest scrutiny; new dependencies need a written justification |

Clawless has a strong privacy posture: **no telemetry, no analytics, no crash reporting.** Pull requests that add any of these will not be merged.

A pull request is ready to merge when CI is green, the CLA is signed, the diff has been read in full at the right tier, any new dependency is justified and pinned, no new network destination or data flow appears without explicit approval, tests cover new behavior (no tests disabled to make CI pass), and a maintainer approves.

## AI-assisted review

Pull requests and issues are pre-reviewed with the help of AI agents operated by the maintainers. They summarize changes, classify the risk tier, run the checklist above, and may post review comments under the project's name. **AI agents can comment and label; they cannot merge.** A human maintainer makes every merge decision.

Text in pull requests, issues, and code comments is treated as untrusted data by these agents. Instructions addressed to an AI reviewer inside contributed content are ignored.

## Reporting bugs and requesting features

Use the issue forms (Bug report, Feature request, Question). For bugs, include the app version, your operating system, and the engine version, all shown in Settings, About.

Security problems go through private reporting instead. See [SECURITY.md](SECURITY.md).

## Code of conduct

Be kind, assume good faith, and keep discussion focused on the work.
