import { Page } from 'playwright';

const thankYouTxt = 'Thank you!';
const applicationSubmittedTxt =
  'Your application has been submitted. Good luck!';
const heartImgSrc = '/wp-content/uploads/2021/06/heart.png';
const thankYouXpath = `//*[text()="${thankYouTxt}"]`;
const applicationSubmittedXpath = `//*[text()="${applicationSubmittedTxt}"]`;
const heartImgXpath = `//img[@src="${heartImgSrc}"]`;
const videoXpath = `//*[@id="vp-preview"]`;
const videoIframeXpath = `//iframe[@data-src="https://player.vimeo.com/video/568077455"]`;

export const waitForPage = async (page: Page) => {
  await page.waitForSelector(heartImgXpath);
};

export const isHeartImgAppear = async (page: Page) => {
  return (await page.locator(heartImgXpath).count()) === 1;
};

export const isThankYouAppear = async (page: Page) => {
  return (await page.locator(thankYouXpath).count()) === 1;
};

export const isApplicationSubmittedAppear = async (page: Page) => {
  return (await page.locator(applicationSubmittedXpath).count()) === 1;
};

export const isVideoAppear = async (page: Page) => {
  return (
    (await page.frameLocator(videoIframeXpath).locator(videoXpath).count()) ===
    1
  );
};
