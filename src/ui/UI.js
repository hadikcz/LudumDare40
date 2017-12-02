'use strict';
import 'phaser';
import TankEnergyUI from './TankEnergyUI';

export default class {
    /**
     *
     * @param {Player} player
     */
    constructor (
        player
    ) {
        /**
         * @type {Phaser.Game} game
         */
        this.game = window.game;

        this.tankEnergyUI = new TankEnergyUI(player);
    }
}
