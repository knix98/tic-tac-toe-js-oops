class Board {
    constructor(size = 3) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.history = [];
    }

    display() {
        this.grid.forEach(row => console.log(row.map(cell => cell || ' ').join(' | ')));
    }

    makeMove(position, symbol) {
        const [row, col] = position;
        if (isNaN(row) || isNaN(col) || row < 0 || row >= this.size || col < 0 || col >= this.size || this.grid[row][col] !== null) {
            return false;
        }

        this.grid[row][col] = symbol;
        this.history.push(position);
        return true;
    }

    undoMove() {
        const lastMove = this.history.pop();
        this.grid[lastMove[0]][lastMove[1]] = null;
    }

    reset() {
        this.grid = Array.from({ length: this.size }, () => Array(this.size).fill(null));
        this.history = [];
    }

    checkWinner() {
        // Check rows and columns
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i].every(cell => cell && cell === this.grid[i][0])) {
                return this.grid[i][0];
            }

            if (this.grid.map(row => row[i]).every(cell => cell && cell === this.grid[0][i])) {
                return this.grid[0][i];
            }
        }

        // Check main diagonal
        if (this.grid.map((row, idx) => row[idx]).every(cell => cell && cell === this.grid[0][0])) {
            return this.grid[0][0];
        }

        // Check anti-diagonal
        if (this.grid.map((row, idx) => row[this.size - 1 - idx]).every(cell => cell && cell === this.grid[0][this.size - 1])) {
            return this.grid[0][this.size - 1];
        }

        return null;
    }

    isFull() {
        return this.history.length === this.size * this.size;
    }
}

module.exports = Board;


// checkWinner() {
//     let winner = null;

//     // Check rows and columns
//     for (let i = 0; i < this.size; i++) {
//         // Check row
//         for (let j = 0; j < this.size; j++) {
//             if (!this.grid[i][j] || this.grid[i][j] !== this.grid[i][0]) {
//                 winner = null;
//                 break;
//             }
//         }

//         if (winner) return this.grid[i][0];

//         // Check column
//         for (let j = 0; j < this.size; j++) {
//             if (!this.grid[j][i] || this.grid[j][i] !== this.grid[0][i]) {
//                 winner = null;
//                 break;
//             }
//         }

//         if (winner) return this.grid[0][i];
//     }

//     // Check main diagonal
//     for (let i = 0; i < this.size; i++) {
//         if (!this.grid[i][i] || this.grid[i][i] !== this.grid[0][0]) {
//             winner = null;
//             break;
//         }
//     }

//     if (winner) return this.grid[0][0];

//     // Check anti-diagonal
//     for (let i = 0; i < this.size; i++) {
//         if (!this.grid[i][this.size - 1 - i] || this.grid[i][this.size - 1 - i] !== this.grid[0][this.size - 1]) {
//             winner = null;
//             break;
//         }
//     }

//     return winner ? this.grid[0][this.size - 1] : null;
// }