import * as PIXI from 'pixi.js';
import Victor from 'victor';
export default class Zombie {
    constructor({ app, player }) {
        this.app = app;
        this.player = player;
        this.zombieRadius = 16;
        this.speed = 2;
        this.zombie = new PIXI.Graphics();
        this.r = this.spawnRandomZombie();
        this.zombie.position.set(this.r.x, this.r.y);
        this.zombie.beginFill(0x0000FF);
        this.zombie.drawCircle(0, 0, this.zombieRadius);
        this.zombie.endFill();
        app.stage.addChild(this.zombie);
    }

    update() {
        const zombiePosition = new Victor(this.zombie.position.x, this.zombie.position.y);
        let playerPosition = new Victor(this.player.position.x, this.player.position.y);
        if (zombiePosition.distance(playerPosition) < this.player.width /2) { 
            let r = this.spawnRandomZombie();
            this.zombie.position.set(r.x, r.y);
            return;
    }
        let direction = playerPosition.subtract(zombiePosition);
        let velocity = direction.normalize().multiplyScalar(this.speed);
        this.zombie.position.set(this.zombie.position.x + velocity.x, this.zombie.position.y + velocity.y);
    }


    /**
     * Description:
     * Spawn the zombies from the four corners of the screen
     */

    spawnRandomZombie() {
        this.edge = Math.ceil(Math.random() * 4);
        this.spawnPoint = new Victor(0, 0);
        this.canvasSize = this.app.screen.width;

        switch (this.edge) {
            case 1: //top
                this.spawnPoint.x = this.canvasSize * Math.random();
                this.spawnPoint.y = 0;
                break;
            case 2: //right
                this.spawnPoint.y = this.canvasSize * Math.random();
                this.spawnPoint.x = this.canvasSize;
                break;
            case 3: //bottom
                this.spawnPoint.x = this.canvasSize * Math.random();
                this.spawnPoint.y = this.canvasSize;
                break;
            default: //left
                this.spawnPoint.y = this.canvasSize * Math.random();
                break;

        }

        return this.spawnPoint;
    }
}