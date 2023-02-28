import { DataUtils } from './../utils/dataUtils';
import { config } from '../support/config';

import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnGeneral: Locator;
  readonly txtOTP: Locator;
  constructor(page: Page) {
    this.page = page;
    this.txtUsername = page.locator('[id=Username]');
    this.txtPassword = page.locator('[id=Password]');
    this.btnGeneral = page.locator('[name=button]');
    this.txtOTP = page.locator('[id=OTP]');
  }
  // async goto() {
  //   await this.page.goto(config.BASE_URL);
  // }
  async loginByRole(role: string) {
    await this.page.goto(config.BASE_URL);

    const dataUtils = new DataUtils();
    const userData = dataUtils.getUserDataByRole(role);
    process.env.userRole = role;

    await this.txtUsername.fill(userData.username);
    await this.txtPassword.fill(userData.password);
    await this.btnGeneral.click();

    await this.txtOTP.fill(userData.otpCode);
    await this.btnGeneral.click();

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
