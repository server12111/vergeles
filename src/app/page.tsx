import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CatalogSection } from "@/components/home/catalog-section";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { MaterialsSection } from "@/components/home/materials-section";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { DeliverySection } from "@/components/home/delivery-section";
import { CtaSection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CatalogSection />
      <FeaturedCollection />
      <MaterialsSection />
      <AboutSection />
      <ProjectsSection />
      <ReviewsSection />
      <DeliverySection />
      <CtaSection />
    </>
  );
}
