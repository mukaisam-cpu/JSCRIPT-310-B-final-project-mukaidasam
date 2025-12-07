const RA_WEBSITE = "https://retroachievements.org"
/**
 * Functions for RetroAchievements API calls
 * @param {number} delay Delay 
 */
class RA_API {
    constructor(delay) {
        this.delay = delay;
    }

    /**
     * A call to this endpoint will retrieve the complete list of all system ID and name 
     * pairs on the site.
     * 
     * Returning only active systems with achievements and excluding hubs. Query parameters
     * 'a' and 'g' are set to 1.
     * */
    async getAllSystems() {
        const url = `${RA_WEBSITE}/API/API_GetConsoleIDs.php?&y=${API_KEY}&a=1&g=1`
        return(fetch(url)
            .then(response => response.json())
            .then(obj => {
                let systemList = [];
                for(let i = 0; i < obj.length; i++) {
                    const system = new System(obj[i].ID, obj[i].Name, obj[i].IconURL);
                    systemList.push(system);
                }
                return(systemList);
            }));
    }

    /**
     * A call to this endpoint will retrieve the complete list of games for a specified 
     * console on the site, targeted by the console ID. If you do not know the console ID 
     * you're looking for, try using the all systems endpoint.
     * 
     * Returning only games with achievements. Query parameter 'f' is set to 1.
     * @param {string} systemID 
     */
    async getGamesForSystem(systemID) {
        const url = `${RA_WEBSITE}/API/API_GetGameList.php?&y=${API_KEY}&i=${systemID}&f=1`
        return(fetch(url)
            .then(response => response.json())
            .then(obj => {
                let gameList = [];
                for(let i = 0; i < obj.length; i++) {
                    const game = new Game(obj[i].ID, obj[i].Title, obj[i].ConsoleID, obj[i].ConsoleName,
                        obj[i].ImageIcon, obj[i].NumAchievements, obj[i].NumLeaderboards, obj[i].Points)
                    gameList.push(game);
                }
                return(gameList);
            })
        );
    }

}