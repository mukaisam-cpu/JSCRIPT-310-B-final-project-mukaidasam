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

clearGameList();
console.log(gameList);

// const TEST_LIST = ["id1", "id2", "id3"];
// localStorage.setItem("gameList", JSON.stringify(TEST_LIST));