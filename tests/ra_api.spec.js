describe("RetroAchievements API", () =>{
    it("Should get all active non-hub systems", async () => {
        api = new RA_API();
        const result = await api.getAllSystems();
        console.log(result);
        expect(result).toEqual(jasmine.anything());
        expect(result.length).toEqual(53);
    });

    it("Should return all games with achievement sets for the specified system ID", 
        async () => {
            api = new RA_API();
            testID = "41";
            const result = await api.getGamesForSystem(testID);
            console.log(result);

            const testGame = null;
    });
})