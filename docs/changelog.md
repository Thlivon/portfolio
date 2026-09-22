# Changelog

## 2026-09-22 (9) — Descripciones de proyectos parejas, badge "Sitio productivo" y Contacto centrado

A pedido del usuario, con captura de la sección Contacto marcando qué centrar.

### Qué se hizo
- `messages/es.json` / `messages/en.json`: descripción de "Reemplazador de Archivos con IA" reducida a una sola oración (sacó la mención de PDF/DOCX/XLSX y el stack, que ya está en los `tags`). Reescritas las descripciones de "Módulo de Administración de Inmobiliaria", "E-commerce BanfieldGL" y "Aplicación de escritorio para Gestión de Ventas" a un largo similar (~145-155 caracteres) verificando contenido real: repos de GitHub (`odoo_unla_2025_grupo_m`, `gestion-ventas-vbnet`) y `banfieldgl.com` (tienda Wix de electrodomésticos).
- `messages/*.json`: nueva key `projects.productiveBadge` ("Sitio productivo" / "Production site") y flag `productive: true` en los items de "Reemplazador de Archivos con IA" y "E-commerce BanfieldGL" (los otros tres no son sitios web productivos: módulo Odoo, dashboard local, app de escritorio).
- `ProjectsSection.jsx`: card con `relative` + badge `absolute top-3 right-3` (`rounded-full`, `bg-primary`) que solo se renderiza si `project.productive` es true.
- `ContactSection.jsx`: cambiado `text-left` → `text-center` en el wrapper de "Información de Contacto", y agregado `justify-center` a las 4 filas `flex` (los 3 íconos de contacto + los íconos de "Links Útiles") para que todo el bloque quede centrado de forma consistente. Nota: esto revierte a propósito el fix de `text-left` de la entrada (7) de este changelog — ahí el pedido era alinear todo a la izquierda; ahora el pedido explícito del usuario es centrar todo el bloque, y esta vez heading + filas comparten la misma alineación (no queda la mezcla inconsistente que motivó el fix anterior).

### Verificado
Contenido y estilos verificados vía DOM/`getComputedStyle` en preview `/portfolio/es` y `/portfolio/en` (el screenshot del Browser pane devolvió negro sólido en esta sesión, aparentemente un problema de captura no relacionado con el cambio). Badge "Sitio productivo"/"Production site" aparece solo en los 2 proyectos correctos, con `position: absolute; top: 12px; right: 12px; border-radius: 9999px`. Contenedor de Contacto con `text-align: center` y filas con `justify-content: center`. `npm run lint`: mismos 5 errores preexistentes de `ContactSection.jsx` (form comentado, deuda conocida) y `vite.config.js` (no relacionados a este cambio).

### Pendiente
Ninguno.

## 2026-09-22 (8) — Agrega proyecto "Reemplazador de Archivos con IA" (File Replacer SaaS)

Nuevo proyecto vía `/agregar-proyecto`, a partir del README del repo privado `file-replacer-saas` (local en `Cursos Progamacion/Claude/file-replacer-saas`).

### Qué se hizo
- `messages/es.json` y `messages/en.json`: nuevo objeto al inicio de `projects.items` (título, descripción con foco en "sitio productivo" + stack, tags, `demoUrl: https://filereplacer.tl256.com/es`, `githubUrl: "#"` por ser repo privado).
- Reordenado `projects.items` en ambos idiomas al orden pedido por el usuario: File Replacer, Módulo de Administración de Inmobiliaria, E-commerce BanfieldGL, Analizador de Chats de WhatsApp, Aplicación de escritorio .NET.
- `public/projects/project5.png` ya estaba copiada por el usuario (38 KB, no requiere compresión).
- No se tocó `ProjectsSection.jsx` (itera `projects.items` dinámicamente).

### Verificado
`npm run build` sin errores. Preview visual en `/portfolio/es` y `/portfolio/en`: card nueva en primera posición con el orden correcto, imagen `project5.png` carga (`naturalWidth > 0`), link de demo apunta a `https://filereplacer.tl256.com/es`.

### Pendiente
Ninguno.

## 2026-09-21 (7) — Fix: bloque de Contacto desalineado (heading centrado vs filas a la izquierda)

El usuario mandó una captura: en "Información de Contacto" el `<h3>` se veía centrado mientras las filas de íconos (Email/Teléfono/Ubicación) arrancaban más a la izquierda — parecía descentrado.

### Causa raíz
`index.css` define `#root { text-align: center; }` (default del template de Vite, heredado globalmente). El `<h3>` de esa sección es un bloque que ocupa todo el ancho de `w-full max-w-md`, así que el texto quedaba centrado dentro de esa caja completa. Las filas de íconos, en cambio, son contenedores `flex` — `text-align` no reposiciona sus items (el ícono circular no es texto), así que quedaban pegadas al borde izquierdo del bloque. Dos alineaciones distintas conviviendo en el mismo bloque. El resto de las secciones con texto en columna (`ExperienceSection.jsx`, `EducationSection.jsx`) ya tenían `text-left` explícito para neutralizar este mismo global — a `ContactSection.jsx` le faltaba, porque antes tenía un layout de 2 columnas (form al lado) donde no se notaba.

