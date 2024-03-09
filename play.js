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

class Game {
    word;
    wordCount;
    numGuesses;

    constructor() {
        //Generate a new word
        this.generateWord();
        //Generate the table
        this.freshTable();
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

    freshTable() {
        let tbody = document.querySelector("#game-table tbody");

        //Define Each row of table
        let rowData = [
            { id: "answer1", classes: "answer1 curr-answer", cells: [
                {type: "text", maxlength: "1", size: "1"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"},
                {type: "text", maxlength: "1", size: "1", disabled: "true"}

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
