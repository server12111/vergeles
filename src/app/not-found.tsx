import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] content-center gap-8 py-24 md:grid-cols-12">
      <p className="eyebrow md:col-span-3">Ошибка 404</p>
      <div className="md:col-span-7">
        <h1 className="h-section">Этой страницы нет — но мебель на месте.</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/catalog" className="btn btn-dark">
            Перейти в каталог
          </Link>
          <Link href="/" className="btn btn-outline">
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
