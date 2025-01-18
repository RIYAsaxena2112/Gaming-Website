const WORDS = [
    { word: "javascript", hint: "A popular programming language for web development." },
    { word: "python", hint: "A versatile programming language with a snake as its namesake." },
    { word: "hangman", hint: "The name of this game." },
    { word: "react", hint: "A JavaScript library for building user interfaces." },
    { word: "programming", hint: "What you’re doing right now." },
    { word: "algorithm", hint: "A step-by-step problem-solving process." },
    { word: "developer", hint: "A person who writes code." },
    { word: "function", hint: "A reusable block of code in programming." },
    { word: "variable", hint: "A container for storing data values in code." },
    { word: "framework", hint: "A structure for building applications." },
];
const MAX_GUESSES = 6;

let selectedWordObj = {};
let guessedLetters = [];
let remainingGuesses = MAX_GUESSES;

function startGame() {
    // Select a random word
    selectedWordObj = WORDS[Math.floor(Math.random() * WORDS.length)];
    guessedLetters = [];
    remainingGuesses = MAX_GUESSES;

    // Render initial UI
    renderWord();
    renderLetters();
    updateStatus();
    document.getElementById("result").textContent = "";
    document.getElementById("hint").textContent = "";
}

function renderWord() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.textContent = selectedWordObj.word
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function renderLetters() {
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";

    // Create letter buttons
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-button");
        button.disabled = guessedLetters.includes(letter);
        button.addEventListener("click", () => handleGuess(letter));
        lettersDiv.appendChild(button);
    }
}

function handleGuess(letter) {
    guessedLetters.push(letter);

    if (selectedWordObj.word.includes(letter)) {
        // Correct guess
        renderWord();
        if (checkWin()) {
            endGame(true);
        }
    } else {
        // Wrong guess
        remainingGuesses--;
        updateStatus();
        if (remainingGuesses === 0) {
            endGame(false);
        }
    }

    renderLetters();
}

function updateStatus() {
    document.getElementById("remaining-guesses").textContent = remainingGuesses;
    document.getElementById("guessed-letters").textContent = guessedLetters.join(", ");
}

function checkWin() {
    return selectedWordObj.word.split("").every((letter) => guessedLetters.includes(letter));
}

function endGame(won) {
    const resultDiv = document.getElementById("result");
    if (won) {
        resultDiv.textContent = "Congratulations!🎉 You guessed the word!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = `Game Over!😔 The word was "${selectedWordObj.word}".`;
        resultDiv.style.color = "red";
    }

    // Disable all letter buttons
    document.querySelectorAll(".letter-button").forEach((button) => (button.disabled = true));
}

function showHint() {
    document.getElementById("hint").textContent = selectedWordObj.hint;
}

function goBack() {
    window.location.href = "games.html"; // Change to your desired back page
}

function restart(){
    startGame();
}

// Initialize game
document.addEventListener("DOMContentLoaded", startGame);
