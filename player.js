import * as PIXI from 'pixi.js';
import Shooter from './shooter';

export default class Player {
    constructor({app}) {
        this.app = app;
        this.playerWidth = 32;
        this.player = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.player.anchor.set(0.5);
        this.player.position.set(app.screen.width / 2, app.screen.height / 2);
        this.player.width = this.player.height = this.playerWidth;
        this.player.tint = 0xea985d;
        app.stage.addChild(this.player);

        this.lastMouseButton = 0;
        this.shooting = new Shooter({app, player: this});
    }

    get position() { 
        return this.player.position;
    }

    get width() {
        return this.playerWidth;
    }

    update() { 
        const mouse = this.app.renderer.plugins.interaction.mouse;
        const cursorPosition = mouse.global;
        let angle = Math.atan2(cursorPosition.y - this.player.y, cursorPosition.x - this.player.x) + Math.PI / 2;
        this.player.rotation = angle;

        if (mouse.buttons !== this.lastMouseButton) {
            this.shooting.shoot = mouse.buttons !== 0;
            this.lastMouseButton = mouse.buttons;
        }
        this.shooting.update();
    }
}