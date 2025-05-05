import { useState } from "react";

import PlayerField from "./components/PlayerField";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function toggleActivePlayer(row, column) {
    setActivePlayer((currentPlayer) => {
      if (currentPlayer === "X") {
        return "O";
      }
      return "X";
    });

    setGameTurn((prevTurns) => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerField
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <PlayerField
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard
          onSelection={toggleActivePlayer}
          turns={gameTurns}
        />
      </div>

      <Log></Log>
    </main>
  );
}

export default App;
