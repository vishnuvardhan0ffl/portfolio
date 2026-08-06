# Staged artwork, not live yet

Nothing in this folder is referenced by `index.html`. These are versioned here so they're
safe in git and ready to wire into a case file when the projects are done.

Generated in the same visual language as the live artwork: ink navy `#0B1520`, teal
`#2DD4BF`, bone `#F2EDE4`, amber `#E8A33D`, 3:2, abstract, no text baked in.

## LLM and multimodal projects

| File | Shows | Fits a project about |
|---|---|---|
| `llm-attention.webp` | A row of token cells with arcs between non-adjacent ones | Attention, transformers, sequence modelling, prompt analysis |
| `llm-embeddings.webp` | Point clusters in projected space, one isolated in amber | Embeddings, semantic search, clustering, drift detection |
| `multimodal-fusion.webp` | Text lines, an image grid and a waveform converging on one node | Multimodal pipelines, fusion architecture, cross-modal input |
| `multimodal-latent.webp` | Three translucent fields glowing where they overlap | Shared latent space, cross-modal alignment, CLIP-style joint embedding |

`llm-attention` and `multimodal-fusion` read best at thumbnail size, so reach for those
first if a project only needs one image.

## Capstone: insider trading on prediction markets

Not downloaded yet. Run this once:

```bash
bash assets/img/upcoming/fetch-capstone.sh
```

Five candidates across different visual directions. **Pick one and delete the rest** before
committing, otherwise the repo carries four unused images.

| File | Shows | Reads as |
|---|---|---|
| `capstone-a-depth-ladder.webp` | Mirrored horizontal bars around a centre axis, one amber band breaking the symmetry | Market microstructure. The most obviously financial of the five |
| `capstone-b-outlier-grid.webp` | A perfectly uniform grid of teal tick marks with exactly one amber, rotated and haloed | Detection. The most graphic and the strongest at thumbnail size |
| `capstone-c-block-chain.webp` | A row of linked blocks, one filled amber and glowing | Blockchain data specifically |
| `capstone-d-early-position.webp` | A flat probability curve jumping near the end, amber markers sitting *before* the jump | The signal itself: positions taken ahead of the news |
| `capstone-e-wallet-network.webp` | A teal transaction mesh with one dense amber knot | Wallet clustering |

**C is the recommendation.** The amber block reads instantly at both full and card size, and
it is the only candidate that unambiguously says "blockchain data". **A** is the runner-up,
and the better choice if the card should read as *markets* rather than *chain data*.

Avoid **B** despite how clean it looks at full size. The whole idea rests on spotting one
anomaly in a uniform field, and at card size the single amber mark disappears into the grid.
Checked by rendering it at 150x100 before deciding.

**E** has the strongest thumbnail of the five, though it is also the heaviest file at 90KB
because the dense network detail compresses poorly. The rest are 12 to 20KB.

## Sizes

WebP at quality 82, matching the live artwork. The four LLM and multimodal files total
256KB. All of them are zero weight on the site, because nothing loads them.

## Going live later

Move the file up a level and reference it:

```bash
git mv assets/img/upcoming/capstone-early-position.webp assets/img/
```

Then add an `<article class="case">` block in `index.html`. Copy any existing one in
`<div class="cases">`, swap the `src`, renumber the badge, set `data-tags`, and bump the
count on the "All" filter chip. No JS changes needed; filtering, disclosure and reveal all
bind by class at load.

Remember to add `width="1264" height="848"` and `loading="lazy"` to the new `<img>`.
