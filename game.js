const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

let frames = 0;
let score = 0;
let highscore = 0;
let gameState = 0;
let platforms = [];

gameover = new Image();
gameover.src = "src/assets/gameover.jpg";

sprite = new Image();
sprite.src = "src/assets/tileset.png";

rocks = new Image();
rocks.src = "src/assets/rocks.jpg";

background = new Image();
background.src = "src/assets/background.jpg";

playersprite = new Image();
playersprite.src = "src/assets/player.png";

leftplayersprite = new Image();
leftplayersprite.src = "src/assets/leftplayer.png";

jumpSound = new Audio();
jumpSound.src = "src/assets/sfx_flap.wav";

pointSound = new Audio();
pointSound.src = "src/assets/sfx_point.wav";

music = new Audio();
music.src = "src/assets/sunflowerinstrumental.mp3";

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

document.getElementById("mute").addEventListener("click", function(evt) {
  if (music.muted) {
    music.muted = false;
    evt.target.innerHTML = "mute";
  } else {
    music.muted = true;
    evt.target.innerHTML = "unmute";
  }
});

//generate platforms
const platform = {
  sX: 0,
  sY: 114,
  w: 105,
  h: 105,
  x: 250,
  y: cvs.height - 48,
  dy: 2,

  draw: function() {
    for (let i = 0; i < platforms.length; i++) {
      ctx.fillRect(
        platforms[i].x,
        platforms[i].y,
        platforms[i].w,
        platforms[i].h
      );
      ctx.drawImage(
        rocks,
        this.sX,
        this.sY,
        this.w,
        this.h,
        platforms[i].x,
        platforms[i].y,
        platforms[i].w * 2,
        platforms[i].h * 2
      );
    }
  },

  update: function() {
    if (frames % 70 == 0 && gameState !== 1 && frames >= 10) {
      platforms.push({
        x: Math.round(Math.random() * cvs.width),
        y: 0,
        w: Math.round(Math.random() * 10 + 30),
        h: Math.round(Math.random() * 40 + 30)
      });
      this.dy += 0.1;
    }

    for (let i = 0; i < platforms.length; i++) {
      let p = platforms[i];
      p.y += this.dy;

      if (p.y > cvs.height) {
        platforms.shift();
        score += 1;
      }
    }
  }
};

