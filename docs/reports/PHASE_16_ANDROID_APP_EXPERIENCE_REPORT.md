# Phase 16 Android App Experience Report

## 1. Stage Goal

Make the Android debug app open like a focused mobile game instead of showing the full Web release / showcase page.

This phase did not do release signing, Google Play, iOS, accounts, leaderboards, payments, backend services, cloud save, major gameplay rewrites, Web release page deletion, or Windows build removal.

## 2. User Feedback

User confirmed after Phase 15:

- The Phase 14 debug APK was installed on a real Android phone.
- The app opens.
- The first screen looks like the Web release / showcase page or developer-facing portfolio page, not like a focused Android game app.
- Full real-device acceptance is paused until the Android app experience is improved.

Additional Phase 16.5 screenshot feedback:

- Android app still showed `PHASE 12 RELEASE PAGE - V0.2.0-ALPHA`.
- Android app still showed Web/Windows release copy such as `playable on Web and Windows`.
- Bottom touch controls were four large rectangular buttons: `Left`, `Right`, `Pause`, and `Jump`.
- User requested mobile play with a virtual joystick instead of rectangular movement buttons.

## 3. Changed Files

Changed:

- `README.md`
- `src/game.js`
- `src/styles.css`
- `docs/reports/PHASE_15_ANDROID_REAL_DEVICE_TEST_REPORT.md`
- `docs/reports/PHASE_16_ANDROID_APP_EXPERIENCE_REPORT.md`

Files intentionally not changed:

- `index.html`
- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- Android Gradle configuration
- Game level data and collision/gameplay mechanics

## 4. Android App Mode Design

Why Android previously showed the release page:

- Tauri Android loads the same static frontend copied into `dist`.
- That frontend is rooted at `index.html`.
- `index.html` is currently the Phase 12 release / showcase page.
- The canvas game is embedded inside the `Play Online` section, so Android displayed the same long release page before the user reached the game.

Implemented approach:

- `src/game.js` detects Android Tauri/WebView context.
- When detected, it adds these classes to `body`:
  - `android-mode`
  - `app-mode`
- When not detected, it adds:
  - `web-release-mode`

Detection uses a minimal combination:

- Tauri globals such as `window.__TAURI_INTERNALS__` or `window.__TAURI__`
- Tauri-style location checks such as `tauri:` protocol or `tauri.localhost`
- Android WebView user-agent check.
- `?mode=app` as a manual fallback for local verification.

Android app mode CSS:

- Hides release-page-only sections:
  - `PHASE 12 RELEASE PAGE - V0.2.0-ALPHA` version label
  - Web/Windows intro copy
  - Windows download guide
  - Roadmap / known limits section
  - Version timeline
  - Developer-facing info grid
  - Release page action links
- Keeps visible:
  - AIGAME title
  - Canvas game area
  - HUD
  - Mobile game control layer
  - Portrait orientation hint

Gameplay code was not rewritten.

## 4.1 Phase 16.5 Mobile Joystick Design

The old mobile controls still exist for ordinary mobile Web release page behavior, but app-mode hides them.

Android app-mode now creates a canvas overlay control layer in `src/game.js`:

- Left bottom: circular virtual joystick.
  - Drag left to add `ArrowLeft` to the existing key set.
  - Drag right to add `ArrowRight` to the existing key set.
  - Return near center to clear left/right movement.
  - Release pointer to center the knob and stop movement.
- Right bottom: circular `Jump` button.
  - Uses the existing virtual jump path, equivalent to pressing `Space`.
  - Does not affect keyboard `Space`, `W`, or `ArrowUp`.
- Right top: compact `Pause` button.
  - Uses the existing pause input path.

The joystick is input-layer polish only. It does not change movement physics, levels, collision, scoring, enemy behavior, or game state.

## 5. Preserved Web Release Page Behavior

The release page is still the default for ordinary browser visits.

Preserved:

