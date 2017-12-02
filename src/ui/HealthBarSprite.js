
import 'phaser';

export default class {
    /**
     *
     * @param {Phaser.Game} game
     * @param {object} providedConfig
     */
    constructor (game, providedConfig) {
        this.game = game;
        this.config = providedConfig;

        this.bgSprite;
        this.barSprite;

        this.drawBackground();
        this.drawHealthBar();

        this.setPosition(this.config.x, this.config.y);

        if (this.config.fixedToCamera === true) {
            this.setFixedToCamera(this.config.isFixedToCamera);
        }
    }

    drawBackground () {
        if (typeof this.config.bgSprite !== 'undefined') {
            this.bgSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.bgSprite);
        } else {
            this.bgSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.spriteSheet, 0);
        }
    }

    drawHealthBar () {
        if (typeof this.config.barSprite !== 'undefined') {
            this.barSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.barSprite);
        } else {
            this.barSprite = this.game.add.sprite(this.config.x, this.config.y, this.config.spriteSheet, 1);
        }

        if (this.config.vertical === false) {
            this.barSprite.scale.setTo(0.0, 1);
        } else {
            this.barSprite.scale.setTo(1, 0.0);
        }
    }

    setPercent (percent, delay) {
        var newScale = {};
        if (percent < 0) {
            percent = 0;
        }

        if (this.config.vertical === false) {
            newScale.x = percent / 100;
            newScale.y = 1;
        } else {
            newScale.x = 1;
            newScale.y = percent / 100;
        }

        if (typeof delay === 'undefined' || delay === 0) {
            var delay = this.config.delay;
        }
        this.game.add.tween(this.barSprite.scale).to(newScale, delay, Phaser.Easing.Linear.None, true);
    }

    setPosition (x, y) {
        this.bgSprite.x = x;
        this.bgSprite.y = y;

        this.barSprite.x = x + this.config.barOffesetX;
        this.barSprite.y = y + this.config.barOffesetY;
    }

    setFixedToCamera () {
        this.bgSprite.fixedToCamera = true;
        this.barSprite.fixedToCamera = true;
    }

    destroy () {
        this.bgSprite.destroy();
        this.barSprite.destroy();
    }

    hide () {
        this.bgSprite.visible = false;
        this.barSprite.visible = false;
    }

    show () {
        this.bgSprite.visible = true;
        this.barSprite.visible = true;
    }

    addToGroup (group) {
        group.add(this.bgSprite);
        group.add(this.barSprite);
    }

    tweenShow (time) {
        this.bgSprite.alpha = 0;
        this.barSprite.alpha = 0;
        this.bgSprite.visible = true;
        this.barSprite.visible = true;

        this.game.add.tween(this.bgSprite).to({alpha: 1}, time, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.barSprite).to({alpha: 1}, time, Phaser.Easing.Linear.None, true);
    }
}
