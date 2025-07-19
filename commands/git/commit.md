---
name: Commit Changes
description: Commit changes
---

We need to commit changes.

Think about doing the following step by step:

## Checks tests

Run tests and lint first.
If fails, report it to user and wait for an instruction.

## Add changes

Think about adding the least changes for a new commit.
First, you check the current Git status.

!git status

Then see diff and grasp the changes.

Think hard what is the smallest set of changes to make the new commit.
Especially untracked files are likely temporal stuffs or does not ready for commit. So check contents of untracked files carefully.

## Commit changes

Finally, you commit the changes.
Your commit message follows the following format:

```
(feat|fix|refactor|doc): [#<issue-number>] <title>

- <Change details that should be on git log>
- <Change details that should be on git log>
...
```

Note that:
- `(A|B)` means `A` or `B`.
- `[A]` means optionally `A`.
- `[A]` means optionally `A`.
- `<A>` means substitution of `<A>` with an appropriate content of A.

The issue number should be inferred from the branch name. If the branch name doesn't start with an issue number, you can skip the issue number because it is an optional element.
Commit log should be clean and tidy. Commit messages are required to be helpful information when you see the Git log.
