/* global $ */
'use strict';
import 'phaser';
import BasicUIElement from './BasicUIElement';
import HealthBarSprite from './HealthBarSprite';

export default class extends BasicUIElement {
    /**
     *
     * @param {Player} player
     */
    constructor (player) {
        super(window.game);

        /**
         * @type {Player}
         */
        this.player = player;

        /** @type {HealthBarSprite} */
        this.energyBar = null;

        this.setOrigin(0, this.game.height);
        this.createBasicUI();

        this.player.energy.onChange.add(() => {
            this.energyBar.setPercent(this.player.energy.getPercent());
        });
    }

    createBasicUI () {
        let size = new Phaser.Point(80, 15);
        let bmdBg = this.game.add.bitmapData(size.x, size.y);
        bmdBg.fill(255, 0, 0);

        let bmdFill = this.game.add.bitmapData(size.x, size.y);
        bmdFill.fill(150, 150, 150);

        this.energyBar = new HealthBarSprite(this.game, {
            x: this.getOrigin().x,
            y: this.getOrigin().y - size.y,
            fixedToCamera: true,
            vertical: false,
            barSprite: bmdFill,
            bgSprite: bmdBg,
            barOffesetX: 0,
            barOffesetY: 0,
            delay: 300
        });

        this.energyBar.setPercent(50);
    }
}
