import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../reveal";

const facts = [
  { value: "2019", label: "Начало коллекции" },
  { value: "6", label: "Основных категорий" },
  { value: "EU + RU", label: "Доставка" },
  { value: "2 года", label: "Гарантии" },
];

export function AboutSection() {
  return (
    <section className="container-x py-20 md:py-32" aria-labelledby="about-title">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col md:col-span-6 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">О бренде</p>
            <h2 id="about-title" className="h-section mt-5">
              Мы создаём мебель для пространства, а не просто предметы.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 max-w-md space-y-4 text-[16px] leading-[1.6] text-graphite">
            <p>
              VERGELES объединяет европейскую эстетику, продуманные конструкции и материалы, которые
              хорошо выглядят сегодня и не теряют актуальности со временем.
            </p>
            <p className="text-[14px] text-muted">
              Мастерская в Подмосковье, 42 человека в команде. Каждый предмет собирается под конкретный
              заказ и проходит приёмку перед упаковкой.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-8">
            <Link href="/about" className="link-static text-[13px]">
              История бренда →
            </Link>
          </Reveal>

          <Reveal delay={240} className="mt-14 md:mt-auto md:pt-16">
            <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-line py-5 pr-4">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[22px] tracking-[-0.02em]">{f.value}</dd>
                  <dd className="mt-1 text-[12px] text-muted" aria-hidden>
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 lg:col-start-7">
          <Reveal variant="image">
            <div className="relative aspect-[4/5] md:aspect-[5/7]">
              <Image
                src="/images/about-interior.jpg"
                alt="Диван в гостиной в мягком дневном свете"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <p className="mt-3 text-[12px] text-muted">Квартира клиента в Казани, 2025</p>
        </Reveal>
      </div>
    </section>
  );
}
