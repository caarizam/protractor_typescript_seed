import {browser, element, by, $, $$, ExpectedConditions} from 'protractor';
import { promise } from 'selenium-webdriver';
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

export class BasePage{
    public eConditions = ExpectedConditions;
    public static SHORT_WAIT: number = 10000;
    public static GENERAL_WAIT: number = 15000;
    public static LONG_WAIT: number = 40000;

    ElementLocator(obj){
        if(obj.type == identification[identification.Css]){
            return element(by.css(obj.value));
        }else if(obj.type == identification[identification.Xpath]){
            return element(by.xpath(obj.value));
        }else if(obj.type == identification[identification.Name]){
            return element(by.name(obj.value));
        }else if(obj.type == identification[identification.Id]){
            return element(by.id(obj.value));
        }else if(obj.type == identification[identification.LinkText]){
            return element(by.linkText(obj.value));
        }else if(obj.type == identification[identification.PartialText]){
            return element(by.partialLinkText(obj.value));
        }else if(obj.type == identification[identification.Class]){
            return element(by.className(obj.value));
        }else if(obj.type == identification[identification.Model]){
            return element(by.model(obj.value));
        }
    }

    ElementLocatorAll(obj){
        if(obj.type == identification[identification.Css]){
            return element.all(by.css(obj.value));
        }else if(obj.type == identification[identification.Xpath]){
            return element.all(by.xpath(obj.value));
        }else if(obj.type == identification[identification.Name]){
            return element.all(by.name(obj.value));
        }else if(obj.type == identification[identification.Id]){
            return element.all(by.id(obj.value));
        }else if(obj.type == identification[identification.LinkText]){
            return element.all(by.linkText(obj.value));
        }else if(obj.type == identification[identification.PartialText]){
            return element.all(by.partialLinkText(obj.value));
        }else if(obj.type == identification[identification.Class]){
            return element.all(by.className(obj.value));
        }else if(obj.type == identification[identification.Model]){
            return element.all(by.model(obj.value));
        }
    }

    public isDisplayedElement(element): promise.Promise<boolean> {
        return element.isDisplayed().
            then(result => result, () => false).
            catch((err) => {return false;})
    }

    /**
     * This method allows waiting time until the element could be found out, based on the Staleness state
     * @param element The element from the page
     * @param timeout The maximum time amount
     * @param message The message that will be displayed on error
     */
    public waitElementStaleness(element: any, timeout?: number, message?: string){
        let wait = timeout || 10000;
        let errorMessage = message || "The element Staleness could not be verified yet in " + wait + " ms";

        return browser.driver.wait(() => {
            return this.isDisplayedElement(element);
        }, wait, errorMessage);
    }

    /**
     * This method allows waiting time until the element could be found out, based on IsPresent
     * @param element The element from the page
     * @param timeout The maximum time amount
     * @param message The message that will be displayed on error
     */
    public waitUntilelementPresent(element: any, timeout?: number, message?: string) {

        let wait = timeout || 10000;
        let errorMessage = message || "The element is not present yet in " + wait + " ms";

        return browser.driver.wait(() => element.isPresent()
            .then(isPresent => isPresent === true), wait, errorMessage);
    }

    /**
     * This method allows waiting time until the element could be found out, based on IsDisplayed
     * @param element The element from the page
     * @param timeout The maximum time amount
     * @param message The message that will be displayed on error
     */
    public waitUntilelementDisplayed(element: any, timeout?: number, message?: string) {

        let wait = timeout || 10000;
        let errorMessage = message || "The element is not displayed yet in " + wait + " ms";

        return browser.driver.wait(() => element.isDisplayed()
            .then(isDisplayed => isDisplayed === true), wait, errorMessage).
            catch((err) => {
                console.log(err);
                return false;
            });
    }

    /**
     * This method allows selecting an option from a Select Element
     * @param dropdown The element <select> from the page
     * @param option The option that will be selected
     */
    async getSelectOptionByValue(dropdown: any, option: string): promise.Promise<boolean>{
        let flag: boolean = await this.waitUntilelementDisplayed(dropdown.$('[value="' + option.trim() +'"]'), BasePage.SHORT_WAIT)
        .then((resp) => {
            if(resp === true){
                dropdown.$('[value="' + option.trim() +'"]').click();
                return true;
            }else{
                expect(resp, "The option " + option + " could not be found").to.equal(true);
                return false;
            }
            
        });
        //dropdown.$('[value="' + option.trim() +'"]').click();
        return flag;
    }
    /**
     * This method allows to pause the browser execution manually
     */
    public manualBrowserStop(){
        browser.pause();
    }
    
}

export enum identification{
    Id,
    Name,
    Css,
    Xpath,
    LinkText,
    PartialText,
    Class,
    Model
}
