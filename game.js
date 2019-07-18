const cvs = document.getElementById("game");
const ctx = cvs.getContext('2d');



let frames = 0; 

const sprite = new Image(); 
sprite.src = "src/assets/tileset.png"


const fg = {
    sX : 18,
    sY : 96,
    w : 220,
    h : 48,
    x : 0,
    y : cvs.height - 48, 

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w+60, this.h)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w+60, this.h)


    }
}





function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height)

    fg.draw();
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