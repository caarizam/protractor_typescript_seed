import { BasePage, identification } from './base.page';
import { browser } from 'protractor';
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const Locators = {
    
    emailTextField: {
        type: identification[identification.Id],
        value: "user_email"
    },
    passwordTextField: {
        type: identification[identification.Id],
        value: "user_password"
    },
    rememberCheckbox: {
        type: identification[identification.Id],
        value: "user_remember_me"
    },
    signInButton: {
        type: identification[identification.Css],
        value: ".submit"
    }

}

export class LoginPage extends BasePage {

    emailElement = this.ElementLocator(Locators.emailTextField);
    passwordElement = this.ElementLocator(Locators.passwordTextField);
    rememberElement = this.ElementLocator(Locators.rememberCheckbox);
    signInElement = this.ElementLocator(Locators.signInButton);
    
    /**
     * This method allows to open the browser and navigate to the default URL
     * @param url The site's URL
     */
    async openBrowser(url: string){
        await browser.get(url, BasePage.LONG_WAIT);
    }

    /**
     * This method allows performing the action log in 
     * @param user the username
     * @param password the password
     * @param rememberMe True if you want to check the remember me action
     */
    async login(user: string, password: string, rememberMe: boolean){
        await this.waitUntilelementDisplayed(this.emailElement, BasePage.LONG_WAIT, "The login email is not loaded").
        then((resp) => {
            expect(resp).to.equal(true);
            this.emailElement.sendKeys(user);           
        });

        await this.waitUntilelementDisplayed(this.passwordElement, BasePage.LONG_WAIT, "The login password is not loaded").
        then((resp) => {
            expect(resp).to.equal(true);
            this.passwordElement.sendKeys(password);          
        });

        //TODO remember me action

        await this.waitUntilelementDisplayed(this.signInElement, BasePage.LONG_WAIT, "The login sign in button is not loaded").
        then((resp) => {
            expect(resp).to.equal(true);
            this.signInElement.click();            
        });
    }

    

}
