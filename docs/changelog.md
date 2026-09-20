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
- CV (`docs/Thomas Livon Stetic (CV).docx`, no versionado): agregados conocimientos de la página (TypeScript, Tailwind, MySQL, PostgreSQL, MongoDB, Spring Boot/Hibernate, .NET, Wix Corvid, Odoo, Bash), sección "Proyectos" con los 3 proyectos de la página, y links a GitHub y al portfolio en el encabezado. Columnas de Conocimientos rebalanceadas (11/11).
- Vercel: el repo ya tenía un proyecto "portfolio" vinculado; se renombró a "portofolio", se desactivó Vercel Authentication (los deploys pedían login) y se asignó el dominio `thomas-livon.vercel.app`.

### Decisiones
- Se mantuvo compatibilidad con GitHub Pages en lugar de reemplazarlo por Vercel.
- El `.docx` del CV NO se commitea: contiene DNI, domicilio y fecha de nacimiento y el repo es público. Queda en `docs/` solo localmente.
- Los tokens `text-muted-foreground` / `bg-secondary` no están definidos en `@theme`; no se tocaron para no cambiar el look sin consultar (ver análisis de mejoras).

### Pendiente
- Ver `docs/mejoras.md` (análisis completo priorizado). Lo más urgente: `window.screenY` → `scrollY` en Navbar, tokens de color faltantes en `@theme`, `project2.png` inexistente, `lang="es"` + meta description/OG, errores de lint en `ContactSection.jsx`.
