---
description: Agrega una skill nueva a la sección "Skills" del portfolio
argument-hint: [nombre] [nivel 0-100] [categoría: frontend|backend|tools]
---

Vas a agregar una skill nueva a la sección "Skills" (`SkillsSection.jsx`). Igual que los proyectos, los datos NO están en el componente: viven en `src/messages/es.json` y `src/messages/en.json`, bajo `skills.items` (mismo orden e índice en ambos archivos).

## 1. Reunir los datos

Argumentos recibidos en `$ARGUMENTS`. Para lo que falte, preguntá al usuario:

- **Nombre** — nombre de la tecnología/habilidad (ej. "Docker"). Los nombres de tecnologías/productos generalmente NO se traducen entre `es.json` y `en.json` (se escriben igual en ambos). Si el nombre describe una habilidad genérica en vez de una tecnología puntual (como "Desarrollo de Formularios" → "Form Development"), sí traducilo.
- **Nivel** — número de 0 a 100 (se usa como `width: level + "%"` en la barra de progreso). Si el usuario prefiere describirlo en palabras ("intermedio", "avanzado"), acordá con él una equivalencia razonable antes de convertirlo a número — no inventes un porcentaje sin que lo valide.
- **Categoría** — tiene que ser exactamente una de las que ya filtra el componente: `frontend`, `backend` o `tools`. Si el usuario no la sabe, ayudalo a elegir según el resto de las skills ya cargadas en el JSON.

## 2. Editar los JSON

Agregar un objeto nuevo a `skills.items` en **ambos** `src/messages/es.json` y `src/messages/en.json`:

```json
{ "name": "...", "level": 0, "category": "frontend" }
```

No toques `SkillsSection.jsx`: ya itera `skills.items` y `skills.categories` dinámicamente.

## 3. Verificar

Correr `npm run build`. Si hay preview disponible, confirmar que la skill aparece al filtrar por su categoría y en "Todas"/"All", en ambos idiomas.
