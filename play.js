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
    //time;

    constructor() {
        //Generate a new word
        this.generateWord();
        console.log("Your current word is " + this.word);
        //Start timer

        const playerNameEl = document.querySelector('.player-username');
        playerNameEl.textContent = this.getPlayerName();
    }

    generateWord() {
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        console.log("The index I am accessing is " + randomIndex);
        this.word = wordArray[randomIndex];
        console.log("Your current word is " + this.word);
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Player Unknown';
    }

}


const game = new Game();