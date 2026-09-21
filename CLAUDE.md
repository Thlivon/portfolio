# CLAUDE.md

Guía para trabajar en este repo (portfolio personal de Thomas Livon).

## Stack

React 19 + Vite 6 + Tailwind CSS v4 (`@theme` en `src/index.css`, sin `tailwind.config.js`) + react-router-dom v7. Sin backend: sitio 100% estático (SPA).

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción a dist/
npm run lint     # ESLint
npm run preview  # sirve el build de dist/
```

## Deploy

Dos destinos activos, resueltos en `vite.config.js` vía `process.env.VERCEL`:
- **Vercel** (principal, `thomas-livon.vercel.app`): `base: "/"`. `vercel.json` reescribe todo a `index.html` (necesario para el SPA con rutas `/es`, `/en`).
- **GitHub Pages** (legado, ver `package.json` scripts `gh-pages`/`predeploy`): `base: "/portfolio/"`.

Si se abandona GitHub Pages, borrar `homepage`/`gh-pages` de `package.json`, el `base` condicional y el `basename` de `BrowserRouter`.

## Internacionalización (i18n)

- Idiomas: **es** (principal) e **en**. Rutas `/es` y `/en` (`src/App.jsx`). La raíz `/` detecta `navigator.language` y redirige (`src/i18n/languages.js`).
- **Ninguna cadena visible al usuario va hardcodeada en un componente.** Todo vive en `src/messages/es.json` y `src/messages/en.json` (mismas claves en ambos archivos).
- Los componentes leen `const { messages, lang } = useTranslations()` (`src/i18n/LanguageProvider.jsx`) y acceden por ruta de objeto, p. ej. `messages.hero.cta`. No hay interpolación/pluralización: si hace falta, resolverla en el propio JSON (entradas separadas) antes que agregar una librería.
- Al agregar una sección o dato nuevo (skill, proyecto, experiencia): agregar la clave en **ambos** JSON antes de usarla en el componente.
- Nombres propios (Thomas Livon, nombres de empresas/clientes, tecnologías como "React" o "SQL Server") no requieren traducción pero igual se guardan en el JSON si aparecen en un array de datos (skills, proyectos, etc.) para mantener una sola fuente de contenido por idioma.

## Estilos / tokens de color

`src/index.css` define los tokens Tailwind v4 en `@theme` (mapeados a variables `--color-*`) y los valores HSL reales en `:root` (light) y `.dark`. Si un componente usa una utilidad `bg-x`/`text-x`/`border-x` nueva, el token `--x` **tiene que existir en ambos bloques** (`:root` y `.dark`) o el estilo se aplica sin color (texto/fondo transparente, sin jerarquía visual). Antes de usar una clase Tailwind con color, confirmar que el token está definido acá.

## Estructura

```
src/
├── components/     # secciones de la home + Navbar, ThemeToggle, LanguageSwitcher
├── i18n/           # LanguageProvider, detección/validación de idioma
├── messages/       # es.json, en.json — todo el contenido textual
├── pages/          # Home, NotFound
├── hooks/, lib/    # utilidades (cn, useToast)
```

Los datos de cada sección (skills, experiencia, educación, proyectos) están embebidos dentro de `messages/*.json`, no en los componentes ni en `src/data/`.

## Cosas a tener en cuenta

- `ContactSection.jsx` tiene un formulario y el toast de confirmación comentados (`useToast`, `isSubmitting`, etc. siguen importados). Es deuda conocida (ver `docs/mejoras.md` ítem 1.5): no reactivarlo sin conectar un backend real (Formspree/Resend/EmailJS/Vercel Function).
- El CV en `docs/*.docx` **no se commitea** (tiene DNI y domicilio). Queda solo local.
- `docs/mejoras.md` tiene el análisis completo de mejoras pendientes, priorizado. `docs/changelog.md` se actualiza después de cada cambio relevante (qué se hizo, decisiones, pendientes).
