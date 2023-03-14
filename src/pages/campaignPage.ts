import { CommonPage } from './commonPage';
import { config } from '../support/config';
import { ICustomWorld } from '../support/custom-world';
import { Locator, Page } from '@playwright/test';
import { replace } from 'lodash';

export class CampaignPage {
  readonly page: Page;
  readonly btnAddNewCampaign: Locator;
  readonly tabStatusNameXpath: string;
  readonly txtSearchCampain: Locator;
  readonly itemCampaignList: Locator;

  readonly itemCampaignList_campaignName: Locator;
  readonly btnShowActions: Locator;
  readonly btnDeleteCampaign: Locator;

  readonly btnCloseCampaign: Locator;

  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCampaign = page.getByRole('link', { name: 'Add New Campaign' });
    this.tabStatusNameXpath = "//*[normalize-space(text())='tabStatusName']";
    this.txtSearchCampain = page.locator(
      '//div[@class="filter-control-size search-control-within-icon"]/input',
    );
    this.itemCampaignList_campaignName = page.locator('//table//tr[1]/td[1]/a');
    this.itemCampaignList = page.locator('//tr[@class="ng-star-inserted"]');
    this.btnShowActions = page.locator('//button[@title="Click to show actions"]');
    this.btnDeleteCampaign = page.locator('//button/span[text()="Delete campaign"]');
    this.btnCloseCampaign = page.locator('//button/span[text()="Close campaign"]');
  }
  async goto() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.goto(config.BASE_URL + 'campaign');
  }
  async clickAddNewCampaignButton() {
    await this.btnAddNewCampaign.click();
  }
  async clickTabStatusButton(btnName: string) {
    await this.page.waitForLoadState();

    btnName = btnName.toLowerCase();
    const tabStatusNameXpath = replace(this.tabStatusNameXpath, 'tabStatusName', btnName);

    await this.page.locator(tabStatusNameXpath).click({ force: true });
    let tabStatus = await this.page.locator(tabStatusNameXpath).getAttribute('class');
    while (!tabStatus?.includes('active')) {
      await this.page.locator(tabStatusNameXpath).click({ force: true });
      let i = 0;
      this.commonPage.delay(200);
      if (i > 3) break;
      i = i++;
      tabStatus = await this.page.locator(tabStatusNameXpath).getAttribute('class');
    }
  }
  async clickDraftTab() {
    await this.clickTabStatusButton('Draft');
  }
  async clickToggleButtonbyCampaignName(campaignName: string, buttonName: string) {
    await this.page.waitForSelector('//table//tr');
    const btnToggleXpath =
      '//table//*[normalize-space(text())="' +
      campaignName +
      '"]//parent::td/following-sibling::td//app-group-button';
    await this.page.waitForSelector(btnToggleXpath);
    await this.page.locator(btnToggleXpath).click();
    await this.page
      .locator(btnToggleXpath + '//span[normalize-space(text())="' + buttonName + '"]')
      .click();
  }
  async searchCampaignName(campaignName: string) {
    await this.txtSearchCampain.clear();
    await this.txtSearchCampain.fill(campaignName);
    await this.page.waitForLoadState();
    await this.page.waitForSelector('//table//tr');
  }
  async checkCampainExistInDraftStatus() {
    const newCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
    await this.clickDraftTab();
    await this.searchCampaignName(newCampaignName);
    await this.commonPage.delay(2000);
    await this.commonPage.checkTableCellValueByColumnName(newCampaignName, 'Name');
  }

  async campaignTeardown(newCampaignName: string) {
    console.log('Starting to clear campaign with prefix: ' + process.env.campaignNamePrefix);
    await this.page.goto(config.BASE_URL + 'campaign');
    await this.searchCampaignName(newCampaignName);

    if (!(await this.page.$('//button[@title="Click to show actions"]'))) {
      await this.page.locator('//span/span[contains(text(),"1")]/parent::span').click();
    }
    await this.btnShowActions.first().click();
    if (await this.page.$('//button/span[text()="Delete campaign"]')) {
      await this.btnDeleteCampaign.click();
    } else {
      await this.btnCloseCampaign.first().click();
    }
    await this.commonPage.clickCommonButton('Yes');
    console.log('Cleared test campaign!');
  }
}
