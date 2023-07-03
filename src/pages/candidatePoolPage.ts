import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Page, Locator } from '@playwright/test';

export class CandidatePool {
  readonly page: Page;
  commonPage: CommonPage;
  readonly txtBasicInfo: Locator;
  readonly btnSearch: Locator;

  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(this.page, iCustomWorld);
    this.txtBasicInfo = page.locator("//label[text()='Basic Info']/..//input");
    this.btnSearch = page.locator("//button[normalize-space(text())='Search']");
  }
  async goto() {
    await this.page.goto(config.BASE_URL + 'candidate-pool');
    await this.page.waitForLoadState();
    await this.page.waitForSelector('//span[text()="Select Campaign"]');
  }
  async searchCandidate(email: string) {
    await this.txtBasicInfo.clear();
    await this.txtBasicInfo.fill(email);
    await this.btnSearch.click();
    await this.page.waitForResponse(
      (resp) => resp.url().includes('/api/candidate') && resp.status() === 200,
    );
  }

  async fillBasicInfo(email: string) {
    await this.txtBasicInfo.clear();
    await this.txtBasicInfo.fill(email);
  }

  async clickOnSearchButton() {
    await this.btnSearch.click();
  }
}
