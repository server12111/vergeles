import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { MaterialsSection } from "@/components/home/materials-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "О бренде",
  description:
    "VERGELES — мебельный бренд из Москвы. С 2019 года делаем мебель из дуба, ореха, шерсти, льна, кожи и камня в собственной мастерской.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "2019", text: "Первая мастерская на 140 м² в Люберцах. Обеденный стол для друзей-архитекторов становится первым заказом." },
  { year: "2021", text: "Шоурум на Большой Пироговской. В каталоге 14 предметов, команда — 11 человек." },
  { year: "2023", text: "Коллекция FORM. Переезд производства в Подмосковье, 1 800 м² цехов и собственная сушильная камера." },
  { year: "2024", text: "Склад в Белграде и первые регулярные поставки в Европу: Париж, Берлин, Милан, Вена." },
  { year: "2026", text: "Коллекция ATELIER — ограниченная серия из кожи, которую собирают два мастера вручную." },
];

const principles = [
  { title: "Меньше предметов", text: "Мы держим каталог небольшим и развиваем каждую модель годами, а не выпускаем новую каждый сезон." },
  { title: "Честные материалы", text: "Массив там, где на него смотрят и опираются. Никакого пластика под дерево и экокожи под кожу." },
  { title: "Под заказ", text: "Склад готовой мебели нам не нужен: каждый предмет собирается для конкретного дома и конкретного человека." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "О бренде" }]}
        eyebrow="VERGELES · с 2019 года"
        title={<>Мы создаём мебель для пространства, а не просто предметы.</>}
      >
        <p>
          VERGELES объединяет европейскую эстетику, продуманные конструкции и материалы, которые хорошо
          выглядят сегодня и не теряют актуальности со временем.
        </p>
      </PageIntro>

      <section className="container-x">
        <Reveal variant="image">
          <div className="relative aspect-[4/5] bg-sand md:aspect-[21/9]">
            <Image
              src="/images/collection-soft.jpg"
              alt="Светлая гостиная с мебелью VERGELES"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:gap-6 md:py-32">
        <div className="md:col-span-4">
          <p className="eyebrow">Принципы</p>
        </div>
        <div className="grid gap-10 md:col-span-8 md:grid-cols-3 md:gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="border-t border-ink pt-5">
              <h2 className="font-display text-[20px] tracking-[-0.01em]">{p.title}</h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-graphite">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:gap-6 md:py-32">
          <div className="md:col-span-4">
            <p className="eyebrow">История</p>
            <h2 className="h-sub mt-5 max-w-xs">Семь лет, одна мастерская и одна идея.</h2>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 60} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-ink/15 py-6 md:grid-cols-[8rem_1fr]">
                <span className="font-display text-[22px] tracking-[-0.02em] tabular-nums">{t.year}</span>
                <p className="text-[15px] leading-[1.6] text-graphite">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MaterialsSection />
      <ProjectsSection />
      <CtaSection />
    </>
  );
}
