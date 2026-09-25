---
description: Agrega una skill nueva a la sección "Skills" del portfolio
argument-hint: [nombre] [nivel 0-100] [categoría: frontend|backend|tools]
---

Vas a agregar una skill nueva a la sección "Skills" (`SkillsSection.jsx`). Igual que los proyectos, los datos NO están en el componente: viven en `src/messages/es.json` y `src/messages/en.json`, bajo `skills.items` (mismo orden e índice en ambos archivos).

## 1. Reunir los datos

Argumentos recibidos en `$ARGUMENTS`. Para lo que falte, preguntá al usuario:

- **Nombre** — nombre de la tecnología/habilidad (ej. "Docker"). Los nombres de tecnologías/productos generalmente NO se traducen entre `es.json` y `en.json` (se escriben igual en ambos). Si el nombre describe una habilidad genérica en vez de una tecnología puntual (como "Desarrollo de Formularios" → "Form Development"), sí traducilo.
- **Nivel** — Avanzado, Intermedio o Básico. En el JSON se guarda como número: `level` ≥ 80 = Avanzado, 60-79 = Intermedio, < 60 = Básico (el número no se muestra, solo agrupa los chips). Usar 90 / 70 / 50 según corresponda.
- **Categoría** — tiene que ser exactamente una de las columnas del componente: `frontend`, `backend` (Backend & Datos) o `tools` (Frameworks & Herramientas). Si el usuario no la sabe, ayudalo a elegir según el resto de las skills ya cargadas en el JSON.

## 2. Editar los JSON

Agregar un objeto nuevo a `skills.items` en **ambos** `src/messages/es.json` y `src/messages/en.json`:

```json
{ "name": "...", "level": 0, "category": "frontend" }
```

No toques `SkillsSection.jsx`: ya agrupa `skills.items` por categoría y nivel.

## 3. Verificar

Correr `npm run build`. Si hay preview disponible, confirmar que el chip aparece en la columna y nivel correctos, en ambos idiomas.
