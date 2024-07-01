class OtherMoves {
    static #otherPossibleMoves = {
        "UNDO": OtherMoves.#undoMove,
        "RESET": OtherMoves.#reset
    }

    static move(moveInput, game, board) {
        moveInput = moveInput.trim().toUpperCase();
        
        if(OtherMoves.#otherPossibleMoves[moveInput]) {
            OtherMoves.#otherPossibleMoves[moveInput](game, board);
            return true;
        }

        return false;
    }

    static #undoMove(game, board) {
        if (board.history.length === 0) {
            return;
        }
        board.undoMove();
        game.switchPlayer(-1);
    }

    static #reset(game) {
        game.reset();
    }
}

module.exports = OtherMoves;