# Release Build Skill

Use this skill when changing build scripts, Tauri config, Git ignore rules, release notes, or installer instructions.

## Checklist

- Keep `index.html` and `src/` usable for GitHub Pages.
- Keep Tauri `frontendDist` pointed at generated `dist/`.
- Do not commit generated `dist`, `src-tauri/target`, `.exe`, `.msi`, or `.zip` files.
- Prefer NSIS installer output for the current Windows release path.
- Document commands that were actually run.

## Done When

- `npm run build:web` works.
- Tauri build instructions are accurate.
- Release artifacts are ignored by Git.
- README explains how to build, install, and share.
