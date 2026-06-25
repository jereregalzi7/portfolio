import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-700 dark:text-amber-400">
      {children}
    </span>
  );
}

function SectionBlock({ title, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-mono text-stone-500 dark:text-stone-600 select-none">//</span>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">{title}</h2>
      </div>
      <div className="ml-7 -mt-1 mb-5 h-[2px] w-8 rounded-full bg-amber-500" />
      <div className="ml-7">{children}</div>
    </motion.section>
  );
}

const SECTIONS = [
  { id: "01", name: "Inicio", desc: "Hero con propuesta de valor, card de estilo destacada y CTAs directos a estilos y packs." },
  { id: "02", name: "Nosotros", desc: "Historia y propuesta diferencial de Rebrotar como empresa de ambientación sin mantenimiento." },
  { id: "03", name: "Cómo funciona", desc: "Proceso de 4 pasos: explorar estilos → elegir opción → cargar datos del espacio → coordinar propuesta." },
  { id: "04", name: "Estilos", desc: "Catálogo de propuestas visuales (Tropical, Minimalista, etc.) con fotos reales de instalaciones." },
  { id: "05", name: "Rubros", desc: "Soluciones organizadas por tipo de negocio: cafeterías, oficinas, salones de eventos, locales de estética." },
  { id: "06", name: "Packs", desc: "Paquetes de ambientación combinados, listos para solicitar con un formulario directo." },
  { id: "07", name: "Contacto", desc: "Formulario de solicitud de propuesta con canales alternativos (WhatsApp y email)." },
];

const STACK_LAYERS = [
  { layer: "framework", items: ["Next.js (App Router)", "React 19"] },
  { layer: "lenguaje", items: ["TypeScript"] },
  { layer: "estilos", items: ["Tailwind CSS v4", "@tailwindcss/postcss"] },
  { layer: "deploy", items: ["Vercel"] },
];

export default function ProjectDetailRebrotar() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="relative min-h-dvh bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Helmet>
        <title>Rebrotar — Caso de estudio · Jeremías Regalzi</title>
        <meta name="description" content="Caso de estudio: sitio institucional para Rebrotar, empresa de ambientación comercial. Next.js, TypeScript y Tailwind v4." />
        <meta property="og:title" content="Rebrotar — Caso de estudio" />
        <meta property="og:description" content="Sitio de ambientación comercial con plantas artificiales. Next.js App Router, TypeScript, Tailwind v4, Vercel." />
        <meta property="og:url" content="https://jeremias-regalzi-portfolio.netlify.app/proyectos/rebrotar" />
      </Helmet>
      <NoiseBg />
      <BackgroundOrbs />

      {/* Navbar */}
      <div className="sticky top-0 z-30 border-b border-stone-200/60 dark:border-stone-800/60 bg-white/80 dark:bg-stone-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">
            <span className="text-amber-500">~/</span>jregalzi
          </Link>
          <Link to="/" className="font-mono text-xs text-stone-400 hover:text-amber-500 dark:text-stone-600 dark:hover:text-amber-400 transition-colors">
            <span className="text-amber-500">←</span> volver
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-4 pt-12 pb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="font-mono text-amber-500 text-sm mb-3 tracking-wide">
            <span className="text-stone-500">$</span> open case-study/rebrotar
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Rebrotar — Ambientación Comercial</h1>
          <div className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />
          <p className="mt-5 text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
            Sitio institucional para Rebrotar, empresa de ambientación comercial con plantas artificiales.
            El desafío: comunicar una estética cuidada, transmitir confianza profesional y facilitar
            que potenciales clientes soliciten una propuesta sin fricción.
            Mi rol: diseño + desarrollo frontend end-to-end.
          </p>
          <div className="mt-4">
            <a
              href="https://rebrotar.com.ar/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 hover:text-amber-500 transition-colors"
            >
              <ExternalLink size={12} /> rebrotar.com.ar
            </a>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 space-y-14">

        {/* Sections */}
        <SectionBlock title="Secciones del sitio">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-amber-500/50 select-none">{s.id}</span>
                  <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">{s.name}</h3>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed font-mono">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        {/* Stack */}
        <SectionBlock title="Stack & arquitectura" delay={0.05}>
          <div className="space-y-3">
            {STACK_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur px-4 py-3"
              >
                <span className="font-mono text-xs text-stone-400 dark:text-stone-600 w-28 flex-shrink-0 pt-0.5">
                  {layer.layer}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {layer.items.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        {/* Retos */}
        <SectionBlock title="Retos & decisiones" delay={0.05}>
          <ul className="space-y-2 font-mono text-sm text-stone-600 dark:text-stone-400">
            {[
              "Branding cálido (crema + naranja + verde) que transmita naturalidad sin perder profesionalismo — alejado de paletas genéricas.",
              "Estructura de navegación pensada para la conversión: el CTA 'Solicitar propuesta' visible en todo momento desde el navbar.",
              "Formulario enriquecido con rubro, tamaño del espacio y motivo de consulta — para que Rebrotar reciba leads calificados.",
              "Sección 'Cómo funciona' con proceso de 4 pasos para reducir la fricción de clientes que no conocen el servicio.",
              "Botón flotante de WhatsApp para capturar consultas rápidas en mobile sin requerir llegar al formulario.",
              "Next.js App Router con Tailwind v4 — estructura de carpetas en app/ por cada ruta.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 flex-shrink-0 mt-px">›</span>
                {item}
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* Gallery */}
        <SectionBlock title="Capturas" delay={0.05}>
          <div className="grid md:grid-cols-2 gap-4">
            <img
              src="/assets/rebrotar-home.png"
              alt="Rebrotar — Home"
              loading="lazy"
              className="rounded-xl border border-stone-200/60 dark:border-stone-800/60 w-full"
            />
            <img
              src="/assets/rebrotar-como-funciona.png"
              alt="Rebrotar — Cómo funciona"
              loading="lazy"
              className="rounded-xl border border-stone-200/60 dark:border-stone-800/60 w-full"
            />
            <img
              src="/assets/rebrotar-contacto.png"
              alt="Rebrotar — Contacto"
              loading="lazy"
              className="rounded-xl border border-stone-200/60 dark:border-stone-800/60 w-full md:col-span-2"
            />
          </div>
          <div className="mt-4">
            <a
              href="https://rebrotar.com.ar/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-500 hover:text-amber-400 transition-colors"
            >
              <ExternalLink size={11} /> ver sitio en vivo
            </a>
          </div>
        </SectionBlock>

      </main>

      <footer className="relative z-10 border-t border-stone-200/60 dark:border-stone-800/60">
        <div className="mx-auto max-w-5xl px-4 py-8 font-mono text-xs text-stone-400 dark:text-stone-600">
          <span className="text-amber-500">©</span> {new Date().getFullYear()} Jeremías Regalzi
        </div>
      </footer>
    </div>
  );
}
