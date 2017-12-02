import 'phaser';
import { setInterval } from 'timers';

export default class {
    /**
     * @param {number} min
     * @param {number} max
     * @param {object} autoregen
     */
    constructor (current, max, autoregen) {
        /**
         * @type {number}
         */
        this._current = current;

        /**
         * @type {number}
         */
        this._max = max;

        /**
         * @type {boolean}
         */
        this._autoregenEnable = false;

        /**
         * @type {*}
         */
        this._autoregenInterval = null;

        /**
         * @type {number}
         */
        this._autoregenCount = 0;

        // callbacks
        this.onChange = new Phaser.Signal();

        if (typeof autoregen !== 'undefined') {
            this._autoregenCount = autoregen.count;

            this._autoregenInterval = setInterval(() => {
                this.add(this._autoregenCount);
            }, autoregen.interval);
        }
    }

    take (amount) {
        this._current -= amount;
        this.onChange.dispatch();
    }

    add (amount) {
        this._current += amount;
        if (this._current > this._max) {
            this._current = this._max;
        }
        this.onChange.dispatch();
    }

    canTake (amount) {
        return (this._current - amount >= 0);
    }

    isMax () {
        return this._current === this._max;
    }

    get () {
        return this._current;
    }

    set (value) {
        this._current = value;
        this.onChange.dispatch();
    }

    getPercent () {
        return Math.round(100 * (this._current / this._max));
    }
}
