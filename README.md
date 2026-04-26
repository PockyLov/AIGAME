# AIGAME Platformer Prototype

An original 2D side-scrolling platformer web game prototype. The current version is a small Windows-ready platformer with a start menu, how-to-play screen, pause flow, three short levels, keyboard movement, jumping, gravity, ground collision, energy sparks, patrol bots, gap hazards, generated sound effects, and glowing exit gates.

## Run Locally

No package install is required for the current version. Use any static file server from the project root.

With Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a desktop browser, but a local server is recommended for normal development.

## Web Playable

The Web playable version is the root static site:

- `index.html`
- `src/styles.css`
- `src/game.js`

It opens directly to a playable landing page with the game title, short description, version label, Start Game link, How to Play link, canvas game area, keyboard controls, and basic mobile touch controls.

Local preview:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Desktop browser controls:

- Move: `ArrowLeft` / `ArrowRight` or `A` / `D`
- Jump: `Space`, `ArrowUp`, or `W`
- Pause: `P` or `Escape`
- Restart: `R`

Mobile browser controls:

- Rotate to landscape for the clearest play area.
- Use the on-screen `Left`, `Right`, `Jump`, and `Pause` buttons.
- Touch controls are for basic browser play only; this phase does not create an Android APK or iOS app.

Current Web playable limits:

- No save system.
- No accounts.
- No online leaderboard.
- No backend service.
- No payments.
- No native mobile app.

## Build

The web version does not require a bundler. The game is a portable static web page made from:

- `index.html`
- `src/styles.css`
- `src/game.js`

For the Tauri desktop version, copy those web files into `dist/` with:

```bash
npm run build:web
```

`dist/` is generated output and is not required for GitHub Pages.

For Web playable deployment, GitHub Pages should serve the repository root. The `dist/` folder is only for Tauri packaging.

## Deliver to Another Computer

Send the project folder with the files above, plus this `README.md`. On the other computer:

1. Install Python if no static file server is already available.
2. Open a terminal in the project folder.
3. Run `python -m http.server 8000`.
4. Open `http://localhost:8000` in a desktop browser.

The game does not require a backend, database, account system, internet connection, or absolute local path.

## Share the Windows Playtest Build

For a simple Windows desktop playtest, send this installer to the tester:

```text
src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe
```

Recommended sharing steps:

1. Build the installer with `npm run tauri:build` if it does not already exist.
2. Send only `AIGAME_0.1.0_x64-setup.exe` to the tester.
3. Tell the tester to run the installer, follow the prompts, and launch `AIGAME`.
4. Ask the tester to use the keyboard controls listed below and report any launch, display, or input issues.

Because this prototype is not code-signed, Windows SmartScreen may show an unsigned app warning. For trusted internal playtests, the tester can choose `More info` and then `Run anyway`. For public distribution, code signing is recommended before sharing broadly.

## Deploy to GitHub Pages

This project is ready for GitHub Pages as a static site from the repository root. The page uses relative paths:

- `src/styles.css`
- `src/game.js`

To publish it from GitHub:

1. Push the project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. In the left sidebar, open `Pages`.
5. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
6. Set `Branch` to `main`.
7. Set the folder to `/ (root)`.
8. Click `Save`.
9. Wait for GitHub Pages to publish the site.

The published URL usually looks like:

```text
https://<your-github-username>.github.io/<repository-name>/
```

GitHub Pages sites are publicly accessible by default. Do not publish private, licensed, or sensitive content in this repository unless you intend it to be public.

This repository includes `.nojekyll` so GitHub Pages serves the static files directly without Jekyll processing.

The GitHub Pages Web playable and the Windows desktop build share the same game code, but they are delivered differently:

- Web playable: runs from the repository root in a browser through GitHub Pages.
- Windows desktop: uses Tauri v2 and copies the web files into `dist/` before building an installer.
- Web playable does not require installing the Windows `.exe`.
- Windows installer output should be shared through releases or direct file transfer, not committed to the repo.

## Windows Desktop App with Tauri v2

The Windows desktop version uses Tauri v2 as a minimal shell around the same static web game. It does not change the browser/GitHub Pages version.

Prerequisites:

- Node.js and npm
- Rust and Cargo
- Microsoft C++ Build Tools
- Python, used by Tauri dev mode to serve `dist/`

Install npm dependencies once:

```bash
npm install
```

Copy the web files into `dist/`:

```bash
npm run build:web
```

The generic build alias runs the same static copy step:

```bash
npm run build
```

Run the Tauri development window:

```bash
npm run tauri:dev
```

The generic dev alias also opens the Tauri development window:

```bash
npm run dev
```

The desktop window title is `AIGAME`, and the default window size is `1100x760`.

Build a Windows desktop release:

```bash
npm run tauri:build
```

The release build creates:

- Standalone app executable: `src-tauri/target/release/aigame.exe`
- Windows installer: `src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe`

To install and run the desktop version on Windows:

1. Run `src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe`.
2. Follow the installer prompts.
3. Launch `AIGAME` from the installed app shortcut or Start menu entry.
4. Use the same keyboard controls as the browser version.

To share the desktop version with another Windows computer, send the installer file:

```text
src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe
```

The desktop build uses the generated `dist/` folder and does not change the root `index.html` or `src/` files used by GitHub Pages. This project does not add a backend, database, login, leaderboard, or network feature for the desktop version.

## Android APK Exploration

Phase 11 checked the Android APK path, but this workspace is not ready to initialize or build Android yet.

Current status:

- Node, Rust, and Cargo are available.
- Java is not available on `PATH`.
- `JAVA_HOME` is not set.
- `adb` was not found.
- `sdkmanager` was not found.
- Android Studio was not found in the common install path.
- Android SDK was not found in the common local SDK path.
- Android NDK, platform-tools, build-tools, and command-line tools were not found.
- Git branch creation for `feat/phase-11-android-apk` failed, so Android initialization was intentionally not attempted in this dirty worktree.

