const systemSelectForm = document.getElementById("select-system");
const gameSearchForm = document.getElementById("game-search");

const consoleList = document.getElementById("console-list");
const gameList = document.getElementById("game-list");

const TEST_GAME_ID = "6135"
const TEST_SYSTEM_ID = "41"

const createGameCard = (api, gameID) => {
    // First, get game data
}

const populateSystemSelect = (api) => {
    api.getAllSystems()
        .then(systems => {
            console.log(systems);
            for(let i = 0; i < systems.length; i++) {
                const selectEl = document.createElement("option");
                selectEl.setAttribute("value", i);
                selectEl.innerText = systems[i].name;
                systemSelectForm.appendChild(selectEl);
            }
            console.log(systemSelectForm);
        })
}

const api = new RA_API();
populateSystemSelect(api);