import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Minimalistic Tic Tac Toe Game
 * Features:
 *  - 3x3 game board
 *  - Two-player mode (X / O)
 *  - Display current player
 *  - Game reset functionality
 *  - Highlight winning row
 * Style and colors based on provided palette and layout.
 */

// Color palette as per work item
const COLORS = {
  primary: '#1976d2',    // Board border, highlight, etc
  secondary: '#1565c0',  // Board bg
  accent: '#ffb300',     // Highlight winning, button hover
  bg: '#fff',
  text: '#222',
  lightBorder: '#e9ecef'
};

// Helper: calculate winner and winning squares
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],  // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // Diagonals
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // The 9-square board, and which player's turn ('X' or 'O')
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winnerInfo = calculateWinner(squares);
  const isFull = squares.every(sq => sq);

  // Reset the game
  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Handle click on a square
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (squares[idx] || winnerInfo) return;
    const nextBoard = squares.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextBoard);
    setXIsNext(!xIsNext);
  }

  // Determine the status message
  let status;
  if (winnerInfo) {
    status = (
      <span className="ttt-winner">
        Winner: {winnerInfo.winner}
      </span>
    );
  } else if (isFull) {
    status = <span className="ttt-tie">It's a tie!</span>;
  } else {
    status = (
      <span>
        Current Player:{" "}
        <span
          style={{
            color: xIsNext ? COLORS.primary : COLORS.accent,
            fontWeight: 600,
          }}
        >
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  // Minimalistic board component
  // PUBLIC_INTERFACE
  function Board() {
    return (
      <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
        {squares.map((val, i) => {
          const isWinSquare =
            winnerInfo && winnerInfo.line.includes(i);
          return (
            <button
              type="button"
              className={`ttt-cell${isWinSquare ? ' ttt-cell-win' : ''}`}
              key={i}
              aria-label={`cell ${i + 1}, ${val ? val : 'empty'}`}
              aria-disabled={val || winnerInfo || isFull}
              onClick={() => handleClick(i)}
              tabIndex="0"
            >
              {val}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="ttt-container" style={{ background: COLORS.bg, color: COLORS.text }}>
      <div className="ttt-panel">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status">{status}</div>
      </div>
      <Board />
      <div className="ttt-actions">
        <button className="ttt-reset-btn" type="button" onClick={handleReset}>
          Reset Game
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: COLORS.secondary, textDecoration: 'none', fontSize: 13 }}
          >
            Powered by React
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
