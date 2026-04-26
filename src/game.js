const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const statusEl = document.querySelector("#status");
const touchButtons = document.querySelectorAll("[data-control]");

const world = {
  width: canvas.width,
  height: canvas.height,
  deathY: 660,
};

const physics = {
  gravity: 1650,
  groundFriction: 0.84,
  airControl: 0.76,
  coyoteTime: 0.1,
  jumpBuffer: 0.12,
};

const playerStartSize = {
  width: 36,
  height: 56,
};

const levels = [
  {
    name: "Level 1 - First Steps",
    hint: "Learn movement, collect sparks, and reach the exit gate.",
    start: { x: 86, y: 386 },
    ground: [{ x: 0, y: 442, width: 960, height: 98 }],
    platforms: [
      { x: 270, y: 380, width: 150, height: 18 },
      { x: 520, y: 336, width: 155, height: 18 },
    ],
    sparks: [
      { x: 302, y: 348 },
      { x: 565, y: 304 },
      { x: 790, y: 386 },
    ],
    enemies: [],
    gate: { x: 846, y: 346, width: 42, height: 96 },
  },
  {
    name: "Level 2 - Patrol Gap",
    hint: "Cross the gap, avoid side hits, and stomp the patrol bot from above.",
    start: { x: 90, y: 386 },
    ground: [
      { x: 0, y: 442, width: 470, height: 98 },
      { x: 610, y: 442, width: 350, height: 98 },
    ],
    platforms: [
      { x: 318, y: 356, width: 180, height: 18 },
      { x: 642, y: 346, width: 140, height: 18 },
    ],
    sparks: [
      { x: 276, y: 386 },
      { x: 374, y: 324 },
      { x: 724, y: 314 },
      { x: 848, y: 386 },
    ],
    enemies: [
      {
        x: 382,
        y: 324,
        width: 42,
        height: 32,
        leftBound: 358,
        rightBound: 486,
        speed: 82,
      },
    ],
    gate: { x: 846, y: 346, width: 42, height: 96 },
  },
  {
    name: "Level 3 - Gate Run",
    hint: "Use platforms, collect the route sparks, and finish cleanly.",
    start: { x: 74, y: 386 },
    ground: [
      { x: 0, y: 442, width: 310, height: 98 },
      { x: 430, y: 442, width: 230, height: 98 },
      { x: 778, y: 442, width: 182, height: 98 },
    ],
    platforms: [
      { x: 232, y: 358, width: 128, height: 18 },
      { x: 468, y: 326, width: 146, height: 18 },
      { x: 664, y: 354, width: 132, height: 18 },
    ],
    sparks: [
      { x: 256, y: 326 },
      { x: 514, y: 294 },
      { x: 704, y: 322 },
      { x: 846, y: 386 },
    ],
    enemies: [
      {
        x: 494,
        y: 294,
        width: 42,
        height: 32,
        leftBound: 474,
        rightBound: 604,
        speed: 92,
      },
    ],
    gate: { x: 858, y: 346, width: 42, height: 96 },
  },
];

const menuButtons = {
  menu: [
    { label: "Start Game", action: "start" },
    { label: "How to Play", action: "howToPlay" },
    { label: "Quit", action: "quit" },
  ],
  paused: [
    { label: "Resume", action: "resume" },
    { label: "Restart", action: "restart" },
    { label: "Back to Menu", action: "menu" },
  ],
  gameOver: [
    { label: "Restart", action: "restart" },
    { label: "Back to Menu", action: "menu" },
  ],
  levelClear: [
    { label: "Next Level", action: "next" },
    { label: "Restart", action: "restart" },
    { label: "Back to Menu", action: "menu" },
  ],
};

const keys = new Set();
const justPressed = new Set();
const pointer = { x: 0, y: 0 };

const player = {
  x: 0,
  y: 0,
  previousY: 0,
  width: playerStartSize.width,
  height: playerStartSize.height,
  vx: 0,
  vy: 0,
  speed: 315,
  jumpForce: 705,
  onGround: true,
  coyoteTimer: 0,
  jumpBufferTimer: 0,
};

