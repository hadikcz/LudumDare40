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
         * @type {Phaser.CursorKeys}
         */
        this._cursors = this.game.input.keyboard.createCursorKeys();
    }

    update () {
        let velocity = this.player.getVelocity();
        if (this.player._onDirt === true) {
            velocity = velocity / 3;
        }

        this.player.body.velocity.setTo(0, 0);
        this.player.body.angularVelocity = 0;

        if (this.game.input.keyboard.enabled === false) {
            this.game.input.keyboard.reset();
            return;
        }

        if (this._cursors.up.isDown) {
            this.player.checkDirt('front');
            this.player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.player.angle, velocity));
            this._reverseMove = false;
        }

        if (this._cursors.down.isDown) {
            this.player.checkDirt('back');
            this.player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.player.angle, -(velocity)));
            this._reverseMove = true;
        }

        if (this._cursors.left.isDown) {
            this.player.body.angularVelocity = -300;
        } else if (this._cursors.right.isDown) {
            this.player.body.angularVelocity = 300;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.player.fire();
        }
    }
}
