// 🔹 Level-based Texts (increasing complexity)
const levelTexts = {
  1: ["The quick brown fox jumps over the lazy dog."],
  2: ["Typing fast is fun. Focus on accuracy before speed."],
  3: [
    "Practice makes perfect, especially when typing consistently.",
    "Errors happen, but improvement comes with focus.",
  ],
  4: [
    "A journey of a thousand miles begins with a single keystroke.",
    "The key to success in typing is rhythm, accuracy, and calmness.",
  ],
  5: [
    "As you type more, your fingers learn to flow naturally across the keyboard.",
    "Precision and consistency make an efficient typist.",
  ],
  6: [
    "Complex sentences require concentration and timing.",
    "Avoid unnecessary corrections; stay smooth and steady.",
    "Keep your eyes on the screen, not the keyboard.",
  ],
  7: [
    "Good typists balance both accuracy and speed, avoiding haste-induced errors.",
    "Typing quickly yet correctly demonstrates true mastery.",
  ],
  8: [
    "Programming often involves not just typing, but thinking logically.",
    "Syntax errors, missing brackets, and typos slow down efficiency.",
    "Focus and practice create perfection in code and typing alike.",
  ],
  9: [
    "The world of technology rewards those who refine their skills daily.",
    "Typing, like coding, is an art of precision under pressure.",
    "One misplaced symbol can change everything.",
  ],
  10: [
    "Consistency and discipline distinguish a casual learner from a professional.",
    "Typing fast is not just about hands; it’s about focus, flow, and finesse.",
    "Accuracy under time pressure is the ultimate challenge.",
  ],
};

let level = 1;
let timerInterval = null;
let readyInterval = null;
let timeLeft = 30;
let readyTime = 3;
let startTime = null;
let testText = "";
let charactersTyped = 0;
let wpm = 0;

// DOM Elements
const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const progressBar = document.getElementById("progress-bar");
const popup = document.getElementById("ready-popup");
const resultPopup = document.getElementById("result-popup");
const levelPopup = document.getElementById("level-popup");
const readyTimer = document.getElementById("ready-timer");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const levelShow = document.getElementById("level-show");

// 🧠 Calculate timer dynamically based on number of lines
function getTimeForLevel(level) {
  const lines = levelTexts[level]?.length || 1;
  if (lines <= 1) return 20;
  if (lines === 2) return 30;
  if (lines === 3) return 40;
  if (lines > 3 && lines <= 4) return 50;
  return 60; // hardest levels
}

// 🧩 Load text for selected level
function loadText() {
  const texts = levelTexts[level] || levelTexts[1];
  testText = texts.join(" ");
  textDisplay.innerHTML = testText
    .split("")
    .map((char, i) => `<span id="char-${i}">${char}</span>`)
    .join("");
  timeLeft = getTimeForLevel(level);
  timerElement.textContent = 0;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 0;
  progressBar.style.width = "100%";
}

// 🎯 Level selection
function confirmLevel() {
  const chosen = parseInt(document.getElementById("level-input").value);
  if (chosen >= 1 && chosen <= 10) {
    level = chosen;
    levelPopup.classList.add("hidden");
    loadText();
  } else {
    alert("Please choose a level between 1 and 10.");
  }
}

function closeLevelPopup() {
  levelPopup.classList.add("hidden");
  loadText();
}

// Reopen level selection popup
function openLevelPopup() {
  safeClearIntervals();
  removeTypingListener();
  resultPopup.classList.add("hidden");
  popup.classList.add("hidden");
  textInput.value = "";
  textInput.disabled = true;
  timerElement.textContent = 0;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 0;
  progressBar.style.width = "100%";
  levelPopup.classList.remove("hidden");
}

// 🚀 Start test with countdown popup
function startTest() {
  if (!testText) {
    alert("Please choose a level first!");
    return;
  }
  startBtn.disabled = true;
  resetBtn.disabled = true;
  textInput.value = "";
  textInput.disabled = true;
  readyTime = 3;
  readyTimer.textContent = readyTime;
  popup.classList.remove("hidden");
  safeClearIntervals();
  removeTypingListener();

  readyInterval = setInterval(() => {
    readyTime--;
    readyTimer.textContent = readyTime;
    if (readyTime <= 0) {
      clearInterval(readyInterval);
      readyInterval = null;
      popup.classList.add("hidden");
      beginTypingTest();
    }
  }, 1000);
}

