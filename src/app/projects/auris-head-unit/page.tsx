import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { H2, H3, P, Pull, Figure } from "./parts";

export const metadata: Metadata = {
  title: "Hotwiring My Dashboard | Peter Kioko",
  description:
    "How I reverse-engineered a budget Android head unit and gave my Toyota Auris an interface I actually want to use.",
};

const SPEC: [string, string][] = [
  ["Car", "Toyota Auris"],
  ["Unit", "XY Auto F9212A (aftermarket Android head unit)"],
  ["Chip", "Autochips AC8227L, quad-core (MediaTek family)"],
  ["Memory", "1 GB RAM"],
  ["Android", "8.1 (the unit claims 9.1)"],
  ["Screen", "1024×600 at 160 dpi"],
  ["Timeline", "3 days, 20 to 22 October 2026"],
  ["Role", "Design, engineering, in-car testing, with Claude"],
  ["Tools", "Claude Code, ADB, jadx, Android command-line build tools"],
];

export default function AurisHeadUnitPage() {
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

          {/* Hero */}
          <header className="px-4 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 border-b border-parchment/10">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-parchment/30 mb-4 md:mb-6">
              Reverse engineering, Android, Interface design
            </p>
            <h1 className="font-heading text-[17vw] md:text-[10vw] uppercase leading-[0.92] text-neonAccent">
              Hotwiring My Dashboard
            </h1>
            <p className="font-mono text-sm md:text-lg text-parchment/70 leading-relaxed mt-6 md:mt-8 max-w-3xl">
              How I reverse-engineered a budget Android head unit and gave my Toyota Auris an interface I
              actually want to use.
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mt-6">
              Peter Kioko · 20 to 22 October 2026
            </p>
          </header>

          <article className="px-4 md:px-12 pt-12 md:pt-16 max-w-5xl">
            <Figure
              priority
              kind="On the car"
              items={[
                {
                  file: "night-headlights",
                  w: 1024,
                  h: 600,
                  alt: "The finished night theme on the car's 1024 by 600 screen: a large 4:55 clock, Maps and Android Auto tiles on the left, and a music card playing Hamba Juba on the right, above a bottom bar with navigation icons and a live track strip.",
                }
              ]}
              caption="The finished interface in its night theme, which the headlight wire switches on. The music card and the bottom bar show the same track, played from my phone over Bluetooth."
            />

            <P>
              The home screen on my Toyota Auris was a glass carousel. A dark chrome ring with an album cover
              on one side and an analogue clock on the other, a little car silhouette parked in the middle
              against a purple skyline. Radio, Bluetooth and Settings sat in a row of icons underneath. It did the
              job, and it had been doing it that way for as long as anyone had used the car.
            </P>
            <P>
              It also came with an Android Auto app called Headunit Reloaded, which had never connected. Not
              over USB, not over Bluetooth, not over a hotspot. Nobody had fixed it, because it had always
              been that way. I decided to find out why.
            </P>
            <P>Three days later, the carousel was gone, and the screen was something I’d built.</P>
            <P>
              The radio, Bluetooth music and phone were mine. The screen switched between a night and a day
              theme on its own, and Android Auto started the moment my phone connected. This is how that
              happened: the digging, the dead ends, the fixes, and the parts I’m still improving. Every change
              was reversible, so I could be bold.
            </P>

            {/* Spec box */}
            <dl className="border border-parchment/15 my-12 md:my-14 max-w-3xl grid grid-cols-1 sm:grid-cols-[9rem_1fr]">
              {SPEC.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-mono text-[10px] tracking-[0.25em] uppercase text-parchment/35 px-4 pt-3 sm:py-3 sm:border-b border-parchment/10">
                    {k}
                  </dt>
                  <dd className="font-mono text-xs md:text-sm text-parchment/80 px-4 pb-3 sm:py-3 border-b border-parchment/10 leading-relaxed">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <H2>The box behind the dash</H2>
            <P>
              The unit is an aftermarket XY Auto F9212A, fitted to replace the car’s older Japanese-market head
              unit. Inside sits an Autochips AC8227L (a quad-core chip from the MediaTek family) and 1 GB of
              RAM. It runs Android 8.1 while telling anyone who asks that it’s 9.1. The screen is 1024×600 at
              160 dpi, the Wi-Fi is 2.4 GHz only, and no steering-wheel buttons are connected to anything.
            </P>
            <P>
              The stock software is dark chrome, bevelled dialpad keys and a carousel. It’s functional, and it
              left a lot of room to make the car feel better to use.
            </P>

            <Figure
              cols={2}
              kind="On the car"
              items={[
                {
                  tag: "Before: the vendor’s home screen",
                  file: "before-home",
                  w: 1024,
                  h: 600,
                  alt: "The stock XY Auto home screen: a chrome ring holding album art and an analogue clock around a small car silhouette on a purple skyline, with Navi, Radio, BT, Apps, Music and Setting icons along the bottom.",
                },
                {
                  tag: "After: the same screen, my interface",
                  file: "after-home",
                  w: 1024,
                  h: 600,
                  alt: "The new home screen in the day theme: a large 4:24 clock, two tiles for Google Maps and Android Auto, and a radio card showing 105.2 FM with a play button, above a slim bottom navigation bar.",
                },
              ]}
              caption="Same screen, same 1024×600 pixels, nothing added to the hardware. Both are real screenshots from the unit."
            />

            <P>
              The goal was easy to say out loud. Replace the home screen, radio, Bluetooth music and phone with
              my own apps. Keep the vendor’s apps installed as a fallback. Make it smooth on 1 GB of RAM, using
              as little of it as possible.
            </P>
            <P>
              I didn’t do it alone. Claude, Anthropic’s AI, ran in Claude Code on my laptop and talked to the
              unit over ADB (Android’s debugging bridge) across Wi-Fi. I made the decisions and did everything
              that needed a body in a car. More on that split later.
            </P>
            <P>
              Day one was a clean-up. I went through the preinstalled apps and picked 17 to remove, YouTube
              among them. YouTube alone was holding about 98 MB of RAM. A few other apps had their background
              activity restricted, and the animation timings were halved.
            </P>
            <P>
              A restore script can put every one of those changes back. That turned out to matter.
            </P>

            <H2>Picking the lock</H2>
            <P>
              To replace a car’s software, you first have to find out what it’s quietly doing. Claude
              decompiled the vendor’s apps and system code (turning compiled programs back into something
              readable) and went looking for hooks. It found four I needed.
            </P>
            <P>
              The first is what the notes call the media killer. A vendor patch force-closes every other media
              app the moment one starts playing, which would have shut down any radio app I wrote. There’s an
              escape hatch: five hidden settings slots, <span className="text-parchment">xy_ext_audiofilter0</span> to{" "}
              <span className="text-parchment">4</span>, list apps that are exempt. They’re only read at boot,
              so I planned around that.
            </P>
            <P>
              The other three were smaller but just as useful. The default home screen is a single vendor
              setting. The vendor reopens the last radio or music app after start-up, controlled by another.
              And the wire from the headlights shows up as a system setting called Headlamp, 0 or 1, which
              means my interface can tell when it’s dark.
            </P>
            <P>
              Then came two discoveries that decided how the whole project would work.
            </P>
            <P>
              First, the system partition (the part of the storage that holds Android itself) is
              write-protected in hardware. Writes appear to succeed, then vanish after a reboot. So nothing I
              built could be installed as a true system app.
            </P>
            <P>
              Second, the firmware is signed with Android’s public test key. The one from the open-source
              project that anyone can download. An app signed with the same key gets system-level permissions
              even though it lives in ordinary app storage.
            </P>
            <P>
              That’s the trick the whole project rests on. It also means any sideloaded app signed with that
              key could do the same, which is worth knowing if you ever plug a stranger’s software into a car
              like this.
            </P>

            <Figure
              kind="Prototype"
              items={[
                {
                  file: "prototype-radio",
                  w: 1024,
                  h: 600,
                  alt: "A plain dark screen showing the frequency 93.3 in large type above two rows of flat buttons: Seek back, minus 0.1, plus 0.1, Seek forward, Scan and Off, then three preset slots and three Hold to save buttons, with 93.3 highlighted in blue.",
                },
              ]}
              caption="The throwaway radio, built before any design work. It looks like it was made in a hurry, because it was. Its only job was to prove that my own code could drive the hardware."
            />

            <P>
              Before designing anything, I wanted proof. So: a throwaway radio app. The vendor’s native
              libraries (the compiled code that talks to the FM chip, an MT6627) had to be bundled into my app.
              The tuner’s audio had to be routed to the line output by hand. And the chip mutes itself after
              every tune, so the app has to unmute it each time.
            </P>
            <P>
              It worked. A first scan found 32 stations, and RDS (the little text some stations broadcast
              alongside their audio) put the name “Classic” on 105.2 MHz.
            </P>

            <H2>Designing for arm’s length</H2>
            <P>
              A car screen is read at arm’s length by someone who should mostly be looking at the road. So the
              design is restrained: big, light-weight type (Geist), and touch targets large enough to hit
              without aiming. No small all-caps labels, which are the usual way an interface looks organised
              while being hard to read.
            </P>
            <P>
              The screen is never without context. A live bottom bar (I call it the capsule) always shows
              what’s playing, with controls and a volume stepper. Open the phone screen and the radio’s still
              there, one tap from pausing.
            </P>

            <Figure
              cols={2}
              kind="Design"
              items={[
                {
                  tag: "Night theme",
                  file: "design-home-night",
                  w: 1600,
                  h: 938,
                  alt: "Design render of the night home screen: a large 11:48 clock, Google Maps and Android Auto tiles, and a radio card showing Classic, FM 105.2, with four preset buttons and playback controls.",
                },
                {
                  tag: "Day theme",
                  file: "design-home-day",
                  w: 1600,
                  h: 938,
                  alt: "The same home screen design in the light theme: pale grey background, black text and a green highlight on the active preset.",
                },
              ]}
              caption="Renders from the design canvas, exported at 2× (the screenshots from the car are 1×). The headlights decide which of the two you get."
            />

            <Figure
              kind="Design"
              items={[
                {
                  file: "capsule-radio",
                  w: 1600,
                  h: 150,
                  alt: "The bottom bar while the radio plays: six navigation icons on the left, then 105.2 with the station name Classic between previous and next arrows, a pause button, and a volume stepper showing 18.",
                },
                {
                  file: "capsule-reconnecting",
                  w: 1600,
                  h: 325,
                  alt: "Two further bottom-bar states stacked: a radio on 99.1 labelled No signal, and the music tab selected with the text Reconnecting and a dimmed pause button.",
                },
              ]}
              caption="The capsule. Its states are the design: playing, no signal, reconnecting. Each one says what is happening in a few words instead of leaving the bar blank."
            />

            <P>
              The part I enjoyed most was the failures. Claude wrote down about 100 edge cases, from first run
              to a second caller ringing mid-call, and boiled them down to 10 error-handling rules. Say what to
              do, not an error code. Never auto-play anything. Always offer a way back to the original apps. No
              pop-up dialogs while driving.
            </P>
            <P>
              Errors appear inline, in the place you were already looking.
            </P>

            <Figure
              cols={2}
              kind="Design"
              items={[
                {
                  file: "state-radio-failed",
                  w: 1600,
                  h: 938,
                  alt: "Radio screen with the heading Couldn’t start the radio, a note that the original radio may be using the tuner, and buttons reading Retrying 2 of 3, Use the original radio and Scan.",
                },
                {
                  file: "state-media-reconnecting",
                  w: 1600,
                  h: 938,
                  alt: "Media screen with a Reconnecting to your phone pill above a dimmed track title, and the line Music carries on when the phone is back.",
                },
                {
                  file: "state-contacts-loading",
                  w: 1600,
                  h: 938,
                  alt: "Phone screen with the message Getting contacts from your phone and a progress bar reading 420 of 840, next to a dialpad.",
                },
                {
                  file: "state-simple-mode",
                  w: 1600,
                  h: 938,
                  alt: "A nearly empty home screen with only a clock and the date, and a pill at the bottom reading Home restarted in simple mode with a button to use the original home screen.",
                },
              ]}
              caption="Four of the designed states: the radio failing to start, the phone dropping out, contacts arriving, and the simple mode the home screen falls back to after crashes. The 420 of 840 is a mock-up figure."
            />

            <H2>Building it small</H2>
            <P>
              There’s no Android Studio in this story. No Gradle either. Claude compiled the apps with the raw
              Android command-line tools, and the whole interface is built in code, with no XML layout files.
            </P>
            <P>
              The finished app is about 271 KB. With music playing it used 20.8 MB of memory, on a unit where
              YouTube alone had been holding about 98 MB. Across testing it crashed zero times.
            </P>
            <P>
              That last number comes with a safety net, because zero is only a claim about the past. Three
              crashes in two minutes drop the home screen into a plain safe mode. A crash in safe mode hands
              control back to the vendor’s home screen. The car is never left without a screen.
            </P>
            <P>
              The headlights choose the theme. Lights on, night. Lights off, day. A flicker shorter than two
              seconds is ignored, so it doesn’t strobe the display, and if the signal goes missing the
              interface falls back to the clock. I tested both directions in the car.
            </P>
            <P>
              One rule is mine, and it shaped the whole phone screen. Different people drive this car, and the
              same person can be saved under different names on different phones. So contacts and recent calls
              load when a phone connects and are wiped when it disconnects. Never stored.
            </P>
            <P>
              383 contacts and 300 calls arrive in a few seconds.
            </P>
            <P>
              The honest footnote: the vendor’s own contacts store ignores delete requests. Our screens clear
              at once, but the data sits underneath until someone clears it by hand. I wiped it once with
              sqlite3 as root. An automatic wipe is still open.
            </P>

            <H2>The first drive</H2>
            <P>
              A design on a laptop is only a promise. The real test was on day two, from the driver’s
              seat, with a laptop that overheated in the heat of the car.
            </P>
            <P>
              After a reboot, our home screen came up and the radio carried on. There was sound, and a scan
              found 9 stations.
            </P>
            <P>
              Then came the first useful find: the screen said “No signal” on stations I could plainly hear.
            </P>
            <P>
              The thresholds had been estimates. Claude recalibrated them from real readings, and stations that
              sounded fine were arriving between −90 and −103.
            </P>
            <P>
              Long song titles ran off the edge of the screen. That’s the kind of bug that never shows up when
              your design uses placeholder text.
            </P>

            <Figure
              cols={2}
              kind="On the car"
              items={[
                {
                  tag: "Before the fix",
                  file: "media-overflow",
                  w: 1024,
                  h: 600,
                  alt: "The media screen with a very long title, Sekwanele (feat. Da Lee LS), running to both edges of the screen running to the screen’s edges, with the artists line also touching the left edge.",
                },
                {
                  tag: "After the fix",
                  file: "media-fixed",
                  w: 1024,
                  h: 600,
                  alt: "The same track on the media screen, with the title shortened with an ellipsis to Sekwanele (feat. Da Lee…) and centred with comfortable margins.",
                },
              ]}
              caption="The same song, a few minutes apart. The fix truncates the title with an ellipsis and keeps it inside the margins."
            />

            <H3>The call-screen fight</H3>
            <P>
              The most satisfying bug was a turf war. On every call, the vendor’s own call screen jumped in front of ours.
              Our screen needed to stay in front, and fast.
            </P>

            <Pull>…reclaim in 0.00000000000001 seconds.</Pull>

            <P>
              Physics declined, but the fix got close. Our app now watches for the vendor screen and takes the
              front back immediately, with checks at 0, 120 and 400 milliseconds. If Android has recreated our
              app in the meantime, it rebuilds straight onto the call screen.
            </P>

            <H3>The 11 GB surprise</H3>
            <P>
              The unit’s storage turned out to be 96% full. The cause was 11 GB of Chrome usage-report files.
              With my say-so they were deleted, and usage dropped to 7%.
            </P>
            <P>
              Smaller things landed the same day. The light theme got firmer card borders and shadows after I
              said, in so many words, that we needed borders between the cards in light mode. And the GPS
              antenna, a leftover from the old Japanese unit, was swapped for another. GPS now works.
            </P>

            <H2>Ignition on</H2>
            <P>
              I wanted something creative when the ignition comes on, using the Toyota emblem and the AURIS
              wordmark, and I supplied the logo files. Claude built a handful of concepts: a tuning-dial sweep,
              headlight beams, a hand-off where the animation melts into the bottom bar.
            </P>
            <P>
              I passed on all of them and chose the emblem and wordmark.
            </P>

            <Figure
              kind="Design"
              items={[
                {
                  file: "boot-concept-wordmark",
                  w: 1600,
                  h: 938,
                  alt: "A black screen with the word carui in thin, widely spaced lowercase letters and a short green line beneath it.",
                },
              ]}
              caption="One of the rejected boot concepts, a plain wordmark set in the interface’s own type, with carui being the app’s package name. The tuning-dial and hand-off concepts are animations that read as nearly black as stills, so I have left them out."
            />

            <P>
              The shipped version is simpler. The emblem fades up out of black, then the wordmark appears. 100
              frames at 20 fps, at the screen’s native 1024×600.
            </P>
            <P>
              Getting it on screen was its own puzzle, because the write-protected system partition is where
              boot animations normally live. A hidden MediaTek setting makes the unit load a custom animation
              from normal storage instead, and that’s where mine sits.
            </P>

            <Figure
              kind="Boot animation"
              items={[
                {
                  file: "boot-frames",
                  w: 1031,
                  h: 608,
                  alt: "A three by three grid of frames from the boot animation. The grey Toyota emblem fades from almost invisible to full brightness, then the word AURIS appears beneath it in the later frames.",
                },
              ]}
              caption="A frame strip of the shipped animation, read left to right and top to bottom. A bright horizontal flare crosses the emblem in the second frame before it fades fully up."
            />

            <P>
              One piece is still missing: an even earlier logo, shown before this animation starts. It lives in
              a partition format I haven’t decoded yet.
            </P>

            <H2>The cable that wouldn’t listen</H2>
            <P>
              Android Auto took longer than everything else put together. And it didn’t end where I expected.
            </P>

            <H3>Act one: the port</H3>
            <P>
              Headunit Reloaded never connected over USB, and live logs showed why. The phone switches into
              Android Auto mode, then has to reconnect to the unit’s USB port, and the port fails every time
              with a low-level error: <span className="text-parchment">error -71</span>, “device not accepting
              address”. Nearly 300 of them in about three minutes.
            </P>
            <P>
              I swapped cables. I swapped apps. I switched off the CarPlay service. Same failure.
            </P>
            <P>
              The conclusion was clear, and worth the effort to reach: a hardware problem in the port or the lead, which no
              amount of software could fix.
            </P>

            <H3>Act two: a server by hand</H3>
            <P>
              Open Headunit is an open-source alternative by André Rinas, installed from its official GitHub.
              It worked, wirelessly, through a developer feature that lets the phone act as an Android Auto
              head unit server. The catch was that I had to start that server on my phone by hand. every time.
            </P>

            <H3>Act three: the lag</H3>
            <P>
              It also ran at about 13 frames per second. The cause was a rendering mode. Android has two ways
              of drawing video to a screen, and the one in use, TextureView, was showing only 13 of 46 decoded
              frames.
            </P>
            <P>
              Switching to SurfaceView, and dropping the resolution it had negotiated from 1280×720 to
              800×480, gave a steady 30 fps. My review was short: “It’s much smoother now.”
            </P>

            <H3>Act four: no server at all</H3>
            <P>
              I asked for it to work over Bluetooth, without me having to start a server and all that weird
              stuff. Open Headunit has a Native Mode, which speaks Android Auto’s real wireless handshake, the
              way factory cars do. Bluetooth does the introduction (“I support Android Auto, here’s my private
              Wi-Fi”), and Wi-Fi Direct, a phone-to-device link that needs no router, carries the video,
              because Bluetooth is far too slow to stream a screen.
            </P>
            <P>
              The first attempt failed, but the logs showed why it proved nothing: the phone wasn’t even
              connected over Bluetooth at the time.
            </P>
            <P>
              The real fix was to unpair and re-pair the phone while Native Mode was listening. A phone only
              learns what services a car offers when it pairs. Once it knew, Android Auto started by itself on
              connect. The first Wi-Fi join failed, and the automatic retry worked.
            </P>

            <Figure
              cols={2}
              kind="On the car"
              items={[
                {
                  file: "aa-open-headunit",
                  w: 1024,
                  h: 600,
                  alt: "Open Headunit’s own start screen on a blue background, with four large tiles labelled Self Mode, USB, WiFi and Settings, and a small Exit button in the corner.",
                },
                {
                  file: "aa-home-tile",
                  w: 1024,
                  h: 600,
                  alt: "The home screen in the day theme with the Android Auto tile’s caption now reading Wireless, beside a radio card showing 93.3 with a play button.",
                },
              ]}
              caption="Left, Open Headunit’s own launcher, the screen I used while it was still manual. Right, my home screen, where the Android Auto tile’s caption has changed from naming Headunit Reloaded to “Wireless”."
            />

            <P>
              One tidy detail, from the plan rather than from me: Open Headunit has a setting that tries every
              paired phone. Other people’s phones are paired to this car, so Claude’s plan turned it off and
              restricted the wake-up to mine.
            </P>
            <P>
              It’s working, and there’s room to make it better. Native Mode runs at 13 to 20 fps, with audio gaps of up to
              1.5 seconds. My brief was that…
            </P>

            <Pull>It needs to be smooth like it’s running flagship chips.</Pull>

            <P>
              It isn’t there yet, and the reason is concrete. The unit has a single 2.4 GHz radio, and during testing it was split between the laptop
              link we used for debugging and the Android Auto group. Switching channels starved the stream, and
              disconnecting the laptop by hand made it worse, because a disconnected unit keeps scanning.
            </P>
            <P>
              Next I’m testing with no laptop at all. After that, I’ll try the unit’s other USB lead or a small USB 2.0
              hub for a wired connection. If that falls short, a wireless Android Auto dongle on 5 GHz.
            </P>

            <H2>Working with Claude</H2>
            <P>
              It would be easy to tell this as “the AI did it”. It would be just as easy to leave the AI out.
              Neither is true, so here’s the split.
            </P>
            <P>
              I owned the goal, the taste and the decisions. Which apps went. The contacts privacy rule. The
              boot design, and the Toyota and Auris logo files. The design feedback, like the borders in light
              mode.
            </P>
            <P>
              I also did all the physical work: every test from the driver’s seat, plugging phones in, pairing
              and unpairing them, swapping the GPS antenna, and sitting in a hot car with a laptop that was
              slowly cooking.
            </P>
            <P>
              Claude, running in Claude Code on my laptop with ADB over Wi-Fi to the unit, did the rest of the
              heavy lifting. It reverse-engineered the vendor software by decompiling the apps and reading
              system code. It designed the interface on a design canvas: 51 boards across night and day themes,
              with about 100 edge cases. It wrote the Android apps, built the boot animation, and debugged live
              from the unit’s logs.
            </P>
            <P>
              It also asked before anything risky, and kept the restore script current so everything stayed
              reversible. The 11 GB deletion waited for my approval. Vendor apps were never removed.
            </P>
            <P>
              What it couldn’t do is sit in the car. A “No signal” label on a station I could hear is the kind
              of bug that only shows up from the driver’s seat.
            </P>

            <H2>What’s next</H2>
            <P>What I’m working on next:</P>
            <ul className="font-mono text-[15px] md:text-base leading-[1.9] text-parchment/75 max-w-2xl mb-8 list-none">
              {[
                "An incoming-call test, from someone else calling me.",
                "Automatic contact wiping, since the vendor’s store ignores deletes.",
                "Volume, compared with the car’s own volume controller.",
                "An early power-on logo, before the boot animation.",
                "Android Auto smoothness, as above.",
                "A phone companion app to send album art to the car, because Android 8.1’s Bluetooth can’t receive cover art.",
              ].map((t) => (
                <li key={t} className="flex gap-4 py-2 border-b border-parchment/10">
                  <span className="text-neonAccent shrink-0 select-none">—</span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="border border-parchment/10 my-12 md:my-14 grid grid-cols-2 md:grid-cols-4 max-w-3xl">
              {[
                ["20.8 MB", "memory in use, zero crashes"],
                ["~271 KB", "size of the app"],
                ["17 apps", "removed, YouTube ~98 MB RAM"],
                ["11 GB", "storage freed"],
                ["51 boards", "~100 edge cases"],
                ["13 → 30 fps", "Android Auto, server mode"],
                ["383 / 300", "contacts and calls, wiped on disconnect"],
                ["3 days", "from carousel to this"],
              ].map(([n, l]) => (
                <div key={n} className="p-4 border-b border-r border-parchment/10">
                  <p className="font-heading text-2xl md:text-3xl text-parchment leading-none">{n}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-parchment/35 mt-2 leading-relaxed">{l}</p>
                </div>
              ))}
            </div>

            <P>
              The car is the same car. What changed is the screen, and the attitude behind it: if something
              has always been broken, it can still be fixed. You just have to look closely, test it in the
              real world and keep going.
            </P>
            <P>
              There’s more to improve, and I’m looking forward to it.
            </P>

          </article>

          <section className="px-4 md:px-12 pt-12 md:pt-20 mt-16 border-t border-parchment/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/25 mb-2 md:mb-3">
                  Back to
                </p>
                <Link
                  href="/"
                  className="font-heading text-4xl md:text-6xl uppercase text-parchment hover:text-neonAccent transition-colors hover-target"
                >
                  Works ↗
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
