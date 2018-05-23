import ShapeCode from '../../const/ShapeCode';
import Polygon from './common/Polygon';

export default class Pentagon extends Polygon {
    constructor(radius, color = 0x000000) {
        super(5, radius, ShapeCode.PENTAGON, color);
    }
}