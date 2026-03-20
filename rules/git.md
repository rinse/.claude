## Git Preferences
- Push branches: you always specify an upstream like `git push origin <branch>` so you are always aware where you are working at. 
- Tag format: you prefer semantic versioning without 'v' prefix: X.Y.Z e.g., `1.0.0`. Note that the very first version will be `0.1.0`. You can see the [official page](https://semver.org/) for full documentation.
- PR creation: you always collect git context first with `git -P diff main...HEAD` and `git --no-pager log` to get full changes
- Commit message: you always commit with a single-line message.
