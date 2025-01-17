import { Player } from './player.js'
import api from './fetchResponse.js';
console.log(api.startDeck)

// console.log(player)
//will try to move all variables to a new file
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
let newCards = document.getElementById("newCard")
let Stay = document.getElementById("stay")

playerEl.textContent = Player.name + ": $" + Player.chips
console.log(hasBlackJack)



// input field for placing your name
function setPlayerName() {
    const nameInput = document.getElementById("player-name-input");
    if (nameInput.value !== "") {
        Player.name = nameInput.value;
        Player.chips = 500;
        playerEl.textContent = Player.name + ": $" + Player.chips;
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


async function startGame() {
    isAlive = true;
    hasBlackJack = false;
    //console.log(isAlive);

    let cards = await api.deck(3);
    console.log("test: ", cards)
    playerCards = [cards[0], cards[1]];
    dealerCards = [cards[2]];

    sum = sumCard(playerCards)
    dealerSum = sumCard(dealerCards)
    console.log("Player: ", playerCards)
    renderGame();
}

function sumCard(cards) {
    let sum = 0;
    let aces = 0;
    cards.forEach((card) => {
        console.log("Card value:", card.value);
        if (card.value === "ACE") {
            sum += 11;
            aces++;

            //having it recognize the face cards have a value of 10 or else it would come back as NAN
        } else if (["JACK"].includes(card.value)) {
            console.log("Face card recognized: ", card.value);
            sum += 10;
        } else if (["QUEEN"].includes(card.value)) {
            console.log("Face card recognized: ", card.value);
            sum += 10;
        } else if (["KING"].includes(card.value)) {
            console.log("Face card recognized: ", card.value);
            sum += 10;
        } else {
            sum += Number(card.value);
        }
    })
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }

    return sum;
}


function renderGame() {
    // Player's cards
    cardsEl.textContent = "Your Cards: ";
    // sice we are messing with an api i need to create a way for the images to render on to the page
    // for (let i = 0; i < playerCards.length; i++) {
    //     cardsEl.textContent += playerCards[i] + " ";
    // }
    playerCards.forEach((card) => {
        let img = document.createElement("img");
        img.src = card.image;
        img.alt = card.code;
        img.style.width = "200px";
        cardsEl.appendChild(img);
    })
    //console.log(img)
    sumEl.textContent = `Your Sum: ${sum}`;

    // Dealer's cards
    dealerEl.innerHTML = "Dealer's Cards: ";
    // for (let i = 0; i < dealerCards.length; i++) {
    //     dealerEl.textContent += dealerCards[i] + " ";
    // }
    dealerCards.forEach((card) => {
        let img = document.createElement("img");
        img.src = card.image;
        img.alt = card.code;
        img.style.width = "200px";
        dealerEl.appendChild(img);
    })

    if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        dealerTurn();
    } else if (sum > 21) {
        message = "You're out of the game!";
        isAlive = false;
        dealerTurn();
    } else {
        message = "Do you want to draw a new card or stay?";
    }
    messageEl.textContent = message;
}

async function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = await api.deck(1);
        playerCards.push(card[0]);
        sum = sumCard(playerCards);
        console.log(sum)
        renderGame()
    }
    console.log("newcard")
}
newCards.addEventListener("click", newCard);


async function dealerTurn() {
    // Dealer must draw cards until the sum is at least 17
    while (dealerSum < 17) {
        let newCards = await api.deck(1);
        dealerCards.push(newCards[0]);
        dealerSum = sumCard(dealerCards);
    }
    // Update the dealer's displayed cards during each iteration
    dealerEl.textContent = "Dealer's Cards: ";
    dealerCards.forEach((card) => {
        let img = document.createElement("img");
        img.src = card.image;
        img.alt = card.code;
        img.style.width = "200px";
        dealerEl.appendChild(img);
    })
    messageEl.textContent = message;
    playerEl.textContent = `${Player.name}: $${Player.chips}`;
}
//from old code for when i  was only using numbers, need to change it so it 
// registers when the dealer is between 17 and 21 to stay instead of keep pulling a card. 
// i was thinking of intergrating it into delerturn function to add a condition where it accounts for the tie.
function determineWinner() {
    if (sum > dealerSum && sum <= 21) {
        message = "You win!"
        Player.chips += 50
    } else if (dealerSum > sum && dealerSum <= 21) {
        message = "Dealer wins!"
        Player.chips -= 50
    } else if (sum === dealerSum) {
        message = "It's a tie!"
    }
    isAlive = false;
    messageEl.textContent = message
    playerEl.textContent = Player.name + ": $" + Player.chips
}
//was trying to add a stay button instead of having to keep pressing new card
function stay() {
    if (isAlive) {
        dealerTurn();
    }
    console.log("stay")
}
Stay.addEventListener("click", stay)
/*
exporting to startgame.js
 */
// export default {
//     isAlive,
//     hasBlackJack,
//     playerCards,
//     dealerCards,
//     sum,
//     dealerSum,
//     renderGame
// }