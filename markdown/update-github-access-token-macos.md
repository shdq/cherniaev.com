---
title: "Update GitHub Personal Access Token on MacOS"
date: "2024-03-15"
excerpt: ""
image: ""
tags: ["git", "github", "CLI"]
---

I received an email with the subject: _[GitHub] Your personal access token (classic) has expired_. It happens once in a while and everytime I forget how to regenerate and update it, so I come up with a little memo for my future self.

## Generate a new token

- On GitHub go `Settings` > `Developer Settings` > `Personal Access Tokens` or follow [this link](https://github.com/settings/tokens).
- Go to `Generate a new token` ->`Generate new token (classic)`. Write a note and toggle `repo` and `workflow` as the scope.
- Click `Generate token` and copy your new token somewhere safe, like password manager. You won't find it later on GitHub, only generate a new one.

## Remove the old token from keychain

In your terminal copy this command

```bash
git credential-osxkeychain erase
```

Hit `Enter ↵`. It won't show you a new line with the `$`, don't worry and copy the next line

```bash
host=github.com
```

Hit `Enter ↵` and copy the last line

```bash
protocol=https
```

Hit `Enter ↵` for the last time and that's it.

## Update credentials with the new token

Use `git push` or `git clone` in the terminal, it will ask you for credentials:

```bash
Username for 'https://github.com':
```

Type your username and hit `Enter ↵`.

```bash
Password for 'https://username@github.com':
```

Paste your new token and hit `Enter ↵`.

**_Everything is set up, get back to work!_**
