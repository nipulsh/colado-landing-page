import { NextResponse } from "next/server";

const SHEETS_URL_RAW = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();
/** Production Web App URLs must end in /exec so server-side POST works (/dev requires a logged-in browser). */
const SHEETS_WEB_APP_EXEC =
  /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?[^\s]*)?$/;

function normalizeSheetsUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function isSheetsWebAppExecUrl(url: string): boolean {
  return SHEETS_WEB_APP_EXEC.test(normalizeSheetsUrl(url));
}

function isGoogleHtmlErrorBody(text: string): boolean {
  const t = text.trimStart();
  return t.startsWith("<!DOCTYPE") || t.toLowerCase().startsWith("<html");
}

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function isPhone(s: string) {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const name = raw.name;
  const email = raw.email;
  const phone =
    typeof raw.phone === "string"
      ? raw.phone
      : typeof raw.number === "string"
        ? raw.number
        : typeof raw.mobile === "string"
          ? raw.mobile
          : "";

  if (!isNonEmpty(name)) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!isNonEmpty(email) || !isEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!isNonEmpty(phone) || !isPhone(phone)) {
    return NextResponse.json(
      { error: "Valid phone number is required" },
      { status: 400 }
    );
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    number: phone.trim(),
  };

  /** Local UI testing without a working Web App (never use in production). */
  if (
    process.env.NODE_ENV === "development" &&
    process.env.EARLY_ACCESS_BYPASS_SHEETS === "1"
  ) {
    console.warn(
      "[early-access] EARLY_ACCESS_BYPASS_SHEETS=1 — skipping Google; not saved"
    );
    return NextResponse.json(
      { ok: true, warning: "Sheet sync bypassed (development only)" },
      { status: 200 }
    );
  }

  if (!SHEETS_URL_RAW) {
    console.warn(
      "[early-access] GOOGLE_SHEETS_WEB_APP_URL is not set; submission not sent to Sheets"
    );
    return NextResponse.json(
      {
        ok: true,
        warning: "Sheet sync not configured",
      },
      { status: 200 }
    );
  }

  const sheetsUrl = normalizeSheetsUrl(SHEETS_URL_RAW);

  if (sheetsUrl.includes("/macros/s/") && /\/dev(?:\?|$)/.test(sheetsUrl)) {
    console.error(
      "[early-access] GOOGLE_SHEETS_WEB_APP_URL uses /dev; deploy as Web app and use the /exec URL for server requests"
    );
    return NextResponse.json(
      {
        error:
          "Could not save your signup. Use a Web App deployment URL ending in /exec, not /dev.",
      },
      { status: 502 }
    );
  }

  if (!isSheetsWebAppExecUrl(sheetsUrl)) {
    console.error(
      "[early-access] GOOGLE_SHEETS_WEB_APP_URL must look like https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
    );
    return NextResponse.json(
      {
        error:
          "Could not save your signup. The Google Sheets Web App URL on the server is invalid.",
      },
      { status: 502 }
    );
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      /* non-JSON body */
    }

    if (isGoogleHtmlErrorBody(text)) {
      console.error(
        "[early-access] Sheets returned HTML, status:",
        res.status,
        text.slice(0, 200)
      );
      const authBlocked = res.status === 401 || res.status === 403;
      return NextResponse.json(
        {
          error: authBlocked
            ? 'Could not save your signup. In Apps Script, deploy the Web app with "Who has access: Anyone" (anonymous). Signed-in-only URLs return 401 from the server.'
            : "Could not save your signup. The Google Web App link may be wrong or no longer deployed—redeploy the script and update GOOGLE_SHEETS_WEB_APP_URL.",
        },
        { status: 502 }
      );
    }

    if (!res.ok || parsed.ok === false) {
      console.error("[early-access] Sheets proxy error:", res.status, text);
      return NextResponse.json(
        {
          error:
            parsed.error ??
            "Could not save your signup. Try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[early-access] fetch failed:", e);
    return NextResponse.json(
      { error: "Could not save your signup. Try again later." },
      { status: 502 }
    );
  }
}
