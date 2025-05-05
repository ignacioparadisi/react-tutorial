import { useState } from "react";

function PlayerField({ initialName, symbol, isActive, onSave }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((isEditing) => !isEditing);

    if (isEditing) {
      onSave(symbol, playerName);
    }
  }

  function nameDidChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameField = <span className="player-name">{playerName}</span>;
  let ctaTitle = "Edit";

  if (isEditing) {
    playerNameField = <input type="text" value={playerName} required onChange={nameDidChange} />;
    ctaTitle = "Save";
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEditing}>{ctaTitle}</button>
    </li>
  );
}

export default PlayerField;
