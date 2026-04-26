const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const statusEl = document.querySelector("#status");

const world = {
  width: canvas.width,
  height: canvas.height,
  groundY: 440,
};

const player = {
  x: 110,
  y: world.groundY - 56,
  width: 36,
  height: 56,
  vx: 0,
  vy: 0,
  speed: 300,
  jumpForce: 720,
  onGround: true,
};

const physics = {
  gravity: 1800,
  groundFriction: 0.82,
};

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

function update(dt) {
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

  const floorY = world.groundY - player.height;
  if (player.y >= floorY) {
    player.y = floorY;
    player.vy = 0;
    player.onGround = true;
  }

  statusEl.textContent = player.onGround ? "Grounded" : "Jumping";
}

function drawBackground() {
  ctx.fillStyle = "#263537";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = "#314246";
  ctx.fillRect(0, world.groundY, world.width, world.height - world.groundY);

  ctx.fillStyle = "#5e746b";
  ctx.fillRect(0, world.groundY, world.width, 8);

  ctx.fillStyle = "rgba(242, 240, 232, 0.08)";
  for (let x = 60; x < world.width; x += 130) {
    ctx.fillRect(x, 90, 52, 260);
  }
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

draw();
window.setTimeout(loop, 1000 / 60);
