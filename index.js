import * as PIXI from 'pixi.js';
import Victor from 'victor';
import Player from './player';
import Zombie from './zombie';

let canvasSize = 256;
const canvas = document.getElementById("myCanvas");
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f,
});

const player = new Player({ app });
const zombie = new Zombie({ app, player });

app.ticker.add(() => {
    player.update();
    zombie.update();

});