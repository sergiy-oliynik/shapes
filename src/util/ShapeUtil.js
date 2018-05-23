import Circle from '../ui/shapes/Circle';
import Ellipse from '../ui/shapes/Ellipse';
import Hexagon from '../ui/shapes/Hexagon';
import Pentagon from '../ui/shapes/Pentagon';
import Square from '../ui/shapes/Square';
import Triangle from '../ui/shapes/Triangle';
import MathUtil from './MathUtil';

export default class ShapeUtil {
    static createRandomShape() {
        const r1 = MathUtil.randomInt(10, 30); // radius 1
        const r2 = MathUtil.randomInt(10, 30); // radius 2
        const rnd = Math.random();

        switch (true) {
            case rnd < 0.15:
                return new Circle(r1);
            case rnd < 0.30:
                return new Ellipse(r1, r2);
            case rnd < 0.45:
                return new Triangle(r1);
            case rnd < 0.60:
                return new Square(r1);
            case rnd < 0.75:
                return new Pentagon(r1);
            case rnd < 0.9:
                return new Hexagon(r1);
            default:
                return new Square(r1);
        }
    }

    static getRandomColor() {
        return "0x"+((1<<24)*Math.random()|0).toString(16);
    }
}
