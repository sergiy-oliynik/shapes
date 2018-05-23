import signal from 'signal-js';

import ShapeController from './ShapeController';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class UIController {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Can't create singleton instance");
        }

        this._signal = signal();

        this._gravity = 1;
        this._shapeCount = 1;

        this._inputShapesCount = null;
        this._inputShapesArea = null;

        // shapes count
        this._btnShapesDec = null;
        this._btnShapesInc = null;
        this._inputShapes = null;

        // gravity
        this._btnGravityDec = null;
        this._btnGravityInc = null;
        this._inputGravity = null;
    }

    /**
     * @returns {UIController}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new UIController(singletonEnforcer);
        }

        return this[singleton];
    }

    get signal() {
        return this._signal;
    }

    init(doc, shapes) {
        this._inputShapesCount = doc.getElementById('shapes-count');
        this._inputShapesArea = doc.getElementById('shapes-area');

        this._btnShapesDec = doc.getElementById('dec-shapes');
        this._btnShapesDec.addEventListener('click', (event) => { this.onDecrement(event); });

        this._btnShapesInc = doc.getElementById('inc-shapes');
        this._btnShapesInc.addEventListener('click', (event) => { this.onIncrement(event); });

        this._inputShapes = doc.getElementById('input-shapes');

        this._btnGravityDec = doc.getElementById('dec-gravity');
        this._btnGravityDec.addEventListener('click', (event) => { this.onDecrement(event); });

        this._btnGravityInc = doc.getElementById('inc-gravity');
        this._btnGravityInc.addEventListener('click', (event) => { this.onIncrement(event); });

        this._inputGravity = doc.getElementById('input-gravity');

        shapes.signal.on('change', (data) => {
            this._inputShapesCount.setAttribute('value', "Shapes: " + data['shapes']);
            this._inputShapesArea.setAttribute('value', "Area: " + data['area']);
        });
    }

    onDecrement(event) {
        const shape = ShapeController.instance;

        switch (event.currentTarget) {
            case this._btnGravityDec:
                this._gravity--;

                if (this._gravity < 1) {
                    this._gravity = 1;
                }

                this._inputGravity.setAttribute('value', "Gravity: " + String(this._gravity));
                this.signal.trigger('gravity', this._gravity);
                break;
            case this._btnShapesDec:
                --this._shapeCount;

                if (this._shapeCount < 1) {
                    this._shapeCount = 1;
                }

                this._inputShapes.setAttribute('value', "Per sec: " + String(this._shapeCount));
                this.signal.trigger('shape', this._shapeCount);
                break;
        }
    }

    onIncrement(event) {
        const shape = ShapeController.instance

        switch (event.currentTarget) {
            case this._btnGravityInc:
                this._gravity++;

                this._inputGravity.setAttribute('value', "Gravity: " + String(this._gravity));
                this.signal.trigger('gravity', this._gravity);
                break;
            case this._btnShapesInc:
                this._shapeCount++;

                this._inputShapes.setAttribute('value', "Per sec: " + String(this._shapeCount));
                this.signal.trigger('shape', this._shapeCount);
                break;
        }
    }
}