/* global game, Phaser */

import World from './World';
import utils from './utils';
import config from './config';

export default class {
    /**
     * @param {World} world
     */
    constructor (world) {
        /**
         * @type {Phaser.Game}
         * @private
         */
        this.game = window.game;

        /**
         * @type {World} _world - World class
         * @private
         */
        this._world = world;

        /**
         * @type {array}
         */
        this.tunnelsRaw = [];

        /**
         * @type {Phaser.Sprite[]}
         */
        this.bitmapSprites = [];

        /**
         * @type {Phaser.BitmapData[]}
         */
        this.bmpTunnels = [];

        /**
         * @type {number}
         */
        this._counter = 0;

        this.tunnelLayerMargin;

        this.tunnelsRawBuffer = [];

        this.chunkSize = 2048;

        this._createChunks();
    }

    explosion (x, y, size, override) {
        x = Math.round(x);
        y = Math.round(y);
        if (typeof override === 'undefined' || override !== true) {
            this._counter++;
        }

        if (this._counter > 3 || override === true) {
            if (true) { // utils.isOnView(x, y)
                if (typeof this.tunnelsRaw[x] === 'undefined') {
                    this.tunnelsRaw[x] = {};
                }

                if (typeof this.tunnelsRaw[x][y] === 'undefined') {
                    this.tunnelsRaw[x][y] = {};
                }
            }

            if (true) {
                this.createCircle(x, y, size);
                console.log('explosion');
                this.tunnelsRaw[x][y] = size;
            } else {
                console.log('explosion to buffer');
                this.addShootToBuffer(x, y, size);
            }
        }

        if (this._counter > 3) {
            this._counter = 0;
        }
    }

    _createChunks () {
        let borderSize = this._world.borderSize;
        let bitmapSize = this.chunkSize;

        let borderSkip = borderSize / bitmapSize;
        let count = 0;
        for (let x = borderSkip; x < (config.worldSize.x / bitmapSize) - borderSkip; x++) {
            for (let y = borderSkip; y < (config.worldSize.y / bitmapSize) - borderSkip; y++) {
                this._createChunk(count++, x * bitmapSize, y * bitmapSize, bitmapSize);
                console.log('creating chunk');
            }
        }
        this.createSafeZoneTunnels();
    }

    _createChunk (i, x, y, bitmapSize) {
        this.tunnelLayerMargin = this._world.borderSize;

        this.bmpTunnels[i] = this.game.add.bitmapData(bitmapSize, bitmapSize, true);
        this.bmpTunnels[i].dimensions = {
            'x': [x, x + bitmapSize],
            'y': [y, y + bitmapSize]
        };

        this.bmpTunnels[i].context.putImageData(this.bmpTunnels[i].imageData, 0, 0);
        this.bitmapSprites[i] = this.game.add.sprite(x, y, this.bmpTunnels[i]);
    }

    wipeMap (withEffect) {
        if (typeof withEffect !== 'undefined' || withEffect === true) {
            // environment.createWipeEffect();
        }

        this.tunnelsRaw = {};
        this.tunnelsRawBuffer = {};

        this.bmpTunnels.forEach(function (chunk) {
            chunk.clear(0, 0, this.chunkSize, this.chunkSize);
            chunk.blendReset();
            chunk.update();
        });
        this.createSafeZoneTunnels();
    }

    getShootSize () {
        let count = 0;
        for (let x in this.tunnelsRaw) {
            for (let y in this.tunnelsRaw[x]) {
                count++;
            }
        }
        return count;
    }

    getAllShootSize () {
        return this.getBufferSize() + this.getShootSize();
    }

    _getBmpChunk (x, y) {
        let foundedChunk = false;
        this.bmpTunnels.forEach(function (chunk) {
            if (x >= chunk.dimensions.x[0] && x < chunk.dimensions.x[1] &&
                y >= chunk.dimensions.y[0] && y < chunk.dimensions.y[1]) {
                foundedChunk = chunk;
            }
        });
        return foundedChunk;
    }

    // buffer
    /**
     * @param {int} x
     * @param {int} y
     * @param {int} size
     */
    addShootToBuffer (x, y, size) {
        if (typeof this.tunnelsRawBuffer[x] === 'undefined') {
            this.tunnelsRawBuffer[x] = {};
        }
        if (typeof this.tunnelsRawBuffer[x][y] === 'undefined') {
            this.tunnelsRawBuffer[x][y] = {};
        }
        this.tunnelsRawBuffer[x][y] = size;
    }

    flushShootBuffer () {
        this.bmpTunnels.dirty = true;
        for (let x in this.tunnelsRawBuffer) {
            for (let y in this.tunnelsRawBuffer[x]) {
                let size = this.tunnelsRawBuffer[x][y];
                if (typeof this.tunnelsRaw[x] === 'undefined') {
                    this.tunnelsRaw[x] = {};
                }
                if (utils.isOnView(x, y)) {
                    this.tunnelsRaw[x][y] = size;
                    this.createCircle(x, y, size);
                    delete this.tunnelsRawBuffer[x][y];
                }
            }
        }
    }

    getBufferSize () {
        let count = 0;
        for (let x in this.tunnelsRawBuffer) {
            for (let y in this.tunnelsRawBuffer[x]) {
                count++;
            }
        }
        return count;
    }

    createSafeZoneTunnels () {
        let start = new Phaser.Point(1304, 1142);
        let end = new Phaser.Point(1457, 1342);

        let size = 30;

        for (let x = start.x; x < end.x; x += size) {
            for (let y = start.y; y < end.y; y += size) {
                this.createCircle(x, y, size, 'rgba(0, 0, 0, 1)');
            }
        }
    }

    createCircle (x, y, size, color) {
        if (typeof color === 'undefined') {
            let color = 'rgba(0, 0, 0, 1)';
        }
        try {
            let chunk = this._getBmpChunk(x, y);
            chunk.circle(x - chunk.dimensions.x[0], y - chunk.dimensions.y[0], size, color);
        } catch (e) {
            console.log('chunk not found at ' + x + ' ' + y);
        }
    }

    getPosPixel (x, y) {
        try {
            let chunk = this._getBmpChunk(x, y);
            let chunkX = x - chunk.dimensions.x[0];
            let chunkY = y - chunk.dimensions.y[0];

            return chunk.canvas.getContext('2d').getImageData(Math.round(chunkX), Math.round(chunkY), 1, 1).data;
        } catch (e) {
            return [0, 0, 0, 0];
        }
    }
}
