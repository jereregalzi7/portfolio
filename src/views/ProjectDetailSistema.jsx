import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Lock } from "lucide-react";
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

const MODULES = [
  {
    id: "01",
    name: "Caja",
    desc: "Registro de movimientos de caja, apertura/cierre, balance diario.",
  },
  {
    id: "02",
    name: "Clientes",
    desc: "ABM de clientes con historial de compras y datos de contacto.",
  },
  {
    id: "03",
    name: "Ventas",
    desc: "Gestión de ventas, emisión de comprobantes y seguimiento.",
  },
  {
    id: "04",
    name: "Productos",
    desc: "Catálogo con stock, precios y export/import vía Excel.",
  },
  {
    id: "05",
    name: "Proveedores",
    desc: "Registro de proveedores y vinculación con órdenes de compra.",
  },
  {
    id: "06",
    name: "Órdenes de compra",
    desc: "Creación y seguimiento de órdenes, generación de PDF.",
  },
  {
    id: "07",
    name: "Gestión de usuarios",
    desc: "Roles y permisos, verificación de email con Laravel Breeze.",
  },
];

const STACK_LAYERS = [
  {
    layer: "framework",
    items: ["Laravel 12", "PHP 8.2"],
  },
  {
    layer: "frontend",
    items: ["Blade templates", "Alpine.js v3", "Tailwind CSS v3"],
  },
  {
    layer: "build",
    items: ["Vite 7", "laravel-vite-plugin"],
  },
  {
    layer: "auth",
    items: ["Laravel Breeze", "Session-based", "Email verification"],
  },
  {
    layer: "base de datos",
    items: ["PostgreSQL (prod · Render)", "MySQL (local dev)"],
  },
  {
    layer: "storage & archivos",
    items: ["Cloudflare R2", "flysystem-aws-s3-v3", "RECEIPTS_DISK configurable"],
  },
  {
    layer: "exportación",
    items: ["barryvdh/laravel-dompdf", "maatwebsite/excel 3.1"],
  },
];

export default function ProjectDetailSistema() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="relative min-h-dvh bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Helmet>
        <title>PIRtech Sistema Interno — Caso de estudio · Jeremías Regalzi</title>
        <meta name="description" content="Caso de estudio: sistema de gestión empresarial para PIRtech con Laravel 12, Alpine.js, PostgreSQL y 7 módulos integrados." />
        <meta property="og:title" content="PIRtech Sistema Interno — Caso de estudio" />
        <meta property="og:description" content="Sistema ERP interno con Laravel 12, Alpine.js, PostgreSQL. Caja, ventas, clientes, productos, proveedores, órdenes y usuarios." />
        <meta property="og:url" content="https://jeremias-regalzi-portfolio.netlify.app/proyectos/pirtech-sistema" />
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
            <span className="text-stone-500">$</span> open case-study/pirtech-sistema
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">PIRtech — Sistema Interno</h1>
          <div className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />
          <p className="mt-5 text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
            Sistema de gestión empresarial completo desarrollado para PIRtech. Cubre todo el ciclo
            operativo de la empresa: caja, clientes, ventas, stock, proveedores y administración
            de usuarios — todo integrado en una sola plataforma web con Laravel 12.
          </p>
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-stone-500">
            <Lock size={11} className="text-amber-500/70" />
            <span>Repositorio y demo privados — sistema interno de cliente</span>
          </div>
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 space-y-14">

        {/* Modules */}
        <SectionBlock title="Módulos del sistema">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODULES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-amber-500/50 select-none">{m.id}</span>
                  <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">{m.name}</h3>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed font-mono">{m.desc}</p>
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

        {/* Technical highlights */}
        <SectionBlock title="Detalles técnicos" delay={0.05}>
          <ul className="space-y-2 font-mono text-sm text-stone-600 dark:text-stone-400">
            {[
              "Auth session-based con Laravel Breeze y verificación de email.",
              "Layouts separados para usuarios autenticados y guests (app.blade.php / guest.blade.php).",
              "Alpine.js v3 para interactividad: modales, toggles y comportamiento dinámico — sin Vue ni React.",
              "Axios disponible globalmente para requests AJAX desde Blade.",
              "Export de productos vía maatwebsite/excel 3.1 (import/export).",
              "Generación de PDF con barryvdh/laravel-dompdf para órdenes de compra.",
              "File storage configurable: disco local en dev, Cloudflare R2 en producción (RECEIPTS_DISK env).",
              "DB dual: MySQL en desarrollo local, PostgreSQL en producción (Render).",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 flex-shrink-0 mt-px">›</span>
                {item}
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* Screenshots placeholder */}
        <SectionBlock title="Capturas" delay={0.05}>
          <div className="rounded-xl border border-dashed border-stone-300/60 dark:border-stone-700/40 bg-stone-100/50 dark:bg-stone-900/30 aspect-video flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="font-mono text-xs text-stone-400 dark:text-stone-600">
                <span className="text-amber-500/60">// </span>capturas pendientes
              </p>
              <p className="font-mono text-xs text-stone-400 dark:text-stone-700">
                datos de cliente — versión anonimizada próximamente
              </p>
            </div>
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
