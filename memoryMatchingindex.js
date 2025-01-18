const { useState, useEffect } = React;

function MemoryGame() {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedCards]);

  function shuffleCards() {
    const symbols = ["🤍","🐻‍❄️","🐼","🐭","🐻","🐨","❤️","⭐"];
    const duplicated = [...symbols, ...symbols];
    return duplicated
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
  }

  function handleCardClick(card) {
    if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }

    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;

      if (firstCard.symbol === card.symbol) {
        setMatchedCards([...matchedCards, firstCard.id, card.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }

  function resetGame() {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
  }

  function back(){
    window.location.href="games.html";
  }
  return (
    <div>
      <h1>Memory Matching Game</h1>
      <div className="game-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flippedCards.includes(card) || matchedCards.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.symbol}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="scoreboard">
        Moves: <span className="detail">{moves}</span> | Matches: <span className="detail">{matchedCards.length / 2} /{" "}{cards.length / 2}</span>        
      </div>
      {gameOver && <div className="scoreboard" style={{color:"red"}}>Game Over! 🎉</div>}
      <button onClick={resetGame} style={{ marginTop: "20px" }}>
        <div className="but">Restart Game</div>
      </button>
      <button onClick={back}>Go Back</button>
    </div>
  );
}

ReactDOM.render(<MemoryGame />, document.getElementById("root"));
