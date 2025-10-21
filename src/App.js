import React, { useState, useEffect } from "react";
import "./App.css"; // make sure this file exists in src/

const LEVELS = {
  easy: { pairs: 4, tiles: 8 },
  normal: { pairs: 8, tiles: 16 },
  hard: { pairs: 16, tiles: 32 },
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [level, setLevel] = useState("easy");
  const [tiles, setTiles] = useState([]);
  const [picked, setPicked] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  function startGame() {
    const { pairs } = LEVELS[level];
    const nums = [];
    for (let n = 1; n <= pairs; n++) nums.push(n, n);
    setTiles(shuffle(nums));
    setPicked([]);
    setMatched([]);
    setAttempts(0);
  }

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    if (tiles[a] === tiles[b]) {
      setMatched((m) => [...m, a, b]);
    } else {
      setTimeout(() => setPicked([]), 600);
      return;
    }
    setPicked([]);
    setAttempts((x) => x + 1);
  }, [picked, tiles]);

  function flip(idx) {
    if (picked.includes(idx) || matched.includes(idx)) return;
    setPicked((p) => [...p, idx]);
  }

  const gridCols = level === "hard" ? 8 : 4;
  const won = matched.length === tiles.length && tiles.length > 0;

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>

      <section className="levels_container">
        <label>
          <input
            type="radio"
            name="level"
            checked={level === "easy"}
            onChange={() => setLevel("easy")}
          />{" "}
          Easy
        </label>
        <label>
          <input
            type="radio"
            name="level"
            checked={level === "normal"}
            onChange={() => setLevel("normal")}
          />{" "}
          Normal
        </label>
        <label>
          <input
            type="radio"
            name="level"
            checked={level === "hard"}
            onChange={() => setLevel("hard")}
          />{" "}
          Hard
        </label>
        <button onClick={startGame}>Start Game</button>
      </section>

      <section
        className="cells_container"
        style={{ gridTemplateColumns: `repeat(${gridCols},80px)` }}
      >
        {tiles.map((n, i) => (
          <div
            key={i}
            className={`cell ${matched.includes(i) ? "matched" : ""}`}
            onClick={() => flip(i)}
          >
            {picked.includes(i) || matched.includes(i) ? n : "?"}
          </div>
        ))}
      </section>

      <p>
        Attempts: <span>{attempts}</span>
      </p>
      {won && <h2>You won in {attempts} attempts!</h2>}
    </div>
  );
}
