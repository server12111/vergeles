# VERGELES — digital showroom

Сайт мебельного бренда VERGELES: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Без бэкенда — каталог хранится в `src/lib/catalog.ts`, корзина и избранное в `localStorage`.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run typecheck
```

## Деплой

Сайт собирается как статический (`output: "export"`, папка `out/`) и публикуется на **GitHub Pages**
из ветки `gh-pages`. Чтобы обновить сайт после изменений:

```bash
npm run deploy
```

Адрес: https://server12111.github.io/vergeles/

Локальная проверка сборки с тем же путём, что на Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/vergeles npm run build
```

После `next build` скрипт `scripts/flatten-rsc.mjs` дублирует служебные файлы роутера под плоскими
именами — без этого на статическом хостинге клиентские переходы получают 404.

## Структура

```
src/
  app/                 маршруты: /, /catalog, /catalog/[category], /product/[slug],
                       /collections, /about, /delivery, /contacts, /cart, /wishlist, /legal/[doc]
                       + sitemap.ts, robots.ts, manifest.ts, icon.svg (OG-картинка — public/og.png)
  components/
    home/              секции главной
    product/           галерея и блок покупки
    store.tsx          корзина, избранное, поиск (React context + localStorage)
    reveal.tsx         появление при скролле (IntersectionObserver + CSS)
    route-map.tsx      SVG-схема доставки
  lib/
    catalog.ts         товары, категории, коллекции, цены
    content.ts         контакты, материалы, проекты, отзывы
public/images/         оптимизированные фотографии (Unsplash) и кропы фактур
```

## Как редактировать

- **Товар** — добавить объект в `products` в `src/lib/catalog.ts` и положить фото в `public/images/`. Страница, карточки, поиск и sitemap подхватят его автоматически.
- **Цвета и шрифты** — токены в `@theme` в `src/app/globals.css`. Шрифты: Inter Tight (заголовки) и Golos Text (интерфейс), с кириллицей.
- **Формы** (заказ, консультация, рассылка) сейчас показывают подтверждение на клиенте. Чтобы получать заявки, подключите обработчик (Route Handler, Telegram-бот или Formspree) в `src/app/cart/cart-view.tsx`, `src/app/contacts/consultation-form.tsx` и `src/components/newsletter-form.tsx`.

## Фотографии

Изображения взяты с Unsplash (лицензия Unsplash допускает коммерческое использование). Перед запуском реального магазина их стоит заменить собственной предметной и интерьерной съёмкой.
