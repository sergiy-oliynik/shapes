import ShapeCode from '../../const/ShapeCode';
import Shape from './common/Shape';

export default class Ellipse extends Shape {
    constructor(width, height, color = 0x000000) {
        super(ShapeCode.ELLIPSE, color);

        this._width = width;
        this._height = height;
    }

    get radius() {
        return Math.max(this._width, this._height);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get area() {
        return Math.PI * this.width * this.height;
    }

    drawBody() {
        this.drawEllipse(0, 0, this._width, this._height);
    }
}