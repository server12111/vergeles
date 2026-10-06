/* Simplified equirectangular projection of Europe and western Russia.
   No basemap: a graticule, two hubs and quiet routes — fast and legible. */

const LON_MIN = -11;
const LON_MAX = 63;
const LAT_MIN = 36;
const LAT_MAX = 62;
const W = 1000;
const COS = Math.cos((49 * Math.PI) / 180);
const H = Math.round((W * (LAT_MAX - LAT_MIN)) / ((LON_MAX - LON_MIN) * COS));

const project = (lon: number, lat: number) => ({
  x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
});

type City = { name: string; lon: number; lat: number; label?: "l" | "r" | "t" | "b" };

const hubs = {
  moscow: { name: "Москва", lon: 37.62, lat: 55.75 },
  belgrade: { name: "Белград", lon: 20.46, lat: 44.8 },
};

const ru: City[] = [
  { name: "Санкт-Петербург", lon: 30.3, lat: 59.94, label: "r" },
  { name: "Казань", lon: 49.1, lat: 55.8, label: "t" },
  { name: "Екатеринбург", lon: 60.6, lat: 56.84, label: "l" },
  { name: "Самара", lon: 50.1, lat: 53.2, label: "r" },
  { name: "Краснодар", lon: 38.98, lat: 45.04, label: "l" },
  { name: "Сочи", lon: 39.72, lat: 43.6, label: "r" },
  { name: "Ростов-на-Дону", lon: 39.7, lat: 47.23, label: "r" },
  { name: "Воронеж", lon: 39.2, lat: 51.67, label: "r" },
  { name: "Калининград", lon: 20.5, lat: 54.71, label: "t" },
];

const eu: City[] = [
  { name: "Париж", lon: 2.35, lat: 48.86, label: "l" },
  { name: "Берлин", lon: 13.4, lat: 52.52, label: "t" },
  { name: "Милан", lon: 9.19, lat: 45.46, label: "b" },
  { name: "Вена", lon: 16.37, lat: 48.21, label: "t" },
  { name: "Мадрид", lon: -3.7, lat: 40.42, label: "r" },
  { name: "Лиссабон", lon: -9.14, lat: 38.72, label: "r" },
  { name: "Амстердам", lon: 4.9, lat: 52.37, label: "l" },
  { name: "Копенгаген", lon: 12.57, lat: 55.68, label: "t" },
  { name: "Афины", lon: 23.73, lat: 37.98, label: "r" },
  { name: "Варшава", lon: 21.01, lat: 52.23, label: "r" },
];

function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.18) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Normal to the chord, always bowing upwards, like a flight path.
  let nx = dy;
  let ny = -dx;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = (a.x + b.x) / 2 + nx * bend;
  const cy = (a.y + b.y) / 2 + ny * bend;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function labelProps(c: City, p: { x: number; y: number }) {
  switch (c.label) {
    case "l":
      return { x: p.x - 9, y: p.y + 4, textAnchor: "end" as const };
    case "t":
      return { x: p.x, y: p.y - 10, textAnchor: "middle" as const };
    case "b":
      return { x: p.x, y: p.y + 19, textAnchor: "middle" as const };
    default:
      return { x: p.x + 9, y: p.y + 4, textAnchor: "start" as const };
  }
}

export function RouteMap({ className = "" }: { className?: string }) {
  const m = project(hubs.moscow.lon, hubs.moscow.lat);
  const b = project(hubs.belgrade.lon, hubs.belgrade.lat);

  const meridians = [];
  for (let lon = -10; lon <= 60; lon += 10) meridians.push(project(lon, LAT_MIN).x);
  const parallels = [];
  for (let lat = 40; lat <= 60; lat += 5) parallels.push(project(LON_MIN, lat).y);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="Схема доставки: склад в Москве обслуживает города России, склад в Белграде — города Европы"
    >
      <g stroke="currentColor" strokeOpacity="0.1" strokeWidth="1">
        {meridians.map((x) => (
          <line key={`m${x}`} x1={x} x2={x} y1={0} y2={H} />
        ))}
        {parallels.map((y) => (
          <line key={`p${y}`} x1={0} x2={W} y1={y} y2={y} />
        ))}
      </g>
      <g fontSize="11" fill="currentColor" fillOpacity="0.35" letterSpacing="0.08em" className="max-sm:hidden">
        {[40, 50, 60].map((lat) => (
          <text key={lat} x={6} y={project(LON_MIN, lat).y - 6}>
            {lat}°N
          </text>
        ))}
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55">
        {ru.map((c, i) => (
          <path
            key={c.name}
            d={arc(m, project(c.lon, c.lat), 0.16)}
            pathLength={1}
            className="route"
            style={{ ["--delay" as string]: `${200 + i * 70}ms` }}
          />
        ))}
        {eu.map((c, i) => (
          <path
            key={c.name}
            d={arc(b, project(c.lon, c.lat), 0.16)}
            pathLength={1}
            className="route"
            style={{ ["--delay" as string]: `${700 + i * 70}ms` }}
          />
        ))}
      </g>
      <path
        d={arc(m, b, 0.12)}
        fill="none"
        stroke="var(--color-clay)"
        strokeWidth="1.6"
        pathLength={1}
        className="route"
      />

      <g fill="currentColor">
        {[...ru, ...eu].map((c) => {
          const p = project(c.lon, c.lat);
          const l = labelProps(c, p);
          return (
            <g key={c.name}>
              <circle cx={p.x} cy={p.y} r={2.6} className="max-sm:[r:5px]" />
              <text {...l} fontSize="13" fillOpacity="0.62" className="max-sm:hidden">
                {c.name}
              </text>
            </g>
          );
        })}
        {[
          { ...hubs.moscow, p: m, anchor: "start" as const, dx: 12 },
          { ...hubs.belgrade, p: b, anchor: "end" as const, dx: -12 },
        ].map((h) => (
          <g key={h.name}>
            <rect x={h.p.x - 5} y={h.p.y - 5} width={10} height={10} fill="var(--color-ivory)" stroke="currentColor" strokeWidth="1.4" />
            <text x={h.p.x + h.dx} y={h.p.y - 10} textAnchor={h.anchor} fontSize="14" fontWeight={500} className="max-sm:text-[32px]">
              {h.name}
            </text>
          </g>
        ))}
      </g>

      <g fontSize="12" fill="currentColor" fillOpacity="0.5" className="max-sm:hidden">
        <text x={W - 6} y={project(LON_MAX, 52).y} textAnchor="end">
          → Новосибирск, Иркутск
        </text>
      </g>
    </svg>
  );
}
