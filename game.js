

const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

let frames = 0;
let platforms = []; 

sprite = new Image();
sprite.src = "src/assets/tileset.png";

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

 //generate platforms

const platform = {
    dy: 2, 

    draw : function() {
        for (let i = 0; i < platforms.length; i++) {
            ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h)
        } 
        
    },

    update : function() {
        if (frames % 100 == 0) {
            platforms.push(
                {
                    x: Math.round(Math.random() * cvs.width *.8) ,
                    y: 100,
                    w: 80,
                    h: 100
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
    sX : 175,
    sY : 150,
    w : 25,
    h : 25,
    x : 50,
    y : 10,

    xvelocity : 1,
    yvelocity : 1,
    onGround : false,
    holdLeft : false,
    holdRight : false,
    gravity : 0.5,
    jumpCount : 2, 
    

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x - 5, this.y - this.h*2, this.w*2, this.h*2)
    },

    update : function() {

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
                this.x + this.w + this.xvelocity < p.x + p.w &&
                this.y - this.yvelocity > p.y &&
                this.y + this.yvelocity < p.y + p.h && this.holdRight) {
                    this.xvelocity *= 0
                    this.x = p.x - this.w - this.xvelocity;

                } 

            if (this.x - this.xvelocity > p.x &&
                this.x - this.xvelocity < p.x + p.w &&
                this.y - this.yvelocity > p.y &&
                this.y + this.yvelocity < p.y + p.h && this.holdLeft) {
                    this.xvelocity *= 0
                    this.x = p.x + p.w + this.xvelocity - 2 ;
                } 

            if (this.y + this.yvelocity > p.y &&
                this.y + this.yvelocity < p.y + p.h &&
                this.x + this.w < p.x + p.w &&
                this.x + this.w > p.x) {
                    this.y = p.y - this.gravity
                    this.onGround = true 
                }

                
        }

        //ground collision

        if (this.y >= cvs.height - fg.h ) {
            this.jumpCount = 2;
            this.y = cvs.height - fg.h ;
            this.onGround = true; 
        }

        //outof screen logic
        if (this.x < 0) this.x = cvs.width; 
        if (this.x > cvs.width) this.x = 0;

    
        
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
            if (player.jumpCount > 0) {
                player.yvelocity = -10;
                player.jumpCount -= 1;
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

    platform.draw();
    fg.draw();
    player.draw();
}


function update() {
    player.update();
    platform.update();
    
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();