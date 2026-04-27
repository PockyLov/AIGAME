# Phase 12 Release Page Report

## 1. Stage Goal

Turn the current AIGAME Web playable into a clearer release/portfolio page for playing online, understanding the game, finding the Windows installer guidance, reviewing platform status, and seeing the roadmap.

This phase did not add Android init/build, iOS, Google Play, accounts, leaderboards, payments, backend services, large UI frameworks, copyrighted assets, or gameplay changes.

## 2. Changed Files

- `README.md`
- `index.html`
- `src/styles.css`
- `docs/skills/release-page-skill.md`
- `docs/reports/PHASE_12_RELEASE_PAGE_REPORT.md`

Intentionally not changed:

- `src/game.js`
- `package.json`
- `src-tauri/`
- `src-tauri/tauri.conf.json`
- `scripts/copy-web.mjs`
- `.nojekyll`

## 3. Added Release Page Features

- Hero section with:
  - `AIGAME` title
  - one-line description
  - `Phase 12 Release Page - v0.2.0-alpha` version label
  - `Play Online`
  - `How to Play`
  - `Windows Download Guide`
- Online playable section with live canvas and clear start guidance.
- Windows download guide with the NSIS setup installer path.
- Game introduction section.
- Platform status section.
- Controls section for keyboard and mobile browser touch play.
- Phase history section:
  - Phase 09 Windows polish
  - Phase 10 Web playable
  - Phase 11 Android environment exploration
  - Phase 12 Release page
- Known limitations section.
- Roadmap section.
- Originality/assets note.

## 4. README Updates

README was reorganized for two audiences:

- Players:
  - what AIGAME is
  - how to play online
  - how to use the Windows installer
  - controls
  - known limits
- Developers/future maintainers:
  - local preview
  - Web build and GitHub Pages root deployment
  - Windows Tauri packaging
  - platform status table
  - phase roadmap
  - build artifact and signing safety

## 5. Preserved Behavior

- Web playable remains a static root site.
- GitHub Pages path strategy remains `/ (root)`.
- Relative paths remain:
  - `src/styles.css`
  - `src/game.js`
- Canvas remains visible and 16:9.
- Existing game logic remains unchanged.
- Keyboard controls remain unchanged.
- Mobile touch controls remain present.
- Windows/Tauri build remains unchanged.
- Tauri NSIS installer still builds.
- No generated release artifacts were staged or intentionally added.

## 6. Commands Run

- `git status`
  - Result: pass.
  - Already on `feat/phase-12-release-page`; worktree was clean at phase start.
- `git branch`
  - Result: pass.
- `npm.cmd install`
  - Result: pass.
- `node --check src\game.js`
  - Result: pass.
- `npm.cmd run build`
  - Result: pass.
- `npm.cmd run build:web`
  - Result: pass.
- `npm.cmd run tauri:build`
  - Result: pass.
  - Rebuilt Windows executable and NSIS setup installer.
- `python -m http.server 8050 --bind 127.0.0.1`
  - Result: pass, used for local static preview.
- Playwright smoke test at `http://127.0.0.1:8050`
  - Result: pass.
- Playwright console error check
  - Result: pass, zero console errors.

## 7. Test Results

Passed:

- Page opened locally.
- Title displayed as `AIGAME`.
- Version displayed as `Phase 12 Release Page - v0.2.0-alpha`.
- `Play Online` link moved to the playable section.
- Start Game could be triggered by pressing Enter in the game menu.
- Canvas was visible.
- Controls section was visible.
- Windows download guide was visible.
- Roadmap section was visible.
- Desktop viewport had no horizontal overflow.
- Mobile viewport had no horizontal overflow.
- Mobile touch controls were visible.
- Mobile orientation hint was visible in portrait.
- Browser console error count was zero.
- Web build passed.
- Windows Tauri build passed.

Failed:

- No test failures were observed in this phase.

Not fully automated:

- Real mobile device visual/touch testing.
- Human review of public release copy.
- GitHub Pages live deployment after merge.

## 8. Web / Mobile Display Notes

- Desktop page now acts as a release page first and a playable game page second.
- The live canvas remains the primary visual instead of adding fake screenshots.
- Mobile viewport keeps the touch controls below the canvas.
- Portrait mobile users still receive a landscape recommendation.
- The page avoids horizontal overflow in tested desktop and mobile viewports.

## 9. Known Issues

- Android APK is still not generated.
- iOS is not supported.
- Windows installer is unsigned and may trigger SmartScreen warnings.
- Mobile browser play still needs physical device testing.
- The art remains simple original placeholder canvas geometry.

## 10. Risk Notes

- The release page includes the local installer path but does not package or upload it.
- `dist/` remains generated output for Tauri, not the GitHub Pages source.
- No external assets or new dependencies were added.
- No backend, account, leaderboard, or payment surfaces were introduced.

## 11. Next Phase Recommendation

The project can enter a future Android environment installation / Android init phase if that is the chosen direction.

Before doing so:

- Confirm Java, Android SDK, Android command-line tools, platform-tools, build-tools, and NDK are installed.
- Confirm Android Rust targets are installed.
- Keep Web and Windows release paths intact.
- Do not start Google Play publishing, iOS, account, leaderboard, payment, or backend work without a separate phase request.
