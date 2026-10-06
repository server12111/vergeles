"use client";

import { useState } from "react";

const topics = ["Подбор мебели", "Расчёт проекта", "Образцы материалов", "Доставка в Европу", "Сотрудничество с дизайнерами"];

export function ConsultationForm({ product }: { product?: string }) {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  if (sent) {
    return (
      <div className="fade-in border-t border-ink pt-8">
        <p className="h-sub">Спасибо, заявка получена.</p>
        <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-graphite">
          Консультант свяжется с вами в течение двух часов в рабочее время — с 10:00 до 20:00 по Москве.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <fieldset className="mb-6">
        <legend className="eyebrow mb-4">Тема</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label
              key={t}
              className={`cursor-pointer border px-3.5 py-2 text-[13px] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 ${
                topic === t ? "border-ink bg-ink text-ivory" : "border-line hover:border-muted"
              }`}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-x-6 md:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="sr-only">Имя</label>
          <input id="c-name" required placeholder="Имя" autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="c-phone" className="sr-only">Телефон или Telegram</label>
          <input id="c-phone" required placeholder="Телефон или Telegram" autoComplete="tel" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="c-msg" className="sr-only">Комментарий</label>
        <textarea
          id="c-msg"
          rows={3}
          defaultValue={product ? `Интересует ${product}. ` : ""}
          placeholder="Расскажите о пространстве: площадь, стиль, сроки"
          className="field resize-none"
        />
      </div>
      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[12px] leading-[1.6] text-muted">
          Отправляя форму, вы соглашаетесь с политикой обработки персональных данных.
        </p>
        <button type="submit" className="btn btn-dark">
          Отправить заявку <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}
