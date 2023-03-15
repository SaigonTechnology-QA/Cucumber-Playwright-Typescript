import { ICustomWorld } from '../support/custom-world';
import { LoginPage } from '../pages/loginPage';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given(`I sign in with role as {string}`, async function (this: ICustomWorld, role: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.loginByRole(role);
});

Then('The Recruitment Page Should Be Displayed', async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page).toHaveTitle(/Recruitment/);
});

When('I log out', async function (this: ICustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.logOut();
});
