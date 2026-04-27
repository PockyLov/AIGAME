# Release Page Skill

Use this skill when turning AIGAME's static Web playable into a public-facing project page for playing, understanding, downloading, and sharing the game.

## 1. Release Page Goal

- Present AIGAME clearly as a small original platformer.
- Keep the Web playable immediately accessible.
- Explain the Windows installer path without committing build artifacts.
- Help players understand controls and limits.
- Help future developers understand current platform status and next steps.

## 2. Page Information Architecture

Recommended order:

1. Hero with title, one-line description, version, and primary actions.
2. Online playable canvas.
3. Windows download guide.
4. Game overview and platform support.
5. Controls.
6. Version timeline.
7. Known limitations.
8. Roadmap.

## 3. Copy Principles

- Use plain, direct language for players.
- Keep technical build details in a clearly labeled section.
- Say what works now and what does not work yet.
- Avoid exaggerated claims such as production-ready, commercial release, or final build.
- Avoid references to protected game IP.

## 4. Download Guidance Principles

- Point ordinary Windows users to the NSIS setup `.exe`.
- Do not tell users to download `dist/`, `target/`, or raw build folders.
- Explain that installer upload to GitHub Releases is a separate publishing step.
- Mention unsigned build warnings when relevant.

## 5. Web Playable Display Principles

- Keep the canvas visible and stable.
- Preserve the existing 16:9 game ratio.
- Keep Start Game / Play Online and How to Play easy to find.
- Keep desktop keyboard controls and mobile touch controls intact.
- Do not add backend, account, leaderboard, or payment requirements.

## 6. Screenshot Display Principles

- Prefer real gameplay screenshots if screenshots are added later.
- Do not use copyrighted sprites, logos, or commercial game imagery.
- If screenshots are not available, use the live canvas as the primary visual.

## 7. Forbidden

- No Android init or build.
- No iOS.
- No Google Play work.
- No account system.
- No leaderboard.
- No payment system.
- No backend service.
- No large UI framework.
- No copyrighted assets, names, sounds, or screenshots.
- No deletion of Windows/Tauri build capability.
- No deletion of Web playable capability.
- No committing `dist`, `target`, `.exe`, `.msi`, `.zip`, `.apk`, or `.aab` artifacts.

## 8. Acceptance Standards

- Hero clearly identifies AIGAME and current version.
- Web playable remains usable.
- Windows download guidance is clear.
- Platform support and limitations are explicit.
- Roadmap is visible.
- README matches the release page state.
- Build and smoke tests are recorded in the phase report.
