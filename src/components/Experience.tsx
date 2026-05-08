"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Saracen Marketing Group",
    roles: [
      {
        title: "Junior Software Developer",
        date: "Dec 2025 - Present",
        details: "Architecting resilient full-stack applications, dynamic frontends, and high-conversion landing pages. Driving platform innovation through advanced LLM/AI integrations and automating CI/CD deployment pipelines."
      },
      {
        title: "Software Developer Intern",
        date: "Jun 2025 - Dec 2025",
        details: "Engineered resilient frontend architectures for internal CRM tooling and managed enterprise-grade MS Dynamics 365 implementations. Executed rigorous Lighthouse audits, optimizing Core Web Vitals."
      }
    ]
  },
  {
    company: "KamiLimu",
    roles: [
      {
        title: "Cohort 9 Mentee",
        date: "Mar 2025 - Nov 2025",
        details: "An 8-month structured mentorship program for undergraduate tech students in Kenya. Innovation Finals Runner-Up. Scholarship & Public Speaking Semi-Finalist."
      }
    ]
  },
  {
    company: "Achievements",
    roles: [
      {
        title: "Algorand Hackathon UoN — 2nd Place",
        date: "2024",
        details: "Built a blockchain application at the University of Nairobi Algorand Hackathon. Placed 2nd out of competing teams."
      },
      {
        title: "Code Africa Hackathon — $100 Bounty",
        date: "2024",
        details: "Awarded a $100 bounty for deploying an Ethereum Layer 2 application on Base chain at the Code Africa Hackathon."
      },
      {
        title: "Moringa School — Software Engineering",
        date: "2022",
        details: "Completed Phase 0 and Phase 1 of the Software Engineering programme at Moringa School, Nairobi."
      }
    ]
  },
  {
    company: "University of Nairobi",
    roles: [
      {
        title: "BSc Computer Science",
        date: "2022 - 2026",
        details: "Bachelor of Science in Computer Science. Expected graduation 2026."
      }
    ]
  }
];

export default function Experience() {
  return (
    <section className="w-full py-32 px-4 md:px-12 bg-charcoal text-parchment relative z-10 border-t border-parchment/10">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-heading uppercase">Experience</h2>
        <span className="font-mono text-neonAccent tracking-widest text-xs md:text-sm">P. 004</span>
      </div>

      <div className="w-full border-t border-parchment/20">
        {experiences.map((exp, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            key={i}
            className="flex flex-col py-8 md:py-12 border-b border-parchment/20 group hover:bg-parchment/5 transition-colors cursor-crosshair"
          >
            <div className="font-mono text-neonAccent text-xl md:text-lg mb-8 font-bold md:font-normal tracking-widest">{exp.company}</div>

            <div className="flex flex-col gap-12 w-full pl-6 md:pl-8 border-l border-parchment/20 ml-1 md:ml-2">
              {exp.roles.map((role, j) => (
                <div key={j} className="flex flex-col md:flex-row justify-between relative group/role">
                  <div className="absolute -left-[29px] md:-left-[37px] top-1.5 w-2.5 h-2.5 bg-neonAccent/30 group-hover/role:bg-neonAccent transition-colors rounded-full" />

                  <div className="flex-1 font-mono text-[11px] md:text-sm tracking-widest uppercase mb-3 md:mb-0 opacity-60 mt-1">
                    {role.date}
                  </div>
                  <div className="flex-[2] flex flex-col gap-2 pr-0 md:pr-4 mb-3 md:mb-0">
                    <h3 className="text-3xl md:text-3xl font-heading uppercase leading-none">{role.title}</h3>
                  </div>
                  <div className="flex-[2] font-mono text-sm md:text-base opacity-80 mt-1 md:mt-0 max-w-sm leading-relaxed">
                    {role.details}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
