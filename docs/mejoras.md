# Análisis de mejoras — thomas-livon.vercel.app

Fecha: 2026-09-24. Reemplaza el análisis del 2026-09-20 (lo resuelto de ese análisis está en `docs/changelog.md`).
Revisado sobre `main` (`e25d102`) con el dev server, desktop (1024px) y mobile (375×812), midiendo en el DOM.

> **Estado (2026-09-24, rama `feat/mejoras-ux-perf`)**: aplicado todo salvo lo que necesita contenido real o acciones en cuentas externas: `project2` (captura/repo), CV en PDF, logros medibles en Experiencia, foto, testimonios, páginas por proyecto, formulario con backend, dominio propio y activar Analytics/Speed Insights en el dashboard de Vercel. Detalle en `docs/changelog.md` (entrada 13).

Leyenda de esfuerzo: **S** < 30 min · **M** 1–2 h · **L** medio día o más.

---

## 1. Bugs verificados (arreglar primero)

| # | Problema | Dónde | Evidencia / fix | Esf. |
|---|----------|-------|-----------------|------|
| 1.1 | Las barras de skills no se animan | `SkillsSection.jsx:57`, `index.css` | La clase `animate-[grow_1.5s_ease-out]` apunta a un `@keyframes grow` que **no existe** (en el CSS solo hay `bounce`, `pulse-subtle`, `fade-in`, `meteor`). Definirlo en `@theme` (`from { transform: scaleX(0) } to { transform: scaleX(1) }`) o sacar la clase. | S |
| 1.2 | Los 4 meteoros arrancan a la vez | `StarBackground.jsx:73` | `animationDelay: meteor.delay` es un número sin unidad → React lo descarta (`style.animationDelay === ""`). Debe ser `meteor.delay + "s"`. | S |
| 1.3 | "Desplázate" se superpone al botón del Hero en mobile | `HeroSection.jsx:37` | A 375px el párrafo del hero mide **532px**; el indicador `absolute bottom-8` queda por encima del borde inferior del CTA. Se arregla solo acortando el texto del hero (ver 2.1); además usar `min-h-svh` en vez de `min-h-screen` (la barra del navegador mobile recorta `100vh`). | S |
| 1.4 | "Sobre mí" se parte en dos líneas en el navbar a 1024px | `Navbar.jsx:55` | 7 links + ES/EN + tema con `space-x-8` no entran entre 768 y ~1100px. Opciones: `whitespace-nowrap` + `space-x-5`, mostrar los links desde `lg:` (hamburguesa hasta 1024), o bajar a 5 links (Inicio es redundante con el logo; Educación puede ir dentro de "Sobre mí"). | S |
| 1.5 | Las estrellas se regeneran al scrollear en mobile | `StarBackground.jsx:16` | En iOS/Android, ocultar/mostrar la barra de URL dispara `resize` → las estrellas saltan de lugar mientras se scrollea. Regenerar solo si cambia el **ancho**, o directamente no escuchar `resize` (las posiciones están en %). | S |
| 1.6 | `project2.png` sigue sin existir | `public/projects/` | La card de VB.NET muestra el ícono de imagen rota y tampoco tiene demo ni repo → es la card más débil. Subir captura + repo, o quitarla. | S |
| 1.7 | Lint roto (5 errores) | `ContactSection.jsx`, `vite.config.js` | 3 por el form comentado (`cn`, `isSubmitting`, `handleSubmit`) y 2 porque ESLint no sabe que `vite.config.js` corre en Node (`process`, `__dirname`): agregar `globals.node` para ese archivo en `eslint.config.js`. | S |

---

## 2. UX / contenido (lo que más impacta en un reclutador)

Un reclutador mira un portfolio 30–60 segundos. Hoy el primer pantallazo no responde **qué hace Thomas** y el recorrido completo mide **~7.800px en desktop y ~14.800px en mobile (≈18 pantallas)**.

### 2.1 Hero: falta el rol y sobra texto — **S**
- El `<h1>` dice "Hola, soy Thomas Livon" pero el rol ("Desarrollador FullStack & Analista de Sistemas") recién aparece en About. Debería estar en el hero, grande, debajo del nombre.
- La descripción tiene **83 palabras** de frases genéricas ("orientación a resultados medibles", "transformación digital", "soluciones escalables") y además repite casi literal el párrafo 1 de About. Reemplazar por **1 línea concreta** (≤ 25 palabras), p. ej.:
  > Desarrollo aplicaciones de gestión con SQL Server, Oracle y JavaScript. +5 años en proyectos para banca, salud y seguros.
