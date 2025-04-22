# Blackjack React

A modern, responsive implementation of the classic Blackjack card game built with React and Zustand.

## Description

This application is a digital version of the classic casino card game Blackjack (also known as 21). Players can enter their name, place bets, and play against a dealer bot. The game includes all standard Blackjack rules including hitting, staying, and determining winners based on who gets closest to 21 without going over.

Key features:
- Personalized gameplay with player name entry
- Betting system with customizable bet amounts
- Responsive design that works on both desktop and mobile devices
- Game over screen with restart options
- Realistic card dealing and gameplay

## Technologies Used

- **React**: Frontend library for building the user interface
- **Zustand**: State management for the application
- **Vite**: Build tool and development server
- **Deck of Cards API**: External API for card data and images
- **CSS3**: Styling with responsive design principles
- **ES Modules**: JavaScript module system for code organization

## API Reference

This project uses the [Deck of Cards API](https://deckofcardsapi.com/) which provides:
- Card shuffling
- Card drawing
- Multiple deck support
- Card images

## How to Play

1. Enter your name on the welcome screen
2. Place your bet using the betting controls
3. Try to beat the dealer by getting closer to 21 without going over
4. Hit to draw new cards or stay to let the dealer play
5. Win chips for each successful hand
6. If you run out of points, you can restart the game

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/blackjack-react.git

# Navigate to the project directory
cd blackjack-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Credits

- Card API: [Deck of Cards API](https://deckofcardsapi.com/) by Chase Roberts
- React implementation: Jesus Corrales


Credits
Thanks to:
Chase Roberts
https://deckofcardsapi.com