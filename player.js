const prompt = require('prompt-sync')();
const OtherMoves = require('./otherMoves');

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    makeMove(game, board) {
        let position;
        let validMove = false;

        while (!validMove) {
            const input = prompt(`${this.name} (${this.symbol}), enter your move (row,col): `);
            position = input.split(',').map(Number);

            validMove = board.makeMove(position, this.symbol);

            if (!validMove) {
                if (OtherMoves.move(input, game, board)) {
                    return false;
                }
                else {
                    console.log("Invalid move! Try again.");
                }
            }
        }

        return true;
    }
}

module.exports = Player;