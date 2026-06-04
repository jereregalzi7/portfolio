import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, FileDown, Lock } from "lucide-react";
import ScrollProgress from "./ScrollProgress";
import { Link } from "react-router-dom";


const PROFILE = {
  name: "Jeremías Regalzi",
  role: "Frontend & Full-Stack Developer",
  location: "CABA, AR",
  summary:
    "Soy desarrollador Frontend & Full-Stack con foco en la creación de interfaces claras, rápidas y funcionales utilizando React, Tailwind y Node.js. Egresado de Escuela Da Vinci en Diseño y Programación Web, actualmente curso Análisis de Sistemas para ampliar mi visión técnica y arquitectónica. Me motiva construir experiencias digitales que combinen buen diseño, rendimiento y escalabilidad.",
  links: {
    github: "https://github.com/jereregalzi7",
    linkedin: "https://www.linkedin.com/in/jeremias-regalzi-253417248/",
    email: "mailto:jereregalzi93@gmail.com",
    cv: "/cv-jeremias-regalzi.pdf"
  },
  badges: [
    { label: "UI limpia", emoji: "🎨" },
    { label: "Código escalable", emoji: "🧩" },
    { label: "Enfoque UX", emoji: "👀" },
  ],
  skills: [
    "React","Vite","TailwindCSS","JavaScript","TypeScript",
    "Node.js","Express","Laravel","PHP","Firebase",
    "PostgreSQL","MySQL","MongoDB","Vue.js","Figma"
  ],
};

const PROJECTS = [
  {
    title: "PIRtech — Sistema Interno",
    description:
      "Sistema de gestión interna desarrollado para PIRtech. Panel administrativo con módulos de clientes, productos, presupuestos y seguimiento de pedidos en tiempo real.",
    highlights: ["Panel admin completo", "Gestión de presupuestos", "CRUD de productos y clientes"],
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    repo: null,
    demo: null,
    image: "/assets/pirtech-catalogo.png",
    badge: "Interno",
  },
  {
    title: "PIRtech — Catálogo + Presupuesto",
    description:
      "Sitio tipo catálogo con filtros, ficha de producto y sistema de solicitud de presupuesto. UX minimalista, moderna y responsive.",
    highlights: ["Filtros dinámicos", "Estado del presupuesto en Navbar", "Placeholders por categoría"],
    stack: ["React", "Vite", "Tailwind", "Node"],
    repo: "https://github.com/jereregalzi7/pirtech",
    demo: "https://pirtech.netlify.app/",
    image: "/assets/pirtech-home.png",
    caseStudy: "/proyectos/pirtech",
    badge: "Live",
  },
  {
    title: "Rebrotar — Ambientación Comercial",
    description:
      "Sitio web para empresa de decoración con plantas artificiales para locales comerciales. Catálogo de packs, propuestas por rubro y formulario de consulta.",
    highlights: ["Diseño adaptado al branding", "Catálogo de soluciones por rubro", "Formulario de consulta"],
    stack: ["React", "Vite", "Tailwind"],
    repo: null,
    demo: "https://rebrotar.com.ar/",
    image: null,
    badge: "Live",
  },
];

