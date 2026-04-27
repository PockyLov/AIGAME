# Handoff to New Codex Account

## 1. Project Basic Information

- Project name: AIGAME
- Local path: `D:\桌面desktop\AIGAME`
- Current branch: `phase-14-android-debug-apk`
- Current stage: Phase 14 is complete. The next stage is Phase 15 Android real-device test.

## 2. Current Project Status

The project currently has:

- Windows installable build.
- Web playable version.
- Release / showcase page.
- Android Gradle project initialized.
- Android debug APK generated successfully.

The project has not done:

- Android real-device install test.
- Android release signing.
- Google Play.
- iOS.
- Account system.
- Leaderboard.
- Payment.
- Backend.
- Cloud save.

## 3. Completed Phases

Completed phases:

- Phase 09 Windows polish.
- Phase 10 Web playable.
- Phase 11 Android environment exploration.
- Phase 12 Release page / showcase page.
- Phase 13 Android init.
- Phase 14 Android debug APK build.

Related reports:

- `docs/reports/PHASE_09_WINDOWS_POLISH_REPORT.md`
- `docs/reports/PHASE_10_WEB_PLAYABLE_REPORT.md`
- `docs/reports/PHASE_11_ANDROID_APK_REPORT.md`
- `docs/reports/PHASE_12_RELEASE_PAGE_REPORT.md`
- `docs/reports/PHASE_13_ANDROID_INIT_REPORT.md`
- `docs/reports/PHASE_14_ANDROID_DEBUG_APK_REPORT.md`

## 4. Phase 14 Result

- Phase 14 result: PASS.
- Android debug build command:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug
```

- Debug APK path:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk
```

- Debug AAB path:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\bundle\universalDebug\app-universal-debug.aab
```

- APK/AAB files are build artifacts. Do not submit or commit them.
- Windows installer path:

```text
D:\桌面desktop\AIGAME\src-tauri\target\release\bundle\nsis\AIGAME_0.1.0_x64-setup.exe
```

- The Windows installer is also a build artifact. Do not submit or commit it.

## 5. Android Environment

Environment variables and tools:

- `JAVA_HOME=D:\Android\Android Studio\jbr`
- `ANDROID_HOME=D:\Android\Sdk`
- `ANDROID_SDK_ROOT=D:\Android\Sdk`
- `NDK_HOME=D:\Android\Sdk\ndk\30.0.14904198`
- Java path: `D:\Android\Android Studio\jbr\bin\java.exe`
- adb path: `D:\Android\Sdk\platform-tools\adb.exe`
- sdkmanager path: `D:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat`

Installed Rust Android targets:

- `aarch64-linux-android`
- `armv7-linux-androideabi`
- `i686-linux-android`
- `x86_64-linux-android`

Important workaround:

- The project path contains Chinese characters, so Android build uses an external Cargo target directory:

```text
D:\AIGAME_CARGO_TARGET
```

- Android debug build command must include:

```powershell
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'
```

- `src-tauri\gen\android\gradle.properties` contains:

```properties
android.overridePathCheck=true
```

## 6. Phase 14 Changed Files

Phase 14 changed or added:

- `README.md`
- `package.json`
- `src-tauri\gen\android\gradle.properties`
- `src-tauri\icons\icon.png`
- `docs\reports\PHASE_14_ANDROID_DEBUG_APK_REPORT.md`

## 7. Important Commands

Common validation and build commands:

```powershell
npm.cmd install
node --check src\game.js
npm.cmd run build
npm.cmd run build:web
npm.cmd run tauri:build
$env:CARGO_TARGET_DIR='D:\AIGAME_CARGO_TARGET'; npx.cmd tauri android build --debug
```

Use `npx.cmd`, not bare `npx`, because PowerShell may block `npx.ps1`.

## 8. Do Not Submit These

Do not commit:

- `dist`
- `src-tauri/target`
- `*.exe`
- `*.msi`
- `*.zip`
- `*.apk`
- `*.aab`
- `*.apks`
- `*.keystore`
- `keystore.properties`
- `D:\AIGAME_CARGO_TARGET`
- `src-tauri\gen\android\app\build`

## 9. Next Stage

Next stage:

```text
Phase 15: Android real-device test
```

Phase 15 goals:

- Connect an Android phone.
- Enable Developer Options.
- Enable USB debugging.
- Confirm `adb devices` shows an authorized device.
- Install the debug APK.
- Launch the game.
- Test touch buttons.
- Test landscape display.
- Test sound effects.
- Test performance.
- Record issues in a Phase 15 report.

Install command:

```powershell
adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

## 10. Phase 15 Boundaries

Allowed:

- adb device detection.
- Debug APK install.
- Real-device smoke test.
- Touch control testing.
- Android display/orientation notes.
- Report updates.

Forbidden:

- Release signing.
- Google Play.
- iOS.
- Account system.
- Leaderboard.
- Payment.
- Backend.
- Cloud save.
- Major game logic rewrite.
- Committing APK/AAB/build outputs.

## 11. Required Reading for New Codex

New Codex should read:

- `README.md`
- `AGENTS.md`
- `docs/reports/HANDOFF_TO_NEW_CODEX_ACCOUNT.md`
- `docs/reports/PHASE_14_ANDROID_DEBUG_APK_REPORT.md`
- `docs/skills/android-apk-skill.md`
- `docs/skills/android-init-skill.md`
- `docs/skills/release-build-skill.md`
- `docs/skills/qa-report-skill.md`

## 12. First Prompt for New Codex Account

Copy this prompt into the new Codex account:

```text
You are now taking over the project at D:\桌面desktop\AIGAME.

First, read these files:
- README.md
- AGENTS.md
- docs/reports/HANDOFF_TO_NEW_CODEX_ACCOUNT.md
- docs/reports/PHASE_14_ANDROID_DEBUG_APK_REPORT.md
- docs/skills/android-apk-skill.md
- docs/skills/android-init-skill.md
- docs/skills/release-build-skill.md
- docs/skills/qa-report-skill.md

Do not modify code yet.
Do not run Android build.
Do not generate APK/AAB.
Do not do signing, Google Play, iOS, accounts, leaderboard, payment, backend, or cloud save.

Only output:
1. Current project status.
2. Current branch and phase.
3. What Phase 14 completed.
4. What Phase 15 should do next.
5. Any risks or precautions before testing on a real Android device.
```
