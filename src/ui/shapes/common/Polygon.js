import Shape from './Shape';

export default class Polygon extends Shape {
    constructor(angles, radius, type, color = 0x000000) {
        super(type, color);

        this._angles = angles;
        this._radius = radius;
    }

    get area() {
        return (this._angles * this._radius * this._radius) / Math.tan((2 * Math.PI) / this._angles);
    }
    get radius() {
        return this._radius;
    }

    drawBody() {
        const angle = (2 * Math.PI) / this._angles;
        const points = [];
        let x, y;

        for (let i = 0; i < this._angles; i++) {
            x = this._radius * Math.cos(i * angle);
            y = this._radius * Math.sin(i * angle);
            points.push(new PIXI.Point(x, y));
        }

        points.push(new PIXI.Point(this._radius, 0));

        this.drawPolygon(points);
    }
}
