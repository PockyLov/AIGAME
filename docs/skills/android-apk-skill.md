# Android APK Skill

Use this skill when exploring a minimal Android debug APK path for the existing AIGAME Tauri project.

## 1. Stage Goal

- Explore whether the current static web game plus Tauri v2 project can initialize Android support.
- Build a debug APK only when the environment is complete.
- Preserve Windows desktop build and GitHub Pages Web playable behavior.
- Do not prepare Google Play release or production signing in this stage.

## 2. Environment Checks

Record these before Android init or build:

- `node -v`
- `npm -v` or `npm.cmd -v` on PowerShell if `npm.ps1` is blocked
- `rustc -V`
- `cargo -V`
- `rustup target list --installed`
- `java -version`
- `JAVA_HOME`
- `where java`
- `where adb`
- `where sdkmanager`
- Android Studio install path
- Android SDK path
- NDK path
- Android platform-tools path
- Android build-tools path
- Android command-line tools path

## 3. Build Checks

Before Android work:

- Confirm `package.json` scripts.
- Confirm Tauri CLI is available.
- Confirm `npm run build:web` still works.
- Confirm Git working state and branch creation.

Android init/build commands should match the current project. Prefer local Tauri CLI through npm/npx, for example:

- `npx tauri android init`
- `npx tauri android build --debug`

Only run Android init/build when Java, Android SDK, platform-tools, build-tools, command-line tools, and required Rust Android targets are available.

## 4. Forbidden

- No iOS.
- No Google Play publishing.
- No account system.
- No leaderboard.
- No payment system.
- No backend service.
- No complex native Android feature work.
- No large UI framework.
- No copyrighted assets.
- No deletion of Windows/Tauri build capability.
- No deletion of Web playable capability.

## 5. Build Artifact Ignore Rules

Do not commit:

- `src-tauri/target/`
- `src-tauri/gen/android/**/build/`
- `src-tauri/gen/android/**/.gradle/`
- `*.apk`
- `*.aab`
- `*.apks`
- `*.exe`
- `*.msi`
- `*.zip`
- `dist/`

If Tauri Android source files are generated and intentionally kept, separate source files from build outputs before staging.

## 6. Keystore Safety Rules

Do not commit:

- `*.jks`
- `*.keystore`
- `keystore.properties`
- `key.properties`
- signing passwords
- private keys
- release signing credentials

Debug APKs may use debug signing for local testing only. Production signing is out of scope for this stage.

## 7. Windows/Web Regression Requirements

After Android exploration, run as much as possible:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build` when environment/time allows

Confirm:

- GitHub Pages root path remains valid.
- Tauri Windows config remains valid.
- No Android build output is committed.
