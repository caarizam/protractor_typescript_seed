import { BasePage, identification } from './base.page';
import { browser } from 'protractor';
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const Locators = {
    
    siteLogo: {
        type: identification[identification.Css],
        value: "#logo_text > h1 > a > img"
    },
    welcomeLabel: {
        type: identification[identification.Css],
        value: "#user_information > span"
    },
    signedInLabel: {
        type: identification[identification.Css],
        value: "p.flash_notice"
    },
    createUserLink: {
        type: identification[identification.Css],
        value: "#content > p > a"
    },
    employeeInformationTab: {
        type: identification[identification.PartialText],
        value: "Employees Information"
    }

}

export class HomePage extends BasePage{

    welcomeElement = this.ElementLocator(Locators.welcomeLabel);
    createUserElement = this.ElementLocator(Locators.createUserLink);
    signedInElement = this.ElementLocator(Locators.signedInLabel);
    employeeInformationElement = this.ElementLocator(Locators.employeeInformationTab);
    logoElement = this.ElementLocator(Locators.siteLogo);

    /**
     * This method allows checking if the logo is displayed or not
     */
    async checkSiteLogo(){
        await this.waitUntilelementDisplayed(this.logoElement, BasePage.LONG_WAIT, "The site logo is not displayed")
        .then((resp) => {
            expect(resp, "The site logo is not displayed").to.equal(true);
        });
    }

    /**
     * This method redirects to the Home Page
     */
    async goToHomePage(){
        await this.waitUntilelementDisplayed(this.logoElement, BasePage.LONG_WAIT, "The site logo is not displayed")
        .then((resp) => {
            expect(resp, "The site logo is not displayed").to.equal(true);
            this.logoElement.click();
        });
    }

    /**
     * This method allows checking the welcome banner when the user is logged in
     */
    async checkWelcomePage(){
        await this.waitUntilelementPresent(this.welcomeElement, BasePage.LONG_WAIT, "The Welcome Page is not loaded").
        then((resp) => {
            expect(resp).to.equal(true);
        });
    }

    /**
     * This method allows checking if the user is logged in or not
     */
    async isUserSigned(){
        await this.waitUntilelementPresent(this.signedInElement, BasePage.LONG_WAIT, "The signed in label is not loaded").
        then((resp) => {
            expect(resp).to.equal(true);
        });
    }

    /**
     * This method redirects to the create new user page
     */
    async goToCreate(){
        await this.waitElementStaleness(this.createUserElement, BasePage.LONG_WAIT, "The create user link is not loaded").
        then((resp) => {
            this.createUserElement.click();
        });
    }

    /**
     * This method redirects to the employee information list
     */
    async goToEmployeeInformation(){
        await this.waitUntilelementDisplayed(this.employeeInformationElement, BasePage.LONG_WAIT, "The tab Employee information is not displayed").
        then((resp) => {
            expect(resp).to.equal(true);
            this.employeeInformationElement.click();
        });
    }

}
