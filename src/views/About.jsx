import { Link } from "react-router-dom";

export default function About(){
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="mx-auto max-w-5xl px-4 py-10">
        <Link to="/" className="text-sm underline underline-offset-4">← Home</Link>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Sobre mí</h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-200 max-w-3xl">
          Soy Jeremías Regalzi, Frontend & Full‑Stack Developer. Diseño interfaces rápidas, claras y escalables con React + Tailwind,
          y construyo APIs/backends con Node/Express o Laravel.
        </p>
      </header>
    </div>
  );
}
