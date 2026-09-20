# Análisis de ajustes y mejoras — thomas-livon.vercel.app

Fecha: 2026-09-20. Revisado sobre el deploy de producción (commit `33d7b48`) en desktop (1024px) y mobile (375px).

## 1. Bugs funcionales (arreglar primero)

| # | Problema | Dónde | Detalle |
|---|----------|-------|---------|
| 1.1 | La navbar nunca cambia a fondo translúcido al scrollear | `Navbar.jsx:19` | Usa `window.screenY` (posición de la ventana en la pantalla) en vez de `window.scrollY`. Verificado en producción: la clase `bg-background/80 backdrop-blur-md` jamás se aplica, por lo que el menú fijo se superpone al contenido sin fondo. |
| 1.2 | Imagen del proyecto 2 rota | `public/projects/` | `project2.png` no existe. La card "Aplicación de escritorio para Gestión de Ventas" muestra el alt text. Falta subir la captura. |
| 1.3 | Tokens de color no definidos | `index.css` `@theme` | `text-muted-foreground`, `bg-secondary`, `text-secondary-foreground`, `bg-secondary/30`, `border-input` se usan en todos los componentes pero no existen en `@theme`. Resultado: el texto "muted" tiene el mismo color que el principal (sin jerarquía visual), las secciones alternas no tienen fondo y los tags de proyectos son transparentes. Definir `--muted-foreground`, `--secondary`, `--secondary-foreground`, `--input` para light y dark. |
| 1.4 | Botón de tema oculto en mobile | `ThemeToggle.jsx:38` | `max-sm:hidden` → en celulares no se puede cambiar el tema. Moverlo dentro del navbar o del menú hamburguesa. |
| 1.5 | Formulario de contacto muerto | `ContactSection.jsx` | Está comentado, pero `useToast`, `isSubmitting`, `handleSubmit`, `Toaster` y `@radix-ui/react-toast` siguen en el bundle. O se conecta a un backend real (Formspree, Resend, EmailJS o una Vercel Function) o se elimina todo el código muerto (también arregla los 3 errores de ESLint). |
| 1.6 | Typos en clases Tailwind (no aplican) | varios | `max-2-2xl` (Hero), `text-forefround` y `hover:bd-secondary` (Skills), `backdroup-blur-md` (Navbar mobile), `foucs:ring-2` (form). |

## 2. SEO y metadatos

