const cvs = document.getElementById("game");
const ctx = cvs.getContext('2d');



let frames = 0; 

const sprite = new Image(); 
sprite.src = "src/assets/tileset.png"


let key_watcher = {
    39 : false,
    37 : false, 
    38 : false 
}


document.addEventListener("keydown", function (evt) {
 
    if (evt.keyCode in key_watcher) {
        key_watcher[evt.keyCode] = true;

        if (evt.keyCode === 39) {
            chara.right = true;
            chara.x += chara.xspeed;
            
        }
        if (evt.keyCode === 37) {
            chara.left = true;
            chara.x += chara.xspeed;
        }
        if (evt.keyCode === 38) {
            chara.hop();
        }       
    }  
});

document.addEventListener("keyup", function (evt) {
    if (evt.keyCode in key_watcher) {
        key_watcher[evt.keyCode] = false;
    }
});


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

    xspeed: 10,
    velocity: 0.05, 
    frame: 0,
    gravity: 0.05,
    jump: 15,
    yspeed: 0,
    jump_counter: 2,
    left: false,
    right: false, 

    
    hop : function () {
        if (this.jump_counter !== 0) {
            this.jump -= this.velocity; 

            this.y -= 30;
            this.jump_counter -= 1;
        }
    
    },
    
    
    draw : function() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 2, this.h * 2 )
    },

    update : function() {
            if (this.left) {
                this.left = !this.left; 
                if (this.velocity > 0) {
                    this.velocity = this.velocity * -1;
                    this.xspeed = 10;
                }
            } else if (this.right) {
                this.right = !this.right;
                if (this.velocity < 0) {
                    this.velocity = this.velocity * -1;
                    this.xspeed = 10;
                }
            }

            this.yspeed += this.gravity; //fall faster the higher you fall
            this.xspeed += this.velocity;
            

            //ground logic 
            if (this.y >= cvs.height - fg.h - 48) {
                this.speed += this.velocity; 
                this.y = cvs.height - fg.h - 48; //stays on ground 
                this.yspeed = 0; 
                this.jump_counter = 2; //reset jump counter
            }

            //air logic
            if (this.y < cvs.height - fg.h) {
                this.y += this.yspeed; // this changes y position, gravity
            }


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