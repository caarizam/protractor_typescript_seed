import { defineSupportCode, Before, BeforeAll, After, AfterAll, setDefaultTimeout, Status } from 'cucumber';
import { browser } from 'protractor';


setDefaultTimeout(90000);

/**
 * This is the After Step and this takes a Screenshot when error.
 * It will be executed after every scenario
 */
After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, "image/png");
    }
  });

/**
 * This is the AfterAll Step hook, It will be executed once after the scenarios
 */
AfterAll(async function(scenario) {
    console.log("AfterAll Hook");
});

/**
 * This is the Before Step hook, It will be executed before every scenario
 */
Before(async function(scenario) {
    console.log("Before Hook");
});

/**
 * This is the BeforeAll Step hook, It will be executed once before the scenarios
 */
BeforeAll(async function(scenario) {
    console.log("BeforeAll Hook");
});
