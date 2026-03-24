"use client";

const projects = [
  {
    title: "MAWINGUOPS",
    tech: ["Cloud Native", "AgriTech", "Data Analytics"],
    desc: "Cloud native application delivering planting advisory based on climatic conditions for small-holder maize farmers in Machakos.",
    year: "2025",
    color: "#050505",
    link: "https://github.com/p3terkioko/MawinguOps"
  },
  {
    title: "FITCHECK AI",
    tech: ["Python", "FastAPI", "pgvector", "NLP"],
    desc: "AI-powered fitness misinformation detection. End-to-end vector search using pgvector and sentence-transformers.",
    year: "2025",
    color: "#0a0a0a",
    link: "https://github.com/RyanSmoak/FitCheck"
  },
  {
    title: "EDUSPHERE",
    tech: ["PHP", "Tailwind", "JavaScript", "MySQL"],
    desc: "Full-featured web-based educational platform with course delivery and content management.",
    year: "2024",
    color: "#0f0f0f",
    link: null
  },
  {
    title: "ALGOPESA",
    tech: ["Solidity", "Ethereum", "M-Pesa API"],
    desc: "Smart contract platform enabling reliable M-Pesa to crypto transactions in East Africa.",
    year: "2024",
    color: "#060606",
    link: "https://github.com/danielobima/AlgoPesa"
  },
  {
    title: "CRYPTO TRACKER",
    tech: ["JavaScript", "REST APIs", "CoinGecko", "CSS"],
    desc: "Real-time cryptocurrency data application demonstrating agile UI rendering and API usage.",
    year: "2023",
    color: "#080808",
    link: "https://github.com/p3terkioko/crypto-tracker"
  },
  {
    title: "WEATHER APP",
    tech: ["JavaScript", "REST APIs", "CSS", "HTML"],
    desc: "Real-time local weather tracking application implementing dynamic user interfaces.",
    year: "2023",
    color: "#090909",
    link: "https://github.com/p3terkioko/weather2"
  }
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
            className="relative md:sticky md:top-0 min-h-[70svh] md:h-[100svh] w-full flex flex-col justify-end p-4 py-16 md:p-12 border-b border-parchment/10 overflow-hidden"
            style={{
              backgroundColor: project.color,
            }}
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
                 {project.link ? (
                   <a href={project.link} target="_blank" rel="noreferrer" className="text-[10vw] md:text-[8vw] font-heading uppercase text-parchment leading-none m-0 p-0 block hover:text-neonAccent transition-colors hover-target focus:outline-none">
                     {project.title} <span className="text-3xl md:text-5xl align-top ml-2 opacity-50">↗</span>
                   </a>
                 ) : (
                   <h3 className="text-[10vw] md:text-[8vw] font-heading uppercase text-parchment leading-none m-0 p-0 block">
                     {project.title}
                   </h3>
                 )}
                 <p className="font-mono text-sm md:text-base text-parchment/80 leading-relaxed max-w-md mt-2 md:mt-0">
                   {project.desc}
                 </p>
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
    </section>
  );
}
