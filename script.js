
var matchCount = 0;
const startMinute = 1;
let time = startMinute*60;

// Rules for winning
function setVictory(matchCount,){
    console.log(matchCount);
    if (matchCount > 3){
        document.getElementById("overlay-victory").style.display = "block";
        document.getElementById('page-title').innerHTML = "VICTORY";
    }
    
}




// set timer
function updateCountdown() {
    
    const minutes = Math.floor( time / 60);
    const seconds = time % 60;
    if (minutes < 0 && seconds < 0){
        document.getElementById("overlay-victory").style.display = "none";
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
const cards = document.getElementsByClassName('card');
// 2.2 Turn the card collection into a Array
const cardsArray = Array.from(cards)





// 1.0 What needs to happen when a memory card is clicked 

//  Create flips counter
var count = 0;
//1.1 count flips
cardsArray.forEach(card => card.addEventListener('click',function counter(){
    count++; 
    document.getElementById('flips').innerHTML = count;
    
})
);

let iconClass ;
let firstClick = true;
let previousCard = "empty";

//1.2 reveal icon onclick en check for matching icons
cardsArray.forEach(card => card.addEventListener('click',function(){
    // console.log(card.firstElementChild.classList.value)
   if (firstClick){
        firstClick = false;
        previousCard = card;
        iconClass = card.firstElementChild.id;
        console.log(iconClass)
        card.firstElementChild.classList.add('reveal');
   } else {
      
        if (iconClass == card.firstElementChild.id){
           console.log('match')
           matchCount++;
           setVictory(matchCount)
        
           card.firstElementChild.classList.add('reveal');
           iconClass ="empty";
           firstClick=true;
        } else {
            card.firstElementChild.classList.add('reveal');
            setTimeout(function(){
                card.firstElementChild.classList.remove('reveal')
                previousCard.firstElementChild.classList.remove('reveal')},1000)
                console.log(iconClass, card.firstElementChild.id, previousCard)
                firstClick=true;
                
                
        
        }
        
   }
})
);




