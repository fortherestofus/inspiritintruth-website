# Working with Alroy on this repo

## Communication
- Be brief. Lead with the result in 1–3 bullets. No essays — detail only on request.
- Agile: research fast, propose in a few lines, act on go-ahead, commit to main, push.

## Always commit and push
- Commit and `git push origin main` as work completes, without being asked. Never leave a dirty tree.
- Do the same in the FTROU repo. Pushing there does NOT deploy it (LiteSpeed host, no CI) — say so.

## Brand rule — honest over polished
- App screenshots stay authentic: real timestamps, real battery, raw demo text.
- Only swap screenshots you were asked to swap — the process/flow shots are separate from the home, Bible, Discover and Profile ones.
- "We seek God randomly. We don't need to be perfect. We need to be honest."
- Never sanitize screenshots or demo content. Applies here and to the FTROU studio site's ISIT page (`../Claude Code/ForTheRestOfUs`).

## Conventions
- Design tokens mirror the FTROU studio site (see tailwind.config.ts) — keep the two sites reading as one family.
- Copy lives in `lib/content.ts` / `lib/site.ts`, not inline in components.
- Verify layout changes structurally (geometry via browser JS) if screenshots fail.
