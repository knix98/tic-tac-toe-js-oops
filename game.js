class Game {
    constructor(board, players) {
        this.board = board;
        this.players = players;
        this.currentPlayerIndex = 0;
    }

    start() {
        let winner = null;

        while (!winner && !this.board.isFull()) {
            this.board.display();
            const move = this.players[this.currentPlayerIndex].makeMove(this, this.board);
            
            if (move) {
                winner = this.board.checkWinner();
                if (!winner) this.switchPlayer(1);
            }
        }

        this.announceResult(winner);
    }

    reset() {
        this.board.reset();
        this.currentPlayerIndex = 0;
    }

    switchPlayer(move) {
        let mod = this.players.length;
        this.currentPlayerIndex = (((this.currentPlayerIndex + move) % mod) + mod) % mod;
    }

    announceResult(winner) {
        this.board.display();
        if (winner) {
            console.log(`Congratulations! ${this.players.find(player => player.symbol === winner).name} wins!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

module.exports = Game;