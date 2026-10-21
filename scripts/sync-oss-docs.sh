#!/usr/bin/env bash
# Sync the user-facing docs for the open-source site from the PUBLIC tree.
#
# Source: the Clawless Computer open-source repository (RBJGlobal/clawless-computer),
# read from a local clone. NEVER the private clawless-v1 workspace: that is what
# scripts/sync-docs.sh copies for the CURRENT site, and it must not feed the new one.
#
# Files are read from a COMMIT with `git show <commit>:<path>`, not from the working
# tree, so nothing uncommitted in the developer's checkout can leak onto the site,
# and the exact source commit is recorded in content/oss/SOURCE.json for citation.
#
# Usage: scripts/sync-oss-docs.sh [ref]        (default: HEAD of the clone)
#        OSS_TREE=/path/to/clone scripts/sync-oss-docs.sh v6.0.0
set -euo pipefail

SRC="${OSS_TREE:-$HOME/Projects/clawless-opensource}"
REF="${1:-HEAD}"
OUT="content/oss"

[ -d "$SRC/.git" ] || { echo "ERROR: no git clone at $SRC" >&2; exit 1; }
COMMIT="$(git -C "$SRC" rev-parse --verify "$REF^{commit}")"

rm -rf "$OUT"
mkdir -p "$OUT/kb" "$OUT/project"

n=0
while IFS= read -r f; do
  case "$f" in *.md) ;; *) continue ;; esac
  git -C "$SRC" show "$COMMIT:$f" > "$OUT/kb/$(basename "$f")"
  n=$((n + 1))
done < <(git -C "$SRC" ls-tree --name-only "$COMMIT" docs/knowledge-base/)

for f in CONTRIBUTING.md CLA.md PRIVACY.md SECURITY.md LICENSE; do
  git -C "$SRC" show "$COMMIT:$f" > "$OUT/project/$f"
done

printf '{\n  "repo": "RBJGlobal/clawless-computer",\n  "commit": "%s",\n  "syncedAt": "%s"\n}\n' \
  "$COMMIT" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$OUT/SOURCE.json"

echo "synced $n knowledge-base files + 5 project files from ${COMMIT:0:7}"
