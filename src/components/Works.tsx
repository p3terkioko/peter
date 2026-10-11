"use client";
import Link from "next/link";

type Project = {
  title: string;
  tech: string[];
  desc: string;
  year: string;
  bgClass: string;
  link: string | null;
  internal?: boolean;
  note?: string;
};

const projects: Project[] = [
  {
    title: "FITCHECK AI",
    tech: ["Python", "FastAPI", "pgvector", "Supabase", "Groq (Llama 3.3)", "DigitalOcean"],
    desc: "RAG pipeline for fitness misinformation detection. Vector search over 37,455 chunks from 921 papers, with Llama 3.3 on Groq generating the answers. Scored 97% on 8 claims. Deployed to DigitalOcean through a CI/CD pipeline.",
    year: "2025",
    bgClass: "bg-[#0a0a0a]",
    link: "https://github.com/p3terkioko/fitcheck"
  },
  {
    title: "CLAUDE DESKTOP BUDDY",
    tech: ["ESP32", "C++", "BLE", "PlatformIO", "Claude API"],
    desc: "Physical AI companion built on TTGO T-Display. An ESP32 device that connects to Claude via BLE. The ASCII cat reacts in real time to your conversation state: thinking, responding, idle, celebrating.",
    year: "2026",
    bgClass: "bg-[#060606]",
    link: "/projects/buddy",
    internal: true,
  },
  {
    title: "MAWINGUOPS",
    tech: ["Node.js", "Express.js", "SQLite", "Python", "scikit-learn", "Gemini API", "Africa's Talking USSD", "Docker", "Google Cloud Run", "GitHub Actions"],
    desc: "Cloud native application delivering planting advisory based on climatic conditions for small-holder maize farmers in Machakos.",
    year: "2025",
    bgClass: "bg-[#050505]",
    link: "https://github.com/p3terkioko/MawinguOps"
  },
  {
    title: "OCC VS 2PL KV STORE",
    tech: ["Python", "Distributed Systems", "Concurrency Control", "Benchmarking"],
    desc: "Distributed key-value store that compares optimistic concurrency control with two-phase locking. A coordinator validates OCC commits, data nodes handle storage and locks, and a benchmark harness runs both strategies under the same workloads and charts the results.",
    year: "2026",
    bgClass: "bg-[#080808]",
    link: "https://github.com/p3terkioko/occ"
  },
  {
    title: "TABVAULT",
    tech: ["JavaScript", "Manifest V3", "Alarms API"],
    desc: "Manifest V3 browser extension that backs up tab groups and tabs on a schedule. Backups are driven by the Alarms API, so they keep running after the service worker is shut down.",
    year: "2026",
    bgClass: "bg-[#0a0a0a]",
    link: "https://github.com/p3terkioko/TabVault"
  },
  {
    // TODO: add a screenshot for this card.
    // TODO: confirm the product name and full stack (database, hosting) to add as tags.
    title: "ANALYTICS PLATFORM",
    tech: ["Elixir", "Phoenix LiveView"],
    desc: "Analytics product covering 3 markets and 15 channels. Designed the rollup and retention model that keeps sentiment data available beyond the live window.",
    year: "2026",
    bgClass: "bg-[#060606]",
    link: null
  },
  {
    // TODO: add a screenshot for this card.
    // TODO: add the stack for this product as tags (not provided yet).
    title: "COWORKING PLATFORM",
    tech: [],
    desc: "Management product for coworking spaces. An 8-table data model with role-based access for 4 roles. The invoicing flow locks the slot and tracks invoice and payment separately.",
    year: "2026",
    bgClass: "bg-[#050505]",
    link: null
  },
  {
    // TODO: the name suggests Algorand but the tags say Solidity and Ethereum. Confirm which chain AlgoPesa used and fix the tags.
    title: "ALGOPESA",
    tech: ["Solidity", "Ethereum", "M-Pesa API"],
    desc: "Smart contract platform enabling reliable M-Pesa to crypto transactions in East Africa.",
    year: "2024",
    bgClass: "bg-[#080808]",
    link: "https://github.com/danielobima/AlgoPesa",
    note: "Team project"
  }
];

