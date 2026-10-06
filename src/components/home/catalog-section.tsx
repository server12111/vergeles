import Link from "next/link";
import { categories, featuredSlugs, getProduct, productsByCategory } from "@/lib/catalog";
import { ProductCard } from "../product-card";
import { Reveal } from "../reveal";

/* Editorial rhythm: sizes and aspect ratios alternate, never a uniform grid. */
const layout = [
  { cls: "col-span-2 md:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width:768px) 58vw, 100vw" },
  { cls: "col-span-1 md:col-span-4 md:col-start-9 md:mt-32", aspect: "aspect-[3/4]", sizes: "(min-width:768px) 33vw, 50vw" },
  { cls: "col-span-1 md:col-span-4", aspect: "aspect-[3/4]", sizes: "(min-width:768px) 33vw, 50vw" },
  { cls: "col-span-2 md:col-span-7 md:col-start-6 md:mt-20", aspect: "aspect-[3/2]", sizes: "(min-width:768px) 58vw, 100vw" },
  { cls: "col-span-1 md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]", sizes: "(min-width:768px) 42vw, 50vw" },
  { cls: "col-span-1 md:col-span-5 md:col-start-8 md:mt-40", aspect: "aspect-[4/5] md:aspect-[4/3]", sizes: "(min-width:768px) 42vw, 50vw" },
];

export function CatalogSection() {
  const featured = featuredSlugs.map((s) => getProduct(s)!);

  return (
    <section id="catalog" className="container-x pb-24 pt-20 md:pb-36 md:pt-32" aria-labelledby="catalog-title">
      <div className="grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="eyebrow">Каталог</p>
          <h2 id="catalog-title" className="h-section mt-5">
            Коллекция VERGELES
          </h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={120}>
          <p className="max-w-sm text-[16px] leading-[1.55] text-graphite">
            Предметы, которые работают вместе как единое пространство.
          </p>
        </Reveal>
      </div>

      <nav aria-label="Категории" className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 md:mx-0 md:mt-14 md:px-0">
        <ul className="flex min-w-max gap-2 border-b border-line md:min-w-0 md:gap-0">
          {categories.map((c) => (
            <li key={c.slug} className="md:flex-1">
              <Link
                href={`/catalog/${c.slug}`}
                className="group flex items-baseline gap-2 py-4 pr-5 text-[14px] transition-colors md:pr-0"
              >
                <span className="link-underline">{c.name}</span>
                <sup className="text-[10px] text-muted tabular-nums">{productsByCategory(c.slug).length}</sup>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:mt-16 md:grid-cols-12 md:gap-x-6 md:gap-y-16 lg:gap-y-20">
        {featured.map((p, i) => (
          <Reveal key={p.slug} className={layout[i].cls} delay={(i % 2) * 120}>
            <ProductCard product={p} aspect={layout[i].aspect} sizes={layout[i].sizes} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 flex justify-center md:mt-28">
        <Link href="/catalog" className="btn btn-outline">
          Весь каталог · 12 предметов
        </Link>
      </div>
    </section>
  );
}
