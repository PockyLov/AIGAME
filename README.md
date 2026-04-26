# AIGAME Platformer Prototype

An original 2D side-scrolling platformer web game prototype. The current version is a tiny playable level with keyboard movement, jumping, gravity, ground collision, energy sparks, one patrol bot, a gap hazard, and a glowing exit gate.

## Run Locally

Use any static file server from the project root.

With Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a desktop browser, but a local server is recommended for normal development.

## Controls

- Move left: `ArrowLeft` or `A`
- Move right: `ArrowRight` or `D`
- Jump: `Space`, `ArrowUp`, or `W`

## How to Play

Collect energy sparks to increase the score. Jump over the gap, avoid the patrol bot from the side, or land on it from above to disable it. Reach the glowing exit gate to clear the level. Falling into the gap or touching the patrol bot from the side restarts the level.

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

Not implemented yet:

- Sound
- Menus
- Build tooling
- Backend or database

## Manual Verification

1. Start a static server from the project root.
2. Open the game in a desktop browser.
3. Confirm the page shows a canvas scene and is not blank.
4. Press left/right movement keys and confirm the player moves.
5. Press a jump key and confirm the player jumps.
6. Wait after jumping and confirm the player lands back on the ground.
7. Touch each energy spark and confirm the score increases.
8. Watch the patrol bot move left and right.
9. Jump onto the patrol bot from above and confirm it disappears.
10. Restart the page, touch the patrol bot from the side, and confirm the level restarts.
11. Fall into the gap and confirm the level restarts.
12. Reach the glowing exit gate and confirm the level clear status appears.
13. Check the browser console for obvious runtime errors.
