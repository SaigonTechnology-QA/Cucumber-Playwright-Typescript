import { ICustomWorld } from '../support/custom-world';
import { NewApplicants } from '../pages/newApplicantsPage';
import { CreateNewApplicants } from '../pages/createNewCandidate';
import { InterviewProcessPage } from '../pages/interviewProcessPage';
import { CampaignPage } from '../pages/campaignPage';
import { CreateCampaignPage } from '../pages/createNewCampaignPage';
import { CommonPage } from '../pages/commonPage';
import { ChangeCampaignPage } from '../pages/changeCampaignPage';
import { LoginPage } from '../pages/loginPage';
import { Then, When } from '@cucumber/cucumber';
let firstCampaignName = '';
let secondCampaignName = '';
let firstApplicantEmail = '';
let secondApplicantEmail = '';

When(
  'I create a first new applicant with the first campaign with round is <Scan CV> and with status is <Processing>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    firstCampaignName =
      process.env.firstCampaignName !== undefined ? process.env.firstCampaignName : '';
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants('', 'full', 'link', firstCampaignName);
    firstApplicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);
When(
  'I create a second new applicant with the second campaign with round is <Job Skill Interview> and with status is <Waiting>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    secondCampaignName =
      process.env.secondCampaignName !== undefined ? process.env.secondCampaignName : '';
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants('', 'full', 'link', secondCampaignName);
    await createNewApplicants.selectInterviewRound('Job Skill Interview');
    secondApplicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);
Then(
  'Then I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer and see the first candidate with status is <Processing>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.verifyRoundsIsDisplay(
      'Scan CV',
      'Job Skill Interview',
      'TA Interview',
      'Send Offer',
    );
    await interviewProcessPage.searchNewApplicant(firstApplicantEmail);
    await interviewProcessPage.verifyStatusOfCandidate(4, 'Processing');
  },
);

When('I select my second campaign', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await await interviewProcessPage.selectCampaignOptionOnInterviewProcessPage(secondCampaignName);
});
Then(
  'I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.verifyRoundsIsDisplay(
      'Scan CV',
      'Job Skill Interview',
      'TA Interview',
      'Send Offer',
    );
  },
);
Then(
  'I should can see the second candidate with status is <Waiting>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.searchNewApplicant(secondApplicantEmail);
    await interviewProcessPage.verifyStatusOfCandidate(8, 'Waiting');
  },
);
When(
  'I create a campaign with the required fields and name <campaign_name> and move it to Pending tab',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    await campaignPage.goto();
    await campaignPage.clickAddNewCampaignButton();
    await createCampaignPage.createNewCampaignWithRequiredFields();
    //Move to Pending Tab
    await campaignPage.searchCampaignName(process.env.newCampaignName as string);
    await campaignPage.clickToggleButtonbyCampaignName(
      process.env.newCampaignName as string,
      'Submit',
    );
    await commonPage.clickCommonButton('Yes');
  },
);
When(
  'I add TA Executive <TAE> and move the campaign <campaign_name> to Active status',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const changeCampaignPage = new ChangeCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    //Go to Campaign Page
    await commonPage.goto('campaign');
    await changeCampaignPage.addTAExecutiveFromUserFile(process.env.newCampaignName as string);
    //Change status from Pending to Active
    await changeCampaignPage.changeCampaignStatusFromPendingToActive(
      process.env.newCampaignName as string,
    );
  },
);
When(
  'I create a new applicant with campaign <campaign_name> in the <Scan CV> round and with status is <Processing>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants(
      '',
      'full',
      'link',
      process.env.newCampaignName as string,
    );
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);
When('I select my campaign <campaign_name>', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await await interviewProcessPage.selectCampaignOptionOnInterviewProcessPage(
    process.env.newCampaignName as string,
  );
});
Then(
  'I should can see rounds: Scan CV, Job Skill Interview, TA Interview, Send Offer and I can see the candidate with status is <Processing>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.verifyRoundsIsDisplay(
      'Scan CV',
      'Job Skill Interview',
      'TA Interview',
      'Send Offer',
    );
    await interviewProcessPage.searchNewApplicant(process.env.candidateApplicantEmail as string);
    await interviewProcessPage.verifyStatusOfCandidate(4, 'Processing');
  },
);
When('I click on <Job Skill Interview> tab', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await interviewProcessPage.clickOnCampaignProcessTab('Job Skill Interview');
});

