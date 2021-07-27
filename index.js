let deckId;
let remainingCards = document.getElementById("cards-remaining");
let disable = false;
let DrawButton = document.getElementById("button-draw");
let computerScore = document.getElementById("computer-score");
let playerScore = document.getElementById("player-score");
let playerCount =0, computerCount =0;

 function newDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        deckId = data.deck_id;
        remainingCards.textContent = ` ${data.remaining}`;
    })
 }
 document.getElementById("button")
    .addEventListener("click", newDeck)


    DrawButton
    .addEventListener("click", function newDraw(){
        if((deckId === undefined) || (disable)) {
            return false;
        }
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            let cards = data.cards;
           // console.log(data);
            let actualResult = result(cards[0], cards[1]);
            let resultPlaceHolder = document.getElementById("result-placeholder");
            let cardslots = document.getElementsByClassName("card-slots")[0];

            for (let i = 0; i < 2; i++) {
                cardslots.children[i].innerHTML = `
                <img src="${cards[i].image}" width="100px" height="140px" alt="${cards[i].value} of ${cards[i].suit}" />     
                `
            }
            resultPlaceHolder.textContent = ` ${actualResult}`;
            if(data.remaining === 0){
                disable = true;
                DrawButton.classList.add("disabled")
                if(computerCount > playerCount){
                    resultPlaceHolder.textContent = "Computer Won! The War 🥺"
                }
                else if(computerCount < playerCount){
                    resultPlaceHolder.textContent = "Yay!! You Won 🥳 The War!"
                }
                else {
                    resultPlaceHolder.textContent = "Its a Tie Game 🏳️"   
                }
            }
            remainingCards.textContent = ` ${data.remaining}`;
            if(actualResult === "Computer wins"){
                computerCount++;
            }
            else if(actualResult === "You win") {
                playerCount++;
            }
            computerScore.textContent = `${computerCount}`;
            playerScore.textContent = `${playerCount}`;
        })
    })
function check(value) {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        if(element === value){
            return i;
        }
    }
}
function result(card1, card2) {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    if(check(card1.value) > check(card2.value)) {
        return "Computer wins";
    }
    else if(check(card1.value) < check(card2.value)) {
        return "You win";
    }
    else{
        return "its a War!"
    }
}