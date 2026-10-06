"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getCategory, type Product } from "@/lib/catalog";
import { ArrowRight, HeartIcon } from "./icons";
import { useStore } from "./store";

type Props = {
  product: Product;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  imageIndex?: number;
  className?: string;
};

export function ProductCard({
  product,
  aspect = "aspect-[4/5]",
  sizes = "(min-width:1024px) 33vw, 50vw",
  priority,
  imageIndex = 0,
  className = "",
}: Props) {
  const { toggleWishlist, inWishlist, hydrated } = useStore();
  const saved = hydrated && inWishlist(product.slug);
  const image = product.images[imageIndex] ?? product.images[0];
  const category = getCategory(product.category);

  return (
    <article className={`group relative ${className}`}>
      <Link href={`/product/${product.slug}`} className="block" aria-label={`${product.name}, от ${formatPrice(product.price)}`}>
        <div className={`hover-zoom relative overflow-hidden bg-sand ${aspect}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 items-center justify-between bg-paper/95 px-4 py-3 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-editorial)] group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <span className="eyebrow text-ink">{category?.singular}</span>
            <ArrowRight size={18} className="arrow" />
          </div>
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[10px] uppercase tracking-[0.16em]">
              Новинка
            </span>
          )}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4 md:mt-4">
          <h3 className="text-[12px] tracking-[0.08em] md:text-[13px]">{product.name}</h3>
          <p className="shrink-0 text-[12px] text-muted tabular-nums md:text-[13px]">
            от {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleWishlist(product.slug)}
        aria-pressed={saved}
        aria-label={saved ? `Убрать ${product.name} из избранного` : `Добавить ${product.name} в избранное`}
        className={`absolute right-2 top-2 flex h-10 w-10 items-center justify-center transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 ${
          saved ? "md:opacity-100" : ""
        }`}
      >
        <HeartIcon size={18} filled={saved} />
      </button>
    </article>
  );
}
