export default class Shape extends PIXI.Graphics {
    constructor(type, color = 0xffffff) {
        super();

        this._type = type;
        this._color = color;

        this.interactive = true;
        this.once('added', this.onAddedToStageHandler, this);
    }

    get area() {
        return 0;
    }

    get radius() {
        return 0;
    }

    get width() {
        return 0;
    }

    get height() {
        return 0;
    }

    get type() {
        return this._type;
    }

    set color(value) {
        if (this._color == value) {
            return;
        }

        this._color = value;

        if (this.parent) {
            this.draw();
        }
    }

    /**
     * @public
     */
    draw() {
        this.clear();
        this.beginFill(this._color);
        this.lineStyle(1, this._color, 1);
        this.drawBody();
        this.endFill();
    }

    /**
     * @protected
     */
    drawBody() {
    }

    /**
     * @type {PIXI.Container}
     * @protected
     */
    onAddedToStageHandler(parent) {
        this.draw();
    }
}
