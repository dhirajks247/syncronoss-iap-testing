import AndroidPage from "../../pageobjects/android/android.page";

describe("Android Test", () => {
    it("should subscribe", async () => {
        await AndroidPage.selectPlan();
        await AndroidPage.playStoreActivity();
    });
});