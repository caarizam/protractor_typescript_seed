import { browser, Config } from 'protractor';
import { CucumberReportExtension } from './reporting/CucumberReportExtension';

export let config: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--verbose', '--no-sandbox']
        },
    },
    specs: [ 'features/*.feature' ],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    baseUrl: "",
    //SELENIUM_PROMISE_MANAGER: false,
    cucumberOpts: {
        compiler: "",
        strict: true,
        format: 'json:./reports/json/cucumber_report.json',
        require: ['steps_definition/*.js', 'steps_definition/hooks/*.js'],
        tags: [
            '@e2e'
        ]
    },
    onPrepare:function () {
        CucumberReportExtension.CreateDirectory(CucumberReportExtension.jsonDir);
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(false);
    },
    onComplete: function () {
        CucumberReportExtension.GenerateCucucumberReport(CucumberReportExtension.cucumberReporterOptions);
    }
};
