---
name: platformer-core-gameplay
description: Use this skill when implementing or modifying player movement, jumping, gravity, collision, enemies, death, restart, camera follow, or finish-goal logic in an original 2D platformer web game.
---

# Platformer Core Gameplay Skill

## Scope

Use this skill for:
- Player left/right movement.
- Jumping.
- Gravity.
- Collision.
- Platforms.
- Camera following.
- Enemy patrol behavior.
- Stomp enemy behavior.
- Player damage or death.
- Restart flow.
- Finish goal detection.

## Principles

1. Gameplay feel is more important than feature count.
2. Keep the first implementation simple and stable.
3. Avoid adding several new mechanics in one change.
4. Do not break keyboard controls.
5. Do not introduce infinite jump, wall clipping, floor sinking, or stuck states.
6. Prefer readable constants for speed, jump force, gravity, and enemy movement.

## Required Checks

After modifying gameplay, verify:
- Left/right movement works.
- Jump works from the ground.
- Player cannot jump infinitely unless intentionally designed.
- Player lands on platforms.
- Player does not fall through solid ground.
- Enemy movement is predictable.
- Death/restart can be triggered.
- Finish goal can be reached.

## Response Format

Report:
1. What changed.
2. Which files changed.
3. How to test manually.
4. Known gameplay feel issues.
5. Suggested next tuning step.
