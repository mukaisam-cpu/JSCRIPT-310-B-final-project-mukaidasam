const systemSelectForm = document.getElementById("select-system");
const gameSearchForm = document.getElementById("search-game");
const searchField = document.getElementById("search-game-field");
const searchButton = document.getElementById("search-button");

const selectSystem = document.getElementById("select-system");
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
    saveButton.value = game.id;
    saveButton.innerText = "Add To Game List";
    saveButton.addEventListener('click', saveGameToList);
    cardBody.appendChild(saveButton);
    row.appendChild(textCol);

    cardBase.appendChild(row);
    gameListEl.appendChild(cardBase);
}

const saveGameToList = function(e) {
    console.log(this);
    // this.classList.toggle("btn-primary");
    // this.classList.toggle("btn-danger");
}

/** Populate games list when selecting a system */
selectSystem.addEventListener("change", (e) => {
    console.log("changed", e.target.value);
    gameListEl.innerHTML = "";
    api.getGamesForSystem(e.target.value)
    .then(games => {
        for(let i = 0; i < games.length; i++){
            createGameCard(games[i]);
        };
    });
});

/** Search, filter game list, and populate page */
gameSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(searchField.value);
    console.log(selectSystem.value);
    const systemID = selectSystem.value;
    if(systemID > 0){
        api.getGamesForSystem(systemID)
        .then(games => {
            const filteredList = games.filter((game) =>
            game.title.toUpperCase().includes(searchField.value.toUpperCase()));
            gameListEl.innerHTML = "";
            for(let i = 0; i < filteredList.length; i++){
                createGameCard(filteredList[i]);
            }
        })
    }
});

const api = new RA_API();
const savedGames = new GameList();
populateSystemSelect(api);
