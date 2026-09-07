# Maintaining this fork

This repository uses two remotes:

- `origin` points to `lihongzy/skills`, your fork.
- `upstream` points to `mattpocock/skills`, the author's repository.

Keep `main` as the clean upstream mirror. Create a separate branch for your own Skills and changes:

```bash
git switch -c my-skills
# add or edit files under skills/
git add .
git commit -m "feat: add my skill"
git push -u origin my-skills
```

When the author publishes updates, commit or stash your work, switch to `main`, and run:

```bash
./scripts/sync-upstream.sh
```

To bring the refreshed upstream into your work branch:

```bash
git switch my-skills
git merge main
```

Resolve conflicts in your work branch when both you and upstream changed the same files. Keep the upstream remote URL unchanged so future syncs continue to work.
