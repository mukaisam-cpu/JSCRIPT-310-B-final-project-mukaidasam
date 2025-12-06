describe("Saved Games List", () => {
    it("Should instantiate with an empty list if there is nothing saved in local storage", 
        () => {
            localStorage.setItem("gameList", null);
            let testGameList = new gameList();
            expect(testGameList.savedList).toEqual([]);
        }
    );

    it("Should automatically load the list from storage if one is present", () => {

    });

    it("Should delete both the list and clear the saved data in local storage", () => {

    });
});