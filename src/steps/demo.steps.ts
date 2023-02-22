import { ICustomWorld } from '../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';

Given('Demo Given', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto('https://www.google.com/');
});

When('Demo When', async function (this: ICustomWorld) {
  // const page = this.page!;
  console.log('Hello Again!');
});

Then('Demo Then', async function (this: ICustomWorld) {
  // const page = this.page!;
  console.log('Done!');
});
