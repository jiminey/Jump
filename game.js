const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

let frames = 0;
let platforms = []; 

sprite = new Image();
sprite.src = "src/assets/tileset.png";

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

for (i = 0; i < 30; i++) {
    platforms.push(
        {
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            w: Math.random() * 80 + 30,
            h: Math.random() * 30 + 20
        }
    );
} //generate platforms

const player = {
    sX : 175,
    sY : 150,
    w : 17,
    h : 25,
    x : 200,
    y : 200,

    xvelocity : 0,
    yvelocity : 0,
    onGround : false,
    holdLeft : false,
    holdRight : false,
    gravity : 0.5,

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 2, this.h * 2)
    },

    update : function() {
        if (this.holdLeft) this.xvelocity = -2;
        if (this.holdRight) this.xvelocity = 2;

        this.x += this.xvelocity;
        this.y += this.yvelocity;

        if (this.onGround) {
            this.xvelocity *= 0.78; //friction on ground
        } else {
            this.yvelocity += this.gravity; //falling speed
        }

        this.onGround = false;

        for (let i = 0; i < 30; i++) {
            if (this.x > platforms[i].x &&
                
                this.x < platforms[i].x + platforms[i].w &&
                this.y > platforms[i].y &&
                this.y < platforms[i].y + platforms[i].h
            ) {
                this.y = platforms[i].y;
                this.onGround = true;
            }
        }
    } 
}

const fg = {
    sX : 18,
    sY : 96,
    w : 220,
    h : 48,
    x : 0,
    y : cvs.height - 48,

    draw() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w + 48, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48, this.y, this.w + 48, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48 + this.w + 48, this.y, this.w + 48, this.h);
    }
}


function keyDown(evt){
    switch(evt.keyCode){
        case 37:
            player.holdLeft = true
            break; 
        case 38:
            if (player.onGround) {
                player.yvelocity = -10;
            }
            break;
        case 39:
            player.holdRight = true; 
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

    for (let i = 0; i < 30; i++) {
        ctx.fillRect(
            platforms[i].x,
            platforms[i].y,
            platforms[i].w,
            platforms[i].h
        );
    }
    fg.draw();
    player.draw();
}


function update() {
    player.update();
    
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();