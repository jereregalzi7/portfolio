import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, FileDown, Lock } from "lucide-react";
import ScrollProgress from "./ScrollProgress";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Jeremías Regalzi",
  role: "Frontend & Full-Stack Developer",
  location: "CABA, AR",
  summary:
    "Desarrollador con foco en interfaces claras, rápidas y funcionales. Egresado de Da Vinci en Diseño y Programación Web, cursando Análisis de Sistemas. Me motiva construir herramientas que le sirvan a las personas.",
  links: {
    github: "https://github.com/jereregalzi7",
    linkedin: "https://www.linkedin.com/in/jeremias-regalzi-253417248/",
    email: "mailto:jereregalzi93@gmail.com",
    cv: "/cv-jeremias-regalzi.pdf",
  },
  skills: [
    "React", "Vite", "TailwindCSS", "JavaScript", "TypeScript",
    "Node.js", "Express", "Laravel", "PHP", "Firebase",
    "PostgreSQL", "MySQL", "MongoDB", "Vue.js", "Figma",
  ],
};

const PROJECTS = [
  {
    title: "PIRtech — Sistema Interno",
    description:
      "Sistema de gestión empresarial completo para PIRtech. Siete módulos integrados: caja, clientes, ventas, productos, proveedores, órdenes de compra y gestión de usuarios.",
    highlights: ["7 módulos integrados", "Auth con Laravel Breeze", "Export Excel + PDF"],
    stack: ["Laravel", "PHP", "Alpine.js", "PostgreSQL", "Tailwind"],
    repo: null,
    demo: null,
    image: "/assets/pirtech-catalogo.png",
    badge: "Interno",
    caseStudy: "/proyectos/pirtech-sistema",
  },
  {
    title: "PIRtech — E-commerce Gamer",
    description:
      "Tienda online de hardware y PCs gamer. Catálogo con filtros avanzados, PC Builder paso a paso con verificación de compatibilidad, comparador de productos y carrito de compras.",
    highlights: ["PC Builder con compatibilidad", "Catálogo con 10+ categorías", "Comparador de productos"],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel", "Laravel API"],
    repo: null,
    demo: "https://www.pirtech.com.ar/",
    image: "/assets/pirtech-home.png",
    caseStudy: "/proyectos/pirtech",
    badge: "Live",
  },
  {
    title: "Rebrotar — Ambientación Comercial",
    description:
      "Sitio institucional para empresa de decoración con plantas artificiales orientada a locales comerciales. Propuestas visuales por estilo, catálogo de packs por rubro y formulario de solicitud de propuesta.",
    highlights: ["Estilos y packs por rubro", "Proceso de 4 pasos", "Formulario de propuesta"],
    stack: ["Next.js", "TypeScript", "Tailwind v4", "React 19"],
    repo: null,
    demo: "https://rebrotar.com.ar/",
    image: null,
    badge: "Live",
    caseStudy: "/proyectos/rebrotar",
  },
];

const EXPERIENCE = [
  {
    company: "Suntechnac",
    role: "Desarrollador Frontend",
    period: "2023 — Actualidad",
    bullets: [
      "Desarrollo de interfaces con React y Tailwind CSS.",
      "Colaboración con equipos multidisciplinarios en proyectos web y mobile.",
      "Implementación de componentes reutilizables y guías de estilo.",
      "Trabajo con metodologías ágiles (Scrum).",
    ],
  },
  {
    company: "Freelance",
    role: "Desarrollador Full‑Stack",
    period: "Actualidad",
    bullets: [
      "Frontend con React + Tailwind y Vue.",
      "Backends con Node/Express y Laravel (REST, JWT auth, CRUD).",
      "BD: PostgreSQL/MySQL/MongoDB. Deploy en Netlify/Vercel/Render.",
    ],
  },
];

