"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/lib/catalog";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const images = product.images;

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible"
        aria-label={`Фотографии ${product.name}`}
      >
        {images.map((img, i) => {
          const lead = i === 0;
          // On desktop the lead image spans both columns; an odd trailing image does too.
          const span = lead || (i === images.length - 1 && (images.length - 1) % 2 === 1);
          return (
            <figure
              key={img.src}
              className={`relative w-full shrink-0 snap-center bg-sand ${
                span ? "md:col-span-2" : ""
              } aspect-[4/5] ${span ? "md:aspect-[4/3]" : "md:aspect-[4/5]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={lead}
                sizes={span ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 29vw, 100vw"}
                className={`object-cover ${lead ? "fade-in" : ""}`}
              />
            </figure>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between text-[12px] text-muted md:hidden">
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          {images.map((img, i) => (
            <span
              key={img.src}
              className={`h-px w-6 transition-colors duration-300 ${i === index ? "bg-ink" : "bg-line"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
