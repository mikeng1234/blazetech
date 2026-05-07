"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const COVERS = [5, 6, 7, 9, 10, 11].map((n) => `/cover${n}.png`);
const INTERVAL_MS = 8000;

export default function HeroCover() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % COVERS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {COVERS.map((src, i) => {
        const active = i === index;
        return (
          <Image
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
