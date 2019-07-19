import sprite from '../src/assets/tileset.png';

class Player {

    constructor(canvas, context, platforms) {
        this.cvs = canvas, 
        this.ctx = context,
        this.platforms = platforms,

        this.sX = 175,
        this.sY = 150,
        this.w = 17,
        this.h = 25,
        this.x = 200,
        this.y = 200,

        this.xvelocity = 0,
        this.yvelocity = 0,
        this.onGround = false,
        this.holdLeft = false,
        this.holdRight = false,
        this.gravity = 0.5

        this.sprite = new Image();
        this.sprite.src = sprite;
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 2, this.h * 2)
    }

    update() {
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
            if (this.x > state.platforms[i].x &&
                this.x < state.platforms[i].x + state.platforms[i].w &&
                this.y > state.platforms[i].y &&
                this.y < state.platforms[i].y + state.platforms[i].h
                ){
                this.y = state.platforms[i].y;
                this.onGround = true;
                }
            }
        }
}

export default Player