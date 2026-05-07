"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

export default function ProjectsCarousel({ children }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const [translate, setTranslate] = useState(0);

  const firstIndex = children.length > 2 ? 1 : 0;
  const lastIndex = Math.max(firstIndex, children.length - 2);

  // Compute the translateX needed to center the active slide.
  const updateTranslate = (i: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const slide = track.children[i] as HTMLElement | undefined;
    if (!slide) return;
    const offset = slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2;
    setTranslate(-offset);
  };

  useEffect(() => {
    updateTranslate(index);
  }, [index]);

  useEffect(() => {
    const onResize = () => updateTranslate(index);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  const go = (next: number) => {
    setIndex(Math.min(Math.max(next, firstIndex), lastIndex));
  };

  return (
    <div className="relative">
      {/* Viewport (no scroll) */}
      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-gutter pb-4 will-change-transform"
          style={{
            transform: `translate3d(${translate}px, 0, 0)`,
            transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {children.map((slide, i) => (
            <div
              key={i}
              className="shrink-0 w-[85%] sm:w-[55%] md:w-[40%] lg:w-[31%]"
              aria-hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => go(index - 1)}
        disabled={index === firstIndex}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface/95 backdrop-blur-sm shadow-lg shadow-black/15 border border-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface hover:scale-105 disabled:opacity-0 disabled:pointer-events-none transition-all"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(index + 1)}
        disabled={index === lastIndex}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface/95 backdrop-blur-sm shadow-lg shadow-black/15 border border-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface hover:scale-105 disabled:opacity-0 disabled:pointer-events-none transition-all"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: lastIndex - firstIndex + 1 }, (_, i) => i + firstIndex).map((slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            aria-label={`Go to project ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            onClick={() => go(slideIndex)}
            className={`h-2 rounded-full transition-all duration-300 ${
              slideIndex === index
                ? "w-8 bg-orange-600"
                : "w-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
