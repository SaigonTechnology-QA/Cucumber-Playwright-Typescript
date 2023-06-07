import { DataUtils } from './../utils/dataUtils';
import { ICustomWorld } from '../support/custom-world';
import { CommonPage } from '../pages/commonPage';
import { Locator, Page } from '@playwright/test';

export class CreateCampaignPage {
  readonly page: Page;

  commonPage: CommonPage;
  readonly txtName: Locator;
  readonly txtPurpose: Locator;
  readonly txtJobTitle: Locator;
  readonly txtJobDesc: Locator;
  readonly txtJobReq: Locator;
  readonly txtSalary: Locator;
  readonly txtSpecialBonusDetails: Locator;
  readonly txtKnowledge: Locator;
  readonly txtSkill: Locator;
  readonly txtAtt: Locator;
  readonly txtEnd: Locator;
  readonly txtTarger: Locator;
  readonly txtRequestDate: Locator;
  readonly txtDeadline: Locator;
  readonly txtTAInterviewQuestions: Locator;

  readonly btnSave: Locator;
  readonly btnCancel: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(this.page, iCustomWorld);
    this.txtName = page.getByLabel('Name *');
    this.txtPurpose = page.locator('[formcontrolname=purpose]');
    this.txtJobTitle = page.locator(
      '//label[contains(text(),"Job title")]/following-sibling::input',
    );
    this.txtJobDesc = page.locator(
      '//label[contains(text(),"Job Description")]/following-sibling::*//div[@role="textbox"]',
    );
    this.txtJobReq = page.locator(
      '//label[contains(text(),"Job Requirement")]/following-sibling::*//div[@role="textbox"]',
    );
    this.txtSalary = page.locator('//label[contains(text(),"Salary")]/following-sibling::input');
    this.txtSpecialBonusDetails = page.locator('[formcontrolname=specialBonusDetails]');
    this.txtKnowledge = page.locator(
      '//label[contains(text(),"Knowledge")]/following-sibling::*//div[@role="textbox"]',
    );
    this.txtSkill = page.locator(
      '//label[contains(text(),"Skill")]/following-sibling::*//div[@role="textbox"]',
    );
    this.txtAtt = page.locator(
      '//label[contains(text(),"Attitude")]/following-sibling::*//div[@role="textbox"]',
    );
    this.txtEnd = page.locator(
      '//label[contains(text(),"English")]/following-sibling::*//div[@role="textbox"]',
    );
    this.btnSave = page.locator('//button[contains(text()," Save") and contains(text(),"Close") ]');
    this.btnCancel = page.locator('//button[contains(text(),"Cancel") ]');
    this.txtTarger = page.locator('//label[contains(text(),"Target")]/following-sibling::input');
    this.txtRequestDate = page.locator(
      '//label[contains(text(),"Request Date")]/following-sibling::*//input',
    );
    this.txtDeadline = page.locator(
      '//label[contains(text(),"Deadline")]/following-sibling::*//input',
    );
    this.txtTAInterviewQuestions = page.locator(
      '//label[contains(text(),"TA Interview Questions")]/following-sibling::*//div[@role="textbox"]',
    );
  }

  async createNewCampaignWithExceptField(emptyFieldName: string) {
    const dataUtils = new DataUtils();
    const campaignData = await dataUtils.getCampaignDataByType('required').generalInfo;
    const campaignJobData = await dataUtils.getCampaignDataByType('required').jobDetails;
    const campaignInterviewquestionData = await dataUtils.getCampaignDataByType('required')
      .sampleInterviewQuestions;

    const dateString = await dataUtils.getDateString();
    const newCampaignName = campaignData.name + ' ' + dateString;

    process.env.newCampaignName = newCampaignName;
    process.env.campaignNamePrefix = campaignData.name;

    //Name

    await this.txtName.fill(newCampaignName);

    //Priority
    if (emptyFieldName !== 'Priority') {
      await this.commonPage.selectDropdownValue('Priority', campaignData.priority);
    }

    //Interviewer
    if (emptyFieldName !== 'Job Skill Interviewer') {
      await this.commonPage.selectDropdownValue(
        'Job Skill Interviewer',
        campaignData.jobSkillInterviewer,
      );
    }

    //Department
    if (emptyFieldName !== 'Department') {
      await this.commonPage.selectDropdownValue('Department', campaignData.department);
    }
    //Contract Type
    if (emptyFieldName !== 'Contract type') {
      await this.commonPage.selectDropdownValue('Contract type', campaignData.contractType);
    }

    //Difficulty Level
    if (emptyFieldName !== 'Difficulty Level') {
      process.env.userRole !== undefined ? process.env.userRole : '';
      if (process.env.userRole == 'TA Manager') {
        await this.commonPage.selectDropdownValue('Difficulty Level', campaignData.difficultyLevel);
      }
    }

    //Job Title
    await this.txtJobTitle.fill(campaignJobData.jobTitle);

    //Job Desc
    await this.txtJobDesc.type(campaignJobData.jobDescription);

    //Job Req
    await this.txtJobReq.type(campaignJobData.jobRequirement);

    //Primary Skills
    if (emptyFieldName !== 'Primary Skills') {
      await this.commonPage.selectDropdownValue('Primary Skills', campaignJobData.primarySkills);
    }

    //Levels
    if (emptyFieldName !== 'Levels') {
      await this.commonPage.selectDropdownValue('Levels', campaignJobData.levels);
    }
    //Location
    if (emptyFieldName !== 'Location') {
      await this.commonPage.selectDropdownValue('Location', campaignJobData.location);
    }

    //Salary
    await this.txtSalary.fill(campaignJobData.salary);

    //Knowledge
    await this.txtKnowledge.type(campaignInterviewquestionData.knowledge);

    //Skill
    await this.txtSkill.type(campaignInterviewquestionData.skillExperience);

    //Att
    await this.txtAtt.type(campaignInterviewquestionData.attitude);

    //Eng
    await this.txtEnd.type(campaignInterviewquestionData.english);

    switch (emptyFieldName) {
      case 'Name': {
        await this.txtName.clear();
        break;
      }
      case 'Job Description': {
        await this.commonPage.clearTextField(this.txtJobDesc);
        break;
      }
      case 'Job Requirement': {
        await this.commonPage.clearTextField(this.txtJobReq);
        break;
      }
      case 'Knowledge': {
        await this.commonPage.clearTextField(this.txtKnowledge);
        break;
      }
      case 'Job title': {
        await this.txtJobTitle.clear();
        break;
      }
      case 'Salary': {
        await this.txtSalary.clear();
        break;
      }
      case 'Skill/Experience': {
        await this.commonPage.clearTextField(this.txtSkill);
        break;
      }
      case 'Attitude': {
        await this.commonPage.clearTextField(this.txtAtt);
        break;
      }
      case 'English': {
        await this.commonPage.clearTextField(this.txtEnd);
        break;
      }
      case 'Target': {
        await this.txtTarger.clear();
        break;
      }
      case 'Request Date': {
        await this.txtRequestDate.clear();
        break;
      }
      case 'Deadline': {
        await this.txtDeadline.clear();
        break;
      }
    }
  }
  async clickSave() {
    //Save
    await this.btnSave.click();
    await this.page.waitForLoadState();
  }

  async clickCancel() {
    //Save
    await this.btnCancel.click();
  }
  async createNewCampaignWithRequiredFields() {
    await this.createNewCampaignWithExceptField('');
    await this.clickSave();
  }
  async createNewCampaignWithFullFields(emptyFieldName: string) {
    const dataUtils = new DataUtils();
    const campaignData = await dataUtils.getCampaignDataByType('full_data').generalInfo;
    const campaignReDetailData = await dataUtils.getCampaignDataByType('full_data')
      .recruiterDetails;
    const campaignJobData = await dataUtils.getCampaignDataByType('full_data').jobDetails;
    const campaignInterviewquestionData = await dataUtils.getCampaignDataByType('full_data')
      .sampleInterviewQuestions;

    //Manager
    if (emptyFieldName !== 'Manager') {
      await this.commonPage.selectDropdonwValueForNotMandatoryFields(
        'Manager',
        campaignData.manager,
      );
    }
    //Purpose
    await this.txtPurpose.fill(campaignData.purpose != undefined ? campaignData.purpose : '');

    //Projects
    if (emptyFieldName !== 'Projects') {
      await this.commonPage.selectDropdonwValueForNotMandatoryFields(
        'Projects',
        campaignData.projects != undefined ? campaignData.projects : '',
      );
    }

    //TA Executive
    if (emptyFieldName !== 'TA Executive') {
      process.env.userRole !== undefined ? process.env.userRole : '';
      if (process.env.userRole == 'TA Manager') {
        await this.commonPage.selectDropdonwValueForNotMandatoryFields(
          'TA Executive',
          campaignReDetailData.taExecutive != undefined ? campaignReDetailData.taExecutive : '',
        );
      }
    }
    //TA Executive
    if (emptyFieldName !== 'Primary TA Executive') {
      if (process.env.userRole == 'TA Manager') {
        await this.commonPage.selectDropdonwValueForNotMandatoryFields(
          'Primary TA Executive',
          campaignReDetailData.primaryTAExecutive != undefined
            ? campaignReDetailData.primaryTAExecutive
            : '',
        );
      }
    }
    //Special Bonus
    if (emptyFieldName !== 'Special Bonus') {
      await this.commonPage.selectDropdonwValueForNotMandatoryFields(
        'Special Bonus',
        campaignJobData.specialBonus != undefined ? campaignJobData.specialBonus : '',
      );
    }
    //Special Bonus Details
    await this.txtSpecialBonusDetails.fill(
      campaignJobData.specialBonusDetails != undefined ? campaignJobData.specialBonusDetails : '',
    );

    //Special Bonus Details
    await this.txtTAInterviewQuestions.fill(
      campaignInterviewquestionData.taInterviewQuestions != undefined
        ? campaignInterviewquestionData.taInterviewQuestions
        : '',
    );
    await this.createNewCampaignWithExceptField('');
  }

  async createNewCampaignWithFullFieldsMain() {
    await this.createNewCampaignWithFullFields('');
    await this.clickSave();
  }

  async createNewCampaignWithCampaignName(campaignName: string) {
    await this.createNewCampaignWithExceptField('');
    const dataUtils = new DataUtils();
    const dateString = await dataUtils.getDateString();
    const newCampaignName = campaignName + ' ' + dateString;
    process.env.existingCampaignName = newCampaignName;

    await this.txtName.clear();
    await this.txtName.fill(newCampaignName);

    await this.clickSave();
  }

  async createNewCampaignWithExistingCampaignName() {
    await this.createNewCampaignWithExceptField('');

    const newCampaignName =
      process.env.existingCampaignName !== undefined ? process.env.existingCampaignName : '';
    process.env.newCampaignName = process.env.existingCampaignName;

    await this.txtName.clear();
    await this.txtName.fill(newCampaignName);

    await this.clickSave();
  }
  async updateCampaignWithRequireField() {
    const dataUtils = new DataUtils();
    const campaignJobData = await dataUtils.getCampaignDataByType('required').jobDetails;
    const campaignInterviewquestionData = await dataUtils.getCampaignDataByType('required')
      .sampleInterviewQuestions;
    const newCampaignName =
      process.env.existingCampaignName !== undefined ? process.env.existingCampaignName : '';
    process.env.newCampaignName = process.env.existingCampaignName;

    //clear & update Name
    await this.commonPage.clearTextField(this.txtName);
    await this.txtName.fill(newCampaignName + '_updated');

    //clear & update Job Title
    await this.commonPage.clearTextField(this.txtJobTitle);
    await this.txtJobTitle.fill(campaignJobData.jobTitle + '_updated');

    //clear & update Knowledge
    await this.commonPage.clearTextField(this.txtKnowledge);
    await this.txtKnowledge.type(campaignInterviewquestionData.knowledge + '_updated');
  }
}
