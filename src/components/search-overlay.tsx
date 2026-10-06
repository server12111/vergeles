"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, formatPrice, getCategory, products } from "@/lib/catalog";
import { CloseIcon, SearchIcon } from "./icons";
import { useStore } from "./store";

const normalize = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname, setSearchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return products.filter((p) => {
      const hay = normalize(
        [
          p.name,
          p.short,
          p.materials,
          ...p.materialNotes,
          ...p.description,
          getCategory(p.category)?.name,
          p.collection,
        ].join(" "),
      );
      return q.split(/\s+/).every((part) => hay.includes(part));
    });
  }, [query]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по каталогу"
      className={`fixed inset-0 z-50 transition-[visibility] duration-500 ${
        searchOpen ? "visible" : "invisible"
      }`}
    >
      <button
        type="button"
        aria-label="Закрыть поиск"
        tabIndex={-1}
        onClick={() => setSearchOpen(false)}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-500 ${
          searchOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative max-h-[100svh] overflow-y-auto bg-paper transition-transform duration-500 ease-[var(--ease-editorial)] ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container-x pb-10 pt-4 md:pb-14 md:pt-6">
          <div className="flex items-center gap-4 border-b border-ink pb-3">
            <SearchIcon size={20} className="shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Диван, дуб, кожа…"
              className="min-w-0 flex-1 bg-transparent py-2 font-display text-2xl tracking-[-0.02em] outline-none placeholder:text-muted/70 md:text-4xl"
              aria-label="Поисковый запрос"
              tabIndex={searchOpen ? 0 : -1}
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center"
              aria-label="Закрыть"
              tabIndex={searchOpen ? 0 : -1}
            >
              <CloseIcon />
            </button>
          </div>

          {!query && (
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_2fr]">
              <p className="eyebrow pt-1">Часто ищут</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/catalog/${c.slug}`}
                      className="link-underline"
                      tabIndex={searchOpen ? 0 : -1}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                {["Кожа", "Дуб", "Шерсть"].map((w) => (
                  <li key={w}>
                    <button
                      type="button"
                      className="link-underline text-muted"
                      onClick={() => setQuery(w)}
                      tabIndex={searchOpen ? 0 : -1}
                    >
                      {w}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && (
            <div className="mt-8">
              <p className="eyebrow mb-6">
                {results.length
                  ? `Найдено: ${results.length}`
                  : "Ничего не нашлось — попробуйте «диван» или «дуб»"}
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/product/${p.slug}`}
                      className="group block"
                      tabIndex={searchOpen ? 0 : -1}
                    >
                      <div className="hover-zoom relative aspect-[4/5] overflow-hidden bg-sand">
                        <Image
                          src={p.images[0].src}
                          alt={p.images[0].alt}
                          fill
                          sizes="(min-width:1280px) 16vw, (min-width:768px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-[13px] tracking-[0.06em]">{p.name}</p>
                      <p className="text-[13px] text-muted">от {formatPrice(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
