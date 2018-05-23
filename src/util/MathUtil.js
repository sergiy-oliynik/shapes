import Config from '../Config';

export default class MathUtil {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomItem(arr) {
        if (!arr || !arr.length) {
            return null;
        }

        return arr[MathUtil.randomInt(0, arr.length - 1)];
    }

    /**
     * @param {Shape} shape
     */
    static randomPosition(shape) {
        const minX = shape.radius;
        const maxX = Config.WIDTH - shape.radius;

        shape.x = this.randomInt(minX, maxX);
        shape.y = -shape.radius;
    }
}