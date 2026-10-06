"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="fade-in mt-8 border-b border-ink pb-3 text-[14px]">
        Спасибо. Первое письмо придёт в начале месяца.
      </p>
    );
  }

  return (
    <form
      className="mt-8 flex items-end gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Ваш email"
        autoComplete="email"
        className="field flex-1 border-ink/30 text-[15px]"
      />
      <button type="submit" className="border-b border-ink pb-[15px] pt-3 text-[13px]">
        Подписаться
      </button>
    </form>
  );
}
