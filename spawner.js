export default class Spawner {
    constructor({ create }) {
        const spawnInterval = 1000;
        this.maxSpawns = 30;
        this.create = create;
        this.spawns = [];
        setInterval(() => this.spawn(), spawnInterval);
    }

    spawn() {
        if (this.spawns.length >= this.maxSpawns) {
            return;
        }
        const spawn = this.create();
        this.spawns.push(spawn);
    }
}