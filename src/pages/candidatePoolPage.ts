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
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.goto(config.BASE_URL + 'candidate-pool');
  }
  async searchCandidate(email: string) {
    await this.txtBasicInfo.clear();
    await this.txtBasicInfo.fill(email);
    await this.btnSearch.click();
    await this.page.waitForEvent('response');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('//table/tbody/tr/td[2]');
  }
}