// ✍️ Begin typing
function beginTypingTest() {
  charactersTyped = 0;
  wpm = 0;
  timeLeft = getTimeForLevel(level);
  timerElement.textContent = timeLeft;
  accuracyElement.textContent = 0;
  wpmElement.textContent = 0;
  textInput.disabled = false;
  textInput.focus();
  progressBar.style.width = "100%";
  resetBtn.disabled = false;

  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
  textInput.addEventListener("input", trackTyping);
}

// ⏳ Update timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  progressBar.style.width = `${(timeLeft / getTimeForLevel(level)) * 100}%`;
  if (timeLeft <= 0) {
    safeClearIntervals();
    finishTest();
  }
}

// ⌨️ Track typing
function trackTyping() {
  const typedText = textInput.value;
  charactersTyped = typedText.length;
  let correctChars = 0;

  for (let i = 0; i < testText.length; i++) {
    const charSpan = document.getElementById(`char-${i}`);
    if (!charSpan) continue;
    if (i < typedText.length) {
      if (typedText[i] === testText[i]) {
        charSpan.className = "correct";
        correctChars++;
      } else {
        charSpan.className = "incorrect";
      }
    } else {
      charSpan.className = "";
    }
  }

  calculateResults(correctChars);

  if (typedText.length === testText.length) {
    safeClearIntervals();
    finishTest();
  }
}

// 🧮 Calculate results
function calculateResults(correctChars) {
  const now = new Date().getTime();
  const timeElapsed = startTime ? (now - startTime) / 1000 : 0;
  const timeInMinutes = timeElapsed / 60;
  const netWords = correctChars / 5;
  wpm = timeInMinutes > 0 ? Math.round(netWords / timeInMinutes) : 0;
  wpmElement.textContent = wpm;

  const accuracy =
    charactersTyped > 0
      ? Math.round((correctChars / charactersTyped) * 100)
      : 0;
  accuracyElement.textContent = accuracy;
}

// 🏁 Finish test
function finishTest() {
  textInput.disabled = true;
  removeTypingListener();
  progressBar.style.width = "0%";
  finalWpm.textContent = wpm;
  finalAccuracy.textContent = accuracyElement.textContent;
  levelShow.textContent = level;
  resultPopup.classList.remove("hidden");
  startBtn.disabled = false;
}

// 🔁 Next Level
function nextLevel() {
  safeClearIntervals();
  removeTypingListener();
  if (level < 10) level++;
  resultPopup.classList.add("hidden");
  loadText();
}

// 🔄 Reset test (💥 Restart same level immediately)
function resetTest() {
  safeClearIntervals();
  removeTypingListener();

  // Reload text for the same level
  loadText();

  // Clear typing area and stats
  textInput.value = "";
  wpmElement.textContent = 0;
  accuracyElement.textContent = 0;

  // Immediately restart the test for this level
  beginTypingTest();
}

// 🚪 Quit Game - back to first screen
function quitGame() {
  safeClearIntervals();
  removeTypingListener();
  charactersTyped = 0;
  wpm = 0;
  startTime = null;
  textInput.value = "";
  textInput.disabled = true;
  textDisplay.innerHTML = "Choose a level to start!";
  textDisplay.style.textAlign = "left";
  progressBar.style.width = "100%";
  timerElement.textContent = 0;
  wpmElement.textContent = 0;
  accuracyElement.textContent = 0;
  resultPopup.classList.add("hidden");
  popup.classList.add("hidden");
  levelPopup.classList.remove("hidden");
  startBtn.disabled = false;
  resetBtn.disabled = true;
}

// Helpers
function safeClearIntervals() {
  if (timerInterval) clearInterval(timerInterval);
  if (readyInterval) clearInterval(readyInterval);
  timerInterval = null;
  readyInterval = null;
}

function removeTypingListener() {
  try {
    textInput.removeEventListener("input", trackTyping);
  } catch (e) {}
}

// Initialize
loadText();
