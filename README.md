# Portfolio: Vishnu Vardhan Manikandan

Static site, no build step, no dependencies. Rebuilt from the current résumé, so the
positioning is now **Data / Business / BI Analyst** rather than student-with-an-internship.

## Run it

```bash
# any static server
python3 -m http.server 8080
# → http://localhost:8080
```

Or just double-click `index.html`.

Live at <https://vishnuvardhan0ffl.github.io/portfolio/> via GitHub Pages
(Settings → Pages → `main` / root). Pushing to `main` redeploys.

## Files

```
index.html                    all markup
assets/css/style.css          design system + layout (dark/light via [data-theme])
assets/js/main.js             interactions + the scenario model
assets/img/*.webp             case-study artwork (generated in Higgsfield)
assets/img/portrait.jpg       hero portrait
assets/img/og.jpg             1200x630 social preview (JPEG, because WebP is unreliable
                              in LinkedIn/WhatsApp link unfurls)
assets/img/favicon.svg        nested-VV stencil mark
Vishnu_Vardhan_Manikandan_Resume.pdf
```

Artwork is WebP at quality 82, taking 11.8MB of PNG down to 0.5MB, no visible loss. Each `<img>`
keeps an `onerror` fallback to the original Higgsfield CDN PNG, so a missing local file
degrades instead of breaking.

## What's interactive

- **Scenario studio**: a live version of the Freedom Pools method: six assumption sliders,
  a canvas heatmap of gross profit across adoption × channel share, and a tornado chart
  showing which driver actually moves the answer. Each driver swings across its own
  plausible range, not a uniform ±20% (in a multiplicative model, uniform swings make every
  bar identical and tell you nothing).
- Filterable case files with expandable detail
- Tabbed skills panel
- Dark / light theme, remembered in `localStorage`
- Scroll progress, active-section nav, reveal-on-scroll, animated counters
- Contact form → opens the user's mail client, no backend

## Editing

Colours and type live in the `:root` block at the top of `style.css`; the light theme is the
`html[data-theme="light"]` block right below it. Case-study copy is plain HTML in `index.html`
and each `<article class="case">` carries `data-tags` that drive the filter chips.

## Content notes

Every figure on the page traces to the résumé (SA housing package, Roy Morgan adoption band,
corridor detached-housing share, 123,837 crime records, 39/15 lots). Contract value and gross
margin in the scenario studio are user inputs, labelled as such, and no client figures are
reproduced.
