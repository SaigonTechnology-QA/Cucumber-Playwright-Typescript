import { NewApplicants } from '../pages/newApplicantsPage';
import { ICustomWorld } from '../support/custom-world';
import { CreateNewApplicants } from '../pages/createNewCandidate';
import { CandidatePool } from '../pages/candidatePoolPage';
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
  `I input all the required fields with the attachment is a file`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const createNewApplicants = new CreateNewApplicants(page, this);
    await createNewApplicants.createNewCampaignWithExceptField('');
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
    const email = process.env.candidateEmail !== undefined ? process.env.candidateEmail : '';
    const page = this.page!;
    const candidatePool = new CandidatePool(page, this);
    await candidatePool.goto();
    await candidatePool.searchCandidate(email);
    await candidatePool.checkCandidateInfo();
  },
);
