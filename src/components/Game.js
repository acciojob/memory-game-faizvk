import React, { useEffect, useMemo, useState } from "react";

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeTiles(pairCount) {
  const values = [];
  for (let i = 1; i <= pairCount; i++) values.push(i);
  const doubled = values.concat(values);
  return shuffleArray(doubled).map((val, idx) => ({
    id: `${val}-${idx}`,
    value: val,
    matched: false,
    revealed: false,
  }));
}

export default function Game() {
  const [level, setLevel] = useState("easy");
  const pairCount = useMemo(
    () => (level === "easy" ? 4 : level === "normal" ? 8 : 16),
    [level]
  );
  const [tiles, setTiles] = useState(() => makeTiles(4));
  const [flipped, setFlipped] = useState([]); // indexes of currently flipped (max 2)
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    resetBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (tiles.every((t) => t.matched)) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [tiles]);

  const resetBoard = () => {
    setTiles(makeTiles(pairCount));
    setFlipped([]);
    setAttempts(0);
    setDisabled(false);
    setSolved(false);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleClickTile = (index) => {
    if (disabled) return;
    const tile = tiles[index];
    if (tile.matched || tile.revealed) return;

    const nextTiles = tiles.slice();
    nextTiles[index] = { ...tile, revealed: true };
    const nextFlipped = [...flipped, index];
    setTiles(nextTiles);
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setDisabled(true);
      setAttempts((a) => a + 1);
      const [i1, i2] = nextFlipped;
      const t1 = nextTiles[i1];
      const t2 = nextTiles[i2];
      if (t1.value === t2.value) {
        // mark matched
        nextTiles[i1] = { ...t1, matched: true };
        nextTiles[i2] = { ...t2, matched: true };
        setTimeout(() => {
          setTiles(nextTiles);
          setFlipped([]);
          setDisabled(false);
        }, 350);
      } else {
        // hide after short delay
        setTimeout(() => {
          nextTiles[i1] = { ...t1, revealed: false };
          nextTiles[i2] = { ...t2, revealed: false };
          setTiles(nextTiles);
          setFlipped([]);
          setDisabled(false);
        }, 600);
      }
    }
  };

  return (
    <div className="game">
      <section className="levels_container">
        <div>
          <input
            id="easy"
            type="radio"
            name="level"
            value="easy"
            checked={level === "easy"}
            onChange={handleLevelChange}
          />
          <label htmlFor="easy">Easy</label>
        </div>
        <div>
          <input
            id="normal"
            type="radio"
            name="level"
            value="normal"
            checked={level === "normal"}
            onChange={handleLevelChange}
          />
          <label htmlFor="normal">Normal</label>
        </div>
        <div>
          <input
            id="hard"
            type="radio"
            name="level"
            value="hard"
            checked={level === "hard"}
            onChange={handleLevelChange}
          />
          <label htmlFor="hard">Hard</label>
        </div>
        <div className="controls">
          <button onClick={resetBoard}>Restart</button>
          <div className="attempts">Attempts: {attempts}</div>
        </div>
      </section>

      <section className="cells_container" aria-live="polite">
        {tiles.map((tile, idx) => (
          <button
            key={tile.id}
            className={`cell ${tile.matched ? "matched" : ""} ${
              tile.revealed ? "revealed" : ""
            }`}
            onClick={() => handleClickTile(idx)}
            disabled={tile.matched}
            data-testid={`tile-${idx}`}
          >
            {tile.revealed || tile.matched ? (
              <span className="value">{tile.value}</span>
            ) : (
              <span className="cover" />
            )}
          </button>
        ))}
      </section>

      <div className="status">
        {solved ? (
          <div className="solved">
            <h2>All pairs matched!</h2>
            <p>Total attempts: {attempts}</p>
            <button onClick={resetBoard}>Play again</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
