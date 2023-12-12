document.addEventListener("DOMContentLoaded", function () {
  const lightsContainer = document.getElementById("lights-container");
  const timerDisplay = document.getElementById("timer");
  const scoreboardList = document.getElementById("scoreboard-list");
  const resetButton = document.getElementById("reset-button");

  // Create Lights Grid
  const gridSize = 5;
  let lightsState = createRandomLightsState(gridSize);

  let timer;
  let seconds = 0;

  for (let i = 0; i < gridSize * gridSize; i++) {
      const light = document.createElement("div");
      light.classList.add("light");
      lightsContainer.appendChild(light);

      // Add click event listener to each light
      light.addEventListener("click", function () {
          toggleLights(i);
          checkWin();
      });
  }

  // Initialize the Lights Out game board
  updateLights();
  startTimer();

  // Add click event listener to the reset button
  resetButton.addEventListener("click", function () {
      resetGame();
  });

  function toggleLights(index) {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;

      toggleState(row, col); // Clicked light
      toggleState(row - 1, col); // Light above
      toggleState(row + 1, col); // Light below
      toggleState(row, col - 1); // Light to the left
      toggleState(row, col + 1); // Light to the right

      updateLights();
  }

  function toggleState(row, col) {
      if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
          const index = row * gridSize + col;
          lightsState[index] = !lightsState[index];
      }
  }

  function updateLights() {
      const lights = document.querySelectorAll(".light");
      lights.forEach((light, index) => {
          light.classList.toggle("on", lightsState[index]);
      });
  }

  function checkWin() {
      if (lightsState.every(light => !light)) {
          stopTimer();
          const time = formatTime();
          alert("Congratulations! You've won! Time: " + time);
          addToScoreboard(time);
          resetGame();
      }
  }

  function startTimer() {
      timer = setInterval(function () {
          seconds++;
          timerDisplay.innerText = formatTime();
      }, 1000);
  }

  function stopTimer() {
      clearInterval(timer);
  }

  function formatTime() {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function addToScoreboard(time) {
      const listItem = document.createElement("li");
      listItem.innerText = `Time: ${time}`;
      scoreboardList.appendChild(listItem);
  }

  function resetGame() {
      // Reset the timer and lightsState
      stopTimer();
      seconds = 0;
      timerDisplay.innerText = "0:00";
      lightsState = createRandomLightsState(gridSize);
      updateLights();
      startTimer();
  }

  function createRandomLightsState(size) {
      const lights = Array(size * size).fill(0).map(() => Math.random() < 0.5);
      return lights;
  }
});
