import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onSelection, activePlayer }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectedSquare(row, column) {
    setGameBoard((previousGameBoard) => {
      // Create a copy of the previous board
      const updatedBoard = [
        ...previousGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[row][column] = activePlayer;
      // Return the copy.
      return updatedBoard;
    });

    onSelection();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={() => handleSelectedSquare(rowIndex, columnIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
