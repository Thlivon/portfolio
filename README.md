# Thomas Livon - Portfolio Personal

¡Bienvenido al repositorio de mi sitio web de portfolio personal! Este sitio web muestra mi trabajo, habilidades y experiencia como desarrollador.

🔗 Producción: [thomas-livon.vercel.app](https://thomas-livon.vercel.app)

## 🌟 Características

- **Bilingüe (ES/EN)**: sitio completo en español e inglés, con rutas `/es` y `/en` y detección automática del idioma del navegador
- **Diseño Responsivo**: sitio web completamente adaptable que funciona en todos los dispositivos
- **Tema Claro/Oscuro**: funcionalidad de cambio de tema, disponible también en mobile
- **Interfaz Moderna**: diseño limpio con fondo animado de estrellas y meteoros
- **Secciones**:
  - Hero con presentación
  - Sobre Mí
  - Experiencia laboral
  - Habilidades (filtrables por categoría)
  - Proyectos destacados
  - Educación y cursos
  - Contacto

## 🛠️ Construido Con

- **React 19** + **Vite 6** - Frontend y build
- **Tailwind CSS v4** - Estilos (tokens definidos en `src/index.css`, sin `tailwind.config.js`)
- **react-router-dom v7** - Ruteo (`/es`, `/en`)
- **ESLint** - Linting de código

## 🚀 Comenzando

### Requisitos Previos

- Node.js (v18 o superior)
- npm

### Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/Thlivon/portfolio.git
```

2. Instalar dependencias

```bash
npm install
```

3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

4. Abrir la URL que indique la consola (por defecto [http://localhost:5173](http://localhost:5173))

### Otros comandos

```bash
npm run build     # build de producción a dist/
npm run lint      # ESLint
npm run preview   # sirve el build de dist/
```

## 🌐 Internacionalización

El contenido en español e inglés vive en `src/messages/es.json` y `src/messages/en.json` — no hay texto hardcodeado en los componentes. Ver [CLAUDE.md](CLAUDE.md) para el detalle de cómo agregar o editar contenido.

## 📁 Estructura del Proyecto

```
src/
├── components/    # Navbar, ThemeToggle, LanguageSwitcher y las secciones de la home
├── i18n/          # detección de idioma y contexto de traducciones
├── messages/      # es.json, en.json — todo el contenido textual del sitio
├── hooks/         # hooks personalizados de React
├── lib/           # funciones de utilidad
└── pages/         # Home, NotFound
```

## 🤖 Comandos de Claude Code

Este repo incluye comandos personalizados en `.claude/commands/` para agregar contenido guiado por IA:

- `/agregar-proyecto` - agrega una card nueva a "Featured Projects"
- `/agregar-skill` - agrega una skill nueva a la sección "Skills"

Ver [CLAUDE.md](CLAUDE.md) para más contexto del proyecto (stack, deploy, convenciones).

## 📧 Contacto

Thomas Livon - thlivon@gmail.com
Link del proyecto: [https://github.com/Thlivon/portfolio](https://github.com/Thlivon/portfolio)

---

⭐️ Si te gusta este portafolio, ¡no olvides darle una estrella al repositorio!
