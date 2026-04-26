# AIGAME Platformer Prototype

An original 2D side-scrolling platformer web game prototype. The current version is a tiny playable first level with keyboard movement, jumping, gravity, ground collision, energy sparks, one patrol bot, a gap hazard, clearer route cues, and a glowing exit gate.

## Run Locally

No package install is required for the current version. Use any static file server from the project root.

With Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a desktop browser, but a local server is recommended for normal development.

## Build

There is no build step in this version. The game is a portable static web page made from:

- `index.html`
- `src/styles.css`
- `src/game.js`

## Deliver to Another Computer

Send the project folder with the files above, plus this `README.md`. On the other computer:

1. Install Python if no static file server is already available.
2. Open a terminal in the project folder.
3. Run `python -m http.server 8000`.
4. Open `http://localhost:8000` in a desktop browser.

The game does not require a backend, database, account system, internet connection, or absolute local path.

## Deploy to GitHub Pages

This project is ready for GitHub Pages as a static site from the repository root. The page uses relative paths:

- `src/styles.css`
- `src/game.js`

To publish it from GitHub:

1. Push the project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. In the left sidebar, open `Pages`.
5. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
6. Set `Branch` to `main`.
7. Set the folder to `/ (root)`.
8. Click `Save`.
9. Wait for GitHub Pages to publish the site.

The published URL usually looks like:

```text
https://<your-github-username>.github.io/<repository-name>/
```

GitHub Pages sites are publicly accessible by default. Do not publish private, licensed, or sensitive content in this repository unless you intend it to be public.

This repository includes `.nojekyll` so GitHub Pages serves the static files directly without Jekyll processing.

## Controls

- Move left: `ArrowLeft` or `A`
- Move right: `ArrowRight` or `D`
- Jump: `Space`, `ArrowUp`, or `W`

## How to Play

Collect energy sparks to increase the score. The sparks also mark the intended route: move from the safe left ground, jump toward the first platform, cross the gap, then head for the glowing exit gate. Avoid the patrol bot from the side, or land on it from above to disable it. Falling into the gap or touching the patrol bot from the side restarts the level.

## Current Scope

Implemented:

- Game page
- Canvas-based game loop
- Keyboard input
- Player left/right movement
- Jumping
- Gravity
- Ground collision
- Three energy sparks
- Score HUD
- One patrol bot enemy
- Stomp-to-disable enemy interaction
- Side-hit death and restart
- Gap death and restart
- Glowing exit gate
- Level clear status
- Clearer HUD status messages
- Stronger color contrast for sparks, platforms, hazards, patrol bot, and exit gate

Not implemented yet:

- Sound
- Menus
- Build tooling
- Backend or database

## Originality and Assets

This project uses original canvas-drawn placeholder geometry only. It does not load external sprites, images, fonts, music, or sound effects. The current direction uses energy sparks, a patrol bot, and a glowing exit gate, and avoids protected commercial game characters, names, settings, art, maps, music, and sound effects.

Future assets should be original or permissively licensed, with license notes added here before delivery.

## Manual Verification

1. Start a static server from the project root.
2. Open the game in a desktop browser.
3. Confirm the page shows a canvas scene and is not blank.
4. Press left/right movement keys and confirm the player moves.
5. Press a jump key and confirm the player jumps.
6. Wait after jumping and confirm the player lands back on the ground.
7. Follow the energy sparks and confirm each one increases the score.
8. Watch the patrol bot move left and right.
9. Jump onto the patrol bot from above and confirm it disappears.
10. Restart the page, touch the patrol bot from the side, and confirm the level restarts.
11. Fall into the gap and confirm the level restarts.
12. Reach the glowing exit gate and confirm the level clear status appears.
13. Check the browser console for obvious runtime errors.

## Final Acceptance Checklist

- Page opens at `http://localhost:8000`.
- GitHub Pages source can be set to `main` branch and `/ (root)`.
- Canvas is visible and the page is not blank.
- Keyboard left/right movement works.
- Keyboard jump works and the player lands again.
- Energy sparks disappear when collected and increase `Sparks`.
- Patrol bot moves left and right.
- Landing on the patrol bot from above disables it.
- Touching the patrol bot from the side restarts the level.
- Falling into the gap restarts the level.
- Reaching the glowing exit gate shows the level clear message.
- Browser console has no obvious runtime errors.
- Project files do not depend on an absolute local path.
