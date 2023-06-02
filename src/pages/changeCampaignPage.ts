import { CreateCampaignPage } from './createNewCampaignPage';
import { CampaignPage } from './campaignPage';
import { CommonPage } from '../pages/commonPage';
import { ICustomWorld } from '../support/custom-world';
import { DataUtils } from '../utils/dataUtils';
import { Locator, Page } from '@playwright/test';

export class ChangeCampaignPage {
  readonly page: Page;
  readonly ddAssignedTAExecutive: Locator;
  readonly ddAssignedTAExecutiveFirstOption: Locator;
  commonPage: CommonPage;
  campaignPage: CampaignPage;
  createCampaignPage: CreateCampaignPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.campaignPage = new CampaignPage(page, iCustomWorld);
    this.createCampaignPage = new CreateCampaignPage(page, iCustomWorld);
    this.ddAssignedTAExecutive = page.locator(
      '//label[starts-with(normalize-space(text()),"Assigned TA Executive")]/following-sibling::*//div[@class="search-box form-control d-flex"]',
    );
    this.ddAssignedTAExecutiveFirstOption = page.locator(
      '//label[starts-with(normalize-space(text()),"Assigned TA Executive")]//following-sibling::*//li[@class="search-result-item"]',
    );
  }

  async selectFirstOptionOfAssignedTAExecutiveDd() {
    //Open dropdown
    await this.ddAssignedTAExecutive.click();

    //Select option value
    await this.ddAssignedTAExecutiveFirstOption.first().click();
  }

  async updateDataOnChangeCampaignModal(
    campaignName: string,
    roundNumber: number,
    statusNumber: number,
  ) {
    const dataUtils = new DataUtils();
    const interviewRoundOption = await dataUtils.getChangeCampaignData().interviewRoundOption;
    const interviewStatusOption = await dataUtils.getChangeCampaignData().interviewStatusOption;
    //select campaign that want to change
    await this.commonPage.selectDropdownValue('Campaign', campaignName);
    //select Assigned TA Executive
    await this.selectFirstOptionOfAssignedTAExecutiveDd();
    //Select Interview Round
    await this.commonPage.selectDropdownValue('Interview round', interviewRoundOption[roundNumber]);
    //select Interview Status
    await this.commonPage.selectDropdownValue(
      'Interview Status',
      interviewStatusOption[statusNumber],
    );
  }

  async changeCampaignStatusFromPendingToActive(campaignName: string) {
    //Click on Pending Tab
    await this.campaignPage.clickTabStatusButton('Pending');
    //Search campaign
    await this.campaignPage.searchCampaignName(campaignName);
    //Click on "Approve campaign" button in the hamburger menu
    await this.campaignPage.clickToggleButtonbyCampaignName(campaignName, 'Approve campaign');
    //click on "Yes" button on the Comfirm modal
    await this.commonPage.clickCommonButton('Yes');
    // click on "Approved" tab
    await this.campaignPage.clickTabStatusButton('Approved');
    //click on "Update campaign" button in the hamburger menu of existing campaign
    await this.campaignPage.searchCampaignName(campaignName);
    await this.campaignPage.clickToggleButtonbyCampaignName(campaignName, 'Update campaign');
    //input values for 2 fields TA Executive and Primary TA Executive
    const dataUtils = new DataUtils();
    const campaignReDetailData = await dataUtils.getCampaignDataByType('full_data')
      .recruiterDetails;
    await this.commonPage.selectDropdonwValueForNotMandatoryFields(
      'TA Executive',
      campaignReDetailData.taExecutive as string,
    );
    await this.commonPage.selectDropdonwValueForNotMandatoryFields(
      'Primary TA Executive',
      campaignReDetailData.primaryTAExecutive as string,
    );
    await this.createCampaignPage.clickSave();
    //click on "Approved" tab
    await this.campaignPage.clickTabStatusButton('Approved');
    //I click on "Active campaign" button in the hamburger menu of existing campaign
    await this.campaignPage.searchCampaignName(campaignName);
    await this.campaignPage.clickToggleButtonbyCampaignName(campaignName, 'Active campaign');
    //I click on "Yes" button on the Comfirm modal
    await this.commonPage.clickCommonButton('Yes');
  }
  async addTAExecutiveFromUserFile(campaignName: string) {
    await this.campaignPage.clickTabStatusButton('Active');
    await this.campaignPage.searchCampaignName(campaignName);
    await this.campaignPage.clickToggleButtonbyCampaignName(campaignName, 'Update campaign');
    const dataUtils = new DataUtils();
    const userData = dataUtils.getUserDataByRole('TA Executive');
    await this.page
      .locator(
        '//label[normalize-space()="TA Executive"]/..//div[@class="search-box form-control d-flex"]',
      )
      .click();
    await this.page
      .locator('//li[normalize-space(text())="' + userData.username.replace('_', ' ') + '"]')
      .click();
    await this.createCampaignPage.clickSave();
  }
}
