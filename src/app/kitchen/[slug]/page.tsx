import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { recipes, getRecipeBySlug } from "@/lib/recipes";

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title.toUpperCase()} — Kitchen / Peter Kioko`,
    description: recipe.note,
  };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) notFound();

  const currentIndex = recipes.findIndex((r) => r.slug === params.slug);
  const next = recipes[(currentIndex + 1) % recipes.length];

  return (
    <>
      <SmoothScrolling>
        <CustomCursor />
        <main className="min-h-screen w-full bg-charcoal text-parchment flex flex-col px-4 md:px-12 lg:px-24 pb-32">

          <div className="fixed top-8 left-4 md:left-8 z-50">
            <Link
              href="/kitchen"
              className="font-mono text-xs md:text-sm tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
            >
              ← Kitchen
            </Link>
          </div>
          <div className="fixed top-8 right-4 md:right-8 z-50 font-mono text-xs md:text-sm tracking-widest text-neonAccent uppercase">
            {recipe.category}
          </div>

          {/* Dish hero */}
          <div className="pt-28 md:pt-36 pb-10 md:pb-14 border-b border-parchment/10">
            <h1 className="font-heading text-[14vw] md:text-[11vw] uppercase leading-none text-parchment">
              {recipe.title}
            </h1>

            {/* Metadata strip */}
            <div className="flex flex-wrap gap-6 md:gap-12 mt-6 md:mt-8">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30">Serves</span>
                <span className="font-mono text-sm md:text-base text-parchment uppercase">{recipe.serves}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30">Time</span>
                <span className="font-mono text-sm md:text-base text-parchment uppercase">{recipe.time}</span>
              </div>
            </div>
          </div>

          {/* Chef's note */}
          <div className="py-10 md:py-12 border-b border-parchment/10 max-w-2xl">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30 block mb-4">
              Note
            </span>
            <p className="font-mono text-sm md:text-base text-parchment/70 uppercase tracking-wide leading-relaxed">
              &ldquo;{recipe.note}&rdquo;
            </p>
          </div>

          {/* Two-column recipe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0">

            {/* Ingredients */}
            <div className="md:border-r border-parchment/10 md:pr-12 pt-10 md:pt-12 mb-0">
              <h2 className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30 mb-8">
                Ingredients
              </h2>
              <ul className="flex flex-col">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="font-mono text-sm md:text-base text-parchment/80 py-4 border-b border-parchment/10 uppercase tracking-wide leading-relaxed flex gap-4"
                  >
                    <span className="text-neonAccent shrink-0 select-none">—</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Method */}
            <div className="md:pl-12 pt-10 md:pt-12">
              <h2 className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30 mb-8">
                Method
              </h2>
              <ol className="flex flex-col">
                {recipe.method.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-5 md:gap-6 py-5 border-b border-parchment/10"
                  >
                    <span className="font-heading text-2xl md:text-3xl text-neonAccent shrink-0 leading-none mt-0.5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-mono text-sm md:text-base text-parchment/80 uppercase tracking-wide leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* Next recipe */}
          <div className="mt-20 md:mt-28 border-t border-parchment/10 pt-10">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/30 block mb-6">
              Next Up
            </span>
            <Link
              href={`/kitchen/${next.slug}`}
              className="group flex items-end justify-between hover-target"
            >
              <h3 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-none text-parchment/40 group-hover:text-neonAccent transition-colors duration-200">
                {next.title}
              </h3>
              <span className="font-mono text-xl text-neonAccent group-hover:translate-x-2 transition-transform duration-200 mb-1">
                →
              </span>
            </Link>
          </div>

        </main>
      </SmoothScrolling>
    </>
  );
}
