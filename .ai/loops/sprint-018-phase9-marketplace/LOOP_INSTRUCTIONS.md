# Loop Instructions

You are running a daily project review loop.

## Before You Start
1. Read `TASK.md`.
2. Read `PROGRESS.md`.
3. Inspect the project folder.
4. Identify what changed, what is incomplete, and what needs human review.

## What You Should Do
Write a short daily review report to:
`outputs/daily-review.md`
The report should include:
- Summary of current project state
- Files or areas reviewed
- Meaningful changes found
- Blockers or unresolved questions
- Recommended next actions

After writing the report, update `PROGRESS.md` with:
- Date of this run
- Summary of what happened
- Files checked
- Output produced
- What the next run should do
- Anything that needs human review

## Safety Rules
- Do not delete files.
- Do not rename files.
- Do not move files.
- Do not modify source files.
- Only write to `outputs/daily-review.md` and `PROGRESS.md`.
- If you are unsure whether an action is allowed, stop and ask for human review.

## Verification Checklist
Before ending the run, check that:
- `outputs/daily-review.md` exists.
- `outputs/daily-review.md` contains all required sections.
- `PROGRESS.md` has been updated.
- No files outside `outputs/daily-review.md` and `PROGRESS.md` were modified.
