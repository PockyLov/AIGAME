# Phase 15 Android Real-Device Test Report

## 1. Stage Goal

Install the Phase 14 Android debug APK on a real Android device and perform basic smoke testing on device.

This phase did not allow release signing, Google Play, iOS, accounts, leaderboards, payments, backend services, cloud save, major gameplay rewrites, UI redesign, or committing APK/AAB/build outputs.

## 2. Changed Files

Changed:

- `README.md`
- `docs/reports/PHASE_15_ANDROID_REAL_DEVICE_TEST_REPORT.md`

Files intentionally not changed:

- `index.html`
- `src/game.js`
- `src/styles.css`
- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `src-tauri/gen/android/gradle.properties`

Generated build outputs were not staged or committed.

## 3. APK Under Test

APK path:

```text
D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk
```

APK check:

- Exists: yes.
- Size: `394902984` bytes.
- Package type: debug APK, based on Phase 14 output name and path `universal\debug\app-universal-debug.apk`.
- Git ignore status: ignored through `src-tauri/gen/android/app/build/`.

No Android build was run in Phase 15.

## 4. adb Device Result

Commands:

```powershell
adb devices
```

First result:

- Failed in sandbox because adb could not create `C:\Users\CodexSandboxOffline\.android`.
- This was an execution environment permission issue, not a device result.

Retried with elevated permissions:

```text
List of devices attached
```

Result:

- adb is available and runs.
- No Android device was connected and authorized.
- No `unauthorized` device was shown.
- No `device` entry was shown.

## 5. APK Install Result

APK install command was not executed because `adb devices` did not show an authorized `device`.

Required install command for the next attempt:

```powershell
adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

Install result:

- Not installed.
- No `INSTALL_FAILED` result was produced because installation was not attempted.

Next user/device action:

- Connect the Android phone with a data-capable USB cable.
- Enable Developer Options.
- Enable USB debugging.
- Accept the RSA authorization prompt on the phone.
- Run `adb devices` again and confirm the device appears as `device`.

## 6. Manual Device Test Checklist

No real-device manual test was performed because no authorized Android device was detected.

Checklist status:

- App opens: not tested.
- Startup screen is normal: not tested.
- Page fills the screen: not tested.
- Game canvas is visible: not tested.
- Touch buttons are visible: not tested.
- Left / Right sustained movement works: not tested.
- Jump input latency is acceptable: not tested.
- Pause works: not tested.
- Start Game works: not tested.
- How to Play works: not tested.
- Landscape experience is normal: not tested.
- Portrait hint is normal: not tested.
- Sound effects play: not tested.
- Game performance is acceptable: not tested.
- No crash: not tested.
- Back button / app close behavior is normal: not tested.

Do not mark these as pass until a user or tester confirms them on a physical Android device.

## 7. Issues Found

Confirmed issue:

- No authorized Android device was detected by adb, so APK installation and device testing could not proceed.

No gameplay or app runtime issues were found because the APK was not installed or launched on a device.

## 8. Preserved Behavior

Preserved:

- Existing Web playable files and GitHub Pages root strategy.
- Existing Windows/Tauri build capability.
- Existing Android debug APK artifact from Phase 14.
- Existing game logic.
- Existing UI and touch-control code.

No Android build, release signing, Google Play work, iOS work, account system, leaderboard, payment, backend, cloud save, gameplay rewrite, or UI redesign was performed.

## 9. Commands Run

Git:

- `git status --short`
- `git status --branch --short`
- `git branch --show-current`
- `git branch`
- `git switch -c phase-15-android-real-device-test`

APK check:

- PowerShell `Test-Path` / `Get-Item` check for the debug APK.
- `git status --ignored --short src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk`

adb:

- `adb devices`
- `adb devices` with elevated permissions

Regression:

- `npm.cmd install`
- `node --check src\game.js`
- `npm.cmd run build`
- `npm.cmd run build:web`
- `npm.cmd run tauri:build`

Commands intentionally not run:

- Android build.
- `adb install -r ...`
- Release signing.
- Google Play upload.

## 10. Regression Test Results

Passed:

- APK existence check.
- APK ignored-by-Git check.
- adb command availability check after elevation.
- `npm.cmd install`.
- `node --check src\game.js`.
- `npm.cmd run build`.
- `npm.cmd run build:web`.
- `npm.cmd run tauri:build`.

Failed / blocked:

- `git switch -c phase-15-android-real-device-test`
  - Failed with: `fatal: cannot lock ref 'refs/heads/phase-15-android-real-device-test': Unable to create 'D:/桌面desktop/AIGAME/.git/refs/heads/phase-15-android-real-device-test.lock': Permission denied`
  - Work continued on current branch `phase-14-android-debug-apk`.
- Initial sandboxed `adb devices`
  - Failed because adb could not create `C:\Users\CodexSandboxOffline\.android`.
  - Retried successfully with elevated permissions.
- APK install and manual device testing
  - Blocked because no authorized Android device was connected.

Windows build output after regression:

- `D:\桌面desktop\AIGAME\src-tauri\target\release\aigame.exe`
- `D:\桌面desktop\AIGAME\src-tauri\target\release\bundle\nsis\AIGAME_0.1.0_x64-setup.exe`

## 11. Known Issues

- The requested Phase 15 branch could not be created due Git ref lock permission error.
- No Android device was connected and authorized in adb.
- Real-device install and smoke testing are still pending.
- The APK is a large universal debug APK.
- Android build still depends on Phase 14 workarounds if it needs to be rebuilt later:
  - `CARGO_TARGET_DIR=D:\AIGAME_CARGO_TARGET`
  - `android.overridePathCheck=true`

## 12. Risk Notes

- Do not commit APK/AAB/build outputs.
- Do not create or commit keystore/password files.
- Do not claim real-device pass until the APK is installed and tested on an actual phone.
- If adb shows `unauthorized` later, the phone must accept the USB debugging authorization prompt before installation.
- If adb shows an empty list, check cable, USB mode, drivers, Developer Options, and USB debugging.

## 13. Next Phase Recommendation

Continue Phase 15 once a real Android device is connected:

1. Connect Android phone with a data-capable USB cable.
2. Enable Developer Options.
3. Enable USB debugging.
4. Run:

```powershell
adb devices
```

5. Confirm the device appears as `device`.
6. Install:

```powershell
adb install -r "D:\桌面desktop\AIGAME\src-tauri\gen\android\app\build\outputs\apk\universal\debug\app-universal-debug.apk"
```

7. Manually test launch, menus, touch buttons, orientation, audio, performance, crashes, and back/close behavior.
8. Update this report with confirmed pass/fail results.

Do not move to a release-signing phase until real-device debug testing has been completed and documented.
