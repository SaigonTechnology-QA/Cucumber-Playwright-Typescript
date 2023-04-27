import { ICustomWorld } from '../support/custom-world';
import { CompleteProfile } from '../pages/completeProfilePage';
import { NewApplicants } from '../pages/newApplicantsPage';
import { CommonPage } from '../pages/commonPage';
import { When, Then } from '@cucumber/cucumber';

When(
  `I click on "Complete profile" option in the hamburger menu button`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicants = new NewApplicants(page, this);
    const emailSearch =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await newApplicants.searchNewApplicant(emailSearch);
    await newApplicants.clickHamburgerButton();
    await newApplicants.clickCompleteProfileMenuItem();
  },
);

When(
  `I input all required fields to complete applicant profile`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const completeProfile = new CompleteProfile(page, this);
    await completeProfile.selectDataToCompleteACandidateProfile;
  },
);

When(
  `I click on "Confirm" button in the Complete Profile modal`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const completeProfile = new CompleteProfile(page, this);
    await completeProfile.clickConfirmButton();
  },
);

Then(
  `The "Candidates have CVs have been moved to Interview Process." message should be displayed`,
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    await commonPage.checkToastMessageContent(
      'Candidates have CVs have been moved to Interview Process.  Candidates have no CVs have been moved to Candidate Pool.',
    );
  },
);
