# CLAUDE.md

Guía para trabajar en este repo (portfolio personal de Thomas Livon).

## Stack

React 19 + Vite 6 + Tailwind CSS v4 (`@theme` en `src/index.css`, sin `tailwind.config.js`) + react-router-dom v7. Sin backend: sitio 100% estático (SPA).

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build del cliente + build SSR + pre-render de /es y /en a dist/
npm run lint     # ESLint
npm run preview  # sirve el build de dist/
```

## Deploy

Dos destinos activos, resueltos en `vite.config.js` vía `process.env.VERCEL`:
- **Vercel** (principal, dominio `portfolio.tl256.com` vía CNAME en Cloudflare; `thomas-livon.vercel.app` sigue activo hasta actualizar los CV): `base: "/"`. `vercel.json` reescribe todo a `index.html` (necesario para el SPA con rutas `/es`, `/en`).
- **GitHub Pages** (legado, ver `package.json` scripts `gh-pages`/`predeploy`): `base: "/portfolio/"`.

Si se abandona GitHub Pages, borrar `homepage`/`gh-pages` de `package.json`, el `base` condicional y el `basename` de `BrowserRouter`.

## Pre-render (SSG casero)

`npm run build` corre tres pasos: `vite build` (cliente), `vite build --ssr src/entry-server.jsx --outDir dist/server` y `node scripts/prerender.js`, que renderiza `App` con `StaticRouter` y escribe `dist/es/index.html` y `dist/en/index.html` con el HTML y los meta tags (title, description, OG, hreflang, JSON-LD) de cada idioma. `dist/index.html` queda como shell (la raíz redirige por idioma en el cliente). `main.jsx` usa `hydrateRoot` si `#root` ya tiene contenido.

Consecuencias:
- Los componentes se ejecutan también en Node: **nada de `window`/`document`/`localStorage` durante el render**, solo dentro de `useEffect` o handlers.
- El primer render del cliente tiene que coincidir con el del servidor (sin `Math.random()`, fechas variables ni lectura del tema en el render). El tema lo aplica un script inline en `index.html` antes de pintar; `ThemeToggle` no tiene estado y el ícono sale de CSS (`dark:`).
- `index.html` tiene los marcadores `<!--app-head-->…<!--/app-head-->` y `<!--app-html-->` que usa el script: no borrarlos.
- `vercel.json` reescribe `/es` y `/en` a sus `index.html` y el resto a la shell.

## Internacionalización (i18n)

- Idiomas: **es** (principal) e **en**. Rutas `/es` y `/en` (`src/App.jsx`). La raíz `/` detecta `navigator.language` y redirige (`src/i18n/languages.js`).
- **Ninguna cadena visible al usuario va hardcodeada en un componente.** Todo vive en `src/messages/es.json` y `src/messages/en.json` (mismas claves en ambos archivos).
- `meta.title` / `meta.description` de cada JSON alimentan el `<head>` pre-renderizado y el `document.title` al cambiar de idioma.
- Datos de contacto que no dependen del idioma (email, teléfono, LinkedIn, GitHub, URL del CV) están en `src/lib/profile.js`.
- Español con voseo ("Escribime", "Desplazate").
- Los componentes leen `const { messages, lang } = useTranslations()` (`src/i18n/LanguageProvider.jsx`) y acceden por ruta de objeto, p. ej. `messages.hero.cta`. No hay interpolación/pluralización: si hace falta, resolverla en el propio JSON (entradas separadas) antes que agregar una librería.
- Al agregar una sección o dato nuevo (skill, proyecto, experiencia): agregar la clave en **ambos** JSON antes de usarla en el componente.
- Nombres propios (Thomas Livon, nombres de empresas/clientes, tecnologías como "React" o "SQL Server") no requieren traducción pero igual se guardan en el JSON si aparecen en un array de datos (skills, proyectos, etc.) para mantener una sola fuente de contenido por idioma.

## Estilos / tokens de color

`src/index.css` define los tokens Tailwind v4 en `@theme` (mapeados a variables `--color-*`) y los valores HSL reales en `:root` (light) y `.dark`. Si un componente usa una utilidad `bg-x`/`text-x`/`border-x` nueva, el token `--x` **tiene que existir en ambos bloques** (`:root` y `.dark`) o el estilo se aplica sin color (texto/fondo transparente, sin jerarquía visual). Antes de usar una clase Tailwind con color, confirmar que el token está definido acá.

- La variante `dark:` está atada a la clase `.dark` de `<html>` (`@custom-variant` al inicio de `index.css`), no a `prefers-color-scheme`.
- Utilidades propias: `cosmic-button` (botón primario), `outline-button` (secundario), `card-hover` (**solo** para cards clickeables, hoy las de proyectos), `text-gradient`, `text-glow`.
- Cada sección usa `SectionHeading` ("01 · Proyectos" + título). La numeración sale del orden del array `SECTIONS` en `pages/Home.jsx`; si se reordena, actualizar también `NAV_LINKS` en `Navbar.jsx`.

## Estructura

```
src/
├── components/     # secciones de la home + Navbar, ThemeToggle, LanguageSwitcher
├── i18n/           # LanguageProvider, detección/validación de idioma
├── messages/       # es.json, en.json — todo el contenido textual
├── pages/          # Home, NotFound
├── lib/            # cn, profile.js (datos de contacto)
scripts/prerender.js  # post-build: HTML estático por idioma
```

Los datos de cada sección (skills, experiencia, educación, proyectos) están embebidos dentro de `messages/*.json`, no en los componentes ni en `src/data/`.

## Cosas a tener en cuenta

- No hay formulario de contacto: se eliminó el que estaba comentado (y `@radix-ui/react-toast`). Si se agrega uno, tiene que ir conectado a un backend real (Formspree/Resend/EmailJS/Vercel Function).
- Imágenes de proyectos: WebP de 800px de ancho en `public/projects/` (proporción ~2.2:1). Un proyecto con `"image": ""` muestra un placeholder.
- Skills: `level` (0-100) no se muestra como número; solo agrupa en Avanzado (≥80) / Intermedio (≥60) / Básico.
- CI: `.github/workflows/ci.yml` corre lint + build en cada push a `main` y en PRs.
- El CV en `docs/*.docx` **no se commitea** (tiene DNI y domicilio). Queda solo local.
- `docs/mejoras.md` tiene el análisis completo de mejoras pendientes, priorizado. `docs/changelog.md` se actualiza después de cada cambio relevante (qué se hizo, decisiones, pendientes).
