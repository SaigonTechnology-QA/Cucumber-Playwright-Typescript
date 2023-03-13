import { CreateCampaignPage } from '../pages/createNewCampaignPage';
import { CampaignPage } from '../pages/campaignPage';
import { ICustomWorld } from '../support/custom-world';
import { CommonPage } from '../pages/commonPage';
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

Then(
  'the newly created campaign should be displayed on Campaigns page in Draft status tab',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    await campaignPage.checkCampainExistInDraftStatus();
    await campaignPage.campaignTeardown();
  },
);

Given(
  'I create a new campaign with campaign name is {string} successfully',
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
  },
);

When('I create a new campaign with the full fields', async function (this: ICustomWorld) {
  const page = this.page!;
  const createCampaignPage = new CreateCampaignPage(page, this);
  await createCampaignPage.createNewCampaignWithFullFieldsMain();
});
