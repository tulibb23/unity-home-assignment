import { Page } from 'playwright';

const applyNowBtnXpath = `//*[@title="Apply now" and @class="btn-apply"]`;
const firstNameInputXpath = `//input[@id="inputFirstName"]`;
const lastNameInputXpath = `//input[@id="inputLastName"]`;
const emailInputXpath = `//*[@id="inputEmail"]`;
const phoneInputXpath = `//*[@id="inputTel"]`;
const linkedInInputXpath = `//*[@id="linkedin"]`;
const personalNoteInputXpath = `//*[@id="inputNote"]`;
const attachResumeXpath = `//*[@class="form-group field-resume"]`;
const submitApplicationXpath = `//button[@class="applyButton brandColoredButton"]`;
const formFrameXpath = `//iframe[@id="iFrameResizer1"]`;
const firstNameErrorXpath = `//*[@id="field-first-name-aria-desc"]`;
const lastNameErrorXpath = `//*[@id="field-last-name-aria-desc"]`;
const emailErrorXpath = `//*[@id="field-email-aria-desc"]`;
const phoneErrorXpath = `//*[@id="field-phone-aria-desc"]`;
const submitErrorXpath = `//*[@class="form-group submit-button"]//*[@class="control-tip error"]`;

export const waitForLoaded = async (page: Page) => {
  await page.waitForSelector(applyNowBtnXpath);
  await page.waitForSelector(formFrameXpath);
};

export const applyNowClick = async (page: Page) =>
  await page.locator(applyNowBtnXpath).click();

const inputTypeInFrame = async (page: Page, locator: string, txt: string) =>
  await page.frameLocator(formFrameXpath).locator(locator).type(txt);

export const firstNameType = async (page: Page, firstName: string) =>
  await inputTypeInFrame(page, firstNameInputXpath, firstName);

export const lastNameType = async (page: Page, lastName: string) =>
  await inputTypeInFrame(page, lastNameInputXpath, lastName);

export const attachResumeClick = async (page: Page, filePath: string) => {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.frameLocator(formFrameXpath).getByText('Attach Resume').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
};

export const phoneType = async (page: Page, phone: string) =>
  await inputTypeInFrame(page, phoneInputXpath, phone);

export const linkedinProfileType = async (page: Page, profile: string) =>
  await inputTypeInFrame(page, linkedInInputXpath, profile);

export const noteType = async (page: Page, note: string) =>
  await inputTypeInFrame(page, personalNoteInputXpath, note);

export const emailType = async (page: Page, email: string) =>
  await inputTypeInFrame(page, emailInputXpath, email);

export const submitApplicationClick = async (page: Page) =>
  await page
    .frameLocator(formFrameXpath)
    .locator(submitApplicationXpath)
    .click();

export const waitForSubmittion = async (page: Page) => {
  while (
    await page
      .frameLocator(formFrameXpath)
      .locator(submitApplicationXpath)
      .isDisabled()
  );
  page.waitForTimeout(2000);
};

const isErrorAppear = async (page: Page, locator: string) => {
  return (await page.frameLocator(formFrameXpath).locator(locator).count()) > 0;
};

export const isFirstNameErrorAppear = async (page: Page) => {
  return await isErrorAppear(page, firstNameErrorXpath);
};

export const isLastNameErrorAppear = async (page: Page) => {
  return await isErrorAppear(page, lastNameErrorXpath);
};

export const isEmailErrorAppear = async (page: Page) => {
  return await isErrorAppear(page, emailErrorXpath);
};

export const isPhoneErrorAppear = async (page: Page) => {
  return await isErrorAppear(page, phoneErrorXpath);
};

export const isSubmittionErrorAppear = async (page: Page) => {
  return await isErrorAppear(page, submitErrorXpath);
};

export const getSubmittionError = async (page: Page) => {
  return await page
    .frameLocator(formFrameXpath)
    .locator(submitErrorXpath)
    .textContent();
};
