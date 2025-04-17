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
            style={{ width: "120px", margin: "0 5px" }} 
          />
        ))}
      </div>
      {sum !== undefined && <p>Sum: {sum}</p>}
    </div>
  );
};

export default CardDisplay;