import React, { useState } from 'react';
import useGameStore from '../store/gameStore';

/**
 * Component for betting controls
 */
const BettingControls = () => {
  const { currentBet, playerChips, setBet, placeBet } = useGameStore();
  const [inputBet, setInputBet] = useState(currentBet);
  const [error, setError] = useState('');

  const handleBetChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInputBet(isNaN(value) ? '' : value);
  };

  const handlePlaceBet = () => {
    const betAmount = parseInt(inputBet, 10);
    
    if (isNaN(betAmount) || betAmount <= 0) {
      setError('Please enter a valid bet amount');
      return;
    }
    
    if (betAmount > playerChips) {
      setError(`You only have $${playerChips} chips available`);
      return;
    }
    
    setError('');
    setBet(betAmount);
    placeBet();
  };

  const handleQuickBet = (amount) => {
    if (amount > playerChips) {
      setError(`You only have $${playerChips} chips available`);
      return;
    }
    
    setError('');
    setInputBet(amount);
    setBet(amount);
  };

  return (
    <div className="betting-controls">
      <h3>Place Your Bet</h3>
      
      <div className="bet-input-container">
        <label htmlFor="bet-amount">Bet Amount: $</label>
        <input
          type="number"
          id="bet-amount"
          min="1"
          max={playerChips}
          value={inputBet}
          onChange={handleBetChange}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      
      <div className="quick-bet-buttons">
        <button 
          onClick={() => handleQuickBet(10)} 
          disabled={playerChips < 10}
          className="quick-bet-btn"
        >
          $10
        </button>
        <button 
          onClick={() => handleQuickBet(25)} 
          disabled={playerChips < 25}
          className="quick-bet-btn"
        >
          $25
        </button>
        <button 
          onClick={() => handleQuickBet(50)} 
          disabled={playerChips < 50}
          className="quick-bet-btn"
        >
          $50
        </button>
        <button 
          onClick={() => handleQuickBet(100)} 
          disabled={playerChips < 100}
          className="quick-bet-btn"
        >
          $100
        </button>
      </div>
      
      <button 
        onClick={handlePlaceBet} 
        className="place-bet-btn"
      >
        Place Bet
      </button>
      
      <p className="chips-display">Your chips: ${playerChips}</p>
    </div>
  );
};

export default BettingControls;