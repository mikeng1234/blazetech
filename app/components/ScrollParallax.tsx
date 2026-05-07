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

// ── Shared scroll engine ───────────────────────────────────────────────────
// Every ScrollParallax instance subscribes to the same scroll listener and
// rAF loop. One getBoundingClientRect() per element happens only on resize
// (cached as offsetTop), then per-frame work is pure math + a transform write.

type Subscriber = {
  el: HTMLElement;
  speed: number;
  ease: number;
  offsetTop: number;
  height: number;
  current: number;
  target: number;
};

const subscribers = new Set<Subscriber>();
let raf = 0;
let scrollY = 0;
let viewportH = 0;

function recalcGeometry() {
  for (const s of subscribers) {
    const rect = s.el.getBoundingClientRect();
    // Reverse out the current applied transform so we capture the unshifted offsetTop.
    s.offsetTop = rect.top + window.scrollY - s.current;
    s.height = s.el.offsetHeight;
  }
}

function recomputeTargets() {
  scrollY = window.scrollY;
  viewportH = window.innerHeight;
  for (const s of subscribers) {
    const elementCenter = s.offsetTop + s.height / 2;
    const viewportCenter = scrollY + viewportH / 2;
    s.target = -(elementCenter - viewportCenter) * s.speed;
  }
  ensureLoop();
}

function ensureLoop() {
  if (raf) return;
  const tick = () => {
    let stillMoving = false;
    for (const s of subscribers) {
      const delta = s.target - s.current;
      if (Math.abs(delta) < 0.05) {
        if (s.current !== s.target) {
          s.current = s.target;
          s.el.style.transform = `translate3d(0, ${s.current.toFixed(2)}px, 0)`;
        }
        continue;
      }
      s.current += delta * s.ease;
      s.el.style.transform = `translate3d(0, ${s.current.toFixed(2)}px, 0)`;
      stillMoving = true;
    }
    if (stillMoving && subscribers.size > 0) {
      raf = window.requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };
  raf = window.requestAnimationFrame(tick);
}

let listenersAttached = false;
function attachListenersIfNeeded() {
  if (listenersAttached) return;
  listenersAttached = true;
  window.addEventListener("scroll", recomputeTargets, { passive: true });
  window.addEventListener("resize", () => {
    recalcGeometry();
    recomputeTargets();
  });
}

function detachListenersIfEmpty() {
  if (subscribers.size > 0 || !listenersAttached) return;
  window.removeEventListener("scroll", recomputeTargets);
  // resize listener uses an inline function — leaking it is harmless since it no-ops with empty set
}

// ── Component ──────────────────────────────────────────────────────────────

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

    const sub: Subscriber = {
      el,
      speed,
      ease,
      offsetTop: 0,
      height: 0,
      current: 0,
      target: 0,
    };
    const rect = el.getBoundingClientRect();
    sub.offsetTop = rect.top + window.scrollY;
    sub.height = el.offsetHeight;

    subscribers.add(sub);
    attachListenersIfNeeded();
    recomputeTargets();

    return () => {
      subscribers.delete(sub);
      el.style.transform = "";
      detachListenersIfEmpty();
    };
  }, [speed, ease]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
