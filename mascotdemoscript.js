const dialogues = [
    "Welcome to the game hub!",
    "Let’s have some fun!",
    "Ready to play some games?",
    "Hello there! Choose a game and dive in!"
  ];
  
  const mascot = document.getElementById("mascot");
  const speechBubble = document.getElementById("speechBubble");
  
  // Show random welcome dialogue
  function showRandomDialogue() {
    const randomIndex = Math.floor(Math.random() * dialogues.length);
    speechBubble.textContent = dialogues[randomIndex];
  }
  
  // Set initial dialogue
  showRandomDialogue();
  
  // Add interaction
  mascot.addEventListener("click", () => {
    showRandomDialogue();
  });
  