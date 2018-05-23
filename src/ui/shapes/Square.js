import ShapeCode from '../../const/ShapeCode';
import Polygon from './common/Polygon';

export default class Square extends Polygon {
    constructor(radius, color = 0x000000) {
        super(4, radius, ShapeCode.SQUARE, color);
    }
}