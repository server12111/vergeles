"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product, type Swatch } from "@/lib/catalog";
import { HeartIcon, MinusIcon, PlusIcon } from "../icons";
import { useStore } from "../store";

function SwatchPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Swatch[];
  value: string;
  onChange: (id: string) => void;
}) {
  const current = options.find((o) => o.id === value);
  return (
    <fieldset className="border-t border-line py-5">
      <legend className="sr-only">{label}</legend>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="text-muted">{label}</span>
        <span>{current?.name}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <label
              key={o.id}
              className={`relative flex h-11 w-11 cursor-pointer items-center justify-center border transition-colors duration-300 ${
                selected ? "border-ink" : "border-transparent hover:border-line"
              }`}
              title={o.name}
            >
              <input
                type="radio"
                name={label}
                value={o.id}
                checked={selected}
                onChange={() => onChange(o.id)}
                className="peer sr-only"
              />
              <span className="block h-8 w-8 ring-1 ring-inset ring-ink/10" style={{ background: o.hex }} />
              <span className="sr-only">{o.name}</span>
              <span className="pointer-events-none absolute inset-0 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist, hydrated } = useStore();
  const [fabric, setFabric] = useState(product.fabrics[0]?.id ?? "");
  const [finish, setFinish] = useState(product.finishes[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const saved = hydrated && inWishlist(product.slug);

  const fabricLabel = product.fabrics.some((f) => f.id.startsWith("leather")) ? "Кожа" : "Ткань";
  const finishLabel = product.finishes.some((f) => f.id.startsWith("steel")) ? "Металл" : "Цвет дерева";

  return (
    <div>
      {product.fabrics.length > 0 && (
        <SwatchPicker label={fabricLabel} options={product.fabrics} value={fabric} onChange={setFabric} />
      )}
      {product.finishes.length > 0 && (
        <SwatchPicker label={finishLabel} options={product.finishes} value={finish} onChange={setFinish} />
      )}

      <div className="flex items-center justify-between border-y border-line py-3">
        <span className="text-[13px] text-muted">Количество</span>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center disabled:opacity-30"
            disabled={qty <= 1}
            aria-label="Уменьшить количество"
          >
            <MinusIcon size={16} />
          </button>
          <span className="w-8 text-center text-[15px] tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Увеличить количество"
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          className="btn btn-dark w-full justify-between"
          onClick={() =>
            addToCart(
              {
                slug: product.slug,
                fabric: product.fabrics.find((f) => f.id === fabric)?.name,
                finish: product.finishes.find((f) => f.id === finish)?.name,
              },
              qty,
            )
          }
        >
          <span>Добавить в корзину</span>
          <span className="tabular-nums">{formatPrice(product.price * qty)}</span>
        </button>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Link href={`/contacts?product=${product.slug}#consultation`} className="btn btn-outline w-full">
            Получить консультацию
          </Link>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            aria-pressed={saved}
            aria-label={saved ? "Убрать из избранного" : "Добавить в избранное"}
            className="btn btn-outline w-12 px-0"
          >
            <HeartIcon size={18} filled={saved} />
          </button>
        </div>
      </div>

      <ul className="mt-6 space-y-1.5 text-[12px] text-muted">
        <li>Изготовление {product.leadTime} · оплата 50% при заказе</li>
        <li>Бесплатная доставка по Москве и Санкт-Петербургу</li>
        <li>Образцы тканей и дерева — бесплатно, за 3 дня</li>
      </ul>
    </div>
  );
}
