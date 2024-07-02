class Game {
    constructor(board, players) {
        this.board = board;
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    #otherPossibleMoves = {
        "UNDO": Game.#undo,
        "RESET": Game.#reset,
        "EXIT": Game.#exit
    }

    start() {
        let winner = null;

        while (!winner && !this.board.isFull()) {
            this.board.display();
            const { moveMade, input } = this.players[this.currentPlayerIndex].makeMove(this.board, Object.keys(this.#otherPossibleMoves));
            
            if (!moveMade) {
                if (!this.#makeOtherPossibleMove(input)) {
                    console.log("Invalid move! Try again.");
                }
            }
            else {
                winner = this.board.checkWinner();
                if (!winner) this.#switchPlayer(1);
            }
        }

        this.#announceResult(winner);
    }

    #makeOtherPossibleMove(move) {
        move = move.trim().toUpperCase();
        if (this.#otherPossibleMoves[move]) {
            this.#otherPossibleMoves[move](this);
            return true;
        }

        return false;
    }

    static #undo(game) {
        // console.log('DEBUG : ', this, this.UNDO);
        if (game.board.history.length === 0) {
            return;
        }
        game.board.undoMove();
        game.#switchPlayer(-1);
    }

    static #reset(game) {
        game.board.reset();
        game.currentPlayerIndex = 0;
    }

    static #exit() {
        console.log("Exiting the game...");
        process.exit(0);
    }

    #switchPlayer(move) {
        let mod = this.players.length;
        this.currentPlayerIndex = (((this.currentPlayerIndex + move) % mod) + mod) % mod;
    }

    #announceResult(winner) {
        this.board.display();
        if (winner) {
            console.log(`Congratulations! ${this.players.find(player => player.symbol === winner).name} wins!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

module.exports = Game;