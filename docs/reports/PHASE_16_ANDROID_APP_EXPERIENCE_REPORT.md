# Phase 16 Android App Experience Report

## 1. Stage Goal

Make the Android debug app open and play like a focused mobile game instead of showing the full Web release / showcase page.

Phase 16 remained inside Android app experience polish only. It did not do release signing, Google Play, iOS, accounts, leaderboards, payments, backend services, cloud save, major gameplay rewrites, Web release page deletion, or Windows build removal.

## 2. User Feedback

Phase 15 feedback:

- The Phase 14 debug APK was installed on a real Android phone.
- The app opened.
- The first screen looked like the Web release / showcase page or developer-facing portfolio page, not like a focused Android game app.

Phase 16.5 screenshot feedback:

- Android app still showed `PHASE 12 RELEASE PAGE - V0.2.0-ALPHA`.
- Android app still showed Web/Windows release copy such as `playable on Web and Windows`.
- Bottom touch controls were four large rectangular buttons: `Left`, `Right`, `Pause`, and `Jump`.
- User requested mobile play with a virtual joystick instead of rectangular movement buttons.

Phase 16.6 real-device feedback:

- Android app installed and opened after Phase 16.5.
- The app still opened in portrait.
- The 16:9 game area appeared embedded near the top of the portrait screen and occupied roughly one third of the screen.
- User explicitly required Android mobile play to be landscape-only, not a portrait page with a horizontal game embedded inside it.

Phase 16.7 real-device feedback:

- Android is now forced to landscape.
- Virtual joystick, Jump, and Pause controls exist.
- The game still looked like a fixed 16:9 game area embedded in a wider phone landscape viewport.
- User requested Android to adapt better to phone landscape aspect ratios without stretching the game.

Phase 16.8 real-device feedback:

- Phase 16.7 still did not make the app feel like a true fullscreen landscape mobile game.
- The problem was not only fixed 16:9 logic. Android app-mode still had webpage layout structure, top title/header space, document flow, container padding, and system bars affecting the available canvas area.
- User requested Android true fullscreen landscape game layout, while preserving Web release page and Windows build behavior.

Phase 16.9 real-device feedback:

- Phase 16.8 made the Android landscape fullscreen ratio basically normal.
- Release page copy and webpage-like layout were clearly improved.
- Touch operation still felt delayed or not smooth on the phone.
- User requested mobile joystick, Jump, and Pause responsiveness polish before any new phase or gameplay content.

## 3. Changed Files

Changed:

- `README.md`
- `src/game.js`
- `src/styles.css`
- `src-tauri/gen/android/app/src/main/AndroidManifest.xml`
- `src-tauri/gen/android/app/src/main/java/com/aigame/prototype/MainActivity.kt`
- `docs/reports/PHASE_15_ANDROID_REAL_DEVICE_TEST_REPORT.md`
- `docs/reports/PHASE_16_ANDROID_APP_EXPERIENCE_REPORT.md`

Files intentionally not changed:

- `index.html`
- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- Android Gradle build scripts
- Core level goals, scoring, enemy, collect, and completion rules

## 4. Android App Mode Design

Why Android originally showed the release page:

- Tauri Android loads the same static frontend copied into `dist`.
- The frontend starts at `index.html`.
- `index.html` is the Phase 12 release / showcase page.
- The canvas game is embedded inside the `Play Online` section, so Android displayed the long release page before the player reached the game.

Implemented approach:

- `src/game.js` detects Android Tauri/WebView context.
- When detected, it adds `android-mode` and `app-mode` to `body`.
- When not detected, it adds `web-release-mode`.
- `?mode=app` remains as a local/manual fallback.

Android app-mode hides release-page-only sections:

- Phase 12 version label.
- Web/Windows intro copy.
- Windows download guide.
- Roadmap / known limits section.
- Version timeline.
- Developer-facing info grid.
- Release page action links.

Android app-mode keeps visible:

- AIGAME title.
- Canvas game area.
- In-canvas Start Game and How to Play.
- Mobile game control layer.
- Portrait orientation hint as a fallback.

## 4.1 Phase 16.5 Mobile Joystick Design

The old mobile Web touch buttons still exist for ordinary mobile browser behavior, but app-mode hides them.

Android app-mode now uses a canvas overlay control layer:

- Left bottom: circular virtual joystick.
- Drag left adds `ArrowLeft` to the existing input set.
- Drag right adds `ArrowRight` to the existing input set.
- Returning near center clears left/right movement.
- Releasing the pointer centers the knob and stops movement.
- Right bottom: circular `Jump` button using the existing virtual jump path.
- Right top: compact `Pause` button using the existing pause input path.

The joystick is input-layer polish only. It does not change movement physics, levels, collision, scoring, enemy behavior, or game state.

## 4.2 Phase 16.6 Landscape-Only Design

Why the app still opened as portrait:

