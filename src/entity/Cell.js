import 'phaser';
import config from './../config.js';
import { setTimeout } from 'timers';
import utils from './../utils';

/**
 * @abstract
 */
class Cell extends Phaser.Sprite {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} size
     * @param {string} color
     */
    constructor (x, y, size, color) {
        super(window.game, x, y, '');

        this.color = color;

        this.game.add.existing(this);

        this._bodyType = 'simpleCell';

        this.game.physics.enable(this, Phaser.Physics.P2JS); // future P2
        this.body.data.shapes[0].sensor = true;
        this._generateTextureBody(size, color);
        this.body.mass = 1;
        this.size = size;

        this.anchor.setTo(0.5, 0.5);

        this._canSpawnCellWhileThrust = true;

        this.body.onBeginContact.add((hitBody) => {
            if (hitBody === null) return;

            if (typeof hitBody.sprite !== 'undefined') {
                try {
                    if (hitBody.sprite.size > this.size) {
                        console.log('bigger than me ' + this._bodyType + ' ' + this.size);
                        console.log(this.size);
                        hitBody.sprite.addMass(this.size);
                        this.destroy();
                    }
                } catch (e) {}
                // console.log('hit body mass: ' + hitBody.sprite.size);
            }
        }, this);
    }

    update () {

    }

    thrust (rotation, force, size) {
        this.accelerateToAngle(rotation - Math.PI, force);
        // decrease size
        // create another cells
        if (this._canSpawnCellWhileThrust) {
            this._canSpawnCellWhileThrust = false;

            var length = this.size * 2;
            var x = (this.x + Math.cos(rotation) * length);
            var y = (this.y + Math.sin(rotation) * length);

            let cell = new Cell(x, y, size, this.color);
            cell.body.velocity.x = -this.body.velocity.x;
            cell.body.velocity.y = -this.body.velocity.y;
            // cell.accelerateToAngle(rotation, 5000);
            cell.moveToAngle(rotation, force);

            let self = this;
            setTimeout(() => {
                self._canSpawnCellWhileThrust = true;
            }, 150);
        }
    }

    accelerateToAngle (angle, force) {
        this.body.force.x = Math.cos(angle) * force; // accelerateToObject
        this.body.force.y = Math.sin(angle) * force;
    }

    moveToAngle (angle, speed) {
        speed = speed / 3;
        this.body.velocity.x = Math.cos(angle) * speed;
        this.body.velocity.y = Math.sin(angle) * speed;
    }

    addMass (size) {
        try {
            this.size += size;

            this._generateTextureBody(this.size, this.color);
        } catch (e) {}
    }

    takeMass (size) {
        try {
            this.size -= size;

            this._generateTextureBody(this.size, this.color);
        } catch (e) {}
    }

    _generateTextureBody (size, color) {
        let bmd = this.game.add.bitmapData(size * 2, size * 2, true);
        bmd.circle(size, size, size, color);

        this.loadTexture(bmd);

        this.body.setCircle(size);
    }
}

module.exports = Cell;
