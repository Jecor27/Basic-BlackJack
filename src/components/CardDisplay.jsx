import React from 'react';

/**
 * Component to display a collection of cards
 */
const CardDisplay = ({ label, cards, sum }) => {
  return (
    <div className="card-display">
      <p>{label}</p>
      <div className="cards-container">
        {cards.map((card, index) => (
          <img 
            key={index} 
            src={card.image} 
            alt={card.code}
            // Removed fixed width, now using CSS for responsive sizing
          />
        ))}
      </div>
      {sum !== undefined && <p>Sum: {sum}</p>}
    </div>
  );
};

export default CardDisplay;