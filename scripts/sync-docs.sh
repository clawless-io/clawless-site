#!/bin/bash
# Sync KB chapters from clawless-v1 (the desktop-app planning workspace) into
# this site's content/docs/ directory. Run before commit when the KB has
# changed; the synced files are checked into clawless-site and rendered at
# build time.
#
# WHY this exists:
#   clawless-v1 is a private local-only repo with no git remote, so we cannot
#   pull at build time from Cloudflare Pages. Single-source-of-truth lives in
#   clawless-v1; clawless-site holds a synced copy. Drift discipline is on
#   whoever edits a KB chapter to run this script and commit the result.
#
# Usage:
#   bun run sync-docs            (calls this script via package.json)
#   bash scripts/sync-docs.sh    (directly)

set -euo pipefail

SOURCE_DIR="$HOME/Projects/clawless-v1/clawless/docs/knowledge-base"
TARGET_DIR="$(cd "$(dirname "$0")/.." && pwd)/content/docs"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "FAIL: source directory not found: $SOURCE_DIR"
  echo "      sync-docs requires the clawless-v1 workspace at ~/Projects/clawless-v1/."
  exit 1
fi

mkdir -p "$TARGET_DIR"

# Wipe target and re-copy. Cleaner than diff-based sync; KB churn is small
# and removed chapters need to disappear from the published surface.
rm -f "$TARGET_DIR"/*.md

shopt -s nullglob
copied=0
for src in "$SOURCE_DIR"/*.md; do
  name="$(basename "$src")"
  # Skip the in-tree README — it's an internal index, not a published chapter.
  if [ "$name" = "README.md" ]; then
    continue
  fi
  cp "$src" "$TARGET_DIR/$name"
  copied=$((copied + 1))
done

echo "Synced $copied chapter(s) from $SOURCE_DIR -> $TARGET_DIR"