- `index.html` solo tiene `charset` y `viewport`. Faltan: `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), Twitter Card, `<link rel="canonical">`, `theme-color`.
- `<html lang="en">` pero el contenido está en español → `lang="es"`. Afecta lectores de pantalla, traducción automática y SEO.
- Título genérico: "Portfolio Thomas Livon". Mejor: "Thomas Livon — Desarrollador FullStack & Analista de Sistemas".
- Sin `robots.txt` ni `sitemap.xml` (Vercel no los genera).
- Sin favicon PNG / `apple-touch-icon` / `manifest.webmanifest` (solo SVG; Safari iOS no lo usa).
- Sin JSON-LD `Person` (nombre, título, sameAs LinkedIn/GitHub): ayuda a Google a mostrar el perfil.

## 3. Idioma y contenido

- Mezcla inglés/español: headings "About Me", "My Skills", "Featured Projects", "Contact", botón "View My Work", "Scroll", footer "All rights reserved", nav "Home/About/Skills/Projects/Contact" vs. cuerpo en español. Elegir un idioma (español, dado el público objetivo) o implementar i18n con toggle ES/EN.
- "Link Útiles" → "Links útiles" / "Redes".
- "Descargar CV" apunta a una carpeta de Google Drive, no a un archivo. Mejor: PDF estático en `public/cv.pdf` (sin DNI ni domicilio, ya que es público) con atributo `download`.
- Descripciones de proyectos muy cortas ("Sitio corporativo productivo."). Agregar 2–3 líneas: problema, solución, rol, resultado.
- Los % de skills (100% SQL Server, 45% C) son subjetivos y un reclutador los cuestiona. Alternativa: niveles cualitativos (Avanzado / Intermedio / Básico) o años de uso.
- Proyecto 2 (VB.NET) no tiene demo ni repo: no se ve ningún link. Subir el código a GitHub o quitar la card.
- La sección Experiencia es larga en mobile (listas + chips). Considerar colapsar bullets con "Ver más".

## 4. Accesibilidad

- Links de íconos sin nombre accesible: `ExternalLink`/`Github` en cada card de proyecto, `ArrowUp` en footer → agregar `aria-label`.
- Botón de tema sin `aria-label` ("Cambiar a modo claro/oscuro").
- `<a>` sin `href` en "Ubicación" (Contact) → usar `<span>` o `<p>`.
- Links con `target="_blank"` sin `rel="noopener noreferrer"` (proyectos, LinkedIn, GitHub, "Mi Github").
- Contraste: en light mode `--primary: 250 47% 60%` sobre blanco ronda 3.5:1 → no cumple AA para texto normal. Oscurecer un poco el primary en light.
- Sin `prefers-reduced-motion`: estrellas, meteoros y `animate-bounce` corren siempre.
- Botones de filtro de skills no indican estado (`aria-pressed`).

## 5. Performance

- `project3.png` pesa **704 KB** (1901×913). Convertir a WebP/AVIF ~60 KB, servir a 800px de ancho, y agregar `loading="lazy"` + `width/height` para evitar CLS. `project1.png` (45 KB) también a WebP.
- Bundle JS: 306 KB (96 KB gzip). `react-router-dom` (~35 KB) se usa para una sola ruta + 404: podría eliminarse y renderizar `<Home/>` directo. `@radix-ui/react-toast` se puede quitar si se elimina el form.
- `StarBackground` regenera todas las estrellas en cada evento `resize` (sin debounce) y crea hasta ~80 divs animados. Usar `<canvas>` o debounce + `will-change`.
- Cache: HTML con `max-age=0` está bien; los assets hasheados en `/assets/` ya se cachean por Vercel. Las imágenes en `/projects/` no llevan hash: si se reemplaza `project1.png` los usuarios verán la vieja hasta revalidar. Importarlas desde `src/assets` para que Vite las hashee.
- Flash de tema: el `dark` se aplica en `useEffect` (post-render) → parpadeo blanco→negro en carga. Aplicar la clase con un script inline en `<head>` antes de React.

## 6. Código / mantenibilidad

- `key={key}` con índice en todos los `.map` y falta `key` en los tags de proyectos (`ProjectsSection.jsx:64`) → warning de React y re-renders innecesarios. Usar `project.id`, `skill.name`, `tag`.
- Datos (skills, proyectos, experiencia, educación) están hardcodeados dentro de cada componente. Moverlos a `src/data/*.js` para editar el contenido sin tocar JSX y para poder generar el CV desde la misma fuente.
- `NotFound.jsx` es solo texto plano; darle estilo y link a Home.
- `package.json`: `homepage` y scripts `gh-pages` siguen apuntando a GitHub Pages. Si Vercel pasa a ser el hosting definitivo, quitar `gh-pages`, el `base` condicional y el `basename`.
- `README.md` tiene el link al repo mal escrito (`portofolio`) y no menciona la URL de producción.
- Sin CI: agregar un workflow que corra `npm run lint` y `npm run build` en cada PR (Vercel ya bloquea deploys con build roto, pero no con lint).
- ESLint falla (3 errores en `ContactSection.jsx`).

## 7. Vercel (configuración)

- Hecho en esta sesión: proyecto renombrado a `portofolio`, Vercel Authentication desactivada (antes pedía login para ver el sitio), dominio `thomas-livon.vercel.app` asignado, `vercel.json` con rewrite SPA.
- Sugerido: dominio propio (`thomaslivon.com` o `.com.ar`) — Vercel gestiona el SSL; activar Vercel Analytics y Speed Insights (gratis en Hobby) para ver visitas y Web Vitals; agregar headers de seguridad en `vercel.json` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`).
- Hay un deploy viejo en estado ERROR de la rama `gh-pages` (Vercel intentó construir la rama de artefactos). Si se mantiene GitHub Pages, ignorar esa rama en Vercel (Settings → Git → Ignored Build Step) o borrar la rama.

## Priorización sugerida

1. **Rápidos y de alto impacto (< 1 h):** 1.1 scrollY, 1.3 tokens de color, 1.6 typos, `lang="es"`, meta description + OG, `rel="noopener"`, `aria-label`s, keys, `loading="lazy"`.
2. **Contenido (1–2 h):** unificar idioma, subir `project2.png`, ampliar descripciones de proyectos, CV en PDF público sin datos sensibles, reemplazar % de skills.
3. **Performance (1 h):** imágenes a WebP con tamaño correcto, script anti-flash de tema, debounce en StarBackground.
4. **Estructurales (2–4 h):** decidir formulario de contacto (backend o quitar), extraer datos a `src/data`, quitar react-router/gh-pages si Vercel es definitivo, CI de lint+build, dominio propio + Analytics.
