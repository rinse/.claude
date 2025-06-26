---
name: Create Worktree
description: Creates Git Worktree for an agent.
---

We want to create a Git Worktree for an agent.

Think about doing the following step by step:

## Create a Git Worktree

Create a Git worktree for $ARGUMENTS on `.wt/<ISSUE_NUMBER>`.

## Copy local settings that are not controlled by Git

Copy the local Claude settings to the new worktree with:

```sh
cp .claude/settings.local.json ".wt/<ISSUE_NUMBER>/.claude/settings.local.json"
```
