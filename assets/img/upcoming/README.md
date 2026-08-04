# Staged artwork — not live yet

Nothing in this folder is referenced by `index.html`. These are versioned here so they're
safe in git and ready to wire into a case file when the projects are done.

Generated in the same visual language as the live artwork: ink navy `#0B1520`, teal
`#2DD4BF`, bone `#F2EDE4`, amber `#E8A33D`, 3:2, abstract, no text baked in.

| File | Shows | Fits a project about |
|---|---|---|
| `llm-attention.webp` | A row of token cells with arcs between non-adjacent ones | Attention, transformers, sequence modelling, prompt analysis |
| `llm-embeddings.webp` | Point clusters in projected space, one isolated in amber | Embeddings, semantic search, clustering, drift detection |
| `multimodal-fusion.webp` | Text lines, an image grid and a waveform converging on one node | Multimodal pipelines, fusion architecture, cross-modal input |
| `multimodal-latent.webp` | Three translucent fields glowing where they overlap | Shared latent space, cross-modal alignment, CLIP-style joint embedding |

`llm-attention` and `multimodal-fusion` read best at thumbnail size — reach for those first
if a project only needs one image.

## First-time setup

The image files aren't in git yet, only this note and the fetch script:

```bash
bash assets/img/upcoming/fetch.sh
git add -A && git commit -m "Stage artwork for LLM/multimodal projects" && git push
```

Roughly 250KB total once converted — no meaningful weight on the repo, and zero weight on
the site since nothing loads them.

## Going live later

Move the file up a level and reference it:

```bash
git mv assets/img/upcoming/llm-attention.webp assets/img/
```

Then add an `<article class="case">` block in `index.html` — copy any existing one in
`<div class="cases">`, swap the `src`, renumber the badge, set `data-tags`, and bump the
count on the "All" filter chip. No JS changes; filtering, disclosure and reveal all bind by
class at load.
