import Player from './Player';
import Foreground from './Foreground';



const cvs = document.getAnimations("game");
const ctx = cvs.getContext("2d");

let frames = 0;
let platforms = []; 

let player = new Player(cvs, ctx, platforms); 
let fg = new Foreground(cvx, ctx);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

for (i = 0; i < 10; i++) {
    platforms.push(
        {
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            w: Math.random() * 80 + 30,
            h: Math.random() * 30 + 20
        }
    );
} //generate platforms



function keyDown(evt){
    switch(evt.keyCode){
        case 37:
            player.holdLeft = true;
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
    
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();