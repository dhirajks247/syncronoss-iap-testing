import { Key } from 'webdriverio';

class IOSPage {
    // Elements
    get testerBtn() { return $('~Tester'); }
    get subscriptionsButton() { return $('~Subscribe to Premium'); }
    get monthlyTab() { return $('~Monthly'); }
    get yearlyTab() { return $('~Yearly'); }
    get continueBtn() { return $('~Continue'); }
    
    get selectedIndicator() {
        return $('-ios class chain:**/XCUIElementTypeImage[`name == "Selected"`]');
    }
    

    get firstUnselectedPlan() {
        return $("(//XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeStaticText[not(.//XCUIElementTypeImage[@name='Selected'])])[1]");
    }
    
    

    // Actions
    async navigateToSubscriptions() {
        await this.testerBtn.click();
        await this.subscriptionsButton.click();
    }

    async selectFirstUnselectedPlan() {
        if (await this.firstUnselectedPlan.isExisting()) {
            await this.firstUnselectedPlan.click();
        } else {
            console.error('No unselected plan found');
        }

    }

    async selectSubscriptionType() {
        await this.monthlyTab.click();
        if (await this.selectedIndicator.isExisting()) {
            await this.yearlyTab.click();
        }
        await this.selectFirstUnselectedPlan();
        
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
        await this.continueBtn.waitForEnabled({
            timeout: 10000,
            timeoutMsg: 'Continue button not enabled within ' + 10000 + 'ms'
        });
        await this.continueBtn.click();
        await driver.pause(7000);
        await this.tapAtRelativePosition(0.5, 0.9);
        
        await this.enterPassword(password);
        await driver.pause(5000);
    }
}

export default new IOSPage();