const earlierWork = [
  { title: "EduSphere", link: "https://github.com/p3terkioko/Edusphere" },
  { title: "Crypto Tracker", link: "https://github.com/p3terkioko/crypto-tracker" },
  { title: "Weather App", link: "https://github.com/p3terkioko/weather2" },
];

export default function Works() {
  return (
    <section className="w-full relative z-10">
      <div className="px-4 md:px-12 py-8 flex justify-between items-end bg-charcoal border-y border-parchment/10 sticky top-0 z-50">
        <h2 className="text-4xl md:text-6xl font-heading text-parchment uppercase">Selected Works</h2>
        <span className="font-mono text-neonAccent tracking-widest text-xs md:text-sm">P. 003</span>
      </div>

      <div className="w-full relative">
        {projects.map((project, i) => (
          <div 
            key={i} 
            className={`relative md:sticky md:top-0 min-h-[70svh] md:h-[100svh] w-full flex flex-col justify-end p-4 py-16 md:p-12 border-b border-parchment/10 overflow-hidden ${project.bgClass}`}
          >
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end w-full pb-8 md:pb-[10vh]">
               <div className="flex flex-col gap-6 max-w-3xl z-10 mix-blend-difference">
                 <div className="flex gap-2 flex-wrap">
                   {project.tech.map(t => (
                     <span key={t} className="px-4 py-1.5 text-xs font-mono border border-parchment/30 rounded-none text-parchment uppercase whitespace-nowrap">
                       {t}
                     </span>
                   ))}
                 </div>
                 {project.link && project.internal ? (
                   <Link href={project.link} className="text-5xl sm:text-6xl md:text-[8vw] font-heading uppercase text-parchment leading-none m-0 p-0 block hover:text-neonAccent transition-colors hover-target focus:outline-none mt-4 md:mt-0">
                     {project.title} <span className="text-2xl md:text-5xl align-top ml-2 opacity-50">→</span>
                   </Link>
                 ) : project.link ? (
                   <a href={project.link} target="_blank" rel="noreferrer" className="text-5xl sm:text-6xl md:text-[8vw] font-heading uppercase text-parchment leading-none m-0 p-0 block hover:text-neonAccent transition-colors hover-target focus:outline-none mt-4 md:mt-0">
                     {project.title} <span className="text-2xl md:text-5xl align-top ml-2 opacity-50">↗</span>
                   </a>
                 ) : (
                   <h3 className="text-5xl sm:text-6xl md:text-[8vw] font-heading uppercase text-parchment leading-none m-0 p-0 block mt-4 md:mt-0">
                     {project.title}
                   </h3>
                 )}
                 <p className="font-mono text-sm md:text-base text-parchment/80 leading-relaxed max-w-md mt-2 md:mt-0">
                   {project.desc}
                 </p>
                 {project.note && (
                   <span className="font-mono text-xs text-parchment/50 uppercase tracking-widest">
                     {project.note}
                   </span>
                 )}
               </div>
               
               <div className="font-mono text-lg md:text-2xl text-neonAccent font-bold pb-2 z-10">
                 {project.year}
               </div>
            </div>
            
            {/* Ambient project number absolute */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 text-[45vw] font-heading text-parchment opacity-[0.03] pointer-events-none select-none">
              0{i+1}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 px-4 md:px-12 py-8 bg-charcoal border-b border-parchment/10 font-mono text-sm md:text-base text-parchment/60">
        Earlier work (2023 to 2024):{" "}
        {earlierWork.map((work, i) => (
          <span key={work.title}>
            <a href={work.link} target="_blank" rel="noreferrer" className="text-parchment hover:text-neonAccent transition-colors hover-target">
              {work.title}
            </a>
            {i < earlierWork.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}
