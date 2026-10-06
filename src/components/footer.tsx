import Link from "next/link";
import { Mark } from "./logo";
import { site } from "@/lib/content";
import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "Навигация",
    links: [
      { href: "/catalog", label: "Каталог" },
      { href: "/collections", label: "Коллекции" },
      { href: "/about", label: "О бренде" },
      { href: "/delivery", label: "Доставка" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Поддержка",
    links: [
      { href: site.telegram, label: "Telegram", external: true },
      { href: `mailto:${site.email}`, label: "Email", external: true },
      { href: site.whatsapp, label: "WhatsApp", external: true },
    ],
  },
  {
    title: "Информация",
    links: [
      { href: "/legal/privacy", label: "Политика конфиденциальности" },
      { href: "/legal/terms", label: "Условия покупки" },
      { href: "/legal/returns", label: "Доставка и возврат" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-sand text-ink">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-12 md:gap-6">
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <p className="max-w-sm font-display text-[22px] leading-[1.25] tracking-[-0.015em]">
              Новые коллекции, образцы тканей и закрытые показы в шоуруме — раз в месяц.
            </p>
            <NewsletterForm />
          </div>

          {columns.map((col, i) => (
            <div
              key={col.title}
              className={`md:col-span-4 lg:col-span-2 ${i === 0 ? "lg:col-start-7" : ""}`}
            >
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-2.5 text-[14px]">
                {col.links.map((l) =>
                  "external" in l && l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="link-underline">
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-6 text-[13px] text-muted md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="text-ink">Шоурум</p>
            <p>{site.showroom}</p>
            <p>{site.hours}</p>
          </div>
          <div className="md:col-span-4 lg:col-span-4 lg:col-start-7">
            <a href={site.phoneHref} className="text-ink">
              {site.phone}
            </a>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 overflow-hidden pb-6 md:mt-20">
          <p
            aria-hidden
            className="wordmark select-none whitespace-nowrap text-[clamp(2.75rem,15.6vw,18.5rem)] leading-[0.8] tracking-[0.1em]"
          >
            Vergeles
          </p>
        </div>
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Mark className="h-3 w-auto text-ink" />© 2026 VERGELES
          </p>
          <p>ООО «Вергелес Мебель» · ИНН 7704519382</p>
        </div>
      </div>
    </footer>
  );
}
