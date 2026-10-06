import Link from "next/link";
import { categories, productsByCategory, products as allProducts, type CategorySlug, type Product } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

export type SortKey = "default" | "price-asc" | "price-desc" | "new";

const sorts: { key: SortKey; label: string }[] = [
  { key: "default", label: "По умолчанию" },
  { key: "new", label: "Новинки" },
  { key: "price-asc", label: "Дешевле" },
  { key: "price-desc", label: "Дороже" },
];

export function sortProducts(list: Product[], sort: SortKey) {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
  if (sort === "new") copy.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.year - a.year);
  return copy;
}

/** Indexes of cards that span two columns, chosen so every row of the grid is filled. */
function wideSlots(n: number, cols: number, extra: number) {
  let count = (cols - (n % cols)) % cols;
  while (count + cols <= extra) count += cols;
  const slots = new Set<number>();
  for (let k = 0; k < count; k++) slots.add(Math.min(n - 1, Math.floor(((k + 0.5) * n) / count)));
  return slots;
}

export function CatalogView({
  products,
  active,
  sort,
  basePath,
}: {
  products: Product[];
  active?: CategorySlug;
  sort: SortKey;
  basePath: string;
}) {
  // Mobile: 2 columns, desktop: 3. Larger lists get a few wide editorial cards for rhythm.
  const n = products.length;
  const mobileWide = wideSlots(n, 2, n >= 6 ? 2 : 0);
  const desktopWide = wideSlots(n, 3, n >= 9 ? 3 : 0);

  return (
    <section className="container-x pb-24 md:pb-36">
      <div className="sticky top-14 z-20 -mx-4 border-y border-line bg-ivory/95 px-4 backdrop-blur-[6px] md:top-16 md:mx-0 md:px-0">
        <div className="flex items-center justify-between gap-6">
          <nav aria-label="Категории" className="no-scrollbar -mx-1 overflow-x-auto">
            <ul className="flex min-w-max items-center text-[13px]">
              <li>
                <Link
                  href="/catalog"
                  className={`block px-1 py-4 pr-5 ${!active ? "text-ink" : "text-muted hover:text-ink"}`}
                  aria-current={!active ? "page" : undefined}
                >
                  Все <sup className="text-[10px] tabular-nums">{allProducts.length}</sup>
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/catalog/${c.slug}`}
                    className={`block py-4 pr-5 ${active === c.slug ? "text-ink" : "text-muted hover:text-ink"}`}
                    aria-current={active === c.slug ? "page" : undefined}
                  >
                    {c.name}{" "}
                    <sup className="text-[10px] tabular-nums">{productsByCategory(c.slug).length}</sup>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="hidden shrink-0 items-center gap-4 text-[12px] lg:flex" aria-label="Сортировка">
            {sorts.map((s) => (
              <li key={s.key}>
                <Link
                  href={s.key === "default" ? basePath : `${basePath}?sort=${s.key}`}
                  scroll={false}
                  className={sort === s.key ? "text-ink" : "text-muted hover:text-ink"}
                  aria-current={sort === s.key ? "true" : undefined}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto text-[12px] lg:hidden">
        {sorts.map((s) => (
          <Link
            key={s.key}
            href={s.key === "default" ? basePath : `${basePath}?sort=${s.key}`}
            scroll={false}
            className={`shrink-0 py-2 ${sort === s.key ? "text-ink underline underline-offset-4" : "text-muted"}`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <ul className="mt-8 grid grid-flow-dense grid-cols-2 gap-x-3 gap-y-10 md:mt-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16">
        {products.map((p, i) => {
          const wideSm = mobileWide.has(i);
          const wideMd = desktopWide.has(i);
          return (
            <Reveal
              as="li"
              key={p.slug}
              delay={(i % 3) * 90}
              className={`${wideSm ? "col-span-2" : ""} ${wideMd ? "md:col-span-2" : "md:col-span-1"}`}
            >
              <ProductCard
                product={p}
                aspect={`${wideSm ? "aspect-[3/2]" : "aspect-[4/5]"} ${wideMd ? "md:aspect-[3/2]" : "md:aspect-[4/5]"}`}
                sizes={wideMd ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 50vw"}
                priority={i < 3}
              />
            </Reveal>
          );
        })}
      </ul>

      {products.length === 0 && (
        <p className="mt-16 text-[15px] text-muted">В этой категории пока нет предметов.</p>
      )}
    </section>
  );
}
