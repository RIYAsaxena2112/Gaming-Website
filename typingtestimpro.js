const { useState, useEffect } = React;

// Word pool for random paragraph generation
const wordPool = [
  "programming", "challenge", "development", "testing", "application",
  "keyboard", "performance", "react", "library", "interface",
  "functionality", "optimization", "experience", "user", "design",
  "dynamic", "interaction", "project", "goal", "progress",
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that can improve your productivity.",
  "React is a powerful JavaScript library for building user interfaces.",
  "Practice makes perfect. Keep typing to increase your speed.",
  "JavaScript is one of the most popular programming languages in the world."
];

// Generate random paragraphs based on difficulty
function generateRandomParagraph(wordCount) {
  return Array.from({ length: wordCount }, () =>
    wordPool[Math.floor(Math.random() * wordPool.length)]
  ).join(" ");
}

function TypingSpeedTest() {
  const [difficulty, setDifficulty] = useState("easy");
  const [paragraph, setParagraph] = useState("");
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((prevTime) => prevTime + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const wordCount = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100;
    setParagraph(generateRandomParagraph(wordCount));
  }, [difficulty]);

  const calculateWpm = () => {
    const wordsTyped = input.trim().split(" ").length;
    return Math.round((wordsTyped / timer) * 60) || 0;
  };

  const calculateAccuracy = () => {
    const correctChars = paragraph.split("").filter((char, index) => char === input[index]).length;
    const totalChars = input.length;
    return Math.round((correctChars / totalChars) * 100) || 0;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!isRunning) setIsRunning(true);

    const errorCount = value.split("").reduce((acc, char, idx) => acc + (char !== paragraph[idx] ? 1 : 0), 0);
    setErrors(errorCount);
    setProgress((value.length / paragraph.length) * 100);

    if (value === paragraph) {
      setIsRunning(false);
      setWpm(calculateWpm());
      setAccuracy(calculateAccuracy());
    }
  };

  const handleRestart = () => {
    setParagraph(generateRandomParagraph(difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100));
    setInput("");
    setTimer(0);
    setIsRunning(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setProgress(0);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    handleRestart();
  };
  function goBack() {
    window.location.href = "games.html"; // Change to your desired back page
}

  return (
    <div className="container">
      <h1>Typing Speed Test</h1>
      <p className="description">Test your typing skills and improve your speed!</p>

      {/* <div className="difficulty">
        <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
        <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
      </div> */}
<div className="difficulty">
  <button
    className={difficulty === "easy" ? "active" : ""}
    onClick={() => handleDifficultyChange("easy")}
  >
    Easy
  </button>
  <button
    className={difficulty === "medium" ? "active" : ""}
    onClick={() => handleDifficultyChange("medium")}
  >
    Medium
  </button>
  <button
    className={difficulty === "hard" ? "active" : ""}
    onClick={() => handleDifficultyChange("hard")}
  >
    Hard
  </button>
</div>

      <p className="paragraph">{paragraph}</p>

      {/* <textarea
        placeholder="Start typing here..."
        value={input}
        onChange={handleInputChange}
        disabled={!paragraph}
        style={{
          background: "white",
          border: input ? "2px solid #ddd" : "2px solid red",
        }}
      /> */}

<textarea
  placeholder="Start typing here..."
  value={input}
  onChange={handleInputChange}
  className={errors > 0 ? "error" : ""}
/>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="stats">
        <p>Time: {timer}s</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Errors: {errors}</p>
      </div>
      <button className="restart" onClick={handleRestart}>
        Restart
      </button>
      <button className="return" onClick={goBack}>Back</button>
    </div>
  );
}

ReactDOM.render(<TypingSpeedTest />, document.getElementById("root"));