Before retrying Android init/build:

1. Install Android Studio.
2. Install Android SDK Platform, Android SDK Build-Tools, Android SDK Platform-Tools, Android SDK Command-line Tools, and NDK through Android Studio SDK Manager.
3. Install a supported JDK and set `JAVA_HOME`.
4. Add Java, platform-tools, and command-line tools to `PATH`.
5. Install Rust Android targets required by Tauri Android.
6. Fix the local Git branch/ref issue and create a clean phase branch.

Expected future commands after the environment is ready:

```bash
npx tauri android init
npx tauri android build --debug
```

Do not commit Android build outputs or signing files. The project ignores common APK/AAB outputs and keystore files, but you should still review `git status` before staging.

## Release Notes

### 0.1.0

Initial playable prototype release.

- Original static web platformer playable in a desktop browser.
- GitHub Pages compatible root `index.html` and `src/` structure.
- Keyboard movement, jumping, gravity, ground collision, collection, patrol bot interaction, pit restart, and exit gate clear state.
- Tauri v2 Windows desktop shell using the same web game files copied into `dist/`.
- NSIS Windows installer output: `src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe`.
- Phase 10 Web playable page with landing copy, mobile orientation hint, and touch controls.
- No backend, database, login, leaderboard, network feature, Android build, iOS build, or payment system.

## Controls

- Move left: `ArrowLeft` or `A`
- Move right: `ArrowRight` or `D`
- Jump: `Space`, `ArrowUp`, or `W`
- Pause or resume: `P` or `Escape`
- Restart current level: `R`
- Menu navigation: `ArrowUp`, `ArrowDown`, `W`, `S`, `Enter`, or `Space`

## How to Play

Start from the main menu, read How to Play if needed, then clear three short levels:

1. Level 1 teaches movement, jumping, sparks, and the exit gate.
2. Level 2 introduces a gap and a patrol bot.
3. Level 3 combines platforms, gaps, sparks, and a patrol bot route.

Collect energy sparks to increase the score. The sparks also mark the intended route. Avoid patrol bots from the side, or land on them from above to disable them. Falling into a gap or touching a patrol bot from the side opens the game over screen, where you can restart or return to the menu. Reaching a glowing exit gate opens the level clear screen.

## Current Scope

Implemented:

- Web playable landing page
- Web playable version label
- Mobile browser landscape hint
- Mobile touch controls for left, right, jump, and pause
- Game page
- Canvas-based game loop
- Start menu
- How-to-play screen
- Pause menu
- Game over screen
- Level clear screen
- Keyboard input
- Player left/right movement
- Jumping
- Gravity
- Ground collision
- Three short levels
- Energy sparks
- Score HUD
- Patrol bot enemy
- Stomp-to-disable enemy interaction
- Side-hit death and restart
- Gap death and restart
- Glowing exit gate
- Level clear status
- Generated jump, collect, hurt, and clear sound effects
- Clearer HUD status messages
- Stronger color contrast for sparks, platforms, hazards, patrol bot, and exit gate
- Static web copy script for Tauri desktop packaging
- Tauri v2 Windows desktop shell
- NSIS Windows installer build

Not implemented yet:

- Backend or database
- Android APK
- iOS app
- Online leaderboard
- Account system
- Payment system

## Originality and Assets

This project uses original canvas-drawn placeholder geometry only. It does not load external sprites, images, fonts, music, or sound effects. The current direction uses energy sparks, a patrol bot, and a glowing exit gate, and avoids protected commercial game characters, names, settings, art, maps, music, and sound effects.

Future assets should be original or permissively licensed, with license notes added here before delivery.

## Manual Verification

1. Start a static server from the project root.
2. Open the game in a desktop browser.
3. Confirm the page shows a canvas scene and is not blank.
4. Start the game from the menu.
5. Open How to Play and return to the menu.
6. Press left/right movement keys and confirm the player moves.
7. Press a jump key and confirm the player jumps.
8. Press `P` or `Escape` and confirm pause/resume works.
9. Press `R` and confirm the current level restarts.
10. Follow the energy sparks and confirm each one increases the score.
11. Watch the patrol bot move left and right.
12. Jump onto the patrol bot from above and confirm it disappears.
13. Touch the patrol bot from the side and confirm the game over screen appears.
14. Fall into a gap and confirm the game over screen appears.
15. Reach each glowing exit gate and confirm the level clear screen appears.
16. Use Next Level to reach and clear all three levels.
17. Check the browser console for obvious runtime errors.

## Final Acceptance Checklist

- Page opens at `http://localhost:8000`.
- GitHub Pages source can be set to `main` branch and `/ (root)`.
- Canvas is visible and the page is not blank.
- Start menu, How to Play, pause, game over, and level clear screens work.
- Keyboard left/right movement works.
- Keyboard jump works and the player lands again.
- Energy sparks disappear when collected and increase `Sparks`.
- Patrol bot moves left and right.
- Landing on the patrol bot from above disables it.
- Touching the patrol bot from the side opens game over.
- Falling into the gap opens game over.
- Reaching the glowing exit gate shows the level clear message.
- Three levels can be played in sequence.
- Generated sound effects play after the first user interaction.
- Browser console has no obvious runtime errors.
- Project files do not depend on an absolute local path.
- Tauri desktop dev can be run with `npm run tauri:dev`.
- Tauri Windows installer can be built with `npm run tauri:build`.

## Next Plans

- Android APK exploration in a later phase.
- Public release page with screenshots, version notes, and unsigned-build warnings.
