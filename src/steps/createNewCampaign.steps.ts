import { CreateCampaignPage } from '../pages/createNewCampaignPage';
import { CampaignPage } from '../pages/campaignPage';
import { ICustomWorld } from '../support/custom-world';
import { CommonPage } from '../pages/commonPage';
import { DataUtils } from '../utils/dataUtils';
import { Given, When, Then } from '@cucumber/cucumber';

When(`I go to Campaigns page`, async function (this: ICustomWorld) {
  const page = this.page!;
  const campaignPage = new CampaignPage(page, this);
  await campaignPage.goto();
});

When('I click on "Add New Campaign" button', async function (this: ICustomWorld) {
  const page = this.page!;
  const campaignPage = new CampaignPage(page, this);
  await campaignPage.clickAddNewCampaignButton();
});

When('I create a new campaign with the required fields', async function (this: ICustomWorld) {
  const page = this.page!;
  const createCampaignPage = new CreateCampaignPage(page, this);
  await createCampaignPage.createNewCampaignWithRequiredFields();
});

When(
  'I create a new campaign with the Manager field is user login successfully',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    const dataUtils = new DataUtils();

    const role = process.env.userRole !== undefined ? process.env.userRole : '';
    const userData = dataUtils.getUserDataByRole(role);

    await createCampaignPage.createNewCampaignWithExceptField('');
    await commonPage.selectDropdonwValueForNotMandatoryFields(
      'Manager',
      userData.fullname as string,
    );
    await createCampaignPage.clickSave();
  },
);

Then(
  'the newly created campaign should be displayed on Campaigns page in Draft status tab',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    await campaignPage.checkCampainExistInDraftStatus();
  },
);

Then('the newly updated Campaign should be display on table', async function (this: ICustomWorld) {
  const page = this.page!;
  const campaignPage = new CampaignPage(page, this);
  const commonPage = new CommonPage(page, this);
  const newCampaignName =
    process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
  await campaignPage.searchCampaignName(newCampaignName);
  await commonPage.checkTableCellValueByColumnName(newCampaignName);
});

Given(
  'I create a new campaign with campaign name is successfully',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createCampaignPage = new CreateCampaignPage(page, this);
    await createCampaignPage.createNewCampaignWithRequiredFields();
  },
);
When(
  'I create a new campaign all required fields except {string} field',
  async function (this: ICustomWorld, fieldName: string) {
    const page = this.page!;
    const createCampaignPage = new CreateCampaignPage(page, this);
    await createCampaignPage.createNewCampaignWithExceptField(fieldName);
    await createCampaignPage.clickSave();
  },
);
Then(
  'the {string} message should be displayed next to {string} field',
  async function (this: ICustomWorld, errorMessage: string, fieldName: string) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    if (fieldName !== 'Difficulty Level')
      await commonPage.checkErrorMessagebyFieldName(fieldName, errorMessage);
    //release global value
    process.env.newCampaignName = '';
  },
);

When('I create a new campaign with the full fields', async function (this: ICustomWorld) {
  const page = this.page!;
  const createCampaignPage = new CreateCampaignPage(page, this);
  await createCampaignPage.createNewCampaignWithFullFieldsMain();
});
When(
  'I input values for 2 fields TA Executive and Primary TA Executive',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    const dataUtils = new DataUtils();
    const campaignReDetailData = await dataUtils.getCampaignDataByType('full_data')
      .recruiterDetails;
    await commonPage.selectDropdonwValueForNotMandatoryFields(
      'TA Executive',
      campaignReDetailData.taExecutive as string,
    );
    await commonPage.selectDropdonwValueForNotMandatoryFields(
      'Primary TA Executive',
      campaignReDetailData.primaryTAExecutive as string,
    );
    await createCampaignPage.clickSave();
  },
);
