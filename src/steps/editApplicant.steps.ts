import { ICustomWorld } from '../support/custom-world';
import { EditApplicantPage } from '../pages/editApplicantPage';
import { NewApplicants } from '../pages/newApplicantsPage';
import { CommonPage } from '../pages/commonPage';
import { When, Then } from '@cucumber/cucumber';

When(
  'I click on "Edit Applicant" option in the hamburger menu button of an existed candidate',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const commonPage = new CommonPage(page, this);
    await commonPage.clickOnOptionOnFirstContextBurgerMenu('Edit applicant');
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
  console.log('======emailApplicant===' + emailApplicant);
  await commonPage.searchByNameEmailSocial(emailApplicant);
  await commonPage.checkEmailApplicantAfterSearch(emailApplicant, 1);
});
