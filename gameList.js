/**
 * Saved list of games and methods for editing the list.
 * 
 * @var savedList: Array of game IDs. Instantiated based on contents of local storage item
 * "gameList". Is a list of RetroAchievements game IDs saved as strings. Save to local
 * storage "gameList" as a stringified JSON.
 */
class gameList {
    constructor() {
        // debugger;
        this.savedList = [];
        let jsonList = localStorage.getItem("gameList");
        if(jsonList !== "null"){
            let parsedList = JSON.parse(jsonList);
            this.savedList = parsedList;
        };
    };

    /**
     * Clear game list and delete localStorage "gameList".
     */
    clearGameList() {
        this.savedList = [];
        localStorage.setItem("gameList", null);
    };

    /**
     * Add RetroAchievements game ID to list and save list in local storage.
     * @param {string} gameID 
     */
    addToList(gameID) {
        this.savedList.push(gameID);
        localStorage.setItem("gameList", JSON.stringify(this.savedList));
    };
}