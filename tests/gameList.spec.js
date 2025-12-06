describe("Saved Games List", () => {
    it("Should instantiate with an empty list if there is nothing saved in local storage", 
        () => {
            localStorage.setItem("gameList", null);
            let testGameList = new gameList();
            expect(testGameList.savedList).toEqual([]);
        }
    );

    it("Should automatically load the list from storage if one is present", () => {
        const testList = ["2983", "3224", "14475"]
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new gameList();
        console.log(testGameList.savedList);
        expect(testGameList.savedList).toEqual(testList);
    });

    it("Should delete both the list and clear the saved data in local storage", () => {
        const testList = ["2983", "3224", "14475"]
        localStorage.setItem("gameList", JSON.stringify(testList));
        let testGameList = new gameList();
        testGameList.clearGameList();
        expect(testGameList.savedList).toEqual([]);
        expect(localStorage.getItem("gameList")).toEqual("null");
    });
});