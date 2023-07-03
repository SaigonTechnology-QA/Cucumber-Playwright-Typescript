/* eslint-disable prettier/prettier */
import { CandidatePool } from '../pages/candidatePoolPage';
import { CommonPage } from '../pages/commonPage';
import { ICustomWorld } from '../support/custom-world';
import { Then, When } from '@cucumber/cucumber';

When(`I go to Candidate Pool page`, async function (this: ICustomWorld) {
  const page = this.page!;
  const candidatePool = new CandidatePool(page, this);
  await candidatePool.goto();
});

When(`I fill in Basic Info with email`, async function (this: ICustomWorld) {
  const candidateEmail = 'Auto1686883079291@gmail.com';
  const page = this.page!;
  const candidatePool = new CandidatePool(page, this);
  await candidatePool.fillBasicInfo(candidateEmail);
});

When(`I click on "Search" button`, async function (this: ICustomWorld) {
  const page = this.page!;
  const candidatePool = new CandidatePool(page, this);
  await candidatePool.clickOnSearchButton();
});

Then(`The system should return the candidate match with searching email`, async function (this: ICustomWorld) {
  const candidateEmail = 'Auto1686883079291@gmail.com';
  const page = this.page!;
  const commonPage = new CommonPage(page, this);
  await commonPage.checkCandidateEmailInfo(3, 2, candidateEmail);
}); 