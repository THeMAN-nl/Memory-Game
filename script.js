

let matchCount = 0;
// build timer
const startMinute = 1;
let time = startMinute*60;

const memoryObject = {
    matchCount: 0,
    startMinute: 1,

    setVictory: function()
    {
        console.log(this.matchCount);
    }
}

memoryObject.setVictory();

// Rules for winning
function setVictory(matchCount,){
    console.log(matchCount);
    if (matchCount > 3){
        document.getElementById("overlay-victory").style.display = "block";
        document.getElementById('page-title').innerText = "VICTORY";
    }

}


let gameTitle = document.getElementById("overlay-victory");

// set timer
function updateCountdown() {

    const minutes = Math.floor( time / 60);
    const seconds = time % 60;
    if (minutes < 0 && seconds < 0){
        gameTitle.style.display = "none";
        document.getElementById("overlay-lost").style.display = "block";
        document.getElementById('page-title').innerHTML = "GAME OVER";
        return;
    }else{
        document.getElementById('timer').innerHTML = minutes+ '' + ':' + '' + seconds;

        time--
    }
}

setInterval(updateCountdown,1000)

//  Collect all the memory cards (Htmlcollection)
const card= document.getElementsByClassName('card');
//  Turn the card collection into a Array
const cardsArray = Array.from(card);


// shuffle cards
function shuffleCards() {
    for(let i = cardsArray.length - 1; i>0; i--){
        let randomIndex = Math.floor(Math.random()*(i+1));
        cardsArray[randomIndex].style.order= i;
        cardsArray[i].style.order = randomIndex
    }
}


// 1.0 What needs to happen when a memory card is clicked
//contain matched cards
let matchedCards = [] ;
//  Create flips counter
let count = 0;
//1.1 count flips
cardsArray.forEach(card => card.addEventListener('click',function counter(){
    count++;
    document.getElementById('flips').innerHTML = count;

})
);

let iconClass ;
let firstClick = true;
let previousCard = "empty";


//shuffle cards oproepen
shuffleCards()
