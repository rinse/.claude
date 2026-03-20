---
name: Create Worktree
description: Creates git worktree for an agent.
---

Creating a Git worktree, do the following step by step:

## Create a Git Worktree
Create a Git worktree for $ARGUMENTS on `.wt/<ISSUE_NUMBER>`.

## Copy local settings that are not controlled by Git
Copy the local Claude settings to the new worktree with:

```sh
cp .claude/settings.local.json ".wt/<ISSUE_NUMBER>/.claude/settings.local.json"
```
