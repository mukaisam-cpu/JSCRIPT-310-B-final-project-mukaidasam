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

    it("Should remove a game ID from the list and update local storage accordingly", () => {
        const testList = ["2983", "3224", "14475"];
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new GameList();
        testGameList.removeFromList("3224");

        const expectedList = ["2983", "14475"];
        expect(testGameList.savedList).toEqual(expectedList);
        expect(JSON.parse(localStorage.getItem("gameList"))).toEqual(expectedList);
    })
});