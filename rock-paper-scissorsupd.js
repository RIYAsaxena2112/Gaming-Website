const { useState } = React;

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const choices = [
    { name: "Rock", img: "rockimg.jpg" },
    { name: "Paper", img: "paperimg.jpg" },
    { name: "Scissors", img: "scissorsimg.jpg" },
  ];

  function playGame(choice) {
    const computer =
      choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computer);

    const gameResult = getResult(choice.name, computer.name);
    setResult(gameResult);
  }

  function getResult(user, computer) {
    if (user === computer) {
      return <div style={{ color: "grey" }}>It's a Draw!</div>;
    }
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      return <div style={{ color: "green" }}>You Win!</div>;
    }
    return <div style={{ color: "red" }}>You Lose!</div>;
  }

  function resetGame() {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  }

  function goBack(){
    window.location.href="games.html";
  }
  return (
    <div className="container">
      <h1>Rock, Paper, Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className="button"
            onClick={() => playGame(choice)}
          >
            <img
              src={choice.img}
              alt={choice.name}
              className="choice-image"
            />
            {choice.name}
          </button>
        ))}
      </div>
      {userChoice && (
        <div className="results">
          <p className="option">
            Your Choice:{" "}
            <span className="ans">
              {userChoice.name}
              <img
                src={userChoice.img}
                alt={userChoice.name}
                className="result-image_user"
              />
            </span>
          </p>
          <p className="option">
            Computer's Choice:{" "}
            <span className="ans">
              {computerChoice.name}
              <img
                src={computerChoice.img}
                alt={computerChoice.name}
                className="result-image_comp"
              />
            </span>
          </p>
          <p className="option">Result: {result}</p>
        </div>
      )}
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
      <button className="back" onClick={goBack}>Go Back</button>
    </div>
  );
}

ReactDOM.render(<RockPaperScissors />, document.getElementById("root"));
