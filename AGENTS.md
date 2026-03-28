## Learned User Preferences

## Learned Workspace Facts

- The early-access signup API (`POST /api/early-access`) returns HTTP 502 when the Google Sheets web app request fails, returns a non-OK status, or responds with JSON where `ok` is false; it does not by itself mean the Next.js app is unreachable. Check deployment logs for `[early-access]` and verify `GOOGLE_SHEETS_WEB_APP_URL`.
- Early access data sent to the Google web app uses `name`, `email`, and phone in a field named `number`; the API route and Apps Script also accept `phone` or `mobile` as aliases.
