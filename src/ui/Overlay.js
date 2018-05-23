export default class Overlay extends PIXI.Graphics {
    constructor() {
        super();

        this.clear();
        this.beginFill(0xFFFFFF, 0);
        this.lineStyle(1, 0xFFFFFF, 0);
        this.drawRect(0, 0, 500, 500);
        this.endFill();

        this.interactive = true;
        this.on('pointerup', () => {
            console.log('up');
        }, this);
    }
}