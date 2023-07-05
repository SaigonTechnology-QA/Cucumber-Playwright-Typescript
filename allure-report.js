// eslint-disable-next-line @typescript-eslint/no-var-requires
var CucumberJSAllureFormatter = require('cucumberjs-allure2-reporter').CucumberJSAllureFormatter;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var AllureRuntime = require('cucumberjs-allure2-reporter').AllureRuntime;

function Reporter(options) {
  CucumberJSAllureFormatter.call(
    this,
    options,
    new AllureRuntime({ resultsDir: './report/allure-results' }),
    {},
  );
}
Reporter.prototype = Object.create(CucumberJSAllureFormatter.prototype);
Reporter.prototype.constructor = Reporter;

exports.default = Reporter;
