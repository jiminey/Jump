import Player from './Player';
import Foreground from './Foreground';


class Game {
    constructor(props) {
        
    }




}

export default Game

const cvs = document.getElementById("game");
const ctx = cvs.getContext('2d');

let frames = 0;

const state = {
    


};



document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

for (i = 0; i < 30; i++){
    state.platforms.push(
        {
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            w: Math.random() * 80 + 30,
            h: Math.random() * 30 + 20
        }
    );
}
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








function draw() {
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, cvs.width, cvs.height)

    ctx.fillStyle = "black";
    for (let i = 0; i < 30; i++) {
        ctx.fillRect(
            state.platforms[i].x,
            state.platforms[i].y,
            state.platforms[i].w,
            state.platforms[i].h
        );
    } 

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