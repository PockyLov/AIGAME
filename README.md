# AIGAME Platformer Prototype

An original 2D side-scrolling platformer web game prototype. This first phase only includes a minimal browser game page with keyboard movement, jumping, gravity, and ground collision.

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

## Current Scope

Implemented:

- Game page
- Canvas-based game loop
- Keyboard input
- Player left/right movement
- Jumping
- Gravity
- Ground collision

Not implemented yet:

- Collectibles
- Enemies
- Death and restart
- Finish goal
- Full first level
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
7. Check the browser console for obvious runtime errors.
