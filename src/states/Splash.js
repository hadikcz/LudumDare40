import Phaser from 'phaser';

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        this.load.image('tank', 'assets/images/tank.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('dirtTexture', 'assets/images/dirtTexture.jpg');
    }

    create () {
        this.state.start('Game');
    }
}
