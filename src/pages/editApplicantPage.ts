import { CommonPage } from './commonPage';
import { NewApplicants } from './newApplicantsPage';
import { ICustomWorld } from '../support/custom-world';
import { DataUtils } from '../utils/dataUtils';
import { Locator, Page } from '@playwright/test';

export class EditApplicantPage {
  readonly page: Page;
  readonly txtSearchApplicant: Locator;
  readonly btnShowActionBurger: Locator;
  readonly btnEditApplicant: Locator;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtPrimaryEmail: Locator;
  readonly txtPrimaryPhoneNumber: Locator;
  readonly btnEditSkillIcon: Locator;
  readonly btnSaveSkill: Locator;
  commonPage: CommonPage;
  newApplicantPage: NewApplicants;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.txtSearchApplicant = page.locator(
      '//input[@placeholder="Name, email, linkedIn, github, facebook"]',
    );
    this.btnShowActionBurger = page.locator('//button[@title="Click to show actions"]');
    this.btnEditApplicant = page.locator('//button/span[contains(text(),"Edit applicant")]');
    this.txtFirstName = page.locator('input[name="firstName"]');
    this.txtLastName = page.locator('input[name="lastName"]');
    this.txtPrimaryEmail = page.locator('input[formcontrolname="primaryEmail"]');
    this.txtPrimaryPhoneNumber = page.locator('input[formcontrolname="primaryPhoneNumber"]');
    this.btnEditSkillIcon = page.locator('//button[@title="Edit"]');
    this.btnSaveSkill = page.locator(
      '//div[@class="col-12 p-0 footer"]//child::button[starts-with(normalize-space(text()),"Save")]',
    );
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.newApplicantPage = new NewApplicants(page, iCustomWorld);
  }

  async updateApplicantWithRequireField() {
    const dataUtils = new DataUtils();
    const applicantData = dataUtils.getCandidateDataByType('required').recruitmentInfo;
    const applicantCandidateData = dataUtils.getCandidateDataByType('required').basicInfo;

    //clear & update First Name
    await this.commonPage.clearTextField(this.txtFirstName);
    await this.txtFirstName.fill(applicantCandidateData.firstName + ' updated');

    //clear & update Last Name
    await this.commonPage.clearTextField(this.txtLastName);
    await this.txtLastName.fill(applicantCandidateData.lastName + ' updated');

    //clear & update Email
    await this.commonPage.clearTextField(this.txtPrimaryEmail);
    process.env.candidateEmailUpdate = await dataUtils.getEmail();
    await this.txtPrimaryEmail.fill(process.env.candidateEmailUpdate);

    //clear & update Phone Number
    await this.commonPage.clearTextField(this.txtPrimaryPhoneNumber);
    process.env.candidatePhoneUpdate = await dataUtils.getPhoneNumber();
    await this.txtPrimaryPhoneNumber.fill(process.env.candidatePhoneUpdate);

    //Update Location
    await this.commonPage.selectDropdownWithLastFoundValue(
      'Location',
      applicantData.workingLocation,
    );

    //Update Skill
    await this.updateSkillOnApplicant(applicantData.skills[0]);
  }

  async updateSkillOnApplicant(newSkill: string) {
    //Click on Edit icon
    await this.btnEditSkillIcon.click();
    //Select new skill
    await this.commonPage.selectDropdownWithLastFoundValue('Skill Name', newSkill);
    //Click on Save skill CTA
    await this.btnSaveSkill.click();
  }
}