### Qué se hizo
- `ContactSection.jsx`: agregado `text-left` al wrapper `space-y-8 w-full max-w-md` de "Información de Contacto" (heading, filas de íconos y "Links Útiles" ahora comparten el mismo borde izquierdo).
- Sacado `justify-center` de la fila de íconos de "Links Útiles" (quedaba centrada mientras el resto del bloque no) y de `space-y-6` (clase sin efecto — no es un contenedor flex, era un resto del layout anterior a 2 columnas).

### Verificado
`getBoundingClientRect()` contra el preview: heading, primera fila de íconos, heading "Links Útiles" y su fila de íconos comparten exactamente el mismo `left` (281px). `npm run build` sin errores; `npm run lint` con los mismos 5 errores preexistentes de siempre (no relacionados).

## 2026-09-21 (6) — Plan de mejoras visuales, tandas 1/2/3 implementadas

A pedido del usuario se armó un plan de mejoras visuales (vía Plan Mode) revisando cada componente y cruzándolo con `docs/mejoras.md`. El usuario aprobó el plan completo y eligió implementar las 3 tandas ahora, con placeholder para la imagen rota. Todo en `feat/mejoras-visuales`.

### Tier 1 — Bugs visuales activos
- `SkillsSection.jsx`: typo `text-forefround hover:bd-secondary` (clases inexistentes) → `text-foreground hover:bg-secondary`. Los botones de filtro inactivos ("Frontend"/"Backend"/"Herramientas") no tenían color de texto ni feedback de hover.
- `HeroSection.jsx`: typo `max-2-2xl` → `max-w-2xl`. El párrafo del Hero no tenía ancho máximo.
- `index.css`: `--primary` en `:root` (light) de `250 47% 60%` a `250 47% 48%` — el valor anterior daba ~3.5:1 de contraste sobre el fondo claro (no cumple AA 4.5:1 para texto). Dark mode no se tocó.
- `ProjectsSection.jsx`: nuevo subcomponente `ProjectImage` con `onError` — si una imagen de proyecto no carga (caso actual: falta `public/projects/project2.png`), se muestra un placeholder (ícono `ImageOff` sobre `bg-secondary`) en vez del ícono de imagen rota del navegador. Cubre cualquier imagen faltante, no solo esta.

### Tier 2 — Pulido por sección
- Unificado el estilo de card en toda la página: `AboutSection.jsx` y `EducationSection.jsx` usaban la utilidad `gradient-border` (sin sombra, `rounded-md`) mientras Experience/Skills/Projects usan `bg-card ... shadow-xs` (con sombra, `rounded-lg`) — convivían dos sistemas visuales distintos. Ahora las 4 secciones usan `bg-card p-6 rounded-lg shadow-xs [card-hover]`. Al quedar sin uso, se borró la utilidad `gradient-border` de `index.css`.
- `ExperienceSection.jsx`: los chips de "Clientes" y "Proyectos destacados" eran visualmente idénticos (mismo pill sólido). Ahora "Proyectos destacados" usa una variante outline (`border-primary/30 text-primary`, sin fondo) para diferenciarse de "Clientes" (que mantiene el pill sólido `bg-secondary`).
- `SkillsSection.jsx`: la barra de nivel ahora muestra "Avanzado/Intermedio/Básico" (umbrales ≥80/≥60/<60) en vez del "%" numérico. Strings nuevos en `messages.skills.levels` (es/en), respetando la regla de i18n del proyecto.
- `ContactSection.jsx`: con el form deshabilitado, el bloque de contacto quedaba centrado en un contenedor pensado para 2 columnas (`max-w-5xl`), con mucho aire a los costados en desktop. Se le agregó `max-w-md` al bloque de contenido.
- `Footer.jsx`: el contenido pasó a estar envuelto en `container mx-auto max-w-5xl` (como el resto de las secciones) en vez de `px-4` a ancho completo, para compartir el mismo margen izquierdo/derecho en pantallas anchas.

### Tier 3 — Consistencia de sistema
- `index.css`: agregada una regla global `@media (prefers-reduced-motion: reduce)` que fuerza `animation-duration`/`transition-duration` a ~0 y `scroll-behavior: auto` — cubre `animate-bounce` del Hero, las estrellas/meteoros de `StarBackground` y los `fade-in` sin tocar cada componente por separado.
- Revisado `max-w-4xl` del Hero vs `max-w-5xl` del resto de las secciones: se decidió dejarlo así — es intencional (línea de lectura más corta para el heading/CTA central del Hero) y no un bug.

