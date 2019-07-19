

class Platform {

    constructor (canvas, context) {
        this.cvs = canvas; 
        this.ctx = context;
    }

    draw() {

    }

    update() {

        for (i = 0; i < 10; i++) {
            state.platforms.push(
                {
                    x: Math.random() * cvs.width,
                    y: Math.random() * cvs.height,
                    w: Math.random() * 80 + 30,
                    h: Math.random() * 30 + 20
                }
            );
        }
        

    }

}


export default Platform