import { NewApplicants } from '../pages/newApplicantsPage';
import { ICustomWorld } from '../support/custom-world';
import { CreateNewApplicants } from '../pages/createNewCandidate';
import { CandidatePool } from '../pages/candidatePoolPage';
import { CommonPage } from '../pages/commonPage';
import { InterviewProcess } from '../pages/interviewProcess';
import { When, Then } from '@cucumber/cucumber';

When(`I go to New Applicants page`, async function (this: ICustomWorld) {
  const page = this.page!;
  const newApplicants = new NewApplicants(page, this);
  await newApplicants.goto();
});
When(`I click on "Add New Candidate" button`, async function (this: ICustomWorld) {
  const page = this.page!;
  const newApplicants = new NewApplicants(page, this);
  await newApplicants.goToNewCandidatePage();
});
When(
  `I create New Candidate with all the required fields and the attachment is a file`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewApplicants('', 'required', 'file');
  },
);
When(
  `I input email {string} in Applicants page`,
  async function (this: ICustomWorld, email: string) {
    const page = this.page!;
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.txtEmail.fill(email);
  },
);
When(
  `I create successfully an applicant with email {string}`,
  async function (this: ICustomWorld, email: string) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewApplicants('', 'required', 'file');
    await createNewApplicants.txtEmail.fill(email);
    await commonPage.clickCommonButton('Save');
  },
);
When(
  `I create New Candidate with all the required fields but except {string} field`,
  async function (this: ICustomWorld, fieldName: string) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewApplicants(fieldName, 'required', 'file');
    await commonPage.clickCommonButton('Save');
  },
);
When(`I click on {string} common button`, async function (this: ICustomWorld, buttonName: string) {
  const page = this.page!;
  const createNewApplicants = new CreateNewApplicants(page, this);
  await createNewApplicants.clickOnCommonButton(buttonName);
});
Then(
  `the newly created applicant should be displayed in Candidate Pool page`,
  async function (this: ICustomWorld) {
    const email =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const page = this.page!;
    const candidatePool = new CandidatePool(page, this);
    await candidatePool.goto();
    await candidatePool.searchCandidate(email);
    const commonPage = new CommonPage(page, this);
    await commonPage.checkCandidateNameInfo(2);
  },
);
When(
  `I create New Candidate with all the required fields with the attachment is a link`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewApplicants('', 'required', 'link');
  },
);
Then(
  `the newly created applicant should be displayed on New Applicant List`,
  async function (this: ICustomWorld) {
    const email =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const page = this.page!;
    const newApplicantsPage = new NewApplicants(page, this);
    await newApplicantsPage.goto();
    await newApplicantsPage.searchNewApplicant(email);
    const commonPage = new CommonPage(page, this);
    await commonPage.checkCandidateNameInfo(2);
  },
);
Then(
  'the {string} message should be displayed next to {string} field in Create New Candidate page',
  async function (this: ICustomWorld, errorMessage: string, fieldName: string) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    if (fieldName == 'Attachment')
      await commonPage.checkErrorMessagebyFieldName(fieldName, errorMessage, false);
    else await commonPage.checkErrorMessagebyFieldName(fieldName, errorMessage);
    //release global value
    process.env.newCampaignName = '';
  },
);
Then(
  'the "Email is existed" toast message should be displayed',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    await commonPage.checkToastMessageContent('Email is existed');
  },
);
When(
  `And I create New Candidate with all fields and the attachment is a file`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewApplicants('', 'full', 'file');
  },
);
Then(
  'the newly created applicant should be displayed on Interview Process page of Campaign and Candidate Pool page',
  async function (this: ICustomWorld) {
    const email =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const page = this.page!;
    const interviewProcess = new InterviewProcess(page, this);
    await interviewProcess.goto();
    await interviewProcess.selectCampaign();
    await interviewProcess.searchNewApplicant(email);
    const commonPage = new CommonPage(page, this);
    await commonPage.checkCandidateNameInfo(1);
    const candidatePool = new CandidatePool(page, this);
    await candidatePool.goto();
    await candidatePool.searchCandidate(email);
    await commonPage.checkCandidateNameInfo(2);
  },
);

When(
  'I click on "Delete candidate" option in the hamburger menu button',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    const emailCandidate =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const newApplicants = new NewApplicants(page, this);
    await newApplicants.searchNewApplicant(emailCandidate);
    await commonPage.clickOnOptionOnContextBurgerMenu('Delete candidate');
  },
);

When('I click on "Yes" button in the Confirm Message modal', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.clickCommonButton('Yes');
});

Then('the "Deleted candidate" message should be displayed', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.checkToastMessageContent('Deleted candidate');
});

Then(
  'the newly deleted Candidate should not be displayed on New Applicants page',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const commonPage = new CommonPage(page, this);
    await newApplicants.goto();
    //Search created email
    const emailCandidate =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await newApplicants.searchApplicantByEmailWithoutResult(emailCandidate);
    await commonPage.checkEmailApplicantAfterSearch(emailCandidate, 0);
  },
);
When('I create successfully an applicant', async function (this: ICustomWorld) {
  const page = this.page!;
  const newApplicants = new NewApplicants(page, this);
  await newApplicants.goto();
  await newApplicants.goToNewCandidatePage();
  const createNewApplicants = new CreateNewApplicants(page, this);
  await createNewApplicants.createNewApplicants('', 'required', 'file');
  await createNewApplicants.clickOnCommonButton('Save');
});
Then(
  'I input existed email address and other required fields',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const email =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.inputExistedEmail(email);
    await createNewApplicants.createNewApplicants('Email', 'required', 'file');
  },
);
Then('I input existed phone number and other required fields', async function (this: ICustomWorld) {
  const page = this.page!;
  const phoneNumber = process.env.candidatePhone !== undefined ? process.env.candidatePhone : '';
  const createNewApplicants = new CreateNewApplicants(page, this);
  await createNewApplicants.inputExistedPhoneNumber(phoneNumber);
  await createNewApplicants.createNewApplicants('Phone number', 'required', 'file');
});
Then(
  'the "Phone number is existed" toast message should be displayed',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    await commonPage.checkToastMessageContent('Phone number is existed');
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.txtPhoneNumber.scrollIntoViewIfNeeded();
    await commonPage.delay(2000);
  },
);
