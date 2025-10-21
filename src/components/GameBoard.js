import React, { useState, useEffect } from "react";
import Tile from "./Tile";

const LEVELS = {
  easy: 4,
  normal: 8,
  hard: 16,
};

export default function GameBoard({ level, setLevel }) {
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const pairs = LEVELS[level];
    let numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }
    numbers.sort(() => Math.random() - 0.5);
    setTiles(numbers);
  }, [level]);

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((a) => a + 1);
      const [first, second] = newFlipped;
      if (tiles[first] === tiles[second]) {
        setMatched((m) => [...m, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const allSolved = matched.length === tiles.length;

  return (
    <div>
      <h2>Difficulty: {level.toUpperCase()}</h2>
      <p>Attempts: {attempts}</p>
      {allSolved ? (
        <div>
          <h3>🎉 All Pairs Matched!</h3>
          <button onClick={() => setLevel(null)}>Play Again</button>
        </div>
      ) : (
        <div className="cells_container">
          {tiles.map((value, index) => (
            <Tile
              key={index}
              value={value}
              flipped={flipped.includes(index) || matched.includes(index)}
              onClick={() => handleFlip(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
