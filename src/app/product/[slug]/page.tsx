import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/page-intro";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { formatPrice, getCategory, getCollection, getProduct, products } from "@/lib/catalog";
import { site } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name} — ${getCategory(p.category)?.singular.toLowerCase()} от ${formatPrice(p.price)}`;
  return {
    title,
    description: `${p.short} ${p.materials}. ${p.dimensions}. Изготовление ${p.leadTime}, доставка по России и Европе.`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: `${p.name} — VERGELES`,
      description: p.short,
      images: [{ url: p.images[0].src, width: p.images[0].w, height: p.images[0].h, alt: p.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const collection = getCollection(product.collection)!;
  const related = [
    ...products.filter((p) => p.slug !== product.slug && p.collection === product.collection),
    ...products.filter((p) => p.slug !== product.slug && p.collection !== product.collection),
  ].slice(0, 4);

  const details = [
    {
      title: "Описание",
      body: (
        <div className="space-y-4">
          {product.description.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
          <p className="text-muted">
            Дизайн: {product.designer}, {product.year}. Коллекция {collection.name} / {collection.index}.
          </p>
        </div>
      ),
    },
    {
      title: "Материалы",
      body: (
        <ul className="space-y-2">
          {product.materialNotes.map((m) => (
            <li key={m} className="flex gap-3">
              <span className="text-muted">—</span>
              {m}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Доставка",
      body: (
        <div className="space-y-3">
          <p>
            Москва и Санкт-Петербург — бесплатно, с подъёмом на этаж и сборкой. Другие города России —
            транспортной компанией в жёсткой обрешётке, от 3 дней после изготовления.
          </p>
          <p>
            Европа — через наш склад в Белграде, с таможенным оформлением. Стоимость рассчитывается
            индивидуально.{" "}
            <Link href="/delivery#calculator" className="link-static">
              Рассчитать доставку
            </Link>
          </p>
        </div>
      ),
    },
    {
      title: "Гарантия",
      body: (
        <p>
          2 года на каркас, механизмы и фурнитуру. 12 месяцев на обивку. В течение 14 дней после
          доставки можно вернуть предмет стандартной комплектации — подробнее в разделе{" "}
          <Link href="/legal/returns" className="link-static">
            «Доставка и возврат»
          </Link>
          .
        </p>
      ),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: "VERGELES" },
    category: category.name,
    material: product.materials,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.price,
      availability: "https://schema.org/MadeToOrder",
      url: `${site.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <div className="container-x pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { href: "/catalog", label: "Каталог" },
            { href: `/catalog/${category.slug}`, label: category.name },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-x mt-6 grid gap-10 pb-20 md:mt-10 md:pb-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <ProductGallery product={product} />
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between text-[12px] text-muted">
              <Link href={`/collections#${collection.slug}`} className="hover:text-ink">
                {collection.name} / {collection.index}
              </Link>
              {product.isNew && <span className="uppercase tracking-[0.16em] text-ink">Новинка</span>}
            </div>
            <h1 className="display mt-4 text-[clamp(2rem,1.5rem+1.6vw,3rem)]">{product.name}</h1>
            <p className="mt-3 text-[18px] tabular-nums">от {formatPrice(product.price)}</p>
            <p className="mt-6 text-[15px] leading-[1.6] text-graphite">{product.short}</p>

            <dl className="mt-8 grid grid-cols-[6.5rem_1fr] gap-y-2 border-t border-line pt-5 text-[13px]">
              <dt className="text-muted">Материалы</dt>
              <dd>{product.materials}</dd>
              <dt className="text-muted">Размеры</dt>
              <dd className="tabular-nums">{product.dimensions}</dd>
              {product.dimensionNotes && (
                <>
                  <dt className="sr-only">Дополнительно</dt>
                  <dd className="col-start-2 text-[12px] text-muted">{product.dimensionNotes}</dd>
                </>
              )}
            </dl>

            <div className="mt-6">
              <ProductPurchase product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper" aria-label="Подробности">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:gap-6 md:py-24">
          <div className="md:col-span-4">
            <p className="eyebrow">Подробности</p>
            <p className="mt-5 max-w-xs font-display text-[22px] leading-[1.25] tracking-[-0.015em]">
              Всё, что стоит знать до заказа {product.name}.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {details.map((d, i) => (
              <details
                key={d.title}
                open={i === 0}
                className="group border-t border-line last:border-b [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[15px]">
                  <span className="flex items-baseline gap-4">
                    <span className="text-[12px] text-muted tabular-nums">0{i + 1}</span>
                    {d.title}
                  </span>
                  <span
                    aria-hidden
                    className="relative block h-3 w-3 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-3 after:w-px after:bg-ink after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <div className="fade-in max-w-2xl pb-8 pl-8 text-[15px] leading-[1.65] text-graphite">{d.body}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28" aria-labelledby="related-title">
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-title" className="h-sub">
            Вам также понравится
          </h2>
          <Link href="/catalog" className="link-static hidden text-[13px] md:inline">
            Весь каталог →
          </Link>
        </div>
        <ul
          data-reveal-strip
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
          {related.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80} className="w-[64vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <ProductCard product={p} sizes="(min-width:768px) 25vw, 64vw" />
            </Reveal>
          ))}
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
