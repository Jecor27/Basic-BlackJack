import React from 'react';
import useGameStore from '../store/gameStore';

/**
 * Component to display game status messages
 */
const GameMessage = () => {
  const { gameMessage, playerName, playerChips, currentBet, bettingPhase } = useGameStore();

  return (
    <div className="game-messages">
      <p id="message-el">{gameMessage}</p>
      <p id="player-el">{playerName}: ${playerChips}</p>
      {!bettingPhase && <p id="bet-el">Current Bet: ${currentBet}</p>}
    </div>
  );
};

export default GameMessage;