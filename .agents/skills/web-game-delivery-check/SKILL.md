---
name: web-game-delivery-check
description: Use this skill when preparing, testing, packaging, or verifying the web delivery of the platformer game, including browser launch, keyboard playability, build output, README, and handoff to another computer.
---

# Web Game Delivery Check Skill

## Scope

Use this skill for:
- Local run verification.
- Browser play verification.
- Keyboard input verification.
- Build verification.
- Dist folder inspection.
- README review.
- Delivery checklist.
- Deployment readiness.

## MVP Delivery Criteria

The project is deliverable only when:
- The game opens in a desktop browser.
- The player can move left and right with keyboard.
- The player can jump with keyboard.
- The player can die and restart.
- The player can finish the level.
- No obvious blank screen.
- No obvious runtime console error.
- Build output is portable.
- README explains run, play, and build steps.

## Manual Playtest Checklist

Test:
1. Page loads.
2. Start screen or game screen appears.
3. Left/right keys move the player.
4. Jump key works.
5. Player collides with ground.
6. Player can collect an item.
7. Enemy interaction works.
8. Death/restart works.
9. Finish goal works.
10. Browser console has no critical errors.

## README Must Include

- Project name.
- What the game is.
- How to install dependencies.
- How to run locally.
- How to build.
- How to play.
- Controls.
- Delivery notes.
- Known limitations.

## Response Format

Report:
1. Run result.
2. Build result.
3. Browser test result.
4. Keyboard test result.
5. Blocking issues.
6. Non-blocking issues.
7. Final delivery status: pass / fail.
