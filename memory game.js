const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Initializing variable that will keep track of how many cards are allowed ot be opened
let AmountOfCardsChosen = 0;
let firstCard, secondCard;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  const clickedCard = event.target;
// If two cards have already been selected, return without doing anything
  if (AmountOfCardsChosen === 2) {
    return;
  }

  // Change the background color to the color of the clicked card's class
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (AmountOfCardsChosen == 0 ) {
    firstCard = clickedCard;
    firstCard.style.backgroundColor = firstCard.classList[0]; 
    AmountOfCardsChosen ++;
    console.log("You chose 1st card");
  }else{
    secondCard = clickedCard;
    secondCard.style.backgroundColor = secondCard.classList[0];
    console.log("you chose 2nd card");
    AmountOfCardsChosen --;
  }
  // Check if both cards are defined and their classes match
  if (firstCard && secondCard && firstCard.classList[0] === secondCard.classList[0]) {
    console.log("It's a match!");
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
  } else {
    console.log("Not a match!");
    setTimeout(() => {
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";

      // Reset the number of cards selected after processing the click
      AmountOfCardsChosen = 0;
    }, 2000);
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);