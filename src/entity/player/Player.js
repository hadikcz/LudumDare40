import 'phaser';
import PlayerControlls from './PlayerControlls';
import PlayerWeapon from './PlayerWeapon';
import EnergyCapacitor from './../../EnergyCapacitor';

export default class extends Phaser.Sprite {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor (x, y) {
        super(window.game, x, y, 'tank');

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        /**
         * @type {boolean}
         */
        this._onDirt = false;

        /**
         * @type {PlayerControlls}
         */
        this.controlls = new PlayerControlls(this);

        /**
         * @type {PlayerWeapon}
         */
        this.weapon = new PlayerWeapon(this);

        /**
         * @type {EnergyCapacitor}
         */
        this.energy = new EnergyCapacitor(100, 100);

        this.anchor.setTo(0.5);
    }

    update () {
        this.controlls.update();

        console.log(this.energy.get());
    }

    fire () {
        let fireValue = 0.05;
        if (this.energy.canTake(fireValue)) {
            if (this.weapon.fire()) {
                this.energy.take(fireValue);
            }
        }
    }

    checkDirt (direction) {
        this._onDirt = false;
    }

    getVelocity () {
        return 150;
    }
}
