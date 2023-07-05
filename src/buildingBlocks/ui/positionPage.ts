import { Page } from 'playwright';

const applyNowBtnXpath = `//*[@title="Apply now" and @class="btn-apply"]`;
const firstNameInputXpath = `//input[@id="inputFirstName"]`;
const lastNameInputXpath = `//*[@id="inputLastName""]`;
const emailInputXpath = `//*[@id="inputEmail"]`;
const phoneInputXpatht = `//*[@id=""inputTel"]`;
const linkedInInputXpath = `//*[@id="linkedin"]`;
const personalNoteInputXpath = `//*[@id="inputNote"]`;
const attachResumeXpath = `//*[@class="form-group field-resume"]`;
const submitApplicationXpath = `//button[@class="applyButton brandColoredButton"]`;

export const waitForLoaded = async (page: Page) => {
  await page.waitForSelector(applyNowBtnXpath);
  //   await page.waitForLoadState('networkidle');
};

export const applyNowClick = async (page: Page) =>
  await page.locator(applyNowBtnXpath).click();

export const firstNameType = async (page: Page, firstName: string) => {
  await page.locator(firstNameInputXpath).type(firstName);
};

export const lastNameType = async (page: Page, lastName: string) => {
  await page.locator(lastNameInputXpath).type(lastName);
};

export const attachResumeClick = async (page: Page) =>
  await page.locator(attachResumeXpath).click();

export const phoneType = async (page: Page, phone: string) =>
  await page.locator(`${phoneInputXpatht}`).type(phone);

export const linkedinProfileType = async (page: Page, profile: string) => {
  await page.locator(linkedInInputXpath).type(profile);
};

export const noteType = async (page: Page, note: string) => {
  await page.locator(personalNoteInputXpath).type(note);
};

export const emailType = async (page: Page, email: string) => {
  await page.locator(emailInputXpath).type(email);
};

export const submitApplicationClick = async (page: Page) =>
  await page.locator(submitApplicationXpath).click();
