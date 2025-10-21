import React from "react";

export default function Levels({ setLevel }) {
  return (
    <div className="levels_container">
      <h1>🎮 Memory Matching Game</h1>
      <p>Select Difficulty:</p>
      <div>
        <label>
          <input
            type="radio"
            id="easy"
            name="level"
            onClick={() => setLevel("easy")}
          />
          Easy (4 pairs)
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="normal"
            name="level"
            onClick={() => setLevel("normal")}
          />
          Normal (8 pairs)
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="hard"
            name="level"
            onClick={() => setLevel("hard")}
          />
          Hard (16 pairs)
        </label>
      </div>
    </div>
  );
}
