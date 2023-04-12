import { ICustomWorld } from '../support/custom-world';
import { EditApplicantPage } from '../pages/editApplicantPage';
import { NewApplicants } from '../pages/newApplicantsPage';
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When(
  'I click on "Edit Applicant" option in the hamburger menu button',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const emailApplicant =
      process.env.candidateApplicantEmail !== undefined ? process.env.candidateApplicantEmail : '';
    const editApplicantPage = new EditApplicantPage(page, this);
    await editApplicantPage.clickOnEditApplicantOption(emailApplicant);
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
  const editApplicantPage = new EditApplicantPage(page, this);
  expect((await editApplicantPage.getToastMessageLocator()).isVisible);
});

Then('the newly updated Applicant should be saved', async function (this: ICustomWorld) {
  //Go to Applicants page
  const page = this.page!;
  const newApplicants = new NewApplicants(page, this);
  await newApplicants.goto();
  //Search with updated email
  const email =
    process.env.candidateEmailUpdate !== undefined ? process.env.candidateEmailUpdate : '';
  await newApplicants.searchNewApplicant(email);
  await expect(page.getByTitle(email)).toHaveCount(1);
});
