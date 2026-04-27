# Phase 14 Android Debug APK Report

## 1. Stage Goal

Generate an Android debug APK for local or real-device testing after Phase 13 successfully initialized the Tauri Android project.

This phase allowed Android debug build only. It did not do release signing, Google Play work, iOS, accounts, leaderboards, payment, backend services, or gameplay changes.

## 2. Changed Files

Changed:

- `README.md`
- `package.json`
- `src-tauri/gen/android/gradle.properties`
- `docs/reports/PHASE_14_ANDROID_DEBUG_APK_REPORT.md`

Added:

- `src-tauri/icons/icon.png`

Generated but ignored build outputs:

- `src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk`
- `src-tauri/gen/android/app/build/outputs/bundle/universalDebug/app-universal-debug.aab`
- `src-tauri/gen/android/app/build/`
- `dist/`
- `src-tauri/target/`
- `D:\AIGAME_CARGO_TARGET`

The debug AAB was generated automatically by Tauri/Gradle during the debug build. It is not used for this phase and must not be committed.

## 3. Environment Check

Commands and results:

- `node -v`
  - Result: pass
  - Output: `v24.14.1`
- `npm.cmd -v`
  - Result: pass
  - Output: `11.11.0`
- `rustc -V`
  - Result: pass
  - Output: `rustc 1.95.0 (59807616e 2026-04-14)`
- `cargo -V`
  - Result: pass
  - Output: `cargo 1.95.0 (f2d3ce0bd 2026-03-21)`
- `rustup target list --installed`
  - Result: pass
  - Installed Android targets:
    - `aarch64-linux-android`
    - `armv7-linux-androideabi`
    - `i686-linux-android`
    - `x86_64-linux-android`
  - Also installed:
    - `x86_64-pc-windows-msvc`
- `java -version`
  - Result: pass
  - Output: OpenJDK `21.0.10`
- `where.exe java`
  - Result: pass
  - Output: `D:\Android\Android Studio\jbr\bin\java.exe`
- `where.exe adb`
  - Result: pass
  - Output: `D:\Android\Sdk\platform-tools\adb.exe`
- `where.exe sdkmanager`
  - Result: pass
  - Output: `D:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat`
- `$env:JAVA_HOME`
  - Result: pass
  - Output: `D:\Android\Android Studio\jbr`
- `$env:ANDROID_HOME`
  - Result: pass
  - Output: `D:\Android\Sdk`
- `$env:ANDROID_SDK_ROOT`
  - Result: pass
  - Output: `D:\Android\Sdk`
- `$env:NDK_HOME`
  - Result: pass
  - Output: `D:\Android\Sdk\ndk\30.0.14904198`

Path checks:

- `D:\Android\Android Studio\jbr`: exists
- `D:\Android\Sdk`: exists
- `D:\Android\Sdk\platform-tools`: exists
- `D:\Android\Sdk\cmdline-tools\latest\bin`: exists
- `D:\Android\Sdk\build-tools`: exists
- `D:\Android\Sdk\ndk`: exists
- `src-tauri\gen\android`: exists

## 4. Android Debug Build Command

The project has no dedicated Android build npm script. `package.json` now includes the minimal script required by the generated Android Gradle task:

```json
"tauri": "tauri"
```

