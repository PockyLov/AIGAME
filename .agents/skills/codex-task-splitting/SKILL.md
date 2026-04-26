---
name: codex-task-splitting
description: Use this skill when planning multi-step work, deciding whether to spawn subagents, splitting game development tasks, preventing context pollution, or organizing implementation/review/testing phases.
---

# Codex Task Splitting Skill

## Scope

Use this skill for:
- Planning project phases.
- Splitting tasks across subagents.
- Deciding what should be sequential vs parallel.
- Keeping the main context clean.
- Defining "done when" criteria.
- Avoiding over-scoped implementation prompts.

## Rules

1. The main agent owns product decisions.
2. Subagents should have narrow scopes.
3. Do not spawn subagents without explicit purpose.
4. Do not let multiple subagents edit the same files concurrently.
5. Use subagents for:
   - Exploration.
   - Review.
   - Focused implementation.
   - Testing.
   - Risk analysis.
6. Keep implementation tasks sequential when file conflicts are likely.
7. Ask subagents to return summaries, not huge logs.
8. Each task must include:
   - Goal.
   - Scope.
   - Files or areas involved.
   - Constraints.
   - Done-when criteria.

## Recommended Project Phases

Phase 1:
- Project skeleton.
- Core game loop.
- Player movement.
- Ground collision.

Phase 2:
- Collectibles.
- Enemy.
- Death/restart.
- Finish goal.

Phase 3:
- First complete level.
- UI.
- Basic sound or visual feedback.

Phase 4:
- Originality review.
- Browser testing.
- README.
- Build and delivery.

## Response Format

Report:
1. Recommended phase.
2. Whether subagents are needed.
3. Which subagents to use.
4. What each subagent should do.
5. What should remain sequential.
6. Done-when checklist.
