const systemSelectForm = document.getElementById("select-system");
const gameSearchForm = document.getElementById("game-search");

const consoleList = document.getElementById("console-list");
const gameListEl = document.getElementById("game-list");

const TEST_GAME_ID = "6135"
const TEST_SYSTEM_ID = "41"

/**
 * Populate select element with all current systems and their corresponding IDs.
 * @param {RA_API} api 
 */
const populateSystemSelect = (api) => {
    api.getAllSystems()
        .then(systems => {
            console.log(systems);
            for(let i = 0; i < systems.length; i++) {
                const selectEl = document.createElement("option");
                selectEl.setAttribute("value", systems[i].id);
                selectEl.innerText = systems[i].name;
                systemSelectForm.appendChild(selectEl);
            };
            console.log(systemSelectForm);
        });
};

/**
 * @param {RA_API} api 
 * @param {Game} game 
 */
const createGameCard = (game) => {
    console.log(game);
    const cardBase = document.createElement("div");
    cardBase.setAttribute("class", "card mb-3");
    const row = document.createElement("div");
    row.setAttribute("class", "row g-0");

    const imgCol = document.createElement("div");
    imgCol.setAttribute("class", "col-md-2")
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", game.imageIcon);
    imgEl.setAttribute("class", "img-fluid rounded-start");
    imgCol.appendChild(imgEl);
    row.appendChild(imgCol);

    const textCol = document.createElement("div");
    textCol.setAttribute("class", "col");
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    textCol.appendChild(cardBody);
    const cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.innerText = game.title;
    cardBody.appendChild(cardTitle);
    const pageButton = document.createElement("a");
    pageButton.setAttribute("class", "btn btn-primary");
    pageButton.setAttribute("href", `https://retroachievements.org/game/${game.id}`);
    pageButton.setAttribute("role", "button");
    pageButton.setAttribute("target", "_blank");
    pageButton.innerText = "Visit Game Page";
    cardBody.appendChild(pageButton);
    const saveButton = document.createElement("button");
    saveButton.setAttribute("class", "btn btn-primary");
    saveButton.setAttribute("type", "button")
    // TODO: Attach save function to button
    saveButton.innerText = "Add To Game List";
    cardBody.appendChild(saveButton);
    row.appendChild(textCol);

    cardBase.appendChild(row);
    gameListEl.appendChild(cardBase);
    console.log(cardBase);
}

const api = new RA_API();
populateSystemSelect(api);
api.getGamesForSystem(1)
    .then(games => {
        createGameCard(games[0]);
    })