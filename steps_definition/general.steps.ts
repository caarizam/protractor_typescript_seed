import { Given, When, Then } from 'cucumber';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';

let loginPage = new LoginPage();
let homePage = new HomePage();

Given('The user is on the login page', async () => {
    await loginPage.openBrowser("https://sample.url.com");
});

When('The user tries to login with {string} and {string}', async (user: string, password: string) => {
    await loginPage.login(user, password, false);
});

Then('The user should see the Welcome Page', async () => {
    await homePage.checkWelcomePage();
    await homePage.isUserSigned();
    await homePage.checkSiteLogo();
});

Given('The user go to the Listing Employee page', async () => {
    await homePage.goToEmployeeInformation();
});

Given('The user is in the Home Page', async () => {
    await homePage.goToHomePage();
    await homePage.checkSiteLogo();
});
