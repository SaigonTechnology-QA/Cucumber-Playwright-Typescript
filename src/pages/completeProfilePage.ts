import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { DataUtils } from '../utils/dataUtils';
import { Locator, Page } from '@playwright/test';

export class CompleteProfile {
  readonly page: Page;
  commonPage: CommonPage;
  readonly btnConfirm: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnConfirm = page.locator('//button[text()="Confirm"]');
  }

  async clickConfirmButton() {
    await this.btnConfirm.click();
  }

  async selectDataToCompleteACandidateProfile() {
    const dataUtils = new DataUtils();
    const recruitmentInfo = await dataUtils.getCandidateDataByType('full').recruitmentInfo;

    //Campaign
    await this.commonPage.selectDropdownValue(
      'Campaign',
      recruitmentInfo.campaign !== undefined ? recruitmentInfo.campaign : '',
    );

    //Assigned TA Executive
    await this.commonPage.selectDropdownValue(
      'Assigned TA Executive',
      recruitmentInfo.campaign !== undefined ? recruitmentInfo.campaign : '',
    );
  }
}
