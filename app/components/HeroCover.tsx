"use client";

import { useEffect, useRef, useState } from "react";
import SafeImage from "./SafeImage";

const COVERS = [5, 6, 7, 9, 10, 11].map((n) => `/cover${n}.png`);
const INTERVAL_MS = 8000;

export default function HeroCover() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % COVERS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {COVERS.map((src, i) => {
        const active = i === index;
        return (
          <SafeImage
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            fill
            priority={i === 0}
            sizes="100vw"
            style={{
              opacity: active ? 1 : 0,
              transition: "opacity 3000ms ease-in-out",
            }}
            className="dolly object-cover object-[50%_70%]"
          />
        );
      })}
    </div>
  );
}
