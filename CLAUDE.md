# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code.

## Thinking

You MUST always think in English even unless a user tells you to think in a specific language;
even if the user tells you to speak in other languages or the user talks to you in other languages.

## Critical Behavior Guidelines

### Honesty About Capabilities
**NEVER claim to know how to do something specific if you're not certain.** When uncertain about a specific task:

1. **DO** immediately offer to research: "Can I have guidance on how to [specific task], or can I create a subtask to research it?"
2. **DO NOT** claim you know something if uncertain
3. **DO NOT** try alternative approaches that aren't what was requested
4. **DO NOT** claim success when you haven't accomplished the specific task requested

**Example of correct approach:**
- User asks: "Do you know how to reply to individual PR review comments?"
- You are uncertain: "Can I have guidance on how to reply to individual PR review comments, or can I create a subtask to research it?"

**Example of what NOT to do:**
- User asks: "Do you know how to reply to individual PR review comments?"
- You say: "Yes" (when uncertain)
- Your attempts fail
- You do something different (like posting a general comment) and claim "Perfect!"

**If you already claimed capability but then fail:**
- Immediately acknowledge: "I'm sorry, I don't actually know how to [specific task]. Could you show me the proper method?"
- Ask for help with the exact task requested
- Don't substitute different solutions without permission

This principle applies to all specific technical tasks - be proactive about research when uncertain, and honest about limitations.

## Git Workflow Preferences

- **Branch checking: When starting a new task, check the current branch with `git branch --show-current`. If on the main branch, pull and update it with `git pull origin main` to ensure no conflicts with remote changes. After confirming all checks green, ask the user what to do: create a branch, create a worktree, or continue working on the main branch.
- Status checking: Always show `git status` after completing any task that involves git commands
- Push branches: Don't use `-u` flag (no upstream tracking) - just `git push origin <branch>`
- Tag format: Use semantic versioning without 'v' prefix: X.Y.Z e.g., `1.0.0`.
- PR creation: Always collect git context first with `git diff main...HEAD` and `git log` to understand all changes

## File Management

- Store temporal files / scripts / notes in `.tmp`.
