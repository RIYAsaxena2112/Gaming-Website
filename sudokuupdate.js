
const { useState } = React;

function Sudoku() {
  const puzzles = [
    {
      puzzle: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ],
      solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
    },{
        puzzle: [
          [8, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 3, 6, 0, 0, 0, 0, 0],
          [0, 7, 0, 0, 9, 0, 2, 0, 0],
          [0, 5, 0, 0, 0, 7, 0, 0, 0],
          [0, 0, 0, 0, 4, 5, 7, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 3, 0],
          [0, 0, 1, 0, 0, 0, 0, 6, 8],
          [0, 0, 8, 5, 0, 0, 0, 1, 0],
          [0, 9, 0, 0, 0, 0, 4, 0, 0],
        ],
        solution: [
          [8, 1, 2, 7, 5, 3, 6, 4, 9],
          [9, 4, 3, 6, 8, 2, 1, 7, 5],
          [6, 7, 5, 4, 9, 1, 2, 8, 3],
          [1, 5, 4, 2, 3, 7, 8, 9, 6],
          [3, 6, 9, 8, 4, 5, 7, 2, 1],
          [2, 8, 7, 1, 6, 9, 5, 3, 4],
          [5, 2, 1, 9, 7, 4, 3, 6, 8],
          [4, 3, 8, 5, 2, 6, 9, 1, 7],
          [7, 9, 6, 3, 1, 8, 4, 5, 2],
        ],
      },
  ];

  const [currentPuzzle, setCurrentPuzzle] = useState(
    puzzles[Math.floor(Math.random() * puzzles.length)]
  );
  const [board, setBoard] = useState(currentPuzzle.puzzle);
  const [result, setResult] = useState("");

  const handleChange = (row, col, value) => {
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? parseInt(value) || 0 : cell))
    );
    setBoard(newBoard);
  };

  const resetBoard = () => {
    setBoard(currentPuzzle.puzzle);
    setResult("");
  };

  const newPuzzle = () => {
    const randomPuzzle =
      puzzles[Math.floor(Math.random() * puzzles.length)];
    setCurrentPuzzle(randomPuzzle);
    setBoard(randomPuzzle.puzzle);
    setResult("");
  };

  const fillSolution = () => {
    setBoard(currentPuzzle.solution);
    setResult("");
  };

  const validateBoard = () => {
    const isCorrect = JSON.stringify(board) === JSON.stringify(currentPuzzle.solution);
    setResult(isCorrect ? "🎉 Correct Solution!" : "❌ Incorrect Solution!");
  };
  const back=()=>{
    window.location.href="games.html";
  }
  return (
    <div className="sudoku-container">
      <h1>Sudoku</h1>
      <div className="sudoku-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              type="text"
              maxLength="1"
              value={cell === 0 ? "" : cell}
              readOnly={currentPuzzle.puzzle[rowIndex][colIndex] !== 0}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
            />
          ))
        )}
      </div>
      <div className="button-container">
        <button onClick={validateBoard}>Validate</button>
        <button onClick={fillSolution}>Answer</button>
        <button onClick={resetBoard}>Reset</button>
        <button onClick={newPuzzle}>New Puzzle</button>
        <button onClick={back}>Go Back</button>
      </div>
      {result && (
        <div className={`result ${result.includes("Correct") ? "correct" : "incorrect"}`}>
          {result}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<Sudoku />, document.getElementById("root"));
