import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Locator, Page } from '@playwright/test';

export class NewApplicants {
  readonly page: Page;
  readonly btnAddNewCandidate: Locator;
  readonly txtSearchKey: Locator;
  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCandidate = page.getByRole('link', { name: 'Add New Candidate' });
    this.txtSearchKey = page.locator(
      '//input[@placeholder="Name, email, linkedIn, github, facebook"]',
    );
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
}