- `index.html` structure.
- GitHub Pages root strategy.
- Release / showcase sections.
- Windows download guide.
- Roadmap and phase history.
- Browser Web playable canvas.
- Desktop keyboard controls.
- Mobile browser touch controls.

The Android app mode is activated only when the page appears to be running inside Android Tauri/WebView.

## 6. Preserved Windows Behavior

Preserved:

- Windows Tauri config.
- Windows NSIS packaging.
- Keyboard controls.
- Canvas game.
- Existing gameplay logic.

`npm.cmd run tauri:build` passed after the app-mode change and regenerated the Windows build outputs.

## 7. Commands Run

Inspection:

- `git status --short`
- `git status --branch --short`
- Read `index.html`
- Read `src/game.js`
- Read `src/styles.css`
- Read `README.md`
- Read `package.json`
- Read `src-tauri/tauri.conf.json`
- Listed `src-tauri/gen/android`
- Read Phase 14 and Phase 15 reports

Build and validation:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`
- `$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug`

Phase 16.5 repeated the same validation and Android debug build command after virtual joystick changes.

adb:

- `adb devices`
- `adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"`

## 8. Android Debug Build Result

Result: pass.

Build command:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug
```

Notes:

- The external Cargo target directory workaround is still required because the project path contains non-ASCII characters.
- `android.overridePathCheck=true` remains in the generated Android Gradle properties.
- Tauri/Gradle emitted warnings about deprecated Gradle features and experimental path-check override, but the debug build succeeded.

## 9. APK Output

Debug APK:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk
```

Observed size after Phase 16 rebuild:

```text
497200091 bytes
```

Automatically generated debug AAB:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\bundle\universalDebug\app-universal-debug.aab
```

Both are build artifacts and must not be committed.

## 10. adb Install Result

Device check:

```text
List of devices attached
10AF5S28KB004YC    device
```

Install command:

```powershell
adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

Install result:

```text
INSTALL_FAILED_ABORTED: User rejected permissions
```

Interpretation:

- adb detected an authorized device.
- The install did not complete because the phone rejected or canceled the permission/install prompt.
- The rebuilt Phase 16 APK has not been confirmed installed.
- Phase 16.5 rebuilt the APK again and adb still detected the same authorized device, but reinstall again failed with `INSTALL_FAILED_ABORTED: User rejected permissions`.

## 11. Known Issues

- Phase 16 / 16.5 APK install was blocked by phone-side permission rejection.
- The Android app-mode UI and virtual joystick need real-device confirmation after reinstall.
- The debug APK is still a large universal debug build.
- The Android build still depends on `D:\AIGAME_CARGO_TARGET` because of non-ASCII project path issues on Windows.
- Android warnings from Gradle/Tauri remain non-blocking.

## 12. Risk Notes

- Do not commit APK/AAB/build outputs.
- Do not create or commit signing files.
- Android mode detection depends on Tauri WebView globals/location plus Android user agent; if a future Tauri version changes these values, app-mode detection may need adjustment.
- Web release behavior should be rechecked in a browser before publishing if further CSS changes are made.
- Do not claim Phase 16.5 device UX pass until the rebuilt APK is installed and visually checked on the phone.

## 13. Next Phase Recommendation

Continue Phase 16 device verification before moving to a new feature phase:

1. Re-run install:

```powershell
adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

2. Approve the install prompt on the phone.
3. Open AIGAME on the phone.
4. Confirm the first screen looks like a game app:
   - AIGAME title visible.
   - Canvas visible quickly.
   - Start Game visible in the in-canvas menu.
   - How to Play visible in the in-canvas menu.
   - Virtual joystick visible in the lower-left corner.
   - Circular Jump button visible in the lower-right corner.
   - Small Pause button visible in the upper-right corner.
   - Release page sections hidden.
   - No `PHASE 12 RELEASE PAGE - V0.2.0-ALPHA` label is visible.
   - No Web/Windows showcase copy is visible.
5. Test touch controls, portrait hint, landscape play, sound, performance, pause, restart, and exit/close behavior.

Only after this pass should the project enter Phase 17.
