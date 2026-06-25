import { useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// ─── Background ──────────────────────────────────────────────────────────────

function NoiseBg() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

function BackgroundOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-48 -right-48 h-[500px] w-[500px] rounded-full bg-amber-500/6 blur-3xl" />
      <div className="absolute bottom-1/4 -left-36 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
    </div>
  );
}

// ─── TiltCard ────────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale3d(1.01,1.01,1.01)`;
    el.style.transition = "transform 0.1s ease-out";
    if (glowRef.current) {
      const gx = e.clientX - r.left;
      const gy = e.clientY - r.top;
      glowRef.current.style.background = `radial-gradient(360px circle at ${gx}px ${gy}px, rgba(245,158,11,0.10), transparent 65%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      ref.current.style.transition = "transform 0.55s ease-out";
    }
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-stone-500 dark:text-stone-600 select-none">//</span>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{children}</h2>
      </div>
      <div className="ml-7 mt-1.5 h-[2px] w-8 rounded-full bg-amber-500" />
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="relative min-h-dvh bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Helmet>
        <title>Sobre mí — Jeremías Regalzi</title>
        <meta name="description" content="Soy Jeremías Regalzi, Full-Stack Developer de CABA. Mi historia, cómo trabajo y en qué estoy ahora." />
        <meta property="og:title" content="Sobre mí — Jeremías Regalzi" />
        <meta property="og:description" content="Full-Stack Developer de CABA. Mi historia, cómo trabajo y en qué estoy ahora." />
        <meta property="og:url" content="https://jeremias-regalzi-portfolio.netlify.app/about" />
      </Helmet>
      <NoiseBg />
      <BackgroundOrbs />

      {/* Navbar */}
      <div className="sticky top-0 z-30 border-b border-stone-200/60 dark:border-stone-800/60 bg-white/80 dark:bg-stone-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
            <span className="text-amber-500">~/</span>jregalzi
          </Link>
          <Link
            to="/"
            className="font-mono text-xs text-stone-400 hover:text-amber-500 dark:text-stone-600 dark:hover:text-amber-400 transition-colors"
          >
            <span className="text-amber-500">←</span> volver
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-4 pt-12 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-amber-500 text-sm mb-3 tracking-wide">
            <span className="text-stone-500">$</span> cat about.md
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Sobre mí</h1>
          <div className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 space-y-10">

        {/* Origin story + photo */}
        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Text */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TiltCard>
              <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-6 h-full space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed">
                <p>
                  Siempre tuve algo con las computadoras. Desde chico me gustaba desarmarlas,
                  armarlas, arreglarlas — y sí, a veces romperlas solo por{" "}
                  <span className="font-mono text-amber-500">"meter mano"</span>. Era la forma
                  que tenía de entender cómo funcionaban las cosas por dentro.
                </p>
                <p>
                  Con el tiempo me di cuenta de que había algo más: no solo entender lo que ya
                  existía, sino crear algo propio. Páginas, sistemas, herramientas. Soluciones
                  que antes veía como inalcanzables. Eso fue lo que me enganchó del desarrollo.
                </p>
                <p>
                  De chico quería ser el raro de sistemas que nadie entiende, el que escribe
                  cosas extrañas en la pantalla como en las películas. Hoy trabajo con esas{" "}
                  <span className="font-mono text-amber-500">"cosas extrañas"</span> todos los
                  días. No soy un hacker, pero encontré algo mejor: construir herramientas que
                  le sirven a otras personas.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-[2px] rounded-[13px] overflow-hidden opacity-60 dark:opacity-40">
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[-50%] w-[200%] h-[200%]"
                  style={{ background: "conic-gradient(from 0deg, #f59e0b, #d97706, #fb923c, #f59e0b)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="relative rounded-xl overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
                <img
                  src="/assets/hero-jere.jpg"
                  alt="Jeremías Regalzi"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-950/70 to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono text-xs text-stone-300">
                  <span className="text-amber-400">→</span> Jeremías Regalzi
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How I work */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeading>Cómo trabajo</SectionHeading>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "01",
                title: "Problema primero",
                body: "Antes de escribir una línea de código, entiendo qué necesita el usuario, qué está roto, qué falta. El stack viene después.",
              },
              {
                icon: "02",
                title: "UX como base",
                body: "Mi paso por diseño UX me dejó la costumbre de pensar en la experiencia antes que en la solución técnica.",
              },
              {
                icon: "03",
                title: "Sistemas antes de intervenir",
                body: "Curso Análisis de Sistemas porque quiero entender el sistema completo antes de tocar una sola pieza.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.icon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                viewport={{ once: true }}
              >
                <TiltCard>
                  <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-5 h-full">
                    <span className="font-mono text-2xl font-bold text-amber-500/30 dark:text-amber-500/20 select-none">
                      {item.icon}
                    </span>
                    <h3 className="mt-2 font-semibold text-stone-900 dark:text-stone-100">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{item.body}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Now + stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionHeading>En qué estoy ahora</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Status card */}
            <TiltCard>
              <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-xs text-amber-500">open to work</span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Actualmente trabajo como{" "}
                  <span className="text-amber-500 font-semibold">desarrollador frontend</span> en Suntechnac y de
                  manera independiente como freelance. Cada proyecto me deja algo
                  distinto — eso es lo que más me gusta de este trabajo.
                </p>
                <div className="font-mono text-xs space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                  {[
                    { k: "empresa", v: "Suntechnac" },
                    { k: "rol", v: "Frontend Developer" },
                    { k: "freelance", v: "activo" },
                    { k: "ubicación", v: "CABA, Argentina" },
                  ].map((r) => (
                    <div key={r.k} className="flex gap-2">
                      <span className="text-stone-500 dark:text-stone-600 w-24 flex-shrink-0">{r.k}:</span>
                      <span className="text-amber-500">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* CTA card */}
            <TiltCard>
              <div className="rounded-xl border border-amber-500/25 dark:border-amber-500/15 bg-amber-500/5 dark:bg-amber-500/5 backdrop-blur p-6 flex flex-col justify-between h-full">
                <div>
                  <p className="font-mono text-xs text-stone-500 dark:text-stone-600 mb-4">
                    <span className="text-stone-400 dark:text-stone-700">$</span> contact --open-to-work
                    <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-1 align-middle rounded-[1px]" />
                  </p>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                    Si llegaste hasta acá, hablemos. Estoy disponible para proyectos
                    freelance, oportunidades laborales o simplemente para charlar sobre
                    tecnología.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href="mailto:jereregalzi93@gmail.com"
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-mono text-xs font-semibold text-stone-950 hover:bg-amber-400 active:scale-95 transition-all shadow-sm hover:shadow-amber-500/25"
                  >
                    <Mail size={13} /> escribime
                  </a>
                  <a
                    href="https://github.com/jereregalzi7" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-4 py-2 font-mono text-xs text-stone-600 dark:text-stone-400 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                  >
                    <Github size={13} /> github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jeremias-regalzi-253417248/" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-4 py-2 font-mono text-xs text-stone-600 dark:text-stone-400 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                  >
                    <Linkedin size={13} /> linkedin
                  </a>
                  <a
                    href="/cv-jeremias-regalzi.pdf" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-4 py-2 font-mono text-xs text-stone-600 dark:text-stone-400 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                  >
                    <FileDown size={13} /> cv.pdf
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="mx-auto max-w-5xl px-4 py-8 font-mono text-xs text-stone-400 dark:text-stone-600">
          <span className="text-amber-500">©</span> {new Date().getFullYear()} Jeremías Regalzi
        </div>
      </footer>
    </div>
  );
}
