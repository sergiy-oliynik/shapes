import ShapeCode from '../../const/ShapeCode';
import Ellipse from './Ellipse';

export default class Circle extends Ellipse {
    constructor(radius, color = 0x000000) {
        super(radius, radius, color);

        this._type = ShapeCode.CIRCLE;
    }

    get radius() {
        return this._width;
    }

    get area() {
        return Math.PI * this.radius * this.radius;
    }
}