let memoryObject = {
  matchCount: 0,
  time: 1*60,
  matchedCards:[],
  count: 0,
  iconClass:"",
  firstClick: true,
  previousCard:"empty",

  // Rules for winning
  setVictory: function(){
      if (memoryObject.matchCount > 3){
        document.getElementById("overlay-victory").style.display = "block";
        document.getElementById('page-title').innerText = "VICTORY";
  }

  },
  // set timer
  updateCountdown: function(){
    const minutes = Math.floor( time / 60);
    const seconds = time % 60;
    if (minutes < 0 && seconds < 0){
        test.style.display = "none";
        document.getElementById("overlay-lost").style.display = "block";
        document.getElementById('page-title').innerHTML = "GAME OVER";
        return;
    }else{
        document.getElementById('timer').innerHTML = minutes+ '' + ':' + '' + seconds;

        time--
    }
  },
  addCards: function(amountOfCards)
  {
   let cardContainer = document.getElementById("card-container");
   let cardsArray=[];
   let lastNumber;
   console.log(cardContainer);
    for (i= 0; i<amountOfCards; i++)
    {
      // create div element
    let card =  document.createElement("div");
      // create text node
      let iTag = document.createElement("i");

      // add number to text
      let text;
      // add number to text
      if ((i - 1) === lastNumber)
      {
        text = document.createTextNode(lastNumber);
      }
      else
      {
        text = document.createTextNode(i);
        lastNumber = i;
      }
      // add text to div element
      iTag.appendChild(text);
      card.appendChild(iTag);


      //push card to Array
      cardsArray.push(card);

      // add element to html DOM
      cardContainer.appendChild(card);


    }

    // get all now available cards
    for(i=0; i<cardsArray.length; i++){
      // add card class to all cards
      cardsArray[i].classList.add("card");
    }

  }
}

memoryObject.addCards(12);
// setInterval(updateCountdown,1000)
