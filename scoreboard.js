class Scoreboard {
    
    constructor() {
        const playerNameEl = document.querySelector('.player-username');
        playerNameEl.textContent = this.getPlayerName();

    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Unkown Player';
    }
}

const scoreboard = new Scoreboard();