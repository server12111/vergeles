"use client";

import { useState } from "react";
import { reviews } from "@/lib/content";
import { Reveal } from "../reveal";

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section className="bg-sand py-20 md:py-32" aria-labelledby="reviews-title">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-3">
          <p id="reviews-title" className="eyebrow">
            Отзывы
          </p>
          <p className="mt-5 max-w-[15rem] text-[13px] leading-[1.6] text-muted">
            4,9 из 5 — средняя оценка по 312 отзывам покупателей за 2024–2026 годы.
          </p>
        </Reveal>

        <div className="md:col-span-8 md:col-start-5">
          <Reveal>
            <figure key={active} className="fade-in min-h-[16rem] md:min-h-[14rem]">
              <blockquote className="font-display text-[clamp(1.5rem,1.05rem+1.9vw,2.75rem)] leading-[1.18] tracking-[-0.022em]">
                <span aria-hidden className="mr-1 text-muted">
                  «
                </span>
                {review.quote}
                <span aria-hidden className="text-muted">
                  »
                </span>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[14px]">
                <span>— {review.name}, {review.city}</span>
                <span className="text-[12px] uppercase tracking-[0.12em] text-muted">{review.item}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-10 grid grid-cols-2 border-t border-ink/15 md:mt-12 md:grid-cols-4" role="tablist" aria-label="Выбрать отзыв">
              {reviews.map((r, i) => (
                <li key={r.name} className="border-b border-ink/15 md:border-b-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`relative w-full py-4 pr-3 text-left text-[13px] transition-colors duration-300 ${
                      i === active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-[-1px] h-px bg-ink transition-[width] duration-700 ease-[var(--ease-editorial)] ${
                        i === active ? "w-full" : "w-0"
                      }`}
                    />
                    <span className="mr-3 tabular-nums">0{i + 1}</span>
                    {r.name}
                    <span className="block pl-[1.85rem] text-[12px] text-muted">{r.city}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
