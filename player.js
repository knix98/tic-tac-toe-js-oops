const prompt = require('prompt-sync')();

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }

    makeMove(board, otherPossibleMoves) {
        const input = prompt(`${this.name} (${this.symbol}), enter your move ((row,col) / ${otherPossibleMoves.join(' / ')}): `);

        const position = input.split(',').map(Number);
        const validMove = board.makeMove(position, this.symbol);

        if (!validMove) {
            return { moveMade: false, input: input };
        }

        return { moveMade: true, input: input };
    }
}

module.exports = Player;