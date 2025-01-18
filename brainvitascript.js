// const BOARD_SIZE = 7;
// const INITIAL_MARBLES = [
//     [null, null, 1, 1, 1, null, null],
//     [null, null, 1, 1, 1, null, null],
//     [1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1],
//     [null, null, 1, 1, 1, null, null],
//     [null, null, 1, 1, 1, null, null],
// ];

// let board = [];
// let selectedCell = null;

// function createBoard() {
//     board = JSON.parse(JSON.stringify(INITIAL_MARBLES));
//     renderBoard();
//     updateMarbleCount();
//     checkGameOver(); // Check for game over at the start
// }

// function renderBoard() {
//     const gameBoard = document.getElementById("game-board");
//     gameBoard.innerHTML = "";

//     for (let row = 0; row < BOARD_SIZE; row++) {
//         for (let col = 0; col < BOARD_SIZE; col++) {
//             const cell = document.createElement("div");
//             cell.classList.add("cell");

//             if (board[row][col] === 1) {
//                 cell.classList.add("marble");
//                 if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
//                     cell.classList.add("selected");
//                 }
//             } else if (board[row][col] === 0) {
//                 cell.classList.add("empty");
//             } else {
//                 cell.classList.add("disabled");
//             }

//             cell.dataset.row = row;
//             cell.dataset.col = col;

//             cell.addEventListener("click", () => handleCellClick(row, col));

//             gameBoard.appendChild(cell);
//         }
//     }
// }

// function handleCellClick(row, col) {
//     if (selectedCell) {
//         if (isValidMove(selectedCell.row, selectedCell.col, row, col)) {
//             makeMove(selectedCell.row, selectedCell.col, row, col);
//             selectedCell = null;
//         } else {
//             selectedCell = null; // Deselect if invalid
//         }
//     } else if (board[row][col] === 1) {
//         selectedCell = { row, col }; // Select marble
//     }

//     renderBoard();
//     updateMarbleCount();
//     checkGameOver();
// }

// function isValidMove(fromRow, fromCol, toRow, toCol) {
//     if (toRow < 0 || toRow >= BOARD_SIZE || toCol < 0 || toCol >= BOARD_SIZE) return false;

//     if (board[toRow][toCol] !== 0) return false;

//     const rowDiff = Math.abs(toRow - fromRow);
//     const colDiff = Math.abs(toCol - fromCol);

//     if ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2)) {
//         const jumpedRow = (fromRow + toRow) / 2;
//         const jumpedCol = (fromCol + toCol) / 2;
//         return board[jumpedRow][jumpedCol] === 1;
//     }

//     return false;
// }

// function makeMove(fromRow, fromCol, toRow, toCol) {
//     const jumpedRow = (fromRow + toRow) / 2;
//     const jumpedCol = (fromCol + toCol) / 2;

//     board[fromRow][fromCol] = 0; // Remove marble from source
//     board[jumpedRow][jumpedCol] = 0; // Remove jumped marble
//     board[toRow][toCol] = 1; // Place marble in target
// }

// function updateMarbleCount() {
//     const marbleCount = board.flat().filter((cell) => cell === 1).length;
//     document.getElementById("marble-count").textContent = marbleCount;
// }

// function checkGameOver() {
//     let hasValidMove = false;

//     for (let row = 0; row < BOARD_SIZE; row++) {
//         for (let col = 0; col < BOARD_SIZE; col++) {
//             if (board[row][col] === 1) {
//                 if (
//                     isValidMove(row, col, row - 2, col) || // Up
//                     isValidMove(row, col, row + 2, col) || // Down
//                     isValidMove(row, col, row, col - 2) || // Left
//                     isValidMove(row, col, row, col + 2)    // Right
//                 ) {
//                     hasValidMove = true;
//                     break;
//                 }
//             }
//         }
//         if (hasValidMove) break;
//     }

//     if (!hasValidMove) {
//         const remainingMarbles = board.flat().filter((cell) => cell === 1).length;
//         alert(`Game Over! Final Score: ${remainingMarbles} marbles left.`);
//         board = board.map((row) => row.map((cell) => (cell === 1 ? 0 : cell)));
//         renderBoard();
//         updateMarbleCount();
//     }
// }

// function goBack() {
//     window.location.href = "games.html"; // Change to your desired back page
// }

// document.addEventListener("DOMContentLoaded", createBoard);
const BOARD_SIZE = 7;
const INITIAL_MARBLES = [
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
];

let board = [];
let selectedCell = null;

function createBoard() {
    board = JSON.parse(JSON.stringify(INITIAL_MARBLES));
    renderBoard();
    updateMarbleCount();
    checkGameOver();
}

function renderBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (board[row][col] === 1) {
                cell.classList.add("marble");
                if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
                    cell.classList.add("selected");
                }
            } else if (board[row][col] === 0) {
                cell.classList.add("empty");
            } else {
                cell.classList.add("disabled");
            }

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener("click", () => handleCellClick(row, col));

            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    if (selectedCell) {
        if (isValidMove(selectedCell.row, selectedCell.col, row, col)) {
            makeMove(selectedCell.row, selectedCell.col, row, col);
            selectedCell = null;
        } else {
            selectedCell = null; // Deselect if invalid
        }
    } else if (board[row][col] === 1) {
        selectedCell = { row, col }; // Select marble
    }

    renderBoard();
    updateMarbleCount();
    checkGameOver();
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    if (toRow < 0 || toRow >= BOARD_SIZE || toCol < 0 || toCol >= BOARD_SIZE) return false;

    if (board[toRow][toCol] !== 0) return false;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if ((rowDiff === 2 && colDiff === 0) || (rowDiff === 0 && colDiff === 2)) {
        const jumpedRow = (fromRow + toRow) / 2;
        const jumpedCol = (fromCol + toCol) / 2;
        return board[jumpedRow][jumpedCol] === 1;
    }

    return false;
}

function makeMove(fromRow, fromCol, toRow, toCol) {
    const jumpedRow = (fromRow + toRow) / 2;
    const jumpedCol = (fromCol + toCol) / 2;

    board[fromRow][fromCol] = 0; // Remove marble from source
    board[jumpedRow][jumpedCol] = 0; // Remove jumped marble
    board[toRow][toCol] = 1; // Place marble in target
}

function updateMarbleCount() {
    const marbleCount = board.flat().filter((cell) => cell === 1).length;
    document.getElementById("marble-count").textContent = marbleCount;
}

function checkGameOver() {
    let hasValidMove = false;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === 1) {
                if (
                    isValidMove(row, col, row - 2, col) || // Up
                    isValidMove(row, col, row + 2, col) || // Down
                    isValidMove(row, col, row, col - 2) || // Left
                    isValidMove(row, col, row, col + 2)    // Right
                ) {
                    hasValidMove = true;
                    break;
                }
            }
        }
        if (hasValidMove) break;
    }

    if (!hasValidMove) {
        const remainingMarbles = board.flat().filter((cell) => cell === 1).length;
        const message = `Game Over! Final Score: ${remainingMarbles} marbles left.`;
        displayGameOverMessage(message);
        board = board.map((row) => row.map((cell) => (cell === 1 ? 0 : cell)));
        renderBoard();
        updateMarbleCount();
    }
}

function displayGameOverMessage(message) {
    const messageDiv = document.getElementById("game-over-message");
    messageDiv.textContent = message;
}
function resetGame(){
    createBoard();    //Reinitializes the board
    document.getElementById("game-over-message").textContent = ""; // Clear the game-over message
}
function goBack() {
    window.location.href = "games.html"; // Change to your desired back page
}

document.addEventListener("DOMContentLoaded", createBoard);
