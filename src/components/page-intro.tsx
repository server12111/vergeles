import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Навигационная цепочка" className="text-[12px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-ink">
            Главная
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  children,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="container-x pb-10 pt-6 md:pb-16 md:pt-10">
      <Breadcrumbs items={crumbs} />
      <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-7">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="h-section">{title}</h1>
        </div>
        {(children || aside) && (
          <div className="text-[15px] leading-[1.6] text-graphite md:col-span-4 md:col-start-9 md:self-end">
            {children}
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
