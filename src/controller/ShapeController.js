import signal from 'signal-js';

import Config from '../Config';
import Overlay from '../ui/Overlay';
import MathUtil from '../util/MathUtil';
import ShapeUtil from '../util/ShapeUtil';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class ShapeController {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Can't create singleton instance");
        }

        this._signal = signal();

        /**
         * @type {Overlay}
         * @private
         */
        this._touchOverlay = null;

        /**
         * @type {Array.<Shape>}
         * @private
         */
        this._shapes = [];

        /**
         * @type {number}
         * @private
         */
        this._frames = 0;

        /**
         * @type {number}
         * @private
         */
        this._gravity = 1;

        /**
         * @type {number}
         * @private
         */
        this._area = 0;

        /**
         * @type {number}
         * @private
         */
        this._shapeCount = 1;

        /**
         * @type {Game}
         * @private
         */
        this._game = null;
    }

    /**
     * @returns {ShapeController}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ShapeController(singletonEnforcer);
        }

        return this[singleton];
    }

    get signal() {
        return this._signal;
    }

    /**
     * @param {Game} stage
     */
    start(game, uiController) {
        this._game = game;
        this._game.ticker.add(this.onFrame, this);

        // for touches on stage
        this._touchOverlay = new Overlay();
        this._touchOverlay.renderable = false;
        this._touchOverlay.on('pointertap', this.onStageClick, this);
        this._game.stage.addChild(this._touchOverlay);

        uiController.signal.on('gravity', (gravity) => {
            this._gravity = gravity;
        });

        uiController.signal.on('shape', (shapeCount) => {
            this._shapeCount = shapeCount;
        });
    }

    createShapes() {
        for (let i = 0; i < this._shapeCount; i++) {
            this.createShape();
        }
    }

    createShape(position = null) {
        const shape = ShapeUtil.createRandomShape();
        shape.color = ShapeUtil.getRandomColor();
        shape.on('pointertap', this.onClick, this);

        if (position == null) {
            MathUtil.randomPosition(shape);
        } else {
            shape.x = position.x;
            shape.y = position.y;
        }

        this._area += shape.area;
        this._game.stage.addChild(shape);
        this._shapes.push(shape);
        this.trigger();

        return shape;
    }

    removeShape(shape, i = -100) {
        this._shapes.forEach((item) => {
            if (i == -100) {
                if (shape.type == item.type) {
                    item.color = ShapeUtil.getRandomColor();
                }
            }
        });

        if (i == -100) {
            i = this._shapes.indexOf(shape);
        }

        if (i != -1) {
            this._shapes.splice(i, 1);
        }

        this._area -= shape.area;
        shape.destroy();
        this.trigger();
    }

    trigger() {
        this.signal.trigger('change', {shapes: this._shapes.length, area: Math.floor(this._area)});
    }

    /**
     * @param {number} deltaTime
     */
    onFrame(deltaTime) {
        this._frames += deltaTime;

        if (this._frames >= Config.FPS) {
            this._frames = 0;
            this.createShapes();
        }

        this._shapes.forEach((shape, i) => {
            shape.y += this._gravity;

            if (shape.y > Config.HEIGHT + (shape.radius >> 1)) {
                this.removeShape(shape, i);
            }
        });
    }

    /**
     * @param {PIXI.InteractionEvent } event
     */
    onClick(event) {
        const shape = event.currentTarget;
        this.removeShape(shape);
    }

    onStageClick(event) {
        const stage = this._game.stage;
        const data = event.data;
        const global = data.global;
        const position = stage.toLocal(global);

        this.createShape(position);
    }
}