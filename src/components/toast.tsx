"use client";

import Link from "next/link";
import { CloseIcon } from "./icons";
import { useStore } from "./store";

export function CartToast() {
  const { toast, dismissToast } = useStore();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end md:inset-x-auto md:bottom-auto md:right-8 md:top-20"
    >
      {toast && (
        <div
          key={toast.id}
          className="fade-in pointer-events-auto flex w-full items-center gap-6 bg-ink px-5 py-4 text-ivory md:w-auto md:min-w-[340px]"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ivory/60">Добавлено в корзину</p>
            <p className="mt-1 truncate text-[14px] tracking-[0.06em]">{toast.title}</p>
          </div>
          <Link href="/cart" onClick={dismissToast} className="link-static shrink-0 text-[13px]">
            Корзина
          </Link>
          <button
            type="button"
            aria-label="Закрыть уведомление"
            onClick={dismissToast}
            className="-mr-2 flex h-8 w-8 shrink-0 items-center justify-center text-ivory/70 hover:text-ivory"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
