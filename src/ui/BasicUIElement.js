'use strict';
import 'phaser';

/* global module */
export default class {
    /**
     *
     * @param {Phaser.Game} game
     */
    constructor (game) {
        /**
         * @type {Phaser.Game}
         */
        this.game = game;

        this.uiGroup = this.game.add.group();

        this.originPosition = {
            x: 0,
            y: 0
        };
    }

    show () {
        this.uiGroup.visible = true;
    }

    hide () {
        this.uiGroup.visible = false;
    }

    toggle () {
        if (this.uiGroup.visible === false) {
            this.show();
        } else {
            this.hide();
        }
    }

    destroy () {
        this.uiGroup.destroy();
    }

    setOrigin (x, y) {
        this.originPosition.x = x;
        this.originPosition.y = y;
    }

    getOrigin () {
        return this.originPosition;
    }

    add (element) {
        this.uiGroup.add(element);
    }

    enableFixedToCamera () {
        this.uiGroup.fixedToCamera = true;
    }

    disableFixedToCamera () {
        this.uiGroup.fixedToCamera = false;
    }

    update () {
        this.uiGroup.children.forEach(function (child) {
            child.update();
        }, this);
    }

    calcPercent (current, max) {
        return (current / max) * 100;
    }

    /**
     * @param {number} width
     * @param {number} height
     * @param {string} color HEX
     * @return {Phaser.BitmapData}
     */
    generateRectangle (width, height, color) {
        /** @type {Phaser.BitmapData} bmd */
        let bmd = this.game.add.bitmapData(width, height);
        bmd.fill(Phaser.Color.getRed(color), Phaser.Color.getGreen(color), Phaser.Color.getBlue(color), 1);

        return bmd;
    }
}
