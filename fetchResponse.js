export let baseApi = "https://deckofcardsapi.com/api/deck"
export let newGame = "/new/shuffle/?deck_count=6"
export let Id = ""
// let draw = `/${Id}/draw/?count=2`
// async function deck(link) {
//     let response = await fetch(link)
//     let data = await response.json()
//     //if (!Id) {
//     Id = data.deck_id
//     //}
//     console.log(data)
//     let draw = `/${Id}/draw/?count=2`
//     for(let x = 0; x < 3; x++) {
//         drawfunc(baseApi + draw)
//     }
// }

// async function drawfunc(link) {
    
//     let response = await fetch(link)
//     let data = await response.json()
//     //if (!Id) {
//     //}
//     console.log(data.cards[0].image)
// }
// deck(baseApi + newGame);
export async function startDeck (){  //i needed a way for when the game started it would grab a new deck with an id from the API
    let response = await fetch (baseApi + newGame);
    let data = await response.json();
    Id = data.deck_id;
    console.log("Deck ID:", Id);
}
startDeck();


export async function deck(link){ // the idea was that i needed to draw cards from the deck for whenever the player chooses to draw a card 
    let drawCard = `/${Id}/draw/?count=${link}`;
    let response = await fetch (baseApi + drawCard);
    let data = await response.json();
    // console.log("Drawn Cards:", data.cards);
    return data.cards;
}
// i needed to see if the second function was working by calling the first function with the new deck 
// async function test(){
//     await startDeck();
//     const cards = await deck(2);
//     console.log("test:", cards)
// }
// test()

//trying to export everything
export default {
    baseApi,
    newGame,
    Id,
    startDeck,
    deck
};