import 'phaser';
import Tunnels from './Tunnels';
import config from './config';

export default class {
    constructor () {
        /**
         * @type {Phaser.Game}
         */
        this.game = window.game;

        /**
         * @type {Phaser.Group}
         */
        this.sandSprites = this.game.add.group();

        /**
         * @type {number}
         */
        this.borderSize = 1024;

        /**
         * @type {Tunnels}
         */
        this.tunnels = new Tunnels(this);

        this.createSand();

        this.game.time.events.loop(1000, function () {
            this.tunnels.flushShootBuffer();
        }, this);
    }

    update () {
        this.tunnels.update();
    }

    createSand () {
        var spriteSize = 512;

        var borderSkip = this.borderSize / spriteSize; // 2

        for (var x = borderSkip; x < (config.worldSize.x / spriteSize) - borderSkip; x++) {
            for (var y = borderSkip; y < (config.worldSize.y / spriteSize) - borderSkip; y++) {
                this.sandSprites.create(x * spriteSize, y * spriteSize, 'dirtTexture');
            }
        }
    }
}
