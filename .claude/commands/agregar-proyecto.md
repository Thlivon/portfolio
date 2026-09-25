---
description: Agrega un proyecto nuevo a la sección "Featured Projects" del portfolio
argument-hint: [título] [descripción] [tags separados por coma] [url demo] [url github]
---

Vas a agregar un proyecto nuevo a la sección "Featured Projects" (`ProjectsSection.jsx`) del portfolio. Los datos de los proyectos NO están en el componente: viven en `src/messages/es.json` y `src/messages/en.json`, bajo `projects.items` (mismo orden e índice en ambos archivos).

## 1. Reunir los datos

Argumentos recibidos en `$ARGUMENTS` (pueden venir vacíos o parciales). Para cada dato que falte, **preguntáselo al usuario antes de tocar código** — no inventes información del proyecto real de la persona:

- **Título** (es) — nombre corto del proyecto.
- **Descripción** (es) — 1-3 líneas: qué es, problema que resuelve o rol cumplido. Evitar descripciones de una sola frase genérica.
- **Tags/stack** — tecnologías principales (ej: "React, Node.js, PostgreSQL").
- **Imagen** — ruta a un archivo local para copiar a `public/projects/`, o confirmación de que ya existe ahí. El componente arma la URL con `import.meta.env.BASE_URL + project.image.replace(/^\//, "")`, así que en el JSON `image` va como `/projects/nombre-archivo.webp`. Si el usuario no tiene imagen todavía, usar `"image": ""`: la card muestra un placeholder ("Sin captura disponible").
- **URL de demo** — si no hay demo pública, usar `"#"` (el componente oculta el botón "Ver sitio" cuando el valor es `"#"`).
- **¿Sitio productivo?** — si está en producción con usuarios reales, agregar `"productive": true` (muestra el badge).
- **URL de GitHub** — ídem, `"#"` si el repo no es público.

## 2. Traducir al inglés

Generá vos mismo la traducción de título y descripción al inglés (no se la pidas al usuario salvo que prefiera darla él). Los tags/nombres de tecnologías normalmente no se traducen (React, PostgreSQL, etc. quedan igual en ambos idiomas).

## 3. Editar los JSON

Agregar un objeto nuevo al final del array `projects.items` en **ambos** `src/messages/es.json` y `src/messages/en.json`, con esta forma exacta (mismas claves que los proyectos existentes):

```json
{
  "title": "...",
  "description": "...",
  "image": "/projects/archivo.webp",
  "tags": ["...", "..."],
  "demoUrl": "...",
  "githubUrl": "..."
}
```

No toques `ProjectsSection.jsx`: ya itera `projects.items` dinámicamente, no requiere cambios.

## 4. Imagen

Si te pasaron un archivo de imagen, convertila a WebP de 800px de ancho (calidad ~80) y guardala en `public/projects/` con un nombre en minúsculas (ej. `project6.webp`). Con Python/Pillow: `Image.open(src).convert("RGB").resize((800, round(h * 800 / w))).save(dst, "WEBP", quality=80, method=6)`. Las cards usan proporción 2:1 recortando desde arriba, así que conviene una captura apaisada (~2.2:1).

## 5. Verificar

Correr `npm run build` para confirmar que no rompe nada, y si hay un preview disponible, revisar visualmente la nueva card en ambos idiomas (`/es` y `/en`).
