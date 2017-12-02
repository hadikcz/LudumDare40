import 'phaser';
import PlayerControlls from './PlayerControlls';
import PlayerWeapon from './PlayerWeapon';
import EnergyCapacitor from './../../EnergyCapacitor';
import World from './../../World';
import Tunnels from './../../Tunnels';

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
         * @type {World}
         */
        this.gameWorld = window.world;

        /**
         * @type {Tunnels}
         */
        this.tunnels = this.gameWorld.tunnels;

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

        /**
         * @type {boolean}
         */
        this._onDirt = false;

        /**
         * @type {string}
         */
        this.direction = 'front';

        this.anchor.setTo(0.5);
    }

    update () {
        this.controlls.update();

        if (!this.position.equals(this.previousPosition)) {
            this.tunnels.explosion(this.x, this.y, 25);
        }
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
        let radians;
        if (direction === 'front') {
            radians = this.angle * Math.PI / 180;
        } else {
            radians = (this.angle + 180) * Math.PI / 180;
        }

        let length = 50;
        let x = (this.x + Math.cos(radians) * length);
        let y = (this.y + Math.sin(radians) * length);

        let pixel = this.gameWorld.tunnels.getPosPixel(x, y);

        if (pixel[3] === 0) {
            this._onDirt = true;
        } else {
            this._onDirt = false;
        }

        return this._onDirt;
    }

    getVelocity () {
        return 150;
    }
}
