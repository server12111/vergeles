import Link from "next/link";
import { site } from "@/lib/content";
import { Mark } from "./logo";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="bg-espresso text-ivory" aria-labelledby="cta-title">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:gap-6 md:py-32">
        <Reveal className="md:col-span-8">
          <Mark className="h-5 w-auto text-ivory/50" />
          <h2
            id="cta-title"
            className="display mt-10 max-w-[18ch] text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] md:mt-14"
          >
            Найдите мебель, которая останется с вами надолго.
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:mt-14">
            <Link href="/catalog" className="btn btn-light">
              Смотреть каталог
            </Link>
            <Link href="/contacts#consultation" className="btn btn-outline-light">
              Получить консультацию
            </Link>
          </div>
        </Reveal>
        <Reveal delay={160} className="text-[13px] leading-[1.7] text-ivory/60 md:col-span-3 md:col-start-10 md:self-end">
          <p className="text-ivory">Шоурум в Москве</p>
          <p>{site.showroom}</p>
          <p>{site.hours}</p>
          <a href={site.phoneHref} className="mt-4 block text-ivory">
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
