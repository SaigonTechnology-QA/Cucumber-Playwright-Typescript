import { ICustomWorld } from '../support/custom-world';
import { EditApplicantPage } from '../pages/editApplicantPage';
import { NewApplicants } from '../pages/newApplicantsPage';
import { CommonPage } from '../pages/commonPage';
import { When, Then } from '@cucumber/cucumber';

When(
  'I click on "Edit Applicant" option in the hamburger menu button',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const newApplicantPage = new NewApplicants(page, this);
    const commonPage = new CommonPage(page, this);
    const emailApplicant =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    await newApplicantPage.searchNewApplicant(emailApplicant);
    await commonPage.clickOnOptionOnContextBurgerMenu('Edit applicant');
  },
);

When(
  'I update new info into existing Applicant with all required fields',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const editApplicantPage = new EditApplicantPage(page, this);
    await editApplicantPage.updateApplicantWithRequireField();
  },
);

Then('the "Updated candidate" message should be displayed', async function (this: ICustomWorld) {
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.checkToastMessageContent('Updated candidate');
});

Then('the newly updated Applicant should be saved', async function (this: ICustomWorld) {
  //Go to Applicants page
  const page = this.page!;
  const newApplicants = new NewApplicants(page, this);
  const commonPage = new CommonPage(page, this);
  await newApplicants.goto();
  //Search with updated email
  const emailApplicant =
    process.env.candidateEmailUpdate !== undefined ? process.env.candidateEmailUpdate : '';
  await newApplicants.searchNewApplicant(emailApplicant);
  await commonPage.checkEmailApplicantAfterSearch(emailApplicant, 1);
});
