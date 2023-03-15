import { DataUtils } from './../utils/dataUtils';
import { config } from '../support/config';

import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly txtUsername: Locator;
  readonly txtPassword: Locator;
  readonly btnGeneral: Locator;
  readonly txtOTP: Locator;
  readonly txtProfileName: Locator;
  readonly btnLogout: Locator;
  constructor(page: Page) {
    this.page = page;
    this.txtUsername = page.locator('[id=Username]');
    this.txtPassword = page.locator('[id=Password]');
    this.btnGeneral = page.locator('[name=button]');
    this.txtOTP = page.locator('[id=OTP]');
    this.txtProfileName = page.locator(
      '//div[@id="m_header_topbar"]//li[contains(@class,"item profile-name")]',
    );
    this.btnLogout = page.locator(
      '//div[@id="m_header_topbar"]//a[@role="button" and normalize-space(text())= "Logout"]',
    );
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
  async logOut() {
    await this.txtProfileName.click();
    await this.btnLogout.click();
  }
}
