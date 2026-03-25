import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function Uses() {
  const hardware = [
    { name: "HP Envy Core i7", desc: "Primary engineering machine for all daily web development and AI workloads." },
  ];

  const system = [
    { name: "WSL Ubuntu", desc: "Windows Subsystem for Linux providing a native, high-performance UNIX development environment." },
  ];

  const software = [
    { name: "VS Code", desc: "Primary IDE. Highly customized for speed and efficiency." },
    { name: "Claude Code", desc: "Next-generation AI-assisted development workflow." },
    { name: "Google Chrome", desc: "Browser of choice for all frontend development, device testing, and debugging." },
    { name: "Git & GitHub", desc: "Version control, code management, and open-source collaboration." },
  ];

  return (
    <>
      <SmoothScrolling>
        <CustomCursor />
        <main className="min-h-screen w-full bg-charcoal text-parchment flex flex-col pt-32 px-4 md:px-12 lg:px-24">
          <div className="absolute top-8 left-4 md:left-8 z-50">
            <Link href="/" className="font-mono text-xs md:text-sm tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase">
              ← Return
            </Link>
          </div>
          <div className="absolute top-8 right-4 md:right-8 z-50 font-mono text-xs md:text-sm tracking-widest text-parchment/60 uppercase">
            P. 005
          </div>

          <h1 className="text-6xl md:text-9xl font-heading uppercase leading-none mb-16 md:mb-24 text-neonAccent">
            Uses
          </h1>

          <div className="flex flex-col gap-16 md:gap-24 pb-32 max-w-7xl">
            
            <section className="flex flex-col md:flex-row border-t border-parchment/20 pt-8">
              <h2 className="w-full md:w-1/3 text-3xl md:text-4xl font-heading uppercase text-parchment/80 mb-8 md:mb-0">
                Hardware
              </h2>
              <div className="w-full md:w-2/3 flex flex-col gap-8 md:border-l border-parchment/20 md:pl-8">
                {hardware.map((item, i) => (
                  <div key={i} className="flex flex-col group">
                    <h3 className="font-mono text-lg md:text-xl text-parchment group-hover:text-neonAccent transition-colors tracking-wider uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="font-mono text-sm md:text-base text-parchment/60 uppercase tracking-wide leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col md:flex-row border-t border-parchment/20 pt-8">
              <h2 className="w-full md:w-1/3 text-3xl md:text-4xl font-heading uppercase text-parchment/80 mb-8 md:mb-0">
                System
              </h2>
              <div className="w-full md:w-2/3 flex flex-col gap-8 md:border-l border-parchment/20 md:pl-8">
                {system.map((item, i) => (
                  <div key={i} className="flex flex-col group">
                    <h3 className="font-mono text-lg md:text-xl text-parchment group-hover:text-neonAccent transition-colors tracking-wider uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="font-mono text-sm md:text-base text-parchment/60 uppercase tracking-wide leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col md:flex-row border-t border-parchment/20 pt-8">
              <h2 className="w-full md:w-1/3 text-3xl md:text-4xl font-heading uppercase text-parchment/80 mb-8 md:mb-0">
                Software
              </h2>
              <div className="w-full md:w-2/3 flex flex-col gap-8 md:border-l border-parchment/20 md:pl-8">
                {software.map((item, i) => (
                  <div key={i} className="flex flex-col group">
                    <h3 className="font-mono text-lg md:text-xl text-parchment group-hover:text-neonAccent transition-colors tracking-wider uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="font-mono text-sm md:text-base text-parchment/60 uppercase tracking-wide leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </SmoothScrolling>
    </>
  );
}