const player = {
  currentAnimation: [
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 100, sY: 9, w: 47, h: 60 },
    { sX: 100, sY: 9, w: 47, h: 60 }
  ],

  idleAnimation: [
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 0, sY: 9, w: 50, h: 61 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 50, sY: 9, w: 53, h: 63 },
    { sX: 100, sY: 9, w: 47, h: 60 },
    { sX: 100, sY: 9, w: 47, h: 60 }
  ],

  rightRunningAnimation: [
    { sX: 8, sY: 78, w: 45, h: 59 },
    { sX: 62, sY: 78, w: 38, h: 59 },
    { sX: 104, sY: 78, w: 45, h: 59 },
    { sX: 156, sY: 78, w: 63, h: 59 },
    { sX: 223, sY: 78, w: 65, h: 59 },
    { sX: 294, sY: 78, w: 53, h: 59 },
    { sX: 350, sY: 78, w: 42, h: 59 },
    { sX: 400, sY: 78, w: 37, h: 59 }
  ],

  leftRunningAnimation: [
    { sX: 497, sY: 81, w: 49, h: 61 },
    { sX: 446, sY: 82, w: 41, h: 56 },
    { sX: 400, sY: 80, w: 50, h: 57 },
    { sX: 332, sY: 82, w: 60, h: 56 },
    { sX: 260, sY: 80, w: 68, h: 56 },
    { sX: 205, sY: 80, w: 52, h: 58 },
    { sX: 161, sY: 83, w: 41, h: 56 },
    { sX: 114, sY: 81, w: 41, h: 59 }
  ],

  rightClimbingAnimation: [
    { sX: 53, sY: 561, w: 33, h: 65 },
    { sX: 53, sY: 561, w: 33, h: 65 },
    { sX: 95, sY: 569, w: 28, h: 57 },
    { sX: 133, sY: 555, w: 32, h: 72 },
    { sX: 166, sY: 569, w: 31, h: 56 },
    { sX: 207, sY: 572, w: 30, h: 53 },
    { sX: 244, sY: 557, w: 35, h: 68 },
    { sX: 244, sY: 557, w: 35, h: 68 }
  ],

  leftClimbingAnimation: [
    { sX: 463, sY: 561, w: 35, h: 67 },
    { sX: 463, sY: 561, w: 35, h: 67 },
    { sX: 426, sY: 572, w: 31, h: 58 },
    { sX: 426, sY: 572, w: 31, h: 58 },
    { sX: 354, sY: 569, w: 31, h: 59 },
    { sX: 354, sY: 569, w: 31, h: 59 },
    { sX: 313, sY: 569, w: 33, h: 56 },
    { sX: 313, sY: 569, w: 33, h: 56 }
  ],

  rightJumpingAnimation: [
    { sX: 5, sY: 366, w: 57, h: 68 },
    { sX: 5, sY: 366, w: 57, h: 68 },
    { sX: 68, sY: 386, w: 63, h: 56 },
    { sX: 68, sY: 386, w: 63, h: 56 },
    { sX: 134, sY: 372, w: 57, h: 63 },
    { sX: 134, sY: 372, w: 57, h: 63 },
    { sX: 190, sY: 390, w: 64, h: 42 },
    { sX: 190, sY: 390, w: 64, h: 42 }
  ],

  leftJumpingAnimation: [
    { sX: 489, sY: 371, w: 53, h: 63 },
    { sX: 489, sY: 371, w: 53, h: 63 },
    { sX: 421, sY: 388, w: 64, h: 45 },
    { sX: 421, sY: 388, w: 64, h: 45 },
    { sX: 294, sY: 390, w: 63, h: 43 },
    { sX: 294, sY: 390, w: 63, h: 43 },
    { sX: 231, sY: 390, w: 65, h: 42 },
    { sX: 231, sY: 390, w: 65, h: 42 }
  ],

  rightTopAnimation: [
    { sX: 8, sY: 517, w: 69, h: 34 },
    { sX: 8, sY: 517, w: 69, h: 34 },

    { sX: 180, sY: 514, w: 75, h: 30 },
    { sX: 180, sY: 514, w: 75, h: 30 },

    { sX: 262, sY: 518, w: 67, h: 26 },
    { sX: 262, sY: 518, w: 67, h: 26 },

    { sX: 428, sY: 516, w: 77, h: 30 },
    { sX: 428, sY: 516, w: 77, h: 30 }
  ],

  leftTopAnimation: [
    { sX: 472, sY: 517, w: 74, h: 29 },
    { sX: 472, sY: 517, w: 74, h: 29 },
    { sX: 292, sY: 517, w: 76, h: 27 },
    { sX: 292, sY: 517, w: 76, h: 27 },
    { sX: 224, sY: 519, w: 66, h: 27 },
    { sX: 224, sY: 519, w: 66, h: 27 },
    { sX: 45, sY: 518, w: 76, h: 27 },
    { sX: 45, sY: 518, w: 76, h: 27 }
  ],

  leftBottomAnimation: [
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 },
    { sX: 339, sY: 465, w: 46, h: 40 }
  ],

  rightBottomAnimation: [
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 },
    { sX: 165, sY: 465, w: 47, h: 40 }
  ],

  animationFrame: 0,
  frameTicks: 0,
  sX: 175,
  sY: 150,
  w: 25,
  h: 25,
  x: 250,
  y: cvs.height - 48,
  xvelocity: 1,
  yvelocity: 1,
  onGround: false,
  holdLeft: false,
  holdRight: false,
  gravity: 0.3,
  jumpCount: 3,
  diff: 0,
  left: true,
  right: false,

  draw: function() {
    let chara = this.currentAnimation[this.animationFrame];
    if (this.right) {
      ctx.drawImage(
        playersprite,
        chara.sX,
        chara.sY,
        chara.w,
        chara.h,
        this.x - 5,
        this.y - this.h,
        chara.w / 1,
        chara.h / 1
      );
    } else {
      ctx.drawImage(
        leftplayersprite,
        chara.sX,
        chara.sY,
        chara.w,
        chara.h,
        this.x - 5,
        this.y - this.h,
        chara.w / 1,
        chara.h / 1
      );
    }
  },

  update: function() {
    //if the game state is get ready state, the chara must run slowly
    this.period = 10;

    // count frames that have elapsed, increment the animationFrame by 1 each period
    this.frameTicks++;
    if (this.frameTicks % this.period === 0) {
      this.frameTicks = 0;
      this.animationFrame++;
    }

    //animationFrame goes from 0 to 8, then again to 0
    this.animationFrame = this.animationFrame % this.currentAnimation.length;

    if (this.holdLeft) this.xvelocity = -4;
    if (this.holdRight) this.xvelocity = 4;

    if (this.xvelocity !== 0 && this.yvelocity !== 0) {
      this.x += this.xvelocity;
      this.y += this.yvelocity;
    }

    if (this.onGround) {
      this.xvelocity *= 0.78; //friction on ground
      if (this.onGround && this.right) {
        this.currentAnimation = this.rightRunningAnimation;
      } else {
        this.currentAnimation = this.leftRunningAnimation;
      }
    } else {
      this.yvelocity += this.gravity; //falling speed
      if (this.right) {
        this.currentAnimation = this.rightJumpingAnimation;
      } else {
        this.currentAnimation = this.leftJumpingAnimation;
      }
    }

    this.onGround = false;

    //wall climb

    for (let i = 0; i < platforms.length; i++) {
      let p = platforms[i];

      //right collision

      if (
        this.x + this.w > p.x &&
        this.x + this.w + this.xvelocity < p.x + p.w * 2 &&
        this.y - this.yvelocity > p.y &&
        this.y + this.yvelocity < p.y + p.h * 2
      ) {
        this.jumpCount = 3;
        this.yvelocity *= 0.88;
        this.x = p.x - this.w;
        this.currentAnimation = this.rightClimbingAnimation;
        this.y += 2;
        pointSound.play();
        score += 1;
      }

      //left collision

      if (
        this.x - this.xvelocity > p.x &&
        this.x - this.xvelocity < p.x + p.w * 2 &&
        this.y - this.yvelocity > p.y &&
        this.y + this.yvelocity < p.y + p.h * 2
      ) {
        this.jumpCount = 3;
        this.yvelocity *= 0.88;
        this.x = p.x + p.w * 2 + this.xvelocity - 2;
        this.currentAnimation = this.leftClimbingAnimation;
        this.y += 2;
        pointSound.play();
        score += 1;
      }

      //top collision

      if (
        this.y + this.h + this.yvelocity > p.y &&
        this.y + this.h + this.yvelocity < p.y + p.h * 2 &&
        this.x + this.w < p.x + p.w * 2 &&
        this.x + this.w > p.x
      ) {
        this.jumpCount = 3;
        this.y = p.y - this.gravity - 4;
        this.onGround = true;
        if (this.right) {
          this.currentAnimation = this.rightTopAnimation;
        } else {
          this.currentAnimation = this.leftTopAnimation;
        }
        this.y += 2;
        pointSound.play();
        score += 1;
      }

      //bottom collision
      if (
        this.y - this.yvelocity - this.h > p.y &&
        this.y - this.yvelocity - this.h < p.y + p.h * 2 + this.h &&
        this.x + this.w < p.x + p.w * 2 &&
        this.x + this.w > p.x
      ) {
        this.jumpCount = 3;
        this.y = p.y + this.h + p.h * 2;
        this.onGround = true;
        if (this.right) {
          this.currentAnimation = this.rightBottomAnimation;
        } else {
          this.currentAnimation = this.leftBottomAnimation;
        }
        this.y += 2;
        pointSound.play();
        score += 1;
      }
    }

    if (this.y > cvs.height + 20) {
      gameState = 1; //lose game
      platforms = [];
    }
    //ground collision

    if (this.y >= fg.y) {
      this.jumpCount = 3;
      this.y = fg.y;
      this.onGround = true;
    }
    //outof screen logic
    if (this.x < 0) this.x = cvs.width;
    if (this.x > cvs.width) this.x = 0;
  }
};

