import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
import { PageIntro } from "@/components/page-intro";
import { CtaSection } from "@/components/cta-section";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог мебели",
  description:
    "Диваны, кресла, столы, стулья, кровати и системы хранения VERGELES. Изготовление под заказ, доставка по России и Европе.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Каталог" }]} eyebrow="12 предметов · 6 категорий" title="Мебель">
        <p>
          Каждый предмет изготавливается под заказ в нашей мастерской. Размеры, ткани и отделку можно
          изменить — менеджер подготовит расчёт за один рабочий день.
        </p>
      </PageIntro>
      <CatalogView products={products} />
      <CtaSection />
    </>
  );
}
