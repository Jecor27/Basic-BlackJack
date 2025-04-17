/**
 * Calculate the sum of card values in a hand
 * @param {Array} cards - Array of card objects
 * @returns {number} Total value of cards
 */
export const sumCard = (cards) => {
    let sum = 0;
    let aces = 0;
    
    cards.forEach((card) => {
      if (card.value === "ACE") {
        sum += 11;
        aces++;
      } else if (["JACK", "QUEEN", "KING"].includes(card.value)) {
        sum += 10;
      } else {
        sum += Number(card.value);
      }
    });
    
    // Adjust for aces if sum is over 21
    while (sum > 21 && aces > 0) {
      sum -= 10;
      aces--;
    }
    
    return sum;
  };