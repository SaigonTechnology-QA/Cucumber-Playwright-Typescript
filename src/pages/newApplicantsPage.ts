import { CommonPage } from './commonPage';
import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Locator, Page } from '@playwright/test';

export class NewApplicants {
  readonly page: Page;
  readonly btnAddNewCandidate: Locator;
  readonly txtSearchKey: Locator;
  readonly btnHamburgerMenu: Locator;
  readonly btnEditApplicant: Locator;
  readonly btnCompleteProfile: Locator;
  readonly btnYesOnConfirmDeletePopUp: Locator;
  readonly lblApplicantEmail: Locator;
  readonly btnPagingIndicatorLocator: string;
  readonly lblTotalCandidateRowLocator: string;
  readonly lblExistedTagPart1Locator: string;
  readonly lblExistedTagPart2Locator: string;
  readonly lblCandidateEmailLocatorPart2: string;
  readonly lblTotalPageNumber: Locator;

  commonPage: CommonPage;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.commonPage = new CommonPage(page, iCustomWorld);
    this.btnAddNewCandidate = page.getByRole('link', { name: 'Add New Candidate' });
    this.txtSearchKey = page.locator(
      '//input[@placeholder="Name, email, linkedIn, github, facebook"]',
    );
    this.btnHamburgerMenu = page.locator('//button[@title="Click to show actions"]');
    this.btnEditApplicant = page.locator('//button/span[contains(text(),"Edit applicant")]');
    this.btnCompleteProfile = page.locator('//button/span[contains(text(),"Complete profile")]');
    this.btnYesOnConfirmDeletePopUp = page.locator(
      '//div[@class="button_dialog"]/button[contains(text(),"Yes")]',
    );
    this.lblApplicantEmail = page.locator('//tbody/tr[1]/td[3]/div/a');
    this.btnPagingIndicatorLocator = '//ul[@class="custom-pagination m-datatable__pager-nav"]/li';
    this.lblTotalCandidateRowLocator = '//tbody/tr';
    this.lblExistedTagPart1Locator = '//tbody/tr[';
    this.lblExistedTagPart2Locator =
      ']/td[2]/div/div/button[@class="wrapper-tooltip position-relative btn btn-list-item bg-passed pointer-default my-1 mr-2 tag-skill"]';
    this.lblCandidateEmailLocatorPart2 = ']/td[3]/div/a';
    this.lblTotalPageNumber = page.locator(
      '//li[contains(@Class,"pagination-next")]/preceding-sibling::li[position() = 1]',
    );
  }
  async goto() {
    await this.page.goto(config.BASE_URL + 'new-applicants');
    await this.page.waitForLoadState();
  }
  async goToNewCandidatePage() {
    await this.btnAddNewCandidate.click();
  }
  async searchNewApplicant(email: string) {
    await this.commonPage.clearTextField(this.txtSearchKey);
    await this.txtSearchKey.fill(email);
    await this.page.waitForLoadState();
    await this.page.waitForSelector('//table/tbody/tr/td[3]');
  }
  async searchApplicantByEmailWithoutResult(email: string) {
    await this.commonPage.clearTextField(this.txtSearchKey);
    await this.txtSearchKey.fill(email);
    await this.page.waitForEvent('response');
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickHamburgerButton() {
    await this.btnHamburgerMenu.scrollIntoViewIfNeeded();
    await this.btnHamburgerMenu.click();
  }

  async clickCompleteProfileMenuItem() {
    await this.btnCompleteProfile.scrollIntoViewIfNeeded();
    await this.btnCompleteProfile.click();
  }

  async getFirstCandidateEmail(): Promise<string | null> {
    const candidateEmail = await this.lblApplicantEmail.last().textContent();
    return candidateEmail;
  }

  async getCandidateEmail(i: number): Promise<string | null> {
    const candidateEmail = await this.page
      .locator(this.lblExistedTagPart1Locator + i + this.lblCandidateEmailLocatorPart2)
      .last()
      .textContent();
    return candidateEmail;
  }

  async isCompletedCandidate(i: number): Promise<boolean> {
    const elements = await this.page.$$(
      this.lblExistedTagPart1Locator + i + this.lblExistedTagPart2Locator,
    );
    var totalElm = elements.length;

    return totalElm > 0 ? true : false;
  }

  async getNumberOfCandidateOnCurrentPageOfApplicantPage(): Promise<number> {
    let number = 0;
    const element = await this.page.$$(this.lblTotalCandidateRowLocator);
    number = element.length;

    return number;
  }

  async getTotalPageOnApplicantPage(): Promise<number> {
    let number = 0;
    const num = await this.lblTotalPageNumber.textContent();
    if (num !== null) {
      number = parseInt(num);
    } else {
      console.log('Get page number error');
    }
    return number;
  }

  async clickOnPaginationNumber(i: number) {
    const elms = await this.page.$$(this.btnPagingIndicatorLocator);
    if (elms.length > 0) {
      //+1 because there is 2 previous buttons
      const nthElm = elms[i + 1];
      await nthElm.scrollIntoViewIfNeeded();
      await nthElm.click();
    }
  }

  async clickOnDeleteAnExistedCandidate() {
    let index = 0;
    const totalPage = await this.getTotalPageOnApplicantPage();
    //Find element can be deleted on each page, if yes => delete
    for (let j = 1; j <= totalPage; j++) {
      const totalCandidates = await this.getNumberOfCandidateOnCurrentPageOfApplicantPage();

      for (let i = 1; i <= totalCandidates; i++) {
        let isCompletedCandidate = await this.isCompletedCandidate(i);
        //If candidate is not existed profile, delete it then break
        if (!isCompletedCandidate) {
          index = i;
          const candidateEmail = await this.getCandidateEmail(index);
          if (candidateEmail != null) {
            const candidateEmailTrim = candidateEmail.trim();
            process.env.candidateApplicantEmail =
              candidateEmailTrim != undefined ? candidateEmailTrim : '';
            await this.commonPage.clickOnOptionOnContextBurgerMenuWithIndex(
              'Delete candidate',
              index,
            );
          } else console.log('Can not get Candidate email');
          break;
        }
      }
      if (index == 0) {
        if (j < totalPage) {
          //Click on next page
          await this.clickOnPaginationNumber(j + 1);
        }
      } else break;
    }
    //If all candidate are complete profile
    if (index == 0) {
      console.log('All candidates have complete profile');
    }
  }
}
