#!/usr/bin/env bash
set -u

# Scan git repos under a root directory and print account/remote mismatch clues.
# Usage:
#   bash scripts/check-git-repo-identity.sh [ROOT_DIR]
# Example:
#   bash scripts/check-git-repo-identity.sh "$HOME/Desktop"

ROOT_DIR="${1:-$HOME/Desktop}"

if [ ! -d "$ROOT_DIR" ]; then
  echo "ERROR: directory not found: $ROOT_DIR" >&2
  exit 1
fi

printf "Root: %s\n\n" "$ROOT_DIR"
printf "%-28s | %-16s | %-28s | %-42s\n" "repo" "branch" "git user(email)" "origin"
printf -- "----------------------------+------------------+------------------------------+------------------------------------------\n"

found_any=0

for dir in "$ROOT_DIR"/*; do
  [ -d "$dir" ] || continue
  [ -d "$dir/.git" ] || continue

  found_any=1
  repo_name="$(basename "$dir")"

  branch="$(git -C "$dir" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "-")"
  user_name="$(git -C "$dir" config --get user.name 2>/dev/null || true)"
  user_email="$(git -C "$dir" config --get user.email 2>/dev/null || true)"
  if [ -z "$user_name" ] && [ -z "$user_email" ]; then
    user_identity="(global/default)"
  else
    user_identity="${user_name}(${user_email})"
  fi

  remote_url="$(git -C "$dir" remote get-url origin 2>/dev/null || echo "(no origin)")"

  printf "%-28s | %-16s | %-28s | %-42s\n" \
    "$repo_name" "$branch" "$user_identity" "$remote_url"
done

if [ "$found_any" -eq 0 ]; then
  echo "No git repositories found under: $ROOT_DIR"
fi

cat <<'EOF'

Tip:
- If remote uses HTTPS, auth may follow credential helper / browser session.
- For multi-account setups, prefer SSH host aliases in ~/.ssh/config:
  Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
  Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
- Then set per-repo origin:
  git remote set-url origin git@github-work:ORG/REPO.git
EOF