The successful debug build command was:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'
npx.cmd tauri android build --debug
```

Reason:

- `npx.cmd` avoids the PowerShell `npx.ps1` execution-policy problem.
- `CARGO_TARGET_DIR` points to a pure ASCII path to avoid the NDK linker failing on the project path `D:\桌面desktop\AIGAME`.
- `--debug` keeps this phase to debug APK generation only.

## 5. Android Debug Build Result

Result: pass.

Problems encountered and fixed during the build:

- Missing Android icon:
  - Error: Tauri expected `src-tauri\icons\icon.png`.
  - Fix: generated `src-tauri\icons\icon.png` from the existing `src-tauri\icons\icon.ico`.
- NDK linker failed on non-ASCII target paths:
  - Error: linker could not open generated object files under `D:\桌面desktop\AIGAME`.
  - Fix: used `D:\AIGAME_CARGO_TARGET` as `CARGO_TARGET_DIR`.
- Gradle blocked non-ASCII project path:
  - Error: Android Gradle path check rejected the project path.
  - Fix: added `android.overridePathCheck=true` to `src-tauri/gen/android/gradle.properties`.
- Generated Gradle task called `npm run tauri ...`:
  - Error: `npm error Missing script: "tauri"`.
  - Fix: added `"tauri": "tauri"` to `package.json`.

Warnings observed:

- `android.overridePathCheck=true` is experimental.
- Java 21 warns about source/target 8 deprecation.
- Tauri/Android generated code emitted deprecation warnings.
- Gradle warns about deprecated features before Gradle 9.0.

These warnings did not block APK generation.

## 6. APK Output

APK generated:

- File name: `app-universal-debug.apk`
- Full path: `D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk`
- Size observed: `394902984` bytes
- Build type: debug
- Signing: debug build signing only, not release signing
- Git status: ignored through `src-tauri/gen/android/**/build/`

Additional automatic output:

- File name: `app-universal-debug.aab`
- Full path: `D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\bundle\universalDebug\app-universal-debug.aab`
- Size observed: `114880345` bytes
- Git status: ignored through Android build-output rules
- Use in this phase: none

No keystore, password file, `keystore.properties`, or `key.properties` was created.

## 7. adb / Device Test Result

Commands:

- `adb devices`
  - First result: failed in sandbox because adb could not create `C:\Users\CodexSandboxOffline\.android`.
  - Retried with elevated permissions.
- `adb devices`
  - Result: pass.
  - Output: `List of devices attached`
  - Devices: none.

No `adb install` was run because no connected and authorized Android device was detected.

## 8. Preserved Behavior

Preserved:

- Existing browser/Web playable files and GitHub Pages root path.
- Existing game logic in `src/game.js`.
- Existing UI and styles except no gameplay files were changed.
- Existing Windows Tauri build capability.
- Existing static `dist` copy workflow.

No gameplay mechanics were added or changed.

## 9. Commands Run

Git and inspection:

- `git status --short`
- `git status --branch --short`
- `git branch --show-current`
- `git branch`
- `Get-Content -Raw package.json`

Environment:

- `node -v`
- `npm.cmd -v`
- `rustc -V`
- `cargo -V`
- `rustup target list --installed`
- `java -version`
- `where.exe java`
- `where.exe adb`
- `where.exe sdkmanager`
- PowerShell environment variable checks for `JAVA_HOME`, `ANDROID_HOME`, `ANDROID_SDK_ROOT`, and `NDK_HOME`
- D-drive Android path checks

Android debug build attempts:

- `npx.cmd tauri android build --debug`
  - Result: failed initially because network access to `static.crates.io` was blocked.
- `npx.cmd tauri android build --debug` with network access
  - Result: failed because `src-tauri\icons\icon.png` was missing.
- `$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug`
  - Result: failed before Gradle path override because Android Gradle rejected the non-ASCII project path.
- `$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug`
  - Result: failed because generated Gradle task needed `npm run tauri`.
- `$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug`
  - Result: pass.

adb:

- `adb devices`
  - Result: failed in sandbox.
- `adb devices` with elevated permissions
  - Result: pass, no devices attached.

Regression:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`

Forbidden actions not performed:

- Release signing.
- Google Play upload.
- iOS build.
- Account, leaderboard, payment, or backend work.
- Gameplay logic changes.
- APK/AAB commit.
- Keystore or password file creation.

## 10. Regression Test Results

Passed:

- npm install.
- JavaScript syntax check.
- Web build.
- `build:web`.
- Windows Tauri build.
- Android debug APK build.
- APK output is ignored by Git.

Failed / not completed:

- Initial Android build attempts failed until build-environment fixes were applied.
- adb install was not run because no Android device was connected and authorized.

Windows build output after regression:

- `D:\桌面desktop\AIGAME\src-tauri\target\release\aigame.exe`
- `D:\桌面desktop\AIGAME\src-tauri\target\release\bundle\nsis\AIGAME_0.1.0_x64-setup.exe`

## 11. Known Issues

- The debug APK is large because it is a universal debug build with multiple ABIs.
- The project path contains non-ASCII characters, requiring `CARGO_TARGET_DIR` and `android.overridePathCheck=true` for the current Windows Android build.
- No real-device install or gameplay test has been performed yet.
- Java 21 and generated Android code produce warnings during Gradle build.
- Tauri debug build also generated an ignored debug AAB automatically.

## 12. Risk Notes

- APK/AAB build outputs must not be committed.
- Signing files must not be created or committed in this phase.
- The ASCII `CARGO_TARGET_DIR` workaround should be documented for future Android builds on this machine.
- A future release APK phase should review icon quality, package metadata, signing, ABI strategy, and APK size.

## 13. Next Phase Recommendation

Phase 15 can proceed to Android real-device testing:

1. Connect an Android phone with USB debugging enabled.
2. Run `adb devices` and confirm the device is listed as `device`.
3. Install the debug APK:

```bash
adb install -r src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```

4. Smoke test launch, menus, touch controls, gameplay, pause, restart, level clear, and performance.
5. Record Android version, device model, screen orientation behavior, and any WebView/audio issues.
