import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { CartView } from "./cart-view";

export const metadata: Metadata = {
  title: "Корзина",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Корзина" }]} title="Корзина" />
      <CartView />
    </>
  );
}