### Verificado
Sin captura visual disponible en la sesión (panel de navegador oculto, screenshots devuelven canvas vacío). Verificado por layout/DOM real vía `javascript_tool` contra el preview (`npm run dev`): clases de los botones de filtro, labels de nivel de Skills ("Avanzado"×3/"Intermedio"/"Básico" para los primeros 5 ítems), `max-width: 672px` computado en el párrafo del Hero, `--primary` computado en light = `250 47% 48%` (con `.dark` sacada temporalmente vía JS) y en dark sin cambios, clases unificadas de cards en About/Education, chips diferenciados en Experience, ancho del bloque de Contacto, contenedor del Footer, y la card de `project2.png` mostrando el placeholder (`<svg>` de `ImageOff`) en vez de `<img>`. `npm run build` y `npm run lint` corridos: build sin errores, lint con los mismos 5 errores preexistentes de `ContactSection.jsx`/`vite.config.js` (no relacionados a este cambio).

### Decisiones
- No se tocó el formulario de contacto comentado ni los errores de ESLint que genera — deuda conocida, fuera de alcance.
- El placeholder de imagen rota es genérico (cualquier imagen que falle carga el fallback), no una condición hardcodeada para `project2.png`.

### Pendiente
- Subir `public/projects/project2.png` real cuando el usuario tenga la captura (mientras tanto se ve el placeholder, no una imagen rota).
- Ver `docs/mejoras.md` para lo que sigue fuera del alcance visual: SEO, performance, accesibilidad no visual, código muerto del form, extracción de datos a `src/data`.

## 2026-09-21 (5) — Mejoras visuales: cards de proyectos, íconos de contacto, footer

Pedido explícito del usuario de mejoras estéticas puntuales, en rama `feat/mejoras-visuales`.

### Qué se hizo
- **`ProjectsSection.jsx`**: los links de demo/GitHub de cada card quedaban a distinta altura entre sí porque el card se estiraba por el grid (todas las cards de una fila igualan altura) pero el contenido interno no era flex — el espacio extra quedaba como hueco debajo de los links en vez de empujarlos abajo. Se agregó `flex flex-col` al card y `flex flex-col flex-1` + `mt-auto` en la fila de links: ahora quedan siempre alineados contra el borde inferior del card, sin importar cuánto texto tenga la descripción.
- **`ContactSection.jsx`**: las 3 filas de "Información de Contacto" (Email/Teléfono/Ubicación) usaban `items-start`, que alinea el ícono circular contra la parte superior del bloque de texto de dos líneas — visualmente el ícono quedaba "más arriba" que el centro del texto. Cambiado a `items-center` en las 3 filas.
- **`Footer.jsx`**: tenía `py-12` y `pt-8` combinados en la misma clase (redundante, y quedaba muy alto para el contenido de una sola línea + botón). Reducido a `py-6`.

### Verificado
Sin captura visual disponible en la sesión (el panel del navegador quedó oculto y los screenshots devolvían un canvas vacío), se verificó por layout real vía `getBoundingClientRect()` en el preview (`npm run dev`): las 4 cards de proyectos quedan con los links a exactamente 24px (el padding del card) del borde inferior; en las 3 filas de contacto el centro vertical del ícono coincide exactamente con el centro del bloque de texto; el footer bajó de altura. `npm run lint` sigue con los mismos 5 errores preexistentes de `ContactSection.jsx` (form comentado, deuda conocida) y `vite.config.js` (globals de Node), no relacionados a este cambio.

### Decisiones
- No se tocó el layout general de Contacto (columna única centrada) ni se reactivó el formulario comentado — fuera del alcance pedido.

## 2026-09-21 (4) — Nuevo proyecto: Analizador de Chats de WhatsApp

Vía el comando `/agregar-proyecto`. Datos sacados del repo [Thlivon/tp-ing-soft-iii](https://github.com/Thlivon/tp-ing-soft-iii) (README + descripción del repo, sin necesidad de preguntarle al usuario nada extra): dashboard en Streamlit que analiza exports de chats de WhatsApp (usuario más activo, emojis frecuentes, horarios pico, nube de palabras), trabajo práctico de Ingeniería de Software III. Sin demo pública → `demoUrl: "#"`. Tags: Python, Streamlit, pandas. Imagen provista por el usuario en `public/projects/project4.png` (43 KB, no requiere compresión). Agregado a `projects.items` en `src/messages/es.json` y `en.json`. Verificado con `npm run build` y visualmente en `/es` y `/en`.
- Ajuste posterior a pedido del usuario: descripción acortada (se sacaron los horarios pico y la mención a la materia del texto) y reordenado — el Analizador de WhatsApp pasó a ser el 2º proyecto, "Aplicación de escritorio para Gestión de Ventas" pasó al 4º lugar (antes 2º).

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
