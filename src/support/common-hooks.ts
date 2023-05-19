import { ICustomWorld } from './custom-world';
import { config } from './config';
import { DataUtils } from './../utils/dataUtils';
// import { CampaignPage } from '../pages/campaignPage';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { ensureDir } from 'fs-extra';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: null,
  });

  this.page = await this.context.newPage();
  this.page.on('console', async (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  const dataUtils = new DataUtils();
  const imageName = await dataUtils.getDateString();
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (config.alwaysScreenshot && result.status === Status.PASSED) {
      const image = await this.page?.screenshot({
        path: `screenshots/screenshot-${imageName}.png`,
      });
      image && (await this.attach(image, 'image/png'));
    } else if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot({
        path: `screenshots/screenshot-${imageName}.png`,
      });
      image && (await this.attach(image, 'image/png'));
    }
  }

  // const newCampaignName =
  //   process.env.newCampaignName !== undefined ? process.env.newCampaignName : '';
  // if (newCampaignName !== '') {
  //   const page = this.page!;
  //   const campaignPage = new CampaignPage(page, this);
  //   await campaignPage.campaignTeardown(newCampaignName);
  // }

  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
