const { useState } = React;

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function goBack() {
    window.location.href ="games.html";
  }

  function popConfetti() {
    const confetti = window.confetti;
    confetti.create(document.getElementById("confetti-canvas"), {
      resize: true,
      useWorker: true,
    })({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }

  if (winner) {
    setTimeout(popConfetti, 100); // Trigger confetti when a winner is found
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner" style={{ color: "green" }}>
          Winner: {winner} 🎉
        </div>
      )}
      {!winner && board.every(Boolean) && (
        <div className="winner" style={{ color: "purple" }}>
          It's a draw! 😐
        </div>
      )}
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
      <button className="back" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

ReactDOM.render(<TicTacToe />, document.getElementById("root"));
