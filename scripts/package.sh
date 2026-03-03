#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

VERSION="$(python - <<'PY'
import json
from pathlib import Path
manifest = Path('manifest.json')
with manifest.open() as f:
    data = json.load(f)
print(data['version'])
PY
)"

PACKAGE_NAME="send-and-archive-${VERSION}.xpi"
PACKAGE_PATH="$DIST_DIR/$PACKAGE_NAME"

mkdir -p "$DIST_DIR"
rm -f "$PACKAGE_PATH"

(
  cd "$ROOT_DIR"
  zip -r "$PACKAGE_PATH" \
    manifest.json \
    background.js \
    _locales \
    LICENSE \
    README.md \
    CHANGELOG.md
)

echo "Created: $PACKAGE_PATH"
