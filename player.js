import sprite from '../src/assets/tileset.png';

class Player {

    constructor(canvas, context, platforms) {
        
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w * 2, this.h * 2)
    }

    
}

export default Player