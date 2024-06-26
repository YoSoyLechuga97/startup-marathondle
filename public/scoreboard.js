async function Scoreboard() {
    //Customize Board Labels
    const playerNameEl = document.querySelector('.player-username');
    const playerName = localStorage.getItem('userName') ?? 'Unkown Player';
    playerNameEl.textContent = playerName;

    //Obtain personal score JSON
    let personalScores = [];
    console.log("Oh hey there :)");
    const urlPlayerName = encodeURIComponent(playerName);
    try {
        //Get the scores from service
        const response = await fetch(`/api/personalScores?playerTag=${urlPlayerName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        personalScores = await response.json();

        //Save them locally now that we've got them (just in case)
        localStorage.setItem('playerScores', JSON.stringify(personalScores));
    } catch {
        //If there was a problem getting them from the server
        console.log("I had to get them locally...");
        const scoresText = localStorage.getItem('playerScores');
        if (scoresText) {
            personalScores = JSON.parse(scoresText);
        }
    }

    //Obtain Global scores JSON
    let globalScores = [];
    console.log("Oh hey there :)");
    try {
        //Get the scores from service
        const response = await fetch('/api/scores');
        globalScores = await response.json();

        //Save them locally now that we've got them (just in case)
        localStorage.setItem('globalScores', JSON.stringify(globalScores));
    } catch {
        //If there was a problem getting them from the server
        console.log("I had to get them locally...");
        const scoresText = localStorage.getItem('globalScores');
        if (scoresText) {
            globalScores = JSON.parse(scoresText);
        }
    }

    
    //Create player's personal scores table
    const playerBodyEl = document.querySelector('#personal-scores');
    makeTable(playerBodyEl, personalScores);

    //Create global score table
    const globalBodyEl = document.querySelector('#world-scores');
    makeTable(globalBodyEl, globalScores);

    // const friendBodyEl = document.querySelector('#friend-scores');

    configureWebSocket();
    // //Create news event websocket place
    // setInterval(() => {
    //     addNewEvent(`Milo`, 255);
    //   }, 5000);


}

function makeTable (bodyEl, scoreArray) {
    if (scoreArray.length) {
        //Iterate over each row
        for (const [i, score] of scoreArray.entries()) {
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
            bodyEl.appendChild(currRowEl);
        }
    } else { //If cannot find any scores
        bodyEl.innerHTML = '<tr><td colSpan=3>No scores yet!</tr>';
    }
}

function addNewEvent(eventName, eventScore) {
    const eventTable = document.getElementById("friendHighScores").getElementsByTagName("tbody")[0];

    let newRow = eventTable.insertRow(0);
    let newCell = newRow.insertCell(0);

    newCell.textContent = `${eventName} just scored ${eventScore}!`;

    if (eventTable.rows.length > 5) {
        eventTable.deleteRow(5);
    }
}

//Functionality for global communication using WebSocket
async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        addNewEvent(msg.from, msg.value);
    };
}

Scoreboard();

//personal-scores
//friend-scores
//world-scores