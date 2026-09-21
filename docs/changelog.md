# Changelog

## 2026-09-21 (3) — README actualizado

`README.md` reescrito para reflejar el estado actual: i18n ES/EN, stack real (React 19/Vite 6/Tailwind v4/react-router-dom v7), URL de producción en Vercel, estructura de carpetas con `i18n/`/`messages/`, mención a `CLAUDE.md` y a los comandos `/agregar-proyecto` y `/agregar-skill`. De paso corregido el link al repo (`portofolio` → `portfolio`, ítem 6 de `mejoras.md`) y el requisito de Node (v14 → v18, acorde a lo que usan las dependencias actuales).

## 2026-09-21 (2) — Fix navbar/theme toggle en mobile (menú, alineación, overlap)

El usuario probó en el celular real y reportó 3 bugs sobre lo entregado en la entrada anterior:
1. Al abrir el menú hamburguesa estando scrolleado (no arriba del todo), se veía mal (texto de fondo mezclado con los links del menú).
2. El ícono sol/luna no quedaba centrado con el ícono de hamburguesa al scrollear.
3. Arriba del todo, el navbar se superponía con el primer texto del Hero.

### Causa raíz
Los 3 síntomas volvían a la misma causa: `ThemeToggle` vivía como elemento `fixed` **independiente** (fuera de `<nav>`, montado en `Home.jsx`), con offsets manuales (`top-5 right-20`/`right-5`) que no comparten el mismo contenedor/padding que el navbar. Al no compartir el mismo box, cualquier diferencia de alto entre estados (py-5 vs py-3 al scrollear) los desalinea (bug 2), y en un dispositivo real con métricas ligeramente distintas puede terminar pisando el Hero (bug 3).

El bug 1 tenía una causa más puntual: `<nav>` llevaba `backdrop-blur-md` (cuando `isScrolled`) y el overlay del menú mobile (`fixed inset-0`, para taparlo todo) es descendiente de `<nav>`. Un ancestro con `filter`/`backdrop-filter` (o `transform`, `perspective`, `will-change`, `contain`) se convierte en el *containing block* de sus descendientes `position: fixed`, así que el overlay dejaba de posicionarse contra el viewport y pasaba a posicionarse contra la propia caja de `<nav>` (que mide ~64-80px de alto) — quedaba un overlay de ~64px con contenido desbordado y sin fondo opaco cubriendo el resto de la pantalla. Confirmado con `getBoundingClientRect()` en vivo: el overlay medía `top:0, bottom:64` en vez de `top:0, bottom:812`.

### Qué se hizo
- `Navbar.jsx`: reestructurado. `<nav>` ahora es un contenedor "limpio" (`fixed top-0 w-full z-40`, sin `backdrop-blur`); el fondo/blur que depende del scroll pasó a un `<div>` interno que envuelve solo la barra visible. El overlay del menú mobile quedó como hijo directo de `<nav>`, fuera de ese wrapper con blur, así que ya no tiene un ancestro con `backdrop-filter` y su `fixed inset-0` vuelve a resolverse contra el viewport real.
- `ThemeToggle` dejó de ser un elemento `fixed` flotante independiente: ahora se renderiza **dentro** de `Navbar.jsx`, en la misma fila flex que el link de hamburguesa (y junto a los links de desktop / `LanguageSwitcher` en pantallas `md+`). Al compartir contenedor y padding con el resto de los íconos, queda automáticamente alineado en cualquier estado de scroll y no puede superponerse con el Hero (ya no tiene una posición absoluta arbitraria).
- De paso corregido el typo `backdroup-blur-md` → `backdrop-blur-md` en el overlay (nunca se había aplicado el blur al fondo del menú mobile por este typo).
- `Home.jsx`: sacado el `<ThemeToggle />` suelto (ahora vive en `Navbar`).

### Verificado
Con DevTools del preview (mobile 375×812): overlay del menú mide `top:0, bottom:812` (cubre toda la pantalla) tanto en scroll 0 como en scroll 1000; sol/luna y hamburguesa quedan en la misma fila/altura en ambos estados de scroll; toggle de tema sigue funcionando (cambia `class="dark"` en `<html>`); `npm run build` sin errores.

### Decisiones
- No se agregó ninguna dependencia ni hook nuevo: el fix es puramente de estructura JSX/CSS (mover el `backdrop-filter` a un wrapper, mover `ThemeToggle` de lugar).

## 2026-09-21 — Fixes de mejoras.md (1.1/1.3/1.4), i18n es/en, CLAUDE.md y comandos

### Qué se hizo
- **1.1** `Navbar.jsx`: `window.screenY` → `window.scrollY`. El fondo translúcido del navbar al scrollear ahora funciona.
- **1.3** `index.css`: definidos los tokens que faltaban en `@theme` y en `:root`/`.dark` — `--color-secondary`, `--color-secondary-foreground`, `--color-muted-foreground`, `--color-input` (con sus variables HSL para light y dark). El texto "muted", las secciones con `bg-secondary/30` y los tags de proyectos/clientes ahora tienen el color correcto.
- **1.4** `ThemeToggle.jsx`: sacado `max-sm:hidden`. En mobile el botón de tema queda fijo arriba a la derecha (`right-20`), separado del botón de menú hamburguesa (`right-5`/dentro del container) para que no se superpongan; en desktop (`md:`) vuelve a `right-5`.
- **Internacionalización completa (es/en)**: rutas `/es` y `/en` vía `react-router-dom` (`src/App.jsx`), con redirect automático desde `/` según `navigator.language` (`src/i18n/languages.js`) y fallback a `/es` para rutas o idiomas inválidos. Contexto `LanguageProvider`/`useTranslations` (`src/i18n/LanguageProvider.jsx`) expone `messages` (contenido del idioma activo) y setea `document.documentElement.lang` dinámicamente.
  - Todo el contenido visible (nav, hero, about, skills, experiencia, educación, proyectos, contacto, footer, 404) se movió a `src/messages/es.json` y `src/messages/en.json` — nada quedó hardcodeado en los componentes. Esto también resuelve el mezcla-de-idiomas que señalaba la sección 3 del análisis (antes "About Me", "Featured Projects", etc. en inglés fijo con el resto en español).
  - `LanguageSwitcher.jsx` nuevo: selector ES/EN en el navbar (desktop y menú mobile).
  - De paso, al reescribir estos componentes se corrigieron bugs chicos en el mismo lugar: `key` faltante en tags de proyecto (`ProjectsSection.jsx`, ítem 6 del análisis), `target="_blank"` sin `rel="noopener noreferrer"` (Projects, Contact — ítem 4), el `<a>` sin `href` de "Ubicación" cambiado a `<p>`, y `aria-pressed` en los filtros de skills.
