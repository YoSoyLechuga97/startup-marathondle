function Scoreboard() {
    //Customize Board Labels
    const playerNameEl = document.querySelector('.player-username');
    const playerName = localStorage.getItem('userName') ?? 'Unkown Player';
    playerNameEl.textContent = playerName;

    //Obtain score JSON
    let personalScores = [];
    const scoresText = localStorage.getItem('personalScores');
    if (scoresText) {
        scores = JSON.parse(scoresText);
    }

}

Scoreboard();

//personal-scores
//friend-scores
//world-scores