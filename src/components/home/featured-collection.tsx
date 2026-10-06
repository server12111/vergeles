import Image from "next/image";
import Link from "next/link";
import { collections, formatPrice, products } from "@/lib/catalog";
import { Reveal } from "../reveal";

export function FeaturedCollection() {
  const form = collections[0];
  const items = products.filter((p) => p.collection === form.slug).slice(0, 4);

  return (
    <section className="bg-sand" aria-labelledby="featured-title">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:gap-6 md:py-28">
        <Reveal variant="image" className="relative md:col-span-7">
          <div className="relative aspect-[4/5] md:aspect-[5/6]">
            <Image
              src={form.cover}
              alt="Светлое арочное пространство с низким диваном — коллекция FORM"
              fill
              sizes="(min-width:768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col md:col-span-4 md:col-start-9">
          <Reveal className="flex items-center justify-between border-b border-ink/15 pb-4 text-[12px] tabular-nums">
            <span>
              {form.index} <span className="text-muted">/ 04</span>
            </span>
            <span className="text-muted">{form.year}</span>
          </Reveal>

          <Reveal delay={100} className="mt-10 md:mt-auto">
            <p className="eyebrow">Коллекция</p>
            <h2 id="featured-title" className="display mt-5 text-[clamp(2.5rem,1.8rem+2.4vw,4rem)]">
              FORM / 01
            </h2>
            <p className="mt-6 text-[17px] leading-[1.55] text-graphite">«{form.lead}»</p>
            <p className="mt-4 text-[14px] leading-[1.6] text-muted">{form.text}</p>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <ul className="border-t border-ink/15 text-[13px]">
              {items.map((p) => (
                <li key={p.slug} className="border-b border-ink/15">
                  <Link href={`/product/${p.slug}`} className="group flex items-baseline justify-between py-3">
                    <span className="tracking-[0.06em]">{p.name}</span>
                    <span className="flex items-baseline gap-3 text-muted tabular-nums">
                      от {formatPrice(p.price)}
                      <span className="arrow text-ink">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/collections#form" className="btn btn-dark mt-8 w-full md:w-auto">
              Смотреть коллекцию <span className="arrow">→</span>
            </Link>
          </Reveal>

          <Reveal delay={240} className="mt-10 md:mt-14">
            <ul className="flex gap-6 text-[12px] text-muted">
              {collections.slice(1).map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections#${c.slug}`} className="link-underline">
                    {c.index} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
