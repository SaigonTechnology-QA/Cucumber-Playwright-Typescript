import { DataUtils } from './../utils/dataUtils';
import { ICustomWorld } from './../support/custom-world';
import { config } from '../support/config';
import { expect, Locator, Page } from '@playwright/test';
import { replace } from 'lodash';
import { fail } from 'assert';

export class CommonPage {
  readonly page: Page;
  iCustomWorld: ICustomWorld;
  dataUtils: DataUtils;

  readonly btnYes: Locator;
  readonly btnSave: Locator;
  readonly btnCancel: Locator;
  readonly btnConfirm: Locator;
  readonly toastMesssage: Locator;
  readonly btnHamburgerMenu: Locator;
  readonly txtSearchNameEmailField: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.iCustomWorld = iCustomWorld;
    this.dataUtils = new DataUtils();
    this.txtSearchNameEmailField = page.locator(
      '//input[@placeholder="Name, email, linkedIn, github, facebook"]',
    );
    this.btnYes = page.locator('//button[text()="Yes"]');
    this.btnCancel = page.locator('//button[text()="Cancel"]');
    this.btnConfirm = page.locator('//button[text()="Confirm"]');
    this.btnSave = page.locator('//button[normalize-space(text())="Save"]');
    this.toastMesssage = page.locator('//div[@role="alertdialog"]');
    this.btnHamburgerMenu = page.locator('//button[@title="Click to show actions"]');
  }
  async goto(prefix: string) {
    await this.page.goto(config.BASE_URL + prefix);
  }
  async screenshotThenAttachToReport() {
    const imageName = await this.dataUtils.getDateString();
    const image = await this.page?.screenshot({
      path: `screenshots/screenshot-${imageName}.png`,
    });
    image && (await this.iCustomWorld.attach(image, 'image/png'));
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async clickCommonButton(text: 'Yes' | 'Cancel' | 'Save' | 'Confirm') {
    await this.delay(500);
    switch (text) {
      case 'Yes': {
        await this.btnYes.click();
        break;
      }
      case 'Cancel': {
        await this.btnCancel.click();
        break;
      }
      case 'Save': {
        await this.btnSave.click();
        break;
      }
      case 'Confirm': {
        await this.btnConfirm.click();
        break;
      }
    }
    await this.delay(1000);
    await this.page.waitForLoadState();
  }
  async checkErrorMessagebyFieldName(
    fieldName: string,
    errorMessage: string,
    isMessageChildNode = true,
  ) {
    if (isMessageChildNode) {
      await expect(
        this.page.locator(
          replace('//label[contains(text(),"fieldName")]//small', 'fieldName', fieldName),
        ),
      ).toHaveText(errorMessage);
      await this.page
        .locator(replace('//label[contains(text(),"fieldName")]//small', 'fieldName', fieldName))
        .scrollIntoViewIfNeeded();
    } else {
      await expect(
        this.page.locator(
          replace(
            '//label[contains(text(),"fieldName")]/following-sibling::small',
            'fieldName',
            fieldName,
          ),
        ),
      ).toHaveText(errorMessage);
      await this.page
        .locator(
          replace(
            '//label[contains(text(),"fieldName")]/following-sibling::small',
            'fieldName',
            fieldName,
          ),
        )
        .scrollIntoViewIfNeeded();
    }
  }
  async clearTextField(locator: Locator) {
    await locator.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
  }

  async checkToastMessageContent(toastMesssage: string) {
    await this.page.waitForLoadState();
    await expect(await this.toastMesssage).toHaveText(toastMesssage);
  }
  async checkEmailApplicantAfterSearch(email: string, expectedCount: number) {
    await expect(await this.page.getByTitle(email)).toHaveCount(expectedCount);
  }
  async selectDropdownValue(dropDownName: string, optionValue: string) {
    const dropDownNameXpath = replace(
      '//label[starts-with(normalize-space(text()),"@dropDownName")]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationOptionXpath = replace(
      dropDownNameXpath + '/following-sibling::*//li[normalize-space(text())="optionValue"]',
      'optionValue',
      optionValue,
    );

    //Open dropdown
    await this.page.locator(dropDownNameFieldXpath).click();

    //Select option value
    await this.page.locator(drpLocationOptionXpath).click();

    //Close Dropdown
    await this.page.locator(dropDownNameXpath).click();
  }

  async selectDropdownValueWithFirstValue(dropDownName: string) {
    const dropDownNameXpath = replace(
      '//label[contains(text(),"@dropDownName")]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationFirstOptionXpath = dropDownNameXpath + '/following-sibling::*//li[1]';

    //Open dropdown
    await this.page.locator(dropDownNameFieldXpath).click();

    //Select option value
    await this.page.locator(drpLocationFirstOptionXpath).click();

    //Close Dropdown
    await this.page.locator(dropDownNameXpath).click();
  }

  async selectDropdownWithLastFoundValue(dropDownName: string, optionValue: string) {
    const dropDownNameXpath = replace(
      '//label[starts-with(normalize-space(text()),"@dropDownName")]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationOptionXpath = replace(
      dropDownNameXpath + '/following-sibling::*//li[normalize-space(text())="optionValue"]',
      'optionValue',
      optionValue,
    );

    //Open dropdown
    await this.page.locator(dropDownNameFieldXpath).click();

    //Select option value
    await this.page.locator(drpLocationOptionXpath).last().click();

    //Close Dropdown
    await this.page.locator(dropDownNameXpath).click();
  }
  async selectDropdownWithFirstOption(dropDownName: string) {
    const dropDownNameXpath = replace(
      '//label[starts-with(normalize-space(text()),"@dropDownName")]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationOptionXpath =
      dropDownNameXpath + '/following-sibling::*//li[@class="search-result-item"]';

    //Open dropdown
    await this.page.locator(dropDownNameFieldXpath).click();

    //Select option value
    await this.page.locator(drpLocationOptionXpath).first().click();

    //Close Dropdown
    await this.page.locator(dropDownNameXpath).click();
  }
  async selectDropdonwValueForNotMandatoryFields(dropDownName: string, optionValue: string) {
    const dropDownNameXpath = replace(
      '//label[normalize-space()="@dropDownName"]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationOptionXpath = replace(
      dropDownNameXpath + '/following-sibling::*//li[normalize-space()="optionValue"]',
      'optionValue',
      optionValue,
    );
    //Open dropdown
    await this.page.locator(dropDownNameFieldXpath).click();

    //Select option value
    await this.page.locator(drpLocationOptionXpath).click();

    //Close Dropdown
    await this.page.locator(dropDownNameXpath).click();
  }
  async checkTableCellValueByColumnName(cellValue: string, columnName = 'Name') {
    let columnIndex = -1;
    let cellFound = false;
    const tableColumnXpath = '//table//th';
    await this.page.waitForSelector('//table//th');
    const btnTableNext = this.page.locator('//li[@class="pagination-next"]/button');
    const getAllColumnValue = await this.page.locator(tableColumnXpath).all();

    for (const { index, value } of getAllColumnValue.map((value, index) => ({ index, value }))) {
      const realColumnName = await value.textContent();
      if (realColumnName?.trim() == columnName) {
        columnIndex = index;
        break;
      }
    }
    if (columnIndex == -1) {
      fail('Can not find Column Name: ' + columnName);
    }

    const rowValueXpath = '//table//tbody/tr/td[' + (columnIndex + 1) + ']';

    while (!cellFound) {
      const getAllCellValueByColumn = await this.page.locator(rowValueXpath).all();
      for (const value of getAllCellValueByColumn) {
        const realRowValue = await value.textContent();
        if (realRowValue?.trim() == cellValue) {
          cellFound = true;
          await value.scrollIntoViewIfNeeded();
          await this.screenshotThenAttachToReport();
          expect(realRowValue?.trim()).toEqual(cellValue);
          break;
        }
      }
      if (cellFound) break;
      if ((await btnTableNext.count()) !== 0) await btnTableNext.click();
      else break;
    }

    if (!cellFound) fail('Can not find cell Value: ' + cellValue);
  }

  async checkCandidateNameInfo(columnIndex: number) {
    const basicInfo = await this.dataUtils.getCandidateDataByType('required').basicInfo;
    const name = basicInfo.firstName + ' ' + basicInfo.lastName;
    const tdCandidateName = '//table/tbody/tr/td[' + columnIndex + ']';
    await this.page.locator(tdCandidateName).waitFor({ state: 'visible' });
    await this.page.locator(tdCandidateName).scrollIntoViewIfNeeded();
    await expect(this.page.locator(tdCandidateName)).toHaveText(name);
  }

  async checkCandidateEmailInfo(tdIndex: number, aIndex: number, email: string) {
    const tdCandidateEmail = '//table/tbody/tr/td[' + tdIndex + ']//a[' + aIndex + ']';
    await this.page.locator(tdCandidateEmail).waitFor({ state: 'visible' });
    await this.page.locator(tdCandidateEmail).scrollIntoViewIfNeeded();
    await expect(this.page.locator(tdCandidateEmail)).toHaveText(email);
  }

  async clickOnContextHamburgerButton() {
    await this.btnHamburgerMenu.scrollIntoViewIfNeeded();
    await this.btnHamburgerMenu.click();
  }

  async clickOnContextHamburgerButtonWithDefinedIndex(i: number) {
    const elements = await this.page.$$('//button[@title="Click to show actions"]');

    if (elements.length > 0) {
      const nthElement = elements[i];
      await nthElement.scrollIntoViewIfNeeded();

      await nthElement.click();
    }
  }
  async clickOnFirstContextHamburgerButton() {
    await this.btnHamburgerMenu.first().scrollIntoViewIfNeeded();
    await this.btnHamburgerMenu.first().click();
  }
  async clickOnOptionOnContextBurgerMenu(optionName: string) {
    await this.clickOnContextHamburgerButton();
    await this.page
      .locator(replace('//button/span[contains(text(),"@optionName")]', '@optionName', optionName))
      .click();
  }

  async clickOnOptionOnFirstContextBurgerMenu(optionName: string) {
    await this.clickOnFirstContextHamburgerButton();
    await this.page
      .locator(replace('//button/span[contains(text(),"@optionName")]', '@optionName', optionName))
      .click();
  }

  async clickOnOptionOnContextBurgerMenuWithIndex(optionName: string, i: number) {
    await this.clickOnContextHamburgerButtonWithDefinedIndex(i - 1);
    await this.page
      .locator(replace('//button/span[contains(text(),"@optionName")]', '@optionName', optionName))
      .click();
  }
  async searchByNameEmailSocial(email: string) {
    await this.clearTextField(this.txtSearchNameEmailField);
    await this.txtSearchNameEmailField.fill(email);
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('//table/tbody/tr/td[3]');
  }
}
