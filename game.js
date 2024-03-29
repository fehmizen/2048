/*
Add your code for Game here
 */

export default class Game {

    constructor(size) {
        this.size = size;
        this.newGame = {
            board: [],
            score: 0,
            won: false,
            over: false,
        } 
        this.moveTracker = [];
        this.winTracker = [];
        this.loseTracker = [];      
        this.setupNewGame();
        this.didMove = false;
    }

    isFull() {
        for (let e = 0; e < this.newGame.board.length; e++) {
            if (this.newGame.board[e] == 0) {
                return false;;
            } 
        }
        return true;
    }

    checkMove() {
        for(let i = 0; i <this.size; i++) {
            for(let j = i; j < (this.size*this.size); j += this.size) {
                for(let k = j + this.   size; k < (this.size*this.size); k += this.size) {
                    if(this.newGame.board[k] == this.newGame.board[j]) {
                        return false;
                    } else {
                        break;
                    }
                }
            }
        }
        return true;
    }

    make2D() {
        var arr = [];
        while(this.newGame.board.length) {
            arr.push(this.newGame.board.splice(0,this.size));
        }
        this.newGame.board=arr;
    }

    flattenArr(arr) {
        let temp = [];
        for(let i=0;i<arr.length;i++) {
            for(let j=0;j<arr.length;j++) {
                temp.push(arr[i][j]);
            }
        }
        return temp;
    }

    getNextNum() {
        if(Math.floor(Math.random() * 10) > 0) {
            return 2;
        } else {
            return 4;
        }
    }

    rotate() {
        this.make2D();
        let temp2 = this.newGame.board;
        const n = this.size;
        const x = Math.floor(n/2);
        const y = n - 1;
        for (let i = 0; i < x; i++) {
           for (let j = i; j < y - i; j++) {
              let k = temp2[i][j];
              temp2[i][j] = temp2[y - j][i];
              temp2[y - j][i] = temp2[y - i][y - j];
              temp2[y - i][y - j] = temp2[j][y - i]
              temp2[j][y - i] = k
           }
        }
    
    this.newGame.board = this.flattenArr(this.newGame.board);
    }

    zeroUp() {
        for(let i = 0; i < this.size; i++) {
            for(let j = i; j < (this.size*this.size); j = j + this.size) {
                if(this.newGame.board[j] != 0){
                    continue;
                }
                for(let k = j + this.size; k < (this.size*this.size); k = k + this.size) {
                    if(this.newGame.board[k] == 0){
                        continue;
                    } else {
                        this.newGame.board[j] = this.newGame.board[k];
                        this.newGame.board[k] = 0;
                        this.didMove = true;
                        break;
                    }
                }
            }
        }
    }

    moving() {
        for(let i = 0; i <this.size; i++) {
            for(let j = i; j < (this.size*this.size); j+= this.size) {
                for(let k = j + this.size; k < (this.size*this.size); k+= this.size) {
                    if(this.newGame.board[k] == 0) {
                        continue;
                    }
                    else if(this.newGame.board[k] == this.newGame.board[j]) {
                        this.newGame.board[k] = 0;
                        this.newGame.board[j] += this.newGame.board[j];
                        this.newGame.score += this.newGame.board[j];
                        this.didMove = true;
                        if (this.newGame.board[j] == 2048) {
                            this.newGame.won = true;
                        }
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }

    setupNewGame() {
        let ran1 = Math.floor(Math.random() * (this.size*this.size));
        let ran2 = Math.floor(Math.random() * (this.size*this.size));
        while(true) {
            if (ran2 != ran1) {
                break;
            } else {
                ran2 = Math.floor(Math.random() * (this.size*this.size));
            }
        }
        let arr = [];
        for(let i = 0; i < (this.size*this.size); i++) {
            if(i == ran1) {
                arr.push(this.getNextNum());
            }
            else if(i == ran2) {
                arr.push(this.getNextNum());
            }
            else{
                arr.push(0);
            }
        }
        this.newGame = {
            board: arr,
            score: 0,
            won: false,
            over: false
        }
    }

    loadGame(gameState) {
        this.newGame = {
            board: gameState.board,
            score: gameState.score,
            won: gameState.won,
            over: gameState.over
        }
    }

    move(direction) {
        this.noMove = false;
        switch(direction) {
            case "up":
                this.moving();
                this.zeroUp();
                break;
            case "right":
                this.rotate();
                this.rotate();
                this.rotate();
                this.moving();
                this.zeroUp();
                this.rotate();
                break;

            case "left":
                this.rotate();
                this.moving();
                this.zeroUp();
                this.rotate();
                this.rotate();
                this.rotate();
                break;

            case "down":
                this.rotate();
                this.rotate();
                this.moving();
                this.zeroUp();
                this.rotate();
                this.rotate();
                break;
            
            default:
                break;
        }

        if (this.newGame.won) {
            for (let i = 0; i < this.winTracker.length; i++) {
                this.winTracker[i](this.newGame);
            }
        }

        if(!this.isFull()) {
            while(this.didMove) {
                let ran1 = Math.floor(Math.random() * (this.size*this.size));
                if (this.newGame.board[ran1] == 0) {
                    this.newGame.board[ran1] = this.getNextNum();
                    break;
                }
            }       
        }

        if(this.isFull()) {
            let inst1 = false;
            let inst2 = false;
            if(this.checkMove()) {
                inst1 = true;
            }
            this.rotate();
            
            if(this.checkMove()) {
                inst2 = true;
            }
            this.rotate();
            this.rotate();
            this.rotate();

            if(inst1 && inst2) {
                this.newGame.over = true;
                for(let l = 0; l < this.loseTracker.length; l++) {
                    this.loseTracker[l](this.newGame);
                }
            }
        }    

        for (let m = 0; m < this.moveTracker.length; m++) {
            this.moveTracker[m](this.newGame);
        }
        this.didMove = false;
    }

    toString() {
        for(let i = 0; i < (this.size*this.size); i += this.size) {
            var together = []
            for (let j = 0; j < this.size; j++) {
                together.push(this.newGame.board[i+j]);
            }
            console.log(together);
        }
    }

    onMove(callback) {
        this.moveTracker.push(callback);
    }

    onWin(callback) {
        this.winTracker.push(callback);
    }

    onLose(callback) {
        this.loseTracker.push(callback);
    }

    getGameState() {
        return this.newGame;
    }

}