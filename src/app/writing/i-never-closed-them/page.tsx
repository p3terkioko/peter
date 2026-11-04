import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { P, Pull, Figure } from "@/components/Article";

export const metadata: Metadata = {
  title: "I Never Closed Them | Peter Kioko",
  description:
    "Every toy I opened as a kid stayed open. How taking things apart turned into building them, and then into writing software.",
};

const BASE = "/writing/i-never-closed-them";

export default function INeverClosedThemPage() {
  return (
    <>
      <CustomCursor />
      <SmoothScrolling>
        <main className="min-h-screen bg-charcoal text-parchment pb-24">
          <div className="fixed top-6 left-4 md:top-8 md:left-8 z-50">
            <Link
              href="/"
              className="font-mono text-xs tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
            >
              ← Return
            </Link>
          </div>
          <div className="fixed top-6 right-4 md:top-8 md:right-8 z-50 font-mono text-xs tracking-widest text-parchment/40 uppercase">
            2026
          </div>

          <header className="px-4 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 border-b border-parchment/10">
            <h1 className="font-heading text-[17vw] md:text-[10vw] uppercase leading-[0.92] text-neonAccent">
              I Never Closed Them
            </h1>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mt-6">
              Peter Kioko · 4 November 2026
            </p>
          </header>

          <article className="px-4 md:px-12 pt-12 md:pt-16 max-w-5xl">
            <P>
              Every remote control car I owned as a kid went the same way: screws out, wheels off, and me trying
              to work out what made it move. The toys that lit up went next, then the ones that made noise, then
              anything you wound up or fed batteries. I wanted to see what was inside, and once I had seen it, I
              moved on to the next one. I never closed a single one.
            </P>
            <P>
              Home noticed, and the verdict came down: stop opening things. So I found a loophole. From then on,
              I would only open things that were already broken, because a broken thing can’t get more broken,
              and nobody loses. That was my logic as a kid.
            </P>
            <P>
              Then, in class 6, I joined the STEM club, and for the first time someone handed me things I was
              SUPPOSED to put together. We had tablets for coding games, and an electronics kit full of snap-on
              circuit pieces that clicked onto a plastic board small enough to hold in one hand.
            </P>
            <P>
              The first thing I built with that kit was an FM radio. I snapped the pieces into place, switched it
              on, and a radio station came out of a pile of plastic and wire. I carried it home and showed my
              family, and they were impressed. The same people who had told me to stop opening things were now
              listening to a radio I had built myself.
            </P>
            <P>
              The broken-things rule never retired, and much later it found its best material yet: my own
              devices. First came a Toshiba AT7-B tablet, broken, of course. I expected the inside to be packed
              edge to edge with electronics. Instead, the parts doing the real work were much smaller than I’d
              imagined. Most of a tablet, it turns out, is battery and case.
            </P>

            <P>
              After the Toshiba came a Tecno 7Cs, just as broken. Then my phone, also broken: a Tecno Phantom 6.
              That phone deserves its respect. It had a USB-C port and an aluminium build way before Tecno became
              a banter brand, and I got to see that ahead-of-its-time phone from the inside.
            </P>

            <Figure
              base={BASE}
              narrow
              kind="Opened"
              items={[
                {
                  file: "tablet-opened",
                  w: 1200,
                  h: 2131,
                  alt: "The inside of the Tecno 7Cs tablet with the screen removed: a black circuit board with metal shields across the top third, and a large 3000 mAh battery filling most of the rest of the case.",
                },
              ]}
              caption="The Tecno 7Cs. The board gets the top third, and the battery gets nearly all the rest."
            />
            <P>
              Somewhere in all of this, I found Linus Tech Tips, and it became a daily habit. The PC builds hooked
              me: a table covered in boxes at the start of the video, each part unboxed and slotted in, and a
              working computer by the end. I’ve watched more of those builds than I can count. Building my own
              is next on the list.
            </P>
            <P>
              Then COVID sent everyone home, and my laptop couldn’t keep up. For once, I didn’t have to wait for
              something to break before I could open it. I had years of Linus videos in my
              head. I opened my own laptop, put in the new RAM, closed it up, and pressed the power button.
            </P>

            <Pull>It worked on the first try.</Pull>

            <P>
              Every toy I opened as a kid stayed open. This was the first thing I opened, changed, and CLOSED,
              and it came back better than before.
            </P>
            <P>
              COVID was also when I started wanting an Arduino. Other things came first, so the wish waited. In
              2022, after high school and before uni, my family bought me one. Yes, the same family that once
              told me to stop opening things. What changed? I was older.
            </P>
            <P>
              My first project on it was a temperature and humidity sensor, and I put it up at home, reading the
              air. I’d gone from taking things apart to see how they worked to putting things together to make
              them work.
            </P>
            <P>
              That board is what pulled me into code. In 2023 I started programming properly, mostly because of
              that Arduino: I wanted my boards to do more, and I wanted to build my own tools.
              Today I write software for a living, and the itch never left.
            </P>
            <P>
              These days it looks like this. I flashed a TP-Link Archer C6 to OpenWrt with Claude Code, so every
              device in the house gets ad blocking. To go with it, I’m building a small screen on my TTGO
              T-Display, an ESP32 board, that’ll show ads blocked, devices connected, traffic, and how much of
              the data bundle is left.
            </P>

            <Figure
              base={BASE}
              narrow
              kind="On the desk"
              items={[
                {
                  file: "boards",
                  w: 1200,
                  h: 2131,
                  alt: "Two blue Arduino Uno boards stacked on a wooden desk, with a smaller black TTGO T-Display ESP32 board and its blank screen below them.",
                },
              ]}
              caption="Two Arduino Unos, and the TTGO T-Display that will become the router screen."
            />

            <P>
              Then there is the car, a Toyota Auris with an aftermarket Android head unit. I’ve been debloating
              the head unit over ADB, again with Claude Code. GPS is next. The original factory GPS antenna is
              still in the car, loose in the footwell, waiting for its turn.
            </P>
            <P>
              The tools changed. The screwdriver became a laptop, a terminal, and an AI that can talk to a router.
              The feeling stayed exactly the same. Hardware is still the fun part.
            </P>
            <P>
              The kid who opened everything and closed nothing grew up and learned to close things. The itch, I
              left open.
            </P>
          </article>

          <section className="px-4 md:px-12 pt-12 md:pt-20 mt-16 border-t border-parchment/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/25 mb-2 md:mb-3">
                  The head unit, in full
                </p>
                <Link
                  href="/projects/auris-head-unit"
                  className="font-heading text-4xl md:text-6xl uppercase text-parchment hover:text-neonAccent transition-colors hover-target"
                >
                  Hotwiring My Dashboard ↗
                </Link>
              </div>
              <p className="font-mono text-[9px] tracking-widest uppercase text-parchment/20">
                Peter Kioko, 2026
              </p>
            </div>
          </section>
        </main>
      </SmoothScrolling>
    </>
  );
}
