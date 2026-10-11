import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen | Peter Kioko",
  description: "Recipes from Peter Kioko, with an interactive 3D kitchen. I cook the same way I build: with precision and without apology.",
};

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
