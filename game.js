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
    y : cvs.height- 18, 

    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w+30, this.h - 30)
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w +30, this.y, this.w+30, this.h - 30)
    }
}

const char = {
    sX: 175,
    sY: 150,
    w: 17,
    h: 25,
    x: 250,
    y: cvs.height - 70, 


    frame: 0,
    gravity: 0.25,
    jump: 6.6,
    speed: 0,
    jump_counter: 0,

    
    jump : function () {
        if (this.jump_counter > 0) {
            this.speed = -this.jump;
            this.y = this.y - 1;
            this.jump_counter -= 1;
        }
        
    },
    
    
    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
    },

    update : function() {
        
            this.speed += this.gravity;

            //ground logic 
            if (this.y >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h; //stays on ground 
                this.speed = 0; 
                this.jump_counter = 2; //reset jump counter
            }

            //air logic
            if (this.y < cvs.height - fg.h) {
                this.y += this.speed; // this changes y position, gravity
            }


    }

}





function draw() {
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, cvs.width, cvs.height)

    fg.draw();
    char.draw();
}

function update() {
    char.update();
}


function loop() {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop); 
}

loop();