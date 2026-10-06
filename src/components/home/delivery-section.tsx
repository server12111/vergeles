import Link from "next/link";
import { Reveal } from "../reveal";
import { RouteMap } from "../route-map";

export function DeliverySection() {
  return (
    <section className="border-t border-line bg-paper py-20 md:py-32" aria-labelledby="delivery-title">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col md:col-span-5 lg:col-span-4">
          <Reveal>
            <p className="eyebrow">Доставка</p>
            <h2 id="delivery-title" className="h-section mt-5">
              Доставляем туда, где вы живёте.
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-10 border-t border-line md:mt-14">
            <dl className="text-[14px]">
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                <dt className="font-display text-[19px] tracking-[-0.01em]">Россия</dt>
                <dd className="leading-[1.6] text-graphite">
                  Доставка во все крупные города. Москва и Петербург — с подъёмом и сборкой.
                  <span className="mt-1 block text-[12px] text-muted">от 3 дней со склада</span>
                </dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                <dt className="font-display text-[19px] tracking-[-0.01em]">Европа</dt>
                <dd className="leading-[1.6] text-graphite">
                  Доставка и индивидуальная логистика через склад в Белграде, с таможенным оформлением.
                  <span className="mt-1 block text-[12px] text-muted">от 10 дней, 27 стран</span>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <Link href="/delivery#calculator" className="btn btn-dark">
              Рассчитать доставку <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5">
          <RouteMap className="h-auto w-full text-ink" />
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 border border-ink bg-ivory" /> Склады — Москва и Белград
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" /> Города регулярной доставки
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
