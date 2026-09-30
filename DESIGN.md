---
version: alpha
name: Hinoki Ledger
description: Design system for KAI, a fictional eight-seat Japanese omakase counter. An editorial ledger of courses set on washi paper and sumi ink, built to move a visitor toward one action, reserving a seat.

colors:
  primary: "#17150F"
  secondary: "#22392D"
  tertiary: "#B8954F"
  tertiary-deep: "#7D6229"
  neutral: "#D8CFBB"
  surface: "#EFE9DB"
  on-surface-muted: "#5E5747"
  on-inverse-muted: "#A39A85"
  border: "#BDB39C"
  error: "#8E3B2B"

typography:
  display:
    fontFamily: Newsreader
    fontSize: 104px
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.005em
  quote:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Instrument Sans
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label-caps:
    fontFamily: Instrument Sans
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.16em
  label-md:
    fontFamily: Instrument Sans
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.04em
  price:
    fontFamily: Instrument Sans
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
    fontFeature: "'tnum' 1"
  kanji-mark:
    fontFamily: Shippori Mincho
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1

rounded:
  none: 0px
  hair: 2px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  section: 128px
  gutter: 24px
  margin: 24px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  page-inverse:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
  page-green:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-sm}"
  caption-inverse:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-inverse-muted}"
    typography: "{typography.body-sm}"
  kicker:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary-deep}"
    typography: "{typography.label-caps}"
  kicker-inverse:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-caps}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
  button-inverse:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
    height: 52px
  button-inverse-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  seat:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    size: 12px
  seat-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    size: 12px
  slot:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    height: 52px
  slot-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  slot-unavailable:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-muted}"
  card-stone:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    height: 52px
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
  rule:
    backgroundColor: "{colors.border}"
    height: 1px
  kanji:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.kanji-mark}"
---

# Hinoki Ledger

## Overview

KAI seats eight guests at one hinoki counter, once an evening. The interface is built from that fact. It reads like a ledger kept by the chef: a numbered record of courses, set on paper, with a single continuous line running through it that stands for the counter itself.

The direction is **quiet editorial luxury with a spine**. Photography and type carry the mood. Nothing glows, floats, or asks for attention it hasn't earned. The one motif that repeats everywhere is the counter: a hairline with eight seat marks along it. It appears as the section divider, the scroll indicator, the seating picker, and the confirmation stamp. A visitor who reserves has, in effect, chosen a mark on the line they have been scrolling beside all along.

The reference field sits mostly on mid-tone paper with grotesque display faces. This system goes the other way: a warmer, paler washi ground, a light-weight high-contrast serif for headlines, and ink-dark sections used sparingly like a lacquered tray under the courses.

What it gives up: it is not loud, it will never be the most energetic page in a gallery, and it deliberately withholds gradients, blur, and card grids. The trade is memorability through restraint. It also asks for real photography to sell the food; tonal placeholders are honest stand-ins, not the finished look.

KAI is a fictional portfolio project. No business details, reviews, awards, or figures on the site describe a real establishment.

## Colors

The palette comes from the room, not from a mood board. Every color is a material.

