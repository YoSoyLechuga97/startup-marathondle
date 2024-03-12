function Scoreboard() {
    //Customize Board Labels
    const playerNameEl = document.querySelector('.player-username');
    const playerName = localStorage.getItem('userName') ?? 'Unkown Player';
    playerNameEl.textContent = playerName;

    //Obtain score JSON
    let personalScores = [];
    const scoresText = localStorage.getItem('playerScores');
    if (scoresText) {
        personalScores = JSON.parse(scoresText);
    }
    //Create player's personal scores table
    const playerBodyEl = document.querySelector('#personal-scores');

    if (personalScores.length) {
        //Iterate over each row
        for (const [i, score] of personalScores.entries()) {
            //Create all table data elements
            const placeTdEl = document.createElement('td');
            const nameTdEl = document.createElement('td');
            const scoreTdEl = document.createElement('td');

            //Set place equal to the row index + 1
            placeTdEl.textContent = i + 1;
            //Set name equal to player's name
            nameTdEl.textContent = score.name;
            //Set score equal to player score
            scoreTdEl.textContent = score.score;

            //Create a row element to place all td's into
            const currRowEl = document.createElement('tr');
            //Add all td's to element
            currRowEl.appendChild(placeTdEl);
            currRowEl.appendChild(nameTdEl);
            currRowEl.appendChild(scoreTdEl);

            //Add finished row to the actual table
            playerBodyEl.appendChild(currRowEl);
        }
    } else { //If cannot find any scores
        playerBodyEl.innerHTML = '<tr><td colSpan=3>No scores yet!</tr>';
    }
}

Scoreboard();

//personal-scores
//friend-scores
//world-scores