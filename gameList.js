/**
 * Saved list of games and methods for editing the list.
 */
class gameList {
    constructor() {
        this.savedList = [];
        let jsonList = localStorage.getItem("gameList");
        if(jsonList !== "null"){
            let parsedList = JSON.parse(jsonList);
            this.savedList = parsedList;
        }
    }

    clearGameList() {
        this.gameList = [];
        localStorage.setItem("gameList", null);
    }
}