"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/store";
import { formatPrice, getProduct, plural } from "@/lib/catalog";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";

export function CartView() {
  const { cart, cartTotal, cartCount, setQty, removeFromCart, clearCart, hydrated } = useStore();
  const [submitted, setSubmitted] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="container-x min-h-[40vh]" aria-busy="true" />;
  }

  if (submitted) {
    return (
      <section className="container-x pb-28 pt-6">
        <div className="fade-in max-w-xl border-t border-ink pt-8">
          <p className="eyebrow">Заявка {submitted}</p>
          <p className="h-sub mt-5">Спасибо. Менеджер свяжется с вами в течение рабочего дня.</p>
          <p className="mt-4 text-[15px] leading-[1.6] text-graphite">
            Мы уточним ткань, сроки изготовления и доставку и пришлём счёт. Оплата — 50% при заказе,
            остаток перед отгрузкой.
          </p>
          <Link href="/catalog" className="btn btn-dark mt-10">
            Вернуться в каталог
          </Link>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="container-x pb-28 pt-6">
        <div className="max-w-xl border-t border-line pt-8">
          <p className="text-[17px] leading-[1.6] text-graphite">
            В корзине пока ничего нет. Начните с дивана MARA или посмотрите весь каталог.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn btn-dark">
              Перейти в каталог
            </Link>
            <Link href="/product/mara-sofa" className="btn btn-outline">
              MARA SOFA
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const delivery = 0;

  return (
    <section className="container-x grid gap-12 pb-28 pt-2 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-7">
        <div className="flex items-center justify-between border-b border-ink pb-3 text-[12px] text-muted">
          <span>
            {cartCount} {plural(cartCount, ["предмет", "предмета", "предметов"])}
          </span>
          <button type="button" onClick={clearCart} className="hover:text-ink">
            Очистить корзину
          </button>
        </div>
        <ul>
          {cart.map((item) => {
            const p = getProduct(item.slug);
            if (!p) return null;
            return (
              <li key={item.key} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[9rem_1fr] md:gap-6">
                <Link href={`/product/${p.slug}`} className="relative block aspect-[4/5] bg-sand">
                  <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="144px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${p.slug}`} className="text-[14px] tracking-[0.06em]">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-[12px] text-muted">{p.dimensions}</p>
                      {(item.fabric || item.finish) && (
                        <p className="mt-1 text-[12px] text-muted">{[item.fabric, item.finish].filter(Boolean).join(" · ")}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.key)}
                      className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center text-muted hover:text-ink"
                      aria-label={`Удалить ${p.name}`}
                    >
                      <CloseIcon size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
                        aria-label="Уменьшить количество"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="w-6 text-center text-[14px] tabular-nums">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.key, item.qty + 1)}
                        className="flex h-10 w-10 items-center justify-center"
                        aria-label="Увеличить количество"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <p className="text-[14px] tabular-nums">{formatPrice(p.price * item.qty)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-paper p-6 lg:sticky lg:top-24 md:p-8">
          <p className="eyebrow">Ваш заказ</p>
          <dl className="mt-6 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-muted">Предметы</dt>
              <dd className="tabular-nums">{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Доставка</dt>
              <dd>{delivery === 0 ? "Рассчитает менеджер" : formatPrice(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-[16px]">
              <dt>Итого</dt>
              <dd className="tabular-nums">{formatPrice(cartTotal)}</dd>
            </div>
          </dl>

          <form
            className="mt-8 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(`№ V-${String(Date.now()).slice(-6)}`);
              clearCart();
            }}
          >
            <label className="sr-only" htmlFor="cart-name">Имя</label>
            <input id="cart-name" required placeholder="Имя" autoComplete="name" className="field" />
            <label className="sr-only" htmlFor="cart-phone">Телефон</label>
            <input id="cart-phone" required type="tel" placeholder="Телефон" autoComplete="tel" className="field" />
            <label className="sr-only" htmlFor="cart-city">Город</label>
            <input id="cart-city" placeholder="Город доставки" autoComplete="address-level2" className="field" />
            <button type="submit" className="btn btn-dark !mt-8 w-full">
              Оформить заказ
            </button>
            <p className="pt-3 text-[12px] leading-[1.6] text-muted">
              Менеджер подтвердит детали и пришлёт счёт. Нажимая кнопку, вы соглашаетесь с{" "}
              <Link href="/legal/terms" className="underline underline-offset-2">
                условиями покупки
              </Link>
              .
            </p>
          </form>
        </div>
      </aside>
    </section>
  );
}
