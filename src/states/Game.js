/* globals __DEV__ */
import 'phaser';

import Player from './../entity/player/Player';
import config from './../config';
import UI from './../ui/UI';

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        this.game.world.setBounds(0, 0, config.worldSize.x, config.worldSize.y);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.createStars();

        this.player = new Player(1000, 1000);

        this.game.camera.follow(this.player);

        /**
         * @type {UI}
         */
        this.ui = new UI(this.player);
    }

    render () {
        if (__DEV__) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--'), 2, 14, '#00ff00');
        }
    }

    createStars () {
        let count = 500;
        for (let i = 0; i < count; i++) {
            let starSize = this.game.rnd.integerInRange(1, 2);
            /** @type {Phaser.BitmapData} */
            let bmd = this.game.add.bitmapData(starSize, starSize, true);

            let fillColor = this.game.rnd.integerInRange(200, 255);
            bmd.fill(fillColor, fillColor, fillColor);

            let randomSpawn = new Phaser.Point(
                this.game.rnd.integerInRange(0, this.game.world.width),
                this.game.rnd.integerInRange(0, this.game.world.height)
            );
            this.game.add.image(randomSpawn.x, randomSpawn.y, bmd);
        }
    }
}
