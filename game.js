import Player from './Player';
import Foreground from './Foreground';


class Game {
    constructor() {
        this.cvs = document.getAnimations("game");
        this.ctx =cvs.getContext("2d");

        this.frames = 0;
        this.platforms = []; 
        
    }


    generatePlatforms() { 

    }


    draw() {
        this.ctx.fillStyle = "#999";
        this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
        this.ctx.fillStyle = "black";

        for (let i = 0; i < 30; i++) {
            this.ctx.fillRect(
                this.platforms[i].x,
                this.platforms[i].y,
                this.platforms[i].w,
                this.platforms[i].h
            );
        }
        fg.draw();
        chara.draw();
    }

    update() {

    }
}

export default Game




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
    chara.update();
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();