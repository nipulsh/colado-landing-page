/**
 * Paste into Google Apps Script (Extensions → Apps Script) bound to your Sheet.
 * Row 1 headers: Name | Email | Phone (or Number) | Submitted at
 *
 * Deploy → New deployment → Web app
 * - Execute as: Me
 * - Who has access: Anyone  (required — “Only myself” causes 401 HTML for server POSTs)
 *
 * Set in landing-page/.env.local (no spaces around =):
 *   GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/.../exec
 */
function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: "Invalid JSON" });
  }

  var name = (data.name || "").toString().trim();
  var email = (data.email || "").toString().trim();
  var phone = (
    data.number != null
      ? data.number
      : data.phone != null
        ? data.phone
        : data.mobile != null
          ? data.mobile
          : ""
  )
    .toString()
    .trim();

  if (!name || !email || !phone) {
    return jsonResponse({ ok: false, error: "Missing fields" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([name, email, phone, new Date()]);

  return jsonResponse({ ok: true });
}

function doGet() {
  return jsonResponse({
    ok: true,
    message: "POST JSON { name, email, number }",
  });
}

function jsonResponse(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
