import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, FileDown } from "lucide-react";
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
  // badges de valores/forma de trabajo (3)
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
    title: "PIRtech — Catálogo + Presupuesto",
    description:
      "Sitio tipo catálogo con filtros, ficha de producto y sistema de solicitud de presupuesto. UX minimalista, moderna y responsive.",
    highlights: ["Filtros dinámicos", "Estado del presupuesto en Navbar", "Placeholders por categoría"],
    stack: ["React", "Vite", "Tailwind", "Node"],
    repo: "https://github.com/jereregalzi7/pirtech",
    demo: "https://pirtech.netlify.app/",
    image: "/assets/pirtech-home.png",
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
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
      <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{title}</span>
      <span className="h-[3px] w-10 rounded-full bg-blue-500/70"></span>
    </h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

function Tag({ children }) {
  return (<span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">{children}</span>);
}

function Card({ children, className = "" }) {
  return (<div className={`rounded-2xl border p-5 shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur ${className}`}>{children}</div>);
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
          {links.map((l) => (<li key={l.href}><a className="hover:underline underline-offset-4" href={l.href}>{l.label}</a></li>))}
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
             {/* Sobre mí (texto mejorado) + badges de valores */}
            <div className="mt-4 space-y-3">
              <p className="max-w-2xl text-zinc-700 dark:text-zinc-200">
                {PROFILE.summary}
              </p>

              <ul className="flex flex-wrap gap-2 text-sm">
                {PROFILE.badges.map((b) => (
                  <li
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/60 px-3 py-1 text-blue-900
                              dark:bg-blue-900/40 dark:text-blue-100">
                    <span>{b.emoji}</span>
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {PROFILE.skills.map((s) => (<Tag key={s}>{s}</Tag>))}
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={PROFILE.links.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={PROFILE.links.email}><Mail size={18}/> Email</a>
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href={PROFILE.links.cv} target="_blank" rel="noreferrer"><FileDown size={18}/> Descargar CV</a>
            </div>
          </div>
          <Card className="max-w-md md:max-w-lg">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl md:h-[420px]">
              <img className="h-full w-full object-cover" src="/assets/hero-jere.jpg" alt="Jeremías Regalzi" />
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
          <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card>
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <img className="h-full w-full object-cover" src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <a className="inline-flex items-center gap-2 underline underline-offset-4" href={p.repo} target="_blank" rel="noreferrer"><Github size={18}/> Código</a>
                  <a className="inline-flex items-center gap-2 underline underline-offset-4" href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={18}/> Demo</a>
                  <Link className="inline-flex items-center gap-2 underline underline-offset-4"
                        to="/proyectos/pirtech">
                    Ver caso de estudio
                  </Link>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">{e.role}</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-200">{e.company}</p>
              </div>
              <span className="text-sm text-zinc-700 dark:text-zinc-200">{e.period}</span>
            </div>
            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200">
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
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
          <Card key={ed.school}>
            <h3 className="font-semibold">{ed.degree}</h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-200">{ed.school}</p>
            <span className="text-sm text-zinc-700 dark:text-zinc-200">{ed.period}</span>
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
        <form
            name="contact"
            method="POST"
            action="https://formsubmit.co/jereregalzi93@gmail.com"
            className="grid md:grid-cols-2 gap-4"
        >
          {/* Configuración FormSubmit */}
          <input type="hidden" name="_next" value="https://jeremias-regalzi-portfolio.netlify.app/success.html" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="grid gap-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-200">Nombre</label>
            <input
              name="name"
              type="text"
              required
              className="rounded-xl border bg-white/70 dark:bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-200">Email</label>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border bg-white/70 dark:bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tunombre@email.com"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-200">Mensaje</label>
            <textarea
              name="message"
              rows={5}
              required
              className="rounded-xl border bg-white/70 dark:bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contame brevemente en qué puedo ayudarte…"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
</Card>

    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-zinc-700 dark:text-zinc-200 border-t border-blue-500/20 bg-gradient-to-r from-blue-900/10 via-indigo-800/10 to-transparent">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <div className="flex items-center gap-4">
          <a href={PROFILE.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={PROFILE.links.email}>Email</a>
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
      <main className="mx-auto max-w-6xl px-4 space-y-14">
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
