let memoryObject = {
  matchCount: 0,
  time: 1*60,
  matchedCards:[],
  cardsArray:[],
  totalCards:99,
  count: 0,
  iconClass:"",
  firstClick: true,
  previousCard:"empty",
  gameTitle: document.getElementById("overlay-victory"),

  //create cards and display them
  addCards: function(amountOfCards)
  {
   let cardContainer = document.getElementById("card-container");
   totalCards =  amountOfCards;
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
      memoryObject.cardsArray.push(card);

      // add element to html DOM
      cardContainer.appendChild(card);


    }

    // get all now available cards
    for(i=0; i<memoryObject.cardsArray.length; i++){
      // add card class to all cards
      memoryObject.cardsArray[i].classList.add("card");

    }

  },


  //shuffle cards
  shuffleCards:function()
  {
    for(let i = memoryObject.cardsArray.length - 1; i>0; i--)
    {
        let randomIndex = Math.floor(Math.random()*(i+1));
        memoryObject.cardsArray[randomIndex].style.order= i;
        memoryObject.cardsArray[i].style.order = randomIndex;
    }
  },


  // rules for winning
  setVictory: function(matchCount)
  {
    console.log(memoryObject.totalCards);
    if (memoryObject.matchCount == memoryObject.totalCards/2)
    {
        document.getElementById("overlay-victory").style.display = "block";
        document.getElementById('page-title').innerText = "VICTORY";
    }
  },

  // set timer
  updateCountdown: function()
  {
      const minutes = Math.floor( memoryObject.time / 60);
      const seconds = memoryObject.time % 60;
      if (minutes < 0 && seconds < 0)
      {
          memoryObject.gameTitle.style.display = "none";
          document.getElementById("overlay-lost").style.display = "block";
          document.getElementById('page-title').innerHTML = "GAME OVER";
          return;
      }else
      {
          document.getElementById('timer').innerHTML = minutes+ '' + ':' + '' + seconds;

          memoryObject.time--
      }
  }
}


memoryObject.setVictory();
memoryObject.addCards(6);
memoryObject.shuffleCards();
setInterval(memoryObject.updateCountdown,1000);

memoryObject.cardsArray.forEach(card => card.addEventListener('click',function counter(){
    memoryObject.count++;
    document.getElementById('flips').innerHTML = memoryObject.count;

})
);

//1.2 reveal icon onclick en check for matching icons
memoryObject.cardsArray.forEach(card => card.addEventListener('click', function(){
    // console.log(card.firstElementChild.classList.value)
   if (memoryObject.firstClick)
   {
        memoryObject.firstClick = false;
        memoryObject.previousCard = card;
        memoryObject.iconClass = card.firstElementChild.innerText;
        // console.log(iconClass)
        card.firstElementChild.classList.add('reveal');
        card.classList.add('disable-click');
   }
   else
   {

        if (memoryObject.iconClass == card.firstElementChild.innerText)
        {
            console.log('match')
            memoryObject.matchCount++;
            memoryObject.setVictory(memoryObject.matchCount)
            memoryObject.matchedCards.push(card,memoryObject.previousCard)
            console.log(memoryObject.matchedCards)
            card.firstElementChild.classList.add('reveal');
            setTimeout(function(){
                card.classList.add('disable-click');
                memoryObject.previousCard.classList.add('disable-click');

            },2000)

           // console.log(card.classList)
            memoryObject.iconClass ="empty";
            memoryObject.firstClick=true;

        }
        else
        {
            card.firstElementChild.classList.add('reveal');
            setTimeout(function(){
                card.firstElementChild.classList.remove('reveal')
                memoryObject.previousCard.firstElementChild.classList.remove('reveal')},1000)
                // console.log(iconClass, card.firstElementChild.id, previousCard)
                memoryObject.firstClick=true;

                temporalyDisableClicks()


        }

   }
})
);

// disable card clicking to prevent spamming
function temporalyDisableClicks(){
    memoryObject.cardsArray.forEach(card => card.classList.add("disable-click"))
    setTimeout(function(){
        memoryObject.cardsArray.forEach(card => card.classList.remove("disable-click"))
        memoryObject.matchedCards.forEach(card => card.classList.add("disable-click"))
},2100)
}
