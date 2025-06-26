---
name: Resolve PR comments
description: Resolves review comments on the PR.
---

Review unresolved comments on the PR and fix issues that are pointed out in the comments.
Ultrathink about how can you improve current codes along with the solution of the issue. You might need to fix other parts of as well.

## Fetching unsolved PR comments

To efficiently view only unresolved PR comments, use the following command.
Make sure you substitute variables with actual values.

```sh
gh api graphql -f query='
{
  repository(owner: "<OWNER>", name: "<REPOSITORY_NAME>") {
    pullRequest(number: <PR_NUMBER>) {
      reviewThreads(first: 100) {
        nodes {
          isResolved
          path
          line
          comments(first: 1) {
            nodes {
              body
              author {
                login
              }
            }
          }
        }
      }
    }
  }
}' | jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false)'
```

Replace `PR_NUMBER` with the actual pull request number. This command filters to show only unresolved comments, saving tokens and making it easier to see what needs to be addressed.

After resolving an issue, you must reply to each review comment. Ultrathink about how you resolved the issue that was pointed out in the comment.

## Replying to a review comment

You must reply to each review comment and this is how you reply to a review comment.
Make sure you substitute variables with actual values.

```sh
gh api --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/<OWNER>/<REPOSITORY_NAME>/pulls/<PR_NUMBER>/comments/<REVIEW_COMMENT_NUMBER>/replies \
  -f "body=<How you resolved the issue that was pointed out in the comment>"
```
