let gameList = (() => {
    jsonList = localStorage.getItem("gameList");
    if(jsonList === null){
        return [];
    }
    parsedList = JSON.parse(jsonList);
    return parsedList;
})();

const clearGameList = () => {
    gameList = [];
    localStorage.setItem("gameList", null);
}