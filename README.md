# AIGAME

AIGAME is an original lightweight side-scrolling platformer playable on Web and Windows. The current version is **v0.2.0-alpha / Phase 12 Release Page**.

You can play three short levels, collect energy sparks, avoid patrol bot side hits, pause/restart, and reach glowing exit gates. The project uses static HTML/CSS/canvas JavaScript for the game and Tauri v2 for Windows packaging.

## Quick Start for Players

### Play Online

Open the GitHub Pages site when published from the repository root:

```text
https://<your-github-username>.github.io/<repository-name>/
```

The Web playable includes:

- A release page with the live game canvas.
- Keyboard controls for desktop browsers.
- Basic touch buttons for mobile browsers.
- A portrait hint recommending landscape play on phones.

### Windows Installer

For Windows playtesting, use the NSIS setup installer:

```text
src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe
```

Ordinary players should download the setup `.exe`, not `dist/`, `src-tauri/target/`, or intermediate build folders. The installer is generated locally for now; uploading it to a GitHub Release is a separate future publishing step.

The Windows installer is unsigned, so Windows SmartScreen may show a warning. For trusted internal testing, choose `More info` and then `Run anyway`.

## Controls

Desktop keyboard:

- Move left: `ArrowLeft` or `A`
- Move right: `ArrowRight` or `D`
- Jump: `Space`, `ArrowUp`, or `W`
- Pause/resume: `P` or `Escape`
- Restart current level: `R`
- Menu navigation: `ArrowUp`, `ArrowDown`, `W`, `S`, `Enter`, or `Space`

Mobile browser:

- Rotate to landscape for the clearest play area.
- Use the on-screen `Left`, `Right`, `Jump`, and `Pause` buttons.

## Local Preview

No package install is required for the browser version. From the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Web Build and GitHub Pages

The Web playable is a static site served from the repository root:

- `index.html`
- `src/styles.css`
- `src/game.js`

No bundler is required for GitHub Pages. Use this GitHub Pages setup:

1. Repository `Settings`
2. `Pages`
3. Source: `Deploy from a branch`
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

The project includes `.nojekyll` so GitHub Pages serves the static files directly.

For Tauri packaging, copy the same web files into `dist/`:

```bash
npm run build:web
```

The generic build alias runs the same static copy:

```bash
npm run build
```

`dist/` is generated output for Tauri packaging and is not the GitHub Pages source.

## Windows Development and Packaging

Prerequisites:

- Node.js and npm
- Rust and Cargo
- Microsoft C++ Build Tools
- Python for the Tauri dev static server

Install npm dependencies:

```bash
npm install
```

Run the Tauri development window:

```bash
npm run tauri:dev
```

Build the Windows desktop release:

```bash
npm run tauri:build
```

The release build creates:

- Standalone app executable: `src-tauri/target/release/aigame.exe`
- NSIS setup installer: `src-tauri/target/release/bundle/nsis/AIGAME_0.1.0_x64-setup.exe`

## Platform Status

| Platform | Status | Notes |
| --- | --- | --- |
| Web | Playable | Static GitHub Pages root site. |
| Windows | Packagable | Tauri v2 NSIS installer builds successfully. |
| Android | Init blocked | Rust Android targets are installed, but Java, Android SDK, adb, sdkmanager, ANDROID_HOME, and NDK_HOME are still missing. |
| iOS | Not started | Out of scope for current phases. |

## Android Init Status

Phase 13 attempted Android environment verification only. Android init was not run because required tooling is missing.

Required environment before retrying:

- Java available on `PATH`
- valid `JAVA_HOME`
- Android SDK installed
- valid `ANDROID_HOME`
- Android NDK installed
- valid `NDK_HOME`
- `adb` available on `PATH`
- `sdkmanager` available on `PATH`
- Rust Android targets installed

The Rust Android targets are currently installed:

- `aarch64-linux-android`
- `armv7-linux-androideabi`
- `i686-linux-android`
- `x86_64-linux-android`

Expected init command after the missing environment is configured:

```bash
npx tauri android init
```

Expected Phase 14 work after a successful init:

- build a debug APK
- optionally install it with `adb install`
- test on a real Android device

Do not commit APK/AAB files, keystores, passwords, `keystore.properties`, `key.properties`, or Android build folders.

## Current Features

- Release page with live Web playable canvas.
- Start menu and How to Play screen.
- Pause menu, game over screen, and level clear screen.
- Three short levels.
- Keyboard controls.
- Basic mobile browser touch controls.
- Energy sparks.
- Patrol bot enemy interactions.
- Gap death and restart flow.
- Generated jump, collect, hurt, and clear sound effects.
- Tauri v2 Windows desktop shell.
- NSIS Windows installer build.

## Known Limits

- Alpha version; still small and placeholder-heavy.
- Android APK has not been generated.
- iOS is not supported.
- No accounts.
- No leaderboard.
- No cloud saves.
- No payment system.
- No backend service.
- Mobile browser controls need more real-device testing.
- Windows builds are currently unsigned.

## Phase Roadmap

- Phase 09: Windows polish with menus, three levels, generated audio, and Tauri packaging.
- Phase 10: Web playable page with mobile orientation hint and touch controls.
- Phase 11: Android environment exploration; no APK generated.
- Phase 12: Release page for play, download guidance, platform status, and roadmap.

Next possible work:

- Android environment setup.
- Android init.
- Debug APK.
- Real device testing.
- More levels.
- Better visual polish.
- GitHub Release upload for the Windows installer.

## Build Artifact and Signing Safety

Do not commit generated build output or signing files:

- `dist/`
- `src-tauri/target/`
- `.exe`
- `.msi`
- `.zip`
- `.apk`
- `.aab`
- `.apks`
- `.jks`
- `.keystore`
- `keystore.properties`
- `key.properties`

Review `git status` before staging release work.

## Originality and Assets

AIGAME uses original canvas-drawn placeholder geometry and procedurally generated sound effects. It does not load external sprites, fonts, music, or sound effects. Do not add commercial game characters, names, art, maps, music, sound effects, logos, or screenshots without verified rights.
