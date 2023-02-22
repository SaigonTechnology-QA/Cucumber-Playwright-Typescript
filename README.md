# cucumber-playwright

## Set up

1. Install VSCode: https://code.visualstudio.com/
2. Set up Nodejs from: https://nodejs.org/en/download/ (You may need to set up PATH in System Environment Variables and restart VSCode to run npm command)
3. Open Project in VSCode then accept to install all recommended extensions
4. Install Playwright:

In VSCode, open Terminal then run below commands:
```
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

5. Install dependencies:

```
npm install
```

6. Try to run test `npm run test` and check if test can be run successfully

## To run your tests

1. To run all tests
   `npm run all` or `npm run test`

2. To run specific feature
   `npm run test <features\featureFile>` or `npx cucumber-js <features\featureFile>` run the single feature

Ex: `npm run test 'features\demo.feature'` or `npm run test features\demo.feature`

3. To run specific tag
   `npm run test-tag <features\featureFile>`

Ex: `npm run test-tag '@login'`

3. To debug specific tag
   `npm run debug-tag <features\featureFile>`

Ex: `npm run debug-tag '@login'`

## Browser selection

By default we will use chromium. You can define an envrionment variable called BROWSER and
set the name of the browser. Available options: chromium, firefox, webkit

On Linux and Mac you can write:

`BROWSER=firefox npm run test` or `BROWSER=firefox npx cucumber-js` runs all tests using Firefox

On Windows you need to write

```
set BROWSER=firefox
npm run test
```

## Debugging Features

### From CLI

- `npm run debug` - headful mode with APIs enables both APIs and debug options

## In Visual Studio Code

- Open the feature
- Select the debug options in the VSCode debugger
- Set breakpoints in the code

To stop the feature, you can add the `Then debug` step inside your feature. It will stop your debugger.

## To ignore a scenario

- tag the scenario with `@ignore`

## To check for typescript, linting and gherkin errors

- run the command `npm run build`.

## To view the html report of the last run

- run the command `npm run report`.

## To view allure report

- run the command `npm run allure`.
