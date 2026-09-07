#!/usr/bin/env bash

set -euo pipefail

if [[ -n "$(git status --porcelain)" ]]; then
  printf '%s\n' 'Working tree is not clean. Commit or stash changes before syncing.' >&2
  exit 1
fi

current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" ]]; then
  printf 'Sync must run from main; currently on %s.\n' "$current_branch" >&2
  exit 1
fi

git fetch upstream main
git merge --ff-only upstream/main
git push origin main

printf '%s\n' 'Upstream sync complete.'