- Dos CTAs: primario "Ver proyectos" y secundario "Descargar CV" (el CV hoy está enterrado en About).
- Opcional: badge "Disponible para nuevas oportunidades" y links a LinkedIn/GitHub como íconos debajo de los CTAs.
- Opcional: foto. Un portfolio sin cara es menos memorable; una foto circular en el hero o en About sube la confianza.

### 2.2 Skills: 22 cards con barras es la sección más larga y menos informativa — **M**
- En mobile mide **3.768px** (casi 5 pantallas) para mostrar 22 nombres.
- Las barras implican una precisión que no existe ("SQL Server 100%", "C 45%"): ya se reemplazó el % por texto, pero la barra sigue comunicando el número.
- Propuesta: 3 bloques (Frontend / Backend & Datos / Herramientas) con **chips** agrupados por nivel, o chips con ícono del logo. Entra en ~1 pantalla, se lee de un vistazo y se pueden eliminar los filtros (que con chips ya no hacen falta).
- Revisar la lista: "Desarrollo de Formularios" y "Windows Forms" no son skills que un reclutador busque; "n8n-AI workflow automation" → "n8n". Agrupar ".NET Framework / ASP.NET Core / Windows Forms / VB.NET" en uno o dos chips.

### 2.3 Proyectos: son lo más fuerte y están en el 5º lugar — **M**
- Orden actual: Hero → About → Experiencia → Skills → **Proyectos** → Educación → Contacto. Sugerido: Hero → **Proyectos** → Experiencia → Skills → About+Educación → Contacto. El CTA del hero ya dice "Ver mi trabajo"; que el trabajo esté justo después.
- Los links son solo íconos (`ExternalLink`, `Github`) de 20px sin texto ni `aria-label`. Cambiar por botones con texto: "Ver sitio" / "Código". Toda la card (o el título) debería ser clickeable hacia la demo.
- El badge "Sitio productivo" es un gran diferencial: mantenerlo, y agregar un dato de impacto por proyecto cuando exista (usuarios, ventas, horas ahorradas).
- Opcional: resaltar el proyecto principal (FileReplacer IA) como card grande a 2 columnas.

### 2.4 Experiencia: listas largas sin jerarquía — **S/M**
- Cada card lista 7 bullets de "tareas" (qué hacía) y ningún **logro** (qué cambió). Reescribir 2–3 bullets en formato acción + resultado ("Automaticé el deploy con Bash, reduciendo X a Y").
- En mobile la sección mide 2.268px. Opción: mostrar 3 bullets y un "Ver más" (`<details>` nativo, cero JS).
- Una línea de tiempo vertical (borde izquierdo + punto) comunica mejor la progresión Banfield GL → Engage que dos cards iguales.

### 2.5 Educación — **S**
- 5 cursos de Udemy (3 de SQL básico, 1,5–2 h) le restan peso a la licenciatura. Dejar la licenciatura destacada ("31/36 materias", quizás con una barra de progreso, que acá sí es un dato real) y los cursos en una lista compacta o colapsada.
- "Inglés: Intermedio básico" con el sitio en inglés disponible: es honesto, mantenerlo.

### 2.6 Contacto — **S**
- Es una lista centrada de 3 datos con mucho aire. Mejor: una card con título tipo "¿Hablamos?", botones grandes "Escribime por email" / "LinkedIn" y un botón "Copiar email" (`navigator.clipboard`, sin dependencias).
- Publicar el teléfono personal en un sitio público invita spam; considerar sacarlo o reemplazarlo por un link de WhatsApp (`wa.me/…`).
- "Links Útiles" → "Redes".
- Formulario: seguir sin él hasta tener backend (ya documentado en CLAUDE.md). Mientras tanto, **borrar** el código comentado y los imports muertos.

### 2.7 CV — **S**
- "Descargar CV" abre una **carpeta** de Google Drive (fricción + depende de permisos). Poner un PDF sin DNI/domicilio en `public/cv-thomas-livon.pdf` con `download`, uno por idioma si hace falta.

### 2.8 Navegación — **S/M**
- Sin indicador de sección activa: al scrollear no se sabe dónde se está. `IntersectionObserver` (nativo) + `text-primary` en el link activo.
- Menú mobile: no se cierra con `Escape`, no bloquea el scroll del body y el foco puede salir del overlay. Agregar `overflow-hidden` al `<body>` mientras esté abierto y cerrar con `Escape`.
- `#root { text-align: center }` global obliga a poner `text-left` en casi todo. Sacarlo y centrar solo lo que se quiere centrar.

