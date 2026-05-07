"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    // Standard reveal — fires soon after the element enters the viewport.
    const standard = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            standard.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>(".fade-up, .animate-bt-wipe-left, .animate-bt-wipe-up").forEach((el) => standard.observe(el));

    // Mid-scroll reveal — only fires once the element crosses the middle of the viewport.
    const mid = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            mid.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-50% 0px -10% 0px", threshold: 0 }
    );
    document.querySelectorAll<HTMLElement>(".fade-up-mid").forEach((el) => mid.observe(el));

    return () => {
      standard.disconnect();
      mid.disconnect();
    };
  }, []);

  return null;
}
