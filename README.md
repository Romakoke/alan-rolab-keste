# ROLAB × Alan International School — Үйірмелер кестесі

Static, no-build schedule viewer for eleven ROLAB / Alan International School
clubs. Pure HTML / CSS / vanilla JS — no backend, no database.

## Structure

```
index.html         page shell (header, three views: clubs / days / students)
style.css           design system + layout (teal + gold, Alan brand colors)
script.js           routing, rendering, search & filter logic, club icon SVGs
data.js             student data extracted from the source files (exact, unedited)
translations.js     KZ / RU / EN text + club sections, ordering & metadata
assets/             ROLAB, Alan, LEGO, Robot and IT Startup logos
```

## Clubs

**Tech clubs (ROLAB):** LEGO 2–4, ROBOTICS 5–8, LEGO 0–1, IT STARTUP
**General clubs:** Тоғызқұмалақ (0–1, 2–4), Асық · Qazaq Kick (0–1, 2–4),
Шахмат / Chess (0–1, 2–4, 5–8)

Тоғызқұмалақ and Асық · Qazaq Kick don't have logo artwork, so the site uses
simple monogram icons (board grid / knucklebone) in the club's accent color
instead of a generic placeholder.

## Data source & day-grouping

All student names, classes, clubs and days come directly from the source
files. **Each club can have its own group → day mapping** — this is not
hardcoded to one pattern site-wide:

- **LEGO 2–4, LEGO 0–1, ROBOTICS 5–8, IT STARTUP** (`lego_kesteler.xlsx`):
  Group 1 = Monday & Wednesday, Group 2 = Tuesday & Thursday. IT STARTUP only
  has a Group 1 list, so Tuesday/Thursday correctly show the empty state.
- **Тоғызқұмалақ** (`Тоғызқұмалақ.docx`) and **Асық · Qazaq Kick**
  (`Кружок.docx`): both run **Monday & Wednesday only** — there is no second
  group in either source file, so Tuesday/Thursday show the empty state.
- **Шахмат / Chess** (`Шахматы.docx`): a *different* pattern from the rest —
  Group A = **Monday & Tuesday**, Group B = **Wednesday & Thursday** — and
  each of the three age bands (0–1, 2–4, 5–8) has its own two rosters.

Student counts on the site are computed live from the actual row counts in
`data.js`, not from any summary totals written inside the source documents
(a couple of those totals don't match the row-by-row lists in the source
files).

## Run locally

Any static file server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

No environment variables or build step are required — Vercel will serve the
project as a static site.
