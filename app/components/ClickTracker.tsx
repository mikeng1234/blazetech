"use client";

import { useEffect } from "react";

// Sends a fire-and-forget POST to /api/notify so the user's navigation
// (mailto:, tel:, external link) isn't delayed by our request.
export function notify(event: string, meta?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({ event, meta });
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/notify", blob);
    return;
  }
  fetch("/api/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function classify(href: string): { event: string; meta: Record<string, unknown> } | null {
  if (!href) return null;
  if (href.startsWith("tel:")) return { event: "call", meta: { number: href.slice(4) } };
  if (href.startsWith("mailto:")) return { event: "email", meta: { to: href.slice(7).split("?")[0] } };
  if (href.includes("maps.app.goo.gl") || href.includes("google.com/maps") || href.includes("goo.gl/maps")) {
    return { event: "maps", meta: { url: href } };
  }
  if (href.includes("m.me/")) return { event: "messenger", meta: { url: href } };
  if (href.includes("facebook.com/") || href.includes("fb.com/") || href.includes("fb.me/")) {
    return { event: "facebook", meta: { url: href } };
  }
  return null;
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      const hit = classify(href);
      if (!hit) return;
      notify(hit.event, hit.meta);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
