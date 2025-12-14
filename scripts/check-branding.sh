#!/usr/bin/env sh
set -euo pipefail

pattern='#[A-Fa-f0-9]{3,6}'

# Git grep returns 0 when a match is found; we treat that as failure unless it's in the token file.
if git grep -nE "$pattern" -- "*.css" "*.scss" "*.less" "*.js" "*.jsx" "*.ts" "*.tsx" "*.html" ":!src/styles/branding.css"; then
  echo "Branding check failed: raw hex colors found outside src/styles/branding.css."
  exit 1
fi

exit 0



