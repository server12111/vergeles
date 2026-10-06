import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/catalog";

export function Hero() {
  const kasa = getProduct("kasa-sofa")!;

  return (
    <section className="container-x pb-10 pt-2 md:pb-16 md:pt-4" aria-labelledby="hero-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="relative order-1 overflow-hidden bg-sand lg:order-2 lg:col-span-8">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(calc(100svh-6rem),58rem)] lg:min-h-[34rem]">
            <Image
              src="/images/kasa-sofa.jpg"
              alt="Кожаный диван KASA цвета коньяк в комнате с дневным светом"
              fill
              priority
              sizes="(min-width:1024px) 66vw, 100vw"
              className="hero-img object-cover object-[58%_50%]"
            />
          </div>
          <Link
            href={`/product/${kasa.slug}`}
            className="group absolute bottom-0 right-0 hidden items-center gap-6 bg-paper px-5 py-4 text-[12px] md:flex"
          >
            <span className="tracking-[0.08em]">{kasa.name}</span>
            <span className="text-muted tabular-nums">от {formatPrice(kasa.price)}</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-4 lg:py-2">
          <div>
            <p className="wordmark hero-in text-[12px] text-muted" style={{ ["--delay" as string]: "100ms" }}>
              Vergeles
            </p>
            <h1
              id="hero-title"
              className="display hero-in mt-5 text-[clamp(2.6rem,1.6rem+3.6vw,4.75rem)] lg:mt-8"
              style={{ ["--delay" as string]: "180ms" }}
            >
              Furniture for modern living.
            </h1>
            <p
              className="hero-in mt-6 max-w-[22rem] text-[16px] leading-[1.55] text-graphite md:text-[17px]"
              style={{ ["--delay" as string]: "300ms" }}
            >
              Современная мебель для пространств, в которых хочется жить.
            </p>
            <div
              className="hero-in mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-10"
              style={{ ["--delay" as string]: "420ms" }}
            >
              <Link href="/catalog" className="btn btn-dark">
                Смотреть коллекцию
              </Link>
              <Link href="/about" className="link-static text-[13px]">
                О бренде →
              </Link>
            </div>
          </div>

          <dl
            className="hero-in mt-12 hidden grid-cols-2 gap-x-6 border-t border-line pt-5 text-[12px] lg:grid"
            style={{ ["--delay" as string]: "560ms" }}
          >
            <div>
              <dt className="text-muted">На фото</dt>
              <dd className="mt-1">KASA SOFA, кожа «коньяк»</dd>
            </div>
            <div>
              <dt className="text-muted">Коллекция</dt>
              <dd className="mt-1">ATELIER / 04, 2026</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
