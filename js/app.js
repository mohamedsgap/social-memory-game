// These are Udacity comments to handle the code!
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Some global variable!
let toggledCards=[]; // to store cards in this array!
/*
these 2 variables for checking if we mathed
all cards together in Win function to call
gameOver method to print final score model
*/
let matched= 0;
const allPairs= 8;
// to count our number of moves
let moves= 0;
/*
these 3 variables are needed to calculte the time
during playing the game!
*/
let time= 0;
let clockOff= true;
let clockId;


// create a deck variable to store elements with deck class!
const deck= document.querySelector('.deck');

// create a function to shuffle tke cards every new game!

function shuffleDeck() {
  const cardsForShuffling= Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards= shuffle(cardsForShuffling);
  for(card of shuffledCards){
    deck.appendChild(card);
  }
}
 shuffleDeck();

// adding an event listener card on the deck
deck.addEventListener('click', appearCard);

function appearCard (){
  const press= event.target;
  if (press.classList.contains('card') && !press.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(press)){
   // initilaize the timer for every new game
     if (clockOff){
       clockBegins();
       clockOff= false;
     }
     // call the next two function to flip over the card and add them into array
     toggleCard(press);
     addToggledCard(press);
     // if the array of cards has 2 cards only we gonna apply match  and move func on them
     if (toggledCards.length === 2){
       isMatch(press);
       addMoves();
       checkingScore();
     }
  }
}

// create a function to flip over the card

function toggleCard(press){
  press.classList.toggle('open');
  press.classList.toggle('show');
}

// create this card to push the filped card into the Array

function addToggledCard(press){
  toggledCards.push(press);
  console.log(toggledCards);
}


// create a function for checking the match cards.

function isMatch() {
  if (toggledCards[0].firstElementChild.className ===
       toggledCards[1].firstElementChild.className) {
         toggledCards[0].classList.toggle('match');
         toggledCards[1].classList.toggle('match');
         toggledCards= [];
         matched++;
         setTimeout(function(){
           win();
         },700)
       }
       // if they are not matched will filp them over back again
       else {
         setTimeout(function (){
           toggleCard(toggledCards[0]);
           toggleCard(toggledCards[1]);
           toggledCards= [];
         }, 1000);
       }
     }

// create a function to increase moves!
 function addMoves() {
   moves +=1;
   const movesCount= document.querySelector('.moves');
   movesCount.innerHTML= moves;
 }
