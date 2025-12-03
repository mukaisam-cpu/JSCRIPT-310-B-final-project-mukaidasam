describe("RetroAchievements API", () =>{
    it("should get all active non-hub systems", async () => {
        api = new RA_API();
        const result = await api.getAllSystems();
        console.log(result);
        expect(result).toEqual(jasmine.anything());
        expect(result.length).toEqual(53);
    })
})