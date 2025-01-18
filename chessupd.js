// chess.js

const boardElement = document.getElementById('chess-board');

// Chess pieces (Unicode characters)
const pieces = {
    white: ['♔', '♕', '♖', '♗', '♘', '♙'],
    black: ['♚', '♛', '♜', '♝', '♞', '♟'],
};

// Initial board setup
const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

let board = JSON.parse(JSON.stringify(initialBoard)); // Clone the initial board
let selectedPiece = null; // Track the currently selected piece
let currentPlayer = 'white'; // Current player (alternates between 'white' and 'black')


// Update the current player's turn display
function updateTurnDisplay() {
    const playerTurnElement = document.getElementById('player-turn');
    playerTurnElement.textContent = currentPlayer === 'white' ? 'White' : 'Black';
    playerTurnElement.style.color = currentPlayer === 'white' ? '#ffffff' : '#000000';
}

// Reset the game to the initial state
function resetGame() {
    board = JSON.parse(JSON.stringify(initialBoard)); // Reset the board
    selectedPiece = null;
    currentPlayer = 'white';
    resetCellHighlights();
    createBoard();
    updateTurnDisplay();
}

// Update the chessboard and call turn display update
function createBoard() {
    boardElement.innerHTML = ''; // Clear the board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            const piece = board[row][col];
            if (piece) {
                cell.textContent = piece;
                cell.classList.add(pieces.white.includes(piece) ? 'white-piece' : 'black-piece');
            }

            cell.addEventListener('click', () => handleCellClick(row, col, cell));
            cell.addEventListener('mouseover', () => handleMouseOver(row, col));
            cell.addEventListener('mouseout', resetCellHighlights);

            boardElement.appendChild(cell);
        }
    }
    updateTurnDisplay();
}

// // Handle hover to highlight possible moves
// function handleMouseOver(row, col) {
//     const piece = board[row][col];
//     if (piece && isCurrentPlayerPiece(piece)) {
//         const selectedPiece = { piece, row, col };
//         highlightValidMoves(selectedPiece);
//     }
// }
// Handle cell click for pick-and-drop
function handleCellClick(row, col, cell) {
    const piece = board[row][col];

    // If a piece is already selected
    if (selectedPiece) {
        if (isValidMove(selectedPiece, row, col)) {
            board[selectedPiece.row][selectedPiece.col] = ''; // Clear the original position
            board[row][col] = selectedPiece.piece; // Place the piece in the new position
            selectedPiece = null; // Clear the selection
            resetCellHighlights(); // Remove highlights
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white'; // Switch player
            createBoard(); // Re-render the board
        } else {
            // Invalid move, deselect
            selectedPiece = null;
            resetCellHighlights();
        }
    } else if (piece && isCurrentPlayerPiece(piece)) {
        // Select a piece
        selectedPiece = { piece, row, col };
        highlightValidMoves(selectedPiece);
    }
}

// Highlight valid moves for the selected piece
function highlightValidMoves(selectedPiece) {
    resetCellHighlights();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);
        if (isValidMove(selectedPiece, row, col)) {
            cell.classList.add('valid-move');
        }
    });
}

// Reset all cell highlights
function resetCellHighlights() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.classList.remove('valid-move'));
}
// Check if a piece belongs to the current player
function isCurrentPlayerPiece(piece) {
    return currentPlayer === 'white'
        ? pieces.white.includes(piece)
        : pieces.black.includes(piece);
}


// Check if the move is valid for the selected piece
function isValidMove(selectedPiece, targetRow, targetCol) {
    const { piece, row, col } = selectedPiece;

    // Check if the target position is within the board
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
        return false;
    }

    const targetPiece = board[targetRow][targetCol];

    // Check if the target position is empty or has an opponent's piece
    const isTargetEmpty = targetPiece === '';
    const isTargetOpponentPiece = targetPiece && (pieces.white.includes(piece) !== pieces.white.includes(targetPiece));

    // Prevent moving to a cell with a friendly piece
    if (!isTargetEmpty && !isTargetOpponentPiece) {
        return false;
    }

    // Movement rules for each piece
    switch (piece) {
        case '♙': // White Pawn
            return validatePawnMove(row, col, targetRow, targetCol, 'white', isTargetEmpty, isTargetOpponentPiece);
        case '♟': // Black Pawn
            return validatePawnMove(row, col, targetRow, targetCol, 'black', isTargetEmpty, isTargetOpponentPiece);
        case '♖':
        case '♜': // Rook
            return (row === targetRow || col === targetCol) && isPathClear(row, col, targetRow, targetCol);
        case '♘':
        case '♞': // Knight
            const knightMoves = [
                [row - 2, col - 1], [row - 2, col + 1],
                [row + 2, col - 1], [row + 2, col + 1],
                [row - 1, col - 2], [row - 1, col + 2],
                [row + 1, col - 2], [row + 1, col + 2]
            ];
            return knightMoves.some(([r, c]) => r === targetRow && c === targetCol && (isTargetEmpty || isTargetOpponentPiece));
        case '♗':
        case '♝': // Bishop
            return Math.abs(row - targetRow) === Math.abs(col - targetCol) && isPathClear(row, col, targetRow, targetCol);
        case '♕':
        case '♛': // Queen
            return (row === targetRow || col === targetCol || Math.abs(row - targetRow) === Math.abs(col - targetCol)) && isPathClear(row, col, targetRow, targetCol);
        case '♔':
        case '♚': // King
            return Math.abs(row - targetRow) <= 1 && Math.abs(col - targetCol) <= 1 && (isTargetEmpty || isTargetOpponentPiece);
    }
    return false;
}


// Validate pawn move
function validatePawnMove(row, col, targetRow, targetCol, color, isTargetEmpty, isTargetOpponentPiece) {
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;

    // Forward movement
    if (col === targetCol) {
        if (targetRow === row + direction && isTargetEmpty) return true;
        if (row === startRow && targetRow === row + direction * 2 && isTargetEmpty && board[row + direction][col] === '') return true;
    }

    // Capture
    if (Math.abs(col - targetCol) === 1 && targetRow === row + direction && isTargetOpponentPiece) {
        return true;
    }

    return false;
}

// Check if there is no piece in the way between the source and target position
function isPathClear(row, col, targetRow, targetCol) {
    const rowDir = Math.sign(targetRow - row);
    const colDir = Math.sign(targetCol - col);
    let r = row + rowDir;
    let c = col + colDir;

    while (r !== targetRow || c !== targetCol) {
        if (board[r][c] !== '') {
            return false; // There's a piece in the way
        }
        r += rowDir;
        c += colDir;
    }

    return true; // Path is clear
}

// Back button functionality
function goBack() {
    window.location.href = 'games.html'; // Replace with your desired back page
}
// Initialize the game
createBoard();
updateTurnDisplay();
