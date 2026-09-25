// Post-build: genera dist/es/index.html y dist/en/index.html con el HTML ya renderizado y
// los meta tags de cada idioma, para que Google y las previews de LinkedIn/WhatsApp (que no
// ejecutan JS) vean contenido. dist/index.html ("/", redirige por idioma en el cliente) queda
// como shell con los meta en español. Requiere el build SSR en dist/server (ver "build").
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://thomas-livon.vercel.app";
const LANGS = ["es", "en"];
const DIST = path.resolve("dist");

const { render, base } = await import(pathToFileURL(path.join(DIST, "server", "entry-server.js")).href);
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const messages = Object.fromEntries(
  LANGS.map((l) => [l, JSON.parse(fs.readFileSync(`src/messages/${l}.json`, "utf8"))])
);

// Preload de la fuente latina (la única que usa el sitio): evita que el texto se re-pinte tarde.
const latinFont = fs.readdirSync(path.join(DIST, "assets")).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f));
const fontPreload = latinFont
  ? `<link rel="preload" href="${base}assets/${latinFont}" as="font" type="font/woff2" crossorigin />`
  : "";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const head = (lang) => {
  const { meta, hero } = messages[lang];
  const url = `${SITE}/${lang}`;
  const other = LANGS.find((l) => l !== lang);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thomas Livon",
    jobTitle: hero.role,
    url,
    image: `${SITE}/og-image.png`,
    sameAs: ["https://www.linkedin.com/in/thomas-livon-852b84203/", "https://github.com/Thlivon"],
    address: { "@type": "PostalAddress", addressRegion: "Buenos Aires", addressCountry: "AR" },
  };
  return [
    fontPreload,
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Thomas Livon" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.title)}" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${messages[other].meta.ogLocale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${SITE}/og-image.png" />`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\u003c")}</script>`,
  ].join("\n    ");
};

const page = (lang, html) => {
  const out = template
    .replace('<html lang="es">', `<html lang="${lang}">`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, head(lang))
    .replace("<!--app-html-->", html);
  if (out.includes("<!--app-head-->") || (html && !out.includes(html.slice(0, 50)))) {
    throw new Error(`prerender: no se encontraron los placeholders en dist/index.html (${lang})`);
  }
  return out;
};

for (const lang of LANGS) {
  const html = render(`${base}${lang}`);
  fs.mkdirSync(path.join(DIST, lang), { recursive: true });
  fs.writeFileSync(path.join(DIST, lang, "index.html"), page(lang, html));
  console.log(`prerender: /${lang} (${Math.round(html.length / 1024)} KB de HTML)`);
}
fs.writeFileSync(path.join(DIST, "index.html"), page("es", ""));
fs.rmSync(path.join(DIST, "server"), { recursive: true, force: true });
