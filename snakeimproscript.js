const { useState, useEffect } = React;

const GRID_SIZE = 20;
const BOARD_SIZE = 400;
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, isGameOver, isPaused, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (DIRECTIONS[e.key]) setDirection(DIRECTIONS[e.key]);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function moveSnake() {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    const newHead = {
      x: (head.x + direction.x + BOARD_SIZE / GRID_SIZE) % (BOARD_SIZE / GRID_SIZE),
      y: (head.y + direction.y + BOARD_SIZE / GRID_SIZE) % (BOARD_SIZE / GRID_SIZE),
    };

    if (newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      setIsGameOver(true);
      return;
    }

    newSnake.push(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      setFood(generateFood());
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  }

  function generateFood() {
    const x = Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE));
    const y = Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE));
    return { x, y };
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(DIRECTIONS.ArrowRight);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  }

  function togglePause() {
    setIsPaused(!isPaused);
  }
  function back(){
    window.location.href="games.html";
  }
  return (
    <div>
      <h1>Enhanced Snake Game</h1>
      <p className="instructions">Use arrow keys to control the snake. Eat the food and avoid hitting yourself!</p>
      <div className="score">Score: {score}</div>
      <div className="game-container">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake"
            style={{
              left: `${segment.x * GRID_SIZE}px`,
              top: `${segment.y * GRID_SIZE}px`,
            }}
          ></div>
        ))}
        <div
          className="food"
          style={{
            left: `${food.x * GRID_SIZE}px`,
            top: `${food.y * GRID_SIZE}px`,
          }}
        ></div>
      </div>
      {isGameOver && <div className="score">Game Over! Final Score: {score}</div>}
      <div className="controls">
        <button onClick={resetGame}>Restart Game</button>
        <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        <button onClick={back}>Go Back</button>
      </div>
    </div>
  );
}

ReactDOM.render(<SnakeGame />, document.getElementById("root"));