- The generated Android `AndroidManifest.xml` did not set a screen orientation for `MainActivity`.
- Android allowed portrait orientation.
- The Web content rendered the 16:9 canvas inside a portrait WebView, making the game look like a horizontal strip near the top of the phone screen.

Android fix:

- `src-tauri/gen/android/app/src/main/AndroidManifest.xml` sets the main activity to landscape:

```xml
android:screenOrientation="landscape"
```

Frontend layout fix:

- `app-mode` uses `100vh` / `100dvh` and hides overflow.
- `.page-shell` becomes a full-height flex column.
- The play section and game shell flex to fill the available landscape viewport.
- `.stage-wrap` flexes as the main game area.
- HUD is compact.
- Developer-facing controls text is hidden in app-mode.
- The virtual joystick, Jump, and Pause controls remain as an overlay on the game area.

## 4.3 Phase 16.7 Responsive Landscape Viewport

Root cause of the remaining aspect problem:

- The game originally used a fixed 960 by 540 logical canvas, which is 16:9.
- Android landscape phones are often wider than 16:9.
- CSS could make the canvas occupy the available landscape area, but the internal canvas backing size was still fixed at 960 by 540.
- That made the game either look like a fixed 16:9 image inside a wider screen or risk CSS-level stretching.

Responsive solution:

- Android app-mode keeps the logical height fixed at 540.
- Android app-mode calculates the actual `.stage-wrap` aspect ratio.
- The canvas backing width becomes `max(960, round(540 * stageAspectRatio))`.
- Wider phones therefore see a wider horizontal portion of the game world.
- The canvas backing aspect matches the displayed stage aspect, so player, platforms, sparks, patrol bot, gate, and HUD are not stretched.
- Ground surfaces that reached the original 960px right edge extend to the new responsive world width, preventing accidental gaps in the widened viewport.
- Ordinary browser / GitHub Pages behavior remains on the original 960 by 540 canvas unless Android app-mode is active.

This is a minimal viewport polish change, not a gameplay redesign.

## 4.4 Phase 16.8 True Fullscreen Landscape Layout

Why Phase 16.7 was not enough:

- Phase 16.7 changed the canvas backing width, but the Android app still lived inside the Web release page layout.
- `.playable-header` still took space at the top.
- The app body still had page padding.
- `.page-shell`, `.play-section`, and `.game-shell` still behaved like document-flow layout containers.
- The HUD still occupied layout space below the canvas instead of being a pure overlay.
- The Android system status/navigation bars could still reduce the usable WebView area.

Android app-mode layout changes:

- `body.app-mode` is now fixed to the viewport with `inset: 0`, `100vw`, `100dvh`, no padding, and hidden overflow.
- `.page-shell`, `.play-section`, `.game-shell`, and `.stage-wrap` are fixed fullscreen layers in app-mode.
- `.playable-header` is hidden in app-mode, so the top `AIGAME` page title no longer consumes screen space.
- `.orientation-tip`, release copy, Windows download guide, roadmap, known limits, timeline, section headings, and touch button text remain hidden in app-mode.
- `.stage-wrap` removes border, shadow, margin, and document-flow sizing in app-mode.
- `canvas` is sized to the full viewport in app-mode.
- HUD is changed to a fixed overlay near the top-left/top-right area instead of taking layout height.
- Virtual joystick, Jump, and Pause remain overlay controls and do not affect canvas size.

Android native immersive mode:

- `MainActivity.kt` now calls a small `enterImmersiveMode()` helper on create and when window focus returns.
- The helper uses sticky immersive system UI flags to hide the status bar and navigation bar where Android allows it.
- `AndroidManifest.xml` keeps `android:screenOrientation="landscape"`.

This phase still does not add release signing, Play Store logic, accounts, backend services, or new gameplay.

## 4.5 Phase 16.9 Mobile Input Responsiveness

Input delay analysis:

- The joystick already used pointer events, but it wrote directly into the shared keyboard `keys` set.
- Resetting the joystick also deleted `ArrowLeft` / `ArrowRight` from `keys`, which could interfere with parallel keyboard state and made the touch path less explicit.
- The joystick activation threshold was `28%` of the joystick radius, so small drags could feel unresponsive.
- Jump used `pointerdown`, but its main path was `justPressed.add("Space")`, meaning it normally waited for the next global input pass before setting the jump buffer.
- Pause used `pointerdown`, but its main path was `justPressed.add("KeyP")`, meaning it normally waited for the next global input pass before toggling pause.
- App-mode already had `touch-action: none` on controls, but not every fullscreen app shell layer disabled tap highlight, callout, selection, overscroll, and context menu behavior.

Implemented input changes:

