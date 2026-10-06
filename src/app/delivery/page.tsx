import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { RouteMap } from "@/components/route-map";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { DeliveryCalculator } from "./delivery-calculator";

export const metadata: Metadata = {
  title: "Доставка",
  description:
    "Доставка мебели VERGELES по России и Европе: бесплатно по Москве и Санкт-Петербургу, регулярные поставки через склад в Белграде, таможенное оформление.",
  alternates: { canonical: "/delivery" },
};

const steps = [
  { title: "Заказ", text: "Менеджер подтверждает размеры, ткань и сроки. Предоплата 50%." },
  { title: "Изготовление", text: "От 3 до 10 недель. Присылаем фото предмета перед упаковкой." },
  { title: "Упаковка", text: "Жёсткая обрешётка, углы и уголки, влагостойкая плёнка." },
  { title: "Доставка", text: "Согласуем день и интервал. В Москве и Петербурге — подъём и сборка." },
];

export default function DeliveryPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Доставка" }]} eyebrow="Россия · Европа" title="Доставляем туда, где вы живёте.">
        <p>
          Склад и мастерская в Подмосковье обслуживают Россию, склад в Белграде — Европу. Мы сами
          организуем перевозку, страховку и таможенное оформление.
        </p>
      </PageIntro>

      <section className="container-x pb-16 md:pb-24">
        <Reveal className="border-y border-line py-6 md:py-10">
          <RouteMap className="h-auto w-full text-ink" />
        </Reveal>
      </section>

      <section className="container-x grid gap-10 pb-20 md:grid-cols-4 md:gap-6 md:pb-32">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="border-t border-ink pt-5">
            <p className="text-[12px] text-muted tabular-nums">0{i + 1}</p>
            <h2 className="mt-3 font-display text-[20px] tracking-[-0.01em]">{s.title}</h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-graphite">{s.text}</p>
          </Reveal>
        ))}
      </section>

      <section id="calculator" className="scroll-mt-20 bg-sand py-20 md:py-28" aria-labelledby="calc-title">
        <div className="container-x">
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow">Калькулятор</p>
              <h2 id="calc-title" className="h-section mt-5">
                Рассчитать доставку
              </h2>
            </div>
          </div>
          <DeliveryCalculator />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
