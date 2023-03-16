import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Locator, Page } from '@playwright/test';

export class NewApplicants {
  readonly page: Page;
  readonly btnAddNewCandicate: Locator;
  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCandicate = page.getByRole('link', { name: 'Add New Candidate' });
  }
  async goto() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.goto(config.BASE_URL + 'new-applicants');
  }
  async goToNewCandidatePage() {
    await this.btnAddNewCandicate.click();
  }
}
