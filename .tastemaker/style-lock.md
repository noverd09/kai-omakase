# Style lock: KAI

Source of truth for tokens is `DESIGN.md` (Hinoki Ledger). This file records the tastemaker decisions layered on top.

## Direction contract
- Thesis: a chef's ledger of courses on washi paper, with one continuous "counter line" (hairline + 8 gold seat marks) as the recurring brand device.
- First viewport: type-led statement fold, "An Evening of Japanese Craft", one filled Reserve button, one text link. No dashboard-style hero furniture.
- System: custom (no component kit for visuals). Behavioral primitives (dialog, radio group, popover/date) via Radix or React Aria, restyled to tokens.
- Risk taken: pale washi ground and light high-contrast serif against a category that leans mid-tone and grotesque.

## Mood / mode
Elegant/premium. Light base (washi), ink and tokiwa-green inverse sections. No runtime dark toggle.

## Color contract (measured, WCAG)
| Pairing | Ratio | Use |
|---|---|---|
| sumi #17150F on washi #EFE9DB | 15.08 | text |
| ash #5E5747 on washi | 5.92 | muted text |
| ash on stone #D8CFBB | 4.63 | muted text on panels |
| tokiwa #22392D on washi | 10.26 | text, hover fill |
| washi on sumi | 15.08 | text on ink |
| mist #A39A85 on sumi | 6.53 | muted text on ink |
| kin #B8954F on sumi | 6.47 | gold text and marks, dark only |
| kinDeep #7D6229 on washi | 4.75 | gold text, light only |
| ember #8E3B2B on washi | 6.17 | errors |
| kin #B8954F on washi | 2.33 | FORBIDDEN as text, hairline only |
| border #BDB39C on washi | 1.72 | hairlines only, never text |
| kin on tokiwa | 4.41 | UI marks only, no small text |
| mist on tokiwa | 4.45 | avoid for small text; use washi |

## Structure (rotated against ~/.tastemaker/structure-history.json; last build was Long-Scroll Narrative, N2/H3/Ft4)
- Macrostructure: Split Diptych (8) for the home page, Editorial Index feel on menu.
- Nav: N5 side rail (desktop), top bar + full-screen menu (mobile).
- Hero: H1 statement fold.
- Features: F4 numbered course sequence (The Experience), F6 spec/ledger rows (menu).
- Proof: none. KAI is fictional; no invented press, ratings, or counts.
- CTA: C2 statement close plus C3 typographic links.
- Footer: Ft1 masthead.
- Section heads: S1 hanging, no eyebrow by default (cap 1 to 2 per page).

## Assets
- Photography: real CC0/PDM only. Until sourced, use tonal stone placeholders in a swappable `Photo` component; never claim a placeholder is a photo.
- Illustration: none planned. Icons: none, or a single set if a form needs one.
- Logo: no existing identity. Wordmark "KAI" set in Newsreader plus the 回 kanji mark in Shippori Mincho.

## Fonts
Newsreader (headlines), Instrument Sans (UI/body), Shippori Mincho (kanji only). All via next/font.

## Hard copy rules
No em dashes in any shipped copy. Headline "An Evening of Japanese Craft" and CTAs "Reserve a Table" / "Explore the Experience" / "Plan a Private Dinner" come from the brief and are kept verbatim.

## Tooling notes
Python is not installed on this machine (Windows Store stub only), so tastemaker's `.py` scripts (`generate_palette`, `check_contrast`, `anti_slop_scan`, `audit_motion`, structure/copy history checks) have not been run. Contrast was verified with a Node script instead. Install Python to run the scans before handoff.

## Contrast additions found by axe-core (2026-09-30)
| Pairing | Result | Rule |
|---|---|---|
| kinDeep #7D6229 on stone #D8CFBB | FAILS 4.5:1 | Never use gold text on stone panels. Use tokiwa or ash there. |
