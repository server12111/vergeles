"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";
import { getProduct } from "@/lib/catalog";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();

  if (!hydrated) return <div className="container-x min-h-[40vh]" aria-busy="true" />;

  const items = wishlist.map((s) => getProduct(s)).filter((p) => p !== undefined);

  if (items.length === 0) {
    return (
      <section className="container-x pb-28 pt-6">
        <div className="max-w-xl border-t border-line pt-8">
          <p className="text-[17px] leading-[1.6] text-graphite">
            Здесь будут предметы, которые вы отметили сердцем. Список хранится в этом браузере.
          </p>
          <Link href="/catalog" className="btn btn-dark mt-10">
            Перейти в каталог
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x pb-28">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 border-t border-line pt-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug} className="fade-in">
            <ProductCard product={p} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
