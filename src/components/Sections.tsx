import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Reveal from '../lib/Reveal';
import { useInView, useCountUp } from '../hooks/useMotion';
import { useTheme } from './ThemeProvider';
import type { Theme } from './ThemeProvider';

export type { Theme };

export type Content = {
  name: string;
  role: string;
  tagline: string;
  photo?: string;
  email: string;
  phone?: string;
  location?: string;
  languages?: string[];
  socials: { label: string; href: string }[];
  about: string[];
  services?: { title: string; desc: string; icon?: string }[];
  skills?: { name: string; level: number; note?: string }[];
  skillsIcons?: { name: string; note?: string; icon?: string }[];
  skillsDetailed?: { category: string; items: { name: string; level: number; note?: string }[] }[];
  experience?: { role: string; company: string; period: string; desc?: string; icon?: string }[];
  education?: { degree: string; school: string; period: string; desc?: string }[];
  certificates?: string[];
  stats?: { label: string; value: number; suffix?: string; prefix?: string }[];
  cards?: { title: string; desc: string; stack?: string; metric?: string; image?: string }[];
  projects?: { title: string; desc: string; image?: string; tags?: string[]; link?: string }[];
  awards?: { title: string; detail: string; year?: string }[];
  hobbies?: { name: string; note?: string; icon?: string }[];
  testimonials?: { quote: string; author: string; role: string; company?: string; avatar?: string }[];
  blogPosts?: { title: string; excerpt: string; date: string; tags?: string[]; readTime?: string }[];
  faqItems?: { question: string; answer: string }[];
  contactMethods?: { type: string; value: string; icon: string; href?: string }[];
  footnote?: string;
  blurb?: string;
  ticker?: string[];
};

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  const t = useTheme().theme;
  return (
    <Reveal className="text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: t.accent }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl" style={{ color: t.text }}>
        {title}
      </h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl" style={{ color: t.muted }}>{sub}</p>}
    </Reveal>
  );
}

