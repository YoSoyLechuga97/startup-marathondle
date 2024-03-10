//Create Array of potential words to use, eventually I will input a .txt file with more words
//However that seems to require Node.js to work well so I will do that in the future.
let wordArray = [
    "which", "there", "their", "about", "would", "these", "other",
    "words", "could", "write", "first", "water", "after", "where", "right",
    "think", "three", "years", "place", "sound", "great", "again", "still",
    "every", "small", "found", "those", "never", "under", "might", "while",
    "house", "world", "below", "asked", "going", "large", "until", "along",
    "shall", "being", "often", "earth", "began", "since", "study", "night",
    "light", "above", "paper", "parts", "young", "story", "point", "times",
    "heard", "whole", "white", "given", "means", "music", "miles", "thing",
    "today", "later", "using", "money", "lines", "order", "group", "among",
    "learn", "known", "space", "table", "early", "trees", "short", "hands",
    "state", "black", "shown", "stood", "front", "voice", "kinds", "makes",
    "comes", "close", "power", "lived", "vowel", "taken", "built", "heart",
    "ready", "quite", "class", "bring", "round"
]

//let wordGuess = [];

// function checkAnswer(userGuess) {
//     console.log("I made it to outer check answer with the user guess: ", userGuess)

// }

class Game {
    word;
    wordGuess = [];
    wordCount;
    numGuesses;

    constructor() {
        //Generate a new word
        this.generateWord();
        //Generate the table
        this.freshTable();
        //Add Event Listeners for table
        this.addEventListeners();
        //Set counter for number of words solved this run
        this.wordCount = 0;
        let wordsSolved = document.querySelector('#wordsSolved')
        wordsSolved.innerText = this.wordCount;

        //Disabling cells we don't need
        // let inputField = document.getElementById('first');
        // inputField.setAttribute('disabled', 'disabled');

        //Set numGuesses for this word
        this.numGuesses = 0;

        const playerNameEl = document.querySelector('.player-username');
        playerNameEl.textContent = this.getPlayerName();
    }

    generateWord() {
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        console.log("The index I am accessing is " + randomIndex);
        this.word = wordArray[randomIndex];
        console.log("Your current word is " + this.word);
    }

    checkAnswer(inputGuess) {
        //Increment numGuesses
        this.numGuesses++;
        //Seperate correct word into array of chars
        let corrWord = this.word.split('');
        let letterPos = 0;
        let numCorrectLetters = 0;
        //Create array out of userInput
        self.wordGuess = Array.from(inputGuess)
                                         .map(input => input.value)

        //Iterate over each letter of user input
        self.wordGuess.forEach((letter) => {
            let colorFlag = 0;
            console.log("Letter: ", letter);
            //Compare it to each letter of the correct word
            corrWord.forEach((corrLetter) => {
                if (letter == corrLetter && letterPos == this.word.indexOf(corrLetter)) { //GREEN
                    colorFlag = 2;
                } else if (letter == corrLetter && colorFlag < 1) { //YELLOW
                    colorFlag = 1;
                }
            })

            if (colorFlag == 2) {
                console.log(letter, " should be GREEN");
                numCorrectLetters++;
            } else if (colorFlag == 1) {
                console.log(letter, " should be YELLOW");
            } else {
                console.log(letter, " should be GREY");
            }
            letterPos++;
        })

        //Print out information
        if (numCorrectLetters == 5) {
            console.log("CORRECT ANSWER");
        }
        console.log("Made it to inner checkAnswer with input: ", wordGuess);
        console.log("The correct answer is: ", corrWord);
        this.clearAnswer();

        //Call Functions to set board up properly
        if (numCorrectLetters == 5) { //Correct Guess
            this.correctGuess();
        } else if(this.numGuesses == 6) { //Final guess
            this.loseGame();
        } else { //Move on to the next guess
            this.nextGuess();
        }
    }

    clearAnswer() {
        //Clear userGuess after it is used so that a fresh guess can be made
        self.wordGuess = [];
        console.log("userGuess erased, it is now: ", this.wordGuess);
    }

    freshTable() {
        let tbody = document.querySelector("#game-table tbody");

        //Define Each row of table
        let rowData = [
            { id: "answer1", classes: "answer1 curr-answer", cells: [
                {type: "text", maxlength: "1", size: "1"},
                {type: "text", maxlength: "1", size: "1"},
                {type: "text", maxlength: "1", size: "1"},
                {type: "text", maxlength: "1", size: "1"},
                {type: "text", maxlength: "1", size: "1"}

            ]},
            { id: "answer2", classes: "answer2", cells: [
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

            ]},
            { id: "answer3", classes: "answer3", cells: [
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

            ]},
            { id: "answer4", classes: "answer4", cells: [
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

            ]},
            { id: "answer5", classes: "answer5", cells: [
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

            ]},
            { id: "answer6", classes: "answer6", cells: [
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

            ]}
        ];

        //Actually create the table
        rowData.forEach(function(rowDataItem) {
            //Create the row
            let row = document.createElement("tr");
            row.id = rowDataItem.id;
            row.className = rowDataItem.classes;

            //Create the cells
            rowDataItem.cells.forEach(function(cellData) {
                let cell = document.createElement("td");
                let input = document.createElement("input");
                input.type = cellData.type;
                input.maxLength = cellData.maxlength;
                input.size = cellData.size;
                input.disabled = cellData.disabled;
                cell.appendChild(input);
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });
    }

    addEventListeners() {
        //Make it so that the cursor flows between the different cells
        let cells = document.querySelectorAll("table input");

        cells.forEach((letter, index) => {
            //Make it so that they are waiting for user input
            letter.addEventListener("keydown", (event) => {
                //Only permits letters or backspace or enter
                if ((event.keyCode >=65 && event.keyCode <=90) || event.keyCode == 8 || event.keyCode == 13) {
                    if((((index + 1) % 5) > 0) && event.keyCode !== 8 && letter.value !== "") { //Move forward if there is another cell to go
                        cells[index + 1].focus();
                    } else if ((((index) % 5) != 0) && event.keyCode === 8 && letter.value === "") { //Move backwards if there are any cells
                        cells[index - 1].focus();
                    } else if ((((index + 1) % 5) == 0) && event.keyCode == 13 && letter.value !== "") { //User is submitting a guess
                        //Concatenate all cells into array wordGuess and sends it to checkAnswer()
                        let userGuess = document.querySelectorAll(".curr-answer input");
                        
                        this.checkAnswer(userGuess);
                    }
                }
            });
        });
    }

    refreshTable() {
        // Delete current table
        let table = document.getElementById("game-table");
        let tbody = table.querySelector("tbody");
        if (tbody) {
            table.removeChild(tbody);
        }

        // Recreate table
        let newTbody = document.createElement("tbody");
        table.appendChild(newTbody);
        this.freshTable();
        this.addEventListeners();
        }

    correctGuess() {
        //Increase Score

        //Reset Table
        this.refreshTable();
        //Generate New Word
        this.generateWord();

        //Increase Wordcount
        this.wordCount++;        
        wordsSolved.innerText = this.wordCount;

        //Reset numGuesses
        this.numGuesses = 0;
    }

    loseGame() {
        console.log("You have lost the game");
    }

    nextGuess() {
        console.log("Set up next guess");
    }

    resetGame() {
        //New Word
        this.generateWord();
        //Clear Table
        this.refreshTable();
        //Reset Score

        //Restart Word Count
        this.wordCount = 0;
        wordsSolved.innerText = this.wordCount;

        //Reset numGuesses
        this.numGuesses = 0;
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Player Unknown';
    }

}


const game = new Game();
