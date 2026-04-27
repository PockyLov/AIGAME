# Android Init Skill

Use this skill when preparing Tauri Android initialization for AIGAME.

## 1. Goal

- Verify Android development prerequisites.
- Run Tauri Android initialization only when the environment is complete.
- Preserve existing Windows/Tauri build and Web playable behavior.
- Do not build APK/AAB files in the init phase.

## 2. Prerequisite Environment Checks

Run and record:

- `node -v`
- `npm.cmd -v`
- `rustc -V`
- `cargo -V`
- `rustup target list --installed`
- `java -version`
- `where.exe java`
- `$env:JAVA_HOME`
- `where.exe adb`
- `where.exe sdkmanager`
- `$env:ANDROID_HOME`
- `$env:NDK_HOME`

Also check:

- `%LOCALAPPDATA%\Android\Sdk`
- `%LOCALAPPDATA%\Android\Sdk\platform-tools`
- `%LOCALAPPDATA%\Android\Sdk\cmdline-tools`
- `%LOCALAPPDATA%\Android\Sdk\build-tools`
- `%LOCALAPPDATA%\Android\Sdk\ndk`
- `C:\Program Files\Android\Android Studio\jbr`

Do not run Android init if Java, Android SDK, platform-tools, command-line tools, NDK, environment variables, or Android Rust targets are missing.

## 3. Init Command Selection

Prefer project-local Tauri CLI commands:

- `npx tauri android init`

Use `cargo tauri android init` only if the project is already using a global Cargo Tauri workflow.

Do not run Android build commands in this phase.

## 4. Generated File Checks

After init, inspect:

- `src-tauri/gen/android`
- `src-tauri/tauri.android.conf.json`
- changes to `src-tauri/tauri.conf.json`
- Android Gradle files
- `.gitignore` coverage for Android build output

Separate source files from generated build output before staging.

## 5. Forbidden

- No Android build.
- No APK or AAB generation.
- No signing.
- No Google Play.
- No iOS.
- No accounts.
- No leaderboard.
- No payment system.
- No backend service.
- No gameplay rewrite.
- No committing keystores, passwords, APKs, AABs, or build folders.

## 6. Windows/Web Regression Requirements

After init or skipped init, run as much as possible:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`

Confirm:

- GitHub Pages root path remains valid.
- Windows NSIS build still works.
- Web playable remains static.

## 7. Report Requirements

The phase report must include:

- Stage goal.
- Changed files.
- Environment check results.
- Init precondition status.
- Init result.
- Generated Android files.
- Preserved behavior.
- Commands run.
- Regression test results.
- Known issues.
- Risk notes.
- Next phase recommendation.
