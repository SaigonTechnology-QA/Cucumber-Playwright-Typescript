import { CommonPage } from './commonPage';
import { DataUtils } from '../utils/dataUtils';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Locator, Page } from '@playwright/test';

export class CreateNewApplicants {
  readonly page: Page;
  commonPage: CommonPage;

  //Recruitment Info
  readonly btnAddSkill: Locator;
  readonly chkbxPrimarySkill: Locator;
  //Basic Info
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtEmail: Locator;
  readonly txtPhoneNumber: Locator;

  //Resume
  readonly btnUpload: Locator;
  readonly inputUpload: Locator;
  readonly tabItemWWedAdress: Locator;
  readonly txtName: Locator;
  readonly txtLinnk: Locator;
  readonly btnSave: Locator;
  readonly btnSaveAndClose: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(this.page, iCustomWorld);
    //Recruitment Info
    this.btnAddSkill = page.locator("//button[normalize-space(text())='Add']");
    this.chkbxPrimarySkill = page.locator("//*[normalize-space(text())='Primary Skill']/../div");
    //Basic Info
    this.txtFirstName = page.locator("//*[@id='first-name']");
    this.txtLastName = page.locator("//*[@id='last-name']");
    this.txtEmail = page.locator("//*[@id='primaryEmail']");
    this.txtPhoneNumber = page.locator("//*[@id='primaryPhoneNumber']");
    //Resume
    this.btnUpload = page.locator("//*[normalize-space(text())= 'Choose files to upload']");
    this.inputUpload = page.locator("//*[normalize-space(text())= 'Choose files to upload']/input");
    this.tabItemWWedAdress = page.locator("//*[@id='url-tab']");
    this.txtName = page.locator("//label[normalize-space(text())='Name']/following-sibling::input");
    this.txtLinnk = page.locator(
      "//label[normalize-space(text())='Link']/following-sibling::input",
    );
    this.btnSave = page.locator("//button[normalize-space(text())='Save']");
    this.btnSaveAndClose = page.locator("//button[normalize-space(text())='Save & Close']");
  }
  async createNewCampaignWithExceptField(emptyFieldName: string) {
    const dataUtils = new DataUtils();
    const recruitmentInfo = await dataUtils.getCandidateDataByType('required').recruitmentInfo;
    const basicInfo = await dataUtils.getCandidateDataByType('required').basicInfo;
    const attachment = await dataUtils.getCandidateDataByType('required').attachment;
    //Source
    if (emptyFieldName !== 'Source') {
      await this.commonPage.selectDropdownValue('Source', recruitmentInfo.source);
    }
    //Skills
    if (emptyFieldName !== 'Skills') {
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.primarySkills[0]);
      await this.chkbxPrimarySkill.click();
      await this.btnAddSkill.click();
      await this.chkbxPrimarySkill.click();
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.skills[0]);
      await this.btnAddSkill.click();
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.skills[1]);
      await this.btnAddSkill.click();
    }
    //Working Location
    if (emptyFieldName !== 'Working Location') {
      await this.commonPage.selectDropdownValue(
        'Working Location',
        recruitmentInfo.workingLocation,
      );
    }
    //Assigned TA Executive
    if (emptyFieldName !== 'Assigned TA Executive') {
      await this.commonPage.selectDropdownValue(
        'Assigned TA Executive',
        recruitmentInfo.assignedTAExecutive,
      );
    }
    //Basic Info
    //First Name
    if (emptyFieldName !== 'First Name') {
      await this.txtFirstName.clear();
      await this.txtFirstName.fill(basicInfo.firstName);
    }
    //Last Name
    if (emptyFieldName !== 'Last Name') {
      await this.txtLastName.clear();
      await this.txtLastName.fill(basicInfo.lastName);
    }
    //Email
    if (emptyFieldName !== 'Email') {
      process.env.candidateEmail = await dataUtils.getEmail();
      await this.txtEmail.clear();
      await this.txtEmail.fill(process.env.candidateEmail);
    }
    //Phone Number
    if (emptyFieldName !== 'Phone Number') {
      process.env.candidatePhone = await dataUtils.getPhoneNumber();
      await this.txtPhoneNumber.clear();
      await this.txtPhoneNumber.fill(process.env.candidatePhone);
      console.log(process.env.candidatePhone);
    }
    //Birth Year
    if (emptyFieldName !== 'Birth Year') {
      await this.commonPage.selectDropdownValue('Birth Year', basicInfo.birthYear);
    }
    //Upload button
    if (emptyFieldName !== 'Upload') {
      await this.inputUpload.setInputFiles(config.UPLOAD_FOLDER + '/' + attachment.resumeFile);
    }
  }
  async clickOnCommonButton(buttonName: string) {
    if (buttonName === 'Save') {
      await this.btnSave.scrollIntoViewIfNeeded();
      await this.btnSave.click();
      await this.page.waitForEvent('response');
      await this.page.waitForLoadState();
      await this.page.waitForLoadState('domcontentloaded');
    }
    if (buttonName === 'Save & Close') {
      await this.btnSaveAndClose.scrollIntoViewIfNeeded();
      await this.btnSaveAndClose.click();
      await this.page.waitForEvent('response');
      await this.page.waitForLoadState();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }
}
