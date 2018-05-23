import ShapeController from '../controller/ShapeController';
import UIController from '../controller/UIController';

const doc = document;
const win = window;
const ratio = win.devicePixelRatio || 1;

export default class Game extends PIXI.Application {
    constructor() {
        const view = doc.getElementById('game');

        super({
            width: 500,
            height: 500,
            view: view,
            resolution: ratio,
            autoStart: true,
            autoResize: true
        });
    }

    start() {
        super.start();

        const shapes = ShapeController.instance;
        const ui = UIController.instance;

        ui.init(doc, shapes);
        shapes.start(this, ui);
    }
}