---

## 3. Estética / UI

### 3.1 Tipografía — **S**
Hoy usa la fuente del sistema (`ui-sans-serif, system-ui`), que en Windows es Segoe UI: correcto pero sin personalidad. Una sola familia variable eleva todo el sitio. Recomendado: **Inter**, **Geist** o **Plus Jakarta Sans** vía `@fontsource-variable/*` (self-hosted, sin request a Google) o Google Fonts con `display=swap`. Headings con `tracking-tight` y peso 700; cuerpo a 400.

### 3.2 Sistema visual repetitivo — **M**
Todas las secciones usan el mismo patrón: `h2` centrado con una palabra en violeta + grilla de `bg-card rounded-lg` idénticas. Resultado: todo tiene el mismo peso visual y nada se destaca. Ideas:
- Un "eyebrow" pequeño sobre cada título (`01 · Proyectos`) en `text-primary uppercase tracking-widest text-sm`, títulos alineados a la izquierda en desktop.
- Variar el layout por sección: proyectos en grilla con imagen, experiencia como timeline, skills como chips, contacto como banner CTA.
- Bordes sutiles (`border border-border`) en las cards en dark mode: hoy `card` (8%) sobre `background` (4%) casi no se distingue.

### 3.3 `card-hover` en todo — **S**
`hover:scale-[1.02]` se aplica también a cards **no clickeables** (About, Experiencia, Educación, Skills). Sugiere interacción que no existe, y escalar un bloque grande de texto lo desenfoca un instante. Dejar el hover solo en proyectos y usar un cambio de borde/sombra en vez de escala.

### 3.4 Fondo de estrellas — **S**
- En light mode las estrellas son `bg-white` sobre fondo casi blanco: invisibles (se renderizan igual). O se ocultan en light (`dark:block hidden`) o se usa un color con contraste.
- Los meteoros son vistosos pero con 4 simultáneos distraen de la lectura; con el fix 1.2 quedan escalonados, que es lo que se buscaba.

### 3.5 Contraste — **S**
- Dark mode: texto del `cosmic-button` sobre `primary` mide **3.29:1** (medido en el DOM) → no cumple AA (4.5:1). Usar texto oscuro (`--primary-foreground: 222 47% 11%`) o bajar la luminosidad del primary en dark a ~55%.
- Sol del toggle en `text-yellow-300` y luna en `text-blue-900` son colores fuera del sistema de tokens; usar `text-foreground`/`text-primary`.

### 3.6 Detalles — **S**
- Imagen de proyectos a `h-48` fijo con `object-cover`: las capturas (≈2.2:1) se recortan de forma distinta según el ancho. Usar `aspect-[16/9]` o `aspect-video`.
- Footer con `mt-12` después de Contacto (`bg-secondary/30`) deja una franja de fondo distinto; sacar el margen.
- Favicon: maletín genérico de Lucide. Un monograma "TL" en SVG con el violeta de la marca identifica mejor la pestaña.
- Página 404 correcta pero plana; reutilizar `StarBackground` le da coherencia (costo cero).

---

## 4. Performance

Build actual: **JS 321,6 KB (100,8 KB gzip)**, CSS 35 KB (6,6 KB gzip). Para una página de contenido estático es pesado pero no crítico. Prioridades:

| # | Mejora | Detalle | Esf. |
|---|--------|---------|------|
| 4.1 | Imágenes de proyectos sobredimensionadas | Se sirven a **1350–1919px** de ancho para un slot de ~330×192px. `project3.png` pesa 280 KB. Exportar a **WebP ~800px** (≈30–50 KB c/u), agregar `loading="lazy"`, `decoding="async"` y `width`/`height` (evita CLS). Con `squoosh` o `sharp` una vez, sin plugin. | S |
| 4.2 | SEO/primer render: todo es client-side | `index.html` solo tiene `<div id="root">`: hasta que baja y ejecuta 100 KB de JS no hay nada (ni para Google ni para la preview de LinkedIn/WhatsApp, que **no ejecutan JS**). Pre-renderizar `/es` y `/en` a HTML estático en el build (p. ej. `vite-react-ssg`, o un script de `react-dom/server` → `renderToString` en `postbuild`). Es el cambio de mayor impacto en LCP y SEO. | L |
| 4.3 | Metadatos | Sigue `<html lang="en">`, sin `meta description`, sin Open Graph (al compartir el link en LinkedIn no hay imagen ni descripción), sin `canonical`, `hreflang` es/en, `robots.txt`, `sitemap.xml`, JSON-LD `Person`. Mínimo viable sin prerender: meta estáticos en `index.html` en español + `og:image` (captura 1200×630 en `public/`). | S |
| 4.4 | Flash de tema | El tema se aplica en `useEffect` → primer frame siempre sin `.dark`. Script inline en `<head>` que lea `localStorage` antes de pintar. Además hoy se ignora `prefers-color-scheme`: usarlo como default si no hay preferencia guardada. | S |
| 4.5 | Dependencias muertas | `@radix-ui/react-toast`, `class-variance-authority`, `components/ui/toast*`, `hooks/use-toast.js` y el `<Toaster/>` de `App.jsx` solo existen para el form comentado. Borrarlos baja el bundle (~15–20 KB) y el mantenimiento. `gh-pages` + `base` condicional también, si GitHub Pages ya no se usa. | S |
| 4.6 | `StarBackground` | ~80–200 `div` con `box-shadow` animando `opacity` en capas `fixed`: repinta en cada frame en equipos modestos. Opciones en orden de esfuerzo: reducir la densidad (`/ 20000`), `will-change: opacity`, o un único `<canvas>`/CSS `radial-gradient` estático con 2–3 capas animadas. | S/M |
| 4.7 | Listener de scroll | `Navbar` agrega el listener sin `{ passive: true }`. Mejora marginal, una línea. | S |
| 4.8 | Medir | Activar **Vercel Speed Insights + Analytics** (gratis en Hobby) para tener Web Vitals reales y saber cuántas visitas llegan a proyectos/contacto. | S |

`react-router-dom` (~20 KB gzip) está justificado ahora que hay rutas `/es`, `/en` y 404; no vale la pena reemplazarlo.

---

## 5. Features nuevas que suman (opcionales)

Ordenadas por relación valor/esfuerzo:

1. **Copiar email** con confirmación visual (`navigator.clipboard`) — S.
2. **Sección activa en navbar** (IntersectionObserver) — S.
3. **Página por proyecto** (`/es/proyectos/file-replacer`) con problema → solución → stack → capturas → resultado. Es lo que diferencia un portfolio de un CV; reutiliza el router que ya existe — M/L.
4. **Animaciones de entrada por sección** al hacer scroll (IntersectionObserver + clase `animate-fade-in`, ya definida) respetando `prefers-reduced-motion` (ya está en el CSS) — S.
5. **Testimonios / recomendaciones** de LinkedIn (1–2 frases de un líder o cliente) — S de código, depende de conseguirlas.
6. **Formulario de contacto real** con Formspree o una Vercel Function + Resend (ya documentado) — M.
7. Dominio propio (`thomaslivon.com.ar`) — S, costo anual.

---

## 6. Código / mantenibilidad

- `vite.config.js` fuera de ESLint Node globals (ver 1.7).
- Espacios sueltos `{" "}` dentro de headings y `<span>`s (`" {card.title}"`, `" {messages.hero.greeting}"`) que generan espacios dobles en el texto: limpiar.
- `ICONS[index]` en About acopla el orden del JSON a un array de íconos; aceptable mientras sean 3 cards, pero si se reordena el JSON los íconos se desalinean.
- CI: workflow de GitHub Actions con `npm run lint && npm run build` en PRs (Vercel no bloquea por lint).

---

## Priorización sugerida

1. **Rápido y de alto impacto (≈2 h):** 1.1–1.7, hero con rol + texto corto + 2 CTAs (2.1), meta/OG + `lang` (4.3), imágenes WebP + lazy (4.1), script anti-flash (4.4), borrar código muerto del form/toast (4.5), contraste del botón (3.5).
2. **Rediseño liviano (≈medio día):** reordenar secciones con Proyectos arriba (2.3), skills a chips (2.2), tipografía (3.1), hover solo en cards clickeables (3.3), sección activa en navbar (2.8), CV en PDF (2.7), contacto como CTA (2.6).
3. **Estructural:** prerender/SSG para SEO y previews sociales (4.2), páginas por proyecto (5.3), timeline de experiencia con logros (2.4), Speed Insights (4.8).