- Added a dedicated `mobileInput` state for mobile left/right movement.
- `isLeftPressed()` and `isRightPressed()` now read keyboard keys and `mobileInput`, preserving desktop keyboard controls.
- The virtual joystick now writes directly to `mobileInput.left` / `mobileInput.right`.
- Releasing the joystick clears only `mobileInput`, not keyboard state.
- The joystick activation threshold was reduced from `28%` to `16%` of the radius for faster directional response.
- Jump now calls `triggerVirtualJump()` on `pointerdown`.
- If the game is playing, `triggerVirtualJump()` writes `player.jumpBufferTimer = physics.jumpBuffer` immediately.
- Pause now calls `triggerVirtualPause()` on `pointerdown`.
- If the game is playing, `triggerVirtualPause()` switches to paused state immediately; if paused, it resumes immediately.
- App-mode CSS now disables more mobile touch interference with `touch-action: none`, `user-select: none`, `-webkit-user-select: none`, `-webkit-touch-callout: none`, `-webkit-tap-highlight-color: transparent`, and `overscroll-behavior: none` on the fullscreen shell and controls.
- Android app-mode also prevents `contextmenu` events.

No levels, enemies, collectibles, physics constants, map geometry, scoring rules, or core gameplay content were changed.

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

Android app-mode is activated only when the page appears to be running inside Android Tauri/WebView, or when `?mode=app` is used for manual verification.

## 6. Preserved Windows Behavior

Preserved:

- Windows Tauri config.
- Windows NSIS packaging.
- Keyboard controls.
- Canvas game.
- Existing gameplay rules.

`npm.cmd run tauri:build` passed after Phase 16.9 and regenerated the Windows build outputs.

## 7. Commands Run

Inspection:

- `git status --short`
- `git branch --show-current`
- Read `src/game.js`
- Read `src/styles.css`
- Read `README.md`
- Read `src-tauri/gen/android/app/src/main/AndroidManifest.xml`
- Read `src-tauri/gen/android/app/src/main/java/com/aigame/prototype/MainActivity.kt`
- Read generated `TauriActivity.kt` to confirm `MainActivity` is the safe customization point
- Inspected joystick, Jump, Pause, keyboard input, game loop, and app-mode CSS input handling
- Read Phase 14, Phase 15, and Phase 16 reports

Validation and build:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`
- `$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug`

adb:

- `adb devices`
- `adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"`

## 8. Android Debug Build Result

Result: pass after rerun with the external Cargo target directory accessible.

Build command:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug
```

Notes:

- One sandboxed run failed with `failed to open: D:\AIGAME_CARGO_TARGET\debug\.cargo-lock` / `拒绝访问。 (os error 5)` because the external Cargo target directory is outside the workspace sandbox.
- The same command passed when run with the required filesystem access.
- The external Cargo target directory workaround is still required because the project path contains non-ASCII characters.
- `android.overridePathCheck=true` remains in the generated Android Gradle properties.
- Tauri/Gradle emitted warnings about deprecated Gradle features and experimental path-check override, but the debug build succeeded.
- Phase 16.8 emitted Kotlin deprecation warnings for legacy immersive system UI flags. They are non-blocking and the APK was generated.

## 9. APK Output

Debug APK:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk
```

Observed size after Phase 16.9 rebuild:

```text
497200859 bytes
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
Performing Streamed Install
Success
```

The Phase 16.9 first install attempt timed out after 124 seconds. `adb devices` still showed `10AF5S28KB004YC    device`. A retry with a longer timeout completed successfully.

The Phase 16.9 debug APK was installed successfully. Real-device confirmation of the improved joystick, Jump, and Pause responsiveness is still pending user review.

## 11. Known Issues

- The user still needs to confirm on the real phone that joystick movement starts immediately and remains stable while held.
- The user still needs to confirm Jump triggers immediately on press.
- The user still needs to confirm Pause toggles immediately on press.
- The debug APK is still a large universal debug build.
- The Android build still depends on `D:\AIGAME_CARGO_TARGET` because of non-ASCII project path issues on Windows.
- Android warnings from Gradle/Tauri remain non-blocking.
- This phase did not perform release signing or Play Store preparation.

## 12. Risk Notes

- Do not commit APK/AAB/build outputs.
- Do not create or commit signing files.
- Android mode detection depends on Tauri WebView globals/location plus Android user agent; if a future Tauri version changes these values, app-mode detection may need adjustment.
- Web release behavior should be rechecked in a browser before publishing if further CSS changes are made.
- Do not claim Phase 16.9 mobile input pass until the installed app is checked on the phone.

## 13. Next Phase Recommendation

Stay in Phase 16 until the installed APK is checked on the phone.

User should confirm:

- Virtual joystick responds immediately on touch.
- Small left/right drags trigger movement without feeling mushy.
- Holding the joystick keeps movement stable without dropping input.
- Releasing the joystick stops movement immediately.
- Circular Jump button triggers jump immediately on press.
- Pause button toggles pause immediately on press.
- No unwanted horizontal or vertical scrolling appears.
- No long-press selection, tap highlight, browser context menu, or page gesture interferes with play.
- Start Game, How to Play, pause, restart, level clear, sound, and close behavior still work.

Only after this real-device confirmation should the project move toward Phase 17.
