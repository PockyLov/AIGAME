# AIGAME - AGENTS.md

## Project Goal

Build an original 2D side-scrolling platformer web game inspired by classic platformer design.

Final delivery target:
- A person on another computer can open the game in a desktop browser.
- The game can be played with keyboard controls.
- The game must be original and must not copy Nintendo, Mario, Super Mario, Luigi, Peach, Bowser, Mushroom Kingdom, or any protected characters, names, art, maps, music, or sound effects.

## Product Definition

This is a web-playable original platformer game.

The MVP must include:
- Player movement: left, right, jump.
- Gravity and collision.
- Platforms and ground.
- Collectibles.
- At least one enemy type.
- Death and restart.
- A finish goal.
- A complete first level.
- Keyboard controls.
- A README explaining how to run, play, and deliver the game.

## Non-goals for MVP

Do not build these in the first version:
- Account system.
- Database.
- Payment.
- Online leaderboard.
- Multiplayer.
- Backend server.
- Mobile touch controls.
- Complex level editor.
- Commercial asset pipeline.

## Agent Workflow

Use subagents selectively.

Allowed subagent roles:
1. Core Gameplay Agent
2. Level Design Agent
3. Originality and Asset Safety Agent
4. Test and Delivery Agent

Rules:
- Do not let multiple agents edit the same files at the same time.
- Use subagents for exploration, review, testing, and focused implementation.
- The main agent must summarize decisions before implementation.
- Code-writing tasks should usually be sequential.
- Review and testing tasks may run in parallel.
- Every task must define "done when" criteria.
- Do not add unnecessary dependencies.
- Prefer simple, maintainable code over clever abstractions.

## Quality Bar

The game is not done until:
- The browser page opens without a blank screen.
- Keyboard movement works.
- Jumping works.
- Collision works.
- The player can die and restart.
- The player can finish the level.
- There are no obvious console errors.
- The build output does not depend on an absolute local path.
- README is clear enough for another person to run the project.

## IP and Originality Rules

Forbidden:
- Mario, Super Mario, Nintendo, Luigi, Peach, Bowser, Mushroom Kingdom, Goomba, Koopa, or similar direct references.
- Red-hat plumber protagonist.
- Directly copied blocks, coins, pipes, mushrooms, turtles, maps, music, sound effects, sprites, logos, or UI.
- Any copyrighted commercial game assets without a valid license.

Allowed:
- Original mechanics inspired by the broad platformer genre.
- Original placeholder geometry.
- Original character and world names.
- Public-domain or permissively licensed assets only after license verification.

## Communication Style for Codex

When reporting back:
- Be concrete.
- Say which files changed.
- Say how to run and verify.
- List remaining risks.
- Do not dump huge logs unless needed.
- Do not claim success unless build/test/play verification was actually performed.
