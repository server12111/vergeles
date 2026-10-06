import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WishlistView } from "./wishlist-view";

export const metadata: Metadata = {
  title: "Избранное",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Избранное" }]} title="Избранное">
        <p>Сохраните предметы, чтобы обсудить их с дизайнером или показать в шоуруме.</p>
      </PageIntro>
      <WishlistView />
    </>
  );
}
