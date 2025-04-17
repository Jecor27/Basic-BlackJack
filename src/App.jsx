import React, { useEffect } from 'react';
import CardDisplay from './components/CardDisplay';
import Controls from './components/controls';
import GameMessage from './components/GameMessage';
import WelcomeScreen from './components/WelcomeScreen';
import BettingControls from './components/BettingControls';
import useGameStore from './store/gameStore';
import './App.css';

/**
 * Main App component
 */
function App() {
  const { 
    initializeDeck, 
    playerCards, 
    playerSum, 
    dealerCards, 
    dealerSum,
    gameStarted,
    bettingPhase
  } = useGameStore();

  // Initialize the deck when the app loads
  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  // Render welcome screen or game screen based on gameStarted state
  return (
    <div className="App">
      {!gameStarted ? (
        <WelcomeScreen />
      ) : (
        <>
          <h1>Blackjack</h1>
          
          <GameMessage />
          
          <CardDisplay 
            label="Dealer's Cards:" 
            cards={dealerCards} 
            sum={dealerSum}
          />
          
          <CardDisplay 
            label="Your Cards:" 
            cards={playerCards} 
            sum={playerSum}
          />
          
          {bettingPhase ? (
            <BettingControls />
          ) : (
            <Controls />
          )}
        </>
      )}
    </div>
  );
}

export default App;