import { useState } from "react";

import PlayerField from "./components/PlayerField";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";


function getCurrentPlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player == 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = getCurrentPlayer(gameTurns);

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

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
