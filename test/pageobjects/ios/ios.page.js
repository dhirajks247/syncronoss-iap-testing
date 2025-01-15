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

    get unselectedPlanIndicator() {
        return $('~Unselected Plan Indicator');
    }

    get continueBtn() {
        return $('~Continue');
    }






   



    async selectPlan() {
        await this.testerBtn.click();
        await this.subscriptionsButton.click();

        browser.sleep(3000);
        
        await this.monthlyTab.click();
        await this.unselectedPlanIndicator.click();
        await this.continueBtn.click();

        browser.sleep(3000);

        
    }

    
    
    
    
    
}

export default new IOSPage();
