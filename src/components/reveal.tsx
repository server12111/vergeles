"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "fade" | "image";
  style?: CSSProperties;
};

/** Adds `is-visible` once the element enters the viewport. Pure CSS does the motion. */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "fade",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    // Inside a horizontally scrolling strip, items off to the side are clipped by the strip
    // and would only appear mid-swipe — observe the strip itself instead.
    const strip = el.closest<HTMLElement>("[data-reveal-strip]");
    const target = strip && strip.scrollWidth > strip.clientWidth ? strip : el;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const base = variant === "image" ? "img-reveal" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
