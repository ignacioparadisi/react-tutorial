import { useState } from "react";

import PlayerField from "./components/PlayerField";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getCurrentPlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player == "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function updateGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  return gameBoard;
}

function checkWinner(gameBoard, players) {

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      return players[firstSquareSymbol];
    }
  }

  return null;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = getCurrentPlayer(gameTurns);
  const gameBoard = updateGameBoard(gameTurns);
  const winner = checkWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function toggleActivePlayer(row, column) {
    setGameTurn((prevTurns) => {
      const currentPlayer = getCurrentPlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row,
            column,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function restartGame() {
    setGameTurn([]);
  }

  function onNameChange(symbol, name) {
    setPlayers((data) => {
      return {
        ...data,
        [symbol]: name
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerField
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onSave={onNameChange}
          />
          <PlayerField
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onSave={onNameChange}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartGame} />}
        <GameBoard onSelection={toggleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