- **CLAUDE.md** nuevo en la raíz: stack, comandos, deploy (Vercel/GitHub Pages), reglas de i18n (todo string en los JSON de mensajes), reglas de tokens de color, estructura y deuda conocida (form de contacto comentado, CV no versionado).
- **`.claude/commands/`** nuevo: `agregar-proyecto.md` (agrega una card a Featured Projects — pide los datos que falten y edita `projects.items` en ambos JSON) y `agregar-skill.md` (mismo mecanismo para `skills.items`).
- `.claude/launch.json`: agregado `"autoPort": true` (el puerto 5173 suele estar ocupado por otro proyecto en esta máquina).

### Decisiones
- i18n implementado sin librería nueva (sin `react-i18next`/`next-intl`): un `LanguageProvider` de contexto + JSON estáticos alcanza para un portfolio de una sola página; evita una dependencia para lo que es en esencia una lookup table.
- No se tocó el formulario de contacto comentado ni los 3 errores de ESLint que genera (`ContactSection.jsx`) ni los typos de Tailwind del ítem 1.6 — quedan fuera del alcance pedido (se limitó a 1.1/1.3/1.4 + extras explícitamente pedidos).
- El primary color en light mode (contraste AA, ítem 4 del análisis) no se tocó — no estaba en el alcance pedido.

### Pendiente
- Ver `docs/mejoras.md`: quedan 1.2 (`project2.png` faltante), 1.5 (form de contacto), 1.6 (typos Tailwind), SEO (sección 2), performance (sección 5) y el resto de accesibilidad/código de la sección 4/6.
- Verificado con `npm run build` y navegación manual en el preview (`/es`, `/en`, switch de idioma, 404, scroll navbar, mobile). No se corrió `npm run lint` como gate porque ya fallaba antes de este cambio (ver Decisiones).

## 2026-09-20 — Sincronización CV ↔ página, deploy en Vercel

### Qué se hizo
- Nueva sección **Experiencia** (`src/components/ExperienceSection.jsx`): Engage Business Solution y Banfield GL con bullets, clientes y proyectos destacados, tomados del CV.
- Nueva sección **Educación & Cursos** (`src/components/EducationSection.jsx`): formación académica, 5 cursos de Udemy e idiomas, tomados del CV.
- `Navbar`: links a `#experience` y `#education`.
- `Home`: orden de secciones Hero → About → Experience → Skills → Projects → Education → Contact.
- Hero y About: "más de 4 años" → "más de 5 años" (alineado con el CV). About menciona SNP, SUME y documentación.
- Skills: agregado "Claude Code" (tools).
- `App.jsx`: `BrowserRouter` con `basename={import.meta.env.BASE_URL}`. Sin esto la ruta raíz no coincidía y se mostraba `NotFound` bajo `/portfolio/`.
- `ProjectsSection`: imágenes resueltas con `BASE_URL` (antes usaban `/projects/...` absoluto y se rompían con `base: /portfolio/`).
- `vite.config.js`: `base` condicional — `/` cuando `VERCEL=1`, `/portfolio/` para GitHub Pages.
- `vercel.json`: rewrite SPA a `index.html`.
- CV (`docs/Thomas Livon Stetic (CV).docx`, no versionado): agregados conocimientos de la página (TypeScript, Tailwind, MySQL, PostgreSQL, MongoDB, Spring Boot/Hibernate, .NET, Wix Corvid, Odoo, Bash), sección "Proyectos" con los 3 proyectos de la página, y links a GitHub y al portfolio en el encabezado. Columnas de Conocimientos rebalanceadas (11/11).
- Vercel: el repo ya tenía un proyecto "portfolio" vinculado; se renombró a "portofolio", se desactivó Vercel Authentication (los deploys pedían login) y se asignó el dominio `thomas-livon.vercel.app`.

### Decisiones
- Se mantuvo compatibilidad con GitHub Pages en lugar de reemplazarlo por Vercel.
- El `.docx` del CV NO se commitea: contiene DNI, domicilio y fecha de nacimiento y el repo es público. Queda en `docs/` solo localmente.
- Los tokens `text-muted-foreground` / `bg-secondary` no están definidos en `@theme`; no se tocaron para no cambiar el look sin consultar (ver análisis de mejoras).

### Pendiente
- Ver `docs/mejoras.md` (análisis completo priorizado). Lo más urgente: `window.screenY` → `scrollY` en Navbar, tokens de color faltantes en `@theme`, `project2.png` inexistente, `lang="es"` + meta description/OG, errores de lint en `ContactSection.jsx`.
