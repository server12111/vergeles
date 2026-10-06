export const site = {
  name: "VERGELES",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://server12111.github.io/vergeles",
  description:
    "VERGELES — современная мебель из натуральных материалов. Диваны, кресла, столы, стулья, кровати и системы хранения с доставкой по России и Европе.",
  email: "studio@vergeles.com",
  phone: "+7 495 128-40-17",
  phoneHref: "tel:+74951284017",
  telegram: "https://t.me/vergeles_studio",
  whatsapp: "https://wa.me/74951284017",
  showroom: "Москва, Большая Пироговская ул., 27, стр. 3",
  hours: "Ежедневно 11:00–20:00",
};

export const nav = [
  { href: "/catalog", label: "Мебель" },
  { href: "/collections", label: "Коллекции" },
  { href: "/about", label: "О бренде" },
  { href: "/delivery", label: "Доставка" },
];

export const materials = [
  {
    id: "oak",
    name: "Натуральный дуб",
    origin: "Владимирская обл., Словения",
    text: "Массив камерной сушки до влажности 8%. Мы оставляем сучки и текстуру — это то, по чему дуб узнают.",
    image: "/images/mat-oak.jpg",
    position: "50% 50%",
  },
  {
    id: "veneer",
    name: "Шпон ореха",
    origin: "Американский орех",
    text: "Строганый шпон толщиной 0,6 мм с подбором рисунка. Листы одного ствола идут на один предмет.",
    image: "/images/mat-veneer.jpg",
    position: "50% 50%",
  },
  {
    id: "wool",
    name: "Шерсть",
    origin: "Бельгия, Дания",
    text: "Рогожка из новозеландской шерсти, 85 000 циклов по Мартиндейлу. Не электризуется и не выгорает.",
    image: "/images/mat-wool.jpg",
    position: "60% 50%",
  },
  {
    id: "linen",
    name: "Лён",
    origin: "Литва",
    text: "Плотный стираный лён 340 г/м². Мнётся ровно настолько, чтобы мебель выглядела обжитой.",
    image: "/images/mat-linen.jpg",
    position: "50% 50%",
  },
  {
    id: "leather",
    name: "Натуральная кожа",
    origin: "Тоскана",
    text: "Анилиновая кожа растительного дубления. Со временем темнеет и приобретает патину.",
    image: "/images/mat-leather.jpg",
    position: "40% 50%",
  },
  {
    id: "stone",
    name: "Камень",
    origin: "Мрамор Rosso Levanto",
    text: "Столешницы и основания из цельного блока, обработанные вручную до матовой поверхности.",
    image: "/images/mat-stone.jpg",
    position: "50% 50%",
  },
];

export const projects = [
  {
    slug: "moscow-apartment",
    city: "Moscow Apartment",
    place: "Москва, Хамовники",
    year: 2025,
    area: "146 м²",
    studio: "Бюро Kvadrat Interiors",
    pieces: ["MARA SOFA", "STEP SIDE TABLE", "FRAME STORAGE"],
    image: "/images/project-moscow.jpg",
    w: 2000,
    h: 1360,
  },
  {
    slug: "saint-petersburg-residence",
    city: "Saint Petersburg Residence",
    place: "Санкт-Петербург, Петроградская сторона",
    year: 2024,
    area: "210 м²",
    studio: "Мастерская Анны Лисовской",
    pieces: ["NOVA TABLE", "FORMA CHAIR", "SILL CONSOLE"],
    image: "/images/project-spb.jpg",
    w: 2000,
    h: 1333,
  },
  {
    slug: "paris-apartment",
    city: "Paris Apartment",
    place: "Париж, 7-й округ",
    year: 2025,
    area: "98 м²",
    studio: "Atelier Morel",
    pieces: ["ARC ARMCHAIR", "LINE BED"],
    image: "/images/project-paris.jpg",
    w: 2000,
    h: 1500,
  },
  {
    slug: "berlin-studio",
    city: "Berlin Studio",
    place: "Берлин, Пренцлауэр-Берг",
    year: 2026,
    area: "64 м²",
    studio: "Частный заказчик",
    pieces: ["HALO CHAIR", "PLANE DESK"],
    image: "/images/project-berlin.jpg",
    w: 2000,
    h: 2184,
  },
];

export const reviews = [
  {
    quote:
      "VERGELES удалось сделать именно то, чего нам не хватало — мебель не перетягивает внимание на себя, а собирает пространство.",
    name: "Анна",
    city: "Москва",
    item: "MARA SOFA, FRAME STORAGE",
  },
  {
    quote:
      "Стол NOVA приехал в Петербург через шесть недель, собрали за сорок минут. Через год масло обновили сами — выглядит как новый.",
    name: "Дмитрий",
    city: "Санкт-Петербург",
    item: "NOVA TABLE",
  },
  {
    quote:
      "Мы заказывали кресла для квартиры клиента в Париже. Доставка с растаможкой заняла меньше, чем у итальянских брендов, а образцы тканей прислали заранее.",
    name: "Claire Morel",
    city: "Париж",
    item: "ARC ARMCHAIR",
  },
  {
    quote: "Лучшее, что можно сказать о кровати: через месяц перестаёшь её замечать и просто хорошо спишь.",
    name: "Екатерина",
    city: "Казань",
    item: "LINE BED",
  },
];
