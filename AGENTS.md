## Learned User Preferences

- Terse requests like "push the code" or "push code" mean: stage project changes, commit on `main`, and push to `origin/main` (remote: `nipulsh/colado-landing-page`) without further prompting.
- Never stage `.cursor/` (especially `.cursor/hooks/state/*.json`) in git commits; those are Cursor IDE state, not project code.

## Learned Workspace Facts

- The early-access signup API (`POST /api/early-access`) returns HTTP 502 when the Google Sheets web app request fails, returns a non-OK status, or responds with JSON where `ok` is false; it does not by itself mean the Next.js app is unreachable. Check deployment logs for `[early-access]` and verify `GOOGLE_SHEETS_WEB_APP_URL`.
- Early access data sent to the Google web app uses `name`, `email`, and phone in a field named `number`; the API route and Apps Script also accept `phone` or `mobile` as aliases.
- Stack is Next.js (App Router) + TypeScript + Tailwind; currently on `next` and `eslint-config-next` `16.2.3` (patched for CVE-2026-23869). Deployment target is Vercel (`colado.in`).
- `app/api/early-access/route.ts` validates `GOOGLE_SHEETS_WEB_APP_URL` against `https://script.google.com/macros/s/.../exec`, rejects `/dev` URLs, and treats HTML response bodies (e.g. starting with `<!DOCTYPE`) as a broken/revoked Web App URL rather than a real API error.
- The Google Apps Script source lives at `scripts/google-apps-script-early-access.js`; the deployed Web App must use the `/exec` URL with **Execute as: Me** and **Who has access: Anyone** — otherwise Google returns 401 with an HTML "unable to open the file" page and `/api/early-access` surfaces a 502.
- Setting `EARLY_ACCESS_BYPASS_SHEETS=1` in `.env` makes `/api/early-access` return 200 without calling Google (for local dev); data is NOT written to the sheet while the flag is on. Documented in `.env.example`.
- Workspace runs on Windows PowerShell; bash-style heredocs don't work for commit messages — write the message to a temp file and use `git commit -F <file>`.
- The `browser_resize` MCP tool does not actually constrain the rendered viewport width, so it can't reliably verify mobile responsiveness; use `browser_get_bounding_box` on elements or audit the Tailwind breakpoints directly in code instead.
- `app/globals.css` uses `html, body { overflow-x: clip; min-width: 320px }` to guard against horizontal scroll at narrow widths.
- The landing UI uses a fixed light palette aligned with `colado-ui-designs.pdf` / `colado-cursor-prompt.md` (`#F7F5F0` paper, `#0E0F0C` ink, `#2D5F3F` accent, `#C9502E` priority). There is no `prefers-color-scheme: dark` theme swap — the specimen layout is always paper-on-ink as in the PDF.
