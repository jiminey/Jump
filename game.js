const cvs = document.getElementById("game");
const ctx = cvs.getContext('2d');



let frames = 0; 

const sprite = new Image(); 
sprite.src = "src/assets/tileset.png"

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

 
function keyDown(evt){
    switch(evt.keyCode){
        case 37:
            chara.holdLeft = true;
            break; 
        case 38:
            if (chara.onGround) {
                chara.yvelocity = -10;
            }
            break;
        case 39:
            chara.holdRight = true; 
            break;
    }
}

function keyUp(evt){
    switch (evt.keyCode) {
        case 37:
            chara.holdLeft = false;
            break;
        case 38:
            // caps jump height
            if (chara.yvelocity < -3) {
                chara.yvelocity = -3;
            }
            break;
        case 39:
            chara.holdRight = false; 
            break;
    }
}


function update() {
    ctx.fillStyle="black";
    ctx.fillRect();
    for( let i = 0; i < 50; i++ ){
        plat[i]
    }
}


const fg = {
    sX : 18,
    sY : 96,
    w : 220,
    h : 48,
    x : 0,
    y : cvs.height - 48, 

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w + 48, this.h)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w +48, this.y, this.w + 48, this.h)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48 + this.w + 48, this.y, this.w + 48, this.h)

    }
}

const chara = {
    sX: 175,
    sY: 150,
    w: 17,
    h: 25,
    x: 250,
    y: cvs.height - fg.h - 48,

    xvelocity: 0,
    yvelocity: 0, 
    onGround: false,
    holdLeft: false,
    holdRight: false,

    
    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 2, this.h * 2 )
    },

    update : function() {
            
           
            

            this.speed += this.gravity; //fall faster the higher you fall

            if (this.holdLeft) {
                this.xvelocity = -2;
            }

            if (this.holdRight) {
                this.xvelocity = 2 
            }

            this.x += this.xvelocity;
            this.y += this.yvelocity; 

            if (this.onGround){

                this.xvelocity *= 0.78;
            } else {

            }

            //ground logic 
            if (this.y >= cvs.height - fg.h - 48) {
                this.y = cvs.height - fg.h - 48; //stays on ground 
                this.speed = 0; 
                this.jump_counter = 2; //reset jump counter
            }

            //air logic
            // if (this.y < cvs.height - fg.h) {
            //     this.y += this.speed; // this changes y position, gravity
            // }


    }

}





function draw() {
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, cvs.width, cvs.height)

    fg.draw();
    chara.draw();
}

function update() {
    chara.update();
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();