const bg = {
  sX: 0,
  sY: 0,
  w: 600,
  h: 1000,
  x: 0,
  y: 700,
  dy: 2,

  draw() {
    if (gameState === 0) {
      ctx.drawImage(
        background,
        this.sX,
        this.sY,
        this.w,
        this.h,
        this.x,
        this.y - this.h / 2,
        690,
        this.h
      );
    } else if (gameState === 1) {
      ctx.drawImage(gameover, 0, 0, 650, 650, 0, 0, 550, 700);
    }
  },

  update() {
    if (frames % 1000 === 0) {
      this.y = (this.y + this.dy) % (this.h / 2);
      this.dy += 0.5;
    }
  }
};

const fg = {
  sX: 18,
  sY: 96,
  w: 220,
  h: 48,
  x: 0,
  y: cvs.height - 48,
  dy: 0.2,

  draw() {
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w + 48,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w + 48,
      this.y,
      this.w + 48,
      this.h
    );
    ctx.drawImage(
      sprite,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w + 48 + this.w + 48,
      this.y,
      this.w + 48,
      this.h
    );
  },

  update() {
    this.y += this.dy;
  }
};

function keyDown(evt) {
  switch (evt.keyCode) {
    case 37:
      evt.preventDefault();
      player.holdLeft = true;
      player.left = true;
      player.right = false;
      break;
    case 38:
      evt.preventDefault();
      if (player.jumpCount > 0) {
        player.yvelocity = -8;
        player.jumpCount -= 1;
        player.y -= 5;
        jumpSound.play();
      }
      break;
    case 39:
      evt.preventDefault();
      player.holdRight = true;
      player.right = true;
      player.left = false;
      break;
    case 32:
      evt.preventDefault();
      reset();
      break;
  }
}

