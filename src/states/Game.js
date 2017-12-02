/* globals __DEV__ */
import Phaser from 'phaser';

import PlayerCell from './../entity/PlayerCell';
import Cell from './../entity/Cell';
import config from './../config';

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        this.game.world.setBounds(0, 0, config.worldSize.x, config.worldSize.y);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.9;

        const bannerText = 'Phaser + ES6 + Webpack';
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
        banner.font = 'Bangers';
        banner.padding.set(10, 16);
        banner.fontSize = 40;
        banner.fill = '#77BFA3';
        banner.smoothed = false;
        banner.anchor.setTo(0.5);

        // let cell = new Cell(50, 50, 25, '#FF0000');
        let player = new PlayerCell(100, 100, 50, '#00FF00');

        // generate random cells
        let count = 100;

        for (let i = 0; i < count; i++) {
            let size = this.game.rnd.integerInRange(5, 15);
            let color = '#FF0000';
            let point = new Phaser.Point(
                this.game.rnd.integerInRange(0, window.game.world.width),
                this.game.rnd.integerInRange(0, window.game.world.height)
            );

            new Cell(point.x, point.y, size, color);
        }

        this.game.camera.follow(player);
    }

    render () {
        if (__DEV__) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--'), 2, 14, '#00ff00');
        }
    }
}
