import ShapeCode from '../../const/ShapeCode';
import Polygon from './common/Polygon';

export default class Triangle extends Polygon {
    constructor(radius, color = 0x000000) {
        super(3, radius, ShapeCode.TRIANGLE, color);
    }
}