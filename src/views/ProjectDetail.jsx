import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ProjectDetail() {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="text-sm underline underline-offset-4">← Volver</Link>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">PIRtech — Caso de estudio</h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-200 max-w-3xl">
          Catálogo + solicitud de presupuesto para una tienda de hardware orientada a PyMEs. Mi rol: Frontend + UX. Stack: React, Vite, Tailwind.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <a href="https://pirtech.netlify.app/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Demo</a>
          <a href="https://github.com/jereregalzi7/pirtech" target="_blank" rel="noreferrer" className="underline underline-offset-4">Repositorio</a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 space-y-10">
        <section>
          <h2 className="text-xl font-semibold">Contexto</h2>
          <p className="mt-2 text-zinc-800 dark:text-zinc-100">
            El cliente necesitaba un catálogo simple para explorar productos y enviar una solicitud de presupuesto,
            priorizando rendimiento, claridad visual y compatibilidad mobile.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Retos & soluciones</h2>
          <ul className="mt-2 list-disc pl-5 text-zinc-800 dark:text-zinc-100 space-y-1">
            <li><b>Imágenes faltantes:</b> placeholders por categoría para mantener estética profesional.</li>
            <li><b>Flujo de presupuesto:</b> contador en navbar y control de cantidad (- 1 +) por producto.</li>
            <li><b>Catálogo escalable:</b> filtros por marca/categoría/búsqueda con UI limpia y responsive.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Resultados</h2>
          <ul className="mt-2 list-disc pl-5 text-zinc-800 dark:text-zinc-100 space-y-1">
            <li>UI consistente con estilo tech‑blue y componentes reutilizables.</li>
            <li>Performance sólida (Vite + imágenes optimizadas + lazy loading).</li>
            <li>Arquitectura lista para integrar más filtros o endpoints.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Galería</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <img className="rounded-xl border" src="/assets/pirtech-home.png" alt="PIRtech - Home" loading="lazy" />
            <img className="rounded-xl border" src="/assets/pirtech-catalogo.png" alt="PIRtech - Catálogo" loading="lazy" />
            <img className="rounded-xl border md:col-span-2" src="/assets/pirtech-nosotros.png" alt="PIRtech - Nosotros" loading="lazy" />
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-700 dark:text-zinc-200">
          © {new Date().getFullYear()} Jeremías Regalzi
        </div>
      </footer>
    </div>
  )
}
