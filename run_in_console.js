import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */


let game = new Game(4);
// let tempGame = {
//     board: [2,8,4,2,16,4,8,8,4,64,2,4,2,8,4,0],
//     score: 0,
//     won: false,
//     over: false
// }
// console.log(game.loadGame(tempGame));

console.log(game.toString());
console.log(game.getGameState());
game.move("right");
console.log("\n Transformed after move");
console.log(game.toString());
// game.move("left");
// console.log("\n Transformed after move");
// console.log(game.toString());

console.log(game.getGameState());

game.onMove(gameState => {
    console.log(game.toString());
    console.log();
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();

