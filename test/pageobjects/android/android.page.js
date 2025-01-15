class AndroidPage {
    get subscribeButton() {
        return $('android=new UiSelector().text("Subscribe Now")');
    }

    get unselectedPlanIndicator() {
        return $('android=new UiSelector().description("Unselected Plan Indicator")');
    }

    get weeklyPlan() {
        return $('android=new UiSelector().text("Weekly")');
    }

    get yearlyPlan() {
        return $('android=new UiSelector().text("Yearly")');
    }

    get selectedPlanIndicator() {
        return $('android=new UiSelector().text("Selected Plan Indicator")');
    }

    get continueBtn() {
        return $('android=new UiSelector().text("Continue")');
    }

    get planName() {
        return $('android=new UiSelector().text("Yearly 999")');
    }

    get playSubBtn() {
        return $('android=new UiSelector().text("Subscribe")');
    }

    get currentSubscription() {
        return $('android=new UiSelector().text("Current Subscription")');
    }

    get subscriptionPrice() {
        return $('android=new UiSelector().text("$99.9")');
    }

    // Locate the Current Subscription TextView and its following sibling, Subscription Price TextView
    get currentSubscriptionAndPrice() {
        return $(
            'android=new UiSelector().text("Current Subscription")' +
            '/following-sibling::android.widget.TextView[@text="$99.9"]'
        );
    }

    get profileIcon() {
        return $('//android.widget.ImageView[@resource-id="com.android.vending:id/0_resource_name_obfuscated"]');
    }

    get subscriptionMenu() {
        return $('//android.widget.TextView[@resource-id="com.android.vending:id/0_resource_name_obfuscated" and @text="Payments and subscriptions"]');
    }

    get viewSubscriptions() {
        return $('//android.widget.TextView[@resource-id="com.android.vending:id/0_resource_name_obfuscated" and @text="Subscriptions"]');
    }

    get noActiveSubscriptionsText() {
        return $('android=new UiSelector().text("You don\'t have any active subscriptions")');
    }

    get firstSubscriptionFromList() {
        return $$('android.widget.TextView')[3];
    }




    async selectPlan() {
        await this.subscribeButton.click();
        await this.yearlyPlan.isDisplayed()       
        await this.yearlyPlan.click();

        if (await this.unselectedPlanIndicator.isDisplayed()) {
            await this.unselectedPlanIndicator.click();
        } else {
            await this.weeklyPlan.click();
            await this.unselectedPlanIndicator.click();
        }

        await this.continueBtn.click();
        // await this.planName.waitForDisplayed();
        // await expect(this.planName).toBeDisplayed();
        await this.playSubBtn.click();
        await this.currentSubscription.waitForDisplayed();
        await expect(this.currentSubscription).toBeDisplayed();

        // Ensure that the current subscription and price are displayed together
        // await this.subscriptionPrice.waitForDisplayed();
        // await expect(this.subscriptionPrice).toBeDisplayed();
        // await expect(this.selectedPlanIndicator).toBeDisplayed();

        // Verify if the current subscription and price pair are shown correctly
        // await expect(this.currentSubscriptionAndPrice).toBeDisplayed();
    }



    async playStoreActivity() {
        // Launch the Play Store app with the correct parameters
        await driver.startActivity(
            'com.android.vending',                // appPackage
            'com.google.android.finsky.activities.MainActivity' // appActivity
        );
    
        // Wait for the Play Store app to load
        await this.profileIcon.waitForDisplayed();
        await expect(this.profileIcon).toBeDisplayed();
    
        // Tap on the profile icon
        await this.profileIcon.click();
    
        // Tap on the Payments & subscriptions menu
        await this.subscriptionMenu.click();
    
        // Tap on the Subscriptions menu
        await this.viewSubscriptions.click();
    
        // Verify that the "You don't have any active subscriptions" text is not displayed
        await expect(this.noActiveSubscriptionsText).not.toBeDisplayed();


        // Wait for 3 seconds
        await driver.pause(3000);
        
        const ActivePlan = await this.firstSubscriptionFromList.getText();
        console.log('Active Plan: ', ActivePlan);

        
    }
    
    
    
    
}

export default new AndroidPage();
