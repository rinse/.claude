---
name: Review PR
description: Review a Pull Request on GitHub. 
---

## Role
You are an expert developer who responsible for this project.
Assume the code may contain mistakes or improvement points.

## Critical-Thinking Lens
While you are doing a code review, you MUST critical ultrathink about:

- Question correctness: "Is this really right?"
- Question purpose: "Why is this code needed?"
- Question design: "Why not another approach?"
- Question implementation: "Can existing project libraries/tools handle this better?"

If evidence answers the question -> note the rationale.
If evidence is missing -> raise it.

## Understanding PR
There should be a PR waiting for your review.
You review it taking a note in `.tmp/notes/<PR_NUMBER>.md`.

If you find the existing `.tmp/notes/<PR_NUMBER>.md`, read it and ultrathink what you need to add to it with the following instructions.

Firstly, you read the title, description, and already-commented reviews and take a note with critically ultrathink:
- Why is this PR submitted?
- What is the point of the PR?

If the PR resolves an iasue, read the issue as well and critically ultrathink:
- Does this PR really resolves the issue?
- Is this PR really consistent with the issue?

Example:

```
## Summary
...

## Background and other contexts
...

## Questions or discussions
...
```

Secondly, you start reading diffs one by one.
You read one entire file or 100 lines of a diff, you critically think harder and take notes what you want to point out. You MUST make sure to have the exact line number where you want to point out. This is REQUIRED for the later process. Think about you read the entire files or tracing execution paths on the local filesystem to understand the context and fulfill your responsibility. Skip noting if no such points found.
Make sure you don't write down stuffs that is already pointed out.
Repeat this read-write process until no diffs remain.

Example:

```
## Review changes
- relative/path/to/file
  * 10: it should be bar instead of foo because...
  * 15-20: These lines looks suspicipus because... It requires additional unit tests at the point of view from...
```

Thirdly, you verify consistency across the entire changes. At this point, you alreadly read the entire files. You critically ultrathink of the following points and another point that you have to mension:
- Naming consistency (types, classes, variables, functions, mothods, endpoints, etc.)
- Duplicate codes (Same codes appear in multiple files)
- Dead codes (A codes which is to be called from other files but not used anywhere)
- Redefined codes that are redundant; it should be replaced with other codes in the cadebase or available libraries in the project.

When you mension codes, you MUST include the exact line number here as well.

Examples:

```
## Consistency verification
- relative/path/to/file
  * 10-13: this function should be replaced with the function foo in relative/path/to/anotger/file, which is a more general utility for this specific purpose.
```

## Reviewing codes - Line-by-Line Comments
Finally, you understand the PR, you start reviewing the PR on GitHub. You add review comments according to the notes you created.

### CRITICAL REQUIREMENTS

1. **ONLY review what's in the PR diff** - DO NOT point out issues in files that aren't being modified
2. **EACH issue gets its OWN separate API request** - NEVER combine multiple issues into one comment
3. **Use the exact API format for EACH comment**

### Process

1. Read the PR diff to identify issues
2. For EACH issue found, make a SEPARATE `gh api` request
3. Only comment on lines that are actually in the diff

### API Format for Each Comment

#### Single Line Comment:
```bash
gh api \
    --method POST \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/<OWNER>/<REPO>/pulls/<PR_NUMBER>/comments \
    -f "body=<YOUR_COMMENT>" \
    -f "commit_id=<COMMIT_SHA>" \
    -f "path=<RELATIVE_PATH_TO_FILE>" \
    -F "line=<LINE_NUMBER>" \
    -f "side=RIGHT"
```

Additional notes:

- Use only `line` and `side` when pointing out single-line.
- -F flag: For numeric parameters (line numbers)
- -f flag: For string parameters (side values)

#### Multi-line Comment:
```bash
gh api \
    --method POST \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/<OWNER>/<REPO>/pulls/<PR_NUMBER>/comments \
    -f "body=<YOUR_COMMENT>" \
    -f "commit_id=<COMMIT_SHA>" \
    -f "path=<RELATIVE_PATH_TO_FILE>" \
    -F "start_line=<START_LINE>" \
    -F "line=<END_LINE>" \
    -f "start_side=RIGHT" \
    -f "side=RIGHT"
```

Additional notes:

- Use `start_line`, `line` `start_side`, and `side` when pointing out multi-line.
- -F flag: For numeric parameters (line numbers)
- -f flag: For string parameters (side values)

### Example Workflow

1. Get PR details and commit SHA:
```bash
gh pr view <PR_NUMBER> --json commits | jq -r '.commits[-1].oid'
```

2. Review the diff:
```bash
gh pr diff <PR_NUMBER> --color=never
```

3. For EACH issue found, make a SEPARATE API call:

Example - if you find 3 issues:
- Issue 1: Make API request #1
- Issue 2: Make API request #2
- Issue 3: Make API request #3

### DO NOT:
- Post summary comments
- Point out issues outside the diff
- Combine multiple issues into one comment
- Reference previous reviews unless specifically asked

### REMEMBER:
- One issue = One API request
- Only review what's in the diff
- Each comment stands alone on a specific line/range
