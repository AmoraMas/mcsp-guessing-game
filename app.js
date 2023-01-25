/**
 * 
 * Plays a browser game where the user guesses a number within a range until they guess the correct number
 * 
 */

// GLOBAL VARIABLES
let minGuess = 1;         // Min number for guessing range
let maxGuess = 10;        // Max number for guessing range

let previousGuesses = []; // List of previous guesses within this game
let userName = 'Random Gamer';      // Name of current player
let playerHistory = {};   // Object containing all players and the guess count for their most recent game

// FUNCTIONS

// Get the player name and save a null value to playerHistory if first time using player name
// Outputs userName
function requestName(userName) { 
    userName =  prompt('Please provide your name.', userName);
    if (playerHistory[userName] == undefined) {
        playerHistory[userName] = null;  // create newUser value in playerHistory if it does not exist
    }
    return userName;
}

// Creates and returns a random number between the min and max guess numbers
function randomNum() {
    return (Math.floor(Math.random() * (maxGuess - minGuess))) + minGuess;
}

function verifyGuess(userGuess, numToGuess) {
    if (Number.isInteger(!userGuess)) {
        return 'NotInt'; // Number guessed is not a Number or Integer
    }
    else if (userGuess < minGuess || userGuess > maxGuess) {
        return 'OoR';  // number guessed is out of min/max range
    }
    else if (userGuess < numToGuess) {
        return 'Low'; // number guessed is too low
    }
    else if (userGuess > numToGuess) {
        return 'High'; // number guessed is too high
    }
    else if (userGuess == numToGuess) {
        return 'Correct'; // number guessed is correct
    }
    else {
        return 'Bad'; // should never proc, but just in case somethign went wrong here
    }
}

// Requests an interger guess from the user, verifies it's integrity and returns that guess
function requestGuess(userGuess, guessQuality) {
    let guessRequestText = userName + ',\n';
    if (guessQuality != null) { // If the last user guess was bad, generate why it was bad
        switch(guessQuality) {  // Add status of previous guess to response
            case 'NotInt':
                guessRequestText += `You previously guessed ( ${userGuess} ) and it was not an integer.\n`;
                break;
            case 'OoR':
                guessRequestText += `You previously guessed ( ${userGuess} ) and it was ouside of the game's range.\n`;
                break;
            case 'High':
                guessRequestText += `You previously guessed ( ${userGuess} ) and it was too high.\n`;
                break;
            case 'Low':
                guessRequestText += `You previously guessed ( ${userGuess} ) and it was too low.\n`;
                break;
            case 'Bad':
                guessRequestText += `You previously guessed ( ${userGuess} ) and I don't know what was wrong with it.\n`;
                break;
        }
        previousGuesses.push(userGuess);  // write most recent guess to previousGuesses array
    }
    if (previousGuesses.length == 1) {
        guessRequestText += `Your previous guess was ${previousGuesses}.\n`
    }
    else if (previousGuesses.length > 1) {
        guessRequestText += `Your previous guesses were ${previousGuesses}.\n`
    }
    guessRequestText += `\nPlease Pick a number between ${minGuess} and ${maxGuess}.`;

    let guess = prompt(guessRequestText);
    return guess;
}

// Generates a response to a game winning guess
// Returns an integer value for the total number of guesses used to win the game
function respondToCorrectGuess(userGuess, previousGuesses, lastGameLength) {
    previousGuesses.push(userGuess);
    let response = `${userName},\nGreat Job! You guessed ${userGuess} correctly.\n\nIt only took you ${previousGuesses.length} attempts. Your previous guesses were...\n${previousGuesses}\n`;
    if (playerHistory[userName] != null) { // tests if user played a game previously and generates additional text referrencing previous game
        let tenseOfGuess = 'guesses';      // adjusts the correct version of guess/guesses to show good grammer
        if (lastGameLength - previousGuesses.length == 1 || previousGuesses.length - lastGameLength == 1) {
            tenseOfGuess = 'guess';
        }
    // adjusts the text to compare this game to previous game
        if (previousGuesses.length == playerHistory[userName]) {
            response += `You completed this game with the same number of guesses as your last game.  ( ${playerHistory[userName]} )\n`;
        }
        else if (previousGuesses.length < playerHistory[userName]) {
            response += `You completed this game with ${playerHistory[userName]- previousGuesses.length} ${tenseOfGuess} less than your last game.\n`;
        }
        else if (previousGuesses.length > playerHistory[userName]) {
            response += `You completed this game with ${previousGuesses.length - playerHistory[userName]} ${tenseOfGuess} more than your last game.\n`;
        }
    }
    response += '\nGREAT GAME!';
    alert(response);  // Displays the response to the user
    return previousGuesses.length;
}

// Ask if the player wants to play again
// Return true or false
function requestPlayAgain() {
    let playAgain =  confirm(`${userName},\nWould you like to play another round?`);
    return playAgain;
}

// initial function to run at the start of the program (It all starts here)
function init() {
    let userGuess = null;                 // Current guess from user
    let guessQuality = null;              // Quality of current guess from user
    let lastGameLength = null;            // Length of previous game
    let playAgain = false;                // Play another game

    do {
        previousGuesses = []; 
        userName = requestName(userName); // Name of the player
        let numToGuess = randomNum();     // Generate a random number the user needs to guess
        do {
            userGuess = requestGuess(userGuess, guessQuality);   // Get a guess from the player
            guessQuality = verifyGuess(userGuess, numToGuess);   // verify the guess
            // previousGuesses.push(userGuess);
            if (guessQuality == 'Correct') {                     // If player guessed correctly, say so and save value in playerHistory
                playerHistory[userName] = respondToCorrectGuess(userGuess, previousGuesses, lastGameLength);
            }
        } while (guessQuality != 'Correct');                     // Run again if the player did not guess correctly
        playAgain = requestPlayAgain();                          // Ask if the user wants to play the game again
    } while (playAgain);
}


// START MAIN PROGRAM HERE

init();