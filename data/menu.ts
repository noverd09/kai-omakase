import type { MenuCategory, MenuItemRow } from "@/types/database";

/** Fictional dishes and prices. Shaped like future `menu_items` rows. */

export const menuCategories: { id: MenuCategory; label: string; jp: string; blurb: string }[] = [
  { id: "omakase", label: "Omakase", jp: "おまかせ", blurb: "The chef's evening, in courses. Choose a length; we choose the rest." },
  { id: "sushi", label: "Sushi", jp: "寿司", blurb: "Nigiri, one piece at a time, pressed and placed in front of you." },
  { id: "sashimi", label: "Sashimi", jp: "刺身", blurb: "Cut to order. Aged where the fish asks for it." },
  { id: "small-plates", label: "Small Plates", jp: "小鉢", blurb: "Warm dishes between the raw ones." },
  { id: "dessert", label: "Dessert", jp: "甘味", blurb: "Restrained, seasonal, never sweeter than it needs to be." },
  { id: "sake", label: "Sake", jp: "日本酒", blurb: "A short list, chosen to sit beside the fish." },
];

const created = "2026-09-01T00:00:00.000Z";

type Seed = Omit<MenuItemRow, "created_at" | "is_available" | "is_featured" | "image"> &
  Partial<Pick<MenuItemRow, "is_available" | "is_featured" | "image">>;

const seed = (items: Seed[]): MenuItemRow[] =>
  items.map((i) => ({
    is_available: true,
    is_featured: false,
    image: null,
    created_at: created,
    ...i,
  }));

export const menuItems: MenuItemRow[] = seed([
  // Omakase
  { id: "omakase-kai", name: "Omakase Kai", description: "Eighteen courses. Sashimi, a warm course, twelve pieces of nigiri, a hand roll, soup, dessert.", category: "omakase", price: 220 },
  { id: "omakase-sho", name: "Omakase Sho", description: "Twelve courses. The shorter evening, with the same fish and the same care.", category: "omakase", price: 165 },
  { id: "omakase-sake", name: "Sake Pairing", description: "Five pours chosen to follow the courses. Served alongside either omakase.", category: "omakase", price: 85 },
  { id: "omakase-nonalc", name: "Tea Pairing", description: "Five teas, from chilled sencha to roasted hojicha, with the same pacing.", category: "omakase", price: 55 },

  // Sushi
  { id: "sushi-akami", name: "Bluefin Tuna", description: "Akami · aged shoyu · wasabi", category: "sushi", price: 9, image: "/images/nigiri-plate.jpg", is_featured: true },
  { id: "sushi-chutoro", name: "Chutoro", description: "Medium fatty tuna · nikiri · fresh wasabi", category: "sushi", price: 12 },
  { id: "sushi-otoro", name: "Otoro", description: "Fatty tuna belly · lightly seared · sea salt", category: "sushi", price: 16 },
  { id: "sushi-salmon", name: "Sake-Cured King Salmon", description: "Sake cure · shiso · citrus salt", category: "sushi", price: 9, image: "/images/nigiri-salmon.jpg", is_featured: true },
  { id: "sushi-scallop", name: "Hokkaido Scallop", description: "Yuzu kosho · sea salt · citrus", category: "sushi", price: 10 },
  { id: "sushi-madai", name: "Madai", description: "Sea bream · kombu-cured · sudachi", category: "sushi", price: 8 },
  { id: "sushi-kohada", name: "Kohada", description: "Gizzard shad · vinegar-cured · ginger", category: "sushi", price: 8 },
  { id: "sushi-uni", name: "Bafun Uni", description: "Sea urchin · nori · a drop of soy", category: "sushi", price: 18 },
  { id: "sushi-unagi", name: "Unagi", description: "Freshwater eel · tare glaze · sansho", category: "sushi", price: 9 },

  // Sashimi
  { id: "sashimi-board", name: "Aged Sashimi Board", description: "Otoro · madai · hirame · shaved daikon · served on hinoki", category: "sashimi", price: 58, image: "/images/sashimi-hinoki.jpg", is_featured: true },
  { id: "sashimi-tuna", name: "Bluefin Tuna", description: "Akami · aged shoyu · wasabi", category: "sashimi", price: 32 },
  { id: "sashimi-scallop", name: "Hokkaido Scallop", description: "Yuzu kosho · sea salt · citrus", category: "sashimi", price: 28 },
  { id: "sashimi-hirame", name: "Hirame", description: "Flounder · usukuri · ponzu jelly", category: "sashimi", price: 26 },
  { id: "sashimi-awabi", name: "Steamed Awabi", description: "Abalone · sea grape · liver sauce · gold leaf", category: "sashimi", price: 42, image: "/images/plate-awabi.jpg" },

  // Small plates
  { id: "plate-chawan", name: "Chawanmushi", description: "Egg custard · snow crab · ginkgo", category: "small-plates", price: 16 },
  { id: "plate-wagyu", name: "Wagyu Tataki", description: "Black garlic · ponzu · spring onion", category: "small-plates", price: 34 },
  { id: "plate-miso", name: "Clam Miso", description: "Red miso · littleneck · mitsuba", category: "small-plates", price: 12 },
  { id: "plate-ika", name: "Firefly Squid", description: "Sumiso · daikon · toasted rice", category: "small-plates", price: 18, image: "/images/bowl-chopsticks.jpg", is_featured: true },
  { id: "plate-tamago", name: "Tamago", description: "Sweet layered omelet · grated yam", category: "small-plates", price: 10 },

  // Dessert
  { id: "dessert-yuzu", name: "Yuzu Sorbet", description: "Cold, bright, brief", category: "dessert", price: 12 },
  { id: "dessert-hojicha", name: "Hojicha Pot de Crème", description: "Roasted tea · brown sugar · sea salt", category: "dessert", price: 14 },
  { id: "dessert-sesame", name: "Black Sesame Mochi", description: "Warm mochi · toasted kinako", category: "dessert", price: 13 },

  // Sake
  { id: "sake-daiginjo", name: "Junmai Daiginjo, Hoshi no Kura", description: "Pear, white flower, a clean finish · bottle 140", category: "sake", price: 24 },
  { id: "sake-ginjo", name: "Ginjo Namazake, Kaze no Mori", description: "Fresh and lightly sparkling · bottle 105", category: "sake", price: 18 },
  { id: "sake-junmai", name: "Kimoto Junmai, Tsuki no Kura", description: "Savory, rounded, good warm · bottle 90", category: "sake", price: 16 },
  { id: "sake-nigori", name: "Nigori, Yuki no Ie", description: "Unfiltered, creamy, gently sweet · bottle 80", category: "sake", price: 15 },
]);

export const featuredItems = menuItems.filter((i) => i.is_featured);
