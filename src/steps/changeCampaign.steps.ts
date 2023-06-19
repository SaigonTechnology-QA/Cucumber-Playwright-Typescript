import { ICustomWorld } from '../support/custom-world';
import { CampaignPage } from '../pages/campaignPage';
import { CreateCampaignPage } from '../pages/createNewCampaignPage';
import { NewApplicants } from '../pages/newApplicantsPage';
import { CreateNewApplicants } from '../pages/createNewCandidate';
import { CommonPage } from '../pages/commonPage';
import { InterviewProcessPage } from '../pages/interviewProcessPage';
import { ChangeCampaignPage } from '../pages/changeCampaignPage';
import { Given, When } from '@cucumber/cucumber';
let firstCampaignName = '';
let secondCampaignName = '';
let applicantEmail = '';

Given(
  'I create a first campaign with the required fields and move it to Pending tab',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    await campaignPage.goto();
    await campaignPage.clickAddNewCampaignButton();
    await createCampaignPage.createNewCampaignWithRequiredFields();
    firstCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
    //copy firstCampaign to env variable
    process.env.firstCampaignName = firstCampaignName;
    //Move to Pending Tab
    await campaignPage.searchCampaignName(firstCampaignName);
    await campaignPage.clickToggleButtonbyCampaignName(firstCampaignName, 'Submit');
    await commonPage.clickCommonButton('Yes');
  },
);

Given(
  'I create a second campaign with the required fields and move it to Pending tab',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    await campaignPage.goto();
    await campaignPage.clickAddNewCampaignButton();
    await createCampaignPage.createNewCampaignWithRequiredFields();
    secondCampaignName =
      process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
    //copy firstCampaign to env variable
    process.env.secondCampaignName = secondCampaignName;
    //Move to Pending Tab
    await campaignPage.searchCampaignName(secondCampaignName);
    await campaignPage.clickToggleButtonbyCampaignName(secondCampaignName, 'Submit');
    await commonPage.clickCommonButton('Yes');
  },
);

Given(
  'I create a new applicant with the first campaign in the Scan CV round of Interview Process page',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants('', 'required', 'link', '');
    await commonPage.selectDropdownValue('Campaign', firstCampaignName);
    applicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);

Given('I move the first campaign to Active status', async function (this: ICustomWorld) {
  const page = this.page!;
  const changeCampaignPage = new ChangeCampaignPage(page, this);
  const commonPage = new CommonPage(page, this);
  //Go to Campaign Page
  await commonPage.goto('campaign');
  //Change status from Pending to Active
  await changeCampaignPage.changeCampaignStatusFromPendingToActive(firstCampaignName);
});

Given('I move the second campaign to Active status', async function (this: ICustomWorld) {
  const page = this.page!;
  const changeCampaignPage = new ChangeCampaignPage(page, this);
  const commonPage = new CommonPage(page, this);
  //Go to Campaign Page
  await commonPage.goto('campaign');
  //Change status from Pending to Active
  await changeCampaignPage.changeCampaignStatusFromPendingToActive(secondCampaignName);
});

When('I go to Interview Process page', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.goto('interview-process');
});

When('I select my first campaign', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await await interviewProcessPage.selectCampaignOptionOnInterviewProcessPage(firstCampaignName);
});

When(
  'I click on "Change campaign" option in the hamburger menu button of the existing candidate in tab Scan CV',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    //Search email applicant
    await commonPage.searchByNameEmailSocial(applicantEmail);
    //Click on Change campaign option
    await commonPage.clickOnOptionOnContextBurgerMenu('Change campaign');
  },
);

When(
  'I input required fields in Change Campaign modal with the second campaign and Interview Round is <Job Skill Interview> and Interview Status is <Waiting>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const changeCampaignPage = new ChangeCampaignPage(page, this);
    //update info on Change Campaign Modal
    await changeCampaignPage.updateDataOnChangeCampaignModal(secondCampaignName, 1, 0);
  },
);

When('I click on Confirm button in Change Campaign modal', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.clickCommonButton('Confirm');
});

When(
  'the "Campaign changed" message should be displayed and the candidate should be moved to the second campaign and in <Job Skill Interview> tab with <Waiting> status',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    //Check "Campaign changed" is displayed
    const commonPage = new CommonPage(page, this);
    await commonPage.checkToastMessageContent('Campaign changed');
    //Verify that the canditate should move to changed campaign and display on Job Interview Skill Tab
    await interviewProcessPage.checkCandidateIsDisplayedOnAInterviewProcessTab(
      secondCampaignName,
      applicantEmail,
      'Job Skill Interview',
    );
    //Verify that the status is with <Waiting> status
    await interviewProcessPage.verifyStatusOfCandidateOnProcessTab('Waiting');
  },
);

When(
  'I create a new applicant with the first campaign in the Job Skill Interview round of Interview Process page',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants('', 'required', 'link', '');
    await commonPage.selectDropdownValue('Campaign', firstCampaignName);
    await createNewApplicants.selectInterviewRound('Job Skill Interview');
    applicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);

When(
  'I create a new applicant with the first campaign in the TA Interview round of Interview Process page',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants('', 'full', 'link', firstCampaignName);
    await createNewApplicants.selectInterviewRound('TA Interview');
    applicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);

When('I click on Job Skill Interview tab', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await interviewProcessPage.clickOnCampaignProcessTab('Job Skill Interview');
});

When('I click on TA Interview tab', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await interviewProcessPage.clickOnCampaignProcessTab('TA Interview');
});

When(
  'I click on "Update campaign" option in the hamburger menu button of the candidate',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    //Search email applicant
    await commonPage.searchByNameEmailSocial(applicantEmail);
    //Click on Change campaign option
    await commonPage.clickOnOptionOnContextBurgerMenu('Update campaign');
  },
);

When(
  'I input required fields in Change Campaign modal with the second campaign and Interview Round is <Scan CV> and Interview Status is <Processing>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const changeCampaignPage = new ChangeCampaignPage(page, this);
    //update info on Change Campaign Modal
    await changeCampaignPage.updateDataOnChangeCampaignModal(secondCampaignName, 0, 3);
  },
);

When(
  'the "Campaign changed" message should be displayed and the candidate should be moved to the second campaign and in <Scan CV> tab with <Processing> status',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    //Check "Campaign changed" is displayed
    const commonPage = new CommonPage(page, this);
    await commonPage.checkToastMessageContent('Campaign changed');
    //Verify that the canditate should moved to the second campaign and in <Scan CV> tab
    await interviewProcessPage.checkCandidateIsDisplayedOnAInterviewProcessTab(
      secondCampaignName,
      applicantEmail,
      'Scan CV',
    );
    //Verify that the status is with <Processing> status
    await interviewProcessPage.verifyStatusOfCandidateOnProcessTab('Processing');
  },
);
