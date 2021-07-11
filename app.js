// JavaScript Document

// sorry if it seems weird, but use names from comic books for my variables inside a function.
// it helps remind me it is arbitrary



//my phrases
const phrases = [
    "Mo Money Mo Problems",
    "Make Em Say Uhh",
    "The Real Slim Shady",
    "Politics As Usual",
    "Creepin On A Come Up",
]

//my variables
const startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const phrase = document.querySelector('#phrase');
const show = document.getElementsByClassName('show');
const overlay = document.querySelector('#overlay')
const images = document.getElementsByTagName('img');


let random = Math.floor(Math.random() * Object.values(phrases).length) + 1;
let missed = 0;
let heartsMissing = -1;


//return a random number from an array
const getRandomPhraseArray = function(batman){
    let newPhrase = Object.values(batman)[random].split('');
    return newPhrase
}
//calls the above function  
getRandomPhraseArray(phrases);
const phraseArray = getRandomPhraseArray(phrases);


//adds the letters of the string to the array
function addPhraseToDisplay(robin) {

    for (let superman = 0; superman < phraseArray.length; superman += 1) {
        let joker = document.createElement('li'); //creates a variable that inserts the html element
        joker.textContent = phraseArray[superman] // makes the variable content equal text that is equal to the phrase
        phrase.children[0].appendChild(joker); // inserts the result of our joker
        if (joker.textContent !== ' ') { // if the text content of joker is NOT equal to blank space, insert a letter, otherwise, space
            joker.className = 'letter';
        } else {
            joker.className = 'space';
        }
    }
}

//executes the above mess
addPhraseToDisplay(phraseArray)


//check if the letter is in the phrase
const correct = document.querySelectorAll('.letter')

function checkLetter(buttonClicked) {
    //Set to upperCase so user doesn't have to worry about case sensitive answers
    const letterClicked = buttonClicked.textContent.toUpperCase();
    let letterFound = false; // <-- Default value set to false

    for (let aquaman = 0; aquaman < correct.length; aquaman += 1) {
        if (letterClicked === correct[aquaman].textContent.toUpperCase()) { //checks to see if there the letters match
            correct[aquaman].classList.add('show'); // if the letters match, we chage the class to 'show', which displays the letter
            letterFound = true;
        }
    
        //if letterFound is true, then return the letterClicked, if not true,
        // return 'null'
    }
    return letterFound ? letterClicked : null;
}


// check if the game has been won or lost
function checkWin() {
    if (show.length === correct.length) { //if the letters displayed match the letters of the array, we show...
        overlay.className = 'win';
        overlay.style.display = ''; //it is hidden, we are going to display it
        title.textContent = 'Congrats! You Won!';
        startButton.textContent = 'Play Again!'; //same button, just different text
        startButton.addEventListener('click', () => { //listens for the click, refreshes the page
            location.reload();
        });
    }
    if (missed === 5) { //if the amount of times they miss is equal to five, code runs, we have a loser on our hands.
        overlay.className = 'lose';
        overlay.style.display = '';
        title.textContent = 'Bummer, try again!';
        startButton.textContent = 'Try Again';
        startButton.addEventListener('click', () => { //they get the same reload image as before, to try again
            location.reload();
        });
    }

}

//listens for the first click on the start button, makes overlay style none.
startButton.addEventListener(
    'click', () => {
        overlay.style.display = 'none';
    }
);


//listen for the onscreen keywboard to be cicked
window.addEventListener('click', () => {
    if (event.target.tagName === 'BUTTON') { //listens for btns only
        event.target.className = 'chosen';
        event.target.disabled = 'true';

        let letterFound = checkLetter(event.target);

        if (letterFound === null) {
            missed += 1;
            heartsMissing += 1;
            images[heartsMissing].src = 'images/lostHeart.png'; //this shows the missed heart other heart exists in the html from start.
        }
        checkWin();
    }
});