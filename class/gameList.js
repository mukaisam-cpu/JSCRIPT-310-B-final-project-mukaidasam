/**
 * Saved list of games and methods for editing the list.
 * 
 * @var savedList: Array of Game class objects. Instantiated based on contents of local storage item
 * "gameList". Save to local storage "gameList" as a stringified JSON.
 */
class GameList {
    constructor() {
        // debugger;
        this.savedList = [];
        let jsonList = localStorage.getItem("gameList");
        if(jsonList !== "null"){
            let parsedList = JSON.parse(jsonList);
            this.savedList = parsedList;
        };
        console.log(this.savedList);
    };

    /**
     * Clear game list and delete localStorage "gameList".
     */
    clearGameList() {
        this.savedList = [];
        localStorage.setItem("gameList", null);
    };

    /**
     * Add RetroAchievements game obj to list and save list in local storage.
     * @param {Game} game
     */
    addToList(game) {
        this.savedList.push(game);
        localStorage.setItem("gameList", JSON.stringify(this.savedList));
    };

    /**
     * Remove game obj from list and update list in local storage.
     * @param {number} gameID
     * @returns {boolean} Return true if ID successfully deletes, false if the ID was not
     * found in the list.
     */
    removeFromList(gameID) {
        const newList = this.savedList.filter(game => game.id !== gameID);
        // If ID is not found, index will be -1
        // debugger;
        if(newList !== this.savedList) {
            localStorage.setItem("gameList", JSON.stringify(newList));
            this.savedList = newList;
        } else {
            console.log(`WARNING: Trying to delete ${gameID} from saved list,
                game ID not found`);
        }
        console.log(this.savedList);
    }
    
    /** Do an API lookup on all saved games, and return a list of Game objects */
    getGameList() {

    }
}