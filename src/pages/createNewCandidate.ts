import { CommonPage } from './commonPage';
import { DataUtils } from '../utils/dataUtils';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { expect, Locator, Page } from '@playwright/test';

export class CreateNewApplicants {
  readonly page: Page;
  commonPage: CommonPage;

  //Recruitment Info
  readonly btnAddSkill: Locator;
  readonly checkboxPrimarySkill: Locator;
  //Basic Info
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtEmail: Locator;
  readonly txtPhoneNumber: Locator;
  readonly txt2ndEmail: Locator;
  readonly txt2ndPhoneNumber: Locator;
  readonly txtSkype: Locator;
  readonly txtLinkedIn: Locator;
  readonly txtFacebook: Locator;
  readonly txtGitHub: Locator;
  readonly txtAddress: Locator;
  readonly txtNote: Locator;
  //Resume
  readonly btnUpload: Locator;
  readonly inputUpload: Locator;
  readonly tabItemWWedAddress: Locator;
  readonly linkAddNewLink: Locator;
  readonly txtName: Locator;
  readonly txtLink: Locator;
  readonly btnSave: Locator;
  readonly btnSaveAndClose: Locator;
  readonly btnWebUrl: Locator;
  readonly btnAddNewLink: Locator;
  readonly txtAttachmentName: Locator;
  readonly txtAttachmentLink: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(this.page, iCustomWorld);
    //Recruitment Info
    this.btnAddSkill = page.locator("//button[normalize-space(text())='Add']");
    this.checkboxPrimarySkill = page.locator("//*[normalize-space(text())='Primary Skill']/../div");
    //Basic Info
    this.txtFirstName = page.locator("//*[@id='first-name']");
    this.txtLastName = page.locator("//*[@id='last-name']");
    this.txtEmail = page.locator("//*[@id='primaryEmail']");
    this.txtPhoneNumber = page.locator("//*[@id='primaryPhoneNumber']");
    this.txt2ndEmail = page.locator("//*[@id='secondaryEmail']");
    this.txt2ndPhoneNumber = page.locator("//*[@id='secondaryPhoneNumber']");
    this.txtSkype = page.locator("//*[@id='skype']");
    this.txtLinkedIn = page.locator("//*[@id='linkedIn']");
    this.txtFacebook = page.locator("//*[@id='facebook']");
    this.txtGitHub = page.locator("//*[@id='github']");
    this.txtAddress = page.locator("//*[@id='address']");
    this.txtNote = page.locator("//*[@id='note']");
    //Resume
    this.btnUpload = page.locator("//*[normalize-space(text())= 'Choose files to upload']");
    this.inputUpload = page.locator("//*[normalize-space(text())= 'Choose files to upload']/input");
    //link
    this.tabItemWWedAddress = page.locator("//*[@id='url-tab']");
    this.linkAddNewLink = page.locator("//*[normalize-space(text())= 'Add New Link']");
    this.txtName = page.locator("//label[normalize-space(text())='Name']/following-sibling::input");
    this.txtLink = page.locator("//label[normalize-space(text())='Link']/following-sibling::input");
    //Attachment
    this.btnWebUrl = page.locator('#url-tab');
    this.btnAddNewLink = page.locator('//button[@class="btn-add-new"]');
    this.txtAttachmentName = page.locator('//input[@formcontrolname="name"]');
    this.txtAttachmentLink = page.locator('//input[@formcontrolname="link"]');
    this.btnSave = page.locator("//button[normalize-space(text())='Save']");
    this.btnSaveAndClose = page.locator("//button[normalize-space(text())='Save & Close']");
  }
  async createNewApplicants(
    emptyFieldName: string,
    inputType: 'full' | 'required',
    attachmentType: 'file' | 'link',
  ) {
    const dataUtils = new DataUtils();
    const recruitmentInfo = await dataUtils.getCandidateDataByType('full').recruitmentInfo;
    const basicInfo = await dataUtils.getCandidateDataByType('full').basicInfo;
    const attachment = await dataUtils.getCandidateDataByType('full').attachment;
    //Source
    if (emptyFieldName !== 'Source') {
      await this.commonPage.selectDropdownValue('Source', recruitmentInfo.source);
    }
    //Skills
    if (emptyFieldName !== 'Skills') {
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.primarySkills[0]);
      await this.checkboxPrimarySkill.click();
      await this.btnAddSkill.click();
      await this.checkboxPrimarySkill.click();
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.skills[0]);
      await this.btnAddSkill.click();
      await this.commonPage.selectDropdownValue('Skills', recruitmentInfo.skills[1]);
      await this.btnAddSkill.click();
    }
    //Working Location
    if (emptyFieldName !== 'Working Location' && inputType === 'required') {
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
    if (emptyFieldName !== 'First name') {
      await this.txtFirstName.clear();
      await this.txtFirstName.fill(basicInfo.firstName);
    }
    //Last Name
    if (emptyFieldName !== 'Last name') {
      await this.txtLastName.clear();
      await this.txtLastName.fill(basicInfo.lastName);
    }
    //Email
    if (emptyFieldName !== 'Email') {
      process.env.candidateApplicantEmail = await dataUtils.getEmail();
      await this.txtEmail.clear();
      await this.txtEmail.fill(process.env.candidateApplicantEmail);
    }
    //Phone Number
    if (emptyFieldName !== 'Phone number') {
      process.env.candidatePhone = await dataUtils.getPhoneNumber();
      await this.txtPhoneNumber.clear();
      await this.txtPhoneNumber.fill(process.env.candidatePhone);
    }
    //Birth Year
    if (emptyFieldName !== 'Birth year') {
      await this.commonPage.selectDropdownValue('Birth Year', basicInfo.birthYear);
    }
    //Upload button
    if (emptyFieldName !== 'Attachment' && attachmentType === 'file') {
      await this.inputUpload.setInputFiles(config.UPLOAD_FOLDER + '/' + attachment.resumeFile);
    }
    //Web address -> link
    if (emptyFieldName !== 'Web Address' && attachmentType === 'link') {
      await this.tabItemWWedAddress.scrollIntoViewIfNeeded();
      await this.tabItemWWedAddress.click();
      await this.linkAddNewLink.click();
      await this.txtName.clear();
      await this.txtName.fill(attachment.webAddress.name);
      await this.txtLink.clear();
      await this.txtLink.fill(attachment.webAddress.link);
      await this.page.mouse.click(200, 200);
      await expect(
        this.page.locator("//*[normalize-space(text())= '" + attachment.webAddress.name + "']"),
      ).toBeVisible();
    }
    if (inputType === 'full') {
      //Campaign
      await this.commonPage.selectDropdownValue(
        'Campaign',
        recruitmentInfo.campaign != undefined ? recruitmentInfo.campaign : '',
      );
      //Assigned TA Executive
      await this.commonPage.selectDropdownValue(
        'Assigned TA Executive',
        recruitmentInfo.assignedTAExecutive,
      );
      //2nd Email
      await this.txt2ndEmail.clear();
      await this.txt2ndEmail.fill(await dataUtils.getEmail());
      //2nd Phone Number
      await this.txt2ndPhoneNumber.clear();
      await this.txt2ndPhoneNumber.fill(await dataUtils.getPhoneNumber());
      //Skype
      await this.txtSkype.clear();
      await this.txtSkype.fill(basicInfo.skype != undefined ? basicInfo.skype : '');
      //LinkedIn
      await this.txtLinkedIn.clear();
      await this.txtLinkedIn.fill(basicInfo.linkedIn != undefined ? basicInfo.linkedIn : '');
      //Facebook
      await this.txtFacebook.clear();
      await this.txtFacebook.fill(basicInfo.facebook != undefined ? basicInfo.facebook : '');
      //Address
      await this.txtAddress.clear();
      await this.txtAddress.fill(basicInfo.address != undefined ? basicInfo.address : '');
      //Note
      await this.txtNote.clear();
      await this.txtNote.fill(basicInfo.note != undefined ? basicInfo.note : '');
      //Github
      await this.txtGitHub.clear();
      await this.txtGitHub.fill(basicInfo.github != undefined ? basicInfo.github : '');
    }
  }
  async inputExistedEmail(email: string) {
    await this.txtEmail.clear();
    await this.txtEmail.fill(email);
  }
  async inputExistedPhoneNumber(phoneNumber: string) {
    await this.txtPhoneNumber.clear();
    await this.txtPhoneNumber.fill(phoneNumber);
  }
  async clickOnCommonButton(buttonName: string) {
    if (buttonName === 'Save') {
      await this.btnSave.scrollIntoViewIfNeeded();
      await this.btnSave.click();
      await this.page.waitForEvent('response');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState();
      await this.page.waitForLoadState('domcontentloaded');
    }
    if (buttonName === 'Save & Close') {
      await this.btnSaveAndClose.scrollIntoViewIfNeeded();
      await this.btnSaveAndClose.click();
      await this.page.waitForEvent('response');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }
}
