/**
 * Paste into Google Apps Script (Extensions → Apps Script) bound to your Sheet.
 * Row 1 headers: Name | Email | Phone | Submitted at
 *
 * Deploy → New deployment → Web app
 * - Execute as: Me
 * - Who has access: Anyone
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
    data.phone != null ? data.phone : data.mobile != null ? data.mobile : ""
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
    message: "POST JSON { name, email, phone }",
  });
}

function jsonResponse(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
