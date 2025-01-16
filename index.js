import { Player } from './player.js'
import api  from './fetchResponse.js';
import { startGame } from './startGame.js'

// console.log(player)

let playerCards = []
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
let startGameButton = document.getElementById("startGame")

playerEl.textContent = Player.name + ": $" + Player.chips
console.log(hasBlackJack)


function setPlayerName(){
    const nameInput = document.getElementById("player-name-input");
    if (nameInput.value !== ""){
        Player.name = nameInput.value;
        Player.chips = 500;
        playerEl.textContent = Player.name + " $" + Player.chips;
        nameInput.value = "";
    }
    startGame()
}
startGameButton.addEventListener("click", setPlayerName);
// when first making the game, i had this function generating a random number in place of the cards
// since i added an api, i no longer need to randomize the values since the api already does that for me
// function getRandomCard() {
//     let randomNumber = Math.floor(Math.random() * 13) + 1
//     if (randomNumber > 10) {
//         return 10
//     } else if (randomNumber === 1) {
//         return 11
//     } else {
//         return randomNumber
//     }
// }


function renderGame() {
    // Player's cards
    cardsEl.textContent = "Your Cards: ";
    for (let i = 0; i < playerCards.length; i++) {
        cardsEl.textContent += playerCards[i] + " ";
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
        return;
    } else {
        message = "You're out of the game!";
        isAlive = false;
        dealerTurn(); // Dealer finishes their turn if the player is out, then returned to keep it from drawing more cards 
        return; 
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        playerCards.push(card)
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

export default {
    isAlive,
    hasBlackJack,
    playerCards,
    dealerCards,
    sum,
    dealerSum
}