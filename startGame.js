import getVar from './index.js'
import api from './fetchResponse.js';

export async function startGame() {
    getVar.isAlive = true;
    getVar.hasBlackJack = false;

    let cards = await api.deck(3);
    getVar.playerCards = [cards[0], cards[1]];
    getVar.dealerCards = [cards[2]];

    getVar.playerSum = sumCard(getVar.playerCards)
    getVar.dealerSum = sumCard(getVar.dealerCards)
    console.log("Player: ", getVar.playerCards)
}



function sumCard(cards) {
    let sum = 0;
    let aces = 0;
    cards.forEach((cards) => {
        if (cards.value === "ACE") {
            sum += 11;
            aces++;
        } else if (["KING, QUEEN", "JACK"].includes(cards.value)) {
            sum += 10;
        } else {
            sum += Number(cards.value)
        }
    })
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }

    return sum;
}
//the idea was to make ace be counted as an 11 and the face cards as 10 and everything else would be a number card
