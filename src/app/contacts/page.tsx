import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/content";
import { ConsultationForm } from "./consultation-form";

export const metadata: Metadata = {
  title: "Контакты и консультация",
  description: `Шоурум VERGELES: ${site.showroom}. ${site.hours}. Консультация по подбору мебели, образцы материалов, доставка по России и Европе.`,
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {

  const channels = [
    { label: "Телефон", value: site.phone, href: site.phoneHref },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Telegram", value: "@vergeles_studio", href: site.telegram },
    { label: "WhatsApp", value: site.phone, href: site.whatsapp },
  ];

  return (
    <>
      <PageIntro crumbs={[{ label: "Контакты" }]} eyebrow="Шоурум · Москва" title="Приходите посмотреть и потрогать.">
        <p>
          В шоуруме собраны все модели, 60 образцов тканей и кожи, шпон и камень. Консультация бесплатна,
          визит лучше согласовать заранее.
        </p>
      </PageIntro>

      <section className="container-x grid gap-12 pb-20 md:grid-cols-12 md:gap-6 md:pb-28">
        <div className="relative aspect-[4/3] bg-sand md:col-span-7">
          <Image src="/images/project-spb.jpg" alt="Интерьер шоурума VERGELES" fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <dl className="text-[14px]">
            <div className="border-t border-line py-4">
              <dt className="eyebrow">Адрес</dt>
              <dd className="mt-2">{site.showroom}</dd>
              <dd className="text-muted">м. Спортивная, 7 минут пешком</dd>
            </div>
            <div className="border-t border-line py-4">
              <dt className="eyebrow">Часы</dt>
              <dd className="mt-2">{site.hours}</dd>
            </div>
            {channels.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-4 border-t border-line py-4 last:border-b">
                <dt className="eyebrow">{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    className="link-underline"
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[12px] leading-[1.6] text-muted">
            Реквизиты: ООО «Вергелес Мебель», ИНН 7704519382, ОГРН 1197746382015.
          </p>
        </div>
      </section>

      <section id="consultation" className="scroll-mt-20 bg-paper py-20 md:py-28" aria-labelledby="consult-title">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="eyebrow">Консультация</p>
            <h2 id="consult-title" className="h-sub mt-5 max-w-xs">
              Подберём мебель под ваше пространство.
            </h2>
            <p className="mt-4 max-w-xs text-[14px] leading-[1.6] text-muted">
              Пришлите план или фото — предложим состав, ткани и рассчитаем стоимость с доставкой.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
