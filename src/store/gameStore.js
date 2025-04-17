import { create } from 'zustand';
import { sumCard } from '../utils/gameUtils';
import { startDeck, drawCards } from '../services/cardService';

// Create game store with Zustand
const useGameStore = create((set, get) => ({
  // Game initialization state
  gameStarted: false,
  bettingPhase: true,
  
  // Player state
  playerName: "Please enter your name, then press Start Game",
  playerChips: 500,
  playerCards: [],
  playerSum: 0,
  
  // Dealer state
  dealerCards: [],
  dealerSum: 0,
  
  // Game state
  isAlive: false,
  hasBlackJack: false,
  gameMessage: "Want to play a round?",
  deckId: "",
  currentBet: 50,
  
  // Initialize deck
  initializeDeck: async () => {
    try {
      const data = await startDeck();
      set({ deckId: data.deck_id });
    } catch (error) {
      console.error("Error initializing deck:", error);
    }
  },
  
  // Set game started state
  setGameStarted: (started) => {
    set({ gameStarted: started });
  },

  // Set player name
  setPlayerName: (name) => {
    if (name.trim() !== "") {
      set({ playerName: name });
    }
  },
  
  // Set current bet amount
  setBet: (amount) => {
    if (amount <= get().playerChips && amount > 0) {
      set({ currentBet: amount });
    }
  },
  
  // Start a new game round (transition to betting phase)
  startGame: () => {
    set({
      bettingPhase: true,
      isAlive: false,
      hasBlackJack: false,
      gameMessage: "Place your bet!",
      playerCards: [],
      dealerCards: [],
      playerSum: 0,
      dealerSum: 0
    });
  },
  
  // Place bet and start the round
  placeBet: async () => {
    try {
      // Change from betting phase to playing phase
      set({ 
        bettingPhase: false,
        isAlive: true,
        gameMessage: "Do you want to draw a new card or stay?"
      });
      
      const { deckId } = get();
      
      // Draw initial cards
      const cards = await drawCards(deckId, 3);
      
      // Deal cards
      const playerInitialCards = [cards[0], cards[1]];
      const dealerInitialCards = [cards[2]];
      
      const playerSum = sumCard(playerInitialCards);
      const dealerSum = sumCard(dealerInitialCards);
      
      set({
        playerCards: playerInitialCards,
        dealerCards: dealerInitialCards,
        playerSum,
        dealerSum
      });
      
      // Check for blackjack
      if (playerSum === 21) {
        set({
          hasBlackJack: true,
          gameMessage: "You've got Blackjack!",
        });
        get().dealerTurn();
      } else if (playerSum > 21) {
        set({
          isAlive: false,
          gameMessage: "You're out of the game!",
        });
        get().dealerTurn();
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      set({ 
        gameMessage: "Error dealing cards. Please try again.",
        bettingPhase: true 
      });
    }
  },

  // Draw a new card for the player
  drawNewCard: async () => {
    try {
      const { isAlive, hasBlackJack, deckId, playerCards } = get();
      
      if (isAlive && !hasBlackJack) {
        const newCard = await drawCards(deckId, 1);
        const updatedCards = [...playerCards, newCard[0]];
        const newSum = sumCard(updatedCards);
        
        set({
          playerCards: updatedCards,
          playerSum: newSum
        });
        
        // Check for win/lose conditions
        if (newSum === 21) {
          set({
            hasBlackJack: true,
            gameMessage: "You've got Blackjack!",
          });
          get().dealerTurn();
        } else if (newSum > 21) {
          set({
            isAlive: false,
            gameMessage: "You're out of the game!",
          });
          get().dealerTurn();
        }
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  },
  
  // Dealer's turn (when player stays or busts)
  dealerTurn: async () => {
    try {
      let { dealerCards, dealerSum, deckId, currentBet } = get();
      
      // Dealer draws until 17 or higher
      while (dealerSum < 17) {
        const newCards = await drawCards(deckId, 1);
        dealerCards = [...dealerCards, newCards[0]];
        dealerSum = sumCard(dealerCards);
      }
      
      set({ 
        dealerCards,
        dealerSum
      });
      
      if (dealerSum > 21) {
        // Dealer busts, player wins
        set({ 
          gameMessage: "Dealer busts! You win!",
          playerChips: get().playerChips + currentBet,
          isAlive: false,
          bettingPhase: true
        });
      } else {
        get().determineWinner();
      }
    } catch (error) {
      console.error("Error during dealer's turn:", error);
    }
  },
  
  // Determine the winner
  determineWinner: () => {
    const { playerSum, dealerSum, currentBet } = get();
    
    if (playerSum > dealerSum && playerSum <= 21) {
      // Player wins
      set({
        gameMessage: "You win!",
        playerChips: get().playerChips + currentBet,
        isAlive: false,
        bettingPhase: true
      });
    } else if (dealerSum > playerSum && dealerSum <= 21) {
      // Dealer wins
      set({
        gameMessage: "Dealer wins!",
        playerChips: get().playerChips - currentBet,
        isAlive: false,
        bettingPhase: true
      });
    } else if (playerSum === dealerSum) {
      // Tie
      set({
        gameMessage: "It's a tie!",
        isAlive: false,
        bettingPhase: true
      });
    }
  },
  
  // Player chooses to stay
  stay: () => {
    const { isAlive } = get();
    if (isAlive) {
      get().dealerTurn();
    }
  },
  
  // Reset the game to the welcome screen
  resetGame: () => {
    set({
      gameStarted: false,
      playerName: "Please enter your name, then press Start Game",
      playerChips: 500,
      playerCards: [],
      playerSum: 0,
      dealerCards: [],
      dealerSum: 0,
      isAlive: false,
      hasBlackJack: false,
      gameMessage: "Want to play a round?",
      currentBet: 50,
      bettingPhase: true
    });
  }
}));

export default useGameStore;