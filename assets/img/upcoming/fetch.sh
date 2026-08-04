#!/usr/bin/env bash
# ------------------------------------------------------------------
# Staged artwork for the upcoming LLM / multimodal projects.
# Not referenced by index.html yet — these live here so they're in git,
# ready to wire into a case file later.
#
# Run once to materialise the files, then commit them:
#   bash assets/img/upcoming/fetch.sh
#
# Downloads the PNGs and converts to WebP q82 — the same settings as the
# artwork already live on the site, so they'll match exactly.
# ------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")"
CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3GGs45nWqoS4cgRqBAF4frcR8eA"

get () { echo "  ↓ $2"; curl -fsSL "$CDN/$1" -o "$2.png"; }

echo "Downloading…"
get "hf_20260804_013637_1f17bdd6-6361-4858-8673-48f100b5d2a0.png" "llm-attention"
get "hf_20260804_013639_e9b40bce-1bf9-46a7-9b09-9618c5043d49.png" "llm-embeddings"
get "hf_20260804_013643_d465e1a2-8f0a-4b15-8417-d5ea4ad3be92.png" "multimodal-fusion"
get "hf_20260804_013645_396136bb-3cdb-433b-b314-2191d9946c49.png" "multimodal-latent"

echo "Converting to WebP…"
python3 - <<'PY'
from PIL import Image
import os, glob
for f in sorted(glob.glob('*.png')):
    im = Image.open(f).convert('RGB')
    out = f[:-4] + '.webp'
    im.save(out, 'WEBP', quality=82, method=6)
    print(f'  {f:26} {os.path.getsize(f)/1024/1024:5.2f}MB -> {os.path.getsize(out)/1024:6.1f}KB')
    os.remove(f)
PY

echo
echo "Done — four .webp files staged in assets/img/upcoming/"
echo "Commit them:  git add -A && git commit -m 'Stage artwork for LLM/multimodal projects'"
