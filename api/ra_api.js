class RA_API {
    /**
     * A call to this endpoint will retrieve the complete list of all system ID and name 
     * pairs on the site. 
     * */
    async getAllSystems() {
        const url = `https://retroachievements.org/API/API_GetConsoleIDs.php?&y=${API_KEY}&a=1&g=1`
        return(fetch(url)
            .then(response => response.json()));
    }
}