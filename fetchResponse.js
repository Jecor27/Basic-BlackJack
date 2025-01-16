let baseApi = "https://deckofcardsapi.com/api/deck"
let newGame = "/new/shuffle/?deck_count=6"
let Id = ""
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

async function deck(link){
    let drawCard = `/${Id}/draw/?count=${link}`;
    let response = await fetch (baseApi + drawCard);
    let data = await response.json();
    return data.cards;
}

