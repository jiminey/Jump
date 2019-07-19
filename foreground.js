import sprite from '../src/assets/tileset.png';


class Foreground {

    constructor(canvas, context) {
        this.cvs = canvas,
        this.ctx = context,

        this.sprite = new Image();
        this.sprite.src = sprite;

        this.sX = 18,
        this.sY = 96,
        this.w = 220,
        this.h = 48,
        this.x = 0,
        this.y = this.cvs.height - 48
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w + 48, this.h)
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48, this.y, this.w + 48, this.h)
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x + this.w + 48 + this.w + 48, this.y, this.w + 48, this.h)
    }
}

export default Foreground


