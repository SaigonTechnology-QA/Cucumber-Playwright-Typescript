import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
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
    //Campaign
    await this.commonPage.selectDropdownValueWithFirstValue('Campaign');
    //Assigned TA Executive
    await this.commonPage.selectDropdownValueWithFirstValue('Assigned TA Executive');
    //Working Location
    await this.commonPage.selectDropdownValueWithFirstValue('Working location');
  }
}