"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { BagIcon, HeartIcon, SearchIcon } from "./icons";
import { useStore } from "./store";
import { nav, site } from "@/lib/content";
import { categories } from "@/lib/catalog";

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setSearchOpen, hydrated } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? "border-b border-line/80 bg-paper/95 backdrop-blur-[6px]"
            : "border-b border-transparent bg-ivory"
        }`}
      >
        <div className="container-x grid h-14 grid-cols-[1fr_auto] items-center md:h-16 lg:grid-cols-[1fr_auto_1fr]">
          <Logo />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-10 text-[13px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`link-underline ${isActive(item.href) ? "bg-[length:100%_1px]" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 px-2 text-[13px] md:px-3"
              aria-label="Поиск"
            >
              <SearchIcon size={18} />
              <span className="hidden xl:inline">Поиск</span>
            </button>
            <Link
              href="/wishlist"
              className="relative hidden h-10 items-center gap-2 px-3 text-[13px] sm:flex"
              aria-label={`Избранное${hydrated && wishlist.length ? `, ${wishlist.length}` : ""}`}
            >
              <HeartIcon size={18} />
              <span className="hidden xl:inline">Избранное</span>
              {hydrated && wishlist.length > 0 && (
                <span className="tabular-nums text-muted">{wishlist.length}</span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative flex h-10 items-center gap-2 px-2 text-[13px] md:px-3"
              aria-label={`Корзина${hydrated && cartCount ? `, ${cartCount}` : ""}`}
            >
              <BagIcon size={18} />
              <span className="hidden xl:inline">Корзина</span>
              {hydrated && cartCount > 0 && (
                <span className="tabular-nums text-muted">{cartCount}</span>
              )}
            </Link>
            <button
              type="button"
              className="-mr-2 flex h-10 items-center gap-2 pl-3 pr-2 text-[13px] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span>{menuOpen ? "Закрыть" : "Меню"}</span>
              <span className="relative block h-[9px] w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${
                    menuOpen ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-14 z-30 overflow-y-auto bg-paper transition-[opacity,visibility,transform] duration-500 ease-[var(--ease-editorial)] md:top-16 lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="container-x flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-line">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-line transition-[opacity,transform] duration-500 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className="flex items-baseline justify-between py-4 font-display text-[28px] tracking-[-0.02em]"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                  <span className="eyebrow">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 text-[15px]">
            <p className="eyebrow col-span-2 mb-1">Категории</p>
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalog/${c.slug}`} tabIndex={menuOpen ? 0 : -1}>
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-[15px]">
            <Link href="/wishlist" tabIndex={menuOpen ? 0 : -1}>
              Избранное{hydrated && wishlist.length ? ` · ${wishlist.length}` : ""}
            </Link>
            <Link href="/contacts" tabIndex={menuOpen ? 0 : -1}>
              Контакты
            </Link>
          </div>

          <div className="mt-auto pt-12 text-[13px] text-muted">
            <a href={site.phoneHref} className="block text-ink" tabIndex={menuOpen ? 0 : -1}>
              {site.phone}
            </a>
            <p className="mt-1">{site.showroom}</p>
          </div>
        </div>
      </div>
    </>
  );
}
