import { Key } from 'webdriverio';

class IOSPage {
    // Elements
    get testerBtn() { return $('~Tester'); }
    get subscriptionsButton() { return $('~Subscriptions'); }
    get monthlyTab() { return $('~Monthly'); }
    get yearlyTab() { return $('~Yearly'); }
    get continueBtn() { return $('~Continue'); }
    get currentSubscription() { return $('~Current Subscription'); }
    get firstPlanFromTab() {
        return $('-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther');
    }

    // Actions
    async navigateToSubscriptions() {
        await this.testerBtn.click();
        await this.subscriptionsButton.click();
    }

    async selectSubscriptionType() {
        await this.monthlyTab.click();
        if (await this.currentSubscription.isDisplayed()) {
            await this.yearlyTab.click();
            await this.firstPlanFromTab.click();
        } else {
            await this.firstPlanFromTab.click();
        }
    }

    async tapAtRelativePosition(xRatio, yRatio) {
        const windowSize = await driver.getWindowRect();
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(windowSize.width * xRatio), y: Math.round(windowSize.height * yRatio) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    async enterPassword(password) {
        await driver.keys(password);
        await driver.keys(Key.Return);
    }

    // Main flows
    async completeSubscriptionFlow(password) {
        await this.navigateToSubscriptions();
        await driver.pause(3000);
        
        await this.selectSubscriptionType();
        await this.continueBtn.click();
        
        await driver.pause(5000);
        await this.tapAtRelativePosition(0.5, 0.9);
        
        await this.enterPassword(password);
        await driver.pause(5000);
    }
}

export default new IOSPage();