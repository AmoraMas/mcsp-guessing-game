/**
 * 
 * Plays a browser game where the user guesses a number until they guess the correct number
 * 
 */

let userName = 'Mr. Random'; // Username referrenced in every dialog, asked at start of game
let continuePlaying = false; // Whether or not to continue playing, will ask the user after playing each game
let bestGameScore = null; // Keeps track of game with least number of attempts

let numMin = 1;  // lowest number that is part of the game range
let numMax = 100; // highest number that is part of the game range

// gets and verifies the user's guess
// returns the user's validated guess
function getGuess(moreText) {
    let numGuessed = prompt(userName + moreText + ',\nPlease pick a number between ' + numMin + ' and ' + numMax + ' .');

    while (Number.isInteger(numGuessed) || numGuessed > numMax || numGuessed < numMin) {
        numGuessed = prompt(userName + '\nNumber ' + numGuessed + ' is out of range.\n\nPlease try again!\nPick a number between ' + numMin + ' and ' + numMax + '.');
    }
    return numGuessed;
}

// Processes the user's guesses and provides prompts to continue guessing until the game is won
function processGuess(numGuessed, numCreated) {
    let keepGuessing = true;
    let attemptedGuesses = [];
    let numAttempts = 1;
    
    do { // Until you win the game
        attemptedGuesses.push(numGuessed);
        if (numGuessed == numCreated) { // Won the game
            if (bestGameScore == null) {  // Won th first Game
                alert(`${userName}, You guessed ${numGuessed} correctly.\nGreat Job!\n\nIt only took you ${numAttempts} attempts.\nYour guesses were...  ${attemptedGuesses}`);
                bestGameScore = numAttempts;
            }
            else if(numAttempts < bestGameScore) {  // Won the game with least number of guesses
                alert(`${userName}, You guessed ${numGuessed} correctly.\nGreat Job!\n\nIt only took you ${numAttempts} attempts.\nYour guesses were...  ${attemptedGuesses}\nThis is your best game so far. Completed in ${numAttempts} attempts.`);
                bestGameScore = numAttempts;
            }
            else if(bestGameScore == numAttempts) { // Won the game tied with previous least number of guesses
                alert(`${userName}, You guessed ${numGuessed} correctly.\nGreat Job!\n\nIt only took you ${numAttempts} attempts.\nYour guesses were...  ${attemptedGuesses}\nyou tied with your best game. Completed in ${numAttempts} attempts.`);
                bestGameScore = numAttempts;
            }
            else { // Won the game but is not better or tied with previous least number of guesses
                alert(`${userName}, You guessed ${numGuessed} correctly.\nGreat Job!\n\nIt only took you ${numAttempts} attempts.\nYour guesses were...  ${attemptedGuesses} + '\nYour best game was completed in ${bestGame} attempts.`);
            }
            keepGuessing = false;
        }
        else if (numGuessed < numCreated) { // Didn't win yet, but guess is too low
            numGuessed = getGuess(',\nYou guessed ' + numGuessed + ' incorrectly.\nToo low!\n\nPrevious guesses...  ' + attemptedGuesses);
            numAttempts++;
        }
        else { // Didn't win yet but guess is too high
            numGuessed = getGuess(',\nYou guessed ' + numGuessed + ' incorrectly.\nToo high!\n\nPrevious guesses...  ' + attemptedGuesses);
            numAttempts++;
        }
    } while (keepGuessing == true);
}

// Start the game by creating a random number, get the first guess, and start processing guesses
function runGuessingGame(userName) {
    let numCreated = (Math.floor(Math.random() * (numMax - numMin))) + numMin;
    let numGuessed = getGuess('');

    console.log('Number the player needs is ' + numCreated + '.');
    
    processGuess(numGuessed, numCreated);
}

// START RUNNING CODE HERE //

// Provide user name
userName = prompt('Please provide your name.', userName);
console.log(`Welcome ${userName}`);

// run the game and ask if want to play again once won.
do {
    runGuessingGame(userName);
    continuePlaying = confirm(userName + '\nWould you like to play again?');
} while (continuePlaying == true);