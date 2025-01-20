import IOSPage from "../../pageobjects/ios/ios.page";
import dotenv from 'dotenv';

dotenv.config();

describe("iOS Subscription Tests", () => {
    const TEST_PASSWORD = process.env.IOS_TEST_PASSWORD;

    it("should complete subscription flow successfully", async () => {
        await IOSPage.completeSubscriptionFlow(TEST_PASSWORD);
    });
});