export type CategorySlug =
  | "sofas"
  | "armchairs"
  | "tables"
  | "chairs"
  | "beds"
  | "storage";

export type Category = {
  slug: CategorySlug;
  name: string;
  singular: string;
  description: string;
  cover: string;
};

export type Swatch = { id: string; name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  collection: CollectionSlug;
  price: number;
  designer: string;
  year: number;
  short: string;
  description: string[];
  materials: string;
  materialNotes: string[];
  dimensions: string;
  dimensionNotes?: string;
  leadTime: string;
  images: { src: string; alt: string; w: number; h: number }[];
  fabrics: Swatch[];
  finishes: Swatch[];
  isNew?: boolean;
};

export type CollectionSlug = "form" | "plane" | "soft" | "atelier";

export type Collection = {
  slug: CollectionSlug;
  index: string;
  name: string;
  year: number;
  lead: string;
  text: string;
  cover: string;
};

export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Диваны",
    singular: "Диван",
    description:
      "Глубокие посадки, съёмные чехлы и каркас из массива. Собираются под размер комнаты.",
    cover: "/images/mara-sofa.jpg",
  },
  {
    slug: "armchairs",
    name: "Кресла",
    singular: "Кресло",
    description:
      "Кресла для чтения, разговора и долгого вечера. Поворотные основания и мягкие формы.",
    cover: "/images/arc-armchair.jpg",
  },
  {
    slug: "tables",
    name: "Столы",
    singular: "Стол",
    description:
      "Обеденные, рабочие и приставные столы из дуба и ореха с ручной финишной обработкой.",
    cover: "/images/nova-table.jpg",
  },
  {
    slug: "chairs",
    name: "Стулья",
    singular: "Стул",
    description: "Стулья, на которых удобно сидеть дольше, чем длится ужин.",
    cover: "/images/forma-chair.jpg",
  },
  {
    slug: "beds",
    name: "Кровати",
    singular: "Кровать",
    description:
      "Низкие кровати на массивных основаниях. Ортопедическое основание входит в комплект.",
    cover: "/images/line-bed.jpg",
  },
  {
    slug: "storage",
    name: "Системы хранения",
    singular: "Хранение",
    description:
      "Тумбы, консоли и модульные системы, которые собираются в стену или стоят отдельно.",
    cover: "/images/frame-storage.jpg",
  },
];

export const collections: Collection[] = [
  {
    slug: "form",
    index: "01",
    name: "FORM",
    year: 2023,
    lead: "Коллекция, построенная вокруг простых геометрических форм, натуральных материалов и спокойных пропорций.",
    text: "Прямоугольник, дуга, плоскость. Каждый предмет FORM собирается из нескольких базовых фигур и не требует пары — но лучше всего работает в группе.",
    cover: "/images/collection-form.jpg",
  },
  {
    slug: "plane",
    index: "02",
    name: "PLANE",
    year: 2024,
    lead: "Столы и консоли, в которых всё держится на одной точной плоскости.",
    text: "Столешницы из цельных ламелей дуба толщиной 32 мм, тонкие опоры и скрытый крепёж. Предметы для работы и долгих обедов.",
    cover: "/images/plane-desk.jpg",
  },
  {
    slug: "soft",
    index: "03",
    name: "SOFT",
    year: 2025,
    lead: "Мягкая мебель с глубокой посадкой и тканями, которые хочется трогать.",
    text: "Шерсть, лён и бархатистая буклированная пряжа от итальянских и бельгийских фабрик. Наполнение — многослойный ППУ и пух.",
    cover: "/images/collection-soft.jpg",
  },
  {
    slug: "atelier",
    index: "04",
    name: "ATELIER",
    year: 2026,
    lead: "Небольшая серия из кожи и тёмного металла, которая собирается в мастерской вручную.",
    text: "Анилиновая кожа, которая со временем темнеет и становится мягче. Ограниченный тираж каждой модели в год.",
    cover: "/images/kasa-sofa.jpg",
  },
];

