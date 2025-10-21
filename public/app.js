const LEVELS = {
  easy: { pairs: 4, tiles: 8 },
  normal: { pairs: 8, tiles: 16 },
  hard: { pairs: 16, tiles: 32 },
};
let tiles, picked, matched, attempts;
const cellsContainer = document.querySelector(".cells_container");
const attemptsSpan = document.getElementById("attempts");
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  const level = document.querySelector('input[name="level"]:checked').id;
  const { pairs } = LEVELS[level];
  tiles = [];
  for (let n = 1; n <= pairs; n++) tiles.push(n, n);
  shuffle(tiles);
  picked = [];
  matched = [];
  attempts = 0;
  attemptsSpan.textContent = 0;
  cellsContainer.className = "cells_container " + level;
  cellsContainer.innerHTML = "";
  tiles.forEach((num, idx) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.dataset.index = idx;
    div.textContent = "?";
    div.addEventListener("click", flip);
    cellsContainer.appendChild(div);
  });
}
function flip(e) {
  const idx = Number(e.target.dataset.index);
  if (picked.includes(idx) || matched.includes(idx)) return;
  reveal(idx);
  if (picked.length === 2) {
    attempts++;
    attemptsSpan.textContent = attempts;
    const [a, b] = picked;
    if (tiles[a] === tiles[b]) {
      matched.push(a, b);
      document.querySelectorAll(".cell").forEach((el) => {
        if ([a, b].includes(Number(el.dataset.index)))
          el.classList.add("matched");
      });
      if (matched.length === tiles.length)
        setTimeout(() => alert(`You won in ${attempts} attempts!`), 300);
    } else
      setTimeout(() => {
        hide(a);
        hide(b);
      }, 600);
    picked = [];
  }
}
function reveal(i) {
  picked.push(i);
  document.querySelector(`.cell[data-index="${i}"]`).textContent = tiles[i];
}
function hide(i) {
  document.querySelector(`.cell[data-index="${i}"]`).textContent = "?";
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
