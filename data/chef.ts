/** Fictional chef. The portrait is a stand-in photograph; see public/images/CREDITS.md. */
export const chef = {
  name: "Ren Takeda",
  title: "Head Chef and Owner",
  portrait: "/images/kitchen-chef.jpg",
  portraitAlt: "A chef in a white jacket and dark apron leans over the pass, plating by hand, in black and white.",
  background:
    "Ren trained for eleven years across Tokyo and Kanazawa, first rinsing rice for two winters before he was allowed to hold a knife at the counter. He opened KAI to cook for fewer people, more carefully.",
  philosophy:
    "The fish decides the evening. I listen to the market at dawn, then build the menu around what is at its best that day, and nothing else.",
  facts: [
    { label: "Trained", value: "Tokyo and Kanazawa" },
    { label: "Style", value: "Edomae, lightly seasonal" },
    { label: "Seats", value: "Eight, one seating" },
  ],
} as const;