When('I move the campaign <campaign_name> to Active status', async function (this: ICustomWorld) {
  const page = this.page!;
  const changeCampaignPage = new ChangeCampaignPage(page, this);
  const commonPage = new CommonPage(page, this);
  //Go to Campaign Page
  await commonPage.goto('campaign');
  //Change status from Pending to Active
  await changeCampaignPage.changeCampaignStatusFromPendingToActive(
    process.env.newCampaignName as string,
  );
});
When(
  `I sign in with role {string} not belonging to campaign <campaign_name>`,
  async function (this: ICustomWorld, role: string) {
    const page = this.page!;
    const loginPage = new LoginPage(page);
    await loginPage.loginByRole(role);
  },
);
When(
  `I input <campaign_name> in "Select Campaign" dropdown list`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.inputCampaignToDropDownlist(process.env.newCampaignName as string);
  },
);
Then(`I cannot see <campaign_name> in dropdown list`, async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await interviewProcessPage.verifyNoCampaignFound();
});

When(
  `I create a campaign with the required fields and name <campaign_name> and Job Skill Interviewer <JSI1> and move it to Pending tab`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    await campaignPage.goto();
    await campaignPage.clickAddNewCampaignButton();
    await createCampaignPage.createNewCampaignWithJSFromUser();
    //Move to Pending Tab
    await campaignPage.searchCampaignName(process.env.newCampaignName as string);
    await campaignPage.clickToggleButtonbyCampaignName(
      process.env.newCampaignName as string,
      'Submit',
    );
    await commonPage.clickCommonButton('Yes');
  },
);
When(
  `I create a new applicant with campaign <campaign_name> in the <Job SKill Interview> round and with status is <Waiting>`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await newApplicants.goto();
    await newApplicants.goToNewCandidatePage();
    await createNewApplicants.createNewApplicants(
      '',
      'full',
      'link',
      process.env.newCampaignName as string,
    );
    await createNewApplicants.selectInterviewRound('Job Skill Interview');
    secondApplicantEmail =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await createNewApplicants.clickOnCommonButton('Save & Close');
  },
);
Then(
  'I should can see the candidate with status is <Waiting>',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.searchNewApplicant(secondApplicantEmail);
    await interviewProcessPage.verifyStatusOfCandidate(8, 'Waiting');
  },
);

Then('I should can see rounds: Scan CV, Job Skill Interview', async function (this: ICustomWorld) {
  const page = this.page!;
  const interviewProcessPage = new InterviewProcessPage(page, this);
  await interviewProcessPage.verifyRoundsIsDisplay('Scan CV', 'Job Skill Interview');
});

When(
  `I create a campaign with the required fields and name <campaign_name>  and Manager <Campaign Manager 1> and move it to Pending tab`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const campaignPage = new CampaignPage(page, this);
    const createCampaignPage = new CreateCampaignPage(page, this);
    const commonPage = new CommonPage(page, this);
    await campaignPage.goto();
    await campaignPage.clickAddNewCampaignButton();
    await createCampaignPage.createNewCampaignWithCampaignManagerFromUser();
    //Move to Pending Tab
    await campaignPage.searchCampaignName(process.env.newCampaignName as string);
    await campaignPage.clickToggleButtonbyCampaignName(
      process.env.newCampaignName as string,
      'Submit',
    );
    await commonPage.clickCommonButton('Yes');
  },
);
Then(
  `I can see campaign <campaign_name> in the "Select Campaign" dropdown`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const interviewProcessPage = new InterviewProcessPage(page, this);
    await interviewProcessPage.verifyCampaignIsDisplay(process.env.newCampaignName as string);
  },
);
