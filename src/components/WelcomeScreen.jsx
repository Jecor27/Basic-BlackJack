import React, { useState } from 'react';
import useGameStore from '../store/gameStore';

const WelcomeScreen = () => {
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');
  const { setPlayerName, startGame, setGameStarted } = useGameStore();

  const handleStartGame = () => {
    if (nameInput.trim() === '') {
      setError('Please enter your name to continue');
      return;
    }
    
    setError('');
    setPlayerName(nameInput);
    startGame();
    setGameStarted(true);
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Blackjack</h1>
      
      <div className="welcome-content">
        <p className="welcome-message">
          Test your luck against the dealer!
        </p>
        
        <div className="name-input-container">
          <label htmlFor="player-name">Enter your name to begin:</label>
          <input
            type="text"
            id="player-name"
            placeholder="Your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;