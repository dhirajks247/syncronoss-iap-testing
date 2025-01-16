class IOSPage {
    get testerBtn() {
        return $('~Tester');
    }

    get subscriptionsButton() {
        return $('~Subscriptions');
    }

    get monthlyTab() {
        return $('~Monthly');
    }

    get yearlyTab() {
        return $('~Yearly');
    }

    get continueBtn() {
        return $('~Continue');
    }

    get currentSubscription() {
        return $('~Current Subscription');
    }

    get firstPlanFromTab() {
        return $('-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther');
    }

    get continueBtn() {
        return $('~Continue');
    }




    async selectPlan() {
        await this.testerBtn.click();
        await this.subscriptionsButton.click();

        await driver.pause(3000);
        
        await this.monthlyTab.click();
        if (await this.currentSubscription.isDisplayed()) {
            await this.yearlyTab.click();
            await this.firstPlanFromTab.click();
        } else {
            await this.firstPlanFromTab.click();
        }
        await this.continueBtn.click();

        await driver.pause(3000);



        
    }

    
    
    
    
    
}

export default new IOSPage();
