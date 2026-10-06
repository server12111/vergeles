const items = [
  "Доставка по России и Европе",
  "Изготовление под заказ",
  "Гарантия 2 года",
  "Персональная консультация",
];

export function TrustBar() {
  return (
    <section aria-label="Условия" className="border-y border-line">
      <ul className="container-x grid grid-cols-2 text-[12px] md:grid-cols-4 md:text-[13px]">
        {items.map((item, i) => (
          <li
            key={item}
            className={[
              "flex items-baseline gap-3 py-4 md:justify-center md:py-5",
              i % 2 === 0 ? "border-r border-line pr-3" : "pl-4",
              i < 2 ? "border-b border-line md:border-b-0" : "",
              "md:border-r md:px-4 md:last:border-r-0",
            ].join(" ")}
          >
            <span className="text-[11px] text-muted tabular-nums">0{i + 1}</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
