---
name: level-design-platformer
description: Use this skill when designing or adjusting platformer levels, platform positions, collectible routes, enemy placement, level pacing, difficulty curve, checkpoints, or tutorial flow.
---

# Level Design Platformer Skill

## Scope

Use this skill for:
- Level layout.
- Platform placement.
- Collectible placement.
- Enemy placement.
- First-level tutorial pacing.
- Difficulty curve.
- Start and finish positions.
- Optional checkpoint planning.

## First Level Design Rules

The first level should teach the player in this order:
1. Safe flat ground for movement.
2. A small jump.
3. A visible collectible path.
4. A harmless or low-risk enemy encounter.
5. A slightly harder platform sequence.
6. A clear finish goal.

## Difficulty Rules

- Do not make the first obstacle punishing.
- Do not place enemies too close to the spawn point.
- Do not require pixel-perfect jumps in MVP.
- Use collectibles to guide the route.
- Leave enough recovery space after hazards.
- Keep the first level short enough to finish quickly.

## Required Checks

After changing a level:
- Can a new player understand where to go?
- Can the player finish without advanced skill?
- Are collectibles visible and reachable?
- Are enemy positions fair?
- Is the finish goal obvious?

## Response Format

Report:
1. Level structure summary.
2. Player experience flow.
3. Risky or frustrating spots.
4. What was changed.
5. How to manually test the level.
