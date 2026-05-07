"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * Drop-in replacement for next/image that swaps to a neutral placeholder
 * if the image fails to load (missing file, CDN hiccup) instead of leaving
 * an empty slot that silently breaks layouts.
 */
export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden={props["aria-hidden"] ?? false}
        className={`flex items-center justify-center bg-surface-container-high text-on-surface-variant ${
          (props.className as string) ?? ""
        }`}
        style={props.fill ? { position: "absolute", inset: 0 } : undefined}
      >
        <span className="material-symbols-outlined text-4xl opacity-40">image</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={(e) => {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("[SafeImage] failed to load", props.src);
        }
        setFailed(true);
        props.onError?.(e);
      }}
    />
  );
}
