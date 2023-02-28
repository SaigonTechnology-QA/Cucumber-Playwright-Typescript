import { CommonPage } from './commonPage';
import { config } from '../support/config';
import { ICustomWorld } from '../support/custom-world';
import { Locator, Page } from '@playwright/test';

export class CampaignPage {
  readonly page: Page;
  readonly btnAddNewCampaign: Locator;
  readonly tabDraftStatus: Locator;
  readonly txtSearchCampain: Locator;
  readonly itemCampaignList: Locator;

  readonly itemCampaignList_campaignName: Locator;
  readonly btnShowActions: Locator;
  readonly btnDeleteCampaign: Locator;

  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCampaign = page.getByRole('link', { name: 'Add New Campaign' });
    this.tabDraftStatus = page.locator(
      '//div[@class="list-tab-filter"]//span[contains(text(),"draft")]',
    );
    this.txtSearchCampain = page.locator(
      '//div[@class="filter-control-size search-control-within-icon"]/input',
    );
    this.itemCampaignList_campaignName = page.locator('//table//tr[1]/td[1]/a');
    this.itemCampaignList = page.locator('//tr[@class="ng-star-inserted"]');
    this.btnShowActions = page.locator('//button[@title="Click to show actions"]');
    this.btnDeleteCampaign = page.locator('//button/span[text()="Delete campaign"]');
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
  async clickDraftTab() {
    await this.tabDraftStatus.click({ force: true });
  }

  async checkCampainExistInDraftStatus() {
    const newCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
    // await this.clickDraftTab();
    await this.txtSearchCampain.fill(newCampaignName);
    await this.commonPage.checkTableCellValueByColumnName(newCampaignName, 'Name');
  }

  async campaignTeardown() {
    const newCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';

    console.log('Starting to clear campaign with prefix: ' + process.env.campaignNamePrefix);

    if (newCampaignName !== '') {
      await this.page.goto(config.BASE_URL + 'campaign');
      await this.txtSearchCampain.fill(newCampaignName);
      await this.btnShowActions.first().click();
      await this.btnDeleteCampaign.click();
      await this.commonPage.clickCommonButton('Yes');

      console.log('Cleared test campaign!');
    }
  }
}
