const buttonEl = document.getElementById("roll-button");
const dice1El = document.getElementById("dice1");
const dice2El = document.getElementById("dice2");
const comboProbEl = document.getElementById("combo-probability");
const sumProbEl = document.getElementById("sum-probability");
const leaderboardEl = document.getElementById("leaderboard");

let leaderboard = []; // Top 5 rarest rolls

function rollDice() {
  const roll1 = Math.floor(Math.random() * 6) + 1;
  const roll2 = Math.floor(Math.random() * 6) + 1;

  dice1El.innerHTML = getDiceFace(roll1);
  dice2El.innerHTML = getDiceFace(roll2);

  const sum = roll1 + roll2;

  // Exact combo probability wording updated
  comboProbEl.textContent = `Probability of any dice combo is 1/36 (≈ 2.78%)`;

  // Sum probability
  const sumProbability = getSumProbability(sum);
  sumProbEl.textContent = `Sum = ${sum} → Probability: ${sumProbability}%`;

  // Update leaderboard of rarest rolls
  updateLeaderboard([roll1, roll2], sum, sumProbability);
  renderLeaderboard();
}

function getSumProbability(sum) {
  const probabilities = {
    2: 1/36,
    3: 2/36,
    4: 3/36,
    5: 4/36,
    6: 5/36,
    7: 6/36,
    8: 5/36,
    9: 4/36,
    10: 3/36,
    11: 2/36,
    12: 1/36
  };
  return (probabilities[sum] * 100).toFixed(2);
}

function updateLeaderboard(roll, sum, sumProbability) {
  leaderboard.push({ roll, sum, sumProbability });
  leaderboard.sort((a, b) => a.sumProbability - b.sumProbability); // rarest first
  if (leaderboard.length > 5) leaderboard = leaderboard.slice(0, 5); // keep top 5
}

function renderLeaderboard() {
  leaderboardEl.innerHTML = "";
  leaderboard.forEach((entry, i) => {
    const li = document.createElement("li");
    li.innerHTML = `#${i + 1}: <span>${getDiceFace(entry.roll[0])}</span> + <span>${getDiceFace(entry.roll[1])}</span> → Sum: ${entry.sum} (${entry.sumProbability}%)`;
    leaderboardEl.appendChild(li);
  });
}

function getDiceFace(roll) {
  switch (roll) {
    case 1: return "&#9856;"; // ⚀
    case 2: return "&#9857;"; // ⚁
    case 3: return "&#9858;"; // ⚂
    case 4: return "&#9859;"; // ⚃
    case 5: return "&#9860;"; // ⚄
    case 6: return "&#9861;"; // ⚅
  }
}

buttonEl.addEventListener("click", () => {
  dice1El.classList.add("roll-animation");
  dice2El.classList.add("roll-animation");
  buttonEl.disabled = true;
  setTimeout(() => {
    dice1El.classList.remove("roll-animation");
    dice2El.classList.remove("roll-animation");
    rollDice();
    buttonEl.disabled = false;
  }, 2000); // match the slower 2-second roll animation
});
