import { Player } from './player.js'
// console.log(player)

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let dealerCards = []
let dealerSum = 0
let dealerEl = document.getElementById("dealer-el")
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = Player.name + ": $" + Player.chips

function setPlayerName(){
    const nameInput = document.getElementById("player-name-input");
    if (nameInput.value !== ""){
        Player.name = nameInput.value;
        Player.chips = 500;
        playerEl.textContent = Player.name + ": $" + Player.chips;
        nameInput.value = "";
    }
    startGame()
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false

    // Player's initial cards
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    // Dealer's initial card
    let dealerFirstCard = getRandomCard()
    dealerCards = [dealerFirstCard]
    dealerSum = dealerFirstCard

    renderGame()
}

function renderGame() {
    // Player's cards
    cardsEl.textContent = "Your Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Your Sum: " + sum;

    // Dealer's cards
    dealerEl.textContent = "Dealer's Cards: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerEl.textContent += dealerCards[i] + " ";
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        dealerTurn(); // Dealer finishes their turn if the player gets 21
        return; // Exit early to avoid rendering again unnecessarily
    } else {
        message = "You're out of the game!";
        isAlive = false;
        dealerTurn(); // Dealer finishes their turn if the player is out
        return; // Exit early to avoid rendering again unnecessarily
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}


function dealerTurn() {
    // Dealer must draw cards until the sum is at least 17
    while (dealerSum < 17) {
        let card = getRandomCard();
        dealerCards.push(card);
        dealerSum += card;

        // Update the dealer's displayed cards during each iteration
        dealerEl.textContent = "Dealer's Cards: ";
        for (let i = 0; i < dealerCards.length; i++) {
            dealerEl.textContent += dealerCards[i] + " ";
        }
    }

    determineWinner(); // Determine the winner after the dealer finishes drawing
}

function determineWinner() {
    if (dealerSum > 21 || sum > dealerSum && sum <= 21) {
        message = "You win!"
        Player.chips += 50
    } else if (sum > 21 || dealerSum > sum) {
        message = "Dealer wins!"
        Player.chips -= 50
    } else if (sum === dealerSum) {
        message = "It's a tie!"
    }
    messageEl.textContent = message
    playerEl.textContent = Player.name + ": $" + Player.chips
}