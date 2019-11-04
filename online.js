import Game from "./game.js";
let initialize = false;

export const setup = function(game) {
    document.getElementById("1").innerHTML = game.newGame.board[0];
    document.getElementById("2").innerHTML = game.newGame.board[1];
    document.getElementById("3").innerHTML = game.newGame.board[2];
    document.getElementById("4").innerHTML = game.newGame.board[3];
    document.getElementById("5").innerHTML = game.newGame.board[4];
    document.getElementById("6").innerHTML = game.newGame.board[5];
    document.getElementById("7").innerHTML = game.newGame.board[6];
    document.getElementById("8").innerHTML = game.newGame.board[7];
    document.getElementById("9").innerHTML = game.newGame.board[8];
    document.getElementById("10").innerHTML = game.newGame.board[9];
    document.getElementById("11").innerHTML = game.newGame.board[10];
    document.getElementById("12").innerHTML = game.newGame.board[11];
    document.getElementById("13").innerHTML = game.newGame.board[12];
    document.getElementById("14").innerHTML = game.newGame.board[13];
    document.getElementById("15").innerHTML = game.newGame.board[14];
    document.getElementById("16").innerHTML = game.newGame.board[15];
}

export const keys = function(k, board){
    switch (k) {
        case '&':
            board.move('up');
            break;
        case '(':
            board.move('down');
            break;
        case '%':
            board.move('left');
            break;
        case '\'':
            board.move('right');
            break;
        default:
            break;
    }
}

export const newGame = function(game){
    document.getElementById("score").innerHTML = "Score: " + game.newGame.score;
    if(initialize == false){
        initialize = true;
        $('#reset').on("click", function(){
            game.setupNewGame();
            newGame(game);
            document.getElementById("end").innerHTML = "";
        });
        $(document).keydown(function(e){
            var s = String.fromCharCode(e.which);
            keys(s, game);
            update(game);
        });
    }
    setup(game);
};

export const update = function(game){
    setup(game);
    document.getElementById("score").innerHTML = "Score: " + game.newGame.score;
    if(game.newGame.over){
        document.getElementById("end").innerHTML = "You Lost :((((((( <br> Score: " + game.newGame.score + ". <br> Press Reset Game";
    }
    if(game.newGame.won){
        document.getElementById("end").innerHTML = "Congrats! You can keep going :)";
    }
}

$(document).ready(function () {
    let game = new Game(4);
    newGame(game);
});