const EDUCATION = [
  { school: "Escuela Da Vinci", degree: "Diseño y Programación Web (egresado)", period: "2022 — 2024" },
  { school: "Escuela Da Vinci", degree: "Análisis de Sistemas (en curso)", period: "2025 — Actualidad" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTypewriter(words, typingSpeed = 75, deletingSpeed = 38, pauseMs = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[wordIdx];
    if (phase === "typing") {
      if (text === word) {
        const t = setTimeout(() => setPhase("deleting"), pauseMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (text === "") {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

// ─── Cursor ──────────────────────────────────────────────────────────────────

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovering(!!e.target.closest("a, button, [role='button']"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  const dot = { type: "spring", stiffness: 400, damping: 28, mass: 0.4 };
  const ring = { type: "spring", stiffness: 160, damping: 22, mass: 0.7 };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-amber-400"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hovering ? 0 : 1 }}
        transition={dot}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-amber-400"
        animate={{
          x: pos.x - (hovering ? 20 : 12),
          y: pos.y - (hovering ? 20 : 12),
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          opacity: hovering ? 0.5 : 0.8,
        }}
        transition={ring}
      />
    </>
  );
}

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
      <div className="absolute top-1/2 -left-36 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-400/5 blur-3xl" />
    </div>
  );
}

// ─── Code Block (Hero) ───────────────────────────────────────────────────────

const CODE_LINES = [
  {
    ln: 1,
    tokens: [
      { t: "keyword", v: "const" },
      { t: "plain", v: " developer " },
      { t: "punct", v: "= {" },
    ],
  },
  {
    ln: 2, indent: true,
    tokens: [
      { t: "prop", v: "name" },
      { t: "punct", v: ": " },
      { t: "string", v: '"Jeremías Regalzi"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 3, indent: true,
    tokens: [
      { t: "prop", v: "role" },
      { t: "punct", v: ": " },
      { t: "string", v: '"Frontend & Full-Stack Dev"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 4, indent: true,
    tokens: [
      { t: "prop", v: "location" },
      { t: "punct", v: ": " },
      { t: "string", v: '"CABA, Argentina"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 5, indent: true,
    tokens: [
      { t: "prop", v: "stack" },
      { t: "punct", v: ": [" },
    ],
  },
  {
    ln: 6, indent: true, indent2: true,
    tokens: [
      { t: "val", v: '"React"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Vite"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"TypeScript"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"TailwindCSS"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 7, indent: true, indent2: true,
    tokens: [
      { t: "val", v: '"Next.js"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Node.js"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Express"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Laravel"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 8, indent: true, indent2: true,
    tokens: [
      { t: "val", v: '"PostgreSQL"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"MySQL"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Firebase"' },
      { t: "punct", v: ", " },
      { t: "val", v: '"Figma"' },
      { t: "punct", v: "," },
    ],
  },
  {
    ln: 9, indent: true,
    tokens: [{ t: "punct", v: "]," }],
  },
  {
    ln: 11, indent: true,
    tokens: [
      { t: "prop", v: "available" },
      { t: "punct", v: ": " },
      { t: "bool", v: "true" },
      { t: "punct", v: "," },
      { t: "comment", v: "  // open to work" },
    ],
  },
  {
    ln: 12,
    tokens: [{ t: "punct", v: "};" }],
  },
];

const TOKEN_CLASS = {
  keyword: "text-purple-400",
  prop:    "text-sky-300",
  string:  "text-emerald-400",
  val:     "text-amber-400",
  bool:    "text-amber-400",
  comment: "text-stone-600 italic",
  plain:   "text-stone-200",
  punct:   "text-stone-500",
};

function HeroCodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="w-full rounded-xl border border-stone-700/60 bg-stone-950/90 overflow-hidden shadow-2xl shadow-black/60 font-mono text-sm"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-800/80 bg-stone-900/50">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <span className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-xs text-stone-500 tracking-wide">developer.js</span>
      </div>
      {/* Code */}
      <div className="p-5 space-y-[3px] leading-6">
        {CODE_LINES.map(({ ln, indent, indent2, tokens }) => (
          <div key={ln} className="flex gap-4 items-start">
            <span className="select-none text-stone-700 text-xs w-4 flex-shrink-0 pt-[3px] text-right">
              {ln}
            </span>
            <div className={indent2 ? "pl-10" : indent ? "pl-5" : ""}>
              {tokens.map((tok, i) => (
                <span key={i} className={TOKEN_CLASS[tok.t]}>{tok.v}</span>
              ))}
            </div>
          </div>
        ))}
        {/* Blinking cursor line */}
        <div className="flex gap-4 items-start pt-[2px]">
          <span className="select-none text-stone-700 text-xs w-4 flex-shrink-0 text-right">13</span>
          <span className="inline-block h-[18px] w-[7px] bg-amber-400/80 animate-pulse rounded-[1px]" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Primitives ──────────────────────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-stone-500 dark:text-stone-600 text-base select-none">//</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {title}
          </h2>
        </div>
        <div className="ml-7 mt-2 h-[2px] w-10 rounded-full bg-amber-500" />
      </div>
      {children}
    </motion.section>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-amber-500/25 bg-amber-500/8 dark:bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-700 dark:text-amber-400">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(245,158,11,0.09), transparent 70%)`;
      spotlightRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl border border-stone-200/70 dark:border-stone-800/70 p-5 bg-white/80 dark:bg-stone-900/70 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/8 hover:border-amber-400/40 dark:hover:border-amber-500/25 ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}

function ProjectBadge({ label }) {
  if (label === "Interno") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-300/60 dark:border-stone-700/60 px-2.5 py-0.5 font-mono text-xs font-medium text-stone-600 dark:text-stone-400">
        <Lock size={10} /> Interno
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-300/50 dark:border-amber-700/40 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-700 dark:text-amber-400">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
      Live
    </span>
  );
}

function ProjectImagePlaceholder({ title }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center border border-stone-700/40">
      <span className="font-mono text-lg font-bold tracking-tight text-amber-500/30 select-none">
        {title.split("—")[0].trim()}
      </span>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#", label: "inicio" },
    { href: "#projects", label: "proyectos" },
    { href: "#experience", label: "experiencia" },
    { href: "#education", label: "educación" },
    { href: "#contact", label: "contacto" },
    { href: "/about", label: "about", isRoute: true },
  ];
  return (
    <div className="sticky top-0 z-30 border-b border-stone-200/60 dark:border-stone-800/60 bg-white/80 dark:bg-stone-950/80 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
          <span className="text-amber-500">~/</span>jregalzi
        </a>
        <button className="md:hidden text-stone-600 dark:text-stone-400" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          <ChevronRight className={`transition-transform ${open ? "rotate-90" : ""}`} />
        </button>
        <ul className="hidden md:flex gap-7 font-mono text-xs tracking-wide">
          {links.map((l) => (
            <li key={l.href}>
              {l.isRoute ? (
                <Link
                  className="text-stone-500 dark:text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  to={l.href}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  className="text-stone-500 dark:text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  href={l.href}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <div className="md:hidden border-t border-stone-200/60 dark:border-stone-800/60">
          <ul className="mx-auto max-w-6xl px-4 py-4 space-y-4 font-mono text-sm">
            {links.map((l) => (
              <li key={l.href}>
                {l.isRoute ? (
                  <Link className="block text-stone-500 hover:text-amber-500" to={l.href}>{l.label}</Link>
                ) : (
                  <a className="block text-stone-500 hover:text-amber-500" href={l.href}>{l.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const role = useTypewriter([
    "Full-Stack Developer",
    "el raro de sistemas",
  ]);

  return (
    <header className="mx-auto max-w-6xl px-4 pt-12 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Top: name + role */}
        <div className="mb-10">
          <p className="font-mono text-amber-500 text-sm mb-3 tracking-wide">
            <span className="text-stone-500">$</span> whoami
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
            {PROFILE.name}
          </h1>
          <div className="mt-3 h-9 flex items-center gap-1">
            <span className="text-xl md:text-2xl font-mono text-amber-500 dark:text-amber-400 font-semibold">
              {role}
            </span>
            <span className="inline-block h-6 w-[2px] bg-amber-400 animate-pulse ml-0.5" />
          </div>
        </div>

        {/* Two columns: left info | right photo */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">

          {/* Left: summary, links, skills, code block */}
          <div className="flex flex-col gap-6">
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg">
              {PROFILE.summary}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-2">
              <a className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-3 py-1.5 font-mono text-xs text-stone-700 dark:text-stone-300 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                href={PROFILE.links.github} target="_blank" rel="noreferrer">
                <Github size={14} /> github
              </a>
              <a className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-3 py-1.5 font-mono text-xs text-stone-700 dark:text-stone-300 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={14} /> linkedin
              </a>
              <a className="inline-flex items-center gap-2 rounded-lg border border-stone-200 dark:border-stone-800 px-3 py-1.5 font-mono text-xs text-stone-700 dark:text-stone-300 hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                href={PROFILE.links.email}>
                <Mail size={14} /> email
              </a>
              <a className="inline-flex items-center gap-2 rounded-lg bg-amber-500 border border-amber-500 px-3 py-1.5 font-mono text-xs text-white hover:bg-amber-600 transition-all"
                href={PROFILE.links.cv} target="_blank" rel="noreferrer">
                <FileDown size={14} /> cv.pdf
              </a>
            </div>

            {/* Code block with skills inside */}
            <div className="flex-1">
              <HeroCodeBlock />
            </div>
          </div>

          {/* Right: photo full height */}
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
            <div className="relative h-full rounded-xl overflow-hidden border border-stone-200/50 dark:border-stone-800/50 bg-stone-100 dark:bg-stone-900">
              <img
                src="/assets/hero-jere.jpg"
                alt="Jeremías Regalzi"
                className="w-full h-full object-cover object-center"
                style={{ minHeight: "400px" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-950/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <span className="font-mono text-xs text-stone-300">
                  <span className="text-amber-400">→</span> Jeremías Regalzi — CABA, AR
                </span>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-stone-950/60 backdrop-blur px-3 py-1.5 font-mono text-xs text-amber-400 hover:bg-amber-500/20 hover:border-amber-400/70 transition-all"
                >
                  sobre mí <ChevronRight size={11} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </header>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

// ─── Project card shared helpers ─────────────────────────────────────────────

function ProjectLinks({ p, dark = false }) {
  const base = dark
    ? "text-stone-400 hover:text-amber-400"
    : "text-stone-500 dark:text-stone-500 hover:text-amber-600 dark:hover:text-amber-400";
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
      {p.repo ? (
        <a className={`inline-flex items-center gap-1.5 transition-colors ${base}`} href={p.repo} target="_blank" rel="noreferrer">
          <Github size={12} /> repo
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-stone-600 select-none">
          <Lock size={10} /> privado
        </span>
      )}
      {p.demo ? (
        <a className={`inline-flex items-center gap-1.5 transition-colors ${base}`} href={p.demo} target="_blank" rel="noreferrer">
          <ExternalLink size={12} /> demo
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-stone-600 select-none">
          <Lock size={10} /> sin demo
        </span>
      )}
      {p.caseStudy && (
        <Link
          className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 font-semibold transition-colors ml-auto"
          to={p.caseStudy}
        >
          caso de estudio <ChevronRight size={12} />
        </Link>
      )}
    </div>
  );
}

// Wrapper with 3D tilt + spotlight
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale3d(1.015,1.015,1.015)`;
    el.style.transition = "transform 0.1s ease-out";
    if (glowRef.current) {
      const gx = e.clientX - r.left;
      const gy = e.clientY - r.top;
      glowRef.current.style.background = `radial-gradient(380px circle at ${gx}px ${gy}px, rgba(245,158,11,0.11), transparent 65%)`;
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

// Featured card — large, image fills top, text overlaid at bottom
function FeaturedProjectCard({ p }) {
  return (
    <TiltCard className="h-full min-h-[420px]">
      <div className="relative h-full rounded-xl overflow-hidden border border-stone-200/70 dark:border-stone-800/70">
        {/* Full bleed image */}
        {p.image ? (
          <img
            src={p.image} alt={p.title} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 flex items-center justify-center">
            <span className="font-mono text-3xl font-bold text-amber-500/20 select-none">{p.title.split("—")[0].trim()}</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        {/* Content pinned to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <div className="flex items-center gap-2 mb-2">
            {p.badge && <ProjectBadge label={p.badge} />}
          </div>
          <h3 className="font-mono text-xl font-bold text-stone-50 leading-snug">{p.title}</h3>
          <p className="mt-2 text-sm text-stone-300 leading-relaxed max-w-md">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="font-mono text-xs px-2 py-0.5 rounded-md bg-stone-800/80 border border-stone-700/60 text-amber-400">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-stone-700/50">
            <ProjectLinks p={p} dark />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// Compact card — image top, info below
function CompactProjectCard({ p }) {
  return (
    <TiltCard className="h-full">
      <div className="h-full rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur overflow-hidden flex flex-col">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {p.image ? (
            <img src={p.image} alt={p.title} loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 flex items-center justify-center">
              <span className="font-mono text-lg font-bold text-amber-500/25 select-none">{p.title.split("—")[0].trim()}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end gap-2 p-3">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-amber-500 text-stone-950 px-2.5 py-1 font-mono text-xs font-semibold hover:bg-amber-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={10} /> demo
              </a>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">{p.title}</h3>
            {p.badge && <ProjectBadge label={p.badge} />}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed flex-1">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800">
            <ProjectLinks p={p} />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// Horizontal card — image left, info right
function HorizontalProjectCard({ p }) {
  return (
    <TiltCard>
      <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-2/5 overflow-hidden" style={{ minHeight: "220px" }}>
            {p.image ? (
              <img src={p.image} alt={p.title} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 flex items-center justify-center">
                <span className="font-mono text-2xl font-bold text-amber-500/20 select-none">{p.title.split("—")[0].trim()}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-950/20 dark:to-stone-950/40" />
          </div>
          {/* Info */}
          <div className="md:w-3/5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-mono text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">{p.title}</h3>
                {p.badge && <ProjectBadge label={p.badge} />}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">{p.description}</p>
              <ul className="space-y-1.5 mb-4">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 font-mono text-xs text-stone-500 dark:text-stone-500">
                    <span className="text-amber-500 flex-shrink-0">›</span> {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
              <ProjectLinks p={p} />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function Projects() {
  const [featured, compact, horizontal] = PROJECTS;
  return (
    <Section id="projects" title="Proyectos">
      <div className="space-y-5">
        {/* Bento row: featured (2/3) + compact (1/3) */}
        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <FeaturedProjectCard p={featured} />
          </motion.div>
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
          >
            <CompactProjectCard p={compact} />
          </motion.div>
        </div>
        {/* Full-width horizontal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
        >
          <HorizontalProjectCard p={horizontal} />
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Experience ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience" title="Experiencia">
      <div className="relative">
        {/* Animated center line — desktop only */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent hidden md:block origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <div className="space-y-8 md:space-y-10">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.company}
              className={`relative flex flex-col md:flex-row md:items-start gap-4 md:gap-0 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Card — half width */}
              <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <TiltCard>
                  <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-5">
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                      <div>
                        <h3 className="font-semibold text-amber-600 dark:text-amber-400">{e.role}</h3>
                        <p className="font-mono text-sm text-stone-500 dark:text-stone-500 mt-0.5">{e.company}</p>
                      </div>
                      <span className="font-mono text-xs bg-stone-100 dark:bg-stone-800 rounded-md px-2.5 py-1 text-stone-500 whitespace-nowrap border border-stone-200/60 dark:border-stone-700/60 flex-shrink-0">
                        {e.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5 font-mono text-sm text-stone-600 dark:text-stone-400">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-amber-500 flex-shrink-0 mt-px">›</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>

              {/* Center dot — desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-5 z-10 items-center justify-center">
                <motion.div
                  className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-stone-50 dark:border-stone-950 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.35, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Spacer — other side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────

function Education() {
  const status = (degree) =>
    degree.includes("en curso")
      ? { label: "en curso", dot: "bg-amber-400 animate-pulse", text: "text-amber-500" }
      : { label: "egresado", dot: "bg-emerald-400", text: "text-emerald-500" };

  return (
    <Section id="education" title="Educación">
      <div className="grid md:grid-cols-2 gap-5">
        {EDUCATION.map((ed, i) => {
          const s = status(ed.degree);
          return (
            <motion.div
              key={ed.degree}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <TiltCard>
                <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur p-5 h-full">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${s.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                    <span className="font-mono text-xs text-stone-400 dark:text-stone-600">{ed.period}</span>
                  </div>

                  {/* Icon + info */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6L3 9m9 5l9-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm leading-snug text-stone-900 dark:text-stone-100">{ed.degree}</h3>
                      <p className="font-mono text-xs text-stone-500 mt-1">{ed.school}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="h-[2px] w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${ed.degree.includes("en curso") ? "bg-amber-400" : "bg-emerald-400"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: ed.degree.includes("en curso") ? "55%" : "100%" }}
                        transition={{ duration: 1, delay: i * 0.12 + 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

const CONTACT_FIELDS = [
  { id: "name",    label: "nombre",  type: "text",  placeholder: "Tu nombre",       col: "" },
  { id: "email",   label: "email",   type: "email", placeholder: "tu@email.com",    col: "" },
  { id: "message", label: "mensaje", type: "area",  placeholder: "¿En qué puedo ayudarte?", col: "md:col-span-2" },
];

function Contact() {
  const inputCls = "rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/80 px-3 py-2.5 font-mono text-sm text-stone-900 dark:text-stone-100 outline-none transition-all w-full placeholder:text-stone-400 dark:placeholder:text-stone-700 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400/60";

  return (
    <Section id="contact" title="Contacto">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left: copy */}
        <motion.div
          className="md:col-span-2 flex flex-col justify-center space-y-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            ¿Tenés un proyecto en mente o querés charlar? Escribime y te respondo a la brevedad.
          </p>
          <div className="space-y-2 font-mono text-xs">
            {[
              { label: "email", val: "jereregalzi93@gmail.com", href: "mailto:jereregalzi93@gmail.com" },
              { label: "github", val: "github.com/jereregalzi7", href: PROFILE.links.github },
              { label: "linkedin", val: "in/jeremias-regalzi", href: PROFILE.links.linkedin },
            ].map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-baseline gap-2 text-stone-500 hover:text-amber-500 transition-colors group"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.45 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-500 group-hover:text-amber-400">›</span>
                <span className="text-stone-400">{l.label}:</span>
                <span className="text-stone-600 dark:text-stone-400 group-hover:text-amber-400 transition-colors">{l.val}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-white/80 dark:bg-stone-900/70 backdrop-blur overflow-hidden">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/50">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              </div>
              <span className="font-mono text-xs text-stone-400 ml-2">
                <span className="text-stone-500">$</span> send --message{" "}
                <span className="text-amber-500">"Hola Jeremías"</span>
              </span>
            </div>

            <form
              name="contact" method="POST"
              action="https://formsubmit.co/jereregalzi93@gmail.com"
              className="p-5 grid md:grid-cols-2 gap-4"
            >
              <input type="hidden" name="_next" value="https://jeremias-regalzi-portfolio.netlify.app/success.html" />
              <input type="hidden" name="_captcha" value="false" />

              {CONTACT_FIELDS.map((f, i) => (
                <motion.div
                  key={f.id}
                  className={`grid gap-1.5 ${f.col}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.25, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="font-mono text-xs text-stone-500">
                    <span className="text-amber-500/60">—</span> {f.label}
                  </label>
                  {f.type === "area" ? (
                    <textarea name={f.id} rows={4} required placeholder={f.placeholder} className={`${inputCls} resize-none`} />
                  ) : (
                    <input name={f.id} type={f.type} required placeholder={f.placeholder} className={inputCls} />
                  )}
                </motion.div>
              ))}

              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-5 py-2.5 font-mono text-sm font-semibold text-stone-950 transition-all duration-200 hover:bg-amber-400 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-amber-500/30"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
                  <Mail size={14} /> enviar mensaje
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200/60 dark:border-stone-800/60">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-xs text-stone-400 dark:text-stone-600">
        <span>
          <span className="text-amber-500">©</span> {new Date().getFullYear()} {PROFILE.name}
        </span>
        <div className="flex items-center gap-6">
          <a className="hover:text-amber-500 transition-colors" href={PROFILE.links.github} target="_blank" rel="noreferrer">github</a>
          <a className="hover:text-amber-500 transition-colors" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a className="hover:text-amber-500 transition-colors" href={PROFILE.links.email}>email</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className="relative min-h-dvh bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Helmet>
        <title>Jeremías Regalzi — Full-Stack Developer</title>
        <meta name="description" content="Portfolio de Jeremías Regalzi, Full-Stack Developer de CABA, Argentina. React, Next.js, Laravel, TypeScript y más." />
        <meta property="og:title" content="Jeremías Regalzi — Full-Stack Developer" />
        <meta property="og:description" content="Portfolio de Jeremías Regalzi, Full-Stack Developer de CABA, Argentina. React, Next.js, Laravel, TypeScript y más." />
        <meta property="og:url" content="https://jeremias-regalzi-portfolio.netlify.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jeremías Regalzi — Full-Stack Developer" />
        <meta name="twitter:description" content="Portfolio de Jeremías Regalzi, Full-Stack Developer de CABA, Argentina." />
      </Helmet>
      <NoiseBg />
      <BackgroundOrbs />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <main className="relative z-10 mx-auto max-w-6xl px-4 space-y-20 pb-4">
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
