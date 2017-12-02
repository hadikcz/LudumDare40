import 'phaser';
import Player from './Player';

export default class {
    /**
     * @param {Player} player
     */
    constructor (player) {
        /**
         * @type {Phaser.Game}
         */
        this.game = window.game;

        /**
         * @type {Player}
         */
        this.player = player;

        /**
         * @type {Phaser.Weapon}
         */
        this.weapon = this.game.add.weapon(300, 'bullet');

        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletAngleOffset = 90;
        this.weapon.bulletSpeed = 400;
        this.weapon.fireRate = 60;
        this.weapon.bulletAngleVariance = 3;
        this.weapon.trackSprite(this.player, 15, 0, true);
    }

    fire () {
        return this.weapon.fire();
    }
}
