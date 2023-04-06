import { CommonPage } from '../pages/commonPage';
import { ICustomWorld } from '../support/custom-world';
import { When } from '@cucumber/cucumber';

When(`I click on "Save" button`, async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.clickCommonButton('Save');
});
