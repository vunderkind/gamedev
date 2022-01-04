import * as PIXI from 'pixi.js';
import Victor from 'victor';

let canvasSize = 256;
const canvas = document.getElementById("myCanvas");
console.log('hey', canvas)
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f,
});

let squareWidth = 32;
const square = new PIXI.Sprite(PIXI.Texture.WHITE);
square.anchor.set(0.5);
square.position.set(app.screen.width / 2, app.screen.height / 2);
square.width = square.height = squareWidth;
square.tint = 0xea985d;

app.stage.addChild(square);

app.ticker.add(() => {
    const cursorPosition = app.renderer.plugins.interaction.mouse.global;

    let angle = Math.atan2(cursorPosition.y - square.y, cursorPosition.x - square.x) + Math.PI / 2;

    square.rotation = angle;
});

/**
 * Description:
 * Spawn the zombies from the four corners of the screen
 */

function spawnRandomZombie() {
    let edge = Math.ceil(Math.random() * 3);
    let spawnPoint = new Victor(0, 0);

    switch (edge) {
        case 0: //top
            spawnPoint.x = canvasSize * Math.random();
            break;
        case 1: //right
            spawnPoint.y = canvasSize * Math.random();
            spawnPoint.x = canvasSize;
            break;
        case 2: //bottom
            spawnPoint.x = canvasSize * Math.random();
            spawnPoint.y = canvasSize;
            break;
        default: //left
            spawnPoint.y = canvasSize * Math.random();
            break;

    }
}