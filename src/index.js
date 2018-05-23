import * as PIXI from 'pixi.js';
import Game from './main/Game';

let game = null;

window.onload = () => {
    game = new Game();
};

// window.addEventListener('resize', (event) => {
//     const win = event.currentTarget;
//
//     if (game) {
//         game.resize(win.innerWidth, win.innerHeight);
//     }
// });
