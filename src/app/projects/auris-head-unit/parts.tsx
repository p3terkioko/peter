import Image from "next/image";

const BASE = "/projects/auris-head-unit";

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-4xl md:text-6xl uppercase leading-none text-parchment mt-20 md:mt-28 mb-8 md:mb-10">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-neonAccent mt-12 mb-4">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[15px] md:text-base leading-[1.9] text-parchment/75 max-w-2xl mb-6">
      {children}
    </p>
  );
}

export function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-neonAccent pl-5 md:pl-8 my-12 md:my-16 max-w-3xl">
      <p className="font-heading text-3xl md:text-5xl uppercase leading-[1.05] text-parchment">
        {children}
      </p>
    </blockquote>
  );
}

type Item = {
  file: string;
  alt: string;
  w: number;
  h: number;
  tag?: string;
};

/**
 * `kind` says what the reader is looking at ("Design", "On the car", ...),
 * since design renders are 2x and unit screenshots are 1x.
 */
export function Figure({
  items,
  kind,
  caption,
  cols = 1,
  priority = false,
}: {
  items: Item[];
  kind: string;
  caption: React.ReactNode;
  cols?: 1 | 2;
  priority?: boolean;
}) {
  return (
    <figure className="my-12 md:my-14">
      <div className={`grid gap-3 md:gap-4 ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {items.map((it) => (
          <div key={it.file}>
            {it.tag && (
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30 mb-2">
                {it.tag}
              </p>
            )}
            <div className="border border-parchment/10 overflow-hidden bg-[#0a0a0a]">
              <Image
                src={`${BASE}/${it.file}.webp`}
                alt={it.alt}
                width={it.w}
                height={it.h}
                sizes={cols === 2 ? "(min-width: 1024px) 480px, 100vw" : "(min-width: 1024px) 1000px, 100vw"}
                className="w-full h-auto"
                priority={priority}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-[11px] md:text-xs leading-relaxed text-parchment/50 mt-3 max-w-3xl">
        <span className="text-neonAccent uppercase tracking-widest mr-2">{kind}:</span>
        {caption}
      </figcaption>
    </figure>
  );
}
