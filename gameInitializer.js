const prompt = require('prompt-sync')();
const Board = require('./board');
const Player = require('./player');
const Game = require('./game');

class GameInitializer {
    static initialize() {
        let gridSize = parseInt(prompt("Enter the grid size: "), 10);
        while(isNaN(gridSize) || gridSize < 3 || gridSize > 10) {
            gridSize = parseInt(prompt("Enter a valid grid size: "), 10);
        }

        let numPlayers = parseInt(prompt("Enter the number of players: "), 10);
        while(isNaN(numPlayers) || numPlayers < 2 || numPlayers > 4) {
            numPlayers = parseInt(prompt("Enter a valid number of players: "), 10);
        }

        const players = [];
        const symbols = new Set();
        const names = new Set();

        for (let i = 0; i < numPlayers; i++) {
            let name = GameInitializer.#takeInput(names, "Name", i);
            let symbol = GameInitializer.#takeInput(symbols, "Symbol", i);
            
            players.push(new Player(name, symbol));
        }

        const board = new Board(gridSize);
        const game = new Game(board, players);
        return game;
    }

    static #takeInput(set, inputType, i) {
        let value;
        const inputTypeLowercase = inputType.toLowerCase();
        do {
            value = prompt(`Enter ${inputTypeLowercase} for Player ${i + 1}: `).trim();
            if(!value) {
                console.log(`Invalid ${inputType}. Please enter a valid ${inputTypeLowercase}.`);
            }
            else if (set.has(value)) {
                console.log(`${inputType} already taken. Choose another ${inputTypeLowercase}.`);
            }
        } while (!value || set.has(value));
        set.add(value);
    
        return value;
    }
}

// function initializeGame() {
//     const gridSize = parseInt(prompt("Enter the grid size: "), 10);
//     const numPlayers = parseInt(prompt("Enter the number of players: "), 10);
//     const players = [];
//     const symbols = new Set();
//     const names = new Set();

//     for (let i = 0; i < numPlayers; i++) {
//         let name = takeInput(names, "Name", i);
//         let symbol = takeInput(symbols, "Symbol", i);
        
//         players.push(new Player(name, symbol));
//     }

//     const board = new Board(gridSize);
//     const game = new Game(board, players);
//     return game;
// }

// function takeInput(set, inputType, i) {
//     let value;
//     const inputTypeLowercase = inputType.toLowerCase();
//     do {
//         value = prompt(`Enter ${inputTypeLowercase} for Player ${i + 1}: `).trim();
//         if (set.has(value)) {
//             console.log(`${inputType} already taken. Choose another ${inputTypeLowercase}.`);
//         }
//     } while (set.has(value));
//     set.add(value);

//     return value;
// }

module.exports = GameInitializer;