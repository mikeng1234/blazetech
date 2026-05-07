"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[App error boundary]", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-gutter bg-surface">
      <div className="max-w-lg text-center flex flex-col items-center gap-stack-md">
        <span className="material-symbols-outlined text-6xl text-orange-600">error</span>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-on-surface">
          Something went wrong loading this page.
        </h1>
        <p className="text-on-surface-variant">
          You can try again, or contact us directly while we look into it.
        </p>
        <div className="flex flex-wrap gap-stack-md justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/40"
          >
            Try again
          </button>
          <a
            href="mailto:blazetech.dev@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-secondary text-secondary text-sm font-bold uppercase tracking-wider rounded-full hover:bg-surface-container-low transition-colors"
          >
            Email us
          </a>
        </div>
      </div>
    </div>
  );
}
