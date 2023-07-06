import { Page, expect, test } from '@playwright/test';
import {
  applplicationConfirmationPage,
  careersPage,
  positionPage,
} from '../src/buildingBlocks/ui';

const telAvivLocation = 'Tel Aviv';
const rAndDTeam = 'R&D';

test.beforeEach(async ({ page }) => {
  await page.goto(careersPage.url);
  await careersPage.waitForPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

const clickSeeMoreLoop = async (page: Page) => {
  while (await careersPage.isSeeMoreBtnExists(page))
    await careersPage.seeMorePositionClick(page);
};

test(`Search with title only`, async ({ page }) => {
  const positionTitle = 'Automation Engineer';

  await careersPage.jobTitleType(page, positionTitle);
  await careersPage.searchClick(page);

  await clickSeeMoreLoop(page);

  expect(
    await careersPage.verifyResultsTitle(page, positionTitle)
  ).toBeTruthy();
});

test(`Search with location only`, async ({ page }) => {
  await careersPage.locationsClick(page);
  await careersPage.selectLocation(page, telAvivLocation);

  await clickSeeMoreLoop(page);

  expect(
    await careersPage.verifyResultsLocation(page, telAvivLocation)
  ).toBeTruthy();
});

test(`Search with all filters`, async ({ page }) => {
  const positionTitle = 'Automation';

  // search
  await careersPage.locationsClick(page);
  await careersPage.selectLocation(page, telAvivLocation);
  await careersPage.teamsClick(page);
  await careersPage.selectTeam(page, rAndDTeam);
  await careersPage.jobTitleType(page, positionTitle);
  await careersPage.searchClick(page);

  // verify search
  expect(
    await careersPage.verifyResultsLocation(page, telAvivLocation)
  ).toBeTruthy();

  expect(
    await careersPage.verifyResultsTitle(page, positionTitle)
  ).toBeTruthy();
});

test(`Search with wrong title`, async ({ page }) => {
  const title = `noWay`;

  await careersPage.jobTitleType(page, title);
  await careersPage.searchClick(page);

  expect(await careersPage.areThereResults(page)).toBeFalsy();
});

// skipped in order not to submit many job application
test.skip(`Job Application`, async ({ page }) => {
  const title = `Automation Infrastructure Engineer`;
  const personData = {
    firstName: 'test1',
    lastName: 'test2',
    email: 'test@test.il',
    phone: '1234567',
    resumeFilePath: './testData/resume-test.docx',
    linkedIn: 'test@linkedin.com',
    note: 'this is test',
  };

  await careersPage.locationsClick(page);
  await careersPage.selectLocation(page, telAvivLocation);
  await careersPage.teamsClick(page);
  await careersPage.selectTeam(page, rAndDTeam);
  await careersPage.jobTitleType(page, title);
  await careersPage.searchClick(page);

  await careersPage.resultClick(page, title);
  await positionPage.waitForLoaded(page);

  await positionPage.applyNowClick(page);
  await positionPage.firstNameType(page, personData.firstName);
  await positionPage.lastNameType(page, personData.lastName);
  await positionPage.emailType(page, personData.email);
  await positionPage.phoneType(page, personData.phone);
  await positionPage.linkedinProfileType(page, personData.linkedIn);
  await positionPage.attachResumeClick(page, personData.resumeFilePath);
  await positionPage.noteType(page, personData.note);
  await positionPage.submitApplicationClick(page);
  await positionPage.waitForSubmittion(page);
  await applplicationConfirmationPage.waitForPage(page);

  expect(
    await applplicationConfirmationPage.isHeartImgAppear(page),
    'Heart Image not appear'
  ).toBeTruthy();
  expect(
    await applplicationConfirmationPage.isThankYouAppear(page),
    'Thank You text not appear'
  ).toBeTruthy();
  expect(
    await applplicationConfirmationPage.isApplicationSubmittedAppear(page),
    'Application Submitted text not appear'
  ).toBeTruthy();
  expect(
    await applplicationConfirmationPage.isVideoAppear(page),
    'Video not appaer'
  ).toBeTruthy();
});

test('Job Application with no values', async ({ page }) => {
  const title = `Automation Infrastructure Engineer`;

  await careersPage.jobTitleType(page, title);
  await careersPage.searchClick(page);

  await careersPage.resultClick(page, title);
  await positionPage.waitForLoaded(page);
  await positionPage.applyNowClick(page);
  await positionPage.submitApplicationClick(page);

  expect(
    await positionPage.isFirstNameErrorAppear(page),
    'First name error not appear'
  ).toBeTruthy();

  expect(
    await positionPage.isLastNameErrorAppear(page),
    'Last name error not appear'
  ).toBeTruthy();
  expect(
    await positionPage.isEmailErrorAppear(page),
    'Email error not appear'
  ).toBeTruthy();
  expect(
    await positionPage.isPhoneErrorAppear(page),
    'Phone error not appear'
  ).toBeTruthy();
  expect(
    await positionPage.isSubmittionErrorAppear(page),
    'Submittion error not appear'
  ).toBeTruthy();
});

// more test that can be added:
// 1. for each textbox check if text added the error message disappear (first name, last name, phone, email).
// 2. submittion error with and without resume\linkedIn profile
// 3. Phone input validtion, use letter and check error message
