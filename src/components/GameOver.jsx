import React from 'react';
import useGameStore from '../store/gameStore';

const GameOver = () => {
  const { playerName, resetGame } = useGameStore();

  // Handle restart game button click
  const handleRestart = () => {
    resetGame();
  };

  // Handle new player button click
  const handleNewPlayer = () => {
    resetGame();
  };

  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <h2>Game Over</h2>
        
        <div className="game-over-message">
          <p>Sorry, {playerName}! You've run out of chips.</p>
          <p className="final-score">Final Score: $0</p>
        </div>

        <div className="game-over-buttons">
          <button 
            className="restart-button" 
            onClick={handleRestart}
          >
            Restart Game
          </button>
          
          <button 
            className="new-player-button" 
            onClick={handleNewPlayer}
          >
            New Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;