const textile: Swatch[] = [
  { id: "linen-sand", name: "Лён · Песок", hex: "#CDBFA8" },
  { id: "wool-stone", name: "Шерсть · Камень", hex: "#9C978D" },
  { id: "boucle-milk", name: "Букле · Молочный", hex: "#E7E1D6" },
  { id: "wool-moss", name: "Шерсть · Мох", hex: "#6E6F5A" },
];

const leather: Swatch[] = [
  { id: "leather-cognac", name: "Кожа · Коньяк", hex: "#A65A2A" },
  { id: "leather-tobacco", name: "Кожа · Табак", hex: "#6B4228" },
  { id: "leather-black", name: "Кожа · Графит", hex: "#2A2724" },
];

const wood: Swatch[] = [
  { id: "oak-natural", name: "Дуб натуральный", hex: "#C8A57A" },
  { id: "oak-smoked", name: "Дуб копчёный", hex: "#7A5B41" },
  { id: "walnut", name: "Американский орех", hex: "#5A3E2B" },
];

const metal: Swatch[] = [
  { id: "steel-graphite", name: "Сталь · Графит", hex: "#2E2D2B" },
  { id: "steel-bronze", name: "Сталь · Бронза", hex: "#7D6A52" },
];

export const products: Product[] = [
  {
    slug: "mara-sofa",
    name: "MARA SOFA",
    category: "sofas",
    collection: "form",
    price: 189000,
    designer: "Студия VERGELES",
    year: 2023,
    isNew: false,
    short: "Трёхместный диван с низкой спинкой и глубокой посадкой.",
    description: [
      "MARA — диван, который не спорит с архитектурой. Низкая спинка, ровная линия подлокотников и посадка глубиной 62 см: на нём одинаково удобно сидеть прямо и полулёжа.",
      "Каркас из массива бука и берёзовой фанеры, подушки сиденья — многослойный ППУ с пуховым топпером. Все чехлы съёмные и стираются при 30 °C.",
    ],
    materials: "Oak / Textile / Steel",
    materialNotes: [
      "Каркас — массив бука, берёзовая фанера 18 мм",
      "Опоры — дуб, масло-воск",
      "Обивка — лён, шерсть или букле на выбор",
      "Подушки — ППУ HR 40, пуховый топпер",
    ],
    dimensions: "W 240 × D 96 × H 72 cm",
    dimensionNotes: "Высота сиденья 42 см · глубина посадки 62 см · также 200 и 280 см",
    leadTime: "6–8 недель",
    images: [
      { src: "/images/mara-sofa.jpg", alt: "Диван MARA в обивке цвета мох в светлой гостиной", w: 2000, h: 1500 },
      { src: "/images/mara-sofa-2.jpg", alt: "Подушки дивана MARA и журнальный стол", w: 792, h: 900 },
      { src: "/images/mara-sofa-3.jpg", alt: "Журнальный стол из ореха рядом с диваном MARA", w: 1368, h: 1044 },
      { src: "/images/mat-wool.jpg", alt: "Шерстяная обивка крупным планом", w: 1400, h: 1426 },
    ],
    fabrics: textile,
    finishes: wood,
  },
  {
    slug: "kasa-sofa",
    name: "KASA SOFA",
    category: "sofas",
    collection: "atelier",
    price: 264000,
    designer: "Студия VERGELES",
    year: 2026,
    isNew: true,
    short: "Двухместный диван из анилиновой кожи на стальной раме.",
    description: [
      "KASA собирается вручную в мастерской: кожа раскраивается целыми шкурами, швы прокладываются двойной ниткой.",
      "Анилиновая кожа без пигментного покрытия со временем становится мягче и приобретает патину — это часть замысла.",
    ],
    materials: "Leather / Steel / Oak",
    materialNotes: [
      "Обивка — анилиновая кожа, 1,4 мм",
      "Рама — сталь, порошковая окраска",
      "Каркас — массив бука",
    ],
    dimensions: "W 228 × D 98 × H 78 cm",
    dimensionNotes: "Высота сиденья 44 см",
    leadTime: "8–10 недель",
    images: [
      { src: "/images/kasa-sofa.jpg", alt: "Кожаный диван KASA цвета коньяк в солнечном свете", w: 2000, h: 1500 },
      { src: "/images/kasa-sofa-2.jpg", alt: "Подушки дивана KASA крупным планом", w: 1152, h: 720 },
      { src: "/images/kasa-sofa-3.jpg", alt: "Подлокотник и стальная опора KASA", w: 1008, h: 1080 },
    ],
    fabrics: leather,
    finishes: metal,
  },
  {
    slug: "arc-armchair",
    name: "ARC ARMCHAIR",
    category: "armchairs",
    collection: "soft",
    price: 82000,
    designer: "Студия VERGELES",
    year: 2025,
    short: "Поворотное кресло с мягкой оболочкой и дубовой крестовиной.",
    description: [
      "Оболочка ARC повторяет изгиб спины, а поворотный механизм возвращает кресло в исходное положение.",
      "Основание — массив дуба на стальном узле, обивка снимается целиком.",
    ],
    materials: "Wool / Oak / Steel",
    materialNotes: ["Оболочка — формованный ППУ", "Основание — массив дуба", "Обивка — шерсть 85%"],
    dimensions: "W 78 × D 80 × H 84 cm",
    dimensionNotes: "Высота сиденья 43 см · поворот 360°",
    leadTime: "4–6 недель",
    images: [
      { src: "/images/arc-armchair.jpg", alt: "Кресло ARC в серой шерсти на дубовом основании", w: 2000, h: 3000 },
      { src: "/images/arc-armchair-2.jpg", alt: "Оболочка кресла ARC крупным планом", w: 1680, h: 1620 },
    ],
    fabrics: textile,
    finishes: wood,
  },
  {
    slug: "sola-lounge",
    name: "SOLA LOUNGE",
    category: "armchairs",
    collection: "soft",
    price: 146000,
    designer: "Студия VERGELES",
    year: 2025,
    short: "Лаунж-кресло с оттоманкой и простёганной спинкой.",
    description: [
      "Высокая спинка SOLA поддерживает голову, а оттоманка ставится на нужное расстояние.",
      "Стёжка выполнена вручную, подушки наполнены смесью пуха и волокна.",
    ],
    materials: "Wool / Steel",
    materialNotes: ["Обивка — шерсть", "Опоры — сталь, графит", "Наполнение — пух и волокно"],
    dimensions: "W 86 × D 92 × H 98 cm",
    dimensionNotes: "Оттоманка W 60 × D 46 × H 40 cm",
    leadTime: "6–8 недель",
    images: [
      { src: "/images/sola-lounge.jpg", alt: "Лаунж-кресло SOLA с оттоманкой у тёмно-зелёной стены", w: 2000, h: 1125 },
      { src: "/images/sola-lounge-2.jpg", alt: "SOLA LOUNGE — вид сбоку", w: 1056, h: 1053 },
    ],
    fabrics: textile,
    finishes: metal,
  },
  {
    slug: "nova-table",
    name: "NOVA TABLE",
    category: "tables",
    collection: "plane",
    price: 126000,
    designer: "Студия VERGELES",
    year: 2024,
    short: "Обеденный стол из цельноламельного дуба на шесть персон.",
    description: [
      "Столешница NOVA склеивается из ламелей шириной 80 мм с подбором рисунка, кромка скошена под 12°, — поэтому стол визуально легче своих размеров.",
      "Финиш — датское масло, которое легко обновить дома.",
    ],
    materials: "Oak / Oil",
    materialNotes: ["Массив дуба, 32 мм", "Датское масло", "Скрытый стальной царговый узел"],
    dimensions: "W 200 × D 95 × H 75 cm",
    dimensionNotes: "Также 160, 240 и 280 см",
    leadTime: "5–7 недель",
    images: [
      { src: "/images/nova-table.jpg", alt: "Обеденный стол NOVA из дуба со стульями", w: 2000, h: 3000 },
      { src: "/images/nova-table-2.jpg", alt: "Стол NOVA и стулья крупным планом", w: 1920, h: 1584 },
    ],
    fabrics: [],
    finishes: wood,
  },
  {
    slug: "plane-desk",
    name: "PLANE DESK",
    category: "tables",
    collection: "plane",
    price: 98000,
    designer: "Студия VERGELES",
    year: 2024,
    isNew: true,
    short: "Рабочий стол с тонкой столешницей и наклонными опорами.",
    description: [
      "PLANE — стол для домашнего кабинета, который выглядит как предмет обстановки, а не офисная мебель.",
      "Кабель-канал спрятан под столешницей, опоры разбираются для переезда.",
    ],
    materials: "Oak / Steel",
    materialNotes: ["Массив дуба, 26 мм", "Скрытый кабель-канал", "Масло-воск"],
    dimensions: "W 140 × D 70 × H 74 cm",
    leadTime: "4–6 недель",
    images: [
      { src: "/images/plane-desk.jpg", alt: "Рабочий стол PLANE у окна", w: 2000, h: 2497 },
      { src: "/images/plane-desk-2.jpg", alt: "Стол PLANE и стул крупным планом", w: 1632, h: 1498 },
    ],
    fabrics: [],
    finishes: wood,
  },
  {
    slug: "step-side-table",
    name: "STEP SIDE TABLE",
    category: "tables",
    collection: "form",
    price: 34000,
    designer: "Студия VERGELES",
    year: 2023,
    short: "Приставной стол из ореха со ступенчатой полкой.",
    description: [
      "STEP заходит под диван или кровать, а нижняя ступень держит книги и журналы.",
      "Шпон американского ореха на берёзовой фанере, торцы — массив.",
    ],
    materials: "Walnut veneer / Oak",
    materialNotes: ["Шпон американского ореха", "Опоры — массив дуба"],
    dimensions: "W 55 × D 40 × H 58 cm",
    leadTime: "3–4 недели",
    images: [
      { src: "/images/step-side-table.jpg", alt: "Приставной стол STEP из ореха", w: 2000, h: 1333 },
      { src: "/images/step-side-table-2.jpg", alt: "Текстура ореха на столе STEP", w: 912, h: 1168 },
    ],
    fabrics: [],
    finishes: wood,
  },
  {
    slug: "forma-chair",
    name: "FORMA CHAIR",
    category: "chairs",
    collection: "form",
    price: 74000,
    designer: "Студия VERGELES",
    year: 2023,
    short: "Обеденный стул с высокой мягкой спинкой и ножками из бука.",
    description: [
      "Спинка FORMA обнимает плечи, а светлый кант подчёркивает её контур.",
      "Ножки точатся из цельного бука и покрываются маслом вручную.",
    ],
    materials: "Wool / Beech",
    materialNotes: ["Обивка — шерстяная рогожка", "Ножки — массив бука", "Каркас — фанера"],
    dimensions: "W 52 × D 56 × H 92 cm",
    dimensionNotes: "Высота сиденья 46 см",
    leadTime: "4–6 недель",
    images: [
      { src: "/images/forma-chair.jpg", alt: "Стул FORMA в серой шерсти", w: 2000, h: 2500 },
      { src: "/images/forma-chair-2.jpg", alt: "Спинка стула FORMA крупным планом", w: 1344, h: 1260 },
      { src: "/images/forma-chair-3.jpg", alt: "Ножки стула FORMA из бука", w: 1440, h: 1500 },
    ],
    fabrics: textile,
    finishes: wood,
  },
  {
    slug: "halo-chair",
    name: "HALO CHAIR",
    category: "chairs",
    collection: "atelier",
    price: 68000,
    designer: "Студия VERGELES",
    year: 2026,
    isNew: true,
    short: "Кожаная оболочка на тонком стальном основании.",
    description: [
      "HALO — стул для кухни, кабинета или переговорной. Оболочка формуется из кожи на жёстком основании и не требует подушки.",
    ],
    materials: "Leather / Steel",
    materialNotes: ["Анилиновая кожа", "Основание — сталь, графит"],
    dimensions: "W 50 × D 54 × H 82 cm",
    dimensionNotes: "Высота сиденья 45 см",
    leadTime: "6–8 недель",
    images: [
      { src: "/images/halo-chair.jpg", alt: "Стул HALO из кожи в тёплом свете", w: 2000, h: 3000 },
      { src: "/images/halo-chair-2.jpg", alt: "Кожаная оболочка HALO крупным планом", w: 1535, h: 1584 },
    ],
    fabrics: leather,
    finishes: metal,
  },
  {
    slug: "line-bed",
    name: "LINE BED",
    category: "beds",
    collection: "form",
    price: 159000,
    designer: "Студия VERGELES",
    year: 2023,
    short: "Низкая кровать на массивном деревянном подиуме.",
    description: [
      "LINE стоит низко, на высоте 24 см, — комната кажется выше. Подиум собран из массивных брусьев с видимой текстурой.",
      "В комплекте ортопедическое основание. Изголовье — опционально, в ткани или дереве.",
    ],
    materials: "Oak / Linen",
    materialNotes: ["Подиум — массив дуба", "Ортопедическое основание в комплекте", "Изголовье — опционально"],
    dimensions: "W 196 × L 222 × H 24 cm",
    dimensionNotes: "Под матрас 160 × 200 или 180 × 200 см",
    leadTime: "6–8 недель",
    images: [
      { src: "/images/line-bed.jpg", alt: "Низкая кровать LINE на деревянном подиуме", w: 2000, h: 1333 },
      { src: "/images/line-bed-2.jpg", alt: "Деревянный подиум кровати LINE", w: 1200, h: 672 },
      { src: "/images/line-bed-3.jpg", alt: "Льняное бельё на кровати LINE", w: 1392, h: 704 },
    ],
    fabrics: [],
    finishes: wood,
  },
  {
    slug: "frame-storage",
    name: "FRAME STORAGE",
    category: "storage",
    collection: "form",
    price: 113000,
    designer: "Студия VERGELES",
    year: 2024,
    short: "Модульная система из тумб, столика и открытых секций.",
    description: [
      "FRAME — набор модулей одной высоты, которые ставятся рядом или по отдельности. Ящики на доводчиках, ручки фрезерованы прямо в фасаде.",
      "Цена указана за комплект из трёх модулей.",
    ],
    materials: "Oak veneer / Oak",
    materialNotes: ["Корпус — дубовый шпон", "Опоры — массив дуба", "Направляющие Blum с доводчиком"],
    dimensions: "W 180 × D 42 × H 62 cm",
    dimensionNotes: "Комплект из трёх модулей",
    leadTime: "5–7 недель",
    images: [
      { src: "/images/frame-storage.jpg", alt: "Модули FRAME из дуба у светлой стены", w: 2000, h: 1333 },
      { src: "/images/frame-storage-2.jpg", alt: "Тумба FRAME с двумя ящиками", w: 912, h: 864 },
      { src: "/images/frame-storage-3.jpg", alt: "Тумба FRAME с открытой нишей", w: 912, h: 864 },
    ],
    fabrics: [],
    finishes: wood,
  },
  {
    slug: "sill-console",
    name: "SILL CONSOLE",
    category: "storage",
    collection: "plane",
    price: 87000,
    designer: "Студия VERGELES",
    year: 2024,
    short: "Подвесная консоль с тремя ящиками и стальными опорами.",
    description: [
      "SILL крепится к стене и опирается на две тонкие ножки — пол под ней остаётся свободным.",
    ],
    materials: "Oak / Steel",
    materialNotes: ["Массив дуба", "Ящики на скрытых направляющих", "Опоры — сталь"],
    dimensions: "W 160 × D 38 × H 78 cm",
    leadTime: "4–6 недель",
    images: [
      { src: "/images/sill-console.jpg", alt: "Консоль SILL из дуба", w: 2000, h: 1333 },
      { src: "/images/sill-console-2.jpg", alt: "Ящики консоли SILL", w: 1200, h: 752 },
    ],
    fabrics: [],
    finishes: wood,
  },
];

export const featuredSlugs = [
  "mara-sofa",
  "forma-chair",
  "nova-table",
  "line-bed",
  "arc-armchair",
  "frame-storage",
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value).replace(/ /g, " ") + " ₽";
}

/** Russian plural: plural(5, ["предмет", "предмета", "предметов"]) → "предметов" */
export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
