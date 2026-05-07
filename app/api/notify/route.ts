import { NextRequest } from "next/server";

// Posts a Discord embed to DISCORD_WEBHOOK_URL whenever the client fires a
// notify event (call, email, maps, quote, facebook, messenger, etc.).
// Webhook URL is server-only — never shipped to the browser.
//
// Add to .env.local (and your hosting env):
//   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

const COLORS: Record<string, number> = {
  call: 0x16a34a,        // green
  email: 0x2563eb,       // blue
  maps: 0xea580c,        // orange
  quote: 0xe25500,       // brand orange
  facebook: 0x1877f2,    // facebook blue
  messenger: 0x0084ff,   // messenger blue
  default: 0x64748b,     // slate
};

export async function POST(req: NextRequest) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) {
    return Response.json({ ok: false, reason: "DISCORD_WEBHOOK_URL not configured" }, { status: 503 });
  }

  let body: { event?: string; meta?: Record<string, unknown> } = {};
  try {
    body = await req.json();
  } catch {
    // sendBeacon ships a Blob — try parsing text as JSON if .json() fails.
    try {
      const text = await req.text();
      body = JSON.parse(text);
    } catch {
      return Response.json({ ok: false, reason: "invalid body" }, { status: 400 });
    }
  }

  const event = String(body.event ?? "unknown").slice(0, 60);
  const meta = body.meta ?? {};
  const referer = req.headers.get("referer") ?? "(direct)";
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 200);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "(hidden)";

  const fields = [
    { name: "Page", value: referer.slice(0, 1000), inline: false },
    { name: "IP", value: ip, inline: true },
  ];
  for (const [k, v] of Object.entries(meta)) {
    fields.push({ name: String(k).slice(0, 60), value: String(v).slice(0, 300), inline: true });
  }

  const payload = {
    username: "Blaze Tech site",
    embeds: [
      {
        title: `🔔 Visitor action: ${event}`,
        color: COLORS[event] ?? COLORS.default,
        timestamp: new Date().toISOString(),
        fields,
        footer: { text: ua },
      },
    ],
  };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
