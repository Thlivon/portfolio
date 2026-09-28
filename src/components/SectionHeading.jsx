// Encabezado común de sección: "01 · Proyectos" + título con la segunda parte resaltada.
export const SectionHeading = ({ number, eyebrow, title, highlight, subtitle }) => (
  <header className="mb-12">
    <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
      {number} · {eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
      {title} {highlight && <span className="text-primary">{highlight}</span>}
    </h2>
    {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>}
  </header>
);
