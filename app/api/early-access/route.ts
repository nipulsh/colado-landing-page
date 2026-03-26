import { NextResponse } from "next/server";

const SHEETS_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();

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
    phone: phone.trim(),
  };

  if (!SHEETS_URL) {
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

  try {
    const res = await fetch(SHEETS_URL, {
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
