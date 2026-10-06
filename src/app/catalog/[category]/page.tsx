import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog-view";
import { Breadcrumbs } from "@/components/page-intro";
import { CtaSection } from "@/components/cta-section";
import { categories, getCategory, plural, productsByCategory, type CategorySlug } from "@/lib/catalog";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.name} VERGELES. ${c.description}`,
    alternates: { canonical: `/catalog/${c.slug}` },
    openGraph: { images: [{ url: c.cover }] },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const list = productsByCategory(c.slug as CategorySlug);

  return (
    <>
      <section className="container-x pb-10 pt-6 md:pb-16 md:pt-10">
        <Breadcrumbs items={[{ href: "/catalog", label: "Каталог" }, { label: c.name }]} />
        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col md:col-span-5">
            <p className="eyebrow">
              {String(categories.indexOf(c) + 1).padStart(2, "0")} / 06 · {list.length}{" "}
              {plural(list.length, ["предмет", "предмета", "предметов"])}
            </p>
            <h1 className="h-section mt-5">{c.name}</h1>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.6] text-graphite md:mt-auto">{c.description}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand md:col-span-7 md:aspect-[2/1]">
            <Image
              src={c.cover}
              alt={c.name}
              fill
              priority
              sizes="(min-width:768px) 58vw, 100vw"
              className="hero-img object-cover"
            />
          </div>
        </div>
      </section>
      <CatalogView products={list} active={c.slug} />
      <CtaSection />
    </>
  );
}
