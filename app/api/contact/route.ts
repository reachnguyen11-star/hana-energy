import { NextResponse } from "next/server";

/* Contact form handler.
   Forwards submissions to a Google Apps Script Web App that appends a row to a
   Google Sheet. Set GOOGLE_SHEETS_WEBHOOK_URL (the /exec URL) in the env.
   The Apps Script must accept a JSON POST — see ONBOARDING / README for the
   snippet. Proxying through this route avoids browser CORS and hides the URL. */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  capacity?: string;
  message?: string;
};

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();

  // Minimal validation: need a name and at least one way to reach back.
  if (!name || (!phone && !email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact] GOOGLE_SHEETS_WEBHOOK_URL is not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone: phone ?? "",
        email: email ?? "",
        service: data.service?.trim() ?? "",
        capacity: data.capacity?.trim() ?? "",
        message: data.message?.trim() ?? "",
        submittedAt: new Date().toISOString(),
      }),
      // Apps Script can be slow on cold start; give it room.
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.error("[contact] Google Sheets webhook returned", res.status);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to forward submission", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
