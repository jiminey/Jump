const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

let frames = 0;
let platforms = []; 

sprite = new Image();
sprite.src = "src/assets/tileset.png";

rocks = new Image(); 
rocks.src = "src/assets/rocks.png";

background = new Image();
background.src = "src/assets/background.png";

playersprite = new Image();
playersprite.src = "src/assets/player.png";

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

 //generate platforms

const platform = {
    sX: 30,
    sY: 0,
    w: 32,
    h: 34,
    x: 250,
    y: cvs.height - 48,


    dy: 3, 

    draw : function() {
        for (let i = 0; i < platforms.length; i++) {

            ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h)
            ctx.drawImage(rocks, this.sX, this.sY, this.w, this.h, platforms[i].x, platforms[i].y, platforms[i].w * 2, platforms[i].h * 2)

            
        } 
        
    },

    update : function() {
        if (frames % 50 == 0) {
            platforms.push(
                {
                    x: Math.round(Math.random() * cvs.width) ,
                    y: 0,
                    w: 34,
                    h: 32
                }
            );
        }
        

        for (let i = 0; i < platforms.length; i++) {
            let p = platforms[i];
            p.y += this.dy;

            

            
        }

        

    } 
}


const player = {

    currentAnimation : [
        { sX: 0, sY: 9, w: 50, h: 61},
        { sX: 50, sY: 9, w: 53, h: 63},
        { sX: 100, sY: 9, w: 47, h: 60},
    ],

    rightRunningAnimation : [
        { sX: 8, sY: 83, w: 45, h: 59 },
        { sX: 62, sY: 83, w: 38, h: 59 },
        { sX: 104, sY: 83, w: 45, h: 59 },
        { sX: 156, sY: 83, w: 63, h: 59 },
        { sX: 223, sY: 83, w: 65, h: 59 },
        { sX: 294, sY: 83, w: 53, h: 59 },
        { sX: 350, sY: 83, w: 42, h: 59 },
        { sX: 400, sY: 83, w: 37, h: 59 },
    ],

    rightClimbingAnimation : [
        { sX: 53, sY: 561, w: 33, h: 65 },
        { sX: 95, sY: 569, w: 28, h: 57 },
        { sX: 133, sY: 555, w: 32, h: 72 },
        { sX: 166, sY: 569, w: 31, h: 56 },
        { sX: 207, sY: 572, w: 30, h: 53 },
        { sX: 244, sY: 557, w: 35, h: 68 },

    ],

    animationFrame : 0,
    frameTicks : 0,


    sX : 175,
    sY : 150,
    w : 25,
    h : 25,
    x : 250,
    y : cvs.height -48,

    xvelocity : 1,
    yvelocity : 1,
    onGround : false,
    holdLeft : false,
    holdRight : false,
    gravity : 0.5,
    jumpCount : 2, 
    

    draw : function() {
        let chara = this.currentAnimation[this.animationFrame];
        ctx.drawImage(playersprite, chara.sX, chara.sY, chara.w, chara.h, this.x - 5, this.y - this.h*2, chara.w, chara.h)
    },


    update : function() {

        //if the game state is get ready state, the chara must run slowly
        this.period = 20;

        // count frames that have elapsed, increment the animationFrame by 1 each period
        this.frameTicks++;
        if (this.frameTicks % this.period === 0) {
            this.frameTicks = 0;
            this.animationFrame++;
        }

        //animationFrame goes from 0 to 8, then again to 0
        this.animationFrame = this.animationFrame % this.currentAnimation.length;

        // if (this.xvelocity !== 0 && this.yvelocity !== 0) {
            if (this.holdLeft) this.xvelocity = -4;
            if (this.holdRight) this.xvelocity = 4;
        // }

        if (this.xvelocity !== 0 && this.yvelocity !== 0) {
            this.x += this.xvelocity;
            this.y += this.yvelocity;
        }

        if (this.onGround) {
            this.xvelocity *= 0.78; //friction on ground
        } else {
            this.yvelocity += this.gravity; //falling speed
        }

        this.onGround = false;

        //wall climb
             
        for (let i = 0; i < platforms.length; i++) {
            let p = platforms[i];
            

            
           


            //right

            if (this.x + this.w + this.xvelocity > p.x &&
                this.x + this.w + this.xvelocity < p.x + p.w*2 &&
                this.y - this.yvelocity > p.y &&
                this.y + this.yvelocity < p.y + p.h*2 && this.holdRight) {
                    this.xvelocity *= 0
                    this.jumpCount = 1
                    this.yvelocity *= .88
                    this.x = p.x - this.w - this.xvelocity

                } 
            
            //left

            if (this.x - this.xvelocity > p.x &&
                this.x - this.xvelocity < p.x + p.w*2 &&
                this.y - this.yvelocity > p.y &&
                this.y + this.yvelocity < p.y + p.h*2 && this.holdLeft) {
                    this.xvelocity *= 0
                    this.jumpCount = 1
                    this.yvelocity *= .88

                    this.x = p.x + p.w*2 + this.xvelocity - 2 ;
                } 

            //top

            if (this.y + this.h + this.yvelocity > p.y &&
                this.y + this.h + this.yvelocity < p.y + p.h*2 &&
                this.x + this.w < p.x + p.w*2 &&
                this.x + this.w > p.x) {
                    this.jumpCount = 2;
                    this.y = p.y - this.gravity - 4
                    this.onGround = true 
                }

            //bottom
            if (this.y - this.yvelocity - this.h > p.y &&
                this.y - this.yvelocity - this.h < p.y + p.h*2 + this.h &&
                this.x + this.w < p.x + p.w*2 &&
                this.x + this.w > p.x) {
                    this.jumpCount = 2;
                    this.y = p.y + this.h + p.h*2
                    this.onGround = true; 
                }
                
        }

        //ground collision

        if (this.y >= (fg.y)) {
            this.jumpCount = 2;
            this.y = fg.y;
            this.onGround = true; 
        }

        //outof screen logic
        if (this.x < 0) this.x = cvs.width; 
        if (this.x > cvs.width) this.x = 0;

    
        
    } 

}

const bg = {
    sX: 146,
    sY: 0,
    w: 257,
    h: 800,
    x: -10,
    y: -200,
    dy: 1,
    
    draw() {
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x, this.y, 510, this.h);

    },

    update() {
        this.y += this.dy
    }

}

const fg = {
    sX : 18,
    sY : 96,
    w : 220,
    h : 48,
    x : 0,
    y : cvs.height - 48,
    dy: 0.25, 

    draw() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w + 48, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48, this.y, this.w + 48, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48 + this.w + 48, this.y, this.w + 48, this.h);
    },

    update() {
        this.y += this.dy
    }
}


function keyDown(evt){
    switch(evt.keyCode){
        case 37:
            player.holdLeft = true
            break; 
        case 38:
            if (player.jumpCount > 0) {
                player.yvelocity = -8;
                player.jumpCount -= 1;
            }
            break;
        case 39:
            player.holdRight = true; 
            player.currentAnimation = player.rightRunningAnimation;
            break;
    }
}

function keyUp(evt){
    switch (evt.keyCode) {
        case 37:
            player.holdLeft = false;
            break;
        case 38:
            // caps jump height
            if (player.yvelocity < -3) {
                player.yvelocity = -3;
            }
            break;
        case 39:
            player.holdRight = false; 
            break;
    }
}

function draw() {
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "black";

    bg.draw();
    platform.draw();
    fg.draw();
    player.draw();

}


function update() {
    bg.update();
    player.update();
    platform.update();
    fg.update();
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();