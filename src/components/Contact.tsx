"use client";

export default function Contact() {
  return (
    <section className="w-full min-h-[80vh] bg-[#FF2D00] text-charcoal flex flex-col justify-between p-4 md:p-12 relative z-10 overflow-hidden">
      <div className="flex justify-between items-start w-full">
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-80 font-bold">
          Open to New Opportunities
        </div>
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-80 font-bold">
          P. 005
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-20">
        <a 
          href="mailto:peterkioko64@gmail.com" 
          className="text-[18vw] md:text-[15vw] leading-[0.8] font-heading uppercase hover:opacity-70 transition-opacity hover-target block text-center"
        >
          LET'S TALK
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs md:text-sm tracking-widest uppercase border-t border-charcoal/20 pt-8 mt-12 w-full font-bold">
        <span>© 2026 PETER KIOKO</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="https://github.com/p3terkioko" target="_blank" rel="noreferrer" className="hover:underline hover-target">GitHub</a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="hover:underline hover-target">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
