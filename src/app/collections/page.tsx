import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { collections, formatPrice, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Коллекции",
  description:
    "FORM, PLANE, SOFT и ATELIER — четыре коллекции VERGELES: геометрия, точные плоскости, мягкая мебель и предметы ручной сборки.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Коллекции" }]} eyebrow="04 коллекции · 2023–2026" title="Коллекции">
        <p>
          Мы не выпускаем сезонные линейки. Коллекция появляется, когда у нас есть идея, которую можно
          развивать несколько лет — и предметы из разных коллекций спокойно стоят рядом.
        </p>
      </PageIntro>

      <div className="container-x pb-24 md:pb-36">
        {collections.map((c, i) => {
          const items = products.filter((p) => p.collection === c.slug);
          const flip = i % 2 === 1;
          return (
            <section
              key={c.slug}
              id={c.slug}
              className="grid scroll-mt-24 gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-6 md:py-24"
              aria-labelledby={`col-${c.slug}`}
            >
              <Reveal
                variant="image"
                className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
              >
                <div className={`relative bg-sand ${i === 0 ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[4/3]"}`}>
                  <Image src={c.cover} alt={`Коллекция ${c.name}`} fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
              <div className={`flex flex-col md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                <Reveal className="flex justify-between border-b border-line pb-4 text-[12px] tabular-nums">
                  <span>
                    {c.index} <span className="text-muted">/ 04</span>
                  </span>
                  <span className="text-muted">{c.year}</span>
                </Reveal>
                <Reveal delay={100} className="mt-8 md:mt-auto">
                  <h2 id={`col-${c.slug}`} className="display text-[clamp(2.25rem,1.6rem+2vw,3.5rem)]">
                    {c.name} / {c.index}
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.55] text-graphite">«{c.lead}»</p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted">{c.text}</p>
                </Reveal>
                <Reveal delay={160} className="mt-8">
                  <ul className="border-t border-line text-[13px]">
                    {items.map((p) => (
                      <li key={p.slug} className="border-b border-line">
                        <Link href={`/product/${p.slug}`} className="group flex items-baseline justify-between py-3">
                          <span className="tracking-[0.06em]">{p.name}</span>
                          <span className="flex gap-3 text-muted tabular-nums">
                            от {formatPrice(p.price)} <span className="arrow text-ink">→</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
      <CtaSection />
    </>
  );
}
