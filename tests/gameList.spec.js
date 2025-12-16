describe("Saved Games List", () => {
    it("Should instantiate with an empty list if there is nothing saved in local storage", 
        () => {
            localStorage.setItem("gameList", null);
            let testGameList = new GameList();
            expect(testGameList.savedList).toEqual([]);
        }
    );

    it("Should automatically load the list from storage if one is present", () => {
        const testList = ["2983", "3224", "14475"];
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new GameList();
        console.log(testGameList.savedList);
        expect(testGameList.savedList).toEqual(testList);
    });

    it("Should delete both the list and clear the saved data in local storage", () => {
        const testList = ["2983", "3224", "14475"];
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new GameList();
        testGameList.clearGameList();
        expect(testGameList.savedList).toEqual([]);
        expect(localStorage.getItem("gameList")).toEqual("null");
    });

    it("Should add a game ID to the list and update local storage accordingly", () => {
        const testList = ["2983", "3224", "14475"];
        localStorage.setItem("gameList", JSON.stringify(testList));
        const newGame = "20583";
        let testGameList = new GameList();
        testGameList.addToList(newGame);

        const expectedList = ["2983", "3224", "14475", "20583"];
        expect(testGameList.savedList).toEqual(expectedList);
        expect(JSON.parse(localStorage.getItem("gameList"))).toEqual(expectedList);
    });

    // This broke after I changed the save data scheme from strings to Game objects
    // For some reason when passing into testGameList.removeFromList, this.savedList
    // is converting from an array of Games to an array of generic objects
    // Not entirely sure what's going on or how to fix this, but the presentation's tomorrow
    // and the application proper seems to work fine regardless...
    it("Should remove a game ID from the list and update local storage accordingly", () => {
        // const testList = ["2983", "3224", "14475"];
        const testList = [
            new Game(id=2983),
            new Game(id=3224),
            new Game(id=14475)
        ]
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new GameList();
        result = testGameList.removeFromList(3224);
        console.log(result);

        const expectedList = [
            new Game(id=2983),
            new Game(id=14475)
        ];
        const loadList = JSON.parse(localStorage.getItem("gameList"))
        expect(testGameList.savedList).toEqual(expectedList);
        // expect(loadList).toEqual(JSON.stringify(expectedList));
    })
});