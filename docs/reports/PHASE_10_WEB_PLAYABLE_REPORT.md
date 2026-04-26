# Phase 10 Web Playable Report

## 1. Stage Goal

Prepare the existing AIGAME project as a Web playable version that can be opened from a static GitHub Pages link, understood quickly, and played on desktop browsers with keyboard controls and on mobile browsers with basic touch controls.

This phase preserved Windows/Tauri build capability and did not add Android APK, iOS, accounts, leaderboards, payments, backend services, large dependencies, or copyrighted assets.

## 2. Changed Files

- `README.md`
- `index.html`
- `src/game.js`
- `src/styles.css`
- `docs/skills/mobile-adaptation-skill.md`
- `docs/reports/PHASE_10_WEB_PLAYABLE_REPORT.md`

Unchanged by intent:

- `src-tauri/`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `.nojekyll`
- `scripts/copy-web.mjs`
- Windows installer configuration

## 3. Added Features

- Web playable landing header with game title, short description, version label, Start Game link, and How to Play link.
- Web playable information section with overview, controls, and known limits.
- Mobile portrait orientation hint.
- Mobile touch controls:
  - Left
  - Right
  - Jump
  - Pause
- Touch controls map into the existing input system so desktop keyboard controls remain unchanged.
- CSS improvements to prevent horizontal overflow and keep the 16:9 canvas stable.
- README Web playable section with local preview, controls, mobile notes, build/deploy notes, Windows-vs-Web distinction, and current limitations.
- Updated mobile adaptation skill for Phase 10 web touch work while still forbidding Android/iOS native work.

## 4. Preserved Behavior

- Existing keyboard controls remain available.
- Existing start menu, how-to-play screen, pause menu, game over screen, clear screen, three levels, generated audio, and Windows polish behavior remain in `src/game.js`.
- GitHub Pages still serves from repository root.
- Static paths remain relative:
  - `src/styles.css`
  - `src/game.js`
- `npm run build:web` still copies root web files into `dist/` for Tauri.
- Tauri `frontendDist` remains separate from the GitHub Pages root.
- Windows/Tauri build capability was not removed or changed.

## 5. Web Build / Deploy Notes

Current Web build strategy:

- The Web playable is a static site served from the project root.
- No bundler is required.
- The root files are deployable directly to GitHub Pages.

GitHub Pages strategy:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
- `.nojekyll` remains present.

Build commands:

- `npm run build` runs the same copy step as `npm run build:web`.
- `npm run build:web` generates `dist/` for Tauri packaging.
- `dist/` is not required for GitHub Pages.

Windows vs Web:

- Web playable: opened through a browser from the root static site.
- Windows desktop: built with Tauri using copied files from `dist/`.

## 6. Commands Run

- `git switch -c feat/phase-10-web-playable`
  - Result: fail.
  - Cause: Git could not create `refs/heads/feat/phase-10-web-playable`.
  - Code issue: no.
  - Impact: did not block code changes, but branch creation still needs local Git ref cleanup or permission repair.
- `npm.cmd install`
  - Result: pass, dependencies already up to date.
- `node --check src\game.js`
  - Result: pass.
- `npm.cmd run build`
  - Result: pass.
- `npm.cmd run build:web`
  - Result: pass.
- `npm.cmd run dev -- --version`
  - Result: pass, Tauri CLI resolved as `tauri-cli-dev 2.10.1`.
- `python -m http.server 8040 --bind 127.0.0.1`
  - Result: pass when launched outside sandbox for Playwright access.
- Playwright Web smoke test at `http://127.0.0.1:8040`
  - Result: pass after widening mobile breakpoint.
- Playwright console error check
  - Result: pass, zero browser console errors.

## 7. Test Results

Passed:

- Desktop viewport:
  - Page opened.
  - Game title displayed as `AIGAME`.
  - Version label displayed as `Phase 10 Web Playable · v0.1.0`.
  - Canvas visible.
  - No horizontal overflow.
  - Touch controls hidden on desktop viewport.
  - Start Game triggered via keyboard.
  - Movement/jump key path executed.
- Mobile portrait viewport:
  - Touch controls visible.
  - Orientation hint visible.
  - No horizontal overflow.
  - Buttons present: Left, Right, Pause, Jump.
- Mobile landscape viewport:
  - Touch controls visible.
  - Orientation hint hidden.
  - No horizontal overflow.
- Console:
  - Zero error messages.

Not fully automated:

- Full playthrough of all three levels on a physical phone.
- Long-duration touch control comfort testing.
- Tauri desktop GUI retest after Web playable layout changes.

## 8. Mobile Web Notes

- Mobile support is browser-only.
- Touch controls appear under the game area and do not overlay the canvas.
- Portrait users see a prompt recommending landscape orientation.
- Landscape mobile hides the header to give the game more room.
- The virtual buttons feed the same key state used by keyboard controls.
- This phase does not implement Android APK or iOS.

## 9. Known Issues

- Git branch creation failed because the workspace could not create the requested ref path.
- Touch controls are basic and intended for Web playable testing, not a full native mobile control scheme.
- Audio still requires user interaction before generated sounds can play, which is expected browser behavior.
- The Web playable uses placeholder canvas art.

## 10. Risk Notes

- The mobile breakpoint intentionally shows touch controls up to 920px wide so common landscape phones can use them.
- `dist/` remains generated output and should not be used as the GitHub Pages source.
- No new dependencies were added.
- No external or copyrighted assets were introduced.

## 11. Next Phase Recommendation

The next phase can enter Android APK exploration only if explicitly approved.

Recommended next steps before Android:

- Manually test the Web playable on at least one real phone.
- Confirm touch button placement and jump feel on physical hardware.
- Decide whether Android should wrap the static web game or use a dedicated native packaging path.
- Keep account, leaderboard, payment, backend, and iOS work out of scope unless separately approved.
