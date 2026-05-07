"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

export default function ProjectsCarousel({ children }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstIndex = children.length > 2 ? 1 : 0;
  const lastIndex = Math.max(firstIndex, children.length - 2);
  const initialIndex = Math.min(children.length > 1 ? 1 : 0, lastIndex);
  const [index, setIndex] = useState(initialIndex);
  const [translate, setTranslate] = useState(0);

  if (children.length === 0) return null;

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
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Recent projects"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        }
      }}
      className="relative"
    >
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
          {children.map((slide, i) => {
            const inactive = i !== index;
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${i + 1} of ${children.length}`}
                // `inert` removes from a11y tree AND blocks focus/clicks — preferred over aria-hidden,
                // which leaves descendants tabbable and triggers axe violations.
                inert={inactive}
                className={`shrink-0 w-[85%] sm:w-[55%] md:w-[40%] lg:w-[31%] ${
                  inactive ? "pointer-events-none" : ""
                }`}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live region announcing current slide for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing project {index + 1} of {children.length}
      </div>

      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => go(index - 1)}
        disabled={index === firstIndex}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface/95 backdrop-blur-sm shadow-lg shadow-black/15 border border-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(index + 1)}
        disabled={index === lastIndex}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface/95 backdrop-blur-sm shadow-lg shadow-black/15 border border-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
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