function keyUp(evt) {
  switch (evt.keyCode) {
    case 37:
      player.holdLeft = false;

      break;
    case 38:
      // caps jump height
      if (player.yvelocity < -3) {
        player.y -= 2;
        player.yvelocity = -3;
      }
      break;
    case 39:
      player.holdRight = false;
      break;
  }
}

function reset() {
  platforms = [];
  score = 0;
  gameState = 0;
  //fg
  fg.sX = 18;
  fg.sY = 96;
  fg.w = 220;
  fg.h = 48;
  fg.x = 0;
  fg.y = cvs.height - 48;

  //bg
  sX = 0;
  sY = 0;
  w = 600;
  h = 1000;
  x = 0;
  y = 700;
  dy = 2;

  //player
  player.sX = 175;
  player.sY = 150;
  player.w = 25;
  player.h = 25;
  player.x = 250;
  player.y = cvs.height - 48;
  player.xvelocity = 1;
  player.yvelocity = 1;
  player.onGround = false;
  player.holdLeft = false;
  player.holdRight = false;
  player.gravity = 0.3;
  player.jumpCount = 3;
  player.diff = 0;
  player.left = true;
  player.right = false;

  //platform
  platform.sX = 0;
  platform.sY = 114;
  platform.w = 105;
  platform.h = 105;
  platform.x = 250;
  platform.y = cvs.height - 48;
  platform.dy = 2;
}

function drawScore() {
  ctx.font = "25px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 16, 30);

  ctx.font = "25px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("HighScore: " + highscore, 16, 60);
}

function draw() {
  ctx.fillStyle = "#999";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "black";
  bg.draw();
  platform.draw();
  fg.draw();
  player.draw();
  drawScore();
  music.play();
}

function update() {
  bg.update();
  player.update();
  platform.update();
  fg.update();
  if (score > highscore) {
    highscore = score;
  }
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}

loop();
