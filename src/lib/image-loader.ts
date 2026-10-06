// Static hosting has no image optimiser: every photo is pre-rendered at 1600px
// (public/images) and 800px (public/images/sm). Pick the smaller one for narrow slots.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("/images/") && width <= 828) {
    return `${base}/images/sm/${src.slice("/images/".length)}`;
  }
  return `${base}${src}`;
}
