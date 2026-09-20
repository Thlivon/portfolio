# Changelog

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
- CV (`docs/Thomas Livon Stetic (CV).docx`): agregados conocimientos de la página, sección de proyectos y links de GitHub/portfolio.

### Decisiones
- Se mantuvo compatibilidad con GitHub Pages en lugar de reemplazarlo por Vercel.
- Los tokens `text-muted-foreground` / `bg-secondary` no están definidos en `@theme`; no se tocaron para no cambiar el look sin consultar (ver análisis de mejoras).

### Pendiente
- `public/projects/project2.png` no existe (card de la app VB.NET sin imagen).
- Definir `--muted-foreground` y `--secondary` en `index.css`.
- Errores de lint preexistentes en `ContactSection.jsx` (formulario comentado).
