"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Solar quote request from " + (data.get("name") || "website"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\n` +
        `Email: ${data.get("email")}\n` +
        `Phone: ${data.get("phone") || ""}\n` +
        `Monthly bill: ${data.get("bill")}\n\n` +
        (data.get("message") || "")
    );
    setStatus("Opening your email app… if nothing happens, write us directly at blazetech.dev@gmail.com.");
    window.location.href = `mailto:blazetech.dev@gmail.com?subject=${subject}&body=${body}`;
  }

  const inputCls =
    "mt-1 w-full rounded-lg border-2 border-on-surface-variant/25 bg-surface-container-lowest px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/60 hover:border-primary/40 hover:bg-surface focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200";
  const labelCls = "text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5";

  return (
    <form
      onSubmit={onSubmit}
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
      {status && <p className="text-sm text-on-surface-variant">{status}</p>}
    </form>
  );
}
