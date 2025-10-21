import React from "react";

export default function Tile({ value, flipped, onClick }) {
  return (
    <div className="tile" onClick={onClick}>
      {flipped ? <span>{value}</span> : <span>❓</span>}
    </div>
  );
}
