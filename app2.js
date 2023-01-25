/**
 * 
 * Plays a browser game where the user guesses a number within a range until they guess the correct number
 * 
 */

// VARIABLES
let minGuess = 1;
let maxGuess = 10;

let previousGuesses = [];             // List of previous guesses within this game
let userName = null;

// FUNCTIONS

function requestName() {
    let userName =  prompt('Please provide your name.', 'Random Gamer');
    return userName;
}

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

function requestGuess(userGuess, guessQuality) {
    let guessRequestText = userName + ',\n';
    if (guessQuality != null) {
        switch(guessQuality) {  // Add status of previous guess to response
            case 'NotInt':
                guessRequestText += `You previously guessed ${userGuess} and it was not an integer.\n`;
                break;
            case 'OoR':
                guessRequestText += `You previously guessed ${userGuess} and it was ouside of the game's range.\n`;
                break;
            case 'High':
                guessRequestText += `You previously guessed ${userGuess} and it was too high.\n`;
                break;
            case 'Low':
                guessRequestText += `You previously guessed ${userGuess} and it was too low.\n`;
                break;
            case 'Bad':
                guessRequestText += `You previously guessed ${userGuess} and I don't know what was wrong with it.\n`;
                break;
        }
    }

    if (previousGuesses.length > 1) {
        guessRequestText += `Your previous guesses were ${previousGuesses}.\n`
    }

    guessRequestText += `\nPlease Pick a number between ${minGuess} and ${maxGuess}.`;

    let guess = prompt(guessRequestText);
    return guess;
}

function respondToCorrectGuess(userGuess, previousGuesses, lastGameLength) {

    let response = `${userName},Great Job! You guessed ${userGuess} correctly.\n\nIt only took you ${previousGuesses.length} attempts. Your previous guesses were...\n${previousGuesses}\n`;
    if (lastGameLength != null) {
        let tenseOfGuess = 'guesses';
        if (lastGameLength - previousGuesses.length == 1 || previousGuesses.length - lastGameLength == 1) {
            tenseOfGuess = 'guess';
        }
        if (previousGuesses.length == lastGameLength) {
            response += `You completed this game with the same number of ${tenseOfGuess} (${lastGameLength}) as your last game.\n`;
        }
        else if (previousGuesses.length < lastGameLength) {
            response += `You completed this game with ${lastGameLength - previousGuesses.length} ${tenseOfGuess} less than your last game.\n`;
        }
        else if (previousGuesses.length > lastGameLength) {
            response += `You completed this game with ${previousGuesses.length - lastGameLength} ${tenseOfGuess} more than your last game.\n`;
        }
    }
    response += '\nGREAT GAME!';
    alert(response);
    return previousGuesses.length;
}

function requestPlayAgain() {
    let playAgain =  confirm(`${userName},\nWould you like to play another round?`);
    return playAgain;
}
/*
function prompt(text) {
    console.log(text);
}
*/
function init() {
    let userGuess = null;                 // Current guess from user
    let guessQuality = null;              // Quality of current guess from user
    let lastGameLength = null;            // Length of previous game
    let playAgain = false;                // Play another game

    do {
        previousGuesses = []; 
        let numToGuess = randomNum();         // Generate a random number the user needs to guess
        do {
            userGuess = requestGuess(userGuess, guessQuality);   // Get a guess from the player
            guessQuality = verifyGuess(userGuess, numToGuess); // verify the guess
            previousGuesses.push(userGuess);
            if (guessQuality == 'Correct') {  // Run this if player guessed correctly
                lastGameLength = respondToCorrectGuess(userGuess, previousGuesses, lastGameLength);
            }
        } while (guessQuality != 'Correct');  // Run again if the player did not guess correctly
        playAgain = requestPlayAgain();  // Ask if the user wants to play the game again
    } while (playAgain);
}


// START MAIN PROGRAM HERE

userName = requestName();         // Name of the player
init();