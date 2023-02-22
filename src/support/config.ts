import { LaunchOptions } from '@playwright/test';

const browserOptions: LaunchOptions = {
  headless: false,
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

const alwaysScreenshot = true;
export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  alwaysScreenshot,
  BASE_URL: 'https://uat.recruitment.saigontechnology.vn/',
  IMG_THRESHOLD: { threshold: 0.4 },
};
