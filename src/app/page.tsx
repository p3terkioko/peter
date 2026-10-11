import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScrolling>
        <CustomCursor />
        <main className="min-h-screen bg-charcoal w-full flex flex-col">
          <Hero />
          <About />
          <Marquee />
          <Works />
          <Experience />
          <Contact />
        </main>
      </SmoothScrolling>
    </>
  );
}