/* ----------------------------- MARQUEE / TICKER ----------------------------- */
export function TickerMarquee({ items }: { items: string[] }) {
  const t = useTheme().theme;
  return (
    <div className="relative overflow-hidden border-y py-3 sm:py-4" style={{ borderColor: t.border, background: t.surface }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className="mx-4 sm:mx-6 font-mono text-xs sm:text-sm uppercase tracking-widest"
            style={{ color: `${t.accent}cc` }}
          >
            {it} <span className="hidden sm:inline" style={{ color: t.muted }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ----------------------------- ABOUT ----------------------------- */
export function AboutSection({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="about" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="About" title="A little about me" />
        <div className="mt-8 space-y-4 text-center text-base sm:text-lg leading-relaxed" style={{ color: t.muted }}>
          {content.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SERVICES ----------------------------- */
export function Services({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.services?.length) return null;
  return (
    <section id="services" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Services" title="What I bring to the table" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="h-full rounded-2xl border p-5 sm:p-6"
                style={{ borderColor: t.border, background: t.surface }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${t.accent}1f`, color: t.accent }}
                >
                  {s.icon ?? '✦'}
                </span>
                <h4 className="mt-4 text-lg font-bold" style={{ color: t.text }}>{s.title}</h4>
                <p className="mt-2 text-sm" style={{ color: t.muted }}>{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- STATS ----------------------------- */
export function StatCounters({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="stats" className="py-12 sm:py-20" style={{ background: t.bg }}>
      <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 px-4 sm:px-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {content.stats?.map((s, i) => (
          <CounterCell key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

function CounterCell({
  label,
  value,
  suffix,
  prefix,
  delay,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView);
  const t = useTheme().theme;
  return (
    <Reveal delay={delay} y={20}>
      <div
        ref={ref}
        className="rounded-2xl border p-4 sm:p-6 text-center backdrop-blur"
        style={{ borderColor: t.border, background: t.surface }}
      >
        <p className="text-2xl sm:text-4xl font-extrabold" style={{ color: t.accent }}>
          {prefix}{n}{suffix}
        </p>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm" style={{ color: t.muted }}>{label}</p>
      </div>
    </Reveal>
  );
}

/* ----------------------------- SKILLS (meters) ----------------------------- */
export function MeterSkills({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="skills" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Skills" title="Areas of expertise" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2">
          {content.skills?.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: t.border, background: t.surface }}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-semibold text-sm sm:text-base" style={{ color: t.text }}>{s.name}</span>
                  <span className="font-mono text-xs sm:text-sm" style={{ color: t.accent }}>{s.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: t.border }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                      boxShadow: `0 0 12px ${t.accent}`,
                    }}
                  />
                </div>
                {s.note && <p className="mt-2 text-xs" style={{ color: t.muted }}>{s.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SKILLS (icon tiles) ----------------------------- */
export function IconSkillTiles({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.skillsIcons?.length) return null;
  return (
    <section id="skills-extra" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Skills" title="Core capabilities" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.skillsIcons?.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex items-center gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-5"
                style={{ borderColor: t.border, background: t.bg }}
              >
                <span
                  className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl text-xl sm:text-2xl"
                  style={{ background: `${t.accent}1f`, color: t.accent }}
                >
                  {s.icon ?? s.name[0]}
                </span>
                <div>
                  <span className="block font-semibold" style={{ color: t.text }}>{s.name}</span>
                  {s.note && <span className="text-sm" style={{ color: t.muted }}>{s.note}</span>}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TIMELINE ----------------------------- */
export function Timeline({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="experience" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Career history" />
        <div className="relative mt-10 sm:mt-12 pl-6 sm:pl-8">
          <div className="absolute left-[5px] sm:left-[7px] top-0 h-full w-px" style={{ background: `${t.accent}55` }} />
          {content.experience?.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.1}>
              <div className="relative mb-8 sm:mb-10">
                <motion.span
                  className="absolute -left-6 sm:-left-8 top-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full"
                  style={{ background: t.accent, boxShadow: `0 0 12px ${t.accent}` }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
                <div className="rounded-2xl border p-4 sm:p-6" style={{ borderColor: t.border, background: t.bg }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base sm:text-xl font-bold" style={{ color: t.text }}>{e.role}</h4>
                    <span className="font-mono text-xs sm:text-sm" style={{ color: t.accent }}>{e.period}</span>
                  </div>
                  <p className="mt-1 font-medium" style={{ color: t.accent2 }}>{e.company}</p>
                  {e.desc && <p className="mt-3" style={{ color: t.muted }}>{e.desc}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EDUCATION ----------------------------- */
export function Education({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.education?.length) return null;
  return (
    <section id="education" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
          {content.education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border p-5 sm:p-6" style={{ borderColor: t.border, background: t.surface }}>
                <span className="text-2xl sm:text-3xl">🎓</span>
                <h4 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold" style={{ color: t.text }}>{e.degree}</h4>
                <p className="font-medium" style={{ color: t.accent }}>{e.school}</p>
                <span className="font-mono text-xs" style={{ color: t.muted }}>{e.period}</span>
                {e.desc && <p className="mt-2 text-sm" style={{ color: t.muted }}>{e.desc}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CERTIFICATES ----------------------------- */
export function CertGrid({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="certificates" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Credentials" title="Certificates & badges" />
        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-5 sm:grid-cols-2">
          {content.certificates?.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="flex items-center gap-3 sm:gap-4 rounded-xl border p-4 sm:p-5"
              style={{ borderColor: t.border, background: t.surface }}
            >
              <span
                className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg text-base sm:text-lg"
                style={{ background: `${t.accent}22`, color: t.accent }}
              >
                ✦
              </span>
              <span className="font-medium" style={{ color: t.text }}>{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- AWARDS ----------------------------- */
export function Awards({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.awards?.length) return null;
  return (
    <section id="awards" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Recognition" title="Awards & achievements" />
        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          {content.awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="flex items-center gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-5" style={{ borderColor: t.border, background: t.bg }}>
                <span className="text-xl sm:text-2xl">🏆</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm sm:text-base" style={{ color: t.text }}>{a.title}</h4>
                  <p className="text-xs sm:text-sm" style={{ color: t.muted }}>{a.detail}</p>
                </div>
                {a.year && <span className="font-mono text-sm" style={{ color: t.accent }}>{a.year}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PROJECTS (image cards) ----------------------------- */
export function Projects({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.projects?.length) return null;
  return (
    <section id="projects" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Work" title="Featured projects" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border"
                style={{ borderColor: t.border, background: t.surface }}
              >
                {p.image && (
                  <div className="relative h-36 sm:h-40 overflow-hidden" style={{ background: `${t.accent}22` }}>
                    <motion.img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(180deg, transparent, ${t.surface})` }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h4 className="text-base sm:text-lg font-bold" style={{ color: t.text }}>{p.title}</h4>
                  <p className="mt-1 flex-1 text-xs sm:text-sm" style={{ color: t.muted }}>{p.desc}</p>
                  {p.tags?.length && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((tg) => (
                        <span
                          key={tg}
                          className="rounded-full px-2.5 py-0.5 font-mono text-xs"
                          style={{ background: `${t.accent}22`, color: t.accent }}
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CARDS (existing) ----------------------------- */
export function CardGrid({
  content,
  eyebrow,
  title,
  image,
}: {
  content: Content;
  eyebrow: string;
  title: string;
  image?: boolean;
}) {
  const t = useTheme().theme;
  return (
    <section id={eyebrow.toLowerCase().replace(/\s/g, '-')} className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
          {content.cards?.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border"
                style={{ borderColor: t.border, background: t.bg }}
              >
                {image && (p.image ? (
                  <img src={p.image} alt={p.title} className="h-28 sm:h-32 w-full object-cover" />
                ) : (
                  <div className="h-28 sm:h-32 w-full" style={{ background: `linear-gradient(120deg, ${t.accent}33, ${t.accent2}33)` }} />
                ))}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h4 className="text-base sm:text-lg font-bold" style={{ color: t.text }}>{p.title}</h4>
                  {p.metric && <p className="mt-1 font-mono text-xs sm:text-sm" style={{ color: t.accent }}>{p.metric}</p>}
                  <p className="mt-2 text-xs sm:text-sm flex-1" style={{ color: t.muted }}>{p.desc}</p>
                  {p.stack && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.split(', ').map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-2.5 py-0.5 font-mono text-xs"
                          style={{ background: `${t.accent}22`, color: t.accent }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- HOBBIES ----------------------------- */
export function Hobbies({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.hobbies?.length) return null;
  return (
    <section id="interests" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Beyond work" title="Interests & hobbies" />
        <div className="mt-10 sm:mt-12 grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {content.hobbies.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ rotate: [-1, 1, -1] }}
              className="rounded-2xl border p-4 sm:p-6 text-center"
              style={{ borderColor: t.border, background: t.bg }}
            >
              <span className="text-2xl sm:text-3xl">{h.icon ?? '✦'}</span>
              <h4 className="mt-2 sm:mt-3 font-bold text-sm sm:text-base" style={{ color: t.text }}>{h.name}</h4>
              {h.note && <p className="text-sm" style={{ color: t.muted }}>{h.note}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TESTIMONIALS ----------------------------- */
export function TestimonialSection({ content }: { content: Content }) {
  const t = useTheme().theme;
  return (
    <section id="testimonials" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="What people say" />
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
          {content.testimonials?.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.1}>
              <figure className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: t.border, background: t.surface }}>
                <span className="text-2xl sm:text-3xl" style={{ color: t.accent }}>"</span>
                <blockquote className="text-base sm:text-lg" style={{ color: t.text }}>{q.quote}</blockquote>
                <figcaption className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4" style={{ borderColor: t.border }}>
                  <span className="block font-semibold text-sm sm:text-base" style={{ color: t.text }}>{q.author}</span>
                  <span className="text-xs sm:text-sm" style={{ color: t.muted }}>{q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
export function ContactShell({ content, children }: { content: Content; children?: ReactNode }) {
  const t = useTheme().theme;
  return (
    <section id="contact" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Let's get in touch" />
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {content.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ borderColor: t.border, color: t.text }}
              >
                {s.label}
              </a>
            ))}
            <span className="font-mono text-xs sm:text-sm" style={{ color: t.muted }}>{content.email}</span>
          </div>
          <p className="mt-4 text-center text-sm sm:text-base" style={{ color: t.muted }}>
            {content.location && <span>{content.location} · </span>}
            {content.phone}
          </p>
        </Reveal>
        {children ?? (
          <Reveal delay={0.2}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 space-y-3 sm:space-y-4 rounded-2xl border p-4 sm:p-6"
              style={{ borderColor: t.border, background: t.bg }}
            >
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  className="rounded-lg border bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none"
                  style={{ borderColor: t.border, color: t.text }}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="rounded-lg border bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none"
                  style={{ borderColor: t.border, color: t.text }}
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Your message..."
                className="w-full rounded-lg border bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none resize-none"
                style={{ borderColor: t.border, color: t.text }}
              />
              <button
                type="submit"
                className="w-full rounded-lg py-2.5 sm:py-3 font-semibold transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-8"
                style={{ background: t.accent, color: t.bg }}
              >
                Send message
              </button>
            </form>
          </Reveal>
        )}
        {content.footnote && (
          <Reveal delay={0.3}>
            <p className="mt-8 text-center font-mono text-xs" style={{ color: t.muted }}>
              {content.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- BLOG POSTS ----------------------------- */
export function BlogSection({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.blogPosts?.length) return null;
  return (
    <section id="blog" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Blog" title="Latest insights" sub="Thoughts, tutorials, and industry perspectives" />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.blogPosts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
                style={{ borderColor: t.border, background: t.surface }}
              >
                <div className="flex items-center gap-2 sm:gap-3 text-xs" style={{ color: t.muted }}>
                  <span className="font-mono">{post.date}</span>
                  {post.readTime && <span>· {post.readTime}</span>}
                </div>
                <h4 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold" style={{ color: t.text }}>{post.title}</h4>
                <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed" style={{ color: t.muted }}>{post.excerpt}</p>
                {post.tags?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-0.5 font-mono text-xs"
                        style={{ background: `${t.accent}22`, color: t.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <motion.div
                  className="mt-4 flex items-center gap-2 text-sm font-medium"
                  style={{ color: t.accent }}
                  whileHover={{ x: 4 }}
                >
                  Read more <span>→</span>
                </motion.div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */
export function FAQSection({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.faqItems?.length) return null;
  return (
    <section id="faq" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions" sub="Quick answers to frequently asked questions" />
        <div className="mt-10 sm:mt-12 space-y-3 sm:space-y-4">
          {content.faqItems.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl border p-4 sm:p-6"
                style={{ borderColor: t.border, background: t.bg }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-xs sm:text-sm font-bold"
                    style={{ background: `${t.accent}22`, color: t.accent }}
                  >
                    Q
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base" style={{ color: t.text }}>{item.question}</h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: t.muted }}>{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- ENHANCED TIMELINE (with icons) ----------------------------- */
export function EnhancedTimeline({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.experience?.length) return null;
  return (
    <section id="experience-enhanced" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Career Path" title="Professional journey" sub="Key milestones and achievements" />
        <div className="relative mt-10 sm:mt-12">
          {content.experience.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.12}>
              <div className={`flex gap-4 sm:gap-6 mb-8 sm:mb-12`}>
                <motion.div
                  className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-lg sm:text-2xl"
                  style={{ background: `${t.accent}22`, color: t.accent }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {exp.icon ?? '💼'}
                </motion.div>
                <div className="flex-1 rounded-2xl border p-4 sm:p-6" style={{ borderColor: t.border, background: t.surface }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base sm:text-xl font-bold" style={{ color: t.text }}>{exp.role}</h4>
                    <span className="font-mono text-xs sm:text-sm" style={{ color: t.accent }}>{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm sm:text-base font-medium" style={{ color: t.accent2 }}>{exp.company}</p>
                  {exp.desc && <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed" style={{ color: t.muted }}>{exp.desc}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SKILLS DETAILED (with subcategories) ----------------------------- */
export function SkillsDetailedGrid({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.skillsDetailed?.length) return null;
  return (
    <section id="skills-detailed" className="py-16 sm:py-24" style={{ background: t.surface }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Expertise" title="Skills breakdown" sub="Detailed proficiency across domains" />
        <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          {content.skillsDetailed.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.1}>
              <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: t.border, background: t.bg }}>
                <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: t.text }}>{cat.category}</h4>
                <div className="space-y-2 sm:space-y-3">
                  {cat.items.map((skill, j) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 }}
                    >
                      <div className="mb-1 flex items-baseline justify-between">
                        <span className="text-xs sm:text-sm font-medium" style={{ color: t.text }}>{skill.name}</span>
                        <span className="font-mono text-[10px] sm:text-xs" style={{ color: t.accent }}>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: t.border }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 + j * 0.05 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                          }}
                        />
                      </div>
                      {skill.note && <p className="mt-1 text-xs" style={{ color: t.muted }}>{skill.note}</p>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT METHODS (with icons) ----------------------------- */
export function ContactMethodsGrid({ content }: { content: Content }) {
  const t = useTheme().theme;
  if (!content.contactMethods?.length) return null;
  return (
    <section id="contact-methods" className="py-16 sm:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Reach Out" title="Contact options" sub="Multiple ways to connect" />
        <div className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.contactMethods.map((method, i) => (
            <Reveal key={method.type} delay={i * 0.08}>
              <motion.a
                href={method.href ?? '#'}
                target={method.href ? '_blank' : undefined}
                rel={method.href ? 'noreferrer' : undefined}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex items-center gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-5 transition-colors"
                style={{ borderColor: t.border, background: t.surface }}
              >
                <span
                  className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl text-xl sm:text-2xl"
                  style={{ background: `${t.accent}1f`, color: t.accent }}
                >
                  {method.icon}
                </span>
                <div>
                  <span className="block text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: t.muted }}>{method.type}</span>
                  <span className="block text-sm sm:text-base font-medium" style={{ color: t.text }}>{method.value}</span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SVG WAVE DIVIDER ----------------------------- */
export function WaveDivider({ color, flip }: { color?: string; flip?: boolean }) {
  const t = useTheme().theme;
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ marginTop: -1, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 sm:h-20">
        <motion.path
          d="M0 60L48 54C96 48 192 36 288 42C384 48 480 72 576 78C672 84 768 72 864 60C960 48 1056 36 1152 42C1248 48 1344 60 1392 66L1440 72V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
          fill={color || t.bg}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ----------------------------- FLOATING PARTICLES ----------------------------- */
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const t = useTheme().theme;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: `${t.accent}40` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ----------------------------- ANIMATED GRADIENT TEXT ----------------------------- */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  const t = useTheme().theme;
  return (
    <motion.span className={`bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: `linear-gradient(90deg, ${t.accent}, ${t.accent2}, ${t.accent})`, backgroundSize: '200% auto' }}
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
      {children}
    </motion.span>
  );
}

/* ----------------------------- MAGNETIC BUTTON ----------------------------- */
export function MagneticButton({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  const t = useTheme().theme;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;
    setPosition({ x, y });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return (
    <motion.a href={href} onMouseMove={handleMouse} onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className={className} style={{ background: t.accent, color: t.bg }}>
      {children}
    </motion.a>
  );
}
