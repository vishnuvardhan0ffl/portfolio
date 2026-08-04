#!/usr/bin/env bash
# ------------------------------------------------------------------
# Downloads the six Higgsfield-generated artworks into assets/img/
# so the site runs fully offline with no external image requests.
#
#   cd portfolio && bash fetch-assets.sh
#
# Until you run this, the pages fall back to the Higgsfield CDN
# automatically, so the site still looks right either way.
# ------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/assets/img"
CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3GGs45nWqoS4cgRqBAF4frcR8eA"

download () { echo "  → $2"; curl -fsSL "$CDN/$1" -o "$2"; }

echo "Fetching artwork into assets/img …"
download "hf_20260803_145706_f9e017c8-9c15-4339-925b-84a993567af1.png" "hero.png"
download "hf_20260803_145710_3e814f9e-c50f-496a-8ac0-1d4aa78d1688.png" "case-freedom-pools.png"
download "hf_20260803_145713_769ece66-8df5-42ac-a984-0c624f07f2e2.png" "case-akasa.png"
download "hf_20260803_145716_547ba41f-0cdd-4535-9bad-61f741af3520.png" "case-crime-dashboard.png"
download "hf_20260803_145718_6a0daaa1-108d-458e-a1b4-98b9ba8a1885.png" "case-hotspot.png"
download "hf_20260803_145721_6bb64839-dda5-43f7-89c2-cb725ec0cc8c.png" "case-perfomark.png"
echo "Done. Six files in assets/img."
