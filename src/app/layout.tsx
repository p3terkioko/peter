import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import KonamiEasterEgg from "../components/KonamiEasterEgg";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "PETER KIOKO — Creative Developer",
  description: "Portfolio of Peter Kioko, Software Developer and Creative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${spaceMono.variable} bg-charcoal text-parchment font-mono antialiased overflow-x-hidden selection:bg-neonAccent selection:text-white`}>
        {children}
        <KonamiEasterEgg />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="751a91a7-5f06-43c9-8aea-4964c095ad4e"
        />
      </body>
    </html>
  );
}
