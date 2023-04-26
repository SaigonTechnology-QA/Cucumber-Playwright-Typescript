import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Locator, Page } from '@playwright/test';

export class NewApplicants {
  readonly page: Page;
  readonly btnAddNewCandidate: Locator;
  readonly txtSearchKey: Locator;
  readonly btnHamburgerMenu: Locator;
  readonly btnEditApplicant: Locator;
  readonly btnCompleteProfile: Locator;
  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCandidate = page.getByRole('link', { name: 'Add New Candidate' });
    this.txtSearchKey = page.locator(
      '//input[@placeholder="Name, email, linkedIn, github, facebook"]',
    );
    this.btnHamburgerMenu = page.locator(
      '//button[@title="Click to show actions"]',
    );
    this.btnEditApplicant = page.locator('//button/span[contains(text(),"Edit applicant")]');
    this.btnCompleteProfile = page.locator('//button/span[contains(text(),"Complete profile")]');
  }
  async goto() {
    await this.page.goto(config.BASE_URL + 'new-applicants');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async goToNewCandidatePage() {
    await this.btnAddNewCandidate.click();
  }
  async searchNewApplicant(email: string) {
    await this.commonPage.clearTextField(this.txtSearchKey);
    await this.txtSearchKey.fill(email);
    await this.page.waitForEvent('response');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('//table/tbody/tr/td[3]');
  }

  async clickHamburgerButton() {
    await this.btnHamburgerMenu.scrollIntoViewIfNeeded();
    await this.btnHamburgerMenu.click();
  }
  async clickEditApplicantMenuItem() {
    await this.clickHamburgerButton();
    await this.btnEditApplicant.click();
  }

  async clickCompleteProfileMenuItem() {
    await this.btnCompleteProfile.scrollIntoViewIfNeeded();
    await this.btnCompleteProfile.click();
  }
}
