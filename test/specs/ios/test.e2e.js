import IOSPage from "../../pageobjects/ios/ios.page";

describe("IOS Test", () => {
    it("should subscribe", async () => {
        await IOSPage.selectPlan();
    });
});