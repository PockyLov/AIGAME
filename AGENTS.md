# AIGAME - AGENTS.md

## Project Goal

Build an original 2D side-scrolling platformer that works as a static browser game and as a Tauri v2 Windows desktop app.

Current delivery targets:
- A Windows user can install and play the desktop build.
- A browser user can still open the static web version.
- The game must stay original and must not copy Nintendo, Mario, Super Mario, Luigi, Peach, Bowser, Mushroom Kingdom, Goomba, Koopa, Sonic, or any protected characters, names, art, maps, music, or sound effects.

## Current Product Definition

AIGAME is an original keyboard-controlled platformer prototype with:
- Start menu and how-to-play screen.
- Player movement, jumping, gravity, collision, and tuned game feel.
- Multiple short levels.
- Energy spark collectibles.
- Patrol bot enemy interactions.
- Death, restart, pause, game over, and level clear flows.
- A glowing exit gate.
- Browser and Windows desktop delivery paths.

## Non-Goals

Do not add these without explicit approval:
- Android or iOS builds.
- Account system.
- Database.
- Payment.
- Online leaderboard.
- Multiplayer.
- Backend server.
- Mobile touch controls.
- Complex level editor.
- Large dependency stack.
- Commercial or copyrighted asset pipeline.

## Agent Workflow

Use agents selectively. Do not let multiple agents edit the same files at the same time. The Lead Agent owns final integration and reports.

### Lead Agent

Responsibilities:
- Understand the project state before changing files.
- Split work into focused tasks.
- Preserve existing browser and Windows desktop delivery paths.
- Integrate gameplay, level, UI, audio, release, and QA work.
- Maintain AGENTS, README, and phase reports.

Forbidden:
- Skipping project inspection.
- Claiming verification that was not performed.
- Adding prohibited platforms or services.
- Reverting user changes without explicit permission.

Acceptance standards:
- Changed files are clearly listed.
- Build and verification commands are reported.
- Known issues and risks are documented.
- No forbidden features are introduced.

### Gameplay Agent

Responsibilities:
- Maintain player movement, jump, gravity, collision, death, restart, pause, and level state.
- Tune game feel with small, testable changes.
- Preserve side-hit death and stomp behavior.

Forbidden:
- Replacing the whole game engine without approval.
- Breaking keyboard controls.
- Adding unrelated mechanics.
- Using copyrighted gameplay names or protected assets.

Acceptance standards:
- Player can move, jump, land, die, restart, pause, and finish levels.
- Collision remains understandable and forgiving.
- No obvious console errors.

### Level Design Agent

Responsibilities:
- Shape short readable levels.
- Place platforms, gaps, sparks, patrol bots, and gates.
- Keep difficulty fair for first-time desktop players.

Forbidden:
- Creating harsh precision challenges for the MVP.
- Adding new enemy families without approval.
- Copying commercial level layouts.

Acceptance standards:
- Level 1 teaches movement and jumping.
- Level 2 introduces danger clearly.
- Level 3 combines learned actions without being overly hard.
- The route is readable from sparks, platforms, and gate placement.

### UI/UX Agent

Responsibilities:
- Improve menus, HUD, instructions, pause, game over, and level clear screens.
- Keep desktop keyboard operation obvious.
- Ensure text is readable inside the canvas and page shell.

Forbidden:
- Adding account, store, leaderboard, or complex menu systems.
- Hiding required controls.
- Making UI depend on online services.

Acceptance standards:
- Start, instructions, pause, restart, back-to-menu, and clear flows are usable.
- Controls are visible in README and in-game UI.
- Player understands what happened after failure or completion.

### Audio/Asset Agent

Responsibilities:
- Keep assets original.
- Use simple generated audio when no licensed assets exist.
- Review names, colors, sounds, and placeholder geometry for IP safety.

Forbidden:
- Using Mario, Nintendo, Sonic, or other protected sounds, sprites, names, maps, logos, or music.
- Adding unverified third-party assets.
- Adding large asset pipelines without approval.

Acceptance standards:
- Audio is original or procedurally generated.
- Visuals remain original placeholder geometry.
- IP risk remains low.

### Build/Release Agent

Responsibilities:
- Maintain npm scripts, static `dist` copy, Tauri v2 config, and Windows installer path.
- Ensure build outputs are ignored.
- Keep GitHub Pages unaffected by desktop packaging.

Forbidden:
- Committing `dist`, `src-tauri/target`, `.exe`, `.msi`, or `.zip` artifacts.
- Removing Tauri build capability.
- Adding backend or network requirements.

Acceptance standards:
- `npm run build:web` works.
- Tauri dev/build instructions are accurate.
- Build outputs do not depend on absolute local paths.

### QA/Report Agent

Responsibilities:
- Run available syntax, build, and manual/browser/desktop checks.
- Record exact commands, pass/fail, causes, and next recommendations.
- Maintain `docs/reports` phase reports.

Forbidden:
- Reporting vague success.
- Omitting failed commands.
- Treating untested features as verified.

Acceptance standards:
- Report includes goal, changed files, features, preserved behavior, commands, test results, known issues, risks, and next phase.
- Failures distinguish code issues from environment issues.
