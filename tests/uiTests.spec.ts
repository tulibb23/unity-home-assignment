import { Page, expect, test } from '@playwright/test';
import { careersPage, positionPage } from '../src/buildingBlocks/ui';

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

test(`Job Application`, async ({ page }) => {
  const title = `Automation Infrastructure Engineer`;

  await careersPage.locationsClick(page);
  await careersPage.selectLocation(page, telAvivLocation);
  await careersPage.teamsClick(page);
  await careersPage.selectTeam(page, rAndDTeam);
  await careersPage.jobTitleType(page, title);
  await careersPage.searchClick(page);

  await careersPage.resultClick(page, title);
  await positionPage.waitForLoaded(page);

  await positionPage.applyNowClick(page);
  await positionPage.firstNameType(page, 'test1'); // TODO
  await positionPage.lastNameType(page, 'test2');
  await positionPage.attachResumeClick(page);
});
