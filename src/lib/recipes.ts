export type Recipe = {
  slug: string;
  title: string;
  category: string;
  year: string;
  note: string;
  serves: string;
  time: string;
  ingredients: string[];
  method: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "pork-ribs",
    title: "Pork Ribs",
    category: "Oven Baked",
    year: "2025",
    note: "Low and slow is everything here. The foil does the real work — your oven is just a vessel. Don't rush the rest.",
    serves: "2–3",
    time: "4 HRS",
    ingredients: [
      "Spare ribs — full rack",
      "Lemon juice",
      "Mixed herbs",
      "Olive oil",
      "Garlic — crushed",
      "BBQ seasoning — dry rub",
      "Smoked BBQ sauce — glaze",
    ],
    method: [
      "Remove the membrane from the underside of the rack by working a knife under the skin and pulling it off cleanly.",
      "Combine lemon juice, mixed herbs, olive oil and crushed garlic into a marinade. Coat ribs thoroughly and leave for a minimum of 4 hours — overnight preferred.",
      "Pat ribs dry. Apply BBQ seasoning generously on all sides as a dry rub. Press it in.",
      "Wrap tightly in two layers of foil. Bake at 150°C for 3 hours — low and slow.",
      "Unwrap carefully. Brush smoked BBQ sauce liberally on both sides.",
      "Increase oven to 220°C or broil on high. Return uncovered for 15 minutes until sauce caramelizes and edges char slightly.",
      "Rest for 10 minutes before slicing between the bones. Sauce again if desired.",
    ],
  },
  {
    slug: "mbuzi-choma",
    title: "Mbuzi Choma",
    category: "Charcoal Grilled",
    year: "2025",
    note: "The soy sauce is the cheat code no one talks about. Overnight marinade is non-negotiable. The akabanga on the kachumbari is the finish.",
    serves: "4–6",
    time: "5 HRS",
    ingredients: [
      "Goat meat — bone-in cuts",
      "Soy sauce",
      "MSG",
      "Onions — finely chopped",
      "Garlic — crushed",
      "Salt",
      "Tomatoes — for kachumbari",
      "Red onion — for kachumbari",
      "Fresh coriander",
      "Lemon juice",
      "Akabanga chili oil",
    ],
    method: [
      "Mix soy sauce, MSG, finely chopped onions, crushed garlic and salt into a marinade.",
      "Score the goat meat deeply with a knife and work the marinade into every cut. Cover and marinate overnight.",
      "Prepare charcoal. Wait until coals are fully ashed over with a red glow — no open flame.",
      "Grill over medium-high heat, turning every 8–10 minutes. Baste with remaining marinade each turn.",
      "Cook until the exterior is charred and the meat is cooked through. Internal temp should be above 70°C.",
      "For kachumbari: finely dice tomatoes and red onion. Add chopped coriander and squeeze over lemon juice. Finish with a few drops of akabanga. Toss and serve immediately alongside the choma.",
    ],
  },
  {
    slug: "tiramisu",
    title: "Tiramisu",
    category: "No-Bake Dessert",
    year: "2025",
    note: "No eggs, no mascarpone, no alcohol. Purists will cancel me. It still hits every single time.",
    serves: "6–8",
    time: "4 HRS CHILL",
    ingredients: [
      "Ladyfinger biscuits — 200g",
      "Instant coffee — 3 tbsp dissolved in 200ml hot water",
      "Heavy whipping cream — 300ml",
      "Cream cheese — 250g, room temp",
      "Icing sugar — 80g",
      "Vanilla extract — 1 tsp",
      "Cocoa powder — for dusting",
    ],
    method: [
      "Brew strong instant coffee. Let it cool completely to room temperature.",
      "Beat cream cheese with icing sugar and vanilla extract until completely smooth with no lumps.",
      "In a separate bowl, whip heavy cream to stiff peaks.",
      "Fold the whipped cream into the cream cheese mixture gently until just combined. Do not overwork.",
      "Dip each ladyfinger in the cooled coffee for exactly one second per side. They should be wet but not falling apart.",
      "Lay a single layer of dipped ladyfingers in your dish.",
      "Spread half the cream mixture over the ladyfingers in an even layer.",
      "Repeat: second layer of dipped ladyfingers, then remaining cream.",
      "Dust the top generously with cocoa powder through a sieve.",
      "Cover and refrigerate for a minimum of 4 hours. Overnight yields the best result.",
    ],
  },
  {
    slug: "fish-fingers",
    title: "Fish Fingers",
    category: "Deep Fried",
    year: "2025",
    note: "The double cornstarch coat is the whole secret. Skip it and you'll end up with sad, pale fish. The chicken masala in the seasoning is doing more than you think.",
    serves: "2",
    time: "30 MIN",
    ingredients: [
      "Tilapia fillets — cut into finger-sized strips",
      "Cornstarch — for coating",
      "Eggs — beaten",
      "Salt",
      "MSG",
      "Chicken masala",
      "Canola oil — for deep frying",
    ],
    method: [
      "Slice tilapia fillets into even strips, roughly 3cm wide. Pat completely dry with paper towels.",
      "Season the fish strips with salt, MSG and chicken masala. Let sit for 10 minutes.",
      "Coat each strip in cornstarch, pressing to adhere. Shake off all excess.",
      "Dip into beaten egg, then press back into cornstarch for a second coat. This double coat gives the crunch.",
      "Heat canola oil to 175°C in a deep pan. Test with a drop of batter — it should sizzle immediately.",
      "Fry in small batches. Do not crowd the pan. Cook 3–4 minutes, turning once, until golden and crisp.",
      "Drain on a wire rack, not paper towels, to keep the underside crisp. Season with a pinch of salt while hot.",
    ],
  },
  {
    slug: "pepper-sauce",
    title: "Pepper Sauce",
    category: "Sauce",
    year: "2025",
    note: "Blending the oil into the sauce before frying is the move. It becomes something else entirely. Goes on everything.",
    serves: "Many",
    time: "25 MIN",
    ingredients: [
      "Red chillies — roughly chopped",
      "Garlic — several cloves",
      "Onion — quartered",
      "Tomatoes — roughly chopped",
      "MSG",
      "Chicken seasoning",
      "Salt",
      "Canola oil — generous pour",
    ],
    method: [
      "Roughly chop the chillies, garlic, onion and tomatoes. No need to be precise — it all gets blended.",
      "Add everything to a blender: chillies, garlic, onion, tomatoes, MSG, chicken seasoning, salt and the canola oil.",
      "Blend on high until completely smooth. The oil emulsifies into the sauce.",
      "Heat a wide pan on medium-high until hot. Pour the blended sauce directly in — it will spit aggressively. Stand back.",
      "Stir continuously as the sauce fries in its own oil. It will darken, thicken and reduce.",
      "Cook for 15–20 minutes until the oil visibly separates at the edges and the sauce is deep red.",
      "Taste. Adjust salt and seasoning. Use as a dipping sauce, cooking base, or straight on anything.",
    ],
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}
