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
        }
    }

    clearGameList() {
        this.savedList = [];
        localStorage.setItem("gameList", null);
    }
}