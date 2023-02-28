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
  readonly btnCancel: Locator;
  constructor(page: Page, iCustomWorld: ICustomWorld) {
    this.page = page;
    this.iCustomWorld = iCustomWorld;
    this.dataUtils = new DataUtils();

    this.btnYes = page.locator('//button[text()="Yes"]');
    this.btnCancel = page.locator('//button[text()="Cancel"]');
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

  async clickCommonButton(text: 'Yes' | 'Cancel') {
    switch (text) {
      case 'Yes': {
        await this.btnYes.click();
        break;
      }
      case 'Cancel': {
        await this.btnCancel.click();
        break;
      }
    }
  }
  async checkErrorMessagebyFieldName(fieldName: string, errorMessage: string) {
    await expect(
      this.page.locator(
        replace('//label[contains(text(),"fieldName")]//small', 'fieldName', fieldName),
      ),
    ).toHaveText(errorMessage);
    await this.page
      .locator(replace('//label[contains(text(),"fieldName")]//small', 'fieldName', fieldName))
      .scrollIntoViewIfNeeded();
  }
  async clearTextField(locator: Locator) {
    await locator.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
  }
  async selectDropdownValue(dropDownName: string, optionValue: string) {
    const dropDownNameXpath = replace(
      '//label[contains(text(),"@dropDownName")]',
      '@dropDownName',
      dropDownName,
    );
    const dropDownNameFieldXpath =
      dropDownNameXpath + '/following-sibling::*//div[@class="search-box form-control d-flex"]';
    const drpLocationOptionXpath = replace(
      dropDownNameXpath + '/following-sibling::*//li[text()=" optionValue "]',
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
  async checkTableCellValueByColumnName(cellValue: string, columnName: string) {
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
          break;
        }
      }
      if (cellFound) break;
      if ((await btnTableNext.count()) !== 0) await btnTableNext.click();
      else break;
    }

    if (!cellFound) fail('Can not find cell Value: ' + cellValue);
  }
}
