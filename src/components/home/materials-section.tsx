import Image from "next/image";
import { materials } from "@/lib/content";
import { Reveal } from "../reveal";

/* Magazine spread: varied column spans, aspect ratios and vertical offsets on desktop;
   a swipeable strip on mobile. */
const spread = [
  { cls: "md:col-span-5", aspect: "md:aspect-[4/5]" },
  { cls: "md:col-span-3 md:mt-40", aspect: "md:aspect-[3/4]" },
  { cls: "md:col-span-4 md:mt-16", aspect: "md:aspect-square" },
  { cls: "md:col-span-4 md:col-start-2 md:mt-16", aspect: "md:aspect-[4/5]" },
  { cls: "md:col-span-3 md:mt-8", aspect: "md:aspect-square" },
  { cls: "md:col-span-4 md:mt-28", aspect: "md:aspect-[3/4]" },
];

export function MaterialsSection() {
  return (
    <section className="bg-paper py-20 md:py-32" aria-labelledby="materials-title">
      <div className="container-x">
        <div className="grid gap-6 border-b border-line pb-10 md:grid-cols-12 md:pb-14">
          <Reveal className="md:col-span-6">
            <p className="eyebrow">Материалы</p>
            <h2 id="materials-title" className="h-section mt-5">
              Материалы имеют
              <br className="hidden md:block" /> значение.
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={120}>
            <p className="text-[15px] leading-[1.6] text-graphite">
              Мы работаем с шестью материалами и знаем поставщика каждого из них. Образцы тканей,
              шпона и камня отправляем бесплатно — по России и в Европу.
            </p>
          </Reveal>
        </div>

        <div
          data-reveal-strip
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:mx-0 md:mt-16 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:overflow-visible md:px-0">
          {materials.map((m, i) => (
            <Reveal
              key={m.id}
              as="figure"
              delay={(i % 3) * 100}
              className={`w-[76vw] shrink-0 snap-start sm:w-[46vw] md:w-auto ${spread[i].cls}`}
            >
              <Reveal variant="image" delay={(i % 3) * 100}>
                <div className={`relative aspect-[4/5] bg-sand ${spread[i].aspect}`}>
                  <Image
                    src={m.image}
                    alt={`${m.name} — фактура крупным планом`}
                    fill
                    sizes="(min-width:768px) 40vw, 76vw"
                    className="object-cover"
                    style={{ objectPosition: m.position }}
                  />
                </div>
              </Reveal>
              <figcaption className="mt-4 grid grid-cols-[2.25rem_1fr] gap-y-1 text-[13px]">
                <span className="text-muted tabular-nums">0{i + 1}</span>
                <span className="font-display text-[19px] leading-tight tracking-[-0.01em]">{m.name}</span>
                <span className="col-start-2 text-[12px] text-muted">{m.origin}</span>
                <span className="col-start-2 mt-2 max-w-xs leading-[1.6] text-graphite">{m.text}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