const EXPERIENCE = [
  {
    company: "SsyscTech",
    role: "Diseñador UX/UI",
    period: "2023 — Actualidad",
    bullets: [
      "Mapeo de customer journey y arquitectura de información.",
      "Prototipado y comunicación de soluciones centradas en el usuario.",
      "Priorización de funcionalidades y colaboración con equipos.",
      "Diseño de interfaces responsivas y accesibles.",
      "Creación de guías de estilo y componentes reutilizables.",
      "Pruebas de usabilidad y análisis de métricas.",
      "Iteración basada en feedback de usuarios y stakeholders.",
      "Colaboración con desarrolladores para asegurar implementación fiel al diseño.",
      "Metodologías ágiles (Scrum) para gestión de proyectos.",
      "Comunicación efectiva con equipos multidisciplinarios.",
      "Adaptación a nuevas herramientas y tecnologías según necesidades del proyecto.",
      "Trabajo en proyectos variados: web apps, mobile apps, dashboards administrativos.",
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

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{title}</span>
        </h2>
        <div className="mt-2 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" />
      </div>
      {children}
    </motion.section>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 dark:bg-blue-950/50 dark:border-blue-700/40 px-3 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`group rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 p-5 shadow-sm bg-white/70 dark:bg-zinc-900/70 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/40 dark:hover:border-blue-500/30 ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectBadge({ label }) {
  if (label === "Interno") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/60 dark:border-zinc-600/60 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <Lock size={10} /> Interno
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/50 border border-green-200/70 dark:border-green-700/40 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      Live
    </span>
  );
}

function ProjectImagePlaceholder({ title }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 via-indigo-500/15 to-purple-600/20 flex items-center justify-center border border-blue-200/30 dark:border-blue-700/20">
      <span className="text-2xl font-bold tracking-tight text-blue-400/60 dark:text-blue-500/40 select-none">
        {title.split("—")[0].trim()}
      </span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#", label: "Sobre mí" },
    { href: "#projects", label: "Proyectos" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Educación" },
    { href: "#contact", label: "Contacto" },
  ];
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent backdrop-blur border-b border-blue-500/20">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">{PROFILE.name}</a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          <ChevronRight className={`transition-transform ${open ? "rotate-90" : ""}`} />
        </button>
        <ul className="hidden md:flex gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="relative py-1 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:rounded-full after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                href={l.href}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <img
          src="/accents/dots.svg"
          alt=""
          aria-hidden="true"
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 opacity-70 md:block"
        />
      </nav>
      {open && (
        <div className="md:hidden border-t">
          <ul className="mx-auto max-w-6xl px-4 py-3 space-y-3">
            {links.map((l) => (<li key={l.href}><a className="block" href={l.href}>{l.label}</a></li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-4 md:pt-8 pb-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {PROFILE.role} <span className="text-blue-700">/ Portfolio</span>
            </h1>
            <div className="mt-4 space-y-3">
              <p className="max-w-2xl text-zinc-700 dark:text-zinc-200">
                {PROFILE.summary}
              </p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {PROFILE.badges.map((b) => (
                  <li
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/60 px-3 py-1 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100 transition-colors duration-200 hover:bg-blue-200/60 dark:hover:bg-blue-800/50">
                    <span>{b.emoji}</span>
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {PROFILE.skills.map((s) => (<Tag key={s}>{s}</Tag>))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300/60 dark:border-zinc-700 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                href={PROFILE.links.github} target="_blank" rel="noreferrer"
              >
                <Github size={16}/> GitHub
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300/60 dark:border-zinc-700 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                href={PROFILE.links.linkedin} target="_blank" rel="noreferrer"
              >
                <Linkedin size={16}/> LinkedIn
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300/60 dark:border-zinc-700 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                href={PROFILE.links.email}
              >
                <Mail size={16}/> Email
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 border border-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-200"
                href={PROFILE.links.cv} target="_blank" rel="noreferrer"
              >
                <FileDown size={16}/> Descargar CV
              </a>
            </div>
          </div>
          <Card className="max-w-md md:max-w-lg flex-shrink-0">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl md:h-[420px]">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="/assets/hero-jere.jpg"
                alt="Jeremías Regalzi"
              />
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">Jeremías Regalzi</p>
          </Card>
        </div>
      </motion.div>
    </header>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Proyectos">
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full flex flex-col">
              {/* Image with hover overlay */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                {p.image ? (
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                  />
                ) : (
                  <ProjectImagePlaceholder title={p.title} />
                )}
                {/* Overlay with links */}
                {(p.demo || p.repo) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end gap-2 p-4">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 text-zinc-900 px-3 py-1.5 text-xs font-semibold hover:bg-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} /> Ver demo
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900/80 border border-white/20 text-white px-3 py-1.5 text-xs font-semibold hover:bg-zinc-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={12} /> Código
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col flex-1">
                {/* Title + badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                  {p.badge && <ProjectBadge label={p.badge} />}
                </div>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{p.description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>

                <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Footer links */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-sm">
                  {p.repo ? (
                    <a
                      className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      href={p.repo} target="_blank" rel="noreferrer"
                    >
                      <Github size={15}/> Código
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600 cursor-default select-none">
                      <Lock size={13}/> Repo privado
                    </span>
                  )}
                  {p.demo ? (
                    <a
                      className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      href={p.demo} target="_blank" rel="noreferrer"
                    >
                      <ExternalLink size={15}/> Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600 cursor-default select-none">
                      <Lock size={13}/> Sin demo pública
                    </span>
                  )}
                  {p.caseStudy && (
                    <Link
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors ml-auto"
                      to={p.caseStudy}
                    >
                      Caso de estudio <ChevronRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experiencia">
      <div className="grid md:grid-cols-2 gap-6">
        {EXPERIENCE.map((e) => (
          <Card key={e.company}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">{e.role}</h3>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{e.company}</p>
              </div>
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full px-2.5 py-1 text-zinc-600 dark:text-zinc-400 whitespace-nowrap h-fit">
                {e.period}
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
              {e.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400/70 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Educación">
      <div className="grid md:grid-cols-2 gap-4">
        {EDUCATION.map((ed) => (
          <Card key={ed.degree} className="flex items-start gap-4">
            <div className="mt-0.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 p-2 flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6L3 9m9 5l9-5" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-snug">{ed.degree}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{ed.school}</p>
              <span className="text-xs text-zinc-500 dark:text-zinc-500">{ed.period}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contacto">
      <Card>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">
          ¿Tenés un proyecto en mente o querés charlar? Escribime y te respondo a la brevedad.
        </p>
        <form
          name="contact"
          method="POST"
          action="https://formsubmit.co/jereregalzi93@gmail.com"
          className="grid md:grid-cols-2 gap-4"
        >
          <input type="hidden" name="_next" value="https://jeremias-regalzi-portfolio.netlify.app/success.html" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Nombre</label>
            <input
              name="name"
              type="text"
              required
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              placeholder="Tu nombre"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</label>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              placeholder="tunombre@email.com"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Mensaje</label>
            <textarea
              name="message"
              rows={5}
              required
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 px-3 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-none"
              placeholder="Contame brevemente en qué puedo ayudarte…"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-500/20"
            >
              <Mail size={15} /> Enviar mensaje
            </button>
          </div>
        </form>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-blue-500/20">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-gradient-to-r from-blue-900/10 via-indigo-800/10 to-transparent">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <div className="flex items-center gap-5">
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href={PROFILE.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href={PROFILE.links.email}>Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <ScrollProgress/>
      <Navbar />
      <Hero />
      <main className="mx-auto max-w-6xl px-4 space-y-16">
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
