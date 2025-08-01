const display = document.getElementById("display");
const sessionLabel = document.getElementById("sessionLabel");
const alarmSound = document.getElementById("alarmSound");

let timer = null;
let isRunning = false;
let timeLeft = 25 * 60; 
let currentMode = "work"; 

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  timeLeft = currentMode === "work" ? 25 * 60 : 5 * 60;
  updateDisplay();
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    alarmSound.play(); 
    switchSession();  
  }
}

function switchSession() {
  if (currentMode === "work") {
    currentMode = "pause";
    timeLeft = 5 * 60;
    sessionLabel.textContent = "Pause (5 min)";
  } else {
    currentMode = "work";
    timeLeft = 25 * 60;
    sessionLabel.textContent = "Work Time";
  }
  updateDisplay();
  startTimer(); 
} 

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  display.textContent = `${minutes}:${seconds}`;
}
