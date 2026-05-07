"use client";

import { useRef, useState } from "react";

const TO_EMAIL = "blazetech.dev@gmail.com";

type Status =
  | { kind: "idle" }
  | { kind: "opening"; messageText: string }
  | { kind: "success" }
  | { kind: "fallback"; messageText: string; copied: boolean };

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fallbackTimer = useRef<number | null>(null);

  function buildMessageText(data: FormData) {
    return (
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n` +
      `Phone: ${data.get("phone") || ""}\n` +
      `Monthly bill: ${data.get("bill")}\n\n` +
      (data.get("message") || "")
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const messageText = buildMessageText(data);
    const subject = encodeURIComponent("Solar quote request from " + (data.get("name") || "website"));
    const body = encodeURIComponent(messageText);

    setStatus({ kind: "opening", messageText });

    // If a mail handler exists, the page loses focus / becomes hidden once
    // it opens. If neither happens within ~1.5s, assume mailto failed and
    // surface a copy-paste fallback so the inquiry isn't lost.
    if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    const onAway = () => {
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
      setStatus({ kind: "success" });
      window.removeEventListener("blur", onAway);
      document.removeEventListener("visibilitychange", onAway);
    };
    window.addEventListener("blur", onAway, { once: true });
    document.addEventListener("visibilitychange", onAway, { once: true });
    fallbackTimer.current = window.setTimeout(() => {
      window.removeEventListener("blur", onAway);
      document.removeEventListener("visibilitychange", onAway);
      setStatus({ kind: "fallback", messageText, copied: false });
    }, 1500);

    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function copyFallback(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ kind: "fallback", messageText: text, copied: true });
    } catch {
      // Clipboard API can fail on http or restricted contexts — fall through.
    }
  }

  const inputCls =
    "mt-1 w-full rounded-lg border-2 border-on-surface-variant/25 bg-surface-container-lowest px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 hover:border-primary/40 hover:bg-surface focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200";
  const labelCls = "text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5";

  return (
    <form
      onSubmit={onSubmit}
      action={`mailto:${TO_EMAIL}`}
      method="post"
      encType="text/plain"
      className="fade-up bg-surface rounded-xl p-8 shadow-sm border border-surface-container-high flex flex-col gap-stack-md"
    >
      <div>
        <label className={labelCls} htmlFor="name">Full Name</label>
        <input id="name" name="name" required type="text" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" name="email" required type="email" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="bill">Average Monthly Bill (PHP)</label>
        <select id="bill" name="bill" className={inputCls} defaultValue="₱5,000 – ₱10,000">
          <option>Below ₱5,000</option>
          <option>₱5,000 – ₱10,000</option>
          <option>₱10,000 – ₱20,000</option>
          <option>Above ₱20,000</option>
        </select>
      </div>
      <div>
        <label className={labelCls} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your property or what you're looking for…"
          className={inputCls}
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white text-base font-bold uppercase tracking-wider rounded-full hover:bg-orange-500 transition-all duration-200 shadow-xl shadow-orange-600/50 hover:shadow-2xl hover:shadow-orange-600/60 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0.5 active:shadow-md ring-1 ring-orange-700/20"
      >
        Send Inquiry <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>

      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status.kind === "opening" && (
          <p className="text-sm text-on-surface-variant">Opening your email app…</p>
        )}
        {status.kind === "success" && (
          <p className="text-sm text-emerald-700">Email app opened — finish sending and we&apos;ll reply within one business day.</p>
        )}
        {status.kind === "fallback" && (
          <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 text-sm text-on-surface flex flex-col gap-3">
            <p className="font-semibold text-orange-700">
              Couldn&apos;t open an email app. Send the message yourself so it reaches us:
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${TO_EMAIL}?subject=Solar%20quote%20request&body=${encodeURIComponent(status.messageText)}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-500"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Email {TO_EMAIL}
              </a>
              <a
                href="tel:+639604365857"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 hover:bg-orange-100"
              >
                <span className="material-symbols-outlined text-base">call</span>
                Call +63 960 436 5857
              </a>
              <button
                type="button"
                onClick={() => copyFallback(status.messageText)}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-on-surface-variant/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:border-primary"
              >
                <span className="material-symbols-outlined text-base">{status.copied ? "check" : "content_copy"}</span>
                {status.copied ? "Copied" : "Copy message"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
