import { ICustomWorld } from '../support/custom-world';
import { CampaignPage } from '../pages/campaignPage';
import { When } from '@cucumber/cucumber';

When('I click on {string} tab', async function (this: ICustomWorld, btnName: string) {
  const page = this.page!;
  const campaignPage = new CampaignPage(page, this);
  await campaignPage.clickTabStatusButton(btnName);
});

When(
  'I click on {string} button in the hamburger menu of existing campaign',
  async function (this: ICustomWorld, btnName: string) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const newCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
    await campaignPage.searchCampaignName(newCampaignName);
    await campaignPage.clickToggleButtonbyCampaignName(newCampaignName, btnName);
  },
);
When('I click on "Yes" button on the Comfirm modal', async function (this: ICustomWorld) {
  const page = this.page!;
  const campaignPage = new CampaignPage(page, this);
  await campaignPage.commonPage.clickCommonButton('Yes');
});
