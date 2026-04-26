const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const statusEl = document.querySelector("#status");

const world = {
  width: canvas.width,
  height: canvas.height,
  groundY: 442,
  deathY: 620,
};

const physics = {
  gravity: 1800,
  groundFriction: 0.82,
};

const groundSegments = [
  { x: 0, y: world.groundY, width: 490, height: world.height - world.groundY },
  { x: 610, y: world.groundY, width: 350, height: world.height - world.groundY },
];

const platforms = [
  { x: 340, y: 360, width: 170, height: 18 },
  { x: 640, y: 350, width: 128, height: 18 },
];

const collectibleBlueprints = [
  { x: 300, y: 330 },
  { x: 705, y: world.groundY - 72 },
  { x: 845, y: world.groundY - 72 },
];

const enemyBlueprint = {
  x: 378,
  y: platforms[0].y - 32,
  width: 42,
  height: 32,
  leftBound: 365,
  rightBound: 480,
  speed: 88,
};

const gate = {
  x: 845,
  y: world.groundY - 96,
  width: 42,
  height: 96,
};

const playerStart = {
  x: 110,
  y: world.groundY - 56,
};

const player = {
  x: playerStart.x,
  y: playerStart.y,
  previousY: playerStart.y,
  width: 36,
  height: 56,
  vx: 0,
  vy: 0,
  speed: 300,
  jumpForce: 720,
  onGround: true,
};

let score = 0;
let collectibles = [];
let enemy = null;
let levelWon = false;
let message = "Collect the sparks, avoid side hits, reach the glowing gate.";

const keys = new Set();

function isLeftPressed() {
  return keys.has("ArrowLeft") || keys.has("KeyA");
}

function isRightPressed() {
  return keys.has("ArrowRight") || keys.has("KeyD");
}

function isJumpKey(code) {
  return code === "Space" || code === "ArrowUp" || code === "KeyW";
}

window.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(event.code)) {
    event.preventDefault();
  }

  if (isJumpKey(event.code) && player.onGround) {
    player.vy = -player.jumpForce;
    player.onGround = false;
  }

  keys.add(event.code);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

function createCollectibles() {
  return collectibleBlueprints.map((spark, index) => ({
    ...spark,
    id: `energy-spark-${index + 1}`,
    width: 20,
    height: 20,
    collected: false,
  }));
}

function createEnemy() {
  return {
    ...enemyBlueprint,
    direction: 1,
    defeated: false,
  };
}

function resetLevel(reason = "Restarted") {
  player.x = playerStart.x;
  player.y = playerStart.y;
  player.previousY = playerStart.y;
  player.vx = 0;
  player.vy = 0;
  player.onGround = true;

  score = 0;
  collectibles = createCollectibles();
  enemy = createEnemy();
  levelWon = false;
  message = reason;
  updateHud();
}

function updateHud() {
  scoreEl.textContent = `Sparks: ${score}`;
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

function moveEnemy(dt) {
  if (!enemy || enemy.defeated) {
    return;
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

function collectSparks() {
  for (const spark of collectibles) {
    if (!spark.collected && intersects(player, spark)) {
      spark.collected = true;
      score += 1;
      message = "Energy spark collected. Follow the next glow.";
    }
  }
}

function handleEnemyCollision() {
  if (!enemy || enemy.defeated || !intersects(player, enemy)) {
    return;
  }

  const previousBottom = player.previousY + player.height;
  const playerBottom = player.y + player.height;
  const enemyTop = enemy.y;
  const stomped =
    player.vy > 0 &&
    previousBottom <= enemyTop + 24 &&
    playerBottom <= enemyTop + enemy.height * 0.75;

  if (stomped) {
    enemy.defeated = true;
    player.vy = -player.jumpForce * 0.45;
    player.onGround = false;
    message = "Patrol bot disabled. Keep moving to the gate.";
    return;
  }

  resetLevel("Restarted after a patrol bot hit.");
}

function handleFinishGate() {
  if (!levelWon && intersects(player, gate)) {
    levelWon = true;
    player.vx = 0;
    message = "Level clear. The exit gate is open.";
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
    return true;
  }

  return false;
}

function update(dt) {
  player.previousY = player.y;

  if (levelWon) {
    updateHud();
    return;
  }

  const direction = Number(isRightPressed()) - Number(isLeftPressed());

  if (direction !== 0) {
    player.vx = direction * player.speed;
  } else {
    player.vx *= physics.groundFriction;
    if (Math.abs(player.vx) < 2) {
      player.vx = 0;
    }
  }

  player.vy += physics.gravity * dt;
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  const minX = 18;
  const maxX = world.width - player.width - 18;
  player.x = Math.max(minX, Math.min(maxX, player.x));

  player.onGround = false;

  for (const surface of [...groundSegments, ...platforms]) {
    if (resolveVerticalCollision(surface)) {
      break;
    }
  }

  moveEnemy(dt);
  collectSparks();
  handleEnemyCollision();
  handleFinishGate();

  if (player.y > world.deathY) {
    resetLevel("Restarted after falling into the gap.");
    return;
  }

  if (message === "Ready") {
    message = player.onGround ? "Grounded" : "Jumping";
  }

  updateHud();
}

function drawBackground() {
  ctx.fillStyle = "#263537";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = "#241b25";
  ctx.fillRect(490, world.groundY, 120, world.height - world.groundY);

  ctx.fillStyle = "#e8b35b";
  for (let x = 494; x < 606; x += 24) {
    ctx.fillRect(x, world.groundY + 8, 12, 5);
  }

  ctx.fillStyle = "rgba(242, 240, 232, 0.08)";
  for (let x = 60; x < world.width; x += 130) {
    ctx.fillRect(x, 90, 52, 260);
  }
}

function drawSurfaces() {
  for (const ground of groundSegments) {
    ctx.fillStyle = "#2d4042";
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

    ctx.fillStyle = "#80a36d";
    ctx.fillRect(ground.x, ground.y, ground.width, 8);
  }

  for (const platform of platforms) {
    ctx.fillStyle = "#435d63";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    ctx.fillStyle = "#b0c47a";
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

    ctx.fillStyle = "rgba(247, 214, 107, 0.22)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 17, 0, Math.PI * 2);
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

function drawEnemy() {
  if (!enemy || enemy.defeated) {
    return;
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

function drawGate() {
  ctx.fillStyle = levelWon ? "rgba(184, 245, 208, 0.26)" : "rgba(101, 199, 208, 0.24)";
  ctx.fillRect(gate.x - 10, gate.y - 10, gate.width + 20, gate.height + 20);

  ctx.fillStyle = levelWon ? "#b8f5d0" : "#65c7d0";
  ctx.fillRect(gate.x, gate.y, gate.width, gate.height);

  ctx.fillStyle = "rgba(242, 240, 232, 0.42)";
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

function draw() {
  drawBackground();
  drawSurfaces();
  drawCollectibles();
  drawEnemy();
  drawGate();
  drawPlayer();
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

resetLevel("Collect the sparks, avoid side hits, reach the glowing gate.");
draw();
window.setTimeout(loop, 1000 / 60);
