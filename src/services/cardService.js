// API constants
const BASE_API = "https://deckofcardsapi.com/api/deck";
const NEW_GAME = "/new/shuffle/?deck_count=6";

/**
 * Initialize a new deck of cards
 * @returns {Promise<Object>} Deck data including deck_id
 */
export const startDeck = async () => {
  try {
    const response = await fetch(BASE_API + NEW_GAME);
    if (!response.ok) {
      throw new Error(`Error fetching deck: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to initialize deck:", error);
    throw error;
  }
};

/**
 * Draw cards from the deck
 * @param {string} deckId - The ID of the deck to draw from
 * @param {number} count - Number of cards to draw
 * @returns {Promise<Array>} Array of card objects
 */
export const drawCards = async (deckId, count) => {
  try {
    const drawUrl = `${BASE_API}/${deckId}/draw/?count=${count}`;
    const response = await fetch(drawUrl);
    
    if (!response.ok) {
      throw new Error(`Error drawing cards: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.cards;
  } catch (error) {
    console.error("Failed to draw cards:", error);
    throw error;
  }
};