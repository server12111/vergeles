"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/catalog";

type Zone = { id: string; name: string; region: "ru" | "eu"; base: number; perItem: number; days: string };

const zones: Zone[] = [
  { id: "msk", name: "Москва и область", region: "ru", base: 0, perItem: 0, days: "1–3 дня" },
  { id: "spb", name: "Санкт-Петербург", region: "ru", base: 0, perItem: 0, days: "3–5 дней" },
  { id: "ru-c", name: "Центральная Россия", region: "ru", base: 6900, perItem: 2400, days: "4–7 дней" },
  { id: "ru-s", name: "Юг России", region: "ru", base: 9800, perItem: 2900, days: "5–8 дней" },
  { id: "ru-u", name: "Урал и Поволжье", region: "ru", base: 11500, perItem: 3200, days: "6–9 дней" },
  { id: "ru-sib", name: "Сибирь", region: "ru", base: 18900, perItem: 4800, days: "9–14 дней" },
  { id: "eu-c", name: "Германия, Австрия, Чехия", region: "eu", base: 29000, perItem: 9500, days: "10–14 дней" },
  { id: "eu-w", name: "Франция, Бенилюкс", region: "eu", base: 34000, perItem: 11000, days: "12–16 дней" },
  { id: "eu-s", name: "Италия, Испания, Португалия", region: "eu", base: 36000, perItem: 12000, days: "12–18 дней" },
  { id: "eu-n", name: "Скандинавия", region: "eu", base: 41000, perItem: 13500, days: "14–18 дней" },
];

const sizes = [
  { id: "s", name: "Небольшой", hint: "стул, приставной стол", k: 0.5 },
  { id: "m", name: "Средний", hint: "кресло, тумба, рабочий стол", k: 1 },
  { id: "l", name: "Крупный", hint: "диван, кровать, обеденный стол", k: 1.8 },
];

export function DeliveryCalculator() {
  const [zone, setZone] = useState(zones[2].id);
  const [size, setSize] = useState("l");
  const [count, setCount] = useState(1);
  const [assembly, setAssembly] = useState(true);

  const result = useMemo(() => {
    const z = zones.find((x) => x.id === zone)!;
    const s = sizes.find((x) => x.id === size)!;
    const free = z.base === 0;
    const transport = free ? 0 : Math.round((z.base + z.perItem * s.k * count) / 100) * 100;
    const assemblyCost = assembly && !free ? 3500 * count : 0;
    return { z, total: transport + assemblyCost, transport, assemblyCost, free };
  }, [zone, size, count, assembly]);

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-6">
      <form className="space-y-8 md:col-span-7" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="zone" className="eyebrow">
            Куда
          </label>
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="field mt-2 cursor-pointer appearance-none bg-[length:12px] bg-[right_0.25rem_center] bg-no-repeat pr-8"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%23171717'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")",
            }}
          >
            <optgroup label="Россия">
              {zones.filter((z) => z.region === "ru").map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </optgroup>
            <optgroup label="Европа">
              {zones.filter((z) => z.region === "eu").map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <fieldset>
          <legend className="eyebrow">Габарит предмета</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {sizes.map((s) => (
              <label
                key={s.id}
                className={`cursor-pointer border px-4 py-3 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 ${
                  size === s.id ? "border-ink bg-paper" : "border-line hover:border-muted"
                }`}
              >
                <input type="radio" name="size" value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} className="sr-only" />
                <span className="block text-[14px]">{s.name}</span>
                <span className="mt-0.5 block text-[12px] text-muted">{s.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-4">
          <div className="flex items-center gap-4">
            <span className="eyebrow">Предметов</span>
            <div className="flex items-center border border-line">
              <button type="button" className="h-10 w-10 disabled:opacity-30" disabled={count <= 1} onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="Меньше">
                −
              </button>
              <span className="w-6 text-center tabular-nums">{count}</span>
              <button type="button" className="h-10 w-10" onClick={() => setCount((c) => Math.min(30, c + 1))} aria-label="Больше">
                +
              </button>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3 text-[14px]">
            <input type="checkbox" checked={assembly} onChange={(e) => setAssembly(e.target.checked)} className="h-4 w-4 accent-ink" />
            Подъём и сборка
          </label>
        </div>
      </form>

      <div className="md:col-span-4 md:col-start-9">
        <div className="bg-ink p-6 text-ivory md:p-8" aria-live="polite">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ivory/60">Ориентировочно</p>
          <p className="mt-4 font-display text-[40px] leading-none tracking-[-0.03em] tabular-nums">
            {result.free ? "Бесплатно" : formatPrice(result.total)}
          </p>
          <dl className="mt-6 space-y-2 border-t border-ivory/15 pt-4 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-ivory/60">Срок в пути</dt>
              <dd>{result.z.days}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ivory/60">Перевозка</dt>
              <dd className="tabular-nums">{result.free ? "0 ₽" : formatPrice(result.transport)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ivory/60">Сборка</dt>
              <dd className="tabular-nums">{result.free ? "включена" : assembly ? formatPrice(result.assemblyCost) : "—"}</dd>
            </div>
            {result.z.region === "eu" && (
              <div className="flex justify-between">
                <dt className="text-ivory/60">Таможня</dt>
                <dd>оформляем мы</dd>
              </div>
            )}
          </dl>
          <Link href="/contacts#consultation" className="btn btn-light mt-8 w-full">
            Точный расчёт у менеджера
          </Link>
        </div>
        <p className="mt-3 text-[12px] leading-[1.6] text-muted">
          Расчёт предварительный. Точная стоимость зависит от адреса, этажа и упаковки.
        </p>
      </div>
    </div>
  );
}
