import React from 'react';
import useGameStore from '../store/gameStore';

/**
 * Component for game controls (buttons)
 */
const Controls = () => {
  const { 
    startGame, 
    drawNewCard, 
    stay, 
    resetGame,
    isAlive
  } = useGameStore();

  // Start a new round
  const handleNewRound = () => {
    startGame();
  };

  return (
    <div className="controls">
      <div className="buttons">
        <button onClick={handleNewRound}>New Round</button>
        <button onClick={drawNewCard} disabled={!isAlive}>New Card</button>
        <button onClick={stay} disabled={!isAlive}>Stay</button>
        <button onClick={resetGame} className="reset-button">Change Player</button>
      </div>
    </div>
  );
};

export default Controls;