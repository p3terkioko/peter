import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import { cv } from "@/data/cv";
import PrintButton from "./PrintButton";
import "./print.css";

const description = "CV of Peter Kioko, full-stack software engineer in Nairobi.";

export const metadata: Metadata = {
  title: "Peter Kioko | CV",
  description,
  openGraph: {
    title: "Peter Kioko | CV",
    description,
    url: "https://peter-seven.vercel.app/cv",
    siteName: "Peter Kioko",
    type: "profile",
  },
};

const actionClass =
  "px-4 py-2 text-xs font-mono border border-parchment/30 uppercase tracking-widest text-parchment hover:border-neonAccent hover:text-neonAccent transition-colors motion-reduce:transition-none hover-target";

const linkClass = "hover:text-neonAccent transition-colors motion-reduce:transition-none hover-target";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="cv-section flex flex-col md:flex-row border-t border-parchment/20 pt-8">
      <h2 id={id} className="cv-h2 w-full md:w-1/3 text-3xl md:text-4xl font-heading uppercase text-parchment/80 mb-6 md:mb-0 md:pr-8">
        {title}
      </h2>
      <div className="cv-body w-full md:w-2/3 min-w-0 md:border-l border-parchment/20 md:pl-8">{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <div className="cv-root relative min-h-screen w-full bg-charcoal text-parchment">
      <div className="cv-screen-only motion-reduce:hidden">
        <CustomCursor />
      </div>

      <nav aria-label="Site" className="cv-screen-only absolute top-8 left-4 md:left-8 z-50">
        <Link href="/" className="font-mono text-xs md:text-sm tracking-widest text-parchment/60 hover:text-neonAccent transition-colors motion-reduce:transition-none uppercase">
          ← Return
        </Link>
      </nav>
      <div className="cv-screen-only absolute top-8 right-4 md:right-8 z-50 font-mono text-xs md:text-sm tracking-widest text-parchment/60 uppercase">
        P. CV
      </div>

      <header className="cv-header px-4 md:px-12 lg:px-24 pt-28 md:pt-32 pb-12 md:pb-16 max-w-7xl">
        <h1 className="cv-name text-6xl md:text-9xl font-heading uppercase leading-none text-neonAccent">{cv.name}</h1>
        <p className="cv-title mt-4 font-mono text-xs md:text-base text-parchment/70 uppercase tracking-widest">{cv.title}</p>
        <ul className="cv-contacts mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs md:text-sm text-parchment/60">
          <li>{cv.location}</li>
          {cv.contacts.map((c) => (
            <li key={c.href} className="min-w-0 [overflow-wrap:anywhere]">
              <a href={c.href} className={linkClass}>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="cv-screen-only mt-8 flex flex-wrap gap-3">
          <a href={cv.pdfPath} download className={actionClass}>
            Download PDF
          </a>
          <PrintButton className={actionClass} />
        </div>
      </header>

      <main className="cv-main flex flex-col gap-16 md:gap-24 px-4 md:px-12 lg:px-24 pb-32 max-w-7xl">
        <Section id="summary" title="Summary">
          <p className="font-mono text-sm md:text-base text-parchment/80 leading-relaxed">{cv.summary}</p>
        </Section>

        <Section id="skills" title="Technical Skills">
          <ul className="cv-skills flex flex-col gap-4">
            {cv.skills.map((s) => (
              <li key={s.group} className="cv-skill flex flex-col sm:flex-row gap-1 sm:gap-6">
                <span className="cv-skill-group font-mono text-xs uppercase tracking-widest text-neonAccent sm:w-36 sm:shrink-0 sm:pt-0.5">
                  {s.group}
                </span>
                <span className="font-mono text-sm md:text-base text-parchment/80 leading-relaxed">{s.items}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          {cv.experience.map((role) => (
            <div key={role.title + role.company} className="cv-role">
              <h3 className="cv-h3 text-3xl md:text-4xl font-heading uppercase leading-none">{role.title}</h3>
              <p className="cv-role-meta mt-2 font-mono text-sm md:text-base text-parchment">{role.company}</p>
              <ul className="cv-periods mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 font-mono text-xs md:text-sm uppercase tracking-widest text-parchment/50">
                {role.periods.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul className="cv-list mt-6 flex flex-col gap-4 list-disc pl-5 marker:text-neonAccent">
                {role.highlights.map((h) => (
                  <li key={h.text} className="cv-entry font-mono text-sm md:text-base text-parchment/80 leading-relaxed">
                    {h.label && <strong className="font-bold text-parchment">{h.label}: </strong>}
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section id="projects" title="Selected Projects">
          <ul className="cv-projects flex flex-col gap-4">
            {cv.projects.map((p) => (
              <li key={p.name} className="cv-project cv-entry border border-parchment/20 p-4 md:p-6">
                <h3 className="cv-h3 text-2xl md:text-3xl font-heading uppercase leading-none">
                  {p.name}
                  {p.note && <span className="cv-note ml-2 font-mono text-xs normal-case tracking-normal text-parchment/50">({p.note})</span>}
                </h3>
                {p.link && (
                  <p className="cv-project-link mt-2 font-mono text-xs [overflow-wrap:anywhere]">
                    <a href={p.link.href} className={`text-parchment/70 ${linkClass}`}>
                      {p.link.label}
                    </a>
                  </p>
                )}
                <p className="cv-stack mt-3 font-mono text-xs uppercase tracking-wider text-neonAccent leading-relaxed">
                  <span className="text-parchment/50">Stack: </span>
                  {p.stack}
                </p>
                <ul className="cv-list mt-4 flex flex-col gap-3 list-disc pl-5 marker:text-neonAccent">
                  {p.bullets.map((b) => (
                    <li key={b} className="font-mono text-sm text-parchment/80 leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
          <ul className="flex flex-col gap-4">
            {cv.education.map((e) => (
              <li key={e.degree} className="cv-entry">
                <h3 className="cv-h3 text-2xl md:text-3xl font-heading uppercase leading-none">{e.degree}</h3>
                <p className="cv-role-meta mt-2 font-mono text-sm md:text-base text-parchment">{e.school}</p>
                <p className="cv-periods mt-1 font-mono text-xs md:text-sm uppercase tracking-widest text-parchment/50">
                  {e.dates}. {e.note}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="mentorship" title="Mentorship">
          <ul className="flex flex-col gap-8">
            {cv.mentorship.map((m) => (
              <li key={m.title} className="cv-entry">
                <h3 className="cv-h3 text-2xl md:text-3xl font-heading uppercase leading-none">{m.title}</h3>
                <p className="cv-periods mt-2 font-mono text-xs md:text-sm uppercase tracking-widest text-parchment/50">{m.dates}</p>
                <p className="mt-3 font-mono text-sm md:text-base text-parchment/80 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="honours" title="Honours">
          <ul className="cv-list flex flex-col gap-3 list-disc pl-5 marker:text-neonAccent">
            {cv.honours.map((h) => (
              <li key={h} className="cv-entry font-mono text-sm md:text-base text-parchment/80 leading-relaxed">
                {h}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
}