- **Primary (#17150F):** Sumi, ink ground from an inkstick, warm rather than neutral black. Headlines, body text on paper, and the inverse sections.
- **Secondary (#22392D):** Tokiwa, the evergreen of shaded cedar. The one chromatic color. It replaces black where a section needs weight but not night: the reservation band, hover states, the kanji marks.
- **Tertiary (#B8954F):** Kinpaku, gold leaf. Its job is small: seat marks, hairline accents, kickers on dark. It stays under 5% of any screen. On ivory it drops below text contrast, so it is never used for words there.
- **Tertiary deep (#7D6229):** Gold pushed dark enough to read as text on washi. Kickers and small numerals on light sections only.
- **Neutral (#D8CFBB):** Hinoki stone. Raised panels, disabled slots, tonal placeholders for photography.
- **Surface (#EFE9DB):** Washi, aged paper. The default page. Never pure white anywhere in the system.
- **On-surface muted (#5E5747) and on-inverse muted (#A39A85):** Secondary text on paper and on ink respectively. Both are chosen to clear 4.5:1 on their own grounds, so captions never need to be enlarged to stay legible.
- **Border (#BDB39C):** Hairlines only. It fails contrast as text, and is not used for text.
- **Error (#8E3B2B):** A burnt umber pulled from the same family as the gold. Errors read as part of the room, not as a stock red alarm.

## Typography

Two Latin families and one script-specific face.

- **Newsreader** (Light and Regular, optical size on) sets every headline, the pull quote, and course numerals. Its high contrast at display size is what makes the page editorial. It runs light, with negative tracking, and stays large.
- **Instrument Sans** sets navigation, body, forms, buttons, prices. It is quiet on purpose. Labels are small caps tracked wide; prices use tabular figures so a menu column aligns.
- **Shippori Mincho** is used only for kanji marks (the 回 emblem, the formal numerals 壱 弐 参 肆 伍 陸 漆 捌 for the eight seats). It is a mincho, so its stroke contrast matches Newsreader's. It never sets running text.

Fallbacks: Newsreader falls back to a Georgia-class serif, Instrument Sans to the system sans. All three load through `next/font` with `display: swap`. Every family is open source under the SIL Open Font License.

Body measure stays between 60 and 70 characters. The display size is fluid and capped so the hero headline resolves to two or three lines within a 1280 by 800 first viewport.

## Layout

An 8px base with a 4px half step. The page is a 12-column grid at desktop with a 24px gutter and margin, collapsing to a single column below 60rem. Composition is asymmetric: text hangs on the left third, images take offset bands, and the space between is treated as material.

Section rhythm is a single generous value, 128px at desktop and 72px on mobile, applied at every seam. Pivotal sections (hero, the reservation close) may take more. Container padding is set with `padding-inline` only, so section block padding is never silently zeroed by a shorthand.

Navigation is a **side rail** on desktop: a thin fixed strip with a rotated wordmark, a vertical list of destinations, and the Reserve action pinned low. On mobile it becomes a top bar with a full-screen menu and a persistent Reserve button. The counter line sits in the main column, not the rail.

## Elevation & Depth

Flat. Hierarchy comes from tone, spacing, and hairlines, never from shadow. Ink sections sit against washi sections like a change of surface. A 1px border-colored rule separates ledger rows. The only depth effect is a slow image reveal, a clip-path wipe that slides across the photograph the way a panel would.

No box-shadow is used anywhere. Focus is shown with a 2px tokiwa outline offset by 3px on paper, and a 2px washi outline on ink.

## Shapes

Architectural and square. Buttons, inputs, slots, and stone panels have a corner radius of 0. A 2px radius appears only on photographs, to soften a scanned edge, never on controls. The single round shape in the system is the seat mark, a 12px dot on the counter line, so the circle reads as meaningful rather than decorative.

Borders are 1px hairlines in the border color, or in gold when the counter line is being drawn. Buttons carry no border; their fill is the edge.

## Components

- **Reserve button:** Sumi fill with washi label on paper, washi fill with sumi label on ink. 52px tall, no radius, 24px inline padding. Hover moves the fill to tokiwa on paper and to stone on ink over 200ms. There is one filled button per view.
- **Text link with arrow:** The secondary action everywhere. Label, a thin arrow, a 1px underline. Used for Explore the Experience, View Menu, and directions.
- **Counter line:** A 1px border-colored hairline with eight gold seat marks. It doubles as scroll progress: marks fill with ink as sections pass. On the reservation page it becomes the seating control, where the eight marks are the counter seats.
- **Time slot:** A 52px square-cornered cell showing a time. Selected is inverted to ink. Unavailable is stone with muted text and is not focusable. Slots are radio-group semantics, not a decorative grid.
- **Ledger row (menu):** Kanji or Latin numeral, dish name in Newsreader, a dotted leader, price in tabular figures, and a one-line garnish description beneath in muted sans. Rows are separated by hairlines and shift 4px on hover.
- **Stone panel:** A neutral-filled block with 40px padding, used for private dining capacity, policies, and the confirmation summary. Never used as a repeated card grid.
- **Form fields:** Label above, 52px field, paper fill with a hairline bottom border. Error text uses the umber color with an icon-free sentence directly beneath the field, tied with `aria-describedby`.
- **Confirmation stamp:** After a request is submitted, the guest's chosen seat mark is drawn on the counter line with a small tokiwa 回 seal. The copy states that this is a request, not a confirmed booking.

## Do's and Don'ts

- Do use exactly one filled button per view, and make it Reserve.
- Do let the counter line and its eight marks recur as divider, progress, and seating control. It is the brand device.
- Do set section rhythm to one value and reuse it at every seam.
- Do keep gold under 5% of any screen, and only on ink or as a hairline.
- Do write copy with no em dashes. Use a period, a comma, or a colon.
- Do label every reservation state honestly: a submitted form is a *request*, and only a staff action would make it *confirmed*.
- Don't use box-shadow, blur, glassmorphism, or gradients on controls or surfaces.
- Don't round buttons, inputs, or panels. The only circle is the seat mark.
- Don't use an indigo or violet accent, an all-Inter type stack, or a centered hero with a three-column feature grid.
- Don't set kanji as decoration at random. Use it for the 回 emblem and the seat numerals only, and keep it set in Shippori Mincho.
- Don't invent press quotes, awards, star ratings, or guest counts. KAI is fictional; leave those slots out.
- Don't animate everything. Reveals are for images and headlines. Honor `prefers-reduced-motion` by removing movement, not by hiding content.
