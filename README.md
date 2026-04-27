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
| Android | Debug APK built | Tauri Android Gradle project exists; Phase 16 adds a focused Android app mode for the debug APK. |
| iOS | Not started | Out of scope for current phases. |

## Android Debug APK Status

Phase 13 retry completed Android environment verification and Tauri Android initialization. Phase 14 generated a local Android debug APK for testing.

The Android Gradle project exists at:

```text
src-tauri/gen/android
```

The current debug APK output is:

```text
src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```

This is a debug/testing build, not a signed release build and not a Google Play upload artifact. Tauri also generated an ignored debug AAB during the same build; do not distribute or commit it.

Current Android environment used for init:

- Java/JDK: `D:\Android\Android Studio\jbr`
- Android SDK: `D:\Android\Sdk`
- Android SDK root: `D:\Android\Sdk`
- Android NDK: `D:\Android\Sdk\ndk\30.0.14904198`
- adb: `D:\Android\Sdk\platform-tools\adb.exe`
- sdkmanager: `D:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat`

Installed Rust Android targets:

- `aarch64-linux-android`
- `armv7-linux-androideabi`
- `i686-linux-android`
- `x86_64-linux-android`

Android init command used in Phase 13:

```bash
npx.cmd tauri android init
```

Android debug build command used in Phase 14:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'
npx.cmd tauri android build --debug
```

The ASCII `CARGO_TARGET_DIR` avoids an NDK linker issue caused by the project path containing non-ASCII characters.

Optional device install after connecting and authorizing an Android device:

```bash
adb devices
adb install -r src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```

Phase 15 / Phase 16 device status:

- Phase 15 user update: the debug APK was installed on a real Android phone and the app opened.
- Phase 15 issue: the Android first screen looked like the Web release / showcase page.
- Phase 16 fix: Android/Tauri WebView now receives an `app-mode` / `android-mode` class and hides release-page-only sections in the app shell.
- Phase 16.5 fix: Android app-mode hides Phase 12/Web/Windows release copy and uses a virtual joystick, circular Jump button, and small top-right Pause button.
- Phase 16.6 fix: Android manifest locks the app to landscape and app-mode CSS uses a fullscreen-like landscape game layout.
- Phase 16.7 fix: Android app-mode now uses a responsive landscape viewport. The canvas keeps a fixed logical height and expands its logical width from the actual phone landscape aspect ratio, so wider phones see more horizontal play area instead of stretching a fixed 16:9 image.
- Phase 16.8 fix: Android app-mode now uses a true fullscreen landscape game layout. The page header, release copy, controls text, document-flow HUD space, padding, borders, and page scrolling are removed from Android app-mode; canvas, HUD, joystick, Jump, and Pause are layered over a fixed fullscreen game surface.
- Phase 16.8 Android native polish: `MainActivity` enters sticky immersive mode to hide the status bar and navigation bar where the device allows it.
- Phase 16.9 fix: mobile input responsiveness was improved. The joystick now writes directly to a dedicated mobile input state, the activation threshold is lower, Jump buffers immediately on `pointerdown`, Pause toggles immediately on `pointerdown`, and app-mode disables more default touch interference.
- Phase 16 / 16.5 / 16.6 / 16.7 / 16.8 / 16.9 rebuilds: new debug APKs were generated.
- Phase 16 / 16.5 / 16.6 install attempts: adb detected device `10AF5S28KB004YC`, but install was rejected on the phone with `INSTALL_FAILED_ABORTED: User rejected permissions`.
- Phase 16.7 install result: adb detected device `10AF5S28KB004YC` and `adb install -r` completed with `Success`.
- Phase 16.8 install result: adb detected device `10AF5S28KB004YC` and `adb install -r` completed with `Success`.
- Phase 16.9 install result: adb detected device `10AF5S28KB004YC`; the first install attempt timed out, and the retry completed with `Success`.
- Next step: open the installed app on the phone and confirm joystick, Jump, and Pause feel immediate and stable.

Do not commit APK/AAB files, keystores, passwords, `keystore.properties`, `key.properties`, `local.properties`, or Android build folders.

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
- Android debug APK exists locally and Phase 16.9 installed successfully on a connected phone. Full real-device confirmation of mobile input responsiveness is still pending user review.
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
- Phase 13: Android environment setup and Tauri Android init; no APK generated.
- Phase 14: Android debug APK build for local testing.
- Phase 15: Android real-device test attempted; no authorized adb device detected, so install and manual testing remain pending.
- Phase 16: Android app experience polish; focused app mode added, debug APK rebuilt, reinstall blocked by phone-side permission rejection.
- Phase 16.5: Mobile joystick and Android game layout polish; debug APK rebuilt, reinstall still blocked by phone-side permission rejection.
- Phase 16.6: Android landscape-only app experience; manifest locks landscape, app-mode layout uses the landscape viewport, reinstall still blocked by phone-side permission rejection.
- Phase 16.7: Android responsive landscape viewport polish; app-mode dynamically widens the game world for phone aspect ratios, debug APK rebuilt and installed successfully.
- Phase 16.8: Android true fullscreen landscape game layout; app-mode removes webpage chrome, overlays HUD and controls, adds immersive system UI flags, debug APK rebuilt and installed successfully.
- Phase 16.9: Mobile input responsiveness polish; joystick, Jump, and Pause use shorter pointer-based input paths, debug APK rebuilt and installed successfully.

Next possible work:

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
