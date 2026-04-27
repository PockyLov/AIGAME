# Phase 13 Android Init Report

## 1. Stage Goal

Retry Phase 13 after the Android toolchain and Git branch issues were fixed. The goal was limited to Android environment verification and `tauri android init`.

This phase explicitly did not run Android build, generate APK/AAB files, configure signing, start Google Play work, add iOS, add accounts, add leaderboards, add payment, add backend services, or modify gameplay logic.

## 2. Changed Files

Changed documentation and ignore rules:

- `README.md`
- `.gitignore`
- `docs/reports/PHASE_13_ANDROID_INIT_REPORT.md`

Generated Android initialization files:

- `src-tauri/gen/android/.editorconfig`
- `src-tauri/gen/android/.gitignore`
- `src-tauri/gen/android/build.gradle.kts`
- `src-tauri/gen/android/gradle.properties`
- `src-tauri/gen/android/gradlew`
- `src-tauri/gen/android/gradlew.bat`
- `src-tauri/gen/android/settings.gradle`
- `src-tauri/gen/android/app/`
- `src-tauri/gen/android/buildSrc/`
- `src-tauri/gen/android/gradle/`

Files intentionally not changed:

- `index.html`
- `src/game.js`
- `src/styles.css`
- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `src-tauri/src/main.rs`
- `src-tauri/src/lib.rs`
- `scripts/copy-web.mjs`

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

## 4. Android Init Preconditions

Required preconditions:

- Java available: met.
- `JAVA_HOME` valid: met.
- `adb` available: met.
- `sdkmanager` available: met.
- `ANDROID_HOME` valid: met.
- `ANDROID_SDK_ROOT` valid: met.
- `NDK_HOME` valid: met.
- Rust Android targets installed: met.
- Git working tree state controllable: met; current branch is `phase-13-android-init-retry`.

The project has no Android-specific npm script. The selected command was:

```bash
npx.cmd tauri android init
```

Reason:

- `package.json` includes `@tauri-apps/cli`.
- The local Tauri CLI is preferred over assuming a global Cargo Tauri install.
- `npx` without `.cmd` is blocked by PowerShell execution policy on this machine, while `npx.cmd` works.

## 5. Android Init Result

Android init was executed and succeeded.

Command:

```bash
npx.cmd tauri android init
```

Key output:

- `Generating Android Studio project...`
- `Project generated successfully!`
- `Using installed NDK: D:\Android\Sdk\ndk\30.0.14904198`

The first attempted command was:

```bash
npx tauri android init
```

It failed before reaching Tauri because PowerShell blocked `D:\npx.ps1` under the current execution policy. This was an environment shell-entry issue, not a Tauri or project code issue.

## 6. Generated Android Files

Generated:

- `src-tauri/gen/android`
- Android Gradle project under `src-tauri/gen/android`
- Android app module under `src-tauri/gen/android/app`
- Android buildSrc support under `src-tauri/gen/android/buildSrc`
- Gradle wrapper under `src-tauri/gen/android/gradle`

Checks:

- `src-tauri/gen/android`: present.
- `src-tauri/tauri.android.conf.json`: not generated.
- Android Gradle project: present.
- `src-tauri/tauri.conf.json`: not modified.
- Windows Tauri configuration: unchanged.

`.gitignore` was updated because the previous rule ignored all of `src-tauri/gen/`, which hid the generated Android source project from Git. The new rule allows `src-tauri/gen/android` and `src-tauri/gen/schemas` to be tracked while still ignoring Gradle build folders, APK/AAB files, signing files, and Windows build artifacts.

## 7. Preserved Behavior

Preserved:

- Web playable root path.
- GitHub Pages static path strategy.
- Existing game logic.
- Existing keyboard and touch controls.
- Existing Windows/Tauri configuration.
- Existing package scripts.
- Existing Tauri NSIS build capability.

No Android build command was executed, and no APK/AAB/signing output was generated.

## 8. Commands Run

Git:

- `git status --short`
  - Result: pass.
- `git status --branch --short`
  - Result: pass.
  - Current branch: `phase-13-android-init-retry`.
- `git branch --show-current`
  - Result: pass.
  - Output: `phase-13-android-init-retry`.
- `git branch`
  - Result: pass.

Project inspection:

- `Get-Content -Raw package.json`
- `Get-Content -Raw src-tauri\tauri.conf.json`
- `Get-Content -Raw src-tauri\Cargo.toml`
- `Get-ChildItem -Force src-tauri`
- `Test-Path src-tauri\gen\android`
- `Test-Path src-tauri\tauri.android.conf.json`
- `Get-Content -Raw .gitignore`

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
- D-drive Android SDK/JDK path checks

Android init:

- `npx tauri android init`
  - Result: failed due PowerShell blocking `npx.ps1`.
- `npx.cmd tauri android init`
  - Result: pass.

Regression:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`
  - Result: pass.
  - Windows app output: `D:\桌面desktop\AIGAME\src-tauri\target\release\aigame.exe`
  - Windows NSIS output: `D:\桌面desktop\AIGAME\src-tauri\target\release\bundle\nsis\AIGAME_0.1.0_x64-setup.exe`

Forbidden commands not run:

- `npx tauri android build`
- `npm run tauri android build`
- `cargo tauri android build`

## 9. Regression Test Results

Passed:

- npm dependencies installed/up to date.
- JavaScript syntax check passed.
- Web build passed.
- `build:web` passed.
- Windows Tauri NSIS build passed.
- Android init succeeded.

Failed:

- `npx tauri android init` failed only because PowerShell blocked `npx.ps1`.

Not run by design:

- Android build.
- APK/AAB generation.
- APK install with adb.
- Android signing.

## 10. Known Issues

- The plain `npx` PowerShell shim is blocked by execution policy. Use `npx.cmd` in PowerShell for Tauri commands on this machine.
- `src-tauri/tauri.android.conf.json` was not generated by Tauri init; the generated Android project currently relies on the existing Tauri configuration and Gradle project.
- Android debug APK has not been built yet.
- No Android device install test has been performed.

## 11. Risk Notes

- Generated Android launcher icons are Tauri default output and should be reviewed before public Android release work.
- Android build may uncover additional Gradle, SDK package, or Rust linking issues in Phase 14.
- Signing files and passwords must stay out of Git.
- `src-tauri/gen/android/**/build/`, `.gradle`, `local.properties`, APK/AAB files, and keystores remain ignored.

## 12. Next Phase Recommendation

Phase 14 can proceed to Android debug APK only after reviewing the generated Android project. Recommended next steps:

1. Run a no-signing Android debug build command selected from the current Tauri CLI.
2. Record the APK path if build succeeds.
3. If an Android device is connected, run `adb devices` and optionally install the debug APK.
4. Keep Windows and Web regression checks in the phase report.
5. Do not create release signing material until a later explicit signing phase.
