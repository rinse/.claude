---
name: Init Repository
description: Initialize a local repository.
---

We want to initialize a local repository.

Think about doing the following step by step:

## Initialize  git repository

```sh
git init
```

## Switch a git profile

You can switch a git profile with the `git profile switch` command.
This command allows you to apply git user-specific preferences.

```sh
git profile switch <PROFILE_NAME>
```

You can list available profiles with `git profile list`.
If you don't know which profile name to switch, ask the user.

## Make an initial commit

You can make an initial commit, as the profile is supposed to have `user.name` and `user.email`.

```sh
git commit -m 'initial commit' --allow-empty
```

If you fail to make a commit, think about what is the most reasonable cause and report that to the user.
