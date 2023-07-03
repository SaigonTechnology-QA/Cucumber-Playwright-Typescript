// import { config } from '../support/config';
// import { CommonPage } from '../pages/commonPage';
import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
// import { DataUtils } from '../utils/dataUtils';
import { config } from '../support/config';
import { DataUtils } from '../utils/dataUtils';
import { Locator, Page, expect } from '@playwright/test';
import { replace } from 'lodash';

export class InterviewProcessPage {
  readonly page: Page;
  readonly selectCampaignDropdown: Locator;
  readonly btnAddNewCandidate: Locator;
  readonly tableResult: Locator;
  readonly txtSearchKey: Locator;
  readonly drSelectCampaign: Locator;
  readonly txtSelectCampaign: Locator;
  readonly spanSearchResultItemNotFound: Locator;

  commonPage: CommonPage;
  linkInterviewRound: string;

  constructor(page: Page, iciCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iciCustomWorld);
    this.selectCampaignDropdown = page.locator('//div[@class="search-box form-control d-flex"]');
    this.btnAddNewCandidate = page.getByRole('link', { name: 'Add New Candidate' });
    this.tableResult = page.locator('//table');
    this.txtSearchKey = page.locator("//input[contains(@placeholder,'Name')]");
    this.drSelectCampaign = page.locator(
      "//h3[normalize-space(text())='Select Campaign:']/following-sibling::*//div[@class='search-box form-control d-flex']",
    );
    this.txtSelectCampaign = page.locator('//input[@placeholder="Select campaign"]');
    this.spanSearchResultItemNotFound = page.locator('//li[text()="No result"]');
    this.linkInterviewRound = '//*[@class="tab-header"]//span[text()="roundName"]';
  }

  async selectCampaignOptionOnInterviewProcessPage(campaignName: string) {
    await this.selectCampaignDropdown.click();
    await this.page
      .locator(
        replace(
          '//div[@class="dropbox-wrapper"]/ul/li[normalize-space(text())="@campaignName"]',
          '@campaignName',
          campaignName,
        ),
      )
      .click();
  }
  async clickOnCampaignProcessTab(tabName: string) {
    const processTabPath = replace(
      '//span[normalize-space(text())="@tabName"]',
      '@tabName',
      tabName,
    );
    await this.page.locator(processTabPath).click();
  }

  async checkCandidateIsDisplayedOnAInterviewProcessTab(
    campaignName: string,
    candidateEmail: string,
    processTab: string,
  ) {
    //Select changed campaign
    await this.selectCampaignOptionOnInterviewProcessPage(campaignName);
    //Click on "Interview Tab"
    await this.clickOnCampaignProcessTab(processTab);
    //Search & Verify candidate is display on the Job Interview Skill
    await this.commonPage.searchByNameEmailSocial(candidateEmail);
    await this.commonPage.checkEmailApplicantAfterSearch(candidateEmail, 1);
  }
  async goto() {
    await this.page.goto(config.BASE_URL + 'interview-process');
    await this.page.waitForLoadState();
  }
  async selectCampaign() {
    const dataUtils = new DataUtils();
    const recruitmentInfo = await dataUtils.getCandidateDataByType('full').recruitmentInfo;
    const drOptionXpath = replace(
      "//li[normalize-space(text())='optionValue']",
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
    await this.page.waitForLoadState('domcontentloaded');
    await this.commonPage.checkEmailApplicantAfterSearch(email, 1);
  }
  async verifyStatusOfCandidate(columnNumber: number, status: string) {
    const statusLocator = '//tbody/tr/td[' + columnNumber + ']//button';
    await expect(this.page.locator(statusLocator)).toContainText(status);
  }

  async verifyStatusOfCandidateOnProcessTab(status: string) {
    const statusLocator = '//div[@class="tooltip-wrapper"]//button';
    await expect(this.page.locator(statusLocator)).toContainText(status);
  }
  async inputCampaignToDropDownlist(campaignName: string) {
    await this.drSelectCampaign.click();
    await expect(this.txtSelectCampaign).toBeVisible();
    await this.txtSelectCampaign.clear();
    await this.txtSelectCampaign.fill(campaignName);
    await this.page.waitForLoadState();
  }
  async verifyNoCampaignFound() {
    await expect(this.spanSearchResultItemNotFound).toBeVisible();
  }
  async verifyRoundsIsDisplay(...rounds: string[]) {
    for (const round of rounds) {
      const roundLocator = replace(this.linkInterviewRound, 'roundName', round);
      await expect(this.page.locator(roundLocator)).toBeVisible();
    }
  }

  async verifyCampaignIsDisplay(campaignName: string) {
    await this.selectCampaignDropdown.click();
    await expect(
      this.page.locator(
        replace(
          '//div[@class="dropbox-wrapper"]/ul/li[normalize-space(text())="@campaignName"]',
          '@campaignName',
          campaignName,
        ),
      ),
    ).toBeVisible();
    this.page.locator('//h3[normalize-space(text())="Select Campaign:"]').click();
  }
}
