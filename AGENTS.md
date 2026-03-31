# AGENTS.md

This repository uses a local external agent knowledge base at:

`D:\Coding\.Agent\Agents`

Any coding agent working in this project must treat that directory as an always-on source of skills, checklists, and best practices.

## Required Behavior

Before starting meaningful work, always inspect `D:\Coding\.Agent\Agents` for potentially relevant files.

If a skill, checklist, or best-practices document matches the task even loosely, use it. The matching threshold for this repository is intentionally extremely low:

- If it appears at least `1%` relevant, consult it.
- Prefer over-inclusion rather than skipping a possibly useful skill.
- When several files may apply, review all plausible matches first, then proceed.

Do not wait for the user to explicitly request a skill lookup. This check is mandatory for every non-trivial task.

## How To Match Skills In This Repo

Use the repo structure and stack as the first filter:

- `app-next/`: check frontend-related guidance first.
- `api/`: check backend and API-adjacent guidance first.
- Root-level documentation, reviews, commits, or project summaries: check documentation and git-related guidance first.

Common likely matches in `D:\Coding\.Agent\Agents` include:

- `REACT_BEST_PRACTICES.md` for React and Next.js component work.
- `SCSS_BEST_PRACTICES.md` for styling and Sass changes.
- `HTML_BEST_PRACTICES.md` for markup and accessibility-sensitive UI work.
- `GIT_COMMIT_BEST_PRACTICES.md` for commit creation.
- `GIT_PULL_REQUEST_REVIEW_BEST_PRACTICES.md` for reviews and review-style analysis.
- `PROJECT_DESCRIPTION_BEST_PRACTICES.md` for README, project summaries, and documentation framing.

Also check any other document in that directory if the task overlaps even slightly with its topic.

## Priority Rules

When external best-practice guidance conflicts with the repository's existing architecture or conventions:

1. Preserve correctness.
2. Preserve explicit user instructions.
3. Preserve established repo conventions unless there is a strong reason to improve them.
4. Use external guidance to improve implementation details, consistency, review quality, and documentation.

## Working Rule

For this repository, the default assumption is:

"There is probably a useful skill in `D:\Coding\.Agent\Agents`; check first."

Agents should briefly mention which external skill files were consulted when that context materially influenced the work.
