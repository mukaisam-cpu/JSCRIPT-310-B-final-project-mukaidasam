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
        const url = `https://retroachievements.org/API/API_GetConsoleIDs.php?&y=${API_KEY}&a=1&g=1`
        return(fetch(url)
            .then(response => response.json()));
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
        const url = `https://retroachievements.org/API/API_GetGameList.php?&y=${API_KEY}&i=${systemID}&f=1`
        return(fetch(url)
            .then(response => response.json()));
    }
}