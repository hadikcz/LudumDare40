import 'phaser';
import Cell from './Cell';

/**
 * @abstract
 */
export default class extends Cell {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} size
     * @param {string} color
     */
    constructor (x, y, size, color) {
        super(x, y, size, color);

        this._bodyType = 'liveCell';
    }

    update () {
        if (this.game.input.activePointer.leftButton.isDown) {
            let takenSize = Math.round(this.size / 25);
            console.log(this.size + ' ' + takenSize);
            if (this.size - takenSize <= 10 || takenSize <= 0) {
                console.log('too small');
                return;
            }
            let rotation = this.game.physics.arcade.angleToPointer(this);
            if (this._canSpawnCellWhileThrust) {
                console.log('take mass ' + takenSize);
                this.takeMass(takenSize);
            }
            this.thrust(rotation, 500, takenSize);
        }
    }
}
