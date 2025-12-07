const consoleSearchForm = document.getElementById("console-search");
const gameSearchForm = document.getElementById("game-search");

const consoleList = document.getElementById("console-list");
const gameList = document.getElementById("game-list");

const TEST_GAME_ID = "6135"
const TEST_SYSTEM_ID = "41"

const createGameCard = (gameID) => {
    // First, get game data
    const api = new RA_API();
}

const api = new RA_API();
api.getGamesForSystem(TEST_SYSTEM_ID);
createGameCard(TEST_GAME_ID);