const systemSelectForm = document.getElementById("select-system");
const gameSearchForm = document.getElementById("search-game");
const searchField = document.getElementById("search-game-field");
const searchButton = document.getElementById("search-button");

const selectSystem = document.getElementById("select-system");
const gameListEl = document.getElementById("game-list");

const savedListButton = document.getElementById("saved-list-button");

/** Delay of API call in ms */
const API_DELAY = 200

const api = new RA_API();
let displayedGames = [];
const savedGames = new GameList();

let savedListDisplay = false;

/**
 * Populate select element with all current systems and their corresponding IDs.
 */
const populateSystemSelect = () => {
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
 * Create game card HTML object and add it to display.
 * @param {Game} game 
 */
const createGameCard = (game) => {
    // Check if game has been saved
    selGame = savedGames.savedList.filter((savedGame) => savedGame.id === game.id);

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
    if(selGame.length > 0){
        saveButton.setAttribute("class", "btn btn-danger");
        saveButton.innerText = "Remove From List";
    } else {
        saveButton.setAttribute("class", "btn btn-primary");
        saveButton.innerText = "Add To Game List";
    }
    saveButton.setAttribute("type", "button")
    saveButton.value = game.id;
    saveButton.addEventListener('click', saveGameToList);
    cardBody.appendChild(saveButton);
    row.appendChild(textCol);

    cardBase.appendChild(row);
    gameListEl.appendChild(cardBase);
}


const saveGameToList = function() {
    //Lesson of the day- arrow functions do *not* include a "this"
    //First, pick out game from displayed games list
    console.log(this.value);
    selGame = displayedGames.filter((game) => String(game.id) === this.value)[0];
    console.log(JSON.stringify(selGame));

    if(this.classList.contains("btn-primary")){
        // Add game to list
        this.innerText = "Remove From List";
        savedGames.addToList(selGame);
    } else {
        // Remove from list
        this.innerText = "Add To Game List"
        savedGames.removeFromList(selGame.id);
    }
    this.classList.toggle("btn-primary");
    this.classList.toggle("btn-danger");
}

/** Search, filter game list, and populate page */
const filterGames = function() {
    console.log(searchField.value);
    console.log(selectSystem.value);
    savedListDisplay = false;
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
            displayedGames = filteredList;
        })
    }
}

/** Display all saved games */
const displaySavedGames = function() {
    console.log(savedGames);
    for(let i = 0; i < savedGames.length; i++){
        createGameCard(savedGames[i]);
    }
}

/** Populate games list when selecting a system */
selectSystem.addEventListener("change", (e) => {
    console.log("changed", e.target.value);
    gameListEl.innerHTML = "";
    filterGames();
});

gameSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterGames();
});

/** Toggle display to show saved or searched games */
savedListButton.addEventListener("click", (e) => {
    gameListEl.innerHTML = "";
    console.log(savedListDisplay);
    if(savedListDisplay === false){
        displaySavedGames();
        savedListDisplay = true;
        savedListButton.innerText = "Return to Search";
    } else {
        // set savedListDisplay to false in filterGames() in case search is pressed in saved list
        filterGames();
        savedListButton.innerText = "Saved Games";
    }
});

populateSystemSelect(api);
