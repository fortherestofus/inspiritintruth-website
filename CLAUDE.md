# Working with Alroy on this repo

## Communication
- Be brief. Lead with the result in 1–3 bullets. No essays — detail only on request.
- Agile: research fast, propose in a few lines, act on go-ahead, commit to main, push.

## Always commit and push
- Commit and `git push origin main` as work completes, without being asked. Never leave a dirty tree.
- Do the same in the FTROU repo.
- **Both sites auto-deploy from a push to `main`** (corrected 2026-08-14; this line used to claim the FTROU repo did not deploy on push). Verified against production minutes after pushing the 18+ legal change: `inspiritintruth.net/privacy/` and `fortherestofus.app/apps/inspiritintruth/privacy/` both served the new copy. Don't tell Alroy to go and deploy something that is already live — curl the live URL for a string you just wrote and check.

## Brand rule — honest over polished
- App screenshots stay authentic: real timestamps, real battery, raw demo text.
- Only swap screenshots you were asked to swap — the process/flow shots are separate from the home, Bible, Discover and Profile ones.
- "We seek God randomly. We don't need to be perfect. We need to be honest."
- Never sanitize screenshots or demo content. Applies here and to the FTROU studio site's ISIT page (`../Claude Code/ForTheRestOfUs`).

## Conventions
- Design tokens mirror the FTROU studio site (see tailwind.config.ts) — keep the two sites reading as one family.
- Copy lives in `lib/content.ts` / `lib/site.ts`, not inline in components.
- Verify layout changes structurally (geometry via browser JS) if screenshots fail.
