import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { DataUtils } from '../utils/dataUtils';
import { Page, Locator } from '@playwright/test';
import { replace } from 'lodash';

export class InterviewProcess {
  readonly page: Page;
  readonly btnAddNewCandidate: Locator;
  readonly tableResult: Locator;
  readonly txtSearchKey: Locator;
  readonly drSelectCampaign: Locator;
  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCandidate = page.getByRole('link', { name: 'Add New Candidate' });
    this.tableResult = page.locator('//table');
    this.txtSearchKey = page.locator("//input[contains(@placeholder,'Name')]");
    this.drSelectCampaign = page.locator(
      "//h3[normalize-space(text())='Select Campaign:']/following-sibling::*//div[@class='search-box form-control d-flex']",
    );
  }
  async goto() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.goto(config.BASE_URL + 'interview-process');
  }
  async selectCampaign() {
    const dataUtils = new DataUtils();
    const recruitmentInfo = await dataUtils.getCandidateDataByType('full').recruitmentInfo;
    const drOptionXpath = replace(
      "//li[normalize-space(text())='Dev Test']",
      'optionValue',
      recruitmentInfo.campaign != undefined ? recruitmentInfo.campaign : '',
    );
    await this.drSelectCampaign.click();
    await this.page.locator(drOptionXpath).click();
    await this.page.locator("//h3[normalize-space(text())='Select Campaign:']").click();
  }
  async searchNewApplicant(email: string) {
    await this.txtSearchKey.clear();
    await this.txtSearchKey.fill(email);
    await this.page.waitForEvent('response');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
