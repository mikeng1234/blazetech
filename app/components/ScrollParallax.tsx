"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Drift relative to scroll. Positive = moves opposite to scroll. Try 0.1–0.4. */
  speed?: number;
  /** Lerp factor per frame (0–1). Lower = more inertia. Try 0.06–0.18. */
  ease?: number;
};

export default function ScrollParallax({
  children,
  className = "",
  speed = 0.2,
  ease = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let raf = 0;
    let running = false;

    const computeTarget = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2 - current;
      target = -(elementCenter - viewportCenter) * speed;
    };

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.05) {
        current = target;
        el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
        running = false;
        raf = 0;
        return;
      }
      current += delta * ease;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      start();
    };

    computeTarget();
    el.style.transform = `translate3d(0, ${target.toFixed(2)}px, 0)`;
    current = target;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [speed, ease]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
