import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { DataUtils } from '../utils/dataUtils';
import { config } from '../support/config';
import { Page, Locator, expect } from '@playwright/test';

export class CandidatePool {
  readonly page: Page;
  commonPage: CommonPage;
  readonly txtBasicInfo: Locator;
  readonly btnSearch: Locator;
  readonly tdCandidateName: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(this.page, iCustomWorld);
    this.txtBasicInfo = page.locator("//label[text()='Basic Info']/..//input");
    this.btnSearch = page.locator("//button[normalize-space(text())='Search']");
    this.tdCandidateName = page.locator('//table/tbody/tr/td[2]');
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
  async checkCandidateInfo() {
    const dataUtils = new DataUtils();
    const basicInfo = await dataUtils.getCandidateDataByType('required').basicInfo;
    const name = basicInfo.firstName + ' ' + basicInfo.lastName;
    await this.tdCandidateName.scrollIntoViewIfNeeded;
    await expect(this.tdCandidateName).toHaveText(name);
  }
}
