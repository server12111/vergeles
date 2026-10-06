import Image from "next/image";
import { projects } from "@/lib/content";
import { Reveal } from "../reveal";

const frames = [
  { cls: "md:col-span-8", aspect: "aspect-[4/3] md:aspect-[3/2]", sizes: "(min-width:768px) 66vw, 100vw" },
  { cls: "md:col-span-4 md:mt-48", aspect: "aspect-[4/5]", sizes: "(min-width:768px) 33vw, 100vw" },
  { cls: "md:col-span-5 md:col-start-2 md:mt-10", aspect: "aspect-[4/5]", sizes: "(min-width:768px) 42vw, 100vw" },
  { cls: "md:col-span-5 md:col-start-8 md:mt-56", aspect: "aspect-[4/3]", sizes: "(min-width:768px) 42vw, 100vw" },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-ivory pb-20 md:pb-32" aria-labelledby="projects-title">
      <div className="container-x">
        <div className="grid gap-6 border-t border-line pt-16 md:grid-cols-12 md:pt-24">
          <Reveal className="md:col-span-6">
            <p className="eyebrow">Проекты</p>
            <h2 id="projects-title" className="h-section mt-5">
              Пространства VERGELES
            </h2>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={120}>
            <p className="text-[15px] leading-[1.6] text-graphite">
              Квартиры и дома, которые наши клиенты и архитекторы собрали за последние два года.
              Дизайнерам — отдельные условия и образцы.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-y-14 md:mt-20 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {projects.map((p, i) => (
            <Reveal as="figure" key={p.slug} className={frames[i].cls}>
              <Reveal variant="image">
                <div className={`relative bg-sand ${frames[i].aspect}`}>
                  <Image
                    src={p.image}
                    alt={`${p.city} — интерьер с мебелью VERGELES`}
                    fill
                    sizes={frames[i].sizes}
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <figcaption className="mt-4 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-y-1 text-[13px]">
                <span className="text-muted tabular-nums">0{i + 1}</span>
                <span className="font-display text-[18px] tracking-[-0.01em]">{p.city}</span>
                <span className="text-[12px] text-muted tabular-nums">{p.year}</span>
                <span className="col-start-2 col-end-4 text-muted">
                  {p.place} · {p.area} · {p.studio}
                </span>
                <span className="col-start-2 col-end-4 mt-1 text-[11px] uppercase tracking-[0.12em] text-graphite">
                  {p.pieces.join(" · ")}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