let appState = "menu";
let levelIndex = 0;
let currentLevel = levels[levelIndex];
let score = 0;
let totalSparks = 0;
let collectibles = [];
let enemies = [];
let message = "Choose Start Game.";
let lastDeathReason = "Try again.";
let menuSelection = 0;
let audioContext = null;

function isLeftPressed() {
  return keys.has("ArrowLeft") || keys.has("KeyA");
}

function isRightPressed() {
  return keys.has("ArrowRight") || keys.has("KeyD");
}

function isJumpKey(code) {
  return code === "Space" || code === "ArrowUp" || code === "KeyW";
}

function getAllSurfaces() {
  return [...currentLevel.ground, ...currentLevel.platforms];
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(kind) {
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const tones = {
    jump: { start: 360, end: 620, duration: 0.12, volume: 0.05, type: "triangle" },
    collect: { start: 760, end: 1120, duration: 0.11, volume: 0.06, type: "sine" },
    hurt: { start: 180, end: 80, duration: 0.22, volume: 0.07, type: "sawtooth" },
    clear: { start: 520, end: 880, duration: 0.32, volume: 0.07, type: "triangle" },
  };
  const tone = tones[kind];

  if (!tone) {
    return;
  }

  osc.type = tone.type;
  osc.frequency.setValueAtTime(tone.start, now);
  osc.frequency.exponentialRampToValueAtTime(tone.end, now + tone.duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(tone.volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + tone.duration + 0.02);
}

function createCollectibles() {
  return currentLevel.sparks.map((spark, index) => ({
    ...spark,
    id: `energy-spark-${levelIndex + 1}-${index + 1}`,
    width: 20,
    height: 20,
    collected: false,
  }));
}

function createEnemies() {
  return currentLevel.enemies.map((enemy, index) => ({
    ...enemy,
    id: `patrol-bot-${levelIndex + 1}-${index + 1}`,
    direction: 1,
    defeated: false,
  }));
}

function resetPlayer() {
  player.x = currentLevel.start.x;
  player.y = currentLevel.start.y;
  player.previousY = player.y;
  player.vx = 0;
  player.vy = 0;
  player.onGround = true;
  player.coyoteTimer = physics.coyoteTime;
  player.jumpBufferTimer = 0;
}

function loadLevel(index, reason) {
  levelIndex = Math.max(0, Math.min(levels.length - 1, index));
  currentLevel = levels[levelIndex];
  score = 0;
  totalSparks = currentLevel.sparks.length;
  collectibles = createCollectibles();
  enemies = createEnemies();
  resetPlayer();
  appState = "playing";
  message = reason || currentLevel.hint;
  menuSelection = 0;
  updateHud();
}

function restartLevel(reason = "Restarted. Try the route again.") {
  loadLevel(levelIndex, reason);
}

function goToMenu(reason = "Choose Start Game.") {
  appState = "menu";
  message = reason;
  menuSelection = 0;
  updateHud();
}

function updateHud() {
  scoreEl.textContent = `Level: ${levelIndex + 1}/${levels.length} | Sparks: ${score}/${totalSparks}`;
  statusEl.textContent = message;
}

function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function startJump() {
  player.vy = -player.jumpForce;
  player.onGround = false;
  player.coyoteTimer = 0;
  player.jumpBufferTimer = 0;
  playTone("jump");
}

function triggerDeath(reason) {
  lastDeathReason = reason;
  appState = "gameOver";
  player.vx = 0;
  player.vy = 0;
  message = reason;
  menuSelection = 0;
  playTone("hurt");
  updateHud();
}

function completeLevel() {
  appState = "levelClear";
  player.vx = 0;
  player.vy = 0;
  message = levelIndex === levels.length - 1 ? "All levels clear." : "Level clear.";
  menuSelection = 0;
  playTone("clear");
  updateHud();
}

function moveEnemies(dt) {
  for (const enemy of enemies) {
    if (enemy.defeated) {
      continue;
    }

    enemy.x += enemy.direction * enemy.speed * dt;

    if (enemy.x <= enemy.leftBound) {
      enemy.x = enemy.leftBound;
      enemy.direction = 1;
    }

    if (enemy.x + enemy.width >= enemy.rightBound) {
      enemy.x = enemy.rightBound - enemy.width;
      enemy.direction = -1;
    }
  }
}

function collectSparks() {
  for (const spark of collectibles) {
    if (!spark.collected && intersects(player, spark)) {
      spark.collected = true;
      score += 1;
      message = "Energy spark collected.";
      playTone("collect");
    }
  }
}

function handleEnemyCollision() {
  for (const enemy of enemies) {
    if (enemy.defeated || !intersects(player, enemy)) {
      continue;
    }

    const previousBottom = player.previousY + player.height;
    const playerBottom = player.y + player.height;
    const stomped =
      player.vy > 0 &&
      previousBottom <= enemy.y + 26 &&
      playerBottom <= enemy.y + enemy.height * 0.78;

    if (stomped) {
      enemy.defeated = true;
      player.vy = -player.jumpForce * 0.42;
      player.onGround = false;
      player.coyoteTimer = 0;
      message = "Patrol bot disabled.";
      playTone("jump");
      return;
    }

    triggerDeath("Restart after a patrol bot side hit.");
    return;
  }
}

function handleFinishGate() {
  if (intersects(player, currentLevel.gate)) {
    completeLevel();
  }
}

function resolveVerticalCollision(surface) {
  const playerBottom = player.y + player.height;
  const previousBottom = player.previousY + player.height;
  const wasAbove = previousBottom <= surface.y;
  const overlapsX = player.x < surface.x + surface.width && player.x + player.width > surface.x;

  if (overlapsX && wasAbove && playerBottom >= surface.y && player.vy >= 0) {
    player.y = surface.y - player.height;
    player.vy = 0;
    player.onGround = true;
    player.coyoteTimer = physics.coyoteTime;
    return true;
  }

  return false;
}

function updatePlaying(dt) {
  player.previousY = player.y;

  if (player.jumpBufferTimer > 0) {
    player.jumpBufferTimer -= dt;
  }

  if (player.coyoteTimer > 0) {
    player.coyoteTimer -= dt;
  }

  const direction = Number(isRightPressed()) - Number(isLeftPressed());
  const control = player.onGround ? 1 : physics.airControl;

  if (direction !== 0) {
    player.vx += direction * player.speed * 8 * control * dt;
    player.vx = Math.max(-player.speed, Math.min(player.speed, player.vx));
  } else {
    player.vx *= player.onGround ? physics.groundFriction : 0.97;
    if (Math.abs(player.vx) < 3) {
      player.vx = 0;
    }
  }

  if (player.jumpBufferTimer > 0 && (player.onGround || player.coyoteTimer > 0)) {
    startJump();
  }

  player.vy += physics.gravity * dt;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  const minX = 18;
  const maxX = world.width - player.width - 18;
  player.x = Math.max(minX, Math.min(maxX, player.x));

  player.onGround = false;

  for (const surface of getAllSurfaces()) {
    if (resolveVerticalCollision(surface)) {
      break;
    }
  }

  moveEnemies(dt);
  collectSparks();
  handleEnemyCollision();

  if (appState !== "playing") {
    return;
  }

  handleFinishGate();

  if (player.y > world.deathY) {
    triggerDeath("Restart after falling into the gap.");
    return;
  }

  updateHud();
}

function getActiveButtons() {
  if (appState === "howToPlay") {
    return [{ label: "Back to Menu", action: "menu" }];
  }

  return menuButtons[appState] || [];
}

function performAction(action) {
  ensureAudio();

  if (action === "start") {
    loadLevel(0, levels[0].hint);
  } else if (action === "howToPlay") {
    appState = "howToPlay";
    message = "Read the controls, then return to menu.";
    menuSelection = 0;
    updateHud();
  } else if (action === "quit") {
    message = "Close the window to quit AIGAME.";
    updateHud();
  } else if (action === "resume") {
    appState = "playing";
    message = currentLevel.hint;
    updateHud();
  } else if (action === "restart") {
    restartLevel("Restarted.");
  } else if (action === "menu") {
    goToMenu("Back at the main menu.");
  } else if (action === "next") {
    if (levelIndex < levels.length - 1) {
      loadLevel(levelIndex + 1, levels[levelIndex + 1].hint);
    } else {
      goToMenu("Thanks for playing all three levels.");
    }
  }
}

function handleMenuInput() {
  const buttons = getActiveButtons();

  if (buttons.length === 0) {
    return;
  }

  if (justPressed.has("ArrowDown") || justPressed.has("KeyS")) {
    menuSelection = (menuSelection + 1) % buttons.length;
  }

  if (justPressed.has("ArrowUp") || justPressed.has("KeyW")) {
    menuSelection = (menuSelection - 1 + buttons.length) % buttons.length;
  }

  if (justPressed.has("Enter") || justPressed.has("Space")) {
    performAction(buttons[menuSelection].action);
  }
}

function handleGlobalInput() {
  if (justPressed.has("KeyP") || justPressed.has("Escape")) {
    if (appState === "playing") {
      appState = "paused";
      message = "Paused.";
      menuSelection = 0;
      updateHud();
    } else if (appState === "paused") {
      performAction("resume");
    }
  }

  if (justPressed.has("KeyR") && (appState === "playing" || appState === "paused" || appState === "gameOver")) {
    restartLevel("Restarted.");
  }

  if (isJumpKey("Space") && justPressed.has("Space")) {
    ensureAudio();
  }

  if (appState === "playing") {
    for (const code of justPressed) {
      if (isJumpKey(code)) {
        player.jumpBufferTimer = physics.jumpBuffer;
      }
    }
  } else {
    handleMenuInput();
  }
}

function pressVirtualControl(control) {
  ensureAudio();

  if (control === "left") {
    keys.add("ArrowLeft");
  } else if (control === "right") {
    keys.add("ArrowRight");
  } else if (control === "jump") {
    justPressed.add("Space");
    keys.add("Space");
  } else if (control === "pause") {
    justPressed.add("KeyP");
  }
}

function releaseVirtualControl(control) {
  if (control === "left") {
    keys.delete("ArrowLeft");
  } else if (control === "right") {
    keys.delete("ArrowRight");
  } else if (control === "jump") {
    keys.delete("Space");
  }
}

function update(dt) {
  handleGlobalInput();

  if (appState === "playing") {
    updatePlaying(dt);
  }

  justPressed.clear();
}

function drawBackground() {
  ctx.fillStyle = "#223034";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = "rgba(246, 238, 211, 0.08)";
  for (let x = 48; x < world.width; x += 128) {
    ctx.fillRect(x, 78, 46, 280);
  }

  ctx.fillStyle = "rgba(123, 208, 182, 0.12)";
  ctx.fillRect(0, 0, world.width, 62);

  for (let x = 0; x < world.width; x += 26) {
    ctx.fillStyle = x % 52 === 0 ? "#342337" : "#251b27";
    ctx.fillRect(x, 442, 18, world.height - 442);
  }
}

function drawHazards() {
  const sortedGround = [...currentLevel.ground].sort((a, b) => a.x - b.x);
  for (let index = 0; index < sortedGround.length - 1; index += 1) {
    const current = sortedGround[index];
    const next = sortedGround[index + 1];
    const gapStart = current.x + current.width;
    const gapWidth = next.x - gapStart;

    if (gapWidth > 12) {
      ctx.fillStyle = "#211721";
      ctx.fillRect(gapStart, 442, gapWidth, world.height - 442);
      ctx.fillStyle = "#f0b35b";
      for (let x = gapStart + 8; x < next.x - 8; x += 24) {
        ctx.fillRect(x, 452, 12, 5);
      }
    }
  }
}

function drawSurfaces() {
  for (const ground of currentLevel.ground) {
    ctx.fillStyle = "#2d4042";
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
    ctx.fillStyle = "#84ad74";
    ctx.fillRect(ground.x, ground.y, ground.width, 8);
  }

  for (const platform of currentLevel.platforms) {
    ctx.fillStyle = "#435d63";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    ctx.fillStyle = "#c1cd79";
    ctx.fillRect(platform.x, platform.y, platform.width, 5);
  }
}

function drawCollectibles() {
  for (const spark of collectibles) {
    if (spark.collected) {
      continue;
    }

    const centerX = spark.x + spark.width / 2;
    const centerY = spark.y + spark.height / 2;

    ctx.fillStyle = "rgba(247, 214, 107, 0.24)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f7d66b";
    ctx.beginPath();
    ctx.moveTo(centerX, spark.y);
    ctx.lineTo(spark.x + spark.width, centerY);
    ctx.lineTo(centerX, spark.y + spark.height);
    ctx.lineTo(spark.x, centerY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff7b0";
    ctx.fillRect(centerX - 3, centerY - 3, 6, 6);
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (enemy.defeated) {
      continue;
    }

    ctx.fillStyle = "#d36b5b";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = "#ffd6a8";
    ctx.fillRect(enemy.x + 4, enemy.y, enemy.width - 8, 4);
    ctx.fillStyle = "#2e3436";
    ctx.fillRect(enemy.x + 8, enemy.y + 10, 7, 7);
    ctx.fillRect(enemy.x + enemy.width - 15, enemy.y + 10, 7, 7);
    ctx.fillStyle = "#f0d6c8";
    ctx.fillRect(enemy.x + 6, enemy.y + enemy.height - 5, enemy.width - 12, 5);
  }
}

function drawGate() {
  const gate = currentLevel.gate;
  const cleared = appState === "levelClear";

  ctx.fillStyle = cleared ? "rgba(184, 245, 208, 0.28)" : "rgba(101, 199, 208, 0.26)";
  ctx.fillRect(gate.x - 10, gate.y - 10, gate.width + 20, gate.height + 20);
  ctx.fillStyle = cleared ? "#b8f5d0" : "#65c7d0";
  ctx.fillRect(gate.x, gate.y, gate.width, gate.height);
  ctx.fillStyle = "rgba(242, 240, 232, 0.44)";
  ctx.fillRect(gate.x + 10, gate.y + 12, gate.width - 20, gate.height - 24);
  ctx.fillStyle = "#263537";
  ctx.fillRect(gate.x + 16, gate.y + 28, gate.width - 32, gate.height - 40);
}

function drawPlayer() {
  ctx.fillStyle = "#7dd0b6";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = "#f2f0e8";
  ctx.fillRect(player.x + 22, player.y + 12, 7, 7);
  ctx.fillStyle = "#31383a";
  ctx.fillRect(player.x + 7, player.y + player.height - 8, 22, 8);
}

function drawLevelLabel() {
  ctx.fillStyle = "rgba(21, 23, 24, 0.66)";
  ctx.fillRect(20, 18, 430, 58);
  ctx.fillStyle = "#f2f0e8";
  ctx.font = "700 20px system-ui, sans-serif";
  ctx.fillText(currentLevel.name, 36, 43);
  ctx.font = "14px system-ui, sans-serif";
  ctx.fillStyle = "#e5decd";
  ctx.fillText(currentLevel.hint, 36, 64);
}

function drawButton(button, index, x, y, width) {
  const selected = index === menuSelection;
  button.bounds = { x, y, width, height: 44 };
  ctx.fillStyle = selected ? "#f7d66b" : "rgba(242, 240, 232, 0.12)";
  ctx.fillRect(x, y, width, 44);
  ctx.strokeStyle = selected ? "#fff7b0" : "rgba(242, 240, 232, 0.28)";
  ctx.strokeRect(x, y, width, 44);
  ctx.fillStyle = selected ? "#1b1e20" : "#f2f0e8";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText(button.label, x + 18, y + 29);
}

function drawOverlay(title, lines, buttons) {
  ctx.fillStyle = "rgba(13, 16, 17, 0.78)";
  ctx.fillRect(0, 0, world.width, world.height);

  const panelX = 250;
  const panelY = 72;
  const panelWidth = 460;
  ctx.fillStyle = "#20292b";
  ctx.fillRect(panelX, panelY, panelWidth, 390);
  ctx.strokeStyle = "rgba(242, 240, 232, 0.28)";
  ctx.strokeRect(panelX, panelY, panelWidth, 390);

  ctx.fillStyle = "#f2f0e8";
  ctx.font = "800 36px system-ui, sans-serif";
  ctx.fillText(title, panelX + 34, panelY + 62);

  ctx.font = "16px system-ui, sans-serif";
  ctx.fillStyle = "#e5decd";
  lines.forEach((line, index) => {
    ctx.fillText(line, panelX + 34, panelY + 106 + index * 24);
  });

  const buttonY = panelY + 210;
  buttons.forEach((button, index) => {
    drawButton(button, index, panelX + 34, buttonY + index * 56, panelWidth - 68);
  });
}

function drawStateOverlay() {
  if (appState === "menu") {
    drawOverlay(
      "AIGAME",
      ["A small original platformer for Windows.", "Use arrows or W/S to choose, Enter to confirm."],
      getActiveButtons(),
    );
  } else if (appState === "howToPlay") {
    drawOverlay(
      "How to Play",
      [
        "Move: ArrowLeft/ArrowRight or A/D",
        "Jump: Space, ArrowUp, or W",
        "Pause: P or Escape",
        "Restart: R",
        "Collect sparks, stomp patrol bots, reach the glowing gate.",
      ],
      getActiveButtons(),
    );
  } else if (appState === "paused") {
    drawOverlay("Paused", ["Take a breath. Resume when ready."], getActiveButtons());
  } else if (appState === "gameOver") {
    drawOverlay("Game Over", [lastDeathReason], getActiveButtons());
  } else if (appState === "levelClear") {
    const title = levelIndex === levels.length - 1 ? "Game Clear" : "Level Clear";
    const line = levelIndex === levels.length - 1 ? "You cleared all current levels." : "Nice route. Continue?";
    drawOverlay(title, [line], getActiveButtons());
  }
}

function draw() {
  drawBackground();
  drawHazards();
  drawSurfaces();
  drawCollectibles();
  drawEnemies();
  drawGate();
  drawPlayer();
  drawLevelLabel();
  drawStateOverlay();
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

window.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(event.code)) {
    event.preventDefault();
  }

  if (!keys.has(event.code)) {
    justPressed.add(event.code);
  }

  keys.add(event.code);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

canvas.addEventListener("mousemove", (event) => {
  const point = getCanvasPoint(event);
  pointer.x = point.x;
  pointer.y = point.y;
});

canvas.addEventListener("click", (event) => {
  const point = getCanvasPoint(event);
  const buttons = getActiveButtons();
  const hitIndex = buttons.findIndex((button) => {
    const bounds = button.bounds;
    return bounds && point.x >= bounds.x && point.x <= bounds.x + bounds.width && point.y >= bounds.y && point.y <= bounds.y + bounds.height;
  });

  if (hitIndex >= 0) {
    menuSelection = hitIndex;
    performAction(buttons[hitIndex].action);
  }
});

for (const button of touchButtons) {
  const control = button.dataset.control;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    button.classList.add("is-active");
    pressVirtualControl(control);
  });

  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    button.classList.remove("is-active");
    releaseVirtualControl(control);
  });

  button.addEventListener("pointercancel", () => {
    button.classList.remove("is-active");
    releaseVirtualControl(control);
  });

  button.addEventListener("lostpointercapture", () => {
    button.classList.remove("is-active");
    releaseVirtualControl(control);
  });
}

let lastTime = performance.now();

function loop() {
  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 0.032);
  lastTime = now;

  update(dt);
  draw();

  window.setTimeout(loop, 1000 / 60);
}

currentLevel = levels[levelIndex];
totalSparks = currentLevel.sparks.length;
collectibles = createCollectibles();
enemies = createEnemies();
resetPlayer();
updateHud();
draw();
window.setTimeout(loop, 1000 / 60);
