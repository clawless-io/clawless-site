# Security Policy

## Reporting a vulnerability

Please **do not** report security vulnerabilities through public GitHub issues.

Report them privately through GitHub's private vulnerability reporting: open the **Security** tab of this repository and choose **Report a vulnerability**. If you cannot use GitHub, email security@clawless.ai with "Clawless security" in the subject line.

Please include:

- A description of the issue and its impact
- Steps to reproduce, or a proof of concept
- The affected version (Settings, About)

We will acknowledge your report as soon as we can and keep you informed as we investigate. Clawless is maintained as energy allows, so we cannot promise a fixed response time, but security reports are always prioritized over other work.

## Scope

In scope: the Clawless Computer desktop app in this repository (main process, preload bridge, renderer, IPC handlers, build and update configuration).

Vulnerabilities in the OpenClaw engine itself should be reported to the OpenClaw project. If you are not sure which project an issue belongs to, report it here and we will help route it.

## Supported versions

Security fixes are made on `main` and shipped in the next signed release. Older releases are not